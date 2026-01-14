import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faBars, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { Person, Settings, Logout } from '@mui/icons-material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Link } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const DashboardCreatePropertyMain = ({ onMobileMenuClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Add state to track current step
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

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
  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
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
            <h2 className="mb-0 dashboard-title">Create Property</h2>
          </div>
          <div className="d-flex justify-content-end gap-2 align-items-center">
            <div className="dashboard-lang-btn d-flex gap-1 align-items-center">
              <img src="../assets/global.svg" alt="notification" />
              <span>English</span>
            </div>
            <Link to='/client/notifications' className="notification-icon-container">
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
        <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
            <div className="d-flex align-items-center">
                <h6 className="dashboard-routes-main m-0">Property Management</h6>
                <FontAwesomeIcon icon={faChevronRight} className='dashboard-routes-icon' />
                <h6 className="dashboard-routes-sub m-0">Create Property</h6>
            </div>
        </div>
        {/* Steps */}
        <div className="create-property-steps mt-4">
          <div className="steps-wrapper">
            <div 
              className={`step ${currentStep >= 1 ? 'active' : ''}`}
              onClick={() => handleStepClick(1)}
              style={{ cursor: 'pointer' }}
            >
              <div className="step-circle">
                <img src="../assets/step-1.svg" alt="info" />
              </div>
              <span className="step-label">Property Information</span>
            </div>

            <div 
              className={`step ${currentStep >= 2 ? 'active' : ''}`}
              onClick={() => handleStepClick(2)}
              style={{ cursor: 'pointer' }}
            >
              <div className="step-circle">
                <img src="../assets/step-2.svg" alt="location" />
              </div>
              <span className="step-label">Property location</span>
            </div>

            <div 
              className={`step ${currentStep >= 3 ? 'active' : ''}`}
              onClick={() => handleStepClick(3)}
              style={{ cursor: 'pointer' }}
            >
              <div className="step-circle">
                <img src="../assets/step-3.svg" alt="photos" />
              </div>
              <span className="step-label">Property photos</span>
            </div>

            <div 
              className={`step ${currentStep >= 4 ? 'active' : ''}`}
              onClick={() => handleStepClick(4)}
              style={{ cursor: 'pointer' }}
            >
              <div className="step-circle">
                <img src="../assets/step-4.svg" alt="contact" />
              </div>
              <span className="step-label">Contact information</span>
            </div>
          </div>

          <div className={`step-1-container ${currentStep === 1 ? '' : 'd-none'}`}>
            <div className="row mt-3 w-100 g-0 g-lg-2">
              <div className="col-12">
                <div className="mb-3 w-100">
                  <label htmlFor="notes" className="form-label mb-1">Name of Property</label>
                  <input
                    type="text"
                    className="form-control rounded-2 py-2 px-3 w-100"
                    id="notes"
                    placeholder="Guest House Riyadh"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3 w-100">
                  <label htmlFor="propertyType" className="form-label mb-1">
                    Property type
                  </label>

                  <div className="position-relative">
                    <select
                      id="propertyType"
                      className="form-select custom-select-bs py-2"
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>
                        Select property type
                      </option>
                      <option value="villa">Villa</option>
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                    </select>

                    {/* Bootstrap Icon */}
                    <i className="bi bi-chevron-down select-bs-icon"></i>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3 w-100">
                  <label htmlFor="phone" className="form-label mb-1">Area in square meters</label>
                  <input
                    type="text"
                    className="form-control rounded-2 py-2 px-3 w-100"
                    id="phone"
                    placeholder="300 m"
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3 w-100">
                  <label htmlFor="propertyType" className="form-label mb-1">
                    Floors
                  </label>

                  <div className="position-relative">
                    <select
                      id="propertyType"
                      className="form-select custom-select-bs py-2"
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>
                        Select number of floors
                      </option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>

                    {/* Bootstrap Icon */}
                    <i className="bi bi-chevron-down select-bs-icon"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3 w-100">
                  <label htmlFor="propertyType" className="form-label mb-1">
                    Rooms
                  </label>

                  <div className="position-relative">
                    <select
                      id="propertyType"
                      className="form-select custom-select-bs py-2"
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>
                        Select number of rooms
                      </option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>

                    {/* Bootstrap Icon */}
                    <i className="bi bi-chevron-down select-bs-icon"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3 w-100">
                  <label htmlFor="propertyType" className="form-label mb-1">
                    Bathrooms
                  </label>

                  <div className="position-relative">
                    <select
                      id="propertyType"
                      className="form-select custom-select-bs py-2"
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>
                        Select number of bathrooms
                      </option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>

                    {/* Bootstrap Icon */}
                    <i className="bi bi-chevron-down select-bs-icon"></i>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end align-items-center mb-3">
                <button className="sec-btn rounded-2 px-5 py-2 w-50-100" onClick={handleNextStep}>
                  Next
                </button>
              </div>
            </div>
          </div>

          <div className={`step-2-container ${currentStep === 2 ? '' : 'd-none'}`}>
            <div className="row mt-3 w-100 g-0 g-lg-2">
              <div className="col-12">
                <div className="mb-3 w-100">
                  <label htmlFor="notes" className="form-label mb-1">Address of Property</label>
                  <input
                    type="text"
                    className="form-control rounded-2 py-2 px-3 w-100"
                    id="notes"
                    placeholder="Riyadh, Saudi Arabia, Al Nakheel Street"
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3 w-100">
                  <label htmlFor="phone" className="form-label mb-1">City</label>
                  <input
                    type="text"
                    className="form-control rounded-2 py-2 px-3 w-100"
                    id="phone"
                    placeholder="Riyadh"
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3 w-100">
                  <label htmlFor="phone" className="form-label mb-1">Postal code</label>
                  <input
                    type="text"
                    className="form-control rounded-2 py-2 px-3 w-100"
                    id="phone"
                    placeholder="605555"
                    required
                  />
                </div>
              </div>
              <h6 className="property-management-card-title mb-1">Address on map</h6>
              <div className="property-map-container mb-2">
                <div className="property-map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3622.5049177533113!2d46.72160581500448!3d24.71355228411637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f0385d3e9c9c9%3A0x9c9c9c9c9c9c9c9c!2sRiyadh%2C%20Saudi%20Arabia!5e0!3m2!1sen!2sus!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0, borderRadius: '8px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Property Location Map"
                    className="map-iframe"
                  ></iframe>
                </div>
              </div>
              <div className="d-flex justify-content-end align-items-center mb-3 gap-2">
                <button className="prev-btn rounded-2 px-4 py-2" onClick={handlePrevStep}>
                  Previous
                </button>
                <button className="sec-btn rounded-2 px-5 py-2" onClick={handleNextStep}>
                  Next
                </button>
              </div>
            </div>
          </div>

          <div className={`step-3-container ${currentStep === 3 ? '' : 'd-none'}`}>
            <div className="row mt-3 w-100 g-0">
              <div className="col-12 mb-3">
                <label className="form-label mb-2">Main image of property</label>

                {/* Upload Box */}
                <div
                  className="image-upload-box d-flex align-items-center justify-content-start p-2"
                  onClick={() => inputRef.current.click()}
                >
                  {image ? (
                    <img src={image} alt="preview" className="uploaded-image" />
                  ) : (
                    <span className="upload-placeholder text-center w-100">
                      Click to upload image
                    </span>
                  )}
                </div>

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  ref={inputRef}
                  onChange={handleImageChange}
                />

                {/* Bottom Bar */}
                {image && (
                  <div className="image-upload-footer d-flex align-items-center justify-content-between mt-2">
                    <div className="d-flex align-items-center gap-2">
                      <button
                        type="button"
                        className="main-btn py-2 px-2 rounded-start-3"
                        onClick={() => inputRef.current.click()}
                      >
                        Change image
                      </button>
                      <span className="image-name">{fileName}</span>
                    </div>
                    <div className="delete-btn px-1 py-1 m-1 d-flex align-items-center justify-content-center gap-1" onClick={handleRemove}>
                      <img src="../assets/delete.svg" alt="delete" />
                    </div>
                  </div>
                )}
              </div>
              <div className="col-12">
                <div className="mb-3 w-100">
                  <label htmlFor="notes" className="form-label mb-1">Special notes</label>
                  <textarea name="notes" id="notes" rows="4" className="form-control rounded-2 py-2 w-100" placeholder='Entrance from the back'></textarea>
                </div>
              </div>
              <div className="d-flex justify-content-end align-items-center mb-3 gap-2">
                <button className="prev-btn rounded-2 px-4 py-2" onClick={handlePrevStep}>
                  Previous
                </button>
                <button className="sec-btn rounded-2 px-5 py-2" onClick={handleNextStep}>
                  Next
                </button>
              </div>
            </div>
          </div>

          <div className={`step-4-container ${currentStep === 4 ? '' : 'd-none'}`}>
            <div className="row mt-3 w-100 g-0 g-lg-2">
              <div className="d-flex gap-1 align-items-center">
                <input type="checkbox" id='co-host' className='mb-2' />
                <label htmlFor="co-host" className="form-label mt-1">Add Co-Host for this Property</label>
              </div>
              <div className="col-md-6">
                <div className="mb-3 w-100">
                  <label htmlFor="notes" className="form-label mb-1"> Full Name</label>
                  <input
                    type="text"
                    className="form-control rounded-2 py-2 px-3 w-100"
                    id="notes"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3 w-100">
                  <label htmlFor="phone" className="form-label mb-1">Phone number</label>
                  <input
                    type="text"
                    className="form-control rounded-2 py-2 px-3 w-100"
                    id="phone"
                    placeholder="Enter your  number"
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3 w-100">
                  <label htmlFor="propertyType" className="form-label mb-1">
                    Platforms list
                  </label>

                  <div className="position-relative">
                    <select
                      id="propertyType"
                      className="form-select custom-select-bs py-2"
                      defaultValue=""
                      required
                    >
                      <option value="Booking">Booking</option>
                    </select>

                    {/* Bootstrap Icon */}
                    <i className="bi bi-chevron-down select-bs-icon"></i>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="mb-3 w-100">
                  <label htmlFor="phone" className="form-label mb-1 text-white">.</label>
                  <input
                    type="text"
                    className="form-control rounded-2 py-2 px-3 w-100"
                    id="phone"
                    placeholder="Enter link"
                    required
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end align-items-center mb-3 gap-2">
                <button className="prev-btn rounded-2 px-4 py-2" onClick={handlePrevStep}>
                  Previous
                </button>
                <button className="sec-btn rounded-2 px-5 py-2">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardCreatePropertyMain;