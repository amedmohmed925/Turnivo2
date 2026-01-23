import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getPropertyById, getPropertyCalendar, getProperties, createSmartLockRequest, getContactInfo } from '../../api/propertyApi';
import { getSmartLockHistoryCheckin, getSmartLockHistoryCheckout } from '../../api/smartLockApi';

const DashboardSmartCheckMain = ({ onMobileMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const propertyCardsRef = useRef({});
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // State for properties
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for payment
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  
  // State for rise_price from contact info
  const [risePrice, setRisePrice] = useState(0);
  
  // State for smart lock history
  const [historyTab, setHistoryTab] = useState('checkin'); // 'checkin' or 'checkout'
  const [historyData, setHistoryData] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  
  // State for smart lock request
  const [lockRequestData, setLockRequestData] = useState({
    property_id: null,
    date: '',
    time_from: '10:00',
    time_to: '12:00',
    price: 0,
    card_number: '',
    expiry_date: '',
    cvv: ''
  });

  // Fetch properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        const accessToken = localStorage.getItem('access_token');
        
        if (!accessToken) {
          Swal.fire({
            icon: 'error',
            title: 'Authentication Required',
            text: 'Please log in to view properties.',
          });
          navigate('/client/login');
          return;
        }

        // Fetch all properties with pagination
        let allProperties = [];
        let currentPage = 1;
        let hasMorePages = true;

        while (hasMorePages) {
          const propertiesResponse = await getProperties(accessToken, currentPage);
          if (propertiesResponse.status === 1 && propertiesResponse.data) {
            const pageData = propertiesResponse.data[0];
            const items = pageData?.items || [];
            allProperties = [...allProperties, ...items];

            // Check if there are more pages
            const meta = pageData?._meta;
            if (meta && currentPage < meta.NumberOfPage) {
              currentPage++;
            } else {
              hasMorePages = false;
            }
          } else {
            hasMorePages = false;
          }
        }

        setProperties(allProperties);
        
        // Auto-select first property if available
        if (allProperties.length > 0) {
          setSelectedProperty(allProperties[0]);
          setLockRequestData(prev => ({ ...prev, property_id: allProperties[0].id }));
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError(err.message);
        setIsLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load properties. Please try again.',
        });
      }
    };

    fetchProperties();
  }, [navigate]);

  // Fetch contact info to get rise_price
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        
        if (!accessToken) {
          return;
        }

        const contactInfoResponse = await getContactInfo(accessToken);
        if (contactInfoResponse.status === 1 && contactInfoResponse.data) {
          const settings = contactInfoResponse.data[0]?.setting;
          const price = settings?.rise_price || 0;
          setRisePrice(price);
          setLockRequestData(prev => ({ ...prev, price: price }));
        }
      } catch (err) {
        console.error('Error fetching contact info:', err);
        // Don't show error to user, just use default price
      }
    };

    fetchContactInfo();
  }, []);

  // Scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -350,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 350,
        behavior: 'smooth'
      });
    }
  };

  // Handle property selection
  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
    setLockRequestData(prev => ({ ...prev, property_id: property.id }));
  };

  // Fetch smart lock history
  const fetchSmartLockHistory = async () => {
    if (!selectedProperty) {
      setHistoryData([]);
      setHistoryLoading(false);
      return;
    }

    try {
      setHistoryLoading(true);
      const accessToken = localStorage.getItem('access_token');
      
      if (!accessToken) {
        setHistoryLoading(false);
        return;
      }

      let response;
      if (historyTab === 'checkin') {
        response = await getSmartLockHistoryCheckin(accessToken, selectedProperty.id);
      } else if (historyTab === 'checkout') {
        response = await getSmartLockHistoryCheckout(accessToken, selectedProperty.id);
      }
      
      if (response && response.status === 1 && response.data && response.data[0]) {
        const items = response.data[0]?.items || [];
        setHistoryData(items);
      } else {
        setHistoryData([]);
      }
    } catch (err) {
      console.error('Error fetching smart lock history:', err);
      setHistoryData([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  // Fetch history when selected property or tab changes
  useEffect(() => {
    if (selectedProperty) {
      fetchSmartLockHistory();
    }
  }, [selectedProperty, historyTab]);

  // Handle history tab change
  const handleHistoryTabChange = (tab) => {
    setHistoryTab(tab);
  };

  // Handle payment method selection
  const handlePaymentMethodClick = (method) => {
    setSelectedPaymentMethod(method);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLockRequestData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      
      if (!accessToken) {
        Swal.fire({ icon: 'error', title: 'Authentication Required', text: 'Please log in again.' });
        navigate('/client/login');
        return;
      }
      
      if (!selectedProperty) {
        Swal.fire({ icon: 'warning', title: 'Please select a property' });
        return;
      }
      
      if (!lockRequestData.date) {
        Swal.fire({ icon: 'warning', title: 'Please enter a date' });
        return;
      }
      
      if (!lockRequestData.time_from || !lockRequestData.time_to) {
        Swal.fire({ icon: 'warning', title: 'Please enter time from and time to' });
        return;
      }

      // Prepare API request data
      const requestData = {
        property_id: selectedProperty.id,
        date: lockRequestData.date,
        time_from: lockRequestData.time_from,
        time_to: lockRequestData.time_to,
        price: lockRequestData.price
      };

      console.log('Submitting smart lock request:', requestData);
      
      // Call the API
      const response = await createSmartLockRequest(accessToken, requestData);
      
      console.log('API Response:', response);
      
      // Close the modal
      const modal = document.getElementById('smartLockModal');
      if (modal && window.bootstrap) {
        const modalInstance = window.bootstrap.Modal.getInstance(modal);
        if (modalInstance) {
          modalInstance.hide();
        }
      } else if (modal) {
        // Fallback: manually hide if bootstrap instance not found
        modal.classList.remove('show');
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.remove();
        }
      }
      
      // Show success message
      const successMessage = response.data?.[0]?.message || 'Your smart lock request has been submitted successfully.';
      await Swal.fire({
        icon: 'success',
        title: 'Request Submitted',
        text: successMessage,
      });
      
      // Reset form
      setLockRequestData({
        property_id: properties.length > 0 ? properties[0].id : null,
        date: '',
        time_from: '10:00',
        time_to: '12:00',
        price: 0,
        card_number: '',
        expiry_date: '',
        cvv: ''
      });
      setSelectedPaymentMethod(null);
      
    } catch (err) {
      console.error('Error submitting request:', err);
      
      // Check if the error response is actually a success
      if (err.response?.data?.status === 1) {
        // Close the modal
        const modal = document.getElementById('smartLockModal');
        if (modal && window.bootstrap) {
          const modalInstance = window.bootstrap.Modal.getInstance(modal);
          if (modalInstance) {
            modalInstance.hide();
          }
        } else if (modal) {
          // Fallback: manually hide if bootstrap instance not found
          modal.classList.remove('show');
          modal.style.display = 'none';
          document.body.classList.remove('modal-open');
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) {
            backdrop.remove();
          }
        }
        
        // Show success message
        const successMessage = err.response.data.data?.[0]?.message || 'Your smart lock request has been submitted successfully.';
        await Swal.fire({
          icon: 'success',
          title: 'Request Submitted',
          text: successMessage,
        });
        
        // Reset form
        setLockRequestData({
          property_id: properties.length > 0 ? properties[0].id : null,
          date: '',
          time_from: '10:00',
          time_to: '12:00',
          price: 0,
          card_number: '',
          expiry_date: '',
          cvv: ''
        });
        setSelectedPaymentMethod(null);
        return;
      }
      
      let errorMessage = 'Failed to submit request. Please try again.';
      
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.errors) {
        const errors = err.response.data.errors;
        errorMessage = Object.values(errors).flat().join(', ');
      }
      
      Swal.fire({
        icon: 'error',
        title: 'Error',
        html: `<pre style="text-align: left; font-size: 0.9em;">${JSON.stringify(err.response?.data || err.message, null, 2)}</pre>`,
        width: '600px'
      });
    }
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

  const handleDropdownItemClick = (action) => {
    setIsDropdownOpen(false);
    if (action === 'profile') {
      navigate('/client/profile');
    } else if (action === 'settings') {
      navigate('/client/settings');
    } else if (action === 'logout') {
      localStorage.removeItem('access_token');
      navigate('/client/login');
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
            <h2 className="mb-0 dashboard-title">Smart checkin / checkout</h2>
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
        <div className="d-flex justify-content-between align-items-center flex-wrap mt-3">
          <h2 className="mb-0 dashboard-title">Address</h2>
          <button 
            type="button" 
            className="sec-btn rounded-2 py-2 px-3 d-flex align-items-center gap-2"
            data-bs-toggle="modal"
            data-bs-target="#smartLockModal"
          >
            <img src="/assets/key.svg" alt="key" />
            <span>Request a smart lock</span>
          </button>
        </div>
        <div className="row mt-3 w-100 g-0">
          <div className="col-md-2 mb-3 col-20-per h-100 px-2 d-flex flex-column justify-content-center align-items-center">
            <div className="bg-light-gray smart-gray p-3 rounded-3 mb-3 active">
              <img src="/assets/smart-door.png" className='img-fluid w-100' alt="service" />
            </div>
            <h6 className='m-0'>Nakheel Neighborhood Hotel</h6>
          </div>
          <div className="col-md-2 mb-3 col-20-per h-100 px-2 d-flex flex-column justify-content-center align-items-center">
            <div className="bg-light-gray smart-gray p-3 rounded-3 mb-3">
              <img src="/assets/smart-door.png" className='img-fluid w-100' alt="service" />
            </div>
            <h6 className='m-0'>Nakheel Neighborhood Hotel</h6>
          </div>
          <div className="col-md-2 mb-3 col-20-per h-100 px-2 d-flex flex-column justify-content-center align-items-center">
            <div className="bg-light-gray smart-gray p-3 rounded-3 mb-3">
              <img src="/assets/smart-door.png" className='img-fluid w-100' alt="service" />
            </div>
            <h6 className='m-0'>Nakheel Neighborhood Hotel</h6>
          </div>
          <div className="col-md-2 mb-3 col-20-per h-100 px-2 d-flex flex-column justify-content-center align-items-center">
            <div className="bg-light-gray smart-gray p-3 rounded-3 mb-3">
              <img src="/assets/smart-door.png" className='img-fluid w-100' alt="service" />
            </div>
            <h6 className='m-0'>Nakheel Neighborhood Hotel</h6>
          </div>
          <div className="col-md-2 mb-3 col-20-per h-100 px-2 d-flex flex-column justify-content-center align-items-center">
            <div className="bg-light-gray smart-gray p-3 rounded-3 mb-3">
              <img src="/assets/smart-door.png" className='img-fluid w-100' alt="service" />
            </div>
            <h6 className='m-0'>Nakheel Neighborhood Hotel</h6>
          </div>
        </div>
        <div className="row mt-3 w-100 g-0">
          <div className='col-md-2 mb-3 col-20-per'>
            <div className="d-flex align-items-start flex-column p-2 rounded-3 bg-light-gray-2">
              <h5 className='qr-title m-0 mb-1'>QR code</h5>
              <img src="/assets/qr-code-2.png" className='qr-code-2' alt="QR Code" />
            </div>
          </div>
          <div className='col-md-2 mb-3 col-20-per'></div>
          <div className='col-md-2 mb-3 col-20-per'></div>
          <div className='col-md-2 mb-3 col-20-per px-2'>
            <div className="d-flex align-items-start flex-column p-2 rounded-3 bg-light-gray active mx-auto">
              <h5 className='qr-title m-0 mb-1'>Lock battery status</h5>
              <div className="edit-btn w-100 py-2 text-center">Low</div>
            </div>
          </div>
          <div className='col-md-2 mb-3 col-20-per px-2'>
            <div className="d-flex align-items-start flex-column p-2 rounded-3 bg-light-gray active mx-auto">
              <h5 className='qr-title m-0 mb-1'>Lock status</h5>
              <div className="edit-btn w-100 py-2 text-center">Open</div>
            </div>
          </div>
        </div>
        <h5 className='qr-title m-0 mb-1'>Generate temp access code</h5>
        <button
          className="sec-btn rounded-2 px-4 py-2 w-50-100"
          data-bs-toggle="modal"
          data-bs-target="#tempAccessModal"
        >
          Temp access code
        </button>

        <div className="d-flex gap-1 align-items-center flex-wrap flex-lg-nowrap my-3">
          <div className="row package-filter align-items-center py-2 px-0 m-0 w-100">
            <div className="col-md-2 col-20-per">
              <button 
                className={`rounded-2 border-0 px-2 py-2 w-100 ${historyTab === 'checkin' ? 'sec-btn' : 'package-filter-item'}`}
                onClick={() => handleHistoryTabChange('checkin')}
              >
                Checkin history
              </button>
            </div>
            <div className="col-md-2 col-20-per">
              <p 
                className={`text-center rounded-2 py-2 m-0 ${historyTab === 'checkout' ? 'sec-btn' : 'package-filter-item'}`}
                onClick={() => handleHistoryTabChange('checkout')}
                style={{ cursor: 'pointer' }}
              >
                checkout history
              </p>
            </div>
            <div className="col-md-2 col-20-per">
              <p 
                className="text-center rounded-2 py-2 m-0 package-filter-item"
              >
                Welcoming message
              </p>
            </div>
            <div className="col-md-2 col-20-per">
              <p 
                className="text-center rounded-2 py-2 m-0 package-filter-item"
              >
                Checkout message
              </p>
            </div>
            <div className="col-md-2 col-20-per">
              <p 
                className="text-center rounded-2 py-2 m-0 package-filter-item"
              >
                Property rules
              </p>
            </div>
          </div>
          <button
            className="main-btn rounded-2 px-2 py-2 d-flex gap-1 align-items-center text-nowrap w-50-100 justify-content-center"
            data-bs-toggle="modal"
            data-bs-target="#propertyQrModal"
          >
            <img src="/assets/scan-barcode.svg" alt="barcode" />
            <span>Property QR code</span>
          </button>
        </div>
        
        {historyLoading ? (
          <div className="text-center mt-4 mb-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : historyData.length === 0 ? (
          <div className="text-center mt-4 mb-4">
            <p className="text-muted">No {historyTab} history found for this property.</p>
          </div>
        ) : (
          <div className="card p-2 rounded-4">
            {historyData.map((item) => (
              <div key={item.id} className='bg-light-gray p-3 mb-3 rounded-4 d-flex align-items-center gap-4 flex-wrap'>
                <div className="d-flex align-items-center gap-2 m-0">
                  <img src="/assets/dashboard-card-icon-15.svg" className='img-fluid smart-icon' alt="icon" />
                  <h6 className='smart-title m-0'>Code {item.code}</h6>
                </div>
                <div>
                  <h6 className="dashboard-home-card-2-desc-1">
                    {historyTab === 'checkin' ? 'Checkin' : 'Checkout'} with access code {item.code}
                  </h6>
                  <div className="d-flex align-items-center gap-1">
                    <div className="d-flex align-items-center gap-1">
                      <img src="/assets/dashboard-card-icon-8.svg" className='smart-icon-2' alt="icon" />
                      <p className="dashboard-home-card-2-desc-3 m-0">{item.created_at}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Temp Access Modal */}
      <div
        className="modal fade"
        id="tempAccessModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4">
            <div className="modal-header border-0">
              <h5 className="m-0 dashboard-title">
                Generate Temporary Access Code
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <div className="">
                <label className="property-management-card-address fw-bold">
                  Please enter Guest E-mail address
                </label>
                <input
                  type="email"
                  className="form-control rounded-2 py-2"
                  placeholder="Enter email"
                />
              </div>
            </div>

            <div className="modal-footer border-0">
              <button
                type="button"
                className="sec-btn rounded-2 px-4 py-2"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Property QR Code Modal */}
      <div
        className="modal fade"
        id="propertyQrModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4 text-center">
            <div className="modal-header border-0 mb-0 pb-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body mt-0">
              <h5 className="popup-title">
                QR code
              </h5>
              <p className="dashboard-routes-sub mb-3">
                Make sure there is a direct link or information that can be used by
                users when scanning the token, such as a link to the app's login
                page or a membership ID
              </p>
              <div className="d-flex justify-content-center">
                <div className="modal-badge d-flex gap-2 align-items-center justify-content-center p-2 rounded-2">
                  <span>AOSDI12LSD</span>
                  <img src="/assets/scan-barcode-2.svg" alt="" />
                </div>
              </div>
              <img
                src="/assets/qr-code-2.png"
                alt="QR Code"
                className="img-fluid"
                style={{ width: '250px' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Smart Lock Request Modal */}
      <div
        className="modal fade"
        id="smartLockModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content rounded-4">
            <div className="modal-header border-0">
              <h5 className="m-0 dashboard-title">
                Request a smart lock
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              {/* Determine the property */}
              <div className="mb-3">
                <label className="property-management-card-title mb-2">
                  Determine the property
                </label>
                <div className="position-relative">
                  {properties.length > 3 && (
                    <button 
                      className="property-scroll-btn property-scroll-left"
                      onClick={scrollLeft}
                      aria-label="Scroll left"
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                  )}
                  
                  <div 
                    className="property-scroll-container d-flex gap-3 pb-2"
                    ref={scrollContainerRef}
                  >
                    {properties.length > 0 ? (
                      properties.map((prop) => (
                        <div 
                          key={prop.id} 
                          className="property-card-wrapper"
                          ref={(el) => {
                            if (el) propertyCardsRef.current[prop.id] = el;
                          }}
                        >
                          <div 
                            className={`calendar-card w-100 h-100 ${selectedProperty?.id === prop.id ? 'active' : ''}`} 
                            style={{ cursor: 'pointer' }}
                            onClick={() => handlePropertySelect(prop)}
                          >
                            <div className="d-flex w-100 align-items-center gap-2">
                              <img 
                                src={prop.image} 
                                className='property-management-card-img-2' 
                                alt={prop.name}
                                onError={(e) => {
                                  e.target.src = '/assets/property-management-card-img.png';
                                }}
                              />
                              <div className='d-flex flex-column gap-2 align-items-start'>
                                <div className='villa-badge py-1 px-3 rounded-pill'>
                                  {prop.property_type_id?.name || 'Property'}
                                </div>
                                <div className="d-flex align-items-center">
                                  <img src="/assets/location.svg" className='img-fluid' alt="location" />
                                  <p className="property-management-card-address m-0">{prop.address || 'N/A'}</p>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex gap-1 align-items-center flex-wrap w-100 py-1 rounded-1 mt-2">
                              <div className="d-flex align-items-center gap-1">
                                <img src="/assets/property-card-icon-1.svg" className='img-fluid' alt="floors" />
                                <h6 className="property-management-card-icon-label m-0">{prop.floor || 0} floors</h6>
                              </div>
                              <div className='card-border-right'>|</div>
                              <div className="d-flex align-items-center gap-1">
                                <img src="/assets/property-card-icon-2.svg" className='img-fluid' alt="rooms" />
                                <h6 className="property-management-card-icon-label m-0">{prop.number_room || 0} rooms</h6>
                              </div>
                              <div className='card-border-right'>|</div>
                              <div className="d-flex align-items-center gap-1">
                                <img src="/assets/property-card-icon-3.svg" className='img-fluid' alt="area" />
                                <h6 className="property-management-card-icon-label m-0">{prop.area || 0} m</h6>
                              </div>
                              <div className='card-border-right'>|</div>
                              <div className="d-flex align-items-center gap-1">
                                <img src="/assets/property-card-icon-4.svg" className='img-fluid' alt="bathrooms" />
                                <h6 className="property-management-card-icon-label m-0">{prop.number_bathroom || 0} bathrooms</h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-12 text-center py-4">
                        <p className="text-muted">No properties available. Please add a property first.</p>
                      </div>
                    )}
                  </div>
                  
                  {properties.length > 3 && (
                    <button 
                      className="property-scroll-btn property-scroll-right"
                      onClick={scrollRight}
                      aria-label="Scroll right"
                    >
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  )}
                </div>
              </div>

              {/* Date */}
              <div className="mb-3">
                <label className="property-management-card-title mb-2">Date</label>
                <input
                  type="date"
                  className="form-control rounded-2 py-2"
                  name="date"
                  value={lockRequestData.date}
                  onChange={handleInputChange}
                />
              </div>

              {/* Time From and Time To */}
              <div className="mb-3">
                <div className="row g-2">
                  <div className="col-md-6">
                    <label className="property-management-card-title mb-2">Time From</label>
                    <input
                      type="time"
                      className="form-control rounded-2 py-2"
                      name="time_from"
                      value={lockRequestData.time_from}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="property-management-card-title mb-2">Time To</label>
                    <input
                      type="time"
                      className="form-control rounded-2 py-2"
                      name="time_to"
                      value={lockRequestData.time_to}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>


              {/* Total cost */}
              <div className="mb-3">
                <label className="property-management-card-title mb-2">Total cost</label>
                <div className='hours-badge-2 d-flex py-2 px-3 rounded-3 align-items-center justify-content-center'>
                  <h2 className='m-0'>{risePrice} $</h2>
                </div>
              </div>

              {/* Payment method */}
              <div className="mb-3">
                <label className="property-management-card-title mb-2">Payment method</label>
                <div className="payment-methods d-flex gap-2 align-items-center">
                  <div 
                    className={`payment-method-card p-2 rounded-2 ${selectedPaymentMethod === 'card1' ? 'active' : ''}`}
                    onClick={() => handlePaymentMethodClick('card1')}
                  >
                    <img src="/assets/payment-card-img-1.png" className='img-fluid w-100' alt="payment" />
                  </div>
                  <div 
                    className={`payment-method-card p-2 rounded-2 ${selectedPaymentMethod === 'card2' ? 'active' : ''}`}
                    onClick={() => handlePaymentMethodClick('card2')}
                  >
                    <img src="/assets/payment-card-img-2.png" className='img-fluid w-100' alt="payment" />
                  </div>
                  <div 
                    className={`payment-method-card p-2 rounded-2 ${selectedPaymentMethod === 'card3' ? 'active' : ''}`}
                    onClick={() => handlePaymentMethodClick('card3')}
                  >
                    <img src="/assets/payment-card-img-3.svg" className='img-fluid w-100' alt="payment" />
                  </div>
                  <div 
                    className={`payment-method-card p-2 rounded-2 ${selectedPaymentMethod === 'card4' ? 'active' : ''}`}
                    onClick={() => handlePaymentMethodClick('card4')}
                  >
                    <img src="/assets/payment-card-img-4.svg" className='img-fluid w-100' alt="payment" />
                  </div>
                </div>
              </div>

              {/* Card number */}
              <div className="mb-3">
                <label className="property-management-card-title mb-2">Card number</label>
                <div className="input-with-icon">
                  <img src="/assets/pay-card-icon-1.svg" className="input-icon" alt="" />
                  <input
                    type="text"
                    className="form-control rounded-2 py-2 px-3 ps-5 w-100"
                    name="card_number"
                    value={lockRequestData.card_number}
                    onChange={handleInputChange}
                    placeholder="1234 5678 4321 5678"
                  />
                </div>
              </div>

              {/* Completion date and CVV */}
              <div className="row g-2 mb-3">
                <div className="col-6">
                  <label className="property-management-card-title mb-2">Completion date</label>
                  <div className="input-with-icon">
                    <img src="/assets/pay-card-icon-2.svg" className="input-icon" alt="" />
                    <input
                      type="text"
                      className="form-control rounded-2 py-2 px-3 ps-5 w-100"
                      name="expiry_date"
                      value={lockRequestData.expiry_date}
                      onChange={handleInputChange}
                      placeholder="12/28"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <label className="property-management-card-title mb-2">Code</label>
                  <div className="input-with-icon">
                    <img src="/assets/pay-card-icon-3.svg" className="input-icon" alt="" />
                    <input
                      type="text"
                      className="form-control rounded-2 py-2 px-3 ps-5 w-100"
                      name="cvv"
                      value={lockRequestData.cvv}
                      onChange={handleInputChange}
                      placeholder="CVV"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer border-0">
              <button
                type="button"
                className="sec-btn rounded-2 px-4 py-2"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .property-scroll-container {
          overflow-x: auto;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: #ccc #f1f1f1;
        }
        
        .property-scroll-container::-webkit-scrollbar {
          height: 8px;
        }
        
        .property-scroll-container::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .property-scroll-container::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 10px;
        }
        
        .property-scroll-container::-webkit-scrollbar-thumb:hover {
          background: #999;
        }
        
        .property-card-wrapper {
          min-width: 350px;
          max-width: 350px;
          margin:10px 0;
          flex-shrink: 0;
        }
        
        .property-scroll-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: white;
          border: 1px solid #ddd;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .property-scroll-btn:hover {
          background: #f8f9fa;
        }
        
        .property-scroll-left {
          left: 0px;
        }
        
        .property-scroll-right {
          right: 0px;
        }

        .payment-method-card {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        
        .input-with-icon {
          position: relative;
        }
        
        .input-icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
        }

        @media (max-width: 768px) {
          .property-card-wrapper {
            min-width: 280px;
            max-width: 280px;
          }
          
          .property-scroll-btn {
            width: 35px;
            height: 35px;
          }
          
          .property-scroll-left {
            left: -10px;
          }
          
          .property-scroll-right {
            right: -10px;
          }
        }
      `}</style>
    </section>
  );
};

export default DashboardSmartCheckMain;
