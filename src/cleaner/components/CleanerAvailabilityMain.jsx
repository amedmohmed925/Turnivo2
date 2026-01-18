import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars, faUser, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Person, Settings, Logout } from '@mui/icons-material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Link } from 'react-router-dom';

const CleanerAvailabilityMain = ({ onMobileMenuClick }) => {
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
        <img src="/assets/user.png" className='profile-img' alt="user" />
        <h2 className="mb-0 property-problem-title">Omar Alrajihi</h2>
        <div className="d-flex justify-content-between align-items-end gap-3 flex-wrap">
          <div>
            <div className="d-flex gap-1 align-items-center mt-2">
              <FontAwesomeIcon icon={faUser} className='gray-icon' />
              <p className='dashboard-small-title m-0'>New worker</p>
            </div>
            <div className="d-flex gap-1 align-items-center mt-2">
              <FontAwesomeIcon icon={faLocationDot} className='gray-icon' />
              <p className='dashboard-small-title m-0'>Riyadh, Al Narjis Neighborhood</p>
            </div>
          </div>
            <button className="main-btn rounded-2 px-3 py-2 w-50-100 d-flex gap-2 align-items-center">
                <img src="/assets/edit-2.svg" alt="edit" />
                Edit
            </button>
        </div>
        <h6 className='service-desc mt-3'>About</h6>
        <p className='dashboard-small-title m-0'>I am looking for reliable and professional cleaning services to keep my condominium unit clean. I make sure to choose services that suit my needs whether it's deep cleaning, daily, or after construction. I care about quality, punctuality, and the use of safe materials to ensure a healthy and comfortable environment.</p>
        <h6 className='service-desc mt-3'>Personal information</h6>

        <div className="row">
          <div className="col-12">
                <div className="mb-3 w-100">
                  <label className="form-label mb-1">Full name</label>
                  <input
                    type="text"
                    className="form-control rounded-2 py-2 px-3 w-100"
                    placeholder="Omar Alrajihi"
                  />
                </div>
          </div>
          <div className="col-md-6">
                <div className="mb-3 w-100">
                  <label className="form-label mb-1">Email</label>
                  <input
                    type="email"
                    className="form-control rounded-2 py-2 px-3 w-100"
                    placeholder="Omaralrajihi@gmail.com"
                  />
                </div>
          </div>
          <div className="col-md-6">
                <div className="mb-3 w-100">
                  <label className="form-label mb-1">Phone number</label>
                  <input
                    type="text"
                    className="form-control rounded-2 py-2 px-3 w-100"
                    placeholder="+299 876 434 999"
                  />
                </div>
          </div>
          <div className="col-12">
                <div className="mb-3 w-100">
                  <label className="form-label mb-1">Address</label>
                  <input
                    type="text"
                    className="form-control rounded-2 py-2 px-3 w-100"
                    placeholder="Enter address"
                  />
                </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default CleanerAvailabilityMain;