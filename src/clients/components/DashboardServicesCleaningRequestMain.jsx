import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons';
import { Person, Settings, Logout } from '@mui/icons-material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Link } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const DashboardServicesCleaningRequestMain = ({ onMobileMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Add state to track current step
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  // Add state to track selected payment method
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  
  // Add state to track selected package filter
  const [selectedPackageFilter, setSelectedPackageFilter] = useState('package');

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

  // Function to handle next step
  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Function to handle previous step
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Function to handle step click from the step indicator
  const handleStepClick = (stepNumber) => {
    setCurrentStep(stepNumber);
  };
  
  // Function to handle payment method selection
  const handlePaymentMethodClick = (method) => {
    setSelectedPaymentMethod(method);
  };
  
  // Function to handle package filter selection
  const handlePackageFilterClick = (filter) => {
    setSelectedPackageFilter(filter);
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
        <h6 className="dashboard-routes-sub m-0">Cleaning request</h6>
        {/* Steps */}
        <div className="create-property-steps mt-4">
          <div className="steps-wrapper">
            <div 
              className={`step ${currentStep >= 1 ? 'active' : ''}`}
              onClick={() => handleStepClick(1)}
              style={{ cursor: 'pointer' }}
            >
              <div className="step-circle">
                <img src="../assets/cleaning-step-1.svg" alt="info" />
              </div>
              <span className="step-label">Property and Pakage</span>
            </div>

            <div 
              className={`step ${currentStep >= 2 ? 'active' : ''}`}
              onClick={() => handleStepClick(2)}
              style={{ cursor: 'pointer' }}
            >
              <div className="step-circle">
                <img src="../assets/cleaning-step-2.svg" alt="location" />
              </div>
              <span className="step-label">Service date</span>
            </div>

            <div 
              className={`step ${currentStep >= 3 ? 'active' : ''}`}
              onClick={() => handleStepClick(3)}
              style={{ cursor: 'pointer' }}
            >
              <div className="step-circle">
                <img src="../assets/cleaning-step-3.svg" alt="photos" />
              </div>
              <span className="step-label">Add-on Services</span>
            </div>

            <div 
              className={`step ${currentStep >= 4 ? 'active' : ''}`}
              onClick={() => handleStepClick(4)}
              style={{ cursor: 'pointer' }}
            >
              <div className="step-circle">
                <img src="../assets/cleaning-step-4.svg" alt="contact" />
              </div>
              <span className="step-label">Payment</span>
            </div>
          </div>

          <div className={`step-1-container ${currentStep === 1 ? '' : 'd-none'}`}>
            <div className="login-title mb-1 mt-2">Service request for property</div>
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
            <div className="service-desc mb-2 mt-2">Package</div>
            <div className="row package-filter align-items-center py-2 px-0 m-0">
              <div className="col-md-4">
                <button 
                  className={`rounded-2 px-4 py-2 border-0 w-100 ${selectedPackageFilter === 'package' ? 'sec-btn' : 'package-filter-item'}`}
                  onClick={() => handlePackageFilterClick('package')}
                >
                  Package
                </button>
              </div>
              <div className="col-md-4">
                <p 
                  className={`text-center rounded-2 py-2 m-0 ${selectedPackageFilter === 'one-time' ? 'sec-btn' : 'package-filter-item'}`}
                  onClick={() => handlePackageFilterClick('one-time')}
                >
                  one time
                </p>
              </div>
              <div className="col-md-4">
                <p 
                  className={`text-center rounded-2 py-2 m-0 ${selectedPackageFilter === 'additional' ? 'sec-btn' : 'package-filter-item'}`}
                  onClick={() => handlePackageFilterClick('additional')}
                >
                  Additional Services
                </p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-4 mb-3">
                <div className="shadow p-3 rounded-4 bg-white h-100 d-flex flex-column gap-2 align-tems-start justify-content-between">
                  <div className='d-flex flex-column gap-2'>
                    <h3 className='dashboard-home-card-2-title-2 m-0'>Next guest ready</h3>
                    <div className="d-flex gap-2 align-items-center flex-wrap">
                      <h4 className='dashboard-home-card-2-label-1-sec m-0'>25$</h4>
                      <h4 className='dashboard-home-card-2-label-2 m-0'>/monthly</h4>
                    </div>
                    <h4 className='dashboard-home-card-2-label-3 m-0'>Get 7 free days</h4>
                    <div className="d-flex align-items-center gap-1">
                      <img src="../assets/check.svg" alt="check" />
                      <p className='package-desc m-0'>Quick cleaning of rooms and common areas</p>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <img src="../assets/check.svg" alt="check" />
                      <p className='package-desc m-0'>Change sheets and towels</p>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <img src="../assets/check.svg" alt="check" />
                      <p className='package-desc m-0'> 50 Rearrange furniture as needed</p>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <img src="../assets/check.svg" alt="check" />
                      <p className='package-desc m-0'>Checking the basics from home</p>
                    </div>
                  </div>
                  <div className="pt-3 mt-3 w-100 d-flex justify-content-center package-button-container">
                    <button className="package-btn rounded-pill px-4 w-50-100">
                      Choose Package
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="shadow p-3 rounded-4 bg-white h-100 d-flex flex-column gap-2 align-tems-start justify-content-between">
                  <div className='d-flex flex-column gap-2'>
                    <h3 className='dashboard-home-card-2-title-2 m-0'>Deep cleaning</h3>
                    <div className="d-flex gap-2 align-items-center flex-wrap">
                      <h4 className='dashboard-home-card-2-label-1 m-0'>50$</h4>
                      <h4 className='dashboard-home-card-2-label-2 m-0'>/monthly</h4>
                    </div>
                    <h4 className='dashboard-home-card-2-label-3 m-0'>Get 7 free days</h4>
                    <div className="d-flex align-items-center gap-1">
                      <img src="../assets/check.svg" alt="check" />
                      <p className='package-desc m-0'>Complete cleaning of floors, walls and surfaces</p>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <img src="../assets/check.svg" alt="check" />
                      <p className='package-desc m-0'>Deep clean your appliances and kitchen</p>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <img src="../assets/check.svg" alt="check" />
                      <p className='package-desc m-0'>Sanitize bathrooms and remove accumulated dirt</p>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <img src="../assets/check.svg" alt="check" />
                      <p className='package-desc m-0'>Comprehensive rearrangement and resetting of furniture as needed</p>
                    </div>
                  </div>
                  <div className="pt-3 mt-3 w-100 d-flex justify-content-center package-button-container">
                    <button className="package-btn rounded-pill px-4 w-50-100">
                      Choose Package
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="shadow p-3 rounded-4 bg-white h-100 d-flex flex-column gap-2 align-tems-start justify-content-between">
                  <div className='d-flex flex-column gap-2'>
                    <h3 className='dashboard-home-card-2-title-2 m-0'>Always Ready</h3>
                    <div className="d-flex gap-2 align-items-center flex-wrap">
                      <h4 className='dashboard-home-card-2-label-1-blue m-0'>100$</h4>
                      <h4 className='dashboard-home-card-2-label-2 m-0'>/monthly</h4>
                    </div>
                    <h4 className='dashboard-home-card-2-label-3 m-0'>Get 7 free days</h4>
                    <div className="d-flex align-items-center gap-1">
                      <img src="../assets/check.svg" alt="check" />
                      <p className='package-desc m-0'>Automatically schedule cleaning without the need for guest intervention</p>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <img src="../assets/check.svg" alt="check" />
                      <p className='package-desc m-0'>Deduct the visit from the package balance</p>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <img src="../assets/check.svg" alt="check" />
                      <p className='package-desc m-0'>Send the logo to a host with a confirmation of the number of visits received from the package</p>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <img src="../assets/check.svg" alt="check" />
                      <p className='package-desc m-0'>30 free orders</p>
                    </div>
                  </div>
                  <div className="pt-3 mt-3 w-100 d-flex justify-content-center package-button-container">
                    <button className="package-btn rounded-pill px-4 w-50-100">
                      Choose Package
                    </button>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end align-items-center mb-3 gap-2">
                <button className="sec-btn rounded-2 px-5 py-2" onClick={handleNextStep}>
                  Next
                </button>
              </div>
            </div>
          </div>

          <div className={`step-2-container ${currentStep === 2 ? '' : 'd-none'}`}>
            {/* Top Controls */}
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 mt-4">
              <div className="d-flex gap-2 p-2 rounded-2 days-filter">
                <button className="main-btn rounded-2 px-3 py-1">Today</button>
                <div className="days-filter-item px-3 py-1">Back</div>
                <div className="days-filter-item px-3 py-1">Next</div>
              </div>

              <h6 className="m-0 date-label">10 Mar 2025 - 16 Apr 2025</h6>

              <div className="d-flex gap-2 p-2 rounded-2 times-filter">
                <button className="main-btn rounded-2 px-3 py-1">Month</button>
                <div className="times-filter-item px-3 py-1">Week</div>
                <div className="times-filter-item px-3 py-1">Day</div>
              </div>

              <div className="d-flex justify-content-end align-items-center gap-2">
                <button className="prev-btn rounded-2 px-4 py-2" onClick={handlePrevStep}>
                  Previous
                </button>
                <button className="sec-btn rounded-2 px-5 py-2" onClick={handleNextStep}>
                  Next
                </button>
              </div>
            </div>

            {/* Calendar Table */}
            <div className="calendar-wrapper">
              <table className="table calendar-table text-center">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Sunday 07/10<br /><small className='fw-bold'>0 Reservation</small></th>
                    <th>Monday 07/11<br /><small className='fw-bold'>03 Reservation</small></th>
                    <th>Tuesday 07/12<br /><small className='fw-bold'>0 Reservation</small></th>
                    <th>Wednesday 07/13<br /><small className='fw-bold'>0 Reservation</small></th>
                    <th>Thursday 07/14<br /><small className='fw-bold'>0 Reservation</small></th>
                    <th>Friday 07/15<br /><small className='fw-bold'>0 Reservation</small></th>
                    <th>Saturday 07/16<br /><small className='fw-bold'>0 Reservation</small></th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td className='table-time'>8:00 AM</td>
                    <td></td>
                    <td>
                      <div className="slot available">
                        <strong>Available</strong><br />
                        <small>10:00 • 13:00 • 20:00</small><br />
                        <small>10:00 • 13:00 • 20:00</small><br />
                      </div>
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                      <div className="third-btn-sm">Check Out<br />Guest</div>
                    </td>
                    <td></td>
                    <td></td>
                  </tr>

                  <tr>
                    <td className='table-time'>10:00 AM</td>
                    <td></td>
                    <td>
                      <div className="third-btn-sm">Check Out<br />Guest</div>
                    </td>
                    <td>
                      <div className="sec-btn-sm h-100">Service Selected</div>
                    </td>
                    <td></td>
                    <td></td>
                    <td>
                      <div className="slot available">
                        <strong>Available</strong><br />
                        <small>10:00 • 13:00 • 20:00</small><br />
                        <small>10:00 • 13:00 • 20:00</small><br />
                      </div>
                    </td>
                    <td>
                      <div className="sec-btn-sm h-100">Service Selected</div>
                    </td>
                  </tr>

                  <tr>
                    <td className='table-time'>12:00 PM</td>
                    <td>
                      <div className="sec-btn-sm h-100">Service Selected</div>
                    </td>
                    <td></td>
                    <td>
                      <div className="third-btn-sm">Check Out<br />Guest</div>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className={`step-3-container ${currentStep === 3 ? '' : 'd-none'}`}>
            <div className="row mt-3 w-100 g-0">
              <div className="login-title mb-2 mt-2">Service request for property</div>
              <label htmlFor="notes" className="form-label mb-1">Add-on Services</label>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the garage</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the pool</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the pool</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the pool</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the surface</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the garage</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the pool</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the pool</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the pool</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the surface</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the garage</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the pool</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the pool</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the pool</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100 active">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the surface</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the garage</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the pool</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100 active">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the pool</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the pool</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the surface</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end align-items-center mb-3 gap-2">
                <button className="prev-btn rounded-2 px-4 py-2" onClick={handlePrevStep}>
                  Previous
                </button>
                <button className="sec-btn rounded-2 px-5 py-2" onClick={handleNextStep}>
                  Next
                </button>
              </div>
            </div>
          </div>

          <div className={`step-4-container ${currentStep === 4 ? '' : 'd-none'}`}>
            <div className="row mt-3 w-100 g-0">
              <div className="login-title mb-2 mt-2">Service request for property</div>
              <div className="col-md-6 mb-3">
                <label htmlFor="notes" className="form-label mb-1">Total cost</label>
                <div className="hours-badge p-2 rounded-2 d-flex justify-content-between gap-4 align-items-center mb-2">
                  <h2 className='m-0'> 4 hours</h2>
                  <div className='third-btn-sm p-1 rounded-2'>$50 / hour</div>
                </div>
                <div className='total-payments p-3 rounded-3'>
                  <div className='d-flex justify-content-between gap-4 align-items-center mb-2'>
                    <h3 className='service-desc m-0'>Deep cleaning</h3>
                    <h4 className='service-price m-0'>200 $</h4>
                  </div>
                  <div className='d-flex justify-content-between gap-4 align-items-center mb-2'>
                    <h3 className='service-desc m-0'>Add-on services</h3>
                    <h4 className='service-price m-0'>100 $</h4>
                  </div>
                  <div className='d-flex justify-content-between gap-4 align-items-center mb-2 px-2'>
                    <h3 className='property-management-card-address m-0'>Cleaning the garden</h3>
                    <h4 className='sub-service-price m-0'>50 $</h4>
                  </div>
                  <div className='d-flex justify-content-between gap-4 align-items-center mb-2 px-2'>
                    <h3 className='property-management-card-address m-0'>Cleaning the garage</h3>
                    <h4 className='sub-service-price m-0'>50 $</h4>
                  </div>
                  <div className='d-flex justify-content-between gap-4 align-items-center'>
                    <h3 className='service-desc m-0'>Total</h3>
                    <h4 className='service-total-price m-0'>300 $</h4>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="notes" className="form-label mb-1">Payment method </label>
                <div className="payment-methods d-flex gap-2 align-items-center">
                  <div 
                    className={`payment-method-card p-2 rounded-2 ${selectedPaymentMethod === 'card1' ? 'active' : ''}`}
                    onClick={() => handlePaymentMethodClick('card1')}
                  >
                    <img src="../assets/payment-card-img-1.png" className='img-fluid w-100' alt="payment" />
                  </div>
                  <div 
                    className={`payment-method-card p-2 rounded-2 ${selectedPaymentMethod === 'card2' ? 'active' : ''}`}
                    onClick={() => handlePaymentMethodClick('card2')}
                  >
                    <img src="../assets/payment-card-img-2.png" className='img-fluid w-100' alt="payment" />
                  </div>
                  <div 
                    className={`payment-method-card p-2 rounded-2 ${selectedPaymentMethod === 'card3' ? 'active' : ''}`}
                    onClick={() => handlePaymentMethodClick('card3')}
                  >
                    <img src="../assets/payment-card-img-3.svg" className='img-fluid w-100' alt="payment" />
                  </div>
                  <div 
                    className={`payment-method-card p-2 rounded-2 ${selectedPaymentMethod === 'card4' ? 'active' : ''}`}
                    onClick={() => handlePaymentMethodClick('card4')}
                  >
                    <img src="../assets/payment-card-img-4.svg" className='img-fluid w-100' alt="payment" />
                  </div>
                </div>
                <div className="payment-inputs-container p-3 rounded-3 mt-2">
                  <div className="row">
                    <div className="col-12">
                      <div className="mb-3 w-100 position-relative">
                        <label htmlFor="cardNumber" className="form-label mb-1">Card number</label>
                        <div className="input-with-icon">
                          <img src="../assets/pay-card-icon-1.svg" className="input-icon" alt="" />
                          <input
                            type="text"
                            className="form-control rounded-2 py-2 px-3 ps-5 w-100"
                            id="cardNumber"
                            placeholder="1234 5678 4321 5678"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-2 w-100 position-relative">
                        <label htmlFor="expiryDate" className="form-label mb-1">Completion date</label>
                        <div className="input-with-icon">
                          <img src="../assets/pay-card-icon-2.svg" className="input-icon" alt="" />
                          <input
                            type="text"
                            className="form-control rounded-2 py-2 px-3 ps-5 w-100"
                            id="expiryDate"
                            placeholder="12/28"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-2 w-100 position-relative">
                        <label htmlFor="cvv" className="form-label mb-1">Code</label>
                        <div className="input-with-icon">
                          <img src="../assets/pay-card-icon-3.svg" className="input-icon" alt="" />
                          <input
                            type="text"
                            className="form-control rounded-2 py-2 px-3 ps-5 w-100"
                            id="cvv"
                            placeholder="CVV"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end align-items-center mb-3 gap-2">
                <button className="prev-btn rounded-2 px-4 py-2" onClick={handlePrevStep}>
                  Previous
                </button>
                <button className="sec-btn rounded-2 px-5 py-2" onClick={handleNextStep}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardServicesCleaningRequestMain;