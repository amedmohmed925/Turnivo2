import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { getMySmartLockRequest } from '../../api/smartLockApi';
import Swal from 'sweetalert2';

const DashboardMySmartLockRequestMain = ({ onMobileMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // API state
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  
  // Fetch requests from API
  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        throw new Error('No access token found. Please login again.');
      }
      
      const response = await getMySmartLockRequest(accessToken, currentPage);
      
      if (response && response.status === 1 && response.data && response.data[0]) {
        const { items, _meta } = response.data[0];
        setRequests(items || []);
        setTotalPages(_meta?.NumberOfPage || 1);
        setTotalCount(_meta?.totalCount || 0);
      } else {
        setRequests([]);
        setTotalPages(1);
      }
    } catch (err) {
      console.error('Error fetching smart lock requests:', err);
      setError(err.message || 'Failed to fetch smart lock requests');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message || 'Failed to fetch smart lock requests. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch requests when component mounts or when page changes
  useEffect(() => {
    fetchRequests();
  }, [currentPage]);
  
  // Helper function to map API data to component format
  const mapRequestToCard = (request) => {
    // Determine status based on payment_status and status fields
    let status = 'new';
    if (request.payment_status === 1) {
      if (request.status === 0) status = 'new';
      else if (request.status === 1) status = 'in-progress';
      else if (request.status === 2) status = 'finished';
    } else if (request.payment_status === 0) {
      status = 'pending-payment';
    }
    
    // Map platform to icon
    const platformName = request.property_id?.platform_id?.name?.toLowerCase() || '';
    let platformIcon = '/assets/booking.svg';
    if (platformName.includes('airbnb') || platformName.includes('bnb')) {
      platformIcon = '/assets/bnb.svg';
    }
    
    return {
      id: request.id,
      title: 'Smart Lock Request',
      subtitle: request.property_id?.name || 'Property',
      date: request.date || 'N/A',
      time: `${request.time_from || ''} - ${request.time_to || ''}`,
      price: `${request.price || 0} SAR`,
      location: request.property_id?.address || 'N/A',
      platform: request.property_id?.platform_id?.name || 'N/A',
      platformIcon: platformIcon,
      status: status,
      image: request.property_id?.image || '/assets/problem-img-2.png',
      paymentStatus: request.payment_status
    };
  };
  
  // Map requests to display format
  const currentItems = requests.map(mapRequestToCard);

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
  
  // Function to handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  // Function to render pagination numbers
  const renderPaginationNumbers = () => {
    const pages = [];
    // Render pages in descending order
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
  
  // Function to render badge based on status
  const renderStatusBadge = (status) => {
    switch(status) {
      case 'new':
        return <div className='new-badge px-2 p-1 rounded-2'>New</div>;
      case 'in-progress':
        return <div className='in-progress-badge px-2 p-1 rounded-2'>In progress</div>;
      case 'finished':
        return <div className='finished-badge px-2 p-1 rounded-2'>Finished</div>;
      case 'pending-payment':
        return <div className='canceled-badge px-2 p-1 rounded-2'>Pending Payment</div>;
      default:
        return null;
    }
  };
  
  // Function to render action buttons based on status
  const renderActionButtons = (status, itemId, paymentStatus) => {
    if (paymentStatus === 0) {
      return <button className="btn btn-outline-primary">Complete Payment</button>;
    }
    
    switch(status) {
      case 'new':
        return <button className="btn btn-outline-info">View Details</button>;
      case 'in-progress':
        return <button className="btn btn-outline-info">View Details</button>;
      case 'finished':
        return (
          <div className="d-flex gap-2 align-items-center">
            <button className="sec-btn rounded-2 px-4 py-2 w-50-100">
              Re-order
            </button>
          </div>
        );
      default:
        return null;
    }
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
            <h2 className="mb-0 dashboard-title">My Smart Lock Request</h2>
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

        <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap mb-3">
          <div className="search-input-wrapper mt-2">
            <SearchOutlinedIcon className="search-icon" />
            <input
              type="text"
              className="search-gray-input form-control"
              placeholder="Find a request..."
            />
          </div>
          <Link to='/client/smart-checkin-checkout' 
            type="submit" 
            className="sec-btn rounded-2 py-2 px-3 d-flex align-items-center gap-1 text-decoration-none"
          >
            <span>New Smart Lock Request</span>
          </Link>
        </div>
        
        {/* Loading state */}
        {loading && (
          <div className="text-center mt-4 mb-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        
        {/* Show message if no requests found */}
        {!loading && currentItems.length === 0 ? (
          <div className="text-center mt-4 mb-4">
            <p className="text-muted">No smart lock requests found.</p>
          </div>
        ) : !loading && (
          <>
            {/* Render current page items */}
            {currentItems.map((item) => (
              <div 
                key={item.id} 
                className="d-flex align-items-center justify-content-between p-3 gap-2 w-100 materials-cards rounded-4 mb-3"
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex w-100 align-items-start flex-column flex-md-row gap-2">
                  <img src={item.image} className='img-fluid materials-img' alt="location" />   
                  <div className='d-flex flex-column gap-2 align-items-start w-100'>
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <h6 className="property-problem-title mb-0">{item.title}</h6>
                      {renderStatusBadge(item.status)}
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <img src="/assets/calendar-3.svg" alt="calendar" />
                      <p className="dashboard-home-card-2-desc-3 m-0">{item.date}</p>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <img src="/assets/clock.svg" alt="clock" />
                      <p className="dashboard-home-card-2-desc-3 mb-0">{item.time}</p>
                    </div>
                    <h6 className="property-problem-title mb-0">{item.subtitle}</h6>
                    <div className="d-flex align-items-center gap-1">
                      <img src="/assets/location-2.svg" alt="location" />
                      <p className="dashboard-home-card-2-desc-3 m-0">{item.location}</p>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                      <img src="/assets/dollar.svg" alt="price" />
                      <p className="dashboard-home-card-2-desc-3 m-0">{item.price}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center flex-wrap w-100">
                      <div className="bnb-badge d-flex align-items-center gap-2 p-2 rounded-2">
                        <img src={item.platformIcon} alt={item.platform} />
                        <span>{item.platform}</span>
                      </div>
                      <div className="d-flex gap-2 align-items-center">
                        {renderActionButtons(item.status, item.id, item.paymentStatus)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Only show pagination if there are items */}
            {currentItems.length > 0 && totalPages > 1 && (
              <div className="d-flex justify-content-center mt-2 mb-3">
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
          </>
        )}
      </div>
    </section>
  );
};

export default DashboardMySmartLockRequestMain;
