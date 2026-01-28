import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons';
import { Person, Settings, Logout } from '@mui/icons-material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Link } from 'react-router-dom';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import { getTeam, getTeamMemberDetails } from '../../api/superviserTeamApi';
import { useSelector } from 'react-redux';

const DashboardTeamWorkMain = ({ onMobileMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { token: accessToken } = useSelector((state) => state.auth);
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch team data
  useEffect(() => {
    const fetchTeam = async () => {
      if (!accessToken) return;
      try {
        setLoading(true);
        const response = await getTeam(accessToken);
        if (response.status === 1 && response.data?.[0]?.items) {
          setTeamData(response.data[0].items);
        }
      } catch (error) {
        console.error('Failed to fetch team:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, [accessToken]);

  const handleViewProfile = async (id) => {
    try {
      const response = await getTeamMemberDetails(accessToken, id);
      if (response.status === 1 && response.data) {
        setSelectedMember(response.data);
        setShowModal(true);
      }
    } catch (error) {
      console.error('Failed to fetch member details:', error);
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
            <h2 className="mb-0 dashboard-title">Work team</h2>
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
        <div className="d-flex justify-content-between align-items-center">
        <div className="search-input-wrapper mb-3 mt-2">
          <SearchOutlinedIcon className="search-icon" />
          <input
            type="text"
            className="search-gray-input form-control"
            placeholder="Search for a worker"
          />
        </div>
          <div className="d-flex gap-2 align-items-center flex-wrap">
            <Link to='/provider/team-work-requests' className='text-decoration-none'>
                      <button
  className="main-btn rounded-2 px-4 d-flex gap-1 align-items-center py-2 w-50-100"
  data-bs-toggle="modal"
  data-bs-target="#tempAccessModal"
>
 Team  requests
 <span className='requests-badge'>5</span>
                        </button>
            </Link>
            <Link to='/provider/team-work-add-employee' className='text-decoration-none'>
                      <button 
            type="submit" 
            className="sec-btn rounded-2 py-2 px-3 d-flex align-items-center justify-content-center gap-2 w-50-100"
          >
            <span>Add an employee</span>
                        </button>
            </Link>
          </div>


        </div>
        <div className="row">
          {loading ? (
            <div className="col-12 text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : teamData.length > 0 ? (
            teamData.map((item) => (
              <div className="col-lg-3 col-md-6 mb-3" key={item.id}>
                <div className="bg-light-gray p-1 rounded-3 h-100" onClick={() => handleViewProfile(item.id)} style={{cursor: 'pointer'}}>
                  <img src={item.user?.avatar || "/assets/team-img.png"} className='img-fluid w-100 team-img' alt="service" />
                  <h2 className="mb-0 dashboard-title py-2 ps-1">{item.first_name} {item.last_name}</h2>
                  <div className="d-flex align-items-center gap-1">
                    <img src="/assets/flag-2.svg" className='flag-icon' alt="flag" />
                    <h3 className='training-details-card-desc m-0'>{item.company || 'Team Member'}</h3>
                  </div>
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <button
                      className="main-btn rounded-2 px-2 d-flex gap-1 align-items-center justify-content-center py-2 mt-2 flex-grow-1"
                      onClick={(e) => { e.stopPropagation(); handleViewProfile(item.id); }}
                    >
                      <img src="/assets/user-icon.svg" className='flag-icon' alt="user" />
                      Profile
                    </button>
                    <button
                      className="main-btn rounded-2 px-2 d-flex gap-1 align-items-center justify-content-center py-2 mt-2 flex-grow-1"
                    >
                      <img src="/assets/calendar-tick.svg" className='flag-icon' alt="user" />
                      Availability
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">No team members found</div>
          )}
        </div>

        {/* Profile Modal */}
        {showModal && selectedMember && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => setShowModal(false)}>
            <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Team Member Profile</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="text-center mb-3">
                    <img src={selectedMember.user?.avatar || "/assets/user.png"} alt="Avatar" className="rounded-circle" style={{width: '100px', height: '100px', objectFit: 'cover'}} />
                    <h4 className="mt-2">{selectedMember.first_name} {selectedMember.last_name}</h4>
                  </div>
                  <div className="row g-3">
                    <div className="col-md-6"><p><strong>Email:</strong> {selectedMember.email}</p></div>
                    <div className="col-md-6"><p><strong>Phone:</strong> {selectedMember.phone}</p></div>
                    {selectedMember.address && <div className="col-12"><p><strong>Address:</strong> {selectedMember.address}</p></div>}
                    {selectedMember.company && <div className="col-md-6"><p><strong>Company:</strong> {selectedMember.company}</p></div>}
                    <div className="col-md-6"><p><strong>Experience:</strong> {selectedMember.experience} Years</p></div>
                    <div className="col-md-6"><p><strong>Start Date:</strong> {selectedMember.start_date}</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DashboardTeamWorkMain;