import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Person, Settings, Logout } from '@mui/icons-material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Link } from 'react-router-dom';

const DashboardPropertyManagementMain = ({ onMobileMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 4; // Show 4 cards per page
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample property data
  const [propertiesData] = useState([
    {
      id: 1,
      title: "Guest House Riyadh",
      type: "Villa",
      location: "Riyadh, Saudi Arabia, Al Nakheel Street",
      floors: 3,
      rooms: 7,
      area: 300,
      bathrooms: 4,
      image: "../assets/property-management-card-img.png"
    },
    {
      id: 2,
      title: "Beach Villa Jeddah",
      type: "Villa",
      location: "Jeddah, Saudi Arabia, Corniche Road",
      floors: 2,
      rooms: 5,
      area: 250,
      bathrooms: 3,
      image: "../assets/property-management-card-img.png"
    },
    {
      id: 3,
      title: "Mountain Retreat Abha",
      type: "Apartment",
      location: "Abha, Saudi Arabia, Mountain View Street",
      floors: 1,
      rooms: 3,
      area: 120,
      bathrooms: 2,
      image: "../assets/property-management-card-img.png"
    },
    {
      id: 4,
      title: "Desert Camp Riyadh",
      type: "House",
      location: "Riyadh, Saudi Arabia, Desert Highway",
      floors: 1,
      rooms: 4,
      area: 180,
      bathrooms: 2,
      image: "../assets/property-management-card-img.png"
    },
    {
      id: 5,
      title: "City Center Apartment",
      type: "Apartment",
      location: "Dammam, Saudi Arabia, King Fahd Road",
      floors: 1,
      rooms: 2,
      area: 90,
      bathrooms: 1,
      image: "../assets/property-management-card-img.png"
    },
    {
      id: 6,
      title: "Luxury Penthouse",
      type: "Apartment",
      location: "Khobar, Saudi Arabia, Corniche Tower",
      floors: 1,
      rooms: 4,
      area: 220,
      bathrooms: 3,
      image: "../assets/property-management-card-img.png"
    },
    {
      id: 7,
      title: "Garden Villa",
      type: "Villa",
      location: "Riyadh, Saudi Arabia, Garden District",
      floors: 2,
      rooms: 6,
      area: 280,
      bathrooms: 3,
      image: "../assets/property-management-card-img.png"
    },
    {
      id: 8,
      title: "Cozy Studio",
      type: "Apartment",
      location: "Jeddah, Saudi Arabia, Downtown",
      floors: 1,
      rooms: 1,
      area: 60,
      bathrooms: 1,
      image: "../assets/property-management-card-img.png"
    }
  ]);
  
  // Filter properties based on search query
  const filteredProperties = propertiesData.filter(property => 
    property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    property.type.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Calculate total pages based on filtered properties
  useEffect(() => {
    const calculatedPages = Math.ceil(filteredProperties.length / itemsPerPage);
    setTotalPages(calculatedPages);
    
    // Reset to first page if current page is beyond the new total pages
    if (currentPage > calculatedPages && calculatedPages > 0) {
      setCurrentPage(1);
    }
  }, [filteredProperties.length, currentPage]);
  
  // Get current items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProperties.slice(indexOfFirstItem, indexOfLastItem);

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
    setCurrentPage(1); // Reset to first page when searching
  };

  // Pagination functions
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Here you would typically fetch the data for the new page
    }
  };

  const renderPaginationNumbers = () => {
    const pages = [];
    // Render pages in descending order as shown in the image
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
              <img src="../assets/global.svg" alt="notification" />
              <span>English</span>
            </div>
            <Link to='/client/notifications' className="notification-icon-container">
              <img src="../assets/notification.svg" alt="notification" />
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
                  src="../assets/user.png" 
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
                    <img src="../assets/user-square.svg" alt="settings" />
                    <span>Profile</span>
                  </div>
                  <div 
                    className="dropdown-item d-flex gap-2 align-items-center"
                    onClick={() => handleDropdownItemClick('settings')}
                  >
                    <img src="../assets/setting-icon.svg" alt="settings" />
                    <span>Settings</span>
                  </div>
                  <div 
                    className="dropdown-item d-flex gap-2 align-items-center"
                    onClick={() => handleDropdownItemClick('logout')}
                  >
                    <img src="../assets/logout-icon.svg" alt="settings" />
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
        
        {/* Show message if no properties match the search */}
        {filteredProperties.length === 0 ? (
          <div className="text-center mt-4 mb-4">
            <p className="text-muted">No properties found matching your search.</p>
          </div>
        ) : (
          <div className="row">
            {/* Render current page items dynamically */}
            {currentItems.map((property) => (
              <div className="col-12" key={property.id}>
                <div className="property-management-card mt-3 w-100">
                  <div className="d-flex align-items-start flex-column flex-md-row gap-3 w-100">
                    <img src={property.image} className='property-management-card-img' alt="Property" />
                    <div className="d-flex flex-column align-items-start gap-2 w-100">
                      <div className="d-flex justify-content-between w-100 align-items-center">
                        <h6 className="property-management-card-title m-0">{property.title}</h6>
                        <div className={`${property.type.toLowerCase()}-badge py-1 px-3 rounded-pill`}>{property.type}</div>
                      </div>
                      <div className="d-flex align-items-center">
                        <img src="../assets/location.svg" className='img-fluid' alt="location" />
                        <p className="property-management-card-address m-0">{property.location}</p>
                      </div>
                      <div className="d-flex gap-3 align-items-center flex-wrap">
                        <div className="d-flex align-items-center gap-1">
                          <img src="../assets/property-card-icon-1.svg" className='img-fluid' alt="location" />
                          <h6 className="property-management-card-icon-label m-0">{property.floors} floors</h6>
                        </div>
                        <div className='card-border-right'>|</div>
                        <div className="d-flex align-items-center gap-1">
                          <img src="../assets/property-card-icon-2.svg" className='img-fluid' alt="location" />
                          <h6 className="property-management-card-icon-label m-0">{property.rooms} rooms</h6>
                        </div>
                        <div className='card-border-right'>|</div>
                        <div className="d-flex align-items-center gap-1">
                          <img src="../assets/property-card-icon-3.svg" className='img-fluid' alt="location" />
                          <h6 className="property-management-card-icon-label m-0">{property.area} m</h6>
                        </div>
                        <div className='card-border-right'>|</div>
                        <div className="d-flex align-items-center gap-1">
                          <img src="../assets/property-card-icon-4.svg" className='img-fluid' alt="location" />
                          <h6 className="property-management-card-icon-label m-0">{property.bathrooms} bathrooms</h6>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 w-100">
                        <Link to='/client/calendar' className="third-btn d-flex align-items-center justify-content-center gap-1 w-50-100 text-decoration-none">
                          <img src="../assets/calendar-icon-2.svg" alt="calendar" />
                          <span className="mb-0">Calendar</span>
                        </Link>
                        <div className="d-flex gap-2 align-items-center flex-wrap">
                          <Link className="sec-btn-outline text-center rounded-2 px-4 py-2 text-decoration-none w-50-100" to="/client/property-details">
                            Details
                          </Link>
                          <Link to='/client/cleaning-request' className="sec-btn rounded-2 px-4 py-2 text-decoration-none w-50-100">
                            Request cleaning service
                          </Link>
                          <Link to='/client/maintenance' className="main-btn rounded-2 px-3 py-2 text-decoration-none w-50-100">
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
        
        {/* Only show pagination if there are properties */}
        {filteredProperties.length > 0 && (
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