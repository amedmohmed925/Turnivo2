import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { Person, Settings, Logout } from '@mui/icons-material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Link } from 'react-router-dom';
import { rateService } from '../../api/guestRatingApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardServicesMaintenanceMain = ({ onMobileMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Rating state
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Temporary service data - replace with actual service data
  const [serviceId] = useState(1); // Replace with actual service ID
  const [serviceType] = useState(1); // Replace with actual service type

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

  // Handle star click
  const handleStarClick = (starIndex) => {
    setRating(starIndex);
  };

  // Handle star hover
  const handleStarHover = (starIndex) => {
    setHoveredRating(starIndex);
  };

  // Handle star leave
  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  // Handle rating submission
  const handleRatingSubmit = async () => {
    if (rating === 0) {
      toast.error('Please select a rating', {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    if (!comment.trim()) {
      toast.error('Please enter feedback', {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    setLoading(true);
    try {
      const accessToken = localStorage.getItem('access_token') || 'q3mdPlSMfSBKo4QrUSXEezb3WU59BLcS';
      
      const response = await rateService(
        accessToken,
        serviceId,
        serviceType,
        rating,
        comment
      );

      // Check if response contains error message in data array
      if (response.status === 1 && response.data && Array.isArray(response.data) && response.data.length > 0) {
        if (response.data[0].status === 0 && response.data[0].message) {
          toast.error(response.data[0].message, {
            position: "top-center",
            autoClose: 3000,
          });
          setLoading(false);
          return;
        }
      }

      if (response.status === 1) {
        toast.success(response.message || 'Rating submitted successfully!', {
          position: "top-center",
          autoClose: 2000,
        });
        // Reset form
        setRating(0);
        setComment('');
      } else {
        toast.error(response.message || 'Failed to submit rating', {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setRating(0);
    setComment('');
    setHoveredRating(0);
  };


  return (
    <section>
      <ToastContainer />
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
            <h2 className="mb-0 dashboard-title">My Ratings</h2>
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
        <h6 className="dashboard-routes-sub m-0">My Ratings</h6>
            <div className="service-desc mb-3 mt-3">Service</div>
                            <div className="d-flex align-items-center justify-content-between p-3 gap-2 w-100 materials-cards rounded-4 mb-3">
                <div className="d-flex w-100 align-items-start flex-column flex-md-row gap-2">
                  <img src='/assets/property-management-card-img.png' className='img-fluid materials-img' alt="location" />   
                  <div className='d-flex flex-column gap-2 align-items-start w-100'>
                      <h6 className="property-problem-title mb-0">Upholstery and carpet cleaning</h6>
                    <div className="d-flex align-items-center gap-1">
                      <img src="/assets/calendar-3.svg" alt="calendar" />
                      <p className="dashboard-home-card-2-desc-3 m-0">June 12, 2026</p>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <img src="/assets/clock.svg" alt="clock" />
                      <p className="dashboard-home-card-2-desc-3 mb-0">8:00 pm - 10:00 pm</p>
                    </div>
                    <h6 className="property-problem-title mb-0">Nakheel Neighborhood Hotel</h6>
                    <div className="d-flex align-items-center gap-1">
                      <img src="/assets/location-2.svg" alt="location" />
                      <p className="dashboard-home-card-2-desc-3 m-0">Riyadh, Al Narjis Neighborhood</p>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <img src="/assets/dollar.svg" alt="price" />
                      <p className="dashboard-home-card-2-desc-3 m-0">250 SAR</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2 mb-3">
                <div className="service-desc mb-2 mt-2">Provider</div>
                <img src="/assets/user.png" className='provider-rate' alt="user" />
                <div>
                    <h6 className='popup-title m-0'>Omar Alrajihi</h6>
                    <h6 className="dashboard-routes-sub m-0 mt-1">2024/09/28</h6>
                </div>
              </div>
              <div className="d-flex">
              <div className="rating-stars-bg p-3 rounded-3 d-flex gap-2 align-items-center mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FontAwesomeIcon
                    key={star}
                    icon={star <= (hoveredRating || rating) ? faStar : faStarRegular}
                    style={{
                      cursor: 'pointer',
                      color: star <= (hoveredRating || rating) ? '#FFD700' : '#ccc',
                      fontSize: '1.5rem'
                    }}
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => handleStarHover(star)}
                    onMouseLeave={handleStarLeave}
                  />
                ))}
              </div>
              </div>
              <div className="row">
                <div className="col-12">
                <div className="mb-3 w-100">
                  <label htmlFor="notes" className="form-label mb-1">Feedback</label>
                  <textarea
                    name="notes"
                    id="notes"
                    rows="4"
                    className="form-control rounded-2 py-2 w-100"
                    placeholder='Great and fast service! Booking was easy and the team is very professional. I will definitely order the service again!'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <button
                          onClick={handleRatingSubmit}
                          disabled={loading}
                          className="edit-btn rounded-2 px-5 py-2 w-100 border-0"
                        >
                            {loading ? 'Submitting...' : 'Rating'}
                        </button>
                    </div>
                    <div className="col-md-6">
                        <button
                          onClick={handleCancel}
                          disabled={loading}
                          className="delete-btn rounded-2 px-5 py-2 w-100 border-0"
                        >
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