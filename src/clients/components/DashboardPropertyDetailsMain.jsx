import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Person, Settings, Logout } from '@mui/icons-material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Link } from 'react-router-dom';

const DashboardPropertyDetailsMain = ({ onMobileMenuClick }) => {
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
            <h2 className="mb-0 dashboard-title">Property Details</h2>
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
        <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
            <div className="d-flex align-items-center">
                <h6 className="dashboard-routes-main m-0">Property Management</h6>
                <FontAwesomeIcon icon={faChevronRight} className='dashboard-routes-icon' />
                <h6 className="dashboard-routes-sub m-0">Guest House Riyadh</h6>
            </div>
                    <div className="d-flex gap-2 align-items-center flex-wrap">
                              <Link to='/client/calendar' className="third-btn d-flex align-items-center justify-content-center gap-1 w-50-100 text-decoration-none">
                      <img src="../assets/calendar-icon-2.svg" alt="calendar" />
                      <span className="mb-0">Calendar</span>
                    </Link>
                      <Link to='/client/cleaning-request' className="sec-btn rounded-2 px-4 py-2 w-50-100 text-decoration-none">
                        Request cleaning service
                      </Link>
                      <Link to='/client/maintenance' className="main-btn rounded-2 px-3 py-2 w-50-100 text-decoration-none">
                        Request maintenance service
                      </Link>
                    </div>
        </div>
        <div className="row g-0">
          <div className="col-12">
            <div className="property-management-card mt-3 w-100">
              <div className="d-flex align-items-start flex-column flex-md-row gap-3 w-100">
                <div className="d-flex flex-column align-items-start gap-2 w-100">
                  <div className="d-flex justify-content-between w-100 align-items-center">
                    <h6 className="property-management-card-title m-0">Guest House Riyadh</h6>
                    <div className='villa-badge py-1 px-3 rounded-pill'>Villa</div>
                  </div>
                <img src="../assets/property-management-card-img.png" className='property-management-card-img' alt="Property" />
                <div className="d-flex justify-content-between w-100 align-items-center">
                    <div>
                        <div className="d-flex align-items-center">
                            <img src="../assets/location.svg" className='img-fluid' alt="location" />
                            <p className="property-management-card-address m-0">Riyadh, Saudi Arabia, Al Nakheel Street</p>
                        </div>
                        <div className="d-flex align-items-center gap-1 ps-1">
                            <img src="../assets/postal.svg" className='img-fluid' alt="location" />
                            <div className="d-flex align-items-center gap-1">
                                <p className="property-management-card-address fw-bold m-0">Postal code:</p>
                                <p className="property-management-card-address m-0">605555</p>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-start gap-1">
                        <h6 className='qr-title'>QR code</h6>
                        <img src="../assets/qr-code.png" className='qr-img' alt="QR Code" />
                    </div>
                </div>
                  <div className="d-flex gap-3 align-items-center flex-wrap bg-white w-100 py-1 px-2 rounded-1">
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
                    <h6 className="property-management-card-title mb-1 mt-2">Address on map</h6>
                    <div className="property-map-container">
                        <div className="property-map">
                            <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3622.5049177533113!2d46.72160581500448!3d24.71355228411637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f0385d3e9c9c9%3A0x9c9c9c9c9c9c9c9c!2sRiyadh%2C%20Saudi%20Arabia!5e0!3m2!1sen!2sus!4v1234567890"
                            width="100%"
                            height="100%"
                            style={{ border: 0, borderRadius: '8px' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Property Location Map"
                            className="map-iframe"
                            ></iframe>
                        </div>
                    </div>
                    <div className="row mt-2 w-100 g-0">
                        <div className="col-12">
                                            <div className="mb-3 w-100">
                  <label htmlFor="notes" className="form-label mb-1">Special notes</label>
                  <input
                    type="text"
                    className="form-control rounded-2 border-0 py-2 px-3 w-100"
                    id="notes"
                    placeholder="Entrance from the back"
                    required
                  />
                </div>
                        </div>
                        <h6 className="property-management-card-title mb-3">Co-Host information</h6>
                        <div className="col-md-6">
                                            <div className="mb-3 w-100">
                  <label htmlFor="name" className="form-label mb-1">Full Name</label>
                  <input
                    type="text"
                    className="form-control rounded-2 border-0 py-2 px-3 w-100"
                    id="name"
                    placeholder="Omar Alrajihi"
                    required
                  />
                </div>
                        </div>
                        <div className="col-md-6">
                                            <div className="mb-3 w-100">
                  <label htmlFor="phone" className="form-label mb-1">Phone number</label>
                  <input
                    type="text"
                    className="form-control rounded-2 border-0 py-2 px-3 w-100"
                    id="phone"
                    placeholder="+213673232510"
                    required
                  />
                </div>
                        </div>
                        <div className="col-md-6">
                                            <div className="mb-3 w-100">
                                                <div className="d-flex gap-1 align-items-center mb-1">
                                                    <img src="../assets/booking.svg" className='mb-1' alt="booking" />
                                                    <label htmlFor="booking" className="form-label mb-0">Booking Link</label>
                                                </div>
                  <input
                    type="text"
                    className="form-control rounded-2 border-0 py-2 px-3 w-100"
                    id="booking"
                    placeholder="Enter link"
                    required
                  />
                </div>
                        </div>
                        <div className="col-md-6">
                                            <div className="mb-3 w-100">
                                                <div className="d-flex gap-1 align-items-center mb-1">
                                                    <img src="../assets/booking-2.svg" className='mb-1' alt="booking" />
                                                    <label htmlFor="AirBnB" className="form-label mb-0">AirBnB Link</label>
                                                </div>
                  <input
                    type="text"
                    className="form-control rounded-2 border-0 py-2 px-3 w-100"
                    id="AirBnB"
                    placeholder="Enter link"
                    required
                  />
                </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 w-100">
                                <div className="edit-btn d-flex align-items-center justify-content-center gap-1"><img src="../assets/edit.svg" alt="edit" /> <span>Edit</span></div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3 w-100">
                                <div className="delete-btn d-flex align-items-center justify-content-center gap-1"><img src="../assets/delete.svg" alt="delete" /> <span>Delete</span></div>
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

export default DashboardPropertyDetailsMain;