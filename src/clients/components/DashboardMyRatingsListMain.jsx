import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars, faStar, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { getMyRatings } from '../../api/guestRatingApi';
import Swal from 'sweetalert2';

const DashboardMyRatingsListMain = ({ onMobileMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // API state
  const [ratingsData, setRatingsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch ratings from API
  useEffect(() => {
    fetchMyRatings();
  }, [currentPage]);

  const fetchMyRatings = async () => {
    setLoading(true);
    setError(null);

    try {
      const accessToken = localStorage.getItem('access_token') || 'q3mdPlSMfSBKo4QrUSXEezb3WU59BLcS';
      const response = await getMyRatings(accessToken, currentPage);

      if (response.status === 1 && response.data && response.data.length > 0) {
        const apiData = response.data[0];

        const mappedData = apiData.items.map(item => ({
          id: item.id,
          userName: item.user?.name || 'User',
          userImage: item.user?.avatar || '/assets/user.png',
          date: item.created_at?.split(' ')[0] || 'N/A',
          rating: item.rate || 0,
          service: `${item.type_name || 'Service'}${item.service_id?.property ? ` - ${item.service_id.property}` : ''}`,
          comment: item.comment || 'No comment provided',
          qouteImage: '/assets/qoute.png'
        }));

        setRatingsData(mappedData);
        setTotalPages(apiData._meta?.NumberOfPage || 1);
      } else {
        setRatingsData([]);
      }
    } catch (err) {
      console.error('Error fetching my ratings:', err);
      setError('Failed to load ratings');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load ratings. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const currentItems = ratingsData;

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

  const handleDropdownItemClick = () => {
    setIsDropdownOpen(false);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPaginationNumbers = () => {
    const pages = [];
    for (let i = totalPages; i >= 1; i--) {
      pages.push(
        <button
          key={i}
          className={`pagination-number ${currentPage === i ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <FontAwesomeIcon key={index} icon={faStar} className='text-warning' />
        ))}
        {hasHalfStar && <FontAwesomeIcon icon={faStar} className='text-warning half-star' />}
        <p className='m-0 date-label'>({Number(rating).toFixed(1)})</p>
      </>
    );
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

        {/* Loading state */}
        {loading && (
          <div className="text-center mt-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && currentItems.length === 0 && (
          <div className="text-center mt-4">
            <p className="text-muted">No ratings found</p>
          </div>
        )}

        {/* Render current page items */}
        {!loading && currentItems.map((item) => (
          <div className="col-12 mt-3" key={item.id}>
            <div className="card p-2">
              <div className="d-flex justify-content-between align-items-start">
                <div className="d-flex flex-column gap-2 align-items-start w-100">
                  <div className="d-flex justify-content-between align-items-start w-100">
                    <div className="d-flex align-items-center gap-2 w-100">
                      <img src={item.userImage} className='provider-rate' alt="user" />
                      <div>
                        <h6 className='popup-title m-0'>{item.userName}</h6>
                        <h6 className="dashboard-routes-sub m-0 mt-1">{item.date}</h6>
                      </div>
                    </div>
                    <img src={item.qouteImage} alt="qoute" />
                  </div>
                  <div className="d-flex gap-1 align-items-center">
                    {renderStars(item.rating)}
                  </div>
                  <h6 className='sub-service-price m-0'>{item.service}</h6>
                  <p className='m-0 deep-desc'>"{item.comment}"</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4 mb-3">
            <div className="pagination-container d-flex align-items-center">
              <button
                className="pagination-arrow"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>

              {renderPaginationNumbers()}

              <button
                className="pagination-arrow"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DashboardMyRatingsListMain;
