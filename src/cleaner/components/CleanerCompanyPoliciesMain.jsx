import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../store/authSlice';
import { getTerms } from '../../api/termsApi';
import Swal from 'sweetalert2';

const CleanerCompanyPoliciesMain = ({ onMobileMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [terms, setTerms] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dropdownRef = useRef(null);
  const accessToken = useSelector(selectAccessToken);

  // Fetch terms on component mount
  useEffect(() => {
    const fetchTerms = async () => {
      try {
        setIsLoading(true);
        const response = await getTerms(accessToken);
        if (response.status === 1 && response.data) {
          setTerms(response.data[0]);
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || 'Failed to load company policies',
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (accessToken) {
      fetchTerms();
    }
  }, [accessToken]);

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
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center p-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : terms ? (
          <div className="d-flex flex-column gap-2 align-items-center justify-content-center text-center p-md-5 p-4">
            <h1 className='policy-title m-0'>{terms.title}</h1>
            <div className="policy-container">
              <div
                className='policy-content'
                dangerouslySetInnerHTML={{ __html: terms.content }}
              />
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center p-5">
            <p>No data available</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CleanerCompanyPoliciesMain;
