import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Person, Settings, Logout } from '@mui/icons-material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Link, useNavigate } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const ConfirmProviderStepsMain = ({ onMobileMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Add state to track current step
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  // State to track if user has experience
  const [hasExperience, setHasExperience] = useState(null);
  
  // Navigation hook
  const navigate = useNavigate();

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

  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('');
  const inputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setImage(URL.createObjectURL(file));
  };

  const handleRemove = () => {
    setImage(null);
    setFileName('');
    inputRef.current.value = '';
  };

  // Function to handle next step
const handleNextStep = (e) => {
  e?.preventDefault(); // يمنع reload

  if (currentStep === totalSteps) {
    // آخر خطوة → روح على صفحة اللوجن
    navigate('/provider-thanks');
    return;
  }

  setCurrentStep((prev) => prev + 1);
};


  // Function to handle previous step
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Function to handle step click from the step indicator
  const handleStepClick = (stepNumber) => {
    setCurrentStep(stepNumber);
  };
  
  // Function to handle experience selection
  const handleExperienceSelection = (hasExp) => {
    setHasExperience(hasExp);
    if (!hasExp) {
      // If user has no experience, go to next step
      handleNextStep();
    }
  };

  return (
    <section>
        <div className="container">
            <div className="dashboard-home-content px-3 my-md-5 my-4">
                {/* Steps */}
                <div className="create-property-steps mt-4">
                <div className="steps-wrapper">
                    <div 
                    className={`step ${currentStep >= 1 ? 'active' : ''}`}
                    onClick={() => handleStepClick(1)}
                    style={{ cursor: 'pointer' }}
                    >
                    <div className="step-circle">
                        <img src="/assets/provider-step-icon-1.svg" alt="info" />
                    </div>
                    <span className="step-label">Contact Information</span>
                    </div>

                    <div 
                    className={`step ${currentStep >= 2 ? 'active' : ''}`}
                    onClick={() => handleStepClick(2)}
                    style={{ cursor: 'pointer' }}
                    >
                    <div className="step-circle">
                        <img src="/assets/provider-step-icon-2.svg" alt="location" />
                    </div>
                    <span className="step-label">Address</span>
                    </div>

                    <div 
                    className={`step ${currentStep >= 3 ? 'active' : ''}`}
                    onClick={() => handleStepClick(3)}
                    style={{ cursor: 'pointer' }}
                    >
                    <div className="step-circle">
                        <img src="/assets/provider-step-icon-3.svg" alt="photos" />
                    </div>
                    <span className="step-label">Ervaring</span>
                    </div>

                    <div 
                    className={`step ${currentStep >= 4 ? 'active' : ''}`}
                    onClick={() => handleStepClick(4)}
                    style={{ cursor: 'pointer' }}
                    >
                    <div className="step-circle">
                        <img src="/assets/provider-step-icon-4.svg" alt="contact" />
                    </div>
                    <span className="step-label">Possibility to start</span>
                    </div>
                </div>

                <div className={`step-1-container ${currentStep === 1 ? '' : 'd-none'}`}>
                    <div className="row g-0 min-vh-100">
          {/* Left side - Image */}
          <div className="col-lg-5 mt-3 p-3 d-none d-lg-block">
            <div 
              className="h-100 d-flex align-items-center justify-content-center rounded-3"
              style={{
                backgroundImage: `url('/assets/login-2.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: '#f8f9fa'
              }}
            >
              <div className="text-center d-flex justify-content-center align-items-center p-4 w-100 h-100" style={{ backgroundColor: '#FFFFFF33', borderRadius: '10px' }}>
                <img 
                  src="/assets/logo.png" 
                  alt="Logo"  
                  className="mb-3 confirm-logo"
                />
              </div>
            </div>
          </div>
          
          {/* Right side - Form */}
          <div className="col-lg-7 mt-3 p-3">
            <div className='d-flex align-items-start justify-content-center bg-white shadow-sm rounded-3 h-100'>
            <div className="w-100 px-4 py-5">
              
              {/* Title and Description */}
              <div className="">
                <h2 className="mb-2 login-title">Wat is uw contactinformatie?</h2>
                <p className="login-description">Welcome back! Please log in to continue</p>
              </div>
              
              {/* Login Form */}
              <form>
                {/* Email Input */}
                <div className="mb-3">
                  <label className="form-label mb-1">first name</label>
                  <input
                    type="text"
                    className="form-control rounded-2 py-2 px-3"
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                {/* Email Input */}
                <div className="mb-3">
                  <label className="form-label mb-1">last name</label>
                  <input
                    type="text"
                    className="form-control rounded-2 py-2 px-3"
                    placeholder="Enter your last name"
                    required
                  />
                </div>
                                {/* Email Input */}
                <div className="mb-3">
                  <label className="form-label mb-1">Email Address</label>
                  <input
                    type="text"
                    className="form-control rounded-2 py-2 px-3"
                    id="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                                {/* Email Input */}
                <div className="mb-3">
                  <label className="form-label mb-1">Phone</label>
                  <input
                    type="text"
                    className="form-control rounded-2 py-2 px-3"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                
                
                        <div className="d-flex justify-content-end align-items-center mb-3">
                        <button className="sec-btn rounded-2 px-3 py-2 w-50-100" onClick={handleNextStep}>
                        Next
                        </button>
                    </div>
              </form>
              
            </div>

            </div>
          </div>
                    </div>
                </div>

                <div className={`step-2-container ${currentStep === 2 ? '' : 'd-none'}`}>
                                        <div className="row g-0 min-vh-100">
          
          {/* Right side - Form */}
          <div className="col-lg-7 mt-3 p-3">
            <div className='d-flex align-items-start justify-content-center bg-white shadow-sm rounded-3 h-100'>
            <div className="w-100 px-4 py-5">
              
              {/* Title and Description */}
              <div className="">
                <h2 className="mb-2 login-title">What is your address?</h2>
                <p className="login-description">Welcome back! Please log in to continue</p>
              </div>
              
              {/* Login Form */}
              <form>
                {/* Email Input */}
                <div className="mb-3">
                  <label className="form-label mb-1">Address</label>
                  <input
                    type="text"
                    className="form-control rounded-2 py-2 px-3"
                    placeholder="Enter your address"
                    required
                  />
                </div>
                {/* Email Input */}
                <div className="mb-3">
                  <label className="form-label mb-1">Postcode</label>
                  <input
                    type="text"
                    className="form-control rounded-2 py-2 px-3"
                    placeholder="2390"
                    required
                  />
                </div>
                                {/* Email Input */}
                <div className="mb-3">
                  <label className="form-label mb-1">stad</label>
                  <input
                    type="text"
                    className="form-control rounded-2 py-2 px-3"

                    placeholder="stad"
                    required
                  />
                </div>

                                {/* Email Input */}
                <div className="mb-3">
                  <label className="form-label mb-1">Provinicie</label>
                  <input
                    type="text"
                    className="form-control rounded-2 py-2 px-3"
                    placeholder="Provinicie"
                    required
                  />
                </div>
                
                
                        <div className="d-flex justify-content-start align-items-center mb-3">
                        <button className="sec-btn rounded-2 px-3 py-2 w-50-100" onClick={handleNextStep}>
                        Next
                        </button>
                    </div>
              </form>
              
            </div>

            </div>
          </div>

                    {/* Left side - Map */}
          <div className="col-lg-5 mt-3 p-3 d-none d-lg-block">
            <div className="h-100 d-flex align-items-center justify-content-center rounded-3 overflow-hidden">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.0185489933747!2d-74.00601408459395!3d40.7127753793304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316bb5a6b3%3A0x4e3c5f5b5b5b5b5b!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1629795277341!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
                    </div>
                </div>

                <div className={`step-3-container ${currentStep === 3 ? '' : 'd-none'}`}>
                                                           <div className="row g-0 min-vh-100">
          
          {/* Right side - Form */}
          <div className="col-lg-7 mt-3 p-3">
            <div className='d-flex align-items-center justify-content-center bg-white shadow-sm rounded-3 h-100'>
            <div className="w-100 px-4 py-5">
              
              {/* Title and Description - only show if no selection made */}
              {hasExperience === null && (
                <div className="">
                  <h2 className="mb-2 login-title">Do you have previous cleaning experience?</h2>
                  <p className="login-description">Your experience can help you in the selection process.</p>
                </div>
              )}
              
              {/* Yes/No buttons - only show if no selection made */}
              {hasExperience === null && (
                <div className="d-flex gap-2 align-items-center mb-3">
                    
                  <button 
                    className="main-btn rounded-2 px-3 py-2"
                    onClick={() => handleExperienceSelection(true)}
                  >
                    YES
                  </button>
                  <button 
                    className="main-btn rounded-2 px-3 py-2"
                    onClick={() => handleExperienceSelection(false)}
                  >
                    NO
                  </button>
                </div>
              )}
              
              {/* Yes content - only show if user selected YES */}
              {hasExperience === true && (
                <div className="yes-content">
                    <div className="">
                  <h2 className="mb-2 login-title">What company have you worked for before?</h2>
                  <p className="login-description">Select the name of the company you worked for previously</p>
                </div>
                  <div className="position-relative mb-3">
                    <select
                      id="propertyType"
                      className="form-select custom-select-bs py-2"
                      defaultValue=""
                      required
                    >
                      <option selected >Select the name of the company</option>
                    </select>

                    {/* Bootstrap Icon */}
                    <i className="bi bi-chevron-down select-bs-icon"></i>
                  </div>
                  <div className="d-flex justify-content-end align-items-center mb-3">
                    <button className="sec-btn rounded-2 px-3 py-2 w-50-100" onClick={handleNextStep}>
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>

            </div>
          </div>

                    {/* Left side - Image */}
          <div className="col-lg-5 mt-3 p-3 d-none d-lg-block">
            <div 
              className="h-100 d-flex align-items-center justify-content-center rounded-3"
              style={{
                backgroundImage: `url('/assets/login-3.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: '#f8f9fa'
              }}
            >
            </div>
          </div>
                    </div>
                </div>

                <div className={`step-4-container ${currentStep === 4 ? '' : 'd-none'}`}>
                                                                               <div className="row g-0 min-vh-100">
          
          {/* Right side - Form */}
          <div className="col-lg-7 mt-3 p-3">
            <div className='d-flex align-items-center justify-content-center bg-white shadow-sm rounded-3 h-100'>
            <div className="w-100 px-4 py-5 align-items-center">
              
              {/* Title and Description */}
              <div className="">
                <h2 className="mb-2 login-title">When can you start?</h2>
                <p className="login-description">Let us know the date you are available to start.</p>
              </div>
                              <div className="mb-3">
                  <input
                    type="date"
                    className="form-control rounded-2 py-2 px-3"
                    required
                  />
                </div>
                                      <div className="position-relative mb-3 d-none">
                            <select
                            id="propertyType"
                            className="form-select custom-select-bs py-2"
                            defaultValue=""
                            required
                            >
                            <option selected >Select the name of the company</option>
                            </select>

                            {/* Bootstrap Icon */}
                            <i className="bi bi-chevron-down select-bs-icon"></i>
                        </div>
                        <div className="d-flex justify-content-end align-items-center mb-3">
                        <button className="sec-btn rounded-2 px-3 py-2 w-50-100" onClick={handleNextStep}>
                        Next
                        </button>
                    </div>
              
            </div>

            </div>
          </div>

                    {/* Left side - Image */}
          <div className="col-lg-5 mt-3 p-3 d-none d-lg-block">
            <div 
              className="h-100 d-flex align-items-center justify-content-center rounded-3"
              style={{
                backgroundImage: `url('/assets/login-4.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: '#f8f9fa'
              }}
            >
            </div>
          </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default ConfirmProviderStepsMain;