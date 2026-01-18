import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getPropertyById, getPropertyCalendar, getProperties } from '../../api/propertyApi';

const DashboardCalendarMain = ({ onMobileMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  // Property and calendar state
  const [property, setProperty] = useState(null);
  const [properties, setProperties] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState([]);

  // Determine if we're in "select property" mode or "direct property" mode
  const isSelectMode = !id;

  // Generate week dates based on currentDate
  useEffect(() => {
    const dates = [];
    const startOfWeek = new Date(currentDate);
    // Adjust to start on Sunday (0)
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    setWeekDates(dates);
  }, [currentDate]);

  // Fetch data based on mode
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const accessToken = localStorage.getItem('access_token');
        
        if (!accessToken) {
          Swal.fire({
            icon: 'error',
            title: 'Authentication Required',
            text: 'Please log in to view the calendar.',
          });
          navigate('/client/login');
          return;
        }

        if (isSelectMode) {
          // Fetch all properties for selection (handle pagination)
          let allProperties = [];
          let currentPage = 1;
          let hasMorePages = true;

          while (hasMorePages) {
            const propertiesResponse = await getProperties(accessToken, currentPage);
            if (propertiesResponse.status === 1 && propertiesResponse.data) {
              const pageData = propertiesResponse.data[0];
              const items = pageData?.items || [];
              allProperties = [...allProperties, ...items];

              // Check if there are more pages
              const meta = pageData?._meta;
              if (meta && currentPage < meta.NumberOfPage) {
                currentPage++;
              } else {
                hasMorePages = false;
              }
            } else {
              hasMorePages = false;
            }
          }

          setProperties(allProperties);
          
          // Auto-select the first property if available
          if (allProperties.length > 0) {
            const firstProperty = allProperties[0];
            setProperty(firstProperty);
            setSelectedPropertyId(firstProperty.id);
            
            // Fetch calendar events for the first property
            try {
              const calendarResponse = await getPropertyCalendar(accessToken, firstProperty.id);
              if (calendarResponse.status === 1 && calendarResponse.data) {
                const events = calendarResponse.data.flat();
                setCalendarEvents(events);
              }
            } catch (err) {
              console.error('Error fetching calendar for first property:', err);
            }
          }
          
          setIsLoading(false);
        } else {
          // Fetch specific property details
          const propertyResponse = await getPropertyById(accessToken, id);
          if (propertyResponse.status === 1 && propertyResponse.data) {
            const propertyData = Array.isArray(propertyResponse.data) 
              ? propertyResponse.data[0] 
              : propertyResponse.data;
            setProperty(propertyData);
            setSelectedPropertyId(id);
          } else {
            throw new Error('Failed to fetch property details');
          }

          // Fetch calendar events
          const calendarResponse = await getPropertyCalendar(accessToken, id);
          if (calendarResponse.status === 1 && calendarResponse.data) {
            const events = calendarResponse.data.flat();
            setCalendarEvents(events);
          }

          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setIsLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load calendar data. Please try again.',
        });
      }
    };

    fetchData();
  }, [id, isSelectMode, navigate]);

  // Handle property selection in select mode
  const handlePropertySelect = async (propertyId) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      
      // Find and set the selected property
      const selectedProp = properties.find(p => p.id === propertyId);
      setProperty(selectedProp);
      setSelectedPropertyId(propertyId);

      // Fetch calendar events for selected property
      const calendarResponse = await getPropertyCalendar(accessToken, propertyId);
      if (calendarResponse.status === 1 && calendarResponse.data) {
        const events = calendarResponse.data.flat();
        setCalendarEvents(events);
      }
    } catch (err) {
      console.error('Error fetching calendar:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load calendar for this property.',
      });
    }
  };

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -350,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 350,
        behavior: 'smooth'
      });
    }
  };

  // Helper function to check if an event exists for a specific date and time
  const getEventForSlot = (date, timeSlot) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const dateKey = `${year}-${month}-${day}`;

    return calendarEvents.find(event => {
      if (event.date !== dateKey) return false;
      
      // Parse time_from to check if it falls within this time slot
      const eventHour = parseInt(event.time_from.split(':')[0]);
      const slotHour = parseInt(timeSlot);
      
      // Check if event starts within 2 hours of this slot
      return eventHour >= slotHour && eventHour < slotHour + 2;
    });
  };

  // Navigation Handlers
  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // Date Formatting Helpers
  const formatDateHeader = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[date.getDay()];
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return { dayName, dateStr: `${month}/${day}` };
  };

  const formatDateRange = () => {
    if (weekDates.length === 0) return '';
    const start = weekDates[0];
    const end = weekDates[6];
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return `${start.toLocaleDateString('en-GB', options)} - ${end.toLocaleDateString('en-GB', options)}`;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownItemClick = (action) => {
    setIsDropdownOpen(false);
    if (action === 'profile') {
      navigate('/client/profile');
    } else if (action === 'settings') {
      navigate('/client/settings');
    } else if (action === 'logout') {
      localStorage.removeItem('access_token');
      navigate('/client/login');
    }
  };

  // Time slots for the calendar
  const timeSlots = [
    { label: '8:00 AM', value: '08' },
    { label: '10:00 AM', value: '10' },
    { label: '12:00 PM', value: '12' },
    { label: '2:00 PM', value: '14' },
    { label: '4:00 PM', value: '16' },
    { label: '6:00 PM', value: '18' },
    { label: '8:00 PM', value: '20' },
  ];

  if (isLoading) {
    return (
      <section>
        <div className="dashboard-main-nav px-md-3 px-1 py-1">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mb-0 dashboard-title">Calendar</h2>
          </div>
        </div>
        <div className="dashboard-home-content px-3 mt-2">
          <div className="text-center mt-4 mb-4">
            <p className="text-muted">Loading calendar...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <div className="dashboard-main-nav px-md-3 px-1 py-1">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mb-0 dashboard-title">Calendar</h2>
          </div>
        </div>
        <div className="dashboard-home-content px-3 mt-2">
          <div className="text-center mt-4 mb-4">
            <p className="text-muted">Error loading data. Please try again.</p>
            <Link to="/client/property-management" className="sec-btn rounded-2 px-4 py-2 text-decoration-none">
              Back to Properties
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="dashboard-main-nav px-md-3 px-1 py-1">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-0">
            <button 
              className="mobile-menu-btn"
              onClick={onMobileMenuClick}
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
            <h2 className="mb-0 dashboard-title">Calendar</h2>
          </div>
          <div className="d-flex justify-content-end gap-2 align-items-center">
            <div className="dashboard-lang-btn d-flex gap-1 align-items-center">
              <img src="/assets/global.svg" alt="notification" />
              <span>English</span>
            </div>
            <Link to='/client/notifications' className="notification-icon-container">
              <img src="/assets/notification.svg" alt="notification" />
            </Link>
            
            {/* User Profile Dropdown */}
            <div className="user-dropdown-container d-none d-md-block" ref={dropdownRef}>
              <div 
                className="user-profile-trigger d-flex gap-2 align-items-center"
                onClick={toggleDropdown}
              >
                <FontAwesomeIcon 
                  icon={faChevronDown} 
                  className={`dropdown-chevron ${isDropdownOpen ? 'open' : ''}`}
                />
                <span className="user-name">Omar Alrajhi</span>
                <img 
                  src="/assets/user.png" 
                  alt="User Profile" 
                  className="user-avatar-small"
                />
              </div>
              
              {isDropdownOpen && (
                <div className="user-dropdown-menu">
                  <div 
                    className="dropdown-item d-flex gap-2 align-items-center"
                    onClick={() => handleDropdownItemClick('profile')}
                  >
                    <img src="/assets/user-square.svg" alt="settings" />
                    <span>Profile</span>
                  </div>
                  <div 
                    className="dropdown-item d-flex gap-2 align-items-center"
                    onClick={() => handleDropdownItemClick('settings')}
                  >
                    <img src="/assets/setting-icon.svg" alt="settings" />
                    <span>Settings</span>
                  </div>
                  <div 
                    className="dropdown-item d-flex gap-2 align-items-center"
                    onClick={() => handleDropdownItemClick('logout')}
                  >
                    <img src="/assets/logout-icon.svg" alt="settings" />
                    <span>Logout</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-home-content px-3 mt-2">
        <h6 className="dashboard-routes-sub m-0">Calendar</h6>
        
        {isSelectMode ? (
          // Show both property selection grid and calendar in one view
          <>
            <div className="service-desc mb-3 mt-3">Select a property to view its calendar</div>
            
            {/* Property selection grid with horizontal scroll */}
            <div className="position-relative mb-4">
              {properties.length > 3 && (
                <button 
                  className="property-scroll-btn property-scroll-left"
                  onClick={scrollLeft}
                  aria-label="Scroll left"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
              )}
              
              <div 
                className="property-scroll-container d-flex gap-3 pb-2"
                ref={scrollContainerRef}
              >
                {properties.map((prop) => (
                  <div 
                    key={prop.id} 
                    className={`property-card-wrapper ${selectedPropertyId === prop.id ? 'selected' : ''}`}
                  >
                    <div 
                      className={`calendar-card w-100 h-100 ${selectedPropertyId === prop.id ? 'active' : ''}`} 
                      style={{ cursor: 'pointer' }}
                      onClick={() => handlePropertySelect(prop.id)}
                    >
                      <div className="d-flex w-100 align-items-center gap-2">
                        <img 
                          src={prop.image} 
                          className='property-management-card-img-2' 
                          alt={prop.name}
                          onError={(e) => {
                            e.target.src = '/assets/property-management-card-img.png';
                          }}
                        />
                        <div className='d-flex flex-column gap-2 align-items-start'>
                          <div className='villa-badge py-1 px-3 rounded-pill'>
                            {prop.property_type_id?.name || 'Property'}
                          </div>
                          <div className="d-flex align-items-center">
                            <img src="/assets/location.svg" className='img-fluid' alt="location" />
                            <p className="property-management-card-address m-0">{prop.address || 'N/A'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex gap-1 align-items-center flex-wrap w-100 py-1 rounded-1 mt-2">
                        <div className="d-flex align-items-center gap-1">
                          <img src="/assets/property-card-icon-1.svg" className='img-fluid' alt="floors" />
                          <h6 className="property-management-card-icon-label m-0">{prop.floor || 0} floors</h6>
                        </div>
                        <div className='card-border-right'>|</div>
                        <div className="d-flex align-items-center gap-1">
                          <img src="/assets/property-card-icon-2.svg" className='img-fluid' alt="rooms" />
                          <h6 className="property-management-card-icon-label m-0">{prop.number_room || 0} rooms</h6>
                        </div>
                        <div className='card-border-right'>|</div>
                        <div className="d-flex align-items-center gap-1">
                          <img src="/assets/property-card-icon-3.svg" className='img-fluid' alt="area" />
                          <h6 className="property-management-card-icon-label m-0">{prop.area || 0} m</h6>
                        </div>
                        <div className='card-border-right'>|</div>
                        <div className="d-flex align-items-center gap-1">
                          <img src="/assets/property-card-icon-4.svg" className='img-fluid' alt="bathrooms" />
                          <h6 className="property-management-card-icon-label m-0">{prop.number_bathroom || 0} bathrooms</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {properties.length > 3 && (
                <button 
                  className="property-scroll-btn property-scroll-right"
                  onClick={scrollRight}
                  aria-label="Scroll right"
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              )}
            </div>
            

            {/* Top Controls */}
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 mt-4">
              <div className="d-flex gap-2 p-2 rounded-2 days-filter">
                <button className="main-btn rounded-2 px-3 py-1" onClick={handleToday}>Today</button>
                <div className="days-filter-item px-3 py-1" onClick={handlePrevWeek} style={{cursor: 'pointer'}}>Back</div>
                <div className="days-filter-item px-3 py-1" onClick={handleNextWeek} style={{cursor: 'pointer'}}>Next</div>
              </div>

              <h6 className="m-0 date-label">{formatDateRange()}</h6>

              <div className="d-flex gap-2 p-2 rounded-2 times-filter">
                <button className="main-btn rounded-2 px-3 py-1">Week</button>
                <div className="times-filter-item px-3 py-1">Month</div>
                <div className="times-filter-item px-3 py-1">Day</div>
              </div>
            </div>

            {/* Calendar Table */}
            <div className="calendar-wrapper">
              <table className="table calendar-table text-center">
                <thead>
                  <tr>
                    <th>Time</th>
                    {weekDates.map((date, index) => {
                      const { dayName, dateStr } = formatDateHeader(date);
                      const year = date.getFullYear();
                      const month = (date.getMonth() + 1).toString().padStart(2, '0');
                      const day = date.getDate().toString().padStart(2, '0');
                      const dateKey = `${year}-${month}-${day}`;
                      const count = calendarEvents.filter(e => e.date === dateKey).length;
                      
                      return (
                        <th key={index}>
                          {dayName} {dateStr}<br />
                          <small className='fw-bold'>{count.toString().padStart(2, '0')} Reservation</small>
                        </th>
                      );
                    })}
                  </tr>
                </thead>

                <tbody>
                  {timeSlots.map((slot, index) => (
                    <tr key={index}>
                      <td className='table-time'>{slot.label}</td>
                      {weekDates.map((date, dateIndex) => {
                        const event = getEventForSlot(date, slot.value);
                        return (
                          <td key={dateIndex}>
                            {event && (
                              <div className="third-btn-sm">Check Out<br />Guest</div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : property ? (
          // Show selected property calendar (direct property mode)
          <>
            <div className="service-desc mb-3 mt-3">
              Determine the property
            </div>
            
            <div className="row">
              <div className="col-md-4 mb-3">
                <div className="calendar-card w-100">
                  <div className="d-flex w-100 align-items-center gap-2">
                    <img 
                      src={property.image} 
                      className='property-management-card-img-2' 
                      alt={property.name}
                      onError={(e) => {
                        e.target.src = '/assets/property-management-card-img.png';
                      }}
                    />
                    <div className='d-flex flex-column gap-2 align-items-start'>
                      <div className='villa-badge py-1 px-3 rounded-pill'>
                        {property.property_type_id?.name || 'Property'}
                      </div>
                      <div className="d-flex align-items-center">
                        <img src="/assets/location.svg" className='img-fluid' alt="location" />
                        <p className="property-management-card-address m-0">{property.address || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex gap-1 align-items-center flex-wrap w-100 py-1 rounded-1 mt-2">
                    <div className="d-flex align-items-center gap-1">
                      <img src="/assets/property-card-icon-1.svg" className='img-fluid' alt="floors" />
                      <h6 className="property-management-card-icon-label m-0">{property.floor || 0} floors</h6>
                    </div>
                    <div className='card-border-right'>|</div>
                    <div className="d-flex align-items-center gap-1">
                      <img src="/assets/property-card-icon-2.svg" className='img-fluid' alt="rooms" />
                      <h6 className="property-management-card-icon-label m-0">{property.number_room || 0} rooms</h6>
                    </div>
                    <div className='card-border-right'>|</div>
                    <div className="d-flex align-items-center gap-1">
                      <img src="/assets/property-card-icon-3.svg" className='img-fluid' alt="area" />
                      <h6 className="property-management-card-icon-label m-0">{property.area || 0} m</h6>
                    </div>
                    <div className='card-border-right'>|</div>
                    <div className="d-flex align-items-center gap-1">
                      <img src="/assets/property-card-icon-4.svg" className='img-fluid' alt="bathrooms" />
                      <h6 className="property-management-card-icon-label m-0">{property.number_bathroom || 0} bathrooms</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Controls */}
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 mt-4">
              <div className="d-flex gap-2 p-2 rounded-2 days-filter">
                <button className="main-btn rounded-2 px-3 py-1" onClick={handleToday}>Today</button>
                <div className="days-filter-item px-3 py-1" onClick={handlePrevWeek} style={{cursor: 'pointer'}}>Back</div>
                <div className="days-filter-item px-3 py-1" onClick={handleNextWeek} style={{cursor: 'pointer'}}>Next</div>
              </div>

              <h6 className="m-0 date-label">{formatDateRange()}</h6>

              <div className="d-flex gap-2 p-2 rounded-2 times-filter">
                <button className="main-btn rounded-2 px-3 py-1">Week</button>
                <div className="times-filter-item px-3 py-1">Month</div>
                <div className="times-filter-item px-3 py-1">Day</div>
              </div>
            </div>

            {/* Calendar Table */}
            <div className="calendar-wrapper">
              <table className="table calendar-table text-center">
                <thead>
                  <tr>
                    <th>Time</th>
                    {weekDates.map((date, index) => {
                      const { dayName, dateStr } = formatDateHeader(date);
                      const year = date.getFullYear();
                      const month = (date.getMonth() + 1).toString().padStart(2, '0');
                      const day = date.getDate().toString().padStart(2, '0');
                      const dateKey = `${year}-${month}-${day}`;
                      const count = calendarEvents.filter(e => e.date === dateKey).length;
                      
                      return (
                        <th key={index}>
                          {dayName} {dateStr}<br />
                          <small className='fw-bold'>{count.toString().padStart(2, '0')} Reservation</small>
                        </th>
                      );
                    })}
                  </tr>
                </thead>

                <tbody>
                  {timeSlots.map((slot, index) => (
                    <tr key={index}>
                      <td className='table-time'>{slot.label}</td>
                      {weekDates.map((date, dateIndex) => {
                        const event = getEventForSlot(date, slot.value);
                        return (
                          <td key={dateIndex}>
                            {event && (
                              <div className="third-btn-sm">Check Out<br />Guest</div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}

      </div>
      
      <style jsx>{`
        .property-scroll-container {
          overflow-x: auto;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: #ccc #f1f1f1;
        }
        
        .property-scroll-container::-webkit-scrollbar {
          height: 8px;
        }
        
        .property-scroll-container::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .property-scroll-container::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 10px;
        }
        
        .property-scroll-container::-webkit-scrollbar-thumb:hover {
          background: #999;
        }
        
        .property-card-wrapper {
          min-width: 350px;
          max-width: 350px;
          margin:10px 0;
          flex-shrink: 0;
        }
        
        .property-scroll-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: white;
          border: 1px solid #ddd;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .property-scroll-btn:hover {
          background: #f8f9fa;
          // box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        
        .property-scroll-left {
          left: 0px;
        }
        
        .property-scroll-right {
          right: 0px;
        }

        @media (max-width: 768px) {
          .property-card-wrapper {
            min-width: 280px;
            max-width: 280px;
          }
          
          .property-scroll-btn {
            width: 35px;
            height: 35px;
          }
          
          .property-scroll-left {
            left: -10px;
          }
          
          .property-scroll-right {
            right: -10px;
          }
        }
      `}</style>
    </section>
  );
};

export default DashboardCalendarMain;