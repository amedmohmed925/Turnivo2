import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { getUserData, clearUserData } from '../../utils/authStorage';
import { useUserInfo, useContactForm } from '../../hooks/useContact';

const DashboardContactMain = ({ onMobileMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  
  // Get user data from localStorage
  const storedUserData = getUserData();
  
  // Fetch fresh user info from API
  const { data: userInfoData, isLoading } = useUserInfo();
  const contactMutation = useContactForm();
  
  // Form state - includes mobile field
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    body: '',
  });

  // Initialize form with user data
  useEffect(() => {
    if (userInfoData?.data && userInfoData.data.length > 0) {
      const userData = userInfoData.data[0];
      setFormData(prev => ({
        ...prev,
        name: userData.name || '',
        mobile: userData.mobile || '',
        email: userData.email || '',
      }));
    } else if (storedUserData) {
      setFormData(prev => ({
        ...prev,
        name: storedUserData.name || '',
        mobile: storedUserData.mobile || '',
        email: storedUserData.email || '',
      }));
    }
  }, [userInfoData, storedUserData]);

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
    setIsDropdownOpen(false);
    
    if (item === 'logout') {
      clearUserData();
      navigate('/login');
    } else if (item === 'profile') {
      navigate('/client/profile');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form - ensure all required fields are present
    if (!formData.name || !formData.mobile || !formData.email || !formData.body) {
      return;
    }
    
    // Submit contact form with all required fields: name, mobile, email, body
    contactMutation.mutate(formData, {
      onSuccess: () => {
        // Clear message body after successful submission
        setFormData(prev => ({
          ...prev,
          body: ''
        }));
      }
    });
  };

  // Get display data from API or localStorage
  const userData = userInfoData?.data?.[0] || storedUserData;
  const displayName = userData?.name || 'User';
  const displayAvatar = userData?.avatar || '/assets/user.png';
  const displayDate = userData?.created_at || new Date().toISOString().split('T')[0];

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
            <h2 className="mb-0 dashboard-title">Contact us</h2>
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
                <span className="user-name">{displayName}</span>
                <img 
                  src={displayAvatar}
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
                    <img src="/assets/user-square.svg" alt="profile" />
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
                    <img src="/assets/logout-icon.svg" alt="logout" />
                    <span>Logout</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-home-content px-3 mt-2">
        <h6 className="dashboard-routes-sub m-0">Contact us</h6>
        <div className="d-flex align-items-center gap-2 my-3">
          <div className="service-desc mb-2 mt-2">Welcome to Customer Service</div>
          <img src={displayAvatar} className='provider-rate' alt="user" />
          <div>
            <h6 className='popup-title m-0'>{displayName}</h6>
            <h6 className="dashboard-routes-sub m-0 mt-1">{displayDate}</h6>
          </div>
        </div>
        <p className='contact-desc m-0 mb-3'>
          Do you have questions? Feel free to reach out to us for support or more information about on next stay. Our team is ready to answer all your queries.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-12">
              <div className="mb-3 w-100">
                <input
                  type="email"
                  name="email"
                  className="form-control rounded-2 py-2 px-3 w-100"
                  placeholder="E-mail address*"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="mb-3 w-100">
                <textarea 
                  name="body" 
                  id="body" 
                  rows="6" 
                  className="form-control rounded-2 py-2 w-100" 
                  placeholder='Share your issues or queries here'
                  value={formData.body}
                  onChange={handleInputChange}
                  required
                  disabled={contactMutation.isPending}
                />
              </div>
            </div>
              <div className="col-12 mb-3">
                <button 
                  type="submit"
                  className="sec-btn rounded-2 px-5 py-2 w-100 border-0"
                  disabled={contactMutation.isPending || !formData.body}
                >
                  {contactMutation.isPending ? (
                    <>
                      <span className="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>
                      Sending...
                    </>
                  ) : (
                    'Send'
                  )}
                </button>
              </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default DashboardContactMain;