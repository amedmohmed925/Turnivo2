import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Person, Settings, Logout } from '@mui/icons-material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Link } from 'react-router-dom';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';

const GuestReportProblemMain = () => {
  
  // State to track which problem type is selected
  
  // State for form inputs
  const [formData, setFormData] = useState({
    email: '',
    bookingDate: '',
    serviceProviderName: '',
    typeOfIssue: '',
    deviceType: '',
    problemDescription: ''
  });


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
        <div className="container">
            <div className="dashboard-home-content px-3 mt-3">
                <div className="d-flex justify-content-between align-items-center">
                    <h6 className="dashboard-routes-sub m-0">Report a problem</h6>
                </div>
                
                
                <form onSubmit={handleSubmit}>
                <div className="row mt-3 w-100 g-0 g-lg-2">
                    {/* Email field - always shown */}
                    <div className="col-12">
                    <div className="mb-3 w-100">
                        <label className="form-label mb-1">temp code</label>
                        <input
                        type="text"
                        className="form-control rounded-2 py-2 px-3 w-100"
                        placeholder="Enter code"
                        />
                    </div>
                    </div>
                    <div className="col-12">
                    <div className="position-relative mb-3">
                    <label className="form-label mb-1">Type of service</label>
                    <select
                      id="propertyType"
                      className="form-select custom-select-bs py-2"
                      defaultValue=""
                      required
                    >
                      <option value="Electricity">Electricity</option>
                    </select>

                    {/* Bootstrap Icon */}
                    <i className="bi bi-chevron-down select-bs-icon"></i>
                  </div>
                    </div>
                    
                    {/* Problem Description - always shown */}
                    <div className="col-12">
                    <div className="mb-3 w-100">
                        <label className="form-label mb-1">Problem details</label>
                        <textarea 
                        rows='6' 
                        className='form-control rounded-2 py-2' 
                        placeholder="What's the issue ..."
                        id="problemDescription"
                        name="problemDescription"
                        value={formData.problemDescription}
                        onChange={handleInputChange}
                        required
                        ></textarea>
                    </div>
                    </div>
                    
                    <div className="col-md-6 mb-3">
                    <button type="submit" className="sec-btn rounded-2 px-5 py-2 w-100">
                        Send a request
                    </button>
                    </div>
                    <div className="col-md-6 mb-3">
                    <button type="submit" className="delete-btn border-0 rounded-2 px-5 py-2 w-100">
                        Cancel
                    </button>
                    </div>
                </div>
                </form>
            </div>

        </div>
    </section>
  );
};

export default GuestReportProblemMain;