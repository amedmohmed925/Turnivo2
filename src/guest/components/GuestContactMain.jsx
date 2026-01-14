import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Person, Settings, Logout } from '@mui/icons-material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Link } from 'react-router-dom';

const GuestContactMain = () => {
 


  return (
    <section>
        <div className="container">
            <div className="dashboard-home-content px-3 mt-3">
                <h6 className="dashboard-routes-sub m-0">Contact us</h6>
                    <div className="d-flex align-items-center gap-2 my-3">
                        <div className="service-desc mb-2 mt-2">Welcome to Customer Service</div>
                        <img src="../assets/user.png" className='provider-rate' alt="user" />
                        <div>
                            <h6 className='popup-title m-0'>Omar Alrajihi</h6>
                            <h6 className="dashboard-routes-sub m-0 mt-1">2024/09/28</h6>
                        </div>
                    </div>
                    <p className='contact-desc m-0 mb-3'>Do you have questions? Feel free to reach out to us for support or more information about on next stay. Our team is ready to answer all your queries.</p>
                    <div className="row">
                        <div className="col-12">
                        <div className="mb-3 w-100">
                                            <input
                            type="email"
                            className="form-control rounded-2 py-2 px-3 w-100"
                            placeholder="E-mail address*"
                        />
                        </div>
                    </div>
                        <div className="col-12">
                        <div className="mb-3 w-100">
                        <textarea name="notes" id="notes" rows="6" className="form-control rounded-2 py-2 w-100" placeholder='Share your issues or queries here'></textarea>
                        </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mb-3">
                                <button className="sec-btn rounded-2 px-5 py-2 w-100 border-0">
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </section>
  );
};

export default GuestContactMain;