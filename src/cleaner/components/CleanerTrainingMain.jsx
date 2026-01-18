import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars, faDownload } from '@fortawesome/free-solid-svg-icons';
import {faBookmark as faBookmark} from '@fortawesome/free-regular-svg-icons'
import { Person, Settings, Logout } from '@mui/icons-material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Link } from 'react-router-dom';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
const CleanerTrainingMain = ({ onMobileMenuClick }) => {
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
            <h2 className="mb-0 dashboard-title">add training</h2>
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
        <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
                      <div className="search-input-wrapper mt-2">
            <SearchOutlinedIcon className="search-icon" />
            <input
              type="text"
              className="search-gray-input form-control"
              placeholder="Find a request..."
            />
          </div>
        </div>
        <div className="row g-0 g-lg-2 mt-3">
          <div className="col-md-6 mb-2">
  <Link to='/cleaner/training-details' className="card text-decoration-none rounded-top-4 h-100 training-card">
    <img
      src="/assets/training-card-img.png"
      className="training-card-img img-fluid w-100 rounded-top-4"
      alt="card-img"
    />

    <div className="card-body p-2 d-flex flex-column">
      <div className="training-card-title mb-2">
        Develop an organized cleaning plan
      </div>

      <div className="training-card-desc mb-2">
        Cleaning your home is an essential task for maintaining a clean and healthy environment,
        but it can be overwhelming if not organized properly.
      </div>

      {/* icons */}
      <div className="card-actions d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <ThumbDownOffAltOutlinedIcon />
          <ThumbUpOffAltOutlinedIcon />
        </div>

        <div className="d-flex align-items-center gap-3">
          <FontAwesomeIcon icon={faDownload} className="fs-5" />
          <FontAwesomeIcon icon={faBookmark} className="fs-5" />
        </div>
      </div>
    </div>
  </Link>
            </div>
          <div className="col-md-6 mb-2">
  <Link to='/cleaner/training-details' className="card text-decoration-none rounded-top-4 h-100 training-card">
    <img
      src="/assets/training-card-img.png"
      className="training-card-img img-fluid w-100 rounded-top-4"
      alt="card-img"
    />

    <div className="card-body p-2 d-flex flex-column">
      <div className="training-card-title mb-2">
        Develop an organized cleaning plan
      </div>

      <div className="training-card-desc mb-2">
        Cleaning your home is an essential task for maintaining a clean and healthy environment,
        but it can be overwhelming if not organized properly. 
      </div>

      {/* icons */}
      <div className="card-actions d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <ThumbDownOffAltOutlinedIcon />
          <ThumbUpOffAltOutlinedIcon />
        </div>

        <div className="d-flex align-items-center gap-3">
          <FontAwesomeIcon icon={faDownload} className="fs-5" />
          <FontAwesomeIcon icon={faBookmark} className="fs-5" />
        </div>
      </div>
    </div>
  </Link>
            </div>
          <div className="col-md-6 mb-2">
  <Link to='/cleaner/training-details' className="card text-decoration-none rounded-top-4 h-100 training-card">
    <img
      src="/assets/training-card-img.png"
      className="training-card-img img-fluid w-100 rounded-top-4"
      alt="card-img"
    />

    <div className="card-body p-2 d-flex flex-column">
      <div className="training-card-title mb-2">
        Develop an organized cleaning plan
      </div>

      <div className="training-card-desc mb-2">
        Cleaning your home is an essential task for maintaining a clean and healthy environment,
        but it can be overwhelming if not organized properly. 
      </div>

      {/* icons */}
      <div className="card-actions d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <ThumbDownOffAltOutlinedIcon />
          <ThumbUpOffAltOutlinedIcon />
        </div>

        <div className="d-flex align-items-center gap-3">
          <FontAwesomeIcon icon={faDownload} className="fs-5" />
          <FontAwesomeIcon icon={faBookmark} className="fs-5" />
        </div>
      </div>
    </div>
  </Link>
            </div>
          <div className="col-md-6 mb-2">
  <Link to='/cleaner/training-details' className="card text-decoration-none rounded-top-4 h-100 training-card">
    <img
      src="/assets/training-card-img.png"
      className="training-card-img img-fluid w-100 rounded-top-4"
      alt="card-img"
    />

    <div className="card-body p-2 d-flex flex-column">
      <div className="training-card-title mb-2">
        Develop an organized cleaning plan
      </div>

      <div className="training-card-desc mb-2">
        Cleaning your home is an essential task for maintaining a clean and healthy environment,
        but it can be overwhelming if not organized properly. 
      </div>

      {/* icons */}
      <div className="card-actions d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <ThumbDownOffAltOutlinedIcon />
          <ThumbUpOffAltOutlinedIcon />
        </div>

        <div className="d-flex align-items-center gap-3">
          <FontAwesomeIcon icon={faDownload} className="fs-5" />
          <FontAwesomeIcon icon={faBookmark} className="fs-5" />
        </div>
      </div>
    </div>
  </Link>
            </div>


        </div>
        
      </div>
    </section>
  );
};

export default CleanerTrainingMain;