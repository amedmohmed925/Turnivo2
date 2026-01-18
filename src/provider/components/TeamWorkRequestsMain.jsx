import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons';
import { Person, Settings, Logout } from '@mui/icons-material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Link } from 'react-router-dom';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';

const TeamWorkRequestsMain = ({ onMobileMenuClick }) => {
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
            <h2 className="mb-0 dashboard-title">Work team</h2>
          </div>
          <div className="d-flex justify-content-end gap-2 align-items-center">
            <div className="dashboard-lang-btn d-flex gap-1 align-items-center">
              <img src="/assets/global.svg" alt="notification" />
              <span>English</span>
            </div>
            <Link to='/provider/notifications' className="notification-icon-container">
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
          <div className="col-md-6 mb-3">
                            <div className="bg-light-gray p-3 rounded-3 h-100 d-flex gap-2 align-items-center">
                  <img src="/assets/team-img.png" className='img-fluid team-img-2' alt="service" />
                    <div className="d-flex flex-column">
                                          <h2 className="mb-0 dashboard-title pb-2 ps-1">Arlene McCoy</h2>
                  <div className="d-flex align-items-center gap-1">
                    <img src="/assets/flag-2.svg" className='flag-icon' alt="flag" />
                    <h3 className='training-details-card-desc m-0'>Operations Manager</h3>
                  </div>
                  <p className='m-0 mt-1 ms-1 team-request-desc'>Asks to join your timeline</p>
                              <div className="d-flex gap-2 mt-1">
            <button className="sec-btn rounded-2 px-4 py-2">
              Accept
            </button>
            <button className="btn btn-outline-danger py-2">Reject</button>
          </div>
                    </div>
                </div>
          </div>
          <div className="col-md-6 mb-3">
                            <div className="bg-light-gray p-3 rounded-3 h-100 d-flex gap-2 align-items-center">
                  <img src="/assets/team-img.png" className='img-fluid team-img-2' alt="service" />
                    <div className="d-flex flex-column">
                                          <h2 className="mb-0 dashboard-title pb-2 ps-1">Arlene McCoy</h2>
                  <div className="d-flex align-items-center gap-1">
                    <img src="/assets/flag-2.svg" className='flag-icon' alt="flag" />
                    <h3 className='training-details-card-desc m-0'>Operations Manager</h3>
                  </div>
                  <p className='m-0 mt-1 ms-1 team-request-desc'>Asks to join your timeline</p>
                              <div className="d-flex gap-2 mt-1">
            <button className="sec-btn rounded-2 px-4 py-2">
              Accept
            </button>
            <button className="btn btn-outline-danger py-2">Reject</button>
          </div>
                    </div>
                </div>
          </div>
          <div className="col-md-6 mb-3">
                            <div className="bg-light-gray p-3 rounded-3 h-100 d-flex gap-2 align-items-center">
                  <img src="/assets/team-img.png" className='img-fluid team-img-2' alt="service" />
                    <div className="d-flex flex-column">
                                          <h2 className="mb-0 dashboard-title pb-2 ps-1">Arlene McCoy</h2>
                  <div className="d-flex align-items-center gap-1">
                    <img src="/assets/flag-2.svg" className='flag-icon' alt="flag" />
                    <h3 className='training-details-card-desc m-0'>Operations Manager</h3>
                  </div>
                  <p className='m-0 mt-1 ms-1 team-request-desc'>Asks to join your timeline</p>
                              <div className="d-flex gap-2 mt-1">
            <button className="sec-btn rounded-2 px-4 py-2">
              Accept
            </button>
            <button className="btn btn-outline-danger py-2">Reject</button>
          </div>
                    </div>
                </div>
          </div>
          <div className="col-md-6 mb-3">
                            <div className="bg-light-gray p-3 rounded-3 h-100 d-flex gap-2 align-items-center">
                  <img src="/assets/team-img.png" className='img-fluid team-img-2' alt="service" />
                    <div className="d-flex flex-column">
                                          <h2 className="mb-0 dashboard-title pb-2 ps-1">Arlene McCoy</h2>
                  <div className="d-flex align-items-center gap-1">
                    <img src="/assets/flag-2.svg" className='flag-icon' alt="flag" />
                    <h3 className='training-details-card-desc m-0'>Operations Manager</h3>
                  </div>
                  <p className='m-0 mt-1 ms-1 team-request-desc'>Asks to join your timeline</p>
                              <div className="d-flex gap-2 mt-1">
            <button className="sec-btn rounded-2 px-4 py-2">
              Accept
            </button>
            <button className="btn btn-outline-danger py-2">Reject</button>
          </div>
                    </div>
                </div>
          </div>
          <div className="col-md-6 mb-3">
                            <div className="bg-light-gray p-3 rounded-3 h-100 d-flex gap-2 align-items-center">
                  <img src="/assets/team-img.png" className='img-fluid team-img-2' alt="service" />
                    <div className="d-flex flex-column">
                                          <h2 className="mb-0 dashboard-title pb-2 ps-1">Arlene McCoy</h2>
                  <div className="d-flex align-items-center gap-1">
                    <img src="/assets/flag-2.svg" className='flag-icon' alt="flag" />
                    <h3 className='training-details-card-desc m-0'>Operations Manager</h3>
                  </div>
                  <p className='m-0 mt-1 ms-1 team-request-desc'>Asks to join your timeline</p>
                              <div className="d-flex gap-2 mt-1">
            <button className="sec-btn rounded-2 px-4 py-2">
              Accept
            </button>
            <button className="btn btn-outline-danger py-2">Reject</button>
          </div>
                    </div>
                </div>
          </div>
          <div className="col-md-6 mb-3">
                            <div className="bg-light-gray p-3 rounded-3 h-100 d-flex gap-2 align-items-center">
                  <img src="/assets/team-img.png" className='img-fluid team-img-2' alt="service" />
                    <div className="d-flex flex-column">
                                          <h2 className="mb-0 dashboard-title pb-2 ps-1">Arlene McCoy</h2>
                  <div className="d-flex align-items-center gap-1">
                    <img src="/assets/flag-2.svg" className='flag-icon' alt="flag" />
                    <h3 className='training-details-card-desc m-0'>Operations Manager</h3>
                  </div>
                  <p className='m-0 mt-1 ms-1 team-request-desc'>Asks to join your timeline</p>
                              <div className="d-flex gap-2 mt-1">
            <button className="sec-btn rounded-2 px-4 py-2">
              Accept
            </button>
            <button className="btn btn-outline-danger py-2">Reject</button>
          </div>
                    </div>
                </div>
          </div>
          <div className="col-md-6 mb-3">
                            <div className="bg-light-gray p-3 rounded-3 h-100 d-flex gap-2 align-items-center">
                  <img src="/assets/team-img.png" className='img-fluid team-img-2' alt="service" />
                    <div className="d-flex flex-column">
                                          <h2 className="mb-0 dashboard-title pb-2 ps-1">Arlene McCoy</h2>
                  <div className="d-flex align-items-center gap-1">
                    <img src="/assets/flag-2.svg" className='flag-icon' alt="flag" />
                    <h3 className='training-details-card-desc m-0'>Operations Manager</h3>
                  </div>
                  <p className='m-0 mt-1 ms-1 team-request-desc'>Asks to join your timeline</p>
                              <div className="d-flex gap-2 mt-1">
            <button className="sec-btn rounded-2 px-4 py-2">
              Accept
            </button>
            <button className="btn btn-outline-danger py-2">Reject</button>
          </div>
                    </div>
                </div>
          </div>
          <div className="col-md-6 mb-3">
                            <div className="bg-light-gray p-3 rounded-3 h-100 d-flex gap-2 align-items-center">
                  <img src="/assets/team-img.png" className='img-fluid team-img-2' alt="service" />
                    <div className="d-flex flex-column">
                                          <h2 className="mb-0 dashboard-title pb-2 ps-1">Arlene McCoy</h2>
                  <div className="d-flex align-items-center gap-1">
                    <img src="/assets/flag-2.svg" className='flag-icon' alt="flag" />
                    <h3 className='training-details-card-desc m-0'>Operations Manager</h3>
                  </div>
                  <p className='m-0 mt-1 ms-1 team-request-desc'>Asks to join your timeline</p>
                              <div className="d-flex gap-2 mt-1">
            <button className="sec-btn rounded-2 px-4 py-2">
              Accept
            </button>
            <button className="btn btn-outline-danger py-2">Reject</button>
          </div>
                    </div>
                </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamWorkRequestsMain;