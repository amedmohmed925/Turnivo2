import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons';
import { Person, Settings, Logout } from '@mui/icons-material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Link } from 'react-router-dom';

const DashboardMaintenanceDetailsMain = ({ onMobileMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [beforeImages, setBeforeImages] = useState([]);
  const [afterImages, setAfterImages] = useState([]);
  const beforeInputRef = useRef(null);
  const afterInputRef = useRef(null);
  

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

  const handleBeforeUpload = (e) => {
    const files = Array.from(e.target.files);
    setBeforeImages(prev => [...prev, ...files]);
  };

  const handleAfterUpload = (e) => {
    const files = Array.from(e.target.files);
    setAfterImages(prev => [...prev, ...files]);
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
            <h2 className="mb-0 dashboard-title">details Maintenance Requests</h2>
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
        <div className="row">
          <div className="col-12">
            <div className=" mt-3 w-100">
              <div className="d-flex align-items-start flex-column flex-md-row gap-3 w-100">
                <div className="d-flex flex-column align-items-start gap-2 w-100">
                <div className="property-management-card mt-3 w-100">
                  <div className="d-flex align-items-start flex-column flex-md-row gap-3 w-100">
                    <img src='../assets/property-management-card-img.png' className='property-management-card-img-3' alt="Property" />
                    <div className="d-flex flex-column align-items-start gap-2 w-100">
                      <div className="d-flex justify-content-between w-100 align-items-center">
                        <h6 className="property-management-card-title m-0">Guest House Riyadh</h6>
                        <div className={`villa-badge py-1 px-3 rounded-pill`}>Villa</div>
                      </div>
                      <div className="d-flex align-items-center">
                        <img src="../assets/location.svg" className='img-fluid' alt="location" />
                        <p className="property-management-card-address m-0">Riyadh, Saudi Arabia, Al Nakheel Street</p>
                      </div>
                      <div className="d-flex gap-3 align-items-center flex-wrap">
                        <div className="d-flex align-items-center gap-1">
                          <img src="../assets/property-card-icon-1.svg" className='img-fluid' alt="location" />
                          <h6 className="property-management-card-icon-label m-0">4 floors</h6>
                        </div>
                        <div className='card-border-right'>|</div>
                        <div className="d-flex align-items-center gap-1">
                          <img src="../assets/property-card-icon-2.svg" className='img-fluid' alt="location" />
                          <h6 className="property-management-card-icon-label m-0">3 rooms</h6>
                        </div>
                        <div className='card-border-right'>|</div>
                        <div className="d-flex align-items-center gap-1">
                          <img src="../assets/property-card-icon-3.svg" className='img-fluid' alt="location" />
                          <h6 className="property-management-card-icon-label m-0">20 m</h6>
                        </div>
                        <div className='card-border-right'>|</div>
                        <div className="d-flex align-items-center gap-1">
                          <img src="../assets/property-card-icon-4.svg" className='img-fluid' alt="location" />
                          <h6 className="property-management-card-icon-label m-0">2 bathrooms</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <h6 className="property-problem-title mb-2 mt-2">Maintenance details</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
                <div className="d-flex align-items-center justify-content-between p-3 gap-2 w-100 materials-cards rounded-4 mb-3">
      <div className="d-flex w-100 align-items-start flex-column flex-md-row gap-2">
        <img src="../assets/problem-img-2.png" className='img-fluid materials-img' alt="location" />   
        <div className='d-flex flex-column gap-2 align-items-start w-100'>
          <div className="d-flex justify-content-between align-items-center w-100">
            <h6 className="property-problem-title mb-0">Nakheel Neighborhood Hotel</h6>
            <div className='new-badge px-2 p-1 rounded-2'>New</div>
          </div>
            <div className="d-flex align-items-center gap-1">
            <img src="../assets/location-2.svg" alt="location" />
            <p className="dashboard-home-card-2-desc-3 m-0">Riyadh, Al Narjis Neighborhood</p>
          </div>
            <div className="bnb-badge d-flex align-items-center gap-2 p-2 rounded-2">
              <img src="../assets/bnb.svg" alt="airbnb" />
              <span>airbnb</span>
            </div>
           <h6 className="property-problem-title mb-0 mt-2">Upholstery and carpet cleaning</h6>
          <div className="d-flex align-items-center gap-1">
            <img src="../assets/calendar-3.svg" alt="calendar" />
            <p className="dashboard-home-card-2-desc-3 m-0">June 12, 2026</p>
          </div>
          <div className="d-flex align-items-center gap-1">
            <img src="../assets/clock.svg" alt="clock" />
            <p className="dashboard-home-card-2-desc-3 mb-0">8:00 pm - 10:00 pm</p>
          </div>
        </div>
      </div>
    </div>
          </div>
            <h6 className="property-problem-title mb-2 ">Room pictures before and after</h6>
            <div className="d-flex gap-2 align-items-center flex-wrap">
                <div className='rating-stars-bg p-2 rounded-2'>
                    <h3 className='form-label mb-2'>Before cleaning</h3>
                    <div className="d-flex gap-2 align-items-center flex-wrap">
                        <div className="add-room-btn d-flex flex-column align-items-center justify-content-center gap-2" onClick={() => beforeInputRef.current.click()}>
                            <img src="../assets/gallery-add.svg" alt="gallery" />
                            <h6 className='table-time m-0'>Add room photos</h6>
                        </div>
                        {beforeImages.map((img, idx) => <img key={idx} src={URL.createObjectURL(img)} className='added-img' alt="uploaded" />)}
                    </div>
                    <input type="file" multiple accept="image/*" ref={beforeInputRef} onChange={handleBeforeUpload} style={{display: 'none'}} />
                </div>
                <div className='rating-stars-bg p-2 rounded-2'>
                    <h3 className='form-label mb-2'>After cleaning</h3>
                    <div className="d-flex gap-2 align-items-center flex-wrap">
                        <div className="add-room-btn d-flex flex-column align-items-center justify-content-center gap-2" onClick={() => afterInputRef.current.click()}>
                            <img src="../assets/gallery-add.svg" alt="gallery" />
                            <h6 className='table-time m-0'>Add room photos</h6>
                        </div>
                        {afterImages.map((img, idx) => <img key={idx} src={URL.createObjectURL(img)} className='added-img' alt="uploaded" />)}

                    </div>
                    <input type="file" multiple accept="image/*" ref={afterInputRef} onChange={handleAfterUpload} style={{display: 'none'}} />
                </div>

            </div>
            <h6 className="property-problem-title my-2">employee</h6>
                                <div className="d-flex align-items-center gap-2 w-100">
                      <img src='../assets/user.png' className='provider-rate' alt="user" />
                      <div>
                        <h6 className='login-title m-0'>Leslie Alexander</h6>
                        <h6 className="training-details-card-desc m-0 mt-1">Operations Manager</h6>
                      </div>
                    </div>
            <h6 className="property-problem-title my-2">Problem description</h6>
              <div className="d-flex gap-3 align-items-center flex-wrap flex-sm-nowrap">
                <div className='d-flex flex-column gap-2 text-nowrap'>
                              <div className="d-flex align-items-center gap-1">
            <img src="../assets/calendar-3.svg" alt="calendar" />
            <p className="dashboard-home-card-2-desc-3 m-0">June 12, 2026</p>
          </div>
          <div className="d-flex align-items-center gap-1">
            <img src="../assets/clock.svg" alt="clock" />
            <p className="dashboard-home-card-2-desc-3 mb-0">8:00 pm - 10:00 pm</p>
          </div>
                    <div className="d-flex align-items-center gap-1">
            <img src="../assets/dollar.svg" alt="price" />
            <p className="dashboard-home-card-2-desc-3 m-0">250 SAR</p>
          </div>
                </div>
                <div className='training-card p-2 rounded-2'>
                    <p className='m-0 problem-desc'>Poor cooling has been reported in the air conditioner located in Office 204 on the second floor. The user noted that the air conditioner was not cooling sufficiently and that water was leaking from the indoor unit. Please check the filters and gas, and ensure that the pipes and connections are in good condition. A full test is recommended after maintenance to ensure efficient operation.</p>
                </div>
              </div>
        <div className="d-flex gap-2 align-items-center justify-content-between flex-wrap my-3">
                      <button
  className="main-btn rounded-2 px-4 py-2 d-flex justify-content-center align-items-center gap-2 w-50-100"
  data-bs-toggle="modal"
  data-bs-target="#tempAccessModal"
>
    <img src="../assets/people.svg" alt="people" />
  resellect
                        </button>
                      <button 
            type="submit" 
            className="sec-btn rounded-2 py-2 px-3 d-flex align-items-center justify-content-center gap-2 w-50-100"
          >
            <img src="../assets/key.svg" alt="key" />
            <span>smart key</span>
                        </button>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default DashboardMaintenanceDetailsMain;