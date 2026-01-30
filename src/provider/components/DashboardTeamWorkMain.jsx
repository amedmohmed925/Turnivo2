import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from 'react-router-dom';
import { getTeam, getPendingTeam, getSupervisorProviderCalendar } from '../../api/superviserTeamApi';
import { useSelector } from 'react-redux';
import ProviderHeader from './ProviderHeader';

const DashboardTeamWorkMain = ({ onMobileMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { token: accessToken } = useSelector((state) => state.auth);
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [availabilityData, setAvailabilityData] = useState([]);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);

  // Fetch team data and pending requests count and pending requests count
  useEffect(() => {
    const fetchTeam = async () => {
      if (!accessToken) return;
      try {
        setLoading(true);
        const response = await getTeam(accessToken);
        if (response.status === 1 && response.data?.[0]?.items) {
          setTeamData(response.data[0].items);
        }
      } catch (error) {
        console.error('Failed to fetch team:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPendingCount = async () => {
      if (!accessToken) return;
      try {
        const response = await getPendingTeam(accessToken);
        if (response.status === 1 && response.data?.[0]?.items) {
          setPendingRequestsCount(response.data[0].items.length);
        }
      } catch (error) {
        console.error('Failed to fetch pending count:', error);
      }
    };

    fetchTeam();
    fetchPendingCount();
  }, [accessToken]);

  const handleViewProfile = (member) => {
    // Use the member data directly instead of fetching from API
    setSelectedMember(member);
    setShowModal(true);
  };

  const handleViewAvailability = async (member) => {
    try {
      setAvailabilityLoading(true);
      setSelectedMember(member);
      setShowAvailabilityModal(true);
      
      const response = await getSupervisorProviderCalendar(accessToken, member.user?.id || member.id);
      if (response.status === 1 && response.data?.[0]) {
        // Handle nested array structure: data: [[ {...}, {...} ]]
        const data = Array.isArray(response.data[0]) ? response.data[0] : response.data;
        setAvailabilityData(Array.isArray(data) ? data : []);
      } else {
        setAvailabilityData([]);
      }
    } catch (error) {
      console.error('Failed to fetch availability:', error);
      setAvailabilityData([]);
    } finally {
      setAvailabilityLoading(false);
    }
  };

  // Calendar helper functions
  const getWeekDays = (startDate) => {
    const days = [];
    const start = new Date(startDate);
    start.setDate(start.getDate() - start.getDay()); // Start from Sunday
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getDayName = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const formatDisplayDate = (date) => {
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
  };

  const timeSlots = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];

  const getAvailabilityForSlot = (date, timeSlot) => {
    const dateStr = formatDate(date);
    const slotHour = parseInt(timeSlot.split(':')[0]);
    
    return availabilityData.find(item => {
      if (item.date !== dateStr) return false;
      const fromHour = parseInt(item.time_from.split(':')[0]);
      const toHour = parseInt(item.time_to.split(':')[0]);
      return slotHour >= fromHour && slotHour < toHour;
    });
  };

  const getReservationsCount = (date) => {
    const dateStr = formatDate(date);
    return availabilityData.filter(item => item.date === dateStr).length;
  };

  const navigateWeek = (direction) => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(newStart.getDate() + (direction * 7));
    setCurrentWeekStart(newStart);
  };

  const goToToday = () => {
    setCurrentWeekStart(new Date());
  };

  const weekDays = getWeekDays(currentWeekStart);

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

  const handleDropdownItemClick = (item) => {
    console.log(`Clicked on ${item}`);
    setIsDropdownOpen(false);
    // Add your navigation logic here
  };




  return (
    <section>
      <ProviderHeader title="Work team" onMobileMenuClick={onMobileMenuClick} />
      <div className="dashboard-home-content px-3 mt-2">
        <div className="d-flex justify-content-between align-items-center">
        <div className="search-input-wrapper mb-3 mt-2">
          <SearchOutlinedIcon className="search-icon" />
          <input
            type="text"
            className="search-gray-input form-control"
            placeholder="Search for a worker"
          />
        </div>
          <div className="d-flex gap-2 align-items-center flex-wrap">
            <Link to='/provider/team-work-requests' className='text-decoration-none'>
                      <button
  className="main-btn rounded-2 px-4 d-flex gap-1 align-items-center py-2 w-50-100"
>
 Team  requests
 {pendingRequestsCount > 0 && <span className='requests-badge'>{pendingRequestsCount}</span>}
                        </button>
            </Link>
            <Link to='/provider/team-work-add-employee' className='text-decoration-none'>
                      <button 
            type="submit" 
            className="sec-btn rounded-2 py-2 px-3 d-flex align-items-center justify-content-center gap-2 w-50-100"
          >
            <span>Add an employee</span>
                        </button>
            </Link>
          </div>


        </div>
        <div className="row">
          {loading ? (
            <div className="col-12 text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : teamData.length > 0 ? (
            teamData.map((item) => (
              <div className="col-lg-3 col-md-6 mb-3" key={item.id}>
                <div className="bg-light-gray p-3 rounded-3 h-100" style={{cursor: 'pointer'}}>
                  <div className="text-center mb-2">
                    <img 
                      src={item.user?.avatar || "/assets/team-img.png"} 
                      className='rounded-circle' 
                      alt="service" 
                      style={{width: '100px', height: '100px', objectFit: 'cover'}}
                    />
                  </div>
                  <h2 className="mb-0 dashboard-title py-2 text-center">{item.first_name} {item.last_name}</h2>
                  <div className="d-flex align-items-center justify-content-center gap-1">
                    <img src="/assets/flag-2.svg" className='flag-icon' alt="flag" />
                    <h3 className='training-details-card-desc m-0'>{item.company || 'Team Member'}</h3>
                  </div>
                  <div className="d-flex align-items-center gap-2 flex-wrap mt-3">
                    <button
                      className="main-btn rounded-2 px-2 d-flex gap-1 align-items-center justify-content-center py-2 flex-grow-1"
                      onClick={(e) => { e.stopPropagation(); handleViewProfile(item); }}
                    >
                      <img src="/assets/user-icon.svg" className='flag-icon' alt="user" />
                      Profile
                    </button>
                    <button
                      className="main-btn rounded-2 px-2 d-flex gap-1 align-items-center justify-content-center py-2 flex-grow-1"
                      onClick={(e) => { e.stopPropagation(); handleViewAvailability(item); }}
                    >
                      <img src="/assets/calendar-tick.svg" className='flag-icon' alt="user" />
                      Availability
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">No team members found</div>
          )}
        </div>

        {/* Profile Modal */}
        {showModal && selectedMember && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => setShowModal(false)}>
            <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Team Member Profile</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="text-center mb-3">
                    <img src={selectedMember.user?.avatar || "/assets/user.png"} alt="Avatar" className="rounded-circle" style={{width: '100px', height: '100px', objectFit: 'cover'}} />
                    <h4 className="mt-2">{selectedMember.first_name} {selectedMember.last_name}</h4>
                  </div>
                  <div className="row g-3">
                    <div className="col-md-6"><p><strong>Email:</strong> {selectedMember.email || 'N/A'}</p></div>
                    <div className="col-md-6"><p><strong>Phone:</strong> {selectedMember.phone || 'N/A'}</p></div>
                    {selectedMember.address && <div className="col-12"><p><strong>Address:</strong> {selectedMember.address}</p></div>}
                    {selectedMember.company && <div className="col-md-6"><p><strong>Company:</strong> {selectedMember.company}</p></div>}
                    {selectedMember.experience && <div className="col-md-6"><p><strong>Experience:</strong> {selectedMember.experience} Years</p></div>}
                    {selectedMember.start_date && <div className="col-md-6"><p><strong>Start Date:</strong> {selectedMember.start_date}</p></div>}
                    {selectedMember.created_at && <div className="col-md-6"><p><strong>Joined:</strong> {selectedMember.created_at}</p></div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Availability Modal */}
        {showAvailabilityModal && selectedMember && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => setShowAvailabilityModal(false)}>
            <div className="modal-dialog modal-dialog-centered modal-xl" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    Availability - {selectedMember.first_name} {selectedMember.last_name}
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowAvailabilityModal(false)}></button>
                </div>
                <div className="modal-body">
                  {availabilityLoading ? (
                    <div className="text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Calendar Controls */}
                      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                        <div className="d-flex gap-2 p-2 rounded-2 days-filter">
                          <button className="main-btn rounded-2 px-3 py-1" onClick={goToToday}>Today</button>
                          <button className="days-filter-item px-3 py-1" onClick={() => navigateWeek(-1)}>
                            <FontAwesomeIcon icon={faChevronLeft} /> Back
                          </button>
                          <button className="days-filter-item px-3 py-1" onClick={() => navigateWeek(1)}>
                            Next <FontAwesomeIcon icon={faChevronRight} />
                          </button>
                        </div>
                        <h6 className="m-0 date-label">
                          {formatDisplayDate(weekDays[0])} - {formatDisplayDate(weekDays[6])}
                        </h6>
                      </div>

                      {/* Calendar Table */}
                      <div className="calendar-wrapper" style={{overflowX: 'auto'}}>
                        <table className="table calendar-table text-center">
                          <thead>
                            <tr>
                              <th>Time</th>
                              {weekDays.map((day, index) => (
                                <th key={index}>
                                  {getDayName(day)} {formatDisplayDate(day)}
                                  <br />
                                  <small className='fw-bold'>{getReservationsCount(day)} Reservation</small>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {timeSlots.map((time, timeIndex) => (
                              <tr key={timeIndex}>
                                <td className='table-time'>{parseInt(time.split(':')[0]) > 12 ? `${parseInt(time.split(':')[0]) - 12}:00 PM` : `${time.split(':')[0]}:00 AM`}</td>
                                {weekDays.map((day, dayIndex) => {
                                  const availability = getAvailabilityForSlot(day, time);
                                  return (
                                    <td key={dayIndex}>
                                      {availability && (
                                        <div className={availability.status === 1 ? "third-btn-sm" : "sec-btn-sm h-100"}>
                                          {availability.status === 1 ? 'At work' : 'Available for work'}
                                        </div>
                                      )}
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {availabilityData.length === 0 && (
                        <div className="text-center py-3">
                          <p className="text-muted">No availability data found for this team member.</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DashboardTeamWorkMain;