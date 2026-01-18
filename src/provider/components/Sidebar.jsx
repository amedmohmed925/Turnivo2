import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ExpandMore,
  ExpandLess
} from '@mui/icons-material';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';

const Sidebar = ({ isMobileOpen = false, onMobileClose = () => {} }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('home');
  const [ratingDropdownOpen, setRatingDropdownOpen] = useState(false);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const [legalDropdownOpen, setLegalDropdownOpen] = useState(false);
  
  // Navigation hooks
  const navigate = useNavigate();
  const location = useLocation();

  // Function to determine active item based on current path
  const getActiveItemFromPath = (path) => {
    switch (path) {
      case '/provider/dashboard': return 'home';
      case '/provider/team-work':
      case '/provider/team-work-requests':
      case '/provider/team-work-add-employee': return 'team';
      case '/provider/smart-access':
      case '/provider/smart-lock-requests': return 'checkin';
      case '/provider/calendar':
      case '/provider/availability': return 'calendar';
      case '/provider/maintenance-request':
      case '/provider/maintenance-details':
      case '/provider/material-request':
      case '/provider/cleaning-request':
      case '/provider/cleaning-details': return 'service';
      case '/provider/guests-ratings':
      case '/provider/my-ratings': return 'ratings';
      case '/provider/training':
      case '/provider/training-details': return 'training';
      case '/provider/company-policies':
      case '/provider/work-agreement': return 'legal';
      case '/provider/report-problem': return 'report';
      default: return 'home';
    }
  };

  // Effect to update active item based on current route
  useEffect(() => {
    const active = getActiveItemFromPath(location.pathname);
    setActiveItem(active);

    // Open dropdown if navigating to a subitem page
    if (location.pathname.includes('maintenance') || 
        location.pathname.includes('material') || 
        location.pathname.includes('cleaning')) {
      setServiceDropdownOpen(true);
    } else if (location.pathname.includes('guest') || location.pathname.includes('my-ratings')) {
      setRatingDropdownOpen(true);
    } else if (location.pathname.includes('company-policies') || location.pathname.includes('work-agreement')) {
      setLegalDropdownOpen(true);
    }
  }, [location.pathname]);

  const toggleServiceDropdown = () => {
    // Close other dropdowns
    if (ratingDropdownOpen) {
      setRatingDropdownOpen(false);
    }
    if (legalDropdownOpen) {
      setLegalDropdownOpen(false);
    }
    setServiceDropdownOpen(!serviceDropdownOpen);
    // Always make it active when toggling
    if (!serviceDropdownOpen) {
      setActiveItem('service');
      // Navigate to the service management main page when opening the dropdown
      navigate('/provider/maintenance-request');
    }
  };

  const toggleRatingDropdown = () => {
    // Close other dropdowns
    if (serviceDropdownOpen) {
      setServiceDropdownOpen(false);
    }
    if (legalDropdownOpen) {
      setLegalDropdownOpen(false);
    }
    setRatingDropdownOpen(!ratingDropdownOpen);
    // Always make it active when toggling
    if (!ratingDropdownOpen) {
      setActiveItem('ratings');
      // Navigate to the ratings main page when opening the dropdown
      navigate('/provider/guests-ratings');
    }
  };
  
  const toggleLegalDropdown = () => {
    // Close other dropdowns
    if (serviceDropdownOpen) {
      setServiceDropdownOpen(false);
    }
    if (ratingDropdownOpen) {
      setRatingDropdownOpen(false);
    }
    setLegalDropdownOpen(!legalDropdownOpen);
    // Always make it active when toggling
    if (!legalDropdownOpen) {
      setActiveItem('legal');
      // Navigate to the legal main page when opening the dropdown
      navigate('/provider/company-policies');
    }
  };
  
  // Define routes for sidebar items - keeping your original structure
  const sidebarItems = [
    {
      id: 'home',
      label: 'Home',
      iconPath: "/assets/home-icon.svg",
      route: '/provider/dashboard'
    },

    {
      id: 'service',
      label: 'Service Management',
      iconPath: "/assets/service-icon.svg",
      hasDropdown: true,
      dropdownOpen: serviceDropdownOpen,
      onToggle: toggleServiceDropdown,
      route: '/provider/maintenance-request',
      subItems: [
        { id: 'maintenance-requests', label: 'Maintenance Requests', route: '/provider/maintenance-request' },
        { id: 'material-requests', label: 'Materials Requests', route: '/provider/material-request' },
        { id: 'cleaning-requests', label: 'Cleaning Requests', route: '/provider/cleaning-request' }
      ]
    },
    {
      id: 'team',
      label: 'Work team',
      iconPath: "/assets/team-icon.svg",
      route: '/provider/team-work'
    },
    {
      id: 'checkin',
      label: 'Smart Access',
      iconPath: "/assets/key-icon.svg",
      route: '/provider/smart-access'
    },
    {
      id: 'calendar',
      label: 'Calendar & Availability',
      iconPath: "/assets/calendar-icon.svg",
      route: '/provider/calendar'
    },
    {
      id: 'ratings',
      label: 'Ratings & Ratings',
      iconPath: "/assets/medal-icon.svg",
      hasDropdown: true,
      dropdownOpen: ratingDropdownOpen,
      onToggle: toggleRatingDropdown,
      route: '/provider/guests-ratings',
      subItems: [
        { id: 'guest-reviews', label: 'Guest Reviews', route: '/provider/guests-ratings' },
        { id: 'my-ratings', label: 'My Ratings', route: '/provider/my-ratings' },
      ]
    },
    {
      id: 'training',
      label: 'Training',
      iconPath: "/assets/cup-icon.svg",
      route: '/provider/training'
    },
    {
      id: 'legal',
      label: 'Legal & Contracts',
      iconPath: "/assets/legal-icon.svg",
      hasDropdown: true,
      dropdownOpen: legalDropdownOpen,
      onToggle: toggleLegalDropdown,
      route: '/provider/company-policies',
      subItems: [
        { id: 'work-agreement', label: 'Work Agreement', route: '/provider/work-agreement' },
        { id: 'company-policies', label: 'Company Policies', route: '/provider/company-policies' },
      ]
    },
    {
      id: 'report',
      label: 'Report a problem',
      iconPath: "/assets/report-icon.svg",
      route: '/provider/report-problem'
    }
  ];

  const bottomItems = [
    {
      id: 'user-profile',
      label: 'Omar Alrajhi',
      iconPath: "/assets/user.png",
      isUserProfile: true,
      route: '/provider/availability'
    },
    {
      id: 'settings',
      label: 'Settings',
      iconPath: "/assets/setting-icon.svg",
      route: '/provider/settings'
    },
    {
      id: 'logout',
      label: 'Logout',
      iconPath: "/assets/logout-icon.svg",
      route: '/login'
    },
    {
      id: 'back',
      label: 'Back to main',
      iconPath: "/assets/undo-icon.svg",
      route: '/'
    }
  ];

  // Set active item based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    
    // Check if any subitem matches the current path
    let foundActiveItem = null;
    
    // Check main items and subitems
    [...sidebarItems, ...bottomItems].forEach(item => {
      if (item.route === currentPath) {
        foundActiveItem = item.id;
      }
      
      // Check subitems
      if (item.subItems) {
        item.subItems.forEach(subItem => {
          if (subItem.route === currentPath) {
            foundActiveItem = item.id;
            // Open the corresponding dropdown
            if (item.id === 'service') {
              setServiceDropdownOpen(true);
            } else if (item.id === 'ratings') {
              setRatingDropdownOpen(true);
            } else if (item.id === 'legal') {
              setLegalDropdownOpen(true);
            }
          }
        });
      }
    });
    
    if (foundActiveItem) {
      setActiveItem(foundActiveItem);
    }
  }, [location.pathname]);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    // Close all dropdowns when collapsing
    if (!isCollapsed) {
      setRatingDropdownOpen(false);
      setServiceDropdownOpen(false);
      setLegalDropdownOpen(false);
    }
  };

  const handleItemClick = (item) => {
    // Close all dropdowns when clicking on a non-dropdown item
    setRatingDropdownOpen(false);
    setServiceDropdownOpen(false);
    setLegalDropdownOpen(false);
    setActiveItem(item.id);
    
    // Navigate to the item's route
    if (item.route) {
      navigate(item.route);
      // Close mobile menu if open
      if (isMobileOpen) {
        onMobileClose();
      }
    }
  };

  const handleSubItemClick = (subItem, parentItemId) => {
    // Set the parent item as active when clicking a subitem
    setActiveItem(parentItemId);
    
    // Navigate to the subitem's route
    if (subItem.route) {
      navigate(subItem.route);
      // Close mobile menu if open
      if (isMobileOpen) {
        onMobileClose();
      }
    }
  };

  // Helper function to get the correct icon based on active state
  const getIcon = (iconPath, isActive, isDropdownOpen = false, isFixedItem = false) => {
    // Fixed bottom items should not change icon on active state
    if (isFixedItem) {
      return iconPath;
    }
    // Item is active if it's the selected item OR if its dropdown is open
    const shouldBeActive = isActive || isDropdownOpen;
    if (shouldBeActive) {
      // Replace .svg with -active.svg
      return iconPath.replace('.svg', '-active.svg');
    }
    return iconPath;
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="sidebar-overlay"
          onClick={onMobileClose}
        />
      )}
      
      <div className={`sidebar ${isCollapsed ? 'collapsed' : 'expanded'} ${isMobileOpen ? 'mobile-open' : ''}`}>
        {/* Header with logo, title and menu icon */}
        <div className="sidebar-header">
          <button
            onClick={handleToggleCollapse}
            className="menu-toggle-btn"
          >
            <FormatListBulletedOutlinedIcon className='' />
          </button>
          <div className="logo-container">
            <img 
              src="/assets/logo.png" 
              alt="Logo" 
              height="40" 
            />
            <span className="sidebar-title">ONS</span>
          </div>
        </div>

        {/* Main content area with scroll */}
        <div className="sidebar-content">
          {/* Main navigation items */}
          {sidebarItems.map((item) => {
            // Check if item should be active (either selected or dropdown open)
            const isItemActive = activeItem === item.id || (item.hasDropdown && item.dropdownOpen);
            
            return (
              <div key={item.id}>
                <div
                  className={`side-item ${isItemActive ? 'active' : ''}`}
                  onClick={item.hasDropdown ? item.onToggle : () => handleItemClick(item)}
                >
                  <span className="side-icon">
                    <img 
                      src={getIcon(item.iconPath, activeItem === item.id, item.dropdownOpen, false)} 
                      alt={item.label}
                    />
                  </span>
                  <span className="side-label">{item.label}</span>
                  {item.hasDropdown && (
                    <span className={`dropdown-arrow ${item.dropdownOpen ? 'open' : ''}`}>
                      {item.dropdownOpen ? <ExpandLess /> : <ExpandMore />}
                    </span>
                  )}
                </div>
                
                {/* Dropdown subitems - only show when not collapsed */}
                {item.hasDropdown && item.dropdownOpen && !isCollapsed && (
                  <div className="dropdown-container">
                    {item.subItems.map((subItem) => (
                      <div
                        key={subItem.id}
                        className="subitem"
                        onClick={() => handleSubItemClick(subItem, item.id)}
                      >
                        {subItem.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom fixed items */}
        <div className="sidebar-bottom">
          {bottomItems.map((item) => (
            <div
              key={item.id}
              className={`side-item ${activeItem === item.id ? 'active' : ''} ${item.isUserProfile ? 'user-profile-item' : ''}`}
              onClick={() => handleItemClick(item)}
            >
              <span className="side-icon">
                {item.isUserProfile ? (
                  <img 
                    src={item.iconPath} 
                    alt={item.label}
                    className="user-avatar"
                  />
                ) : (
                  <img 
                    src={getIcon(item.iconPath, activeItem === item.id, false, true)} 
                    alt={item.label}
                  />
                )}
              </span>
              <span className="side-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;