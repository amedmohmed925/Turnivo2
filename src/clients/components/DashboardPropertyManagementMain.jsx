import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Person, Settings, Logout } from '@mui/icons-material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getProperties } from '../../api/propertyApi';

const DashboardPropertyManagementMain = ({ onMobileMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Properties data from API
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
          Swal.fire({
            icon: 'error',
            title: 'Authentication Required',
            text: 'Please login to continue',
          });
          return;
        }

        const response = await getProperties(accessToken, currentPage);
        
        if (response.status === 1 && response.data && response.data.length > 0) {
          const data = response.data[0];
          setProperties(data.items || []);
          
          // Set pagination metadata
          if (data._meta) {
            setTotalPages(data._meta.NumberOfPage || 1);
            setTotalCount(data._meta.totalCount || 0);
          }
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
        setError(error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load properties. Please try again.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [currentPage]);

  // Filter properties based on search query (client-side filtering)
  const filteredProperties = properties.filter(property => 
    property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.property_type_id.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Pagination functions
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPaginationNumbers = () => {
    const pages = [];
    // Render pages in descending order as shown in the original
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
            <h2 className="mb-0 dashboard-title">Property management</h2>
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
        <h6 className="dashboard-home-desc m-0">Property Management</h6>
        <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
          <div className="search-input-wrapper mt-2">
            <SearchOutlinedIcon className="search-icon" />
            <input
              type="text"
              className="search-gray-input form-control"
              placeholder="Find a property..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <Link to='/client/create-property' 
            type="submit" 
            className="sec-btn rounded-2 py-2 px-3 d-flex align-items-center gap-1 text-decoration-none"
          >
            <AddCircleOutlinedIcon className='fs-6' style={{ color: '#FFD9C2' }} />
            <span>Create Property</span>
          </Link>
        </div>
        
        {/* Loading state */}
        {isLoading ? (
          <div className="text-center mt-4 mb-4">
            <p className="text-muted">Loading properties...</p>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center mt-4 mb-4">
            <p className="text-muted">
              {searchQuery ? 'No properties found matching your search.' : 'No properties found.'}
            </p>
          </div>
        ) : (
          <div className="row">
            {/* Render properties dynamically */}
            {filteredProperties.map((property) => (
              <div className="col-12" key={property.id}>
                <div className="property-management-card mt-3 w-100">
                  <div className="d-flex align-items-start flex-column flex-md-row gap-3 w-100">
                    <img 
                      src={property.image} 
                      className='property-management-card-img' 
                      alt={property.name}
                      onError={(e) => {
                        e.target.src = '/assets/property-management-card-img.png';
                      }}
                    />
                    <div className="d-flex flex-column align-items-start gap-2 w-100">
                      <div className="d-flex justify-content-between w-100 align-items-center">
                        <h6 className="property-management-card-title m-0">{property.name}</h6>
                        <div className={`villa-badge py-1 px-3 rounded-pill`}>
                          {property.property_type_id.name}
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <img src="/assets/location.svg" className='img-fluid' alt="location" />
                        <p className="property-management-card-address m-0">{property.address}</p>
                      </div>
                      <div className="d-flex gap-3 align-items-center flex-wrap">
                        <div className="d-flex align-items-center gap-1">
                          <img src="/assets/property-card-icon-1.svg" className='img-fluid' alt="floors" />
                          <h6 className="property-management-card-icon-label m-0">{property.floor} floors</h6>
                        </div>
                        <div className='card-border-right'>|</div>
                        <div className="d-flex align-items-center gap-1">
                          <img src="/assets/property-card-icon-2.svg" className='img-fluid' alt="rooms" />
                          <h6 className="property-management-card-icon-label m-0">{property.number_room} rooms</h6>
                        </div>
                        <div className='card-border-right'>|</div>
                        <div className="d-flex align-items-center gap-1">
                          <img src="/assets/property-card-icon-3.svg" className='img-fluid' alt="area" />
                          <h6 className="property-management-card-icon-label m-0">{property.area} m</h6>
                        </div>
                        <div className='card-border-right'>|</div>
                        <div className="d-flex align-items-center gap-1">
                          <img src="/assets/property-card-icon-4.svg" className='img-fluid' alt="bathrooms" />
                          <h6 className="property-management-card-icon-label m-0">{property.number_bathroom} bathrooms</h6>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 w-100">
                        <Link to={`/client/calendar?propertyId=${property.id}`} className="third-btn d-flex align-items-center justify-content-center gap-1 w-50-100 text-decoration-none">
                          <img src="/assets/calendar-icon-2.svg" alt="calendar" />
                          <span className="mb-0">Calendar</span>
                        </Link>
                        <div className="d-flex gap-2 align-items-center flex-wrap">
                          <Link className="sec-btn-outline text-center rounded-2 px-4 py-2 text-decoration-none w-50-100" to={`/client/property-details/${property.id}`}>
                            Details
                          </Link>
                          <Link to={`/client/cleaning-request?propertyId=${property.id}`} className="sec-btn rounded-2 px-4 py-2 text-decoration-none w-50-100">
                            Request cleaning service
                          </Link>
                          <Link to={`/client/maintenance?propertyId=${property.id}`} className="main-btn rounded-2 px-3 py-2 text-decoration-none w-50-100">
                            Request maintenance service
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Only show pagination if there are properties and not searching */}
        {!isLoading && properties.length > 0 && !searchQuery && totalPages > 1 && (
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
      </div>
    </section>
  );
};

export default DashboardPropertyManagementMain;