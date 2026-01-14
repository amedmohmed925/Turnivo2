import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons';
import { Person, Settings, Logout } from '@mui/icons-material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Link } from 'react-router-dom';

const DashboardServicesMaintenanceMain = ({ onMobileMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Add state to track selected order type
  const [selectedOrderType, setSelectedOrderType] = useState('urgent');

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

  // Function to handle order type selection
  const handleOrderTypeClick = (type) => {
    setSelectedOrderType(type);
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
            <h2 className="mb-0 dashboard-title">Maintenance Request</h2>
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
        <h6 className="dashboard-routes-sub m-0">Maintenance Request</h6>
                    <div className="login-title mb-1 mt-4">Request a maintenance service for property</div>
            <div className="service-desc mb-3 mt-2">Determine the property</div>
            <div className="row">
              <div className="col-md-4 mb-3">
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
                        <div className="d-flex gap-1 align-items-center flex-wrap w-100 py-1 rounded-1 mt-2">
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
              </div>
              <div className="col-md-4 mb-3">
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
                        <div className="d-flex gap-1 align-items-center flex-wrap w-100 py-1 rounded-1 mt-2">
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
              </div>
              <div className="col-md-4 mb-3">
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
                        <div className="d-flex gap-1 align-items-center flex-wrap w-100 py-1 rounded-1 mt-2">
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
              </div>
            </div>
            <div className="service-desc mb-2 mt-2">service details</div>
              <div className="row">
                <div className="col-12">
                <div className="mb-3 w-100">
                  <label htmlFor="propertyType" className="form-label mb-1">
                    Type of service
                  </label>

                  <div className="position-relative">
                    <select
                      id="propertyType"
                      className="form-select custom-select-bs py-2"
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>
                        Select property type
                      </option>
                      <option value="Electricity">Electricity</option>
                    </select>

                    {/* Bootstrap Icon */}
                    <i className="bi bi-chevron-down select-bs-icon"></i>
                  </div>
                </div>
              </div>
                <div className="col-12">
                <div className="mb-3 w-100">
                  <label htmlFor="notes" className="form-label mb-1">Service description</label>
                  <textarea name="notes" id="notes" rows="4" className="form-control rounded-2 py-2 w-100" placeholder='Malfunction in the general lighting of the apartment'></textarea>
                </div>
                </div>
                <label className="form-label mb-1">Service description</label>
                <div className="d-flex gap-2 align-items-center order-type-filter flex-wrap mb-3">
                    <button 
                        className={`order-type-item rounded-2 px-4 py-2 ${selectedOrderType === 'urgent' ? 'active' : ''}`}
                        onClick={() => handleOrderTypeClick('urgent')}
                    >
                        Urgent request
                    </button>
                    <button 
                        className={`order-type-item rounded-2 px-4 py-2 flex-wrap ${selectedOrderType === 'inspection' ? 'active' : ''}`}
                        onClick={() => handleOrderTypeClick('inspection')}
                    >
                        Request an inspection during the cleaning visit
                    </button>
                    <button 
                        className={`order-type-item rounded-2 px-4 py-2 ${selectedOrderType === 'guest' ? 'active' : ''}`}
                        onClick={() => handleOrderTypeClick('guest')}
                    >
                        Visiting guest times 
                    </button>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <button className="sec-btn rounded-2 px-5 py-2 w-100">
                            Send a request
                        </button>
                    </div>
                    <div className="col-md-6">
                        <button className="delete-btn rounded-2 px-5 py-2 w-100 border-0">
                            Cancel
                        </button>

                    </div>
                </div>
              </div>
      </div>
    </section>
  );
};

export default DashboardServicesMaintenanceMain;