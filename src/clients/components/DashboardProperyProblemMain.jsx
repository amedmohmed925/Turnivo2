import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons';
import { Person, Settings, Logout } from '@mui/icons-material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Link } from 'react-router-dom';

const DashboardProperyProblemMain = ({ onMobileMenuClick }) => {
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
            <h2 className="mb-0 dashboard-title">Report a problem request</h2>
          </div>
          <div className="d-flex justify-content-end gap-2 align-items-center">
            <div className="dashboard-lang-btn d-flex gap-1 align-items-center">
              <img src="../assets/global.svg" alt="notification" />
              <span>English</span>
            </div>
            <Link to='/client/notifications' className="notification-icon-container">
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
        <h2 className="mb-0 dashboard-title">Report a problem request</h2>
        <div className="row">
          <div className="col-12">
            <div className="property-management-card mt-3 w-100">
              <div className="d-flex align-items-start flex-column flex-md-row gap-3 w-100">
                <div className="d-flex flex-column align-items-start gap-2 w-100">
                    <div className="sec-border w-100">
                        <div className="d-flex w-100 align-items-center gap-2">
                            <img src="../assets/property-management-card-img.png" className='property-management-card-img-2' alt="Property" />
                            <div className='d-flex flex-column gap-2 align-items-start'>
                                <div className='villa-badge py-1 px-3 rounded-pill'>Villa</div>
                                <div className="d-flex align-items-center">
                                    <img src="../assets/location.svg" className='img-fluid' alt="location" />
                                    <p className="property-management-card-address m-0">Riyadh, Saudi Arabia</p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex gap-3 align-items-center justify-content-between flex-wrap w-100 py-1 px-2 rounded-1 mt-2">
                            <div className="d-flex align-items-center gap-1">
                            <img src="../assets/property-card-icon-1.svg" className='img-fluid' alt="location" />
                            <h6 className="property-management-card-icon-label m-0">3 floors</h6>
                            </div>
                            <div className='card-border-right'>|</div>
                            <div className="d-flex align-items-center gap-1">
                            <img src="../assets/property-card-icon-2.svg" className='img-fluid' alt="location" />
                            <h6 className="property-management-card-icon-label m-0">7 rooms</h6>
                            </div>
                            <div className='card-border-right'>|</div>
                            <div className="d-flex align-items-center gap-1">
                            <img src="../assets/property-card-icon-3.svg" className='img-fluid' alt="location" />
                            <h6 className="property-management-card-icon-label m-0">300 m</h6>
                            </div>
                            <div className='card-border-right'>|</div>
                            <div className="d-flex align-items-center gap-1">
                            <img src="../assets/property-card-icon-4.svg" className='img-fluid' alt="location" />
                            <h6 className="property-management-card-icon-label m-0">4 bathrooms</h6>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex w-100 align-items-md-center flex-column flex-md-row gap-2 w-100">
                        <img src="../assets/problem-img-1.png" className='img-fluid problem-img' alt="location" />   
                        <div className='d-flex flex-column gap-2 align-items-start'>
                            <h6 className="property-problem-title mb-0">Air conditioning repair</h6>
                            <div className="d-flex align-items-center gap-1">
                                <h6 className="property-management-card-title m-0">temp code : </h6>
                                <p className="dashboard-card-link m-0">38274921</p>
                            </div>
                            <div className="d-flex align-items-center gap-1">
                                <img src="../assets/calendar-3.svg" alt="calendar" />
                                <p className="dashboard-home-card-2-desc-3 m-0">June 12, 2026</p>
                            </div>
                            <div className="d-flex align-items-center gap-1">
                                <img src="../assets/clock.svg" alt="clock" />
                                <p className="dashboard-home-card-2-desc-3 m-0">8:00 pm - 10:00 pm</p>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <h6 className="property-management-card-title mb-1 mt-2">Problem description</h6>
                        <div className='villa-badge py-1 px-3 rounded-pill'>cleaning</div>
                    </div>
                    <p className='problem-desc bg-white p-1 w-100 m-0'>Poor cooling has been reported in the air conditioner located in Office 204 on the second floor.</p>
                    <div className="d-flex justify-content-end w-100">
                      <Link to='/client/cleaning-request' className="sec-btn rounded-2 px-4 py-2 w-50-100 text-decoration-none">
                        Request cleaning service
                      </Link>
                    </div>
                    <div className="pending-badge w-100 py-2 text-center d-none">Your request is pending</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="property-management-card mt-3 w-100">
              <div className="d-flex align-items-start flex-column flex-md-row gap-3 w-100">
                <div className="d-flex flex-column align-items-start gap-2 w-100">
                    <div className="sec-border w-100">
                        <div className="d-flex w-100 align-items-center gap-2">
                            <img src="../assets/property-management-card-img.png" className='property-management-card-img-2' alt="Property" />
                            <div className='d-flex flex-column gap-2 align-items-start'>
                                <div className='villa-badge py-1 px-3 rounded-pill'>Villa</div>
                                <div className="d-flex align-items-center">
                                    <img src="../assets/location.svg" className='img-fluid' alt="location" />
                                    <p className="property-management-card-address m-0">Riyadh, Saudi Arabia</p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex gap-3 align-items-center justify-content-between flex-wrap w-100 py-1 px-2 rounded-1 mt-2">
                            <div className="d-flex align-items-center gap-1">
                            <img src="../assets/property-card-icon-1.svg" className='img-fluid' alt="location" />
                            <h6 className="property-management-card-icon-label m-0">3 floors</h6>
                            </div>
                            <div className='card-border-right'>|</div>
                            <div className="d-flex align-items-center gap-1">
                            <img src="../assets/property-card-icon-2.svg" className='img-fluid' alt="location" />
                            <h6 className="property-management-card-icon-label m-0">7 rooms</h6>
                            </div>
                            <div className='card-border-right'>|</div>
                            <div className="d-flex align-items-center gap-1">
                            <img src="../assets/property-card-icon-3.svg" className='img-fluid' alt="location" />
                            <h6 className="property-management-card-icon-label m-0">300 m</h6>
                            </div>
                            <div className='card-border-right'>|</div>
                            <div className="d-flex align-items-center gap-1">
                            <img src="../assets/property-card-icon-4.svg" className='img-fluid' alt="location" />
                            <h6 className="property-management-card-icon-label m-0">4 bathrooms</h6>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex w-100 align-items-md-center flex-column flex-md-row gap-2 w-100">
                        <img src="../assets/problem-img-1.png" className='img-fluid problem-img' alt="location" />   
                        <div className='d-flex flex-column gap-2 align-items-start'>
                            <h6 className="property-problem-title mb-0">Air conditioning repair</h6>
                            <div className="d-flex align-items-center gap-1">
                                <h6 className="property-management-card-title m-0">temp code : </h6>
                                <p className="dashboard-card-link m-0">38274921</p>
                            </div>
                            <div className="d-flex align-items-center gap-1">
                                <img src="../assets/calendar-3.svg" alt="calendar" />
                                <p className="dashboard-home-card-2-desc-3 m-0">June 12, 2026</p>
                            </div>
                            <div className="d-flex align-items-center gap-1">
                                <img src="../assets/clock.svg" alt="clock" />
                                <p className="dashboard-home-card-2-desc-3 m-0">8:00 pm - 10:00 pm</p>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <h6 className="property-management-card-title mb-1 mt-2">Problem description</h6>
                        <div className='villa-badge py-1 px-3 rounded-pill'>cleaning</div>
                    </div>
                    <p className='problem-desc bg-white p-1 w-100 m-0'>Poor cooling has been reported in the air conditioner located in Office 204 on the second floor.</p>
                    <div className="d-flex justify-content-end w-100">
                      <Link to='/client/maintenance' className="main-btn rounded-2 px-3 py-2 w-50-100 text-decoration-none">
                        Request maintenance service
                      </Link>
                    </div>
                    <div className="processed-badge w-100 py-2 text-center d-none">Your request is Processed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default DashboardProperyProblemMain;