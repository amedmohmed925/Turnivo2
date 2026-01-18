import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons';
import { Person, Settings, Logout } from '@mui/icons-material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Link } from 'react-router-dom';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
const CleanerCompanyPoliciesMain = ({ onMobileMenuClick }) => {
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
            <h2 className="mb-0 dashboard-title">Company Policies</h2>
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
            <div className="d-flex flex-column gap-2 align-items-center justify-content-center text-center p-md-5 p-4">
                <h1 className='policy-title m-0'>Company Policies</h1>
                <p className='policy-desc mb-5'>Key information about work agreements, company policies, and how to report issues or request materials through the platform.</p>
                <div className="policy-container">
                    <p className='policy-item text-center mb-2'>Legal & Contracts</p>
                    <p className='policy-item text-center mb-2'>We are committed to providing a safe, professional, and transparent environment for all users of our platform. The following sections outline the legal agreements, company policies, and procedures for issue resolution.</p>
                    <p className='policy-item text-center mb-2'>1. Work Agreement</p>
                    <p className='policy-item text-center mb-2'>Please review the contract details and terms of service carefully before starting any tasks through the platform.</p>
                    <ul>
                        <li className='policy-item text-center mb-2'>The agreement outlines the rights and responsibilities of both the service provider and the host.</li>
                        <li className='policy-item text-center mb-2'>By joining the platform, you agree to comply with the terms stated in the agreement.</li>
                    </ul>
                    <p className='policy-item text-center mb-2'>2. Company Policies</p>
                    <p className='policy-item text-center mb-2'>To maintain quality and safety across all services, the following company policies must be followed:</p>
                    <ul>
                        <li className='policy-item text-center mb-2'>Cleaning Guidelines: Follow the cleaning procedures and standards provided by the platform to ensure consistent service.</li>
                        <li className='policy-item text-center mb-2'>Safety Protocols: Always wear protective gear when required and maintain professional conduct at job sites.</li>
                        <li className='policy-item text-center mb-2'>Compliance Requirements: All users must adhere to local laws and the platform’s operational guidelines.</li>
                    </ul>
                    <p className='policy-item text-center mb-2'>3. Report Issues</p>
                    <p className='policy-item text-center mb-2'>Transparency is important to us. If you encounter any issues, you can raise a dispute directly through the platform.</p>
                    <ul>
                        <li className='policy-item text-center mb-2'>Payment Issues: Report delays or discrepancies in payments.</li>
                        <li className='policy-item text-center mb-2'>Job-Related Problems: Such as rejected tasks or incomplete bookings.</li>
                        <li className='policy-item text-center mb-2'>Host Interactions: Report any inappropriate or uncomfortable behavior during service.</li>
                    </ul>
                    <p className='policy-item text-center mb-2'>4. Request Materials</p>
                    <p className='policy-item text-center mb-2'>Hosts can request essential supplies directly through the platform when needed.</p>
                    <ul>
                        <li className='policy-item text-center mb-2'>This includes cleaning materials or specific tools required to complete a job.</li>
                        <li className='policy-item text-center mb-2'>All requests are reviewed and approved based on task requirements.</li>
                    </ul>
                </div>
            </div>
      </div>
    </section>
  );
};

export default CleanerCompanyPoliciesMain;