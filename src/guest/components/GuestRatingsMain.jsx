import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Person, Settings, Logout } from '@mui/icons-material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Link } from 'react-router-dom';

const GuestRatingsMain = () => {

  return (
    <section>
        <div className="container">
            <div className="dashboard-home-content px-3 mt-3">
                <h6 className="dashboard-routes-sub mb-2">Ratings</h6>
                                        <div className="mb-3 w-100">
                        <label className="form-label mb-1">temp code</label>
                        <input
                        type="text"
                        className="form-control rounded-2 py-2 px-3 w-100"
                        placeholder="Enter code"
                        />
                    </div>
                    <div className="d-flex">
                    <div className="rating-stars-bg p-3 rounded-3 d-flex gap-2 align-items-center mb-3">
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                        <FontAwesomeIcon icon={faStar} />
                    </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                        <div className="mb-3 w-100">
                        <label htmlFor="propertyType" className="form-label mb-1">
                            Service quality
                        </label>

                        <div className="position-relative">
                            <select
                            id="propertyType"
                            className="form-select custom-select-bs py-2"
                            defaultValue=""
                            required
                            >
                            <option value="" disabled>
                                Select Service quality
                            </option>
                            <option value="Excellent cleaning">Excellent cleaning</option>
                            </select>

                            {/* Bootstrap Icon */}
                            <i className="bi bi-chevron-down select-bs-icon"></i>
                        </div>
                        </div>
                    </div>
                        <div className="col-12">
                        <div className="mb-3 w-100">
                        <label htmlFor="notes" className="form-label mb-1">Feedback</label>
                        <textarea name="notes" id="notes" rows="4" className="form-control rounded-2 py-2 w-100" placeholder='Great and fast service! Booking was easy and the team is very professional. I will definitely order the service again!'></textarea>
                        </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <button className="edit-btn rounded-2 px-5 py-2 w-100 border-0">
                                    Rating
                                </button>
                            </div>
                            <div className="col-md-6">
                                <button className="delete-btn rounded-2 px-5 py-2 w-100 border-0">
                                    Cancel
                                </button>

                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </section>
  );
};

export default GuestRatingsMain;