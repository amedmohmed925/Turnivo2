import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons';
import { Person, Settings, Logout } from '@mui/icons-material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Link } from 'react-router-dom';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import { getNotifications, getNotificationBadge } from '../../api/notificationApi';
import Swal from 'sweetalert2';

const ClientNotificationsMain = ({ onMobileMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // API state
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [badgeCount, setBadgeCount] = useState(0);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Fetch notifications
  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        throw new Error('No access token found. Please login again.');
      }
      
      const response = await getNotifications(accessToken, currentPage);
      
      if (response && response.status === 1 && response.data && response.data[0]) {
        const { items, _meta } = response.data[0];
        setNotifications(items || []);
        setTotalPages(_meta?.NumberOfPage || 1);
        setTotalCount(_meta?.totalCount || 0);
      } else {
        setNotifications([]);
        setTotalPages(1);
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError(err.message || 'Failed to fetch notifications');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message || 'Failed to fetch notifications. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch notification badge
  const fetchNotificationBadge = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        return;
      }
      
      const response = await getNotificationBadge(accessToken);
      
      if (response && response.status === 1) {
        setBadgeCount(parseInt(response.data) || 0);
      }
    } catch (err) {
      console.error('Error fetching notification badge:', err);
    }
  };

  // Fetch notifications and badge on mount
  useEffect(() => {
    fetchNotifications();
    fetchNotificationBadge();
  }, [currentPage]);

  // Helper function to calculate time ago
  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return dateString;
  };
  

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
            <h2 className="mb-0 dashboard-title">Notifications</h2>
          </div>
          <div className="d-flex justify-content-end gap-2 align-items-center">
            <div className="dashboard-lang-btn d-flex gap-1 align-items-center">
              <img src="/assets/global.svg" alt="notification" />
              <span>English</span>
            </div>
            <Link to='/client/notifications' className="notification-icon-container sec-btn position-relative">
              <img src="/assets/notification-2.svg" alt="notification" />
              {badgeCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {badgeCount}
                  <span className="visually-hidden">unread notifications</span>
                </span>
              )}
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
        <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
            <div className='dashboard-title m-0'> Notifications ({totalCount})</div>
                             <div className="position-relative">
                    <select
                      id="propertyType"
                      className="form-select custom-select-bs unread-bg border-0 py-2"
                      defaultValue=""
                      required
                    >
                      <option value="New">New</option>
                    </select>

                    {/* Bootstrap Icon */}
                    <i className="bi bi-chevron-down select-bs-icon"></i>
                  </div>
        </div>
        
        {/* Loading state */}
        {loading && (
          <div className="text-center mt-4 mb-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        
        {/* Notifications list */}
        {!loading && (
          <div className="notifications-container row g-0 g-lg-2 mt-2">
            {notifications.length === 0 ? (
              <div className="text-center mt-4 mb-4">
                <p className="text-muted">No notifications found.</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`col-12 mt-2 notification-item ${notification.status === 0 ? 'unread-bg' : ''} d-flex justify-content-between align-items-center gap-3`}
                >
                  <div className="d-flex align-items-center gap-2">
                    <div className={notification.status === 0 ? 'unread-dot' : 'read-dot'}></div>
                    <img 
                      src={notification.msgFrom?.avatar || '/assets/user.png'} 
                      alt="user" 
                      className="notification-user-img" 
                      onError={(e) => {
                        e.target.src = '/assets/user.png';
                      }}
                    />
                    <p className='notification-desc m-0'>
                      <span className='fw-bold'>{notification.msgFrom?.name || 'User'}</span> {notification.msg}
                    </p>
                  </div>
                  <p className='notification-time text-nowrap m-0'>{getTimeAgo(notification.created_at)}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientNotificationsMain;