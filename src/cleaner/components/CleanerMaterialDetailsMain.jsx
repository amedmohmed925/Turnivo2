import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getMaterialRequestView, cancelMaterialRequest } from '../../api/cleanerMaterialsApi';
import { selectAccessToken } from '../../store/authSlice';

const CleanerMaterialDetailsMain = ({ onMobileMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dropdownRef = useRef(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get('id');

  const accessToken = useSelector(selectAccessToken);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Order ID is required',
        });
        navigate('/cleaner/material-requests');
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

      try {
        setIsLoading(true);
        const response = await getMaterialRequestView(accessToken, orderId);
        if (response.status === 1 && response.data) {
          setOrderDetails(response.data);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.message || 'Failed to load order details',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response?.data?.message || 'Failed to load order details',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, accessToken, navigate]);

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

  const handleCancelOrder = async () => {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Cancel Order',
      text: 'Are you sure you want to cancel this order?',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it',
      cancelButtonText: 'No, keep it',
    });

    if (!result.isConfirmed) return;

    try {
      const response = await cancelMaterialRequest(accessToken, orderId);
      if (response.status === 1) {
        Swal.fire({
          icon: 'success',
          title: 'Cancelled',
          text: response.message || 'Order cancelled successfully',
        });
        navigate('/cleaner/material-requests');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: response.message || 'Failed to cancel order',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to cancel order',
      });
    }
  };

  const renderStatusBadge = (status) => {
    const key = typeof status === 'string' ? status.toLowerCase() : (status?.name || '').toLowerCase();
    switch (key) {
      case 'new':
        return <div className="new-badge px-2 p-1 rounded-2">New</div>;
      case 'complete':
      case 'completed':
        return <div className="finished-badge px-2 p-1 rounded-2">Completed</div>;
      case 'cancelled':
      case 'canceled':
        return <div className="canceled-badge px-2 p-1 rounded-2">Cancelled</div>;
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
            <h2 className="mb-0 dashboard-title">Order Details</h2>
          </div>
          <div className="d-flex justify-content-end gap-2 align-items-center">
            <div className="dashboard-lang-btn d-flex gap-1 align-items-center">
              <img src="/assets/global.svg" alt="notification" />
              <span>English</span>
            </div>
            <Link to="/cleaner/shopping-cart" className="notification-icon-container">
              <img src="/assets/shopping-cart.svg" alt="cart" />
            </Link>
            <Link to="/cleaner/notifications" className="notification-icon-container">
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
        <div className="d-flex gap-2 align-items-center mt-3">
          <Link to="/cleaner/material-requests" className="btn btn-link p-0">
            ← Back to Orders
          </Link>
        </div>

        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center p-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : orderDetails ? (
          <div className="mt-3">
            <div className="card-total-price">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mb-0 dashboard-title">Order #{orderDetails.id}</h2>
                {renderStatusBadge(orderDetails.status)}
              </div>

              <div className="d-flex justify-content-between w-100 align-items-center pb-1 mb-3 border-bottom">
                <div className="card-total-price-label">Order Date</div>
                <h2 className="mb-0 dashboard-title">{orderDetails.created_at || 'N/A'}</h2>
              </div>

              {orderDetails.items && orderDetails.items.length > 0 && (
                <>
                  <h6 className="property-management-card-title mb-2 mt-4">Items</h6>
                  {orderDetails.items.map((item, index) => (
                    <div
                      key={index}
                      className="d-flex align-items-center justify-content-between flex-wrap p-3 gap-3 w-100 materials-cards rounded-4 mb-2"
                    >
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={item.image || '/assets/problem-img-2.png'}
                          className="img-fluid materials-img"
                          alt={item.name}
                        />
                        <div className="d-flex flex-column gap-1 align-items-start">
                          <h6 className="property-problem-title mb-0">{item.name || item.title}</h6>
                          <p className="text-muted m-0">Qty: {item.quantity || 1}</p>
                        </div>
                      </div>
                      <h6 className="card-item-total-price m-0">${item.price || 0}</h6>
                    </div>
                  ))}
                </>
              )}

              <div className="d-flex justify-content-between w-100 align-items-center pb-1 mb-3 mt-4 border-bottom">
                <div className="card-total-price-label">Total Price</div>
                <h2 className="mb-0 dashboard-title">${orderDetails.total_price || 0}</h2>
              </div>

              {orderDetails.status === 'new' && (
                <div className="d-flex justify-content-end align-items-center mt-3">
                  <button
                    className="btn btn-outline-danger py-2 px-4"
                    onClick={handleCancelOrder}
                  >
                    Cancel Order
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center p-5">
            <p>Order not found</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CleanerMaterialDetailsMain;
