import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons';
import { Person, Settings, Logout } from '@mui/icons-material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as bootstrap from 'bootstrap';


const DashboardCalendarMain = ({ onMobileMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

const closeModalAndNavigate = (path) => {
  const modalEl = document.getElementById('serviceTypeModal');
  const modalInstance = window.bootstrap?.Modal.getInstance(modalEl);

  if (modalInstance) {
    modalInstance.hide();
  }

  // remove backdrop
  document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());

  // restore body scroll
  document.body.classList.remove('modal-open');
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';

  // navigate after modal fully closes
  setTimeout(() => {
    navigate(path);
  }, 300);
};


  
  // Add state to track selected order type

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
            <h2 className="mb-0 dashboard-title">Calendar</h2>
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
        <h6 className="dashboard-routes-sub m-0">Calendar</h6>
            <div className="service-desc mb-3 mt-3">Determine the property</div>
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
                      <div className="slot available" data-bs-toggle="modal"
  data-bs-target="#serviceTypeModal">
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
                      <div className="slot available" data-bs-toggle="modal"
  data-bs-target="#serviceTypeModal">
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
            {/* Select Service Type Modal */}
<div
  className="modal fade"
  id="serviceTypeModal"
  tabIndex="-1"
  aria-hidden="true"
>
  <div className="modal-dialog modal-dialog-centered modal-lg">
    <div className="modal-content rounded-4 p-3">
      
      {/* Header */}
      <div className="modal-header border-0 mb-3 pb-0">
        <img
          src="../assets/logo.png"
          alt="logo"
          style={{ height: '32px' }}
        />
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
        ></button>
      </div>

      {/* Body */}
      <div className="modal-body pt-2">
        <h5 className="select-serv-desc mb-4">
          Select the type of service you want to order
        </h5>

        <div className="row g-3">
          
          {/* Cleaning Service */}
          <div className="col-md-6">
            <div className="service-card position-relative rounded-4 overflow-hidden">
              <img
                src="../assets/maintenance-service.jpg"
                alt="Cleaning Service"
                className="img-fluid w-100 h-100 object-fit-cover"
              />
              <button
  type="button"
  className="service-btn sec-btn"
  onClick={() => closeModalAndNavigate('/client/cleaning-request')}
>
  Cleaning Service
</button>

            </div>
          </div>

          {/* Maintenance Service */}
          <div className="col-md-6">
            <div className="service-card position-relative rounded-4 overflow-hidden">
              <img
                src="../assets/maintenance-service.jpg"
                alt="Maintenance Service"
                className="img-fluid w-100 h-100 object-fit-cover"
              />
              <button
  type="button"
  className="service-btn main-btn"
  onClick={() => closeModalAndNavigate('/client/maintenance')}
>
  Maintenance Service
</button>

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

export default DashboardCalendarMain;