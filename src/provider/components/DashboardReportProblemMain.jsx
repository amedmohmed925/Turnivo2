import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons';
import { Person, Settings, Logout } from '@mui/icons-material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Link } from 'react-router-dom';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';

const DashboardReportProblemMain = ({ onMobileMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // State to track which problem type is selected
  const [selectedProblemType, setSelectedProblemType] = useState('home-service');
  
  // State for form inputs
  const [formData, setFormData] = useState({
    email: '',
    bookingDate: '',
    serviceProviderName: '',
    typeOfIssue: '',
    deviceType: '',
    problemDescription: ''
  });

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

  // Handle problem type selection
  const handleProblemTypeClick = (type) => {
    setSelectedProblemType(type);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
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
            <h2 className="mb-0 dashboard-title">Report a problem</h2>
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
        <h6 className="dashboard-routes-sub m-0">Report a problem</h6>
        <label className="form-label mt-3 mb-1">Problem Type:</label>
        <div className="d-flex gap-2 align-items-center">
                   <div 
            className={`d-flex gap-5 align-items-center problem-checkbox-container ${selectedProblemType === 'home-service' ? 'active' : ''}`}
            onClick={() => handleProblemTypeClick('home-service')}
          >
            <label className="checkbox-label">Issue with a Home Service</label>
            <label className="custom-checkbox">
              <input 
                type="checkbox" 
                checked={selectedProblemType === 'home-service'}
                onChange={() => handleProblemTypeClick('home-service')}
              />
              <span className="checkmark"></span>
            </label>
          </div>
                    <div 
            className={`d-flex gap-5 align-items-center problem-checkbox-container ${selectedProblemType === 'technical-issue' ? 'active' : ''}`}
            onClick={() => handleProblemTypeClick('technical-issue')}
          >
            <label className="checkbox-label">Technical Issue with the App</label>
            <label className="custom-checkbox">
              <input 
                type="checkbox" 
                checked={selectedProblemType === 'technical-issue'}
                onChange={() => handleProblemTypeClick('technical-issue')}
              />
              <span className="checkmark"></span>
            </label>
          </div>
        </div>
        
        <p className='problem-check-desc my-2'>Do you have questions? Feel free to reach out to us for support or more information about on next stay. Our team is ready to answer all your queries.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="row mt-3 w-100 g-0 g-lg-2">
            {/* Email field - always shown */}
            <div className="col-12">
              <div className="mb-3 w-100">
                <input
                  type="email"
                  className="form-control rounded-2 py-2 px-3 w-100"
                  id="email"
                  name="email"
                  placeholder="E-mail address*"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Conditional fields based on problem type */}
            {selectedProblemType === 'home-service' ? (
              <>
                <div className="col-md-4">
                  <div className="mb-3 w-100">
                    <input
                      type="date"
                      className="form-control rounded-2 py-2 px-3 w-100"
                      id="bookingDate"
                      name="bookingDate"
                      placeholder="Booking Date"
                      value={formData.bookingDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3 w-100">
                    <input
                      type="text"
                      className="form-control rounded-2 py-2 px-3 w-100"
                      id="serviceProviderName"
                      name="serviceProviderName"
                      placeholder="Service Provider Name (optional)"
                      value={formData.serviceProviderName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3 w-100">
                    <input
                      type="text"
                      className="form-control rounded-2 py-2 px-3 w-100"
                      id="typeOfIssue"
                      name="typeOfIssue"
                      placeholder="Type of Issue"
                      value={formData.typeOfIssue}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="col-md-6">
                  <div className="mb-3 w-100">
                    <input
                      type="text"
                      className="form-control rounded-2 py-2 px-3 w-100"
                      id="typeOfIssue"
                      name="typeOfIssue"
                      placeholder="Type of Issue"
                      value={formData.typeOfIssue}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3 w-100">
                    <input
                      type="text"
                      className="form-control rounded-2 py-2 px-3 w-100"
                      id="deviceType"
                      name="deviceType"
                      placeholder="Device Type"
                      value={formData.deviceType}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </>
            )}
            
            {/* Problem Description - always shown */}
            <div className="col-12">
              <div className="mb-3 w-100">
                <textarea 
                  rows='6' 
                  className='form-control rounded-2 py-2' 
                  placeholder='Problem Description'
                  id="problemDescription"
                  name="problemDescription"
                  value={formData.problemDescription}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
            </div>
            
            <div className="col-12">
              <button type="submit" className="sec-btn rounded-2 px-5 py-2 w-100">
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default DashboardReportProblemMain;