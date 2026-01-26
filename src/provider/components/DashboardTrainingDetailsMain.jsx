import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars, faDownload } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmark } from '@fortawesome/free-regular-svg-icons';
import { Link, useSearchParams } from 'react-router-dom';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import Swal from 'sweetalert2';
import { getTrainingById } from '../../api/trainingApi';

const DashboardTrainingDetailsMain = ({ onMobileMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [searchParams] = useSearchParams();
  const [trainingDetails, setTrainingDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const id = searchParams.get('id');
        const accessToken = localStorage.getItem('access_token');

        if (!id) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Training ID is missing',
          });
          return;
        }

        if (!accessToken) {
          Swal.fire({
            icon: 'error',
            title: 'Authentication Required',
            text: 'Please login to continue',
          });
          return;
        }

        const response = await getTrainingById(accessToken, id);

        if (response.status === 1) {
          const detail = Array.isArray(response.data)
            ? response.data?.[0]?.items?.[0] || response.data?.[0]
            : response.data?.items?.[0] || response.data?.[0];
          setTrainingDetails(detail || null);
        } else {
          setTrainingDetails(null);
        }
      } catch (error) {
        console.error('Error fetching training details:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'Failed to load training details',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [searchParams]);

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
            <h2 className="mb-0 dashboard-title">Training details</h2>
          </div>
          <div className="d-flex justify-content-end gap-2 align-items-center">
            <div className="dashboard-lang-btn d-flex gap-1 align-items-center">
              <img src="/assets/global.svg" alt="notification" />
              <span>English</span>
            </div>
            <Link to='/provider/notifications' className="notification-icon-container">
              <img src="/assets/notification.svg" alt="notification" />
            </Link>
            
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
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : !trainingDetails ? (
          <div className="text-center py-5">
            <p className="m-0">Training not found.</p>
          </div>
        ) : (
          <div className="row g-0 g-lg-2 mt-3">
            <div className="col-12 mb-2">
              <div className="">
                <img
                  src={trainingDetails.image || '/assets/training-card-img.png'}
                  className="training-details-card-img img-fluid w-100 rounded-2"
                  alt={trainingDetails.title || 'training'}
                />

                <div className="card-body p-2 d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-3">
                      <ThumbDownOffAltOutlinedIcon />
                      <ThumbUpOffAltOutlinedIcon />
                    </div>

                    <div className="d-flex align-items-center gap-3">
                      <FontAwesomeIcon icon={faDownload} className="fs-5" />
                      <FontAwesomeIcon icon={faBookmark} className="fs-5" />
                    </div>
                  </div>
                  <div className="training-card-title mb-2">
                    {trainingDetails.title || trainingDetails.name || 'Training title'}
                  </div>

               

                  {trainingDetails.content && (
                    <div className="training-details-card-desc" dangerouslySetInnerHTML={{ __html: trainingDetails.content }} />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DashboardTrainingDetailsMain;