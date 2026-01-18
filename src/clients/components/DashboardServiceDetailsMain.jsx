import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons';
import { Person, Settings, Logout } from '@mui/icons-material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Link } from 'react-router-dom';

const DashboardServiceDetailsMain = ({ onMobileMenuClick }) => {
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
            <h2 className="mb-0 dashboard-title">Cleaning request</h2>
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
        <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
            <h2 className="mb-0 dashboard-title">Service details</h2>
            <button className="main-btn rounded-2 px-3 py-2 w-50-100">
                Edit
            </button>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="property-management-card mt-3 w-100">
              <div className="d-flex align-items-start flex-column flex-md-row gap-3 w-100">
                <div className="d-flex flex-column align-items-start gap-2 w-100">
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <h6 className="property-management-card-title m-0">Upholstery and carpet cleaning</h6>
                    <div className='villa-badge py-1 px-3 rounded-pill'>Cleaning</div>
                  </div>
                <img src="/assets/property-management-card-img.png" className='property-management-card-img' alt="Property" />
                  <div className="d-flex gap-4 align-items-center flex-wrap bg-white w-100 py-1 px-2 rounded-1">
                    <div className="d-flex align-items-center gap-1">
                      <img src="/assets/calendar-3.svg" alt="calendar" />
                      <p className="dashboard-home-card-2-desc-3 m-0">June 12, 2026</p>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <img src="/assets/clock.svg" alt="clock" />
                      <p className="dashboard-home-card-2-desc-3 mb-0">8:00 pm - 10:00 pm</p>
                    </div>
                  </div>
                    <h2 className="mb-0 dashboard-title">Nakheel Neighborhood Hotel</h2>
                    <div className="d-flex align-items-center">
                        <img src="/assets/location.svg" className='img-fluid' alt="location" />
                        <p className="property-management-card-address m-0">Riyadh, Saudi Arabia, Al Nakheel Street</p>
                    </div>
                    <div className="d-flex align-items-center gap-2 px-1">
                        <img src="/assets/dollar-2.svg" className='img-fluid' alt="location" />
                        <p className="property-management-card-address fw-bold m-0">Price</p>
                        <p className="currency m-0">250 SAR</p>
                    </div>
                    <h6 className="property-management-card-title mb-1 mt-2">Additional Services</h6>
                    <div className="row w-100 g-0 g-lg-2">
                                      <div className="col-md-2 col-12 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100 active">
                  <img src="/assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the pool</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
                                      <div className="col-md-2 col-12 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100 active">
                  <img src="/assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the pool</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
                                      <div className="col-md-2 col-12 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100 active">
                  <img src="/assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the pool</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
                    </div>
                    <div className="row w-100 g-0">
                        <div className="col-md-6">
                                            <div className='total-payments p-3 rounded-3'>
                  <div className='d-flex justify-content-between gap-4 align-items-center mb-2'>
                    <h3 className='service-desc m-0'>Deep cleaning</h3>
                    <h4 className='service-price m-0'>200 $</h4>
                  </div>
                  <div className='d-flex justify-content-between gap-4 align-items-center mb-2'>
                    <h3 className='service-desc m-0'>Add-on services</h3>
                    <h4 className='service-price m-0'>100 $</h4>
                  </div>
                  <div className='d-flex justify-content-between gap-4 align-items-center mb-2 px-1 px-md-2'>
                    <h3 className='property-management-card-address m-0'>Cleaning the garden</h3>
                    <h4 className='sub-service-price m-0'>50 $</h4>
                  </div>
                  <div className='d-flex justify-content-between gap-4 align-items-center mb-2 px-1 px-md-2'>
                    <h3 className='property-management-card-address m-0'>Cleaning the garage</h3>
                    <h4 className='sub-service-price m-0'>50 $</h4>
                  </div>
                  <div className='d-flex justify-content-between gap-4 align-items-center'>
                    <h3 className='service-desc m-0'>Total</h3>
                    <h4 className='service-total-price m-0'>300 $</h4>
                  </div>
                </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default DashboardServiceDetailsMain;