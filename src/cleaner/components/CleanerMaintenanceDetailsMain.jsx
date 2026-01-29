import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import CleanerHeader from './CleanerHeader';
import {
  getMaintenanceServiceDetails,
  addMaintenanceServiceBeforeImages,
  addMaintenanceServiceAfterImages,
} from '../../api/cleanerMaintenanceApi';
import { selectAccessToken } from '../../store/authSlice';

const CleanerMaintenanceDetailsMain = ({ onMobileMenuClick }) => {
  const [beforeImages, setBeforeImages] = useState([]);
  const [afterImages, setAfterImages] = useState([]);
  const beforeInputRef = useRef(null);
  const afterInputRef = useRef(null);
  const [serviceDetails, setServiceDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingBefore, setIsUploadingBefore] = useState(false);
  const [isUploadingAfter, setIsUploadingAfter] = useState(false);
  
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get('id');
  const accessToken = useSelector(selectAccessToken);

  // Fetch service details
  useEffect(() => {
    const fetchDetails = async () => {
      if (!serviceId || !accessToken) return;

      try {
        setIsLoading(true);
        const response = await getMaintenanceServiceDetails(accessToken, serviceId);

        if (response.status === 1 && response.data && response.data.length > 0) {
          const details = response.data[0];
          setServiceDetails(details);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Service details not found',
          });
        }
      } catch (error) {
        console.error('Error fetching service details:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'Failed to load service details',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [serviceId, accessToken]);
  



  const handleBeforeUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    if (!serviceId || !accessToken) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Service ID or access token missing',
      });
      return;
    }

    try {
      setIsUploadingBefore(true);
      const response = await addMaintenanceServiceBeforeImages(accessToken, serviceId, files);

      if (response.status === 1) {
        setBeforeImages(prev => [...prev, ...files]);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.message || 'Before images uploaded successfully',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: response.message || 'Failed to upload before images',
        });
      }
    } catch (error) {
      console.error('Error uploading before images:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Failed to upload before images',
      });
    } finally {
      setIsUploadingBefore(false);
    }
  };

  const handleAfterUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    if (!serviceId || !accessToken) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Service ID or access token missing',
      });
      return;
    }

    try {
      setIsUploadingAfter(true);
      const response = await addMaintenanceServiceAfterImages(accessToken, serviceId, files);

      if (response.status === 1) {
        setAfterImages(prev => [...prev, ...files]);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.message || 'After images uploaded successfully',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: response.message || 'Failed to upload after images',
        });
      }
    } catch (error) {
      console.error('Error uploading after images:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Failed to upload after images',
      });
    } finally {
      setIsUploadingAfter(false);
    }
  };



  return (
    <section>
      <CleanerHeader title="Maintenance Details" onMobileMenuClick={onMobileMenuClick} />
      <div className="dashboard-home-content px-3 mt-2">
        {isLoading ? (
          <div className="text-center mt-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : !serviceDetails ? (
          <div className="text-center mt-4">
            <p className="text-muted">Service details not found</p>
          </div>
        ) : (
        <div className="row">
          <div className="col-12">
            <div className=" mt-3 w-100">
              <div className="d-flex align-items-start flex-column flex-md-row gap-3 w-100">
                <div className="d-flex flex-column align-items-start gap-2 w-100">
                <div className="property-management-card mt-3 w-100">
                  <div className="d-flex align-items-start flex-column flex-md-row gap-3 w-100">
                    <img src='/assets/property-management-card-img.png' className='property-management-card-img-3' alt="Property" />
                    <div className="d-flex flex-column align-items-start gap-2 w-100">
                      <div className="d-flex justify-content-between w-100 align-items-center">
                        <h6 className="property-management-card-title m-0">Guest House Riyadh</h6>
                        <div className={`villa-badge py-1 px-3 rounded-pill`}>Villa</div>
                      </div>
                      <div className="d-flex align-items-center">
                        <img src="/assets/location.svg" className='img-fluid' alt="location" />
                        <p className="property-management-card-address m-0">Riyadh, Saudi Arabia, Al Nakheel Street</p>
                      </div>
                      <div className="d-flex gap-3 align-items-center flex-wrap">
                        <div className="d-flex align-items-center gap-1">
                          <img src="/assets/property-card-icon-1.svg" className='img-fluid' alt="location" />
                          <h6 className="property-management-card-icon-label m-0">4 floors</h6>
                        </div>
                        <div className='card-border-right'>|</div>
                        <div className="d-flex align-items-center gap-1">
                          <img src="/assets/property-card-icon-2.svg" className='img-fluid' alt="location" />
                          <h6 className="property-management-card-icon-label m-0">3 rooms</h6>
                        </div>
                        <div className='card-border-right'>|</div>
                        <div className="d-flex align-items-center gap-1">
                          <img src="/assets/property-card-icon-3.svg" className='img-fluid' alt="location" />
                          <h6 className="property-management-card-icon-label m-0">20 m</h6>
                        </div>
                        <div className='card-border-right'>|</div>
                        <div className="d-flex align-items-center gap-1">
                          <img src="/assets/property-card-icon-4.svg" className='img-fluid' alt="location" />
                          <h6 className="property-management-card-icon-label m-0">2 bathrooms</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <h6 className="property-problem-title mb-2 mt-2">Maintenance details</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
                <div className="d-flex align-items-center justify-content-between p-3 gap-2 w-100 materials-cards rounded-4 mb-3">
      <div className="d-flex w-100 align-items-start flex-column flex-md-row gap-2">
        <img src="/assets/problem-img-2.png" className='img-fluid materials-img' alt="location" />   
        <div className='d-flex flex-column gap-2 align-items-start w-100'>
          <div className="d-flex justify-content-between align-items-center w-100">
            <h6 className="property-problem-title mb-0">Nakheel Neighborhood Hotel</h6>
            <div className='new-badge px-2 p-1 rounded-2'>New</div>
          </div>
            <div className="d-flex align-items-center gap-1">
            <img src="/assets/location-2.svg" alt="location" />
            <p className="dashboard-home-card-2-desc-3 m-0">Riyadh, Al Narjis Neighborhood</p>
          </div>
            <div className="bnb-badge d-flex align-items-center gap-2 p-2 rounded-2">
              <img src="/assets/bnb.svg" alt="airbnb" />
              <span>airbnb</span>
            </div>
           <h6 className="property-problem-title mb-0 mt-2">Upholstery and carpet cleaning</h6>
          <div className="d-flex align-items-center gap-1">
            <img src="/assets/calendar-3.svg" alt="calendar" />
            <p className="dashboard-home-card-2-desc-3 m-0">June 12, 2026</p>
          </div>
          <div className="d-flex align-items-center gap-1">
            <img src="/assets/clock.svg" alt="clock" />
            <p className="dashboard-home-card-2-desc-3 mb-0">8:00 pm - 10:00 pm</p>
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
                        <div 
                          className="add-room-btn d-flex flex-column align-items-center justify-content-center gap-2" 
                          onClick={() => !isUploadingBefore && beforeInputRef.current.click()}
                          style={{ cursor: isUploadingBefore ? 'not-allowed' : 'pointer', opacity: isUploadingBefore ? 0.6 : 1 }}
                        >
                            {isUploadingBefore ? (
                              <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Uploading...</span>
                              </div>
                            ) : (
                              <>
                                <img src="/assets/gallery-add.svg" alt="gallery" />
                                <h6 className='table-time m-0'>Add room photos</h6>
                              </>
                            )}
                        </div>
                        {beforeImages.map((img, idx) => <img key={idx} src={URL.createObjectURL(img)} className='added-img' alt="uploaded" />)}
                    </div>
                    <input type="file" multiple accept="image/*" ref={beforeInputRef} onChange={handleBeforeUpload} style={{display: 'none'}} disabled={isUploadingBefore} />
                </div>
                <div className='rating-stars-bg p-2 rounded-2'>
                    <h3 className='form-label mb-2'>After cleaning</h3>
                    <div className="d-flex gap-2 align-items-center flex-wrap">
                        <div 
                          className="add-room-btn d-flex flex-column align-items-center justify-content-center gap-2" 
                          onClick={() => !isUploadingAfter && afterInputRef.current.click()}
                          style={{ cursor: isUploadingAfter ? 'not-allowed' : 'pointer', opacity: isUploadingAfter ? 0.6 : 1 }}
                        >
                            {isUploadingAfter ? (
                              <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Uploading...</span>
                              </div>
                            ) : (
                              <>
                                <img src="/assets/gallery-add.svg" alt="gallery" />
                                <h6 className='table-time m-0'>Add room photos</h6>
                              </>
                            )}
                        </div>
                        {afterImages.map((img, idx) => <img key={idx} src={URL.createObjectURL(img)} className='added-img' alt="uploaded" />)}

                    </div>
                    <input type="file" multiple accept="image/*" ref={afterInputRef} onChange={handleAfterUpload} style={{display: 'none'}} disabled={isUploadingAfter} />
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
            <h6 className="property-problem-title my-2">Problem description</h6>
              <div className="d-flex gap-3 align-items-center flex-wrap flex-sm-nowrap">
                <div className='training-card p-2 rounded-2'>
                    <p className='m-0 problem-desc'>Poor cooling has been reported in the air conditioner located in Office 204 on the second floor. The user noted that the air conditioner was not cooling sufficiently and that water was leaking from the indoor unit. Please check the filters and gas, and ensure that the pipes and connections are in good condition. A full test is recommended after maintenance to ensure efficient operation.</p>
                </div>
              </div>
        <div className="d-flex gap-2 align-items-center justify-content-between flex-wrap my-3">
                                      <div className="d-flex gap-2">
                <button className="sec-btn rounded-2 px-md-4 py-2">
                    Submit the order
                </button>
                <button className="btn btn-outline-danger py-2">Reject order</button>
                </div>
                      <button 
            type="submit" 
            className="sec-btn rounded-2 py-2 px-3 d-flex align-items-center justify-content-center gap-2 w-50-100"
          >
            <img src="/assets/key.svg" alt="key" />
            <span>smart key</span>
                        </button>
          </div>
        </div>
        )}
      </div>
    </section>
  );
};

export default CleanerMaintenanceDetailsMain;