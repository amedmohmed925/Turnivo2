import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getCleanServiceDetails } from '../../api/superviserCleaningApi';
import ProviderHeader from './ProviderHeader';

const DashboardCleaningDetailsMain = ({ onMobileMenuClick }) => {
  const [beforeImages, setBeforeImages] = useState([]);
  const [afterImages, setAfterImages] = useState([]);
  const beforeInputRef = useRef(null);
  const afterInputRef = useRef(null);
  const [searchParams] = useSearchParams();
  const [serviceDetails, setServiceDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleBeforeUpload = (e) => {
    const files = Array.from(e.target.files);
    setBeforeImages(prev => [...prev, ...files]);
  };

  const handleAfterUpload = (e) => {
    const files = Array.from(e.target.files);
    setAfterImages(prev => [...prev, ...files]);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        const id = searchParams.get('id');
        const accessToken = localStorage.getItem('access_token');

        if (!id) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Service ID is missing',
          });
          return;
        }

        if (!accessToken) {
          Swal.fire({
            icon: 'error',
            title: 'Authentication Required',
            text: 'Please login to continue',
          });
          return;
        }

        const response = await getCleanServiceDetails(accessToken, id);

        if (response.status === 1) {
          const detail = Array.isArray(response.data)
            ? response.data?.[0]?.items?.[0] || response.data?.[0]
            : response.data?.items?.[0] || response.data?.[0];
          setServiceDetails(detail || null);
        } else {
          setServiceDetails(null);
        }
      } catch (error) {
        console.error('Error fetching cleaning service details:', error);
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
  }, [searchParams]);



  if (isLoading) {
    return (
      <section>
        <div className="dashboard-home-content px-3 mt-5">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!serviceDetails) {
    return (
      <section>
        <div className="dashboard-home-content px-3 mt-5">
          <div className="text-center py-5">
            <p className="m-0">Service details not found.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <ProviderHeader title="Cleaning Details" onMobileMenuClick={onMobileMenuClick} />
      <div className="dashboard-home-content px-3 mt-2">
        <div className="row">
          <div className="col-12">
                            <h6 className="property-problem-title mb-2 mt-2">Maintenance details</h6>
                <div className="d-flex align-items-center justify-content-between p-3 gap-2 w-100 materials-cards rounded-4 mb-3">
      <div className="d-flex w-100 align-items-start flex-column flex-md-row gap-2">
        <img src={serviceDetails.property_id?.image || '/assets/problem-img-2.png'} className='img-fluid materials-img' alt="location" />   
        <div className='d-flex flex-column gap-2 align-items-start w-100'>
                                <div className="d-flex justify-content-between align-items-center w-100">
           <h6 className="property-problem-title mb-0 mt-2">{serviceDetails.clean_service_type_id?.name || 'Cleaning Service'}</h6>
            <div className='new-badge px-2 p-1 rounded-2'>{serviceDetails.status?.name || 'New'}</div>
          </div>
           <h6 className="property-problem-title mb-0 mt-2">{serviceDetails.property_id?.name || 'Property'}</h6>
          <div className="d-flex align-items-center gap-1">
            <img src="/assets/calendar-3.svg" alt="calendar" />
            <p className="dashboard-home-card-2-desc-3 m-0">{serviceDetails.date || 'N/A'}</p>
          </div>
          <div className="d-flex align-items-center gap-1">
            <img src="/assets/clock.svg" alt="clock" />
            <p className="dashboard-home-card-2-desc-3 mb-0">{serviceDetails.time_from && serviceDetails.time_to ? `${serviceDetails.time_from} - ${serviceDetails.time_to}` : 'N/A'}</p>
          </div>
            <h6 className="property-problem-title mb-0">{serviceDetails.property_id?.name || 'Property'}</h6>
            <div className="d-flex align-items-center gap-1">
            <img src="/assets/location-2.svg" alt="location" />
            <p className="dashboard-home-card-2-desc-3 m-0">{serviceDetails.property_id?.address || 'N/A'}</p>
          </div>
            <div className="d-flex align-items-center gap-1">
            <img src="/assets/more-square.svg" alt="location" />
            <p className="dashboard-home-card-2-desc-3 m-0">request number :</p>
            <p className="smart-access-title m-0">#{serviceDetails.id}</p>
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
                    <div className="row w-100 g-0 g-lg-2">
                      {serviceDetails.addition_service?.length ? (
                        serviceDetails.addition_service.map((add) => (
                          <div className="col-md-2 col-12 mb-3 col-20-per" key={add.id}>
                            <div className="bg-light-gray p-3 rounded-3 h-100 active">
                              <img src="/assets/service-img.png" className='img-fluid w-100' alt="service" />
                              <div className="d-flex justify-content-between align-items-center gap-1 mt-2">
                                <h3 className='dashboard-routes-sub m-0'>{add.addition_service?.name || 'Service'}</h3>
                                <div className='third-btn-sm p-1 rounded-2'>
                                  {add.addition_service?.price ? `$${add.addition_service.price}` : '$0'}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-12 mb-2">
                          <p className='dashboard-home-card-2-desc-3 m-0'>No additional services.</p>
                        </div>
                      )}
                    </div>
            <h6 className="property-problem-title my-2">Problem description</h6>
              <div className="d-flex gap-3 align-items-center flex-wrap flex-sm-nowrap">
                <div className='training-card p-2 rounded-2'>
                    <p className='m-0 problem-desc'>{serviceDetails.description || 'No description available.'}</p>
                </div>
              </div>
        <div className="d-flex gap-2 align-items-center justify-content-between flex-wrap my-3">
                      <button
  className="main-btn rounded-2 px-4 py-2 d-flex justify-content-center align-items-center gap-2 w-50-100"
  data-bs-toggle="modal"
  data-bs-target="#tempAccessModal"
>
    <img src="/assets/people.svg" alt="people" />
  resellect
                        </button>
                      <button 
            type="submit" 
            className="sec-btn rounded-2 py-2 px-3 d-flex align-items-center justify-content-center gap-2 w-50-100"
          >
            <img src="/assets/key.svg" alt="key" />
            <span>smart key</span>
                        </button>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default DashboardCleaningDetailsMain;