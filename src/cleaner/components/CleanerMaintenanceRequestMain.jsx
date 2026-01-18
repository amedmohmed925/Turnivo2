import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Person, Settings, Logout } from '@mui/icons-material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Link } from 'react-router-dom';

const CleanerMaintenanceRequestMain = ({ onMobileMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(4); // Fixed total pages like in DashboardPropertyManagementMain
  const itemsPerPage = 6; // Number of items to show per page
  
  // Add state to track selected order filter
  const [selectedOrderFilter, setSelectedOrderFilter] = useState('new');
  
  // Sample data for materials with more dynamic fields
  const materialsData = [
    {
      id: 1,
      title: "Upholstery and carpet cleaning",
      subtitle: "Upholstery and carpet cleaning",
      date: "June 12, 2026",
      time: "8:00 pm - 10:00 pm",
      price: "250 SAR",
      location: "Riyadh, Al Narjis Neighborhood",
      platform: "airbnb",
      platformIcon: "/assets/bnb.svg",
      status: "new",
      image: "/assets/problem-img-2.png"
    },
    {
      id: 2,
      title: "Deep cleaning services",
      subtitle: "Upholstery and carpet cleaning",
      date: "June 13, 2026",
      time: "10:00 am - 12:00 pm",
      price: "180 SAR",
      location: "Jeddah, Al Balad District",
      platform: "booking",
      platformIcon: "/assets/booking.svg",
      status: "in-progress",
      image: "/assets/problem-img-2.png"
    },
    {
      id: 3,
      title: "Window and glass cleaning",
      subtitle: "Upholstery and carpet cleaning",
      date: "June 10, 2026",
      time: "2:00 pm - 4:00 pm",
      price: "120 SAR",
      location: "Dammam, Al Corniche",
      platform: "airbnb",
      platformIcon: "/assets/bnb.svg",
      status: "finished",
      image: "/assets/problem-img-2.png"
    },
    {
      id: 4,
      title: "Kitchen and bathroom cleaning",
      subtitle: "Upholstery and carpet cleaning",
      date: "June 8, 2026",
      time: "9:00 am - 11:00 am",
      price: "150 SAR",
      location: "Khobar, Al Dhabab Street",
      platform: "booking",
      platformIcon: "/assets/booking.svg",
      status: "reported", // Changed from "canceled" to "reported"
      image: "/assets/problem-img-2.png"
    },
    {
      id: 5,
      title: "Complete house cleaning",
      subtitle: "Upholstery and carpet cleaning",
      date: "June 14, 2026",
      time: "1:00 pm - 5:00 pm",
      price: "300 SAR",
      location: "Riyadh, Al Muruj District",
      platform: "airbnb",
      platformIcon: "/assets/bnb.svg",
      status: "new",
      image: "/assets/problem-img-2.png"
    },
    {
      id: 6,
      title: "Post-construction cleaning",
      subtitle: "Upholstery and carpet cleaning",
      date: "June 11, 2026",
      time: "11:00 am - 3:00 pm",
      price: "280 SAR",
      location: "Mecca, Al Aziziyah",
      platform: "booking",
      platformIcon: "/assets/booking.svg",
      status: "in-progress",
      image: "/assets/problem-img-2.png"
    },
    {
      id: 7,
      title: "Office cleaning service",
      subtitle: "Upholstery and carpet cleaning",
      date: "June 9, 2026",
      time: "3:00 pm - 6:00 pm",
      price: "200 SAR",
      location: "Riyadh, King Abdullah Financial District",
      platform: "airbnb",
      platformIcon: "/assets/bnb.svg",
      status: "finished",
      image: "/assets/problem-img-2.png"
    }
  ];
  
  // Filter materials based on selected filter
  const filteredMaterials = materialsData.filter(item => {
    if (selectedOrderFilter === 'new') return item.status === 'new';
    if (selectedOrderFilter === 'in-progress') return item.status === 'in-progress';
    if (selectedOrderFilter === 'finished') return item.status === 'finished';
    if (selectedOrderFilter === 'reported') return item.status === 'reported'; // Changed from 'canceled' to 'reported'
    return true; // Show all if no filter or unrecognized filter
  });
  
  // Calculate total pages based on filtered data
  useEffect(() => {
    const calculatedPages = Math.ceil(filteredMaterials.length / itemsPerPage);
    setTotalPages(calculatedPages);
    
    // Reset to first page if current page is beyond the new total pages
    if (currentPage > calculatedPages && calculatedPages > 0) {
      setCurrentPage(1);
    }
  }, [filteredMaterials.length, currentPage, itemsPerPage]);
  
  // Get current items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMaterials.slice(indexOfFirstItem, indexOfLastItem);

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
  
  // Function to handle page change - same as DashboardPropertyManagementMain
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Here you would typically fetch the data for the new page
    }
  };
  
  // Function to render pagination numbers - simplified to match DashboardPropertyManagementMain
  const renderPaginationNumbers = () => {
    const pages = [];
    // Render pages in descending order as shown in DashboardPropertyManagementMain
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
  
  // Function to handle order filter selection
  const handleOrderFilterClick = (filter) => {
    setSelectedOrderFilter(filter);
    setCurrentPage(1); // Reset to first page when changing filter
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
      case 'reported': // Changed from 'canceled' to 'reported'
        return <div className='canceled-badge px-2 p-1 rounded-2'>Canceled</div>;
      default:
        return null;
    }
  };
  
  // Function to render action buttons based on status
  const renderActionButtons = (status, itemId) => {
    switch(status) {
      case 'new':
        return (
            <div className="d-flex justify-content-between align-items-center gap-2 w-100 flex-wrap">
                <div className="d-flex gap-2">
                <button className="sec-btn rounded-2 px-md-4 py-2">
                    Submit the order
                </button>
                <button className="btn btn-outline-danger py-2">Reject order</button>
                </div>
                                      <button 
            type="submit" 
            className="sec-btn rounded-2 py-2 px-3 d-flex align-items-center justify-content-center gap-2 w-50-100"
          >
            <img src="/assets/key.svg" alt="key" />
            <span>smart key</span>
                        </button>
            </div>
        );
      case 'in-progress':
        return (
          <button className="btn btn-outline-danger py-2">Cancel order</button>
        );
      case 'finished':
        return (
            <div className='w-100'>
                <h6 className="property-problem-title mb-2">Rating</h6>
                <div className="rating-badge w-100">“Great and fast service! Booking was easy and the team is very professional. I will definitely order the service again!”</div>
            </div>
        ); // No buttons for finished orders
      case 'reported':
        return null;
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
            <h2 className="mb-0 dashboard-title">Maintenance Requests</h2>
          </div>
          <div className="d-flex justify-content-end gap-2 align-items-center">
            <div className="dashboard-lang-btn d-flex gap-1 align-items-center">
              <img src="/assets/global.svg" alt="notification" />
              <span>English</span>
            </div>
                        <Link to='/cleaner/shopping-cart' className="notification-icon-container">
                          <img src="/assets/shopping-cart.svg" alt="notification" />
                        </Link>
            <Link to='/cleaner/notifications' className="notification-icon-container">
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
        </div>
        <div className="row package-filter align-items-center py-2 px-0 m-0 mb-3">
          <div className="col-md-3">
            <button 
              className={`rounded-2 border-0 px-4 py-2 w-100 ${selectedOrderFilter === 'new' ? 'sec-btn' : 'package-filter-item'}`}
              onClick={() => handleOrderFilterClick('new')}
            >
              New orders
            </button>
          </div>
          <div className="col-md-3">
            <p 
              className={`text-center rounded-2 py-2 m-0 ${selectedOrderFilter === 'in-progress' ? 'sec-btn' : 'package-filter-item'}`}
              onClick={() => handleOrderFilterClick('in-progress')}
            >
              In progress orders
            </p>
          </div>
          <div className="col-md-3">
            <p 
              className={`text-center rounded-2 py-2 m-0 ${selectedOrderFilter === 'finished' ? 'sec-btn' : 'package-filter-item'}`}
              onClick={() => handleOrderFilterClick('finished')}
            >
              Finished orders
            </p>
          </div>
          <div className="col-md-3">
            <p 
              className={`text-center rounded-2 py-2 m-0 ${selectedOrderFilter === 'reported' ? 'sec-btn' : 'package-filter-item'}`}
              onClick={() => handleOrderFilterClick('reported')}
            >
              Canceled orders
            </p>
          </div>
        </div>
        
        {/* Show message if no orders match the filter */}
        {filteredMaterials.length === 0 ? (
          <div className="text-center mt-4 mb-4">
            <p className="text-muted">No orders found for the selected filter.</p>
          </div>
        ) : (
          <>
            {/* Render current page items */}
            {currentItems.map((item) => (
              <Link to='/cleaner/maintenance-details' key={item.id} className="d-flex text-decoration-none align-items-center justify-content-between p-3 gap-2 w-100 materials-cards rounded-4 mb-3">
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
                    <div className="d-flex mt-2 gap-2 align-items-center w-100">
                      {/* Replace hardcoded buttons with conditional rendering */}
                      {renderActionButtons(item.status, item.id)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            
            {/* Only show pagination if there are items */}
            {filteredMaterials.length > 0 && (
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

export default CleanerMaintenanceRequestMain;