import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CleanerHeader from './CleanerHeader';

const CleanerReportProblemMain = ({ onMobileMenuClick }) => {
  // State to track which problem type is selected
  const [selectedProblemType, setSelectedProblemType] = useState('home-service');
  
  // State for form inputs
  const [formData, setFormData] = useState({
    email: '',
    bookingDate: '',
    serviceProviderName: '',
    typeOfIssue: '',
    deviceType: '',
    problemDescription: ''
  });



  // Handle problem type selection
  const handleProblemTypeClick = (type) => {
    setSelectedProblemType(type);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <section>
      <CleanerHeader title="Report a Problem" onMobileMenuClick={onMobileMenuClick} />
      <div className="dashboard-home-content px-3 mt-2">
        <h6 className="dashboard-routes-sub m-0">Report a problem</h6>
        <label className="form-label mt-3 mb-1">Problem Type:</label>
        <div className="d-flex gap-2 align-items-center">
                   <div 
            className={`d-flex gap-5 align-items-center problem-checkbox-container ${selectedProblemType === 'home-service' ? 'active' : ''}`}
            onClick={() => handleProblemTypeClick('home-service')}
          >
            <label className="checkbox-label">Issue with a Home Service</label>
            <label className="custom-checkbox">
              <input 
                type="checkbox" 
                checked={selectedProblemType === 'home-service'}
                onChange={() => handleProblemTypeClick('home-service')}
              />
              <span className="checkmark"></span>
            </label>
          </div>
                    <div 
            className={`d-flex gap-5 align-items-center problem-checkbox-container ${selectedProblemType === 'technical-issue' ? 'active' : ''}`}
            onClick={() => handleProblemTypeClick('technical-issue')}
          >
            <label className="checkbox-label">Technical Issue with the App</label>
            <label className="custom-checkbox">
              <input 
                type="checkbox" 
                checked={selectedProblemType === 'technical-issue'}
                onChange={() => handleProblemTypeClick('technical-issue')}
              />
              <span className="checkmark"></span>
            </label>
          </div>
        </div>
        
        <p className='problem-check-desc my-2'>Do you have questions? Feel free to reach out to us for support or more information about on next stay. Our team is ready to answer all your queries.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="row mt-3 w-100 g-0 g-lg-2">
            {/* Email field - always shown */}
            <div className="col-12">
              <div className="mb-3 w-100">
                <input
                  type="email"
                  className="form-control rounded-2 py-2 px-3 w-100"
                  id="email"
                  name="email"
                  placeholder="E-mail address*"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* Conditional fields based on problem type */}
            {selectedProblemType === 'home-service' ? (
              <>
                <div className="col-md-4">
                  <div className="mb-3 w-100">
                    <input
                      type="date"
                      className="form-control rounded-2 py-2 px-3 w-100"
                      id="bookingDate"
                      name="bookingDate"
                      placeholder="Booking Date"
                      value={formData.bookingDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3 w-100">
                    <input
                      type="text"
                      className="form-control rounded-2 py-2 px-3 w-100"
                      id="serviceProviderName"
                      name="serviceProviderName"
                      placeholder="Service Provider Name (optional)"
                      value={formData.serviceProviderName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3 w-100">
                    <input
                      type="text"
                      className="form-control rounded-2 py-2 px-3 w-100"
                      id="typeOfIssue"
                      name="typeOfIssue"
                      placeholder="Type of Issue"
                      value={formData.typeOfIssue}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="col-md-6">
                  <div className="mb-3 w-100">
                    <input
                      type="text"
                      className="form-control rounded-2 py-2 px-3 w-100"
                      id="typeOfIssue"
                      name="typeOfIssue"
                      placeholder="Type of Issue"
                      value={formData.typeOfIssue}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3 w-100">
                    <input
                      type="text"
                      className="form-control rounded-2 py-2 px-3 w-100"
                      id="deviceType"
                      name="deviceType"
                      placeholder="Device Type"
                      value={formData.deviceType}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </>
            )}
            
            {/* Problem Description - always shown */}
            <div className="col-12">
              <div className="mb-3 w-100">
                <textarea 
                  rows='6' 
                  className='form-control rounded-2 py-2' 
                  placeholder='Problem Description'
                  id="problemDescription"
                  name="problemDescription"
                  value={formData.problemDescription}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
            </div>
            
            <div className="col-12">
              <button type="submit" className="sec-btn rounded-2 px-5 py-2 w-100">
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CleanerReportProblemMain;