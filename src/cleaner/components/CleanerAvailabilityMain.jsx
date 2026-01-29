import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useCleanerData } from '../context/CleanerDataContext';
import CleanerHeader from './CleanerHeader';

const CleanerAvailabilityMain = ({ onMobileMenuClick }) => {
  // Get user data from context
  const { 
    userFullName, 
    userAvatar, 
    userEmail, 
    userMobile, 
    userAddress, 
    userDescription, 
    userStatus
  } = useCleanerData();

  return (
    <section>
      <CleanerHeader title="Calendar & Availability" onMobileMenuClick={onMobileMenuClick} />
      <div className="dashboard-home-content px-3 mt-2">
        <img src={userAvatar} className='profile-img' alt="user" />
        <h2 className="mb-0 property-problem-title">{userFullName}</h2>
        <div className="d-flex justify-content-between align-items-end gap-3 flex-wrap">
          <div>
            <div className="d-flex gap-1 align-items-center mt-2">
              <FontAwesomeIcon icon={faUser} className='gray-icon' />
              <p className='dashboard-small-title m-0'>{userStatus || 'Available'}</p>
            </div>
            <div className="d-flex gap-1 align-items-center mt-2">
              <FontAwesomeIcon icon={faLocationDot} className='gray-icon' />
              <p className='dashboard-small-title m-0'>{userAddress || 'No address provided'}</p>
            </div>
          </div>
            <button className="main-btn rounded-2 px-3 py-2 w-50-100 d-flex gap-2 align-items-center">
                <img src="/assets/edit-2.svg" alt="edit" />
                Edit
            </button>
        </div>
        <h6 className='service-desc mt-3'>About</h6>
        <p className='dashboard-small-title m-0'>{userDescription || 'No description provided.'}</p>
        <h6 className='service-desc mt-3'>Personal information</h6>

        <div className="row">
          <div className="col-12">
                <div className="mb-3 w-100">
                  <label className="form-label mb-1">Full name</label>
                  <input
                    type="text"
                    className="form-control rounded-2 py-2 px-3 w-100"
                    value={userFullName}
                    readOnly
                  />
                </div>
          </div>
          <div className="col-md-6">
                <div className="mb-3 w-100">
                  <label className="form-label mb-1">Email</label>
                  <input
                    type="email"
                    className="form-control rounded-2 py-2 px-3 w-100"
                    value={userEmail}
                    readOnly
                  />
                </div>
          </div>
          <div className="col-md-6">
                <div className="mb-3 w-100">
                  <label className="form-label mb-1">Phone number</label>
                  <input
                    type="text"
                    className="form-control rounded-2 py-2 px-3 w-100"
                    value={userMobile}
                    readOnly
                  />
                </div>
          </div>
          <div className="col-12">
                <div className="mb-3 w-100">
                  <label className="form-label mb-1">Address</label>
                  <input
                    type="text"
                    className="form-control rounded-2 py-2 px-3 w-100"
                    value={userAddress || ''}
                    readOnly
                  />
                </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default CleanerAvailabilityMain;