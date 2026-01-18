import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons';
import { Person, Settings, Logout } from '@mui/icons-material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Link } from 'react-router-dom';

const CleanerShoppingCartMain = ({ onMobileMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Sample data for materials
  const materialsData = [
    {
      id: 1,
      title: "Liquid soap2",
      image: "/assets/problem-img-2.png"
    },
    {
      id: 2,
      title: "Liquid soap",
      image: "/assets/problem-img-2.png"
    },
    {
      id: 3,
      title: "Liquid soap",
      image: "/assets/problem-img-2.png"
    },
    {
      id: 4,
      title: "Liquid soap",
      image: "/assets/problem-img-2.png"
    },
    {
      id: 5,
      title: "Liquid soap",
      image: "/assets/problem-img-2.png"
    },
    {
      id: 6,
      title: "Liquid soap",
      image: "/assets/problem-img-2.png"
    },
    {
      id: 7,
      title: "Liquid soap",
      image: "/assets/problem-img-2.png"
    }
  ];

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
            <h2 className="mb-0 dashboard-title">My Basket</h2>
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
        <h6 className="property-management-card-title mb-1 mt-3">Basket</h6>
        
        {/* Render all items without pagination */}
        {materialsData.map((item) => (
          <div key={item.id} className="d-flex align-items-center justify-content-between flex-wrap p-3 gap-3 w-100 materials-cards rounded-4 mb-3">
            <div className="d-flex align-items-center gap-2">
              <img src={item.image} className='img-fluid materials-img' alt="location" />   
              <div className='d-flex flex-column gap-2 align-items-start'>
                <h6 className="property-problem-title mb-0">{item.title}</h6>
                <img src="/assets/delete-icon.svg" alt="delete" />
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <h6 className='card-item-price m-0'>10 $</h6>
              <input type="number" className='form-control inp-num' />
              <h6 className='card-item-total-price m-0'>10 $</h6>
            </div>
          </div>
        ))}
        
        <div className="card-total-price">
          <h2 className="mb-3 dashboard-title">Details</h2>
          <div className="d-flex justify-content-between w-100 align-items-center pb-1 mb-3 border-bottom">
            <div className="card-total-price-label">Quantity</div>
            <h2 className="mb-0 dashboard-title">16</h2>
          </div>
          <div className="d-flex justify-content-between w-100 align-items-center pb-1 mb-3 border-bottom">
            <div className="card-total-price-label">Shipping</div>
            <h2 className="mb-0 dashboard-title">20$</h2>
          </div>
          <div className="d-flex justify-content-between w-100 align-items-center pb-1 border-bottom">
            <div className="card-total-price-label">Total</div>
            <h2 className="mb-0 dashboard-title">145 $</h2>
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-center my-3 gap-2">
          <button className="sec-btn rounded-2 px-5 py-2">
            Order
          </button>
        </div>
      </div>
    </section>
  );
};

export default CleanerShoppingCartMain;