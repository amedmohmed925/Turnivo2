import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Person, Settings, Logout } from '@mui/icons-material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Link } from 'react-router-dom';

const DashboardMaterialRequestMain = ({ onMobileMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(4); // Fixed total pages like in DashboardPropertyManagementMain
  const itemsPerPage = 6; // Number of items to show per page
  
  // Sample data for materials
  const materialsData = [
    {
      id: 1,
      title: "Cleaning the surface2",
      date: "June 12, 2026",
      time: "8:00 pm - 10:00 pm",
      price: "$50",
      image: "../assets/problem-img-2.png"
    },
    {
      id: 2,
      title: "Cleaning the surface",
      date: "June 12, 2026",
      time: "8:00 pm - 10:00 pm",
      price: "$50",
      image: "../assets/problem-img-2.png"
    },
    {
      id: 3,
      title: "Cleaning the surface",
      date: "June 12, 2026",
      time: "8:00 pm - 10:00 pm",
      price: "$50",
      image: "../assets/problem-img-2.png"
    },
    {
      id: 4,
      title: "Cleaning the surface",
      date: "June 12, 2026",
      time: "8:00 pm - 10:00 pm",
      price: "$50",
      image: "../assets/problem-img-2.png"
    },
    {
      id: 5,
      title: "Cleaning the surface",
      date: "June 12, 2026",
      time: "8:00 pm - 10:00 pm",
      price: "$50",
      image: "../assets/problem-img-2.png"
    },
    {
      id: 6,
      title: "Cleaning the surface",
      date: "June 12, 2026",
      time: "8:00 pm - 10:00 pm",
      price: "$50",
      image: "../assets/problem-img-2.png"
    },
    {
      id: 7,
      title: "Cleaning the surface",
      date: "June 12, 2026",
      time: "8:00 pm - 10:00 pm",
      price: "$50",
      image: "../assets/problem-img-2.png"
    }
  ];
  
  // Calculate total pages based on data
  useEffect(() => {
    const calculatedPages = Math.ceil(materialsData.length / itemsPerPage);
    setTotalPages(calculatedPages);
  }, [materialsData.length, itemsPerPage]);
  
  // Get current items for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = materialsData.slice(indexOfFirstItem, indexOfLastItem);

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
            <h2 className="mb-0 dashboard-title">Additional Services</h2>
          </div>
          <div className="d-flex justify-content-end gap-2 align-items-center">
            <div className="dashboard-lang-btn d-flex gap-1 align-items-center">
              <img src="../assets/global.svg" alt="notification" />
              <span>English</span>
            </div>
            <Link to='/provider/notifications' className="notification-icon-container">
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
        <div className="d-flex gap-2 align-items-center mt-3">
            <h6 className="dashboard-routes-sub m-0">materials  request</h6>
                                    <div className="search-input-wrapper">
            <SearchOutlinedIcon className="search-icon" />
            <input
              type="text"
              className="search-gray-input form-control"
              placeholder="Search"
            />
          </div>
        </div>
        
            <div className="row mt-3 w-100 g-0 g-lg-2">
        <h6 className="property-management-card-title mb-1">materials </h6>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the garage</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the pool</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the pool</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the pool</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the surface</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the garage</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the pool</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the pool</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the pool</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the surface</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the garage</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the pool</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the pool</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the pool</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100 active">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the surface</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the garage</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the pool</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100 active">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the pool</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the pool</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 mb-3 col-20-per">
                <div className="bg-light-gray p-3 rounded-3 h-100">
                  <img src="../assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the surface</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end align-items-center mb-3 gap-2">
                <button className="sec-btn rounded-2 px-5 py-2">
                  Order
                </button>
              </div>
            </div>
      </div>

    </section>
  );
};

export default DashboardMaterialRequestMain;