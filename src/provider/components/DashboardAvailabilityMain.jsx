import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars, faUser, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import ProviderHeader from './ProviderHeader';
import { getUserProfile, updateUserProfile } from '../../api/authApi';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardAvailabilityMain = ({ onMobileMenuClick }) => {
  const { token: accessToken } = useSelector((state) => state.auth);
  
  // User profile state
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    mobile: '',
    city_id: ''
  });

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (!accessToken) return;
      try {
        setIsLoading(true);
        const response = await getUserProfile(accessToken);
        console.log('Profile Response:', response);
        
        if (response.status === 1 && response.data) {
          const profile = response.data[0] || response.data;
          setUserProfile(profile);
          setFormData({
            name: profile.name || '',
            last_name: profile.last_name || '',
            mobile: profile.mobile || '',
            city_id: profile.city_id?.id || profile.city_id || ''
          });
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        toast.error('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [accessToken]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      const response = await updateUserProfile(formData, accessToken);
      
      if (response.status === 1) {
        toast.success('Profile updated successfully!');
        setIsEditing(false);
        
        // Refresh profile data
        const updatedProfile = await getUserProfile(accessToken);
        if (updatedProfile.status === 1 && updatedProfile.data) {
          const profile = updatedProfile.data[0] || updatedProfile.data;
          setUserProfile(profile);
        }
      } else {
        toast.error(response.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original profile data
    if (userProfile) {
      setFormData({
        name: userProfile.name || '',
        last_name: userProfile.last_name || '',
        mobile: userProfile.mobile || '',
        city_id: userProfile.city_id?.id || userProfile.city_id || ''
      });
    }
  };

  return (
    <section>
      <ToastContainer />
      <ProviderHeader title="Calendar & Availability" onMobileMenuClick={onMobileMenuClick} />
      
      <div className="dashboard-home-content px-3 mt-2">
        <div className="d-flex flex-wrap flex-lg-nowrap gap-1 align-items-center my-3">
          <div className="row package-filter align-items-center py-2 px-0 m-0 w-100">
            <div className="col-md-6 col-12">
              <Link 
                to='/supervisor/calendar' 
                className="rounded-2 border-0 px-2 py-2 w-100 package-filter-item text-decoration-none d-block text-center"
              >
                Calendar
              </Link>
            </div>
            <div className="col-md-6 col-12">
              <button className="rounded-2 border-0 px-2 py-2 w-100 sec-btn">
                Profile
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="dashboard-routes-sub m-0">Profile Information</h6>
              {!isEditing ? (
                <button 
                  className="sec-btn rounded-2 px-4 py-2"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              ) : (
                <div className="d-flex gap-2">
                  <button 
                    className="edit-btn rounded-2 px-4 py-2"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button 
                    className="sec-btn rounded-2 px-4 py-2"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : 'Save'}
                  </button>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                {/* Avatar */}
                <div className="col-12 text-center mb-3">
                  <img 
                    src={userProfile?.avatar || '/assets/user.png'} 
                    alt="User Avatar" 
                    className="rounded-circle"
                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                  />
                </div>

                {/* First Name */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">First Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control rounded-2 py-2"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    required
                  />
                </div>

                {/* Last Name */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    className="form-control rounded-2 py-2"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    required
                  />
                </div>

                {/* Email (Read Only) */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">Email</label>
                  <input
                    type="email"
                    className="form-control rounded-2 py-2"
                    value={userProfile?.email || ''}
                    disabled
                  />
                </div>

                {/* Mobile */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">Mobile</label>
                  <input
                    type="tel"
                    name="mobile"
                    className="form-control rounded-2 py-2"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    required
                  />
                </div>

                {/* City ID */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">City</label>
                  <input
                    type="text"
                    name="city_id"
                    className="form-control rounded-2 py-2"
                    value={formData.city_id}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Enter city ID"
                  />
                  <small className="text-muted">City: {userProfile?.city_id?.name || 'N/A'}</small>
                </div>

                {/* User Type (Read Only) */}
                <div className="col-md-6">
                  <label className="form-label fw-bold">User Type</label>
                  <input
                    type="text"
                    className="form-control rounded-2 py-2"
                    value={userProfile?.user_type || ''}
                    disabled
                  />
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default DashboardAvailabilityMain;
