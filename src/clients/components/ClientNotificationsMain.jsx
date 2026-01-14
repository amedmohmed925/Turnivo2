import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons';
import { Person, Settings, Logout } from '@mui/icons-material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Link } from 'react-router-dom';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
const ClientNotificationsMain = ({ onMobileMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  

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
            <h2 className="mb-0 dashboard-title">Notifications</h2>
          </div>
          <div className="d-flex justify-content-end gap-2 align-items-center">
            <div className="dashboard-lang-btn d-flex gap-1 align-items-center">
              <img src="../assets/global.svg" alt="notification" />
              <span>English</span>
            </div>
            <Link to='/client/notifications' className="notification-icon-container sec-btn">
              <img src="../assets/notification-2.svg" alt="notification" />
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
        <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
            <div className='dashboard-title m-0'> Notifications (121)</div>
                             <div className="position-relative">
                    <select
                      id="propertyType"
                      className="form-select custom-select-bs unread-bg border-0 py-2"
                      defaultValue=""
                      required
                    >
                      <option value="New">New</option>
                    </select>

                    {/* Bootstrap Icon */}
                    <i className="bi bi-chevron-down select-bs-icon"></i>
                  </div>
        </div>
        <div className="notifications-container row g-0 g-lg-2 mt-2">
            <div className="col-12 mt-2 notification-item unread-bg d-flex justify-content-between align-items-center gap-3">
                <div className="d-flex align-items-center gap-2">
                    <div className="unread-dot"></div>
                    <img src="../assets/user.png" alt="user" className="notification-user-img" />
                    <p className='notification-desc m-0'><span className='fw-bold'>Omar Alrajihi</span> Send you a cleaning service request</p>
                </div>
                    <p className='notification-time text-nowrap m-0'>1 hour ago</p>
            </div>
            <div className="col-12 mt-2 notification-item d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                    <div className="read-dot"></div>
                    <img src="../assets/user.png" alt="user" className="notification-user-img" />
                    <p className='notification-desc m-0'><span className='fw-bold'>Omar Alrajihi</span> Send you a cleaning service request</p>
                </div>
                    <p className='notification-time text-nowrap m-0'>1 hour ago</p>
            </div>
            <div className="col-12 mt-2 notification-item unread-bg d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                    <div className="unread-dot"></div>
                    <img src="../assets/user.png" alt="user" className="notification-user-img" />
                    <p className='notification-desc m-0'><span className='fw-bold'>Omar Alrajihi</span> Send you a cleaning service request</p>
                </div>
                    <p className='notification-time text-nowrap m-0'>1 hour ago</p>
            </div>
            <div className="col-12 mt-2 notification-item d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                    <div className="read-dot"></div>
                    <img src="../assets/user.png" alt="user" className="notification-user-img" />
                    <p className='notification-desc m-0'><span className='fw-bold'>Omar Alrajihi</span> Send you a cleaning service request</p>
                </div>
                    <p className='notification-time text-nowrap m-0'>1 hour ago</p>
            </div>
            <div className="col-12 mt-2 notification-item unread-bg d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                    <div className="unread-dot"></div>
                    <img src="../assets/user.png" alt="user" className="notification-user-img" />
                    <p className='notification-desc m-0'><span className='fw-bold'>Omar Alrajihi</span> Send you a cleaning service request</p>
                </div>
                    <p className='notification-time text-nowrap m-0'>1 hour ago</p>
            </div>
            <div className="col-12 mt-2 notification-item d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                    <div className="read-dot"></div>
                    <img src="../assets/user.png" alt="user" className="notification-user-img" />
                    <p className='notification-desc m-0'><span className='fw-bold'>Omar Alrajihi</span> Send you a cleaning service request</p>
                </div>
                    <p className='notification-time text-nowrap m-0'>1 hour ago</p>
            </div>
            <div className="col-12 mt-2 notification-item unread-bg d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                    <div className="unread-dot"></div>
                    <img src="../assets/user.png" alt="user" className="notification-user-img" />
                    <p className='notification-desc m-0'><span className='fw-bold'>Omar Alrajihi</span> Send you a cleaning service request</p>
                </div>
                    <p className='notification-time text-nowrap m-0'>1 hour ago</p>
            </div>
            <div className="col-12 mt-2 notification-item d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                    <div className="read-dot"></div>
                    <img src="../assets/user.png" alt="user" className="notification-user-img" />
                    <p className='notification-desc m-0'><span className='fw-bold'>Omar Alrajihi</span> Send you a cleaning service request</p>
                </div>
                    <p className='notification-time text-nowrap m-0'>1 hour ago</p>
            </div>
            <div className="col-12 mt-2 notification-item unread-bg d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                    <div className="unread-dot"></div>
                    <img src="../assets/user.png" alt="user" className="notification-user-img" />
                    <p className='notification-desc m-0'><span className='fw-bold'>Omar Alrajihi</span> Send you a cleaning service request</p>
                </div>
                    <p className='notification-time text-nowrap m-0'>1 hour ago</p>
            </div>
            <div className="col-12 mt-2 notification-item d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                    <div className="read-dot"></div>
                    <img src="../assets/user.png" alt="user" className="notification-user-img" />
                    <p className='notification-desc m-0'><span className='fw-bold'>Omar Alrajihi</span> Send you a cleaning service request</p>
                </div>
                    <p className='notification-time text-nowrap m-0'>1 hour ago</p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ClientNotificationsMain;