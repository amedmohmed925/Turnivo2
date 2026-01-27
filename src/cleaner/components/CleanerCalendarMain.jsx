import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons';
import { Person, Settings, Logout } from '@mui/icons-material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getCleanerCalendar } from '../../api/cleanerCalenderApi';
import { selectAccessToken } from '../../store/authSlice';


const CleanerCalendarMain = ({ onMobileMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [calendarData, setCalendarData] = useState([]);
  const accessToken = useSelector(selectAccessToken);

  // Add state to track selected order type

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

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        setIsLoading(true);

        if (!accessToken) {
          Swal.fire({
            icon: 'error',
            title: 'Authentication Required',
            text: 'Please login to continue',
          });
          return;
        }

        const response = await getCleanerCalendar(accessToken);
        if (response.status === 1 && Array.isArray(response.data)) {
          const flat = response.data.flat().filter(Boolean);
          setCalendarData(flat);
        } else {
          setCalendarData([]);
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'Failed to load calendar',
        });
        setCalendarData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCalendar();
  }, [accessToken]);

  const uniqueDates = Array.from(new Set(calendarData.map((item) => item.date))).sort();
  const timeSlots = Array.from(
    new Set(
      calendarData.map((item) => `${item.time_from || ''}-${item.time_to || ''}`).filter((slot) => slot !== '-')
    )
  ).sort();

  const getStatusBadge = (status) => {
    if (status === 1) return { className: 'third-btn-sm', label: 'At work' };
    return { className: 'sec-btn-sm h-100', label: 'Available for work' };
  };

  const getReservationsCount = (date) => calendarData.filter((item) => item.date === date).length;


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
            <h2 className="mb-0 dashboard-title">Calendar & Availability</h2>
          </div>
          <div className="d-flex justify-content-end gap-2 align-items-center">
            <div className="dashboard-lang-btn d-flex gap-1 align-items-center">
              <img src="/assets/global.svg" alt="notification" />
              <span>English</span>
            </div>
                        <Link to='/cleaner/shopping-cart' className="notification-icon-container">
                          <img src="/assets/shopping-cart.svg" alt="notification" />
                        </Link>
            <Link to='/cleaner/notifications' className="notification-icon-container">
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
        <div className="d-flex">
              <div className="d-flex package-filter align-items-center py-1 px-1 m-0 w-auto mb-2">
                  <button 
                    className={`rounded-2 border-0 px-2 py-2 sec-btn d-flex align-items-center gap-1`}
                  >
                    <FontAwesomeIcon icon={faCalendar} />
                   Calendar
                  </button>
                  <Link to='/cleaner/availability' 
                    className={`rounded-2 text-decoration-none border-0 px-2 py-2 days-filter-item d-flex align-items-center gap-1`}
                  >
                    <FontAwesomeIcon icon={faUser} />
                    Profile
                  </Link>
              </div>

        </div>
        <h6 className="dashboard-routes-sub m-0">Calendar</h6>
                        {/* Top Controls */}
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 mt-2">
              <div className="d-flex gap-2 p-2 rounded-2 days-filter">
                <button className="main-btn rounded-2 px-3 py-1">Today</button>
                <div className="days-filter-item px-3 py-1">Back</div>
                <div className="days-filter-item px-3 py-1">Next</div>
              </div>

              <h6 className="m-0 date-label">10 Mar 2025 - 16 Apr 2025</h6>

              <div className="d-flex gap-2 p-2 rounded-2 times-filter">
                <button className="main-btn rounded-2 px-3 py-1">Month</button>
                <div className="times-filter-item px-3 py-1">Week</div>
                <div className="times-filter-item px-3 py-1">Day</div>
              </div>
            </div>

            {/* Calendar Table */}
            <div className="calendar-wrapper">
              {isLoading ? (
                <div className="text-center my-4">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : uniqueDates.length === 0 ? (
                <div className="text-center my-4 text-muted">No reservations found.</div>
              ) : (
                <table className="table calendar-table text-center">
                  <thead>
                    <tr>
                      <th>Time</th>
                      {uniqueDates.map((date) => (
                        <th key={date}>
                          {date}
                          <br />
                          <small className="fw-bold">{getReservationsCount(date)} Reservation</small>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {timeSlots.map((slot) => {
                      const [from, to] = slot.split('-');
                      return (
                        <tr key={slot}>
                          <td className="table-time">{from}</td>
                          {uniqueDates.map((date) => {
                            const match = calendarData.find(
                              (item) => item.date === date && `${item.time_from}-${item.time_to}` === slot
                            );
                            if (!match) return <td key={`${date}-${slot}`}></td>;
                            const badge = getStatusBadge(match.status);
                            return (
                              <td key={`${date}-${slot}`}>
                                <div className={badge.className}>{badge.label}</div>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

      </div>
    </section>
  );
};

export default CleanerCalendarMain;