import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars} from '@fortawesome/free-solid-svg-icons';
import { Person, Settings, Logout } from '@mui/icons-material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Link } from 'react-router-dom';

const DashboardSmartCheckMain = ({ onMobileMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Add state to track selected filter
  const [selectedFilter, setSelectedFilter] = useState('checkin');

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
  
  // Function to handle filter selection
  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
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
            <h2 className="mb-0 dashboard-title">Smart checkin / checkout</h2>
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
        <div className="d-flex justify-content-between align-items-center flex-wrap mt-3">
          <h2 className="mb-0 dashboard-title">Address</h2>
                      <button 
            type="submit" 
            className="sec-btn rounded-2 py-2 px-3 d-flex align-items-center gap-2"
          >
            <img src="/assets/key.svg" alt="key" />
            <span>Reqest a smart lock</span>
          </button>
        </div>
            <div className="row mt-3 w-100 g-0">
              <div className="col-md-2 mb-3 col-20-per h-100 px-2 d-flex flex-column justify-content-center align-items-center">
                <div className="bg-light-gray smart-gray p-3 rounded-3 mb-3 active">
                  <img src="/assets/smart-door.png" className='img-fluid w-100' alt="service" />
                </div>
                <h6 className='m-0'>Nakheel Neighborhood Hotel</h6>
              </div>
              <div className="col-md-2 mb-3 col-20-per h-100 px-2 d-flex flex-column justify-content-center align-items-center">
                <div className="bg-light-gray smart-gray p-3 rounded-3 mb-3">
                  <img src="/assets/smart-door.png" className='img-fluid w-100' alt="service" />
                </div>
                <h6 className='m-0'>Nakheel Neighborhood Hotel</h6>
              </div>
              <div className="col-md-2 mb-3 col-20-per h-100 px-2 d-flex flex-column justify-content-center align-items-center">
                <div className="bg-light-gray smart-gray p-3 rounded-3 mb-3">
                  <img src="/assets/smart-door.png" className='img-fluid w-100' alt="service" />
                </div>
                <h6 className='m-0'>Nakheel Neighborhood Hotel</h6>
              </div>
              <div className="col-md-2 mb-3 col-20-per h-100 px-2 d-flex flex-column justify-content-center align-items-center">
                <div className="bg-light-gray smart-gray p-3 rounded-3 mb-3">
                  <img src="/assets/smart-door.png" className='img-fluid w-100' alt="service" />
                </div>
                <h6 className='m-0'>Nakheel Neighborhood Hotel</h6>
              </div>
              <div className="col-md-2 mb-3 col-20-per h-100 px-2 d-flex flex-column justify-content-center align-items-center">
                <div className="bg-light-gray smart-gray p-3 rounded-3 mb-3">
                  <img src="/assets/smart-door.png" className='img-fluid w-100' alt="service" />
                </div>
                <h6 className='m-0'>Nakheel Neighborhood Hotel</h6>
              </div>

            </div>
            <div className="row mt-3 w-100 g-0">
                <div className='col-md-2 mb-3 col-20-per'>
                    <div className="d-flex align-items-start flex-column p-2 rounded-3 bg-light-gray-2">
                        <h5 className='qr-title m-0 mb-1'>QR code</h5>
                        <img src="/assets/qr-code-2.png" className='qr-code-2' alt="QR Code" />
                    </div>

                </div>
                <div className='col-md-2 mb-3 col-20-per'></div>
                <div className='col-md-2 mb-3 col-20-per'></div>
                <div className='col-md-2 mb-3 col-20-per px-2'>
                    <div className="d-flex align-items-start flex-column p-2 rounded-3 bg-light-gray active mx-auto">
                        <h5 className='qr-title m-0 mb-1'>Lock battery status</h5>
                        <div className="edit-btn w-100 py-2 text-center">Low</div>
                    </div>

                </div>
                <div className='col-md-2 mb-3 col-20-per px-2'>
                    <div className="d-flex align-items-start flex-column p-2 rounded-3 bg-light-gray active mx-auto">
                        <h5 className='qr-title m-0 mb-1'>Lock status</h5>
                        <div className="edit-btn w-100 py-2 text-center">Open</div>
                    </div>

                </div>

            </div>
            <h5 className='qr-title m-0 mb-1'>Generate temp access code</h5>
            <button
  className="sec-btn rounded-2 px-4 py-2 w-50-100"
  data-bs-toggle="modal"
  data-bs-target="#tempAccessModal"
>
  Temp access code
</button>

            <div className="d-flex gap-1 align-items-center flex-wrap flex-lg-nowrap my-3">
              <div className="row package-filter align-items-center py-2 px-0 m-0 w-100">
                <div className="col-md-2 col-20-per">
                  <button 
                    className={`rounded-2 border-0 px-2 py-2 w-100 ${selectedFilter === 'checkin' ? 'sec-btn' : 'package-filter-item'}`}
                    onClick={() => handleFilterClick('checkin')}
                  >
                    Checkin history
                  </button>
                </div>
                <div className="col-md-2 col-20-per">
                  <p 
                    className={`text-center rounded-2 py-2 m-0 ${selectedFilter === 'checkout' ? 'sec-btn' : 'package-filter-item'}`}
                    onClick={() => handleFilterClick('checkout')}
                  >
                    checkout history
                  </p>
                </div>
                <div className="col-md-2 col-20-per">
                  <p 
                    className={`text-center rounded-2 py-2 m-0 ${selectedFilter === 'welcoming' ? 'sec-btn' : 'package-filter-item'}`}
                    onClick={() => handleFilterClick('welcoming')}
                  >
                    Welcoming message
                  </p>
                </div>
                <div className="col-md-2 col-20-per">
                  <p 
                    className={`text-center rounded-2 py-2 m-0 ${selectedFilter === 'checkout-message' ? 'sec-btn' : 'package-filter-item'}`}
                    onClick={() => handleFilterClick('checkout-message')}
                  >
                    Checkout message
                  </p>
                </div>
                <div className="col-md-2 col-20-per">
                  <p 
                    className={`text-center rounded-2 py-2 m-0 ${selectedFilter === 'property-rules' ? 'sec-btn' : 'package-filter-item'}`}
                    onClick={() => handleFilterClick('property-rules')}
                  >
                    Property rules
                  </p>
                </div>
              </div>
               <button
  className="main-btn rounded-2 px-2 py-2 d-flex gap-1 align-items-center text-nowrap w-50-100 justify-content-center"
  data-bs-toggle="modal"
  data-bs-target="#propertyQrModal"
>
  <img src="/assets/scan-barcode.svg" alt="barcode" />
  <span>Property QR code</span>
</button>

            </div>
            <div className="card p-2 rounded-4">
              <div className='bg-light-gray p-3 mb-3 rounded-4 d-flex align-items-center gap-4 flex-wrap'>
                <div className="d-flex align-items-center gap-2 m-0">
                  <img src="/assets/dashboard-card-icon-15.svg" className='img-fluid smart-icon' alt="icon" />
                  <h6 className='smart-title m-0'>Temp code 2</h6>
                </div>
                                            <div>
                                <h6 className="dashboard-home-card-2-desc-1">Checkin with access code 22333 at 12:00</h6>
                                <div className="d-flex align-items-center gap-1">
                                    <div className="d-flex align-items-center gap-1">
                                        <img src="/assets/dashboard-card-icon-8.svg" className='smart-icon-2' alt="icon" />
                                        <p className="dashboard-home-card-2-desc-3 m-0">05 / 03 / 2025</p>
                                    </div>
                                </div>
                            </div>
              </div>
              <div className='bg-light-gray p-3 mb-3 rounded-4 d-flex align-items-center gap-4 flex-wrap'>
                <div className="d-flex align-items-center gap-2 m-0">
                  <img src="/assets/dashboard-card-icon-15.svg" className='img-fluid smart-icon' alt="icon" />
                  <h6 className='smart-title m-0'>Temp code 2</h6>
                </div>
                                            <div>
                                <h6 className="dashboard-home-card-2-desc-1">Checkin with access code 22333 at 12:00</h6>
                                <div className="d-flex align-items-center gap-1">
                                    <div className="d-flex align-items-center gap-1">
                                        <img src="/assets/dashboard-card-icon-8.svg" className='smart-icon-2' alt="icon" />
                                        <p className="dashboard-home-card-2-desc-3 m-0">05 / 03 / 2025</p>
                                    </div>
                                </div>
                            </div>
              </div>
              <div className='bg-light-gray p-3 mb-3 rounded-4 d-flex align-items-center gap-4 flex-wrap'>
                <div className="d-flex align-items-center gap-2 m-0">
                  <img src="/assets/dashboard-card-icon-15.svg" className='img-fluid smart-icon' alt="icon" />
                  <h6 className='smart-title m-0'>Temp code 2</h6>
                </div>
                                            <div>
                                <h6 className="dashboard-home-card-2-desc-1">Checkin with access code 22333 at 12:00</h6>
                                <div className="d-flex align-items-center gap-1">
                                    <div className="d-flex align-items-center gap-1">
                                        <img src="/assets/dashboard-card-icon-8.svg" className='smart-icon-2' alt="icon" />
                                        <p className="dashboard-home-card-2-desc-3 m-0">05 / 03 / 2025</p>
                                    </div>
                                </div>
                            </div>
              </div>
              <div className='bg-light-gray p-3 mb-3 rounded-4 d-flex align-items-center gap-4 flex-wrap'>
                <div className="d-flex align-items-center gap-2 m-0">
                  <img src="/assets/dashboard-card-icon-15.svg" className='img-fluid smart-icon' alt="icon" />
                  <h6 className='smart-title m-0'>Temp code 2</h6>
                </div>
                                            <div>
                                <h6 className="dashboard-home-card-2-desc-1">Checkin with access code 22333 at 12:00</h6>
                                <div className="d-flex align-items-center gap-1">
                                    <div className="d-flex align-items-center gap-1">
                                        <img src="/assets/dashboard-card-icon-8.svg" className='smart-icon-2' alt="icon" />
                                        <p className="dashboard-home-card-2-desc-3 m-0">05 / 03 / 2025</p>
                                    </div>
                                </div>
                            </div>
              </div>
            </div>
      {/* Temp Access Modal */}
<div
  className="modal fade"
  id="tempAccessModal"
  tabIndex="-1"
  aria-hidden="true"
>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content rounded-4">
      <div className="modal-header border-0">
        <h5 className="m-0 dashboard-title">
          Generate Temporary Access Code
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
        ></button>
      </div>

      <div className="modal-body">
        <div className="">
          <label className="property-management-card-address fw-bold">
            Please enter Guest E-mail address
          </label>
          <input
            type="email"
            className="form-control rounded-2 py-2"
            placeholder="Enter email"
          />
        </div>
      </div>

      <div className="modal-footer border-0">
        <button
          type="button"
          className="sec-btn rounded-2 px-4 py-2"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</div>
{/* Property QR Code Modal */}
<div
  className="modal fade"
  id="propertyQrModal"
  tabIndex="-1"
  aria-hidden="true"
>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content rounded-4 text-center">
      <div className="modal-header border-0 mb-0 pb-0">
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
        ></button>
      </div>

      <div className="modal-body mt-0">
        <h5 className="popup-title">
          QR code
        </h5>
        <p className="dashboard-routes-sub mb-3">
          Make sure there is a direct link or information that can be used by
          users when scanning the token, such as a link to the app's login
          page or a membership ID
        </p>
        <div className="d-flex justify-content-center">
          <div className="modal-badge d-flex gap-2 align-items-center justify-content-center p-2 rounded-2">
            <span>AOSDI12LSD</span>
              <img src="/assets/scan-barcode-2.svg" alt="" />
          </div>

        </div>
        <img
          src="/assets/qr-code-2.png"
          alt="QR Code"
          className="img-fluid"
          style={{ width: '250px' }}
        />
      </div>
    </div>
  </div>
</div>
      </div>

    </section>
  );
};

export default DashboardSmartCheckMain;