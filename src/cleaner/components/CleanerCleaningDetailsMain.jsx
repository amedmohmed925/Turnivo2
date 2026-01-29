import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import PauseCircleFilledOutlinedIcon from '@mui/icons-material/PauseCircleFilledOutlined';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { Link } from 'react-router-dom';
import CleanerHeader from './CleanerHeader';
const CleanerCleaningDetailsMain = ({ onMobileMenuClick }) => {
  const [beforeImages, setBeforeImages] = useState([]);
  const [afterImages, setAfterImages] = useState([]);
  const beforeInputRef = useRef(null);
  const afterInputRef = useRef(null);
  
  // State for task checkboxes
  const [tasks, setTasks] = useState([
    { id: 1, label: 'Changing bed linens', checked: false },
    { id: 2, label: 'Clean the bathrooms', checked: false },
    { id: 3, label: 'Q flooring', checked: false },
    { id: 4, label: 'Damage inspection', checked: false }
  ]);



  const handleBeforeUpload = (e) => {
    const files = Array.from(e.target.files);
    setBeforeImages(prev => [...prev, ...files]);
  };

  const handleAfterUpload = (e) => {
    const files = Array.from(e.target.files);
    setAfterImages(prev => [...prev, ...files]);
  };



  // Function to handle task checkbox toggle
  const handleTaskToggle = (taskId) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, checked: !task.checked } : task
      )
    );
  };

  return (
    <section>
      <CleanerHeader title="Cleaning Details" onMobileMenuClick={onMobileMenuClick} />
      <div className="dashboard-home-content px-3 mt-2">
        <div className="row">
          <div className="col-12">
                            <h6 className="property-problem-title mb-2 mt-2">Maintenance details</h6>
                <div className="d-flex align-items-center justify-content-between p-3 gap-2 w-100 materials-cards rounded-4 mb-3">
      <div className="d-flex w-100 align-items-start flex-column flex-md-row gap-2">
        <img src="/assets/problem-img-2.png" className='img-fluid materials-img' alt="location" />   
        <div className='d-flex flex-column gap-2 align-items-start w-100'>
                                <div className="d-flex justify-content-between align-items-center w-100">
           <h6 className="property-problem-title mb-0 mt-2">Upholstery and carpet cleaning</h6>
            <div className='new-badge px-2 p-1 rounded-2'>New</div>
          </div>
          <div className="d-flex align-items-center gap-1">
            <img src="/assets/calendar-3.svg" alt="calendar" />
            <p className="dashboard-home-card-2-desc-3 m-0">June 12, 2026</p>
          </div>
          <div className="d-flex align-items-center gap-1">
            <img src="/assets/clock.svg" alt="clock" />
            <p className="dashboard-home-card-2-desc-3 mb-0">8:00 pm - 10:00 pm</p>
          </div>
            <h6 className="property-problem-title mb-0">Nakheel Neighborhood Hotel</h6>
            <div className="d-flex align-items-center gap-1">
            <img src="/assets/location-2.svg" alt="location" />
            <p className="dashboard-home-card-2-desc-3 m-0">Riyadh, Al Narjis Neighborhood</p>
          </div>
            <div className="bnb-badge d-flex align-items-center gap-2 p-2 rounded-2">
              <img src="/assets/bnb.svg" alt="airbnb" />
              <span>airbnb</span>
            </div>
        </div>
      </div>
    </div>
          </div>
            <h6 className="property-problem-title mb-2 ">Room pictures before and after</h6>
            <div className="d-flex gap-2 align-items-center flex-wrap">
                <div className='rating-stars-bg p-2 rounded-2'>
                    <h3 className='form-label mb-2'>Before cleaning</h3>
                    <div className="d-flex gap-2 align-items-center flex-wrap">
                        <div className="add-room-btn d-flex flex-column align-items-center justify-content-center gap-2" onClick={() => beforeInputRef.current.click()}>
                            <img src="/assets/gallery-add.svg" alt="gallery" />
                            <h6 className='table-time m-0'>Add room photos</h6>
                        </div>
                        {beforeImages.map((img, idx) => <img key={idx} src={URL.createObjectURL(img)} className='added-img' alt="uploaded" />)}
                    </div>
                    <input type="file" multiple accept="image/*" ref={beforeInputRef} onChange={handleBeforeUpload} style={{display: 'none'}} />
                </div>
                <div className='rating-stars-bg p-2 rounded-2'>
                    <h3 className='form-label mb-2'>After cleaning</h3>
                    <div className="d-flex gap-2 align-items-center flex-wrap">
                        <div className="add-room-btn d-flex flex-column align-items-center justify-content-center gap-2" onClick={() => afterInputRef.current.click()}>
                            <img src="/assets/gallery-add.svg" alt="gallery" />
                            <h6 className='table-time m-0'>Add room photos</h6>
                        </div>
                        {afterImages.map((img, idx) => <img key={idx} src={URL.createObjectURL(img)} className='added-img' alt="uploaded" />)}

                    </div>
                    <input type="file" multiple accept="image/*" ref={afterInputRef} onChange={handleAfterUpload} style={{display: 'none'}} />
                </div>

            </div>
            <h6 className="property-problem-title my-2">employee</h6>
                                <div className="d-flex align-items-center gap-2 w-100">
                      <img src='/assets/user.png' className='provider-rate' alt="user" />
                      <div>
                        <h6 className='login-title m-0'>Leslie Alexander</h6>
                        <h6 className="training-details-card-desc m-0 mt-1">Operations Manager</h6>
                      </div>
                    </div>
                                        <h6 className="property-management-card-title mb-0 mt-4">Additional Services</h6>
                    <div className="row w-100 g-2">
                                      <div className="col-md-2 col-12 mb-3 col-20-per px-2">
                <div className="bg-light-gray p-3 rounded-3 h-100 active">
                  <img src="/assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the pool</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
                                      <div className="col-md-2 col-12 mb-3 col-20-per px-2">
                <div className="bg-light-gray p-3 rounded-3 h-100 active">
                  <img src="/assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the pool</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
                                      <div className="col-md-2 col-12 mb-3 col-20-per px-2">
                <div className="bg-light-gray p-3 rounded-3 h-100 active">
                  <img src="/assets/service-img.png" className='img-fluid w-100' alt="service" />
                  <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                    <h3 className='dashboard-routes-sub m-0'>Cleaning the pool</h3>
                    <div className='third-btn-sm p-1 rounded-2'>$50</div>
                  </div>
                </div>
              </div>
                    </div>
            <h6 className="property-problem-title my-2">Problem description</h6>
              <div className="d-flex gap-3 align-items-center flex-wrap flex-sm-nowrap">
                <div className='training-card p-2 rounded-2'>
                    <p className='m-0 problem-desc'>Poor cooling has been reported in the air conditioner located in Office 204 on the second floor. The user noted that the air conditioner was not cooling sufficiently and that water was leaking from the indoor unit. Please check the filters and gas, and ensure that the pipes and connections are in good condition. A full test is recommended after maintenance to ensure efficient operation.</p>
                </div>
              </div>
        <div className="row g-2 mt-3">
            <div className="col-md-7 px-2 mb-3">
              <div className="tasks-card">
                <h6 className="property-problem-title mb-3">The task cannot be finalized until all menu steps have been completed.</h6>
                <div className="d-flex flex-column gap-2 align-items-start">
                    {tasks.map(task => (
                        <div 
                            key={task.id}
                            className={`d-flex gap-1 align-items-center problem-checkbox-container task-checkbox ${task.checked ? 'active' : ''}`}
                            onClick={() => handleTaskToggle(task.id)}
                        >
                            <label className="custom-checkbox">
                                <input 
                                    type="checkbox" 
                                    checked={task.checked}
                                    onChange={() => handleTaskToggle(task.id)}
                                />
                                <span className="checkmark"></span>
                            </label>
                            <label className="checkbox-label">{task.label}</label>
                        </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="col-md-5 mb-3 px-2">
                <div className="tasks-card h-100">
                    <div className="d-flex gap-2 align-items-center mb-3">
                        <img src="/assets/Ellipse.svg" alt="Ellipse" />
                        <h6 className='dashboard-card-link m-0'>Executing the task</h6>
                    </div>
                    <div className="d-flex align-items-center gap-2 flex-wrap flex-md-nowrap justify-content-center">
<div className="timer-wrapper medium">
  <svg className="progress-ring" width="180" height="180">
    <circle
      className="progress-ring-bg"
      cx="90"
      cy="90"
      r="80"
    />
    <circle
      className="progress-ring-circle"
      cx="90"
      cy="90"
      r="80"
    />
  </svg>

  <div className="timer-text medium">90</div>
</div>


                        <div className="d-flex flex-column gap-5 align-items-center h-100 w-100">
                            <div className="d-flex align-items-center gap-2 text-nowrap">
                                <div className="hours-timer rounded-pill d-flex gap-1 align-items-center">
                                    <span>01 h</span>
                                    <FontAwesomeIcon icon={faPlus} />
                                </div>
                                <div className="hours-timer rounded-pill d-flex gap-1 align-items-center">
                                    <span>30 min</span>
                                    <FontAwesomeIcon icon={faPlus} />
                                </div>
                            </div>
                            <div className="d-flex align-items-center gap-5">
                                <StopCircleIcon className='pause' />
                                <PauseCircleFilledOutlinedIcon className='pause' />
                            </div>
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

export default CleanerCleaningDetailsMain;