import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons';
import { Person, Settings, Logout } from '@mui/icons-material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import {faCalendar} from '@fortawesome/free-regular-svg-icons'
import {faUser} from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom';


const DashboardProviderCalendarMain = ({ onMobileMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);



  
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
              <img src="../assets/global.svg" alt="notification" />
              <span>English</span>
            </div>
            <Link to='/provider/notifications' className="notification-icon-container">
              <img src="../assets/notification.svg" alt="notification" />
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
                  src="../assets/user.png" 
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
                    <img src="../assets/user-square.svg" alt="settings" />
                    <span>Profile</span>
                  </div>
                  <div 
                    className="dropdown-item d-flex gap-2 align-items-center"
                    onClick={() => handleDropdownItemClick('settings')}
                  >
                    <img src="../assets/setting-icon.svg" alt="settings" />
                    <span>Settings</span>
                  </div>
                  <div 
                    className="dropdown-item d-flex gap-2 align-items-center"
                    onClick={() => handleDropdownItemClick('logout')}
                  >
                    <img src="../assets/logout-icon.svg" alt="settings" />
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
                  <Link to='/provider/availability' 
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
              <table className="table calendar-table text-center">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Sunday 07/10<br /><small className='fw-bold'>0 Reservation</small></th>
                    <th>Monday 07/11<br /><small className='fw-bold'>03 Reservation</small></th>
                    <th>Tuesday 07/12<br /><small className='fw-bold'>0 Reservation</small></th>
                    <th>Wednesday 07/13<br /><small className='fw-bold'>0 Reservation</small></th>
                    <th>Thursday 07/14<br /><small className='fw-bold'>0 Reservation</small></th>
                    <th>Friday 07/15<br /><small className='fw-bold'>0 Reservation</small></th>
                    <th>Saturday 07/16<br /><small className='fw-bold'>0 Reservation</small></th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className='table-time'>8:00 AM</td>
                    <td></td>

                    <td></td>
                    <td></td>
                    <td>
                      <div className="third-btn-sm">At work</div>
                    </td>
                    <td></td>
                    <td></td>
                  </tr>

                  <tr>
                    <td className='table-time'>10:00 AM</td>
                    <td></td>
                    <td>
                      <div className="third-btn-sm">At work</div>
                    </td>
                    <td>
                      <div className="sec-btn-sm h-100">Available for work</div>
                    </td>
                    <td></td>
                    <td></td>

                    <td>
                      <div className="sec-btn-sm h-100">Available for work</div>
                    </td>
                  </tr>

                  <tr>
                    <td className='table-time'>12:00 PM</td>
                    <td>
                      <div className="sec-btn-sm h-100">Available for work</div>
                    </td>
                    <td></td>
                    <td>
                      <div className="third-btn-sm">At work</div>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>

      </div>
    </section>
  );
};

export default DashboardProviderCalendarMain;