import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRightLong} from '@fortawesome/free-solid-svg-icons'
import {faCommentDots} from '@fortawesome/free-regular-svg-icons'
const GuestListMain = () => {
  const inputRefs = useRef([]);

  // Focus the first input when component mounts
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  return (
    <div className="min-vh-100 py-5">
      <div className="container ">
        <div className="row justify-content-center">
          <div className="col-lg-3 col-md-6 mb-3">
            <Link to='/guest/my-ratings' className="text-decoration-none shadow guest-list-card bg-white d-flex flex-column align-items-start justify-content-center gap-3 h-100">
                <div className="guest-list-bg d-flex align-items-center justify-content-center">
                    <img src="../assets/medal-star.svg" alt="Ratings" />
                </div>
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <h2 className="mb-0 dashboard-title">Ratings services</h2>
                        <FontAwesomeIcon icon={faArrowRightLong} />
                    </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-6 mb-3">
            <Link to='/guest/report-problem' className="text-decoration-none shadow guest-list-card bg-white d-flex flex-column align-items-start justify-content-center gap-3 h-100">
                <div className="guest-list-bg d-flex align-items-center justify-content-center">
                    <img src="../assets/broom.svg" alt="Report" />
                </div>
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <h2 className="mb-0 dashboard-title">Report a problem</h2>
                        <FontAwesomeIcon icon={faArrowRightLong} />
                    </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-6 mb-3">
            <Link to='/guest/contact' className="text-decoration-none shadow guest-list-card bg-white d-flex flex-column align-items-start justify-content-center gap-3 h-100">
                <div className="guest-list-bg d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon icon={faCommentDots} style={{color:'#292760'}} />
                </div>
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <h2 className="mb-0 dashboard-title">Contact us</h2>
                        <FontAwesomeIcon icon={faArrowRightLong} />
                    </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-6 mb-3">
            <Link to='/guest/login' className="text-decoration-none shadow guest-list-card bg-white d-flex flex-column align-items-start justify-content-center gap-3 h-100">
                <div className="guest-list-bg d-flex align-items-center justify-content-center">
                    <img src="../assets/logout.svg" alt="logout" />
                </div>
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <h2 className="mb-0 dashboard-title">check out</h2>
                        <FontAwesomeIcon icon={faArrowRightLong} />
                    </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestListMain;