import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getMaterialRequestDetails, changeStatusMaterialRequest } from '../../api/superviserMatrialsApi';

const DashboardMaterialDetailsMain = ({ onMobileMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [materialDetails, setMaterialDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isChangingStatus, setIsChangingStatus] = useState(false);

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
            text: 'Material request ID is missing',
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

        const response = await getMaterialRequestDetails(accessToken, id);

        if (response.status === 1 && response.data) {
          const detail = Array.isArray(response.data) ? response.data[0] : response.data;
          setMaterialDetails(detail || null);
        } else {
          setMaterialDetails(null);
        }
      } catch (error) {
        console.error('Error fetching material request details:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'Failed to load material request details',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [searchParams]);

  const handleChangeStatus = async () => {
    const { value: comment } = await Swal.fire({
      title: getStatusButtonText(),
      input: 'textarea',
      inputLabel: 'Enter comment (required)',
      inputPlaceholder: 'Type your comment here...',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: '#f7941d',
      inputValidator: (value) => {
        if (!value || !value.trim()) {
          return 'Comment is required!';
        }
      }
    });

    if (comment && comment.trim()) {
      try {
        setIsChangingStatus(true);
        const accessToken = localStorage.getItem('access_token');
        const id = searchParams.get('id');
        
        const response = await changeStatusMaterialRequest(accessToken, id, comment.trim());
        
        if (response.status === 1) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.message || 'Status changed successfully',
          });
          // Refresh the details
          const refreshResponse = await getMaterialRequestDetails(accessToken, id);
          if (refreshResponse.status === 1 && refreshResponse.data) {
            const detail = Array.isArray(refreshResponse.data) ? refreshResponse.data[0] : refreshResponse.data;
            setMaterialDetails(detail || null);
          }
        } else {
          // Handle API error response
          let errorMessage = response.message || 'Failed to change status';
          if (response.data && Array.isArray(response.data)) {
            const errors = response.data.map(err => `${err.field}: ${err.message}`).join('\n');
            errorMessage = errors;
          }
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMessage,
          });
        }
      } catch (error) {
        // Handle caught error with detailed message
        let errorMessage = error.message || 'Failed to change status';
        if (error.data && Array.isArray(error.data)) {
          const errors = error.data.map(err => `${err.field}: ${err.message}`).join('\n');
          errorMessage = errors;
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
        });
      } finally {
        setIsChangingStatus(false);
      }
    }
  };

  const calculateTotalPrice = (items) => {
    if (!items || !items.length) return 0;
    return items.reduce((sum, item) => sum + (item.total_price || 0), 0);
  };

  // Get status badge class based on status
  const getStatusBadgeClass = (status) => {
    const statusName = status?.name?.toLowerCase();
    switch (statusName) {
      case 'new':
        return 'new-badge';
      case 'progress':
      case 'inprogress':
      case 'in-progress':
        return 'in-progress-badge';
      case 'complete':
      case 'completed':
        return 'finished-badge';
      case 'cancelled':
      case 'canceled':
      case 'closed':
        return 'canceled-badge';
      default:
        return 'new-badge';
    }
  };

  // Get button text based on current status
  const getStatusButtonText = () => {
    const statusName = materialDetails?.status?.name?.toLowerCase();
    switch (statusName) {
      case 'new':
        return 'Mark as In Progress';
      case 'progress':
      case 'inprogress':
      case 'in-progress':
        return 'Mark as Complete';
      case 'complete':
      case 'completed':
        return 'Close Service';
      default:
        return 'Change Status';
    }
  };

  // Check if status button should be shown
  const shouldShowStatusButton = () => {
    const statusName = materialDetails?.status?.name?.toLowerCase();
    return ['new', 'progress', 'inprogress', 'in-progress', 'complete', 'completed'].includes(statusName);
  };

  if (isLoading) {
    return (
      <section>
        <div className="dashboard-home-content px-3 mt-5">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!materialDetails) {
    return (
      <section>
        <div className="dashboard-home-content px-3 mt-5">
          <div className="text-center py-5">
            <p className="m-0">Material request details not found.</p>
            <Link to="/provider/material-request" className="btn btn-primary mt-3">
              Back to Material Requests
            </Link>
          </div>
        </div>
      </section>
    );
  }

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
            <h2 className="mb-0 dashboard-title">Material Request Details</h2>
          </div>
          <div className="d-flex justify-content-end gap-2 align-items-center">
            <div className="dashboard-lang-btn d-flex gap-1 align-items-center">
              <img src="/assets/global.svg" alt="notification" />
              <span>English</span>
            </div>
            <Link to='/provider/notifications' className="notification-icon-container">
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
        <div className="row">
          <div className="col-12">
            <h6 className="property-problem-title mb-2 mt-2">Request Information</h6>
            <div className="d-flex align-items-center justify-content-between p-3 gap-2 w-100 materials-cards rounded-4 mb-3">
              <div className="d-flex w-100 align-items-start flex-column flex-md-row gap-3">
                <img 
                  src={materialDetails.user?.avatar || '/assets/user.png'} 
                  className='img-fluid rounded-circle' 
                  alt="user" 
                  style={{width: '100px', height: '100px', objectFit: 'cover'}}
                />   
                <div className='d-flex flex-column gap-2 align-items-start w-100'>
                  <div className="d-flex justify-content-between align-items-center w-100 flex-wrap gap-2">
                    <h6 className="property-problem-title mb-0">{materialDetails.user?.name || 'Unknown User'}</h6>
                    <div className="d-flex gap-2 align-items-center">
                      <div className={`${getStatusBadgeClass(materialDetails.status)} px-2 p-1 rounded-2`}>
                        {materialDetails.status?.name || 'New'}
                      </div>
                      <div className='new-badge px-2 p-1 rounded-2'>Request #{materialDetails.id}</div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <img src="/assets/more-square.svg" alt="id" />
                    <p className="dashboard-home-card-2-desc-3 m-0">User ID: {materialDetails.user?.id || 'N/A'}</p>
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <p className="dashboard-home-card-2-desc-3 m-0">Rating: {materialDetails.user?.rate || 0} ⭐</p>
                  </div>
                  <div className="d-flex align-items-center gap-1">
                    <img src="/assets/calendar-3.svg" alt="calendar" />
                    <p className="dashboard-home-card-2-desc-3 m-0">Created: {materialDetails.created_at || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h6 className="property-problem-title mb-2">Requested Materials</h6>
          <div className="row w-100 g-0 g-lg-2 mb-3">
            {materialDetails.material_request_items?.length ? (
              materialDetails.material_request_items.map((item) => (
                <div className="col-md-3 col-6 mb-3" key={item.id}>
                  <div className="bg-light-gray p-3 rounded-3 h-100">
                    <img 
                      src={item.material_id?.image || '/assets/service-img.png'} 
                      className='img-fluid w-100 rounded-2' 
                      alt="material" 
                      style={{height: '120px', objectFit: 'cover'}}
                    />
                    <h3 className='dashboard-routes-sub m-0 mt-2'>{item.material_name || item.material_id?.name || 'Material'}</h3>
                    <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                      <p className="dashboard-home-card-2-desc-3 m-0">Price: ${item.material_price || item.material_id?.price || 0}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center gap-1 mt-1">
                      <p className="dashboard-home-card-2-desc-3 m-0">Quantity: {item.quantity || 1}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center gap-1 mt-1">
                      <div className='third-btn-sm p-1 rounded-2'>Total: ${item.total_price || 0}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 mb-2">
                <p className='dashboard-home-card-2-desc-3 m-0'>No materials in this request.</p>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="col-12 mb-3">
            <div className="bg-light-gray p-3 rounded-3">
              <h6 className="property-problem-title mb-2">Order Summary</h6>
              <div className="d-flex justify-content-between align-items-center">
                <p className="dashboard-home-card-2-desc-3 m-0">Total Items:</p>
                <p className="smart-access-title m-0">{materialDetails.material_request_items?.length || 0}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <p className="dashboard-home-card-2-desc-3 m-0">Total Price:</p>
                <p className="smart-access-title m-0" style={{ color: '#f7941d', fontWeight: 'bold' }}>${materialDetails.total_price || calculateTotalPrice(materialDetails.material_request_items)}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <p className="dashboard-home-card-2-desc-3 m-0">Status:</p>
                <div className={`${getStatusBadgeClass(materialDetails.status)} px-3 py-1 rounded-2`}>
                  {materialDetails.status?.name || 'New'}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="d-flex gap-2 align-items-center justify-content-between flex-wrap my-3">
            <Link to="/provider/material-request" className="main-btn rounded-2 px-4 py-2 text-decoration-none">
              Back to Requests
            </Link>
            {shouldShowStatusButton() && (
              <button 
                className="sec-btn rounded-2 py-2 px-4 d-flex align-items-center justify-content-center gap-2"
                onClick={handleChangeStatus}
                disabled={isChangingStatus}
              >
                {isChangingStatus ? 'Processing...' : getStatusButtonText()}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardMaterialDetailsMain;
