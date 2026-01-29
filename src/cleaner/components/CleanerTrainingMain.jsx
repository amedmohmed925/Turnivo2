import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import {faBookmark as faBookmark} from '@fortawesome/free-regular-svg-icons'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from 'react-router-dom';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import CleanerHeader from './CleanerHeader';
const CleanerTrainingMain = ({ onMobileMenuClick }) => {


  return (
    <section>
      <CleanerHeader title="Training" onMobileMenuClick={onMobileMenuClick} />
      <div className="dashboard-home-content px-3 mt-2">
        <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap">
                      <div className="search-input-wrapper mt-2">
            <SearchOutlinedIcon className="search-icon" />
            <input
              type="text"
              className="search-gray-input form-control"
              placeholder="Find a request..."
            />
          </div>
        </div>
        <div className="row g-0 g-lg-2 mt-3">
          <div className="col-md-6 mb-2">
  <Link to='/cleaner/training-details' className="card text-decoration-none rounded-top-4 h-100 training-card">
    <img
      src="/assets/training-card-img.png"
      className="training-card-img img-fluid w-100 rounded-top-4"
      alt="card-img"
    />

    <div className="card-body p-2 d-flex flex-column">
      <div className="training-card-title mb-2">
        Develop an organized cleaning plan
      </div>

      <div className="training-card-desc mb-2">
        Cleaning your home is an essential task for maintaining a clean and healthy environment,
        but it can be overwhelming if not organized properly.
      </div>

      {/* icons */}
      <div className="card-actions d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <ThumbDownOffAltOutlinedIcon />
          <ThumbUpOffAltOutlinedIcon />
        </div>

        <div className="d-flex align-items-center gap-3">
          <FontAwesomeIcon icon={faDownload} className="fs-5" />
          <FontAwesomeIcon icon={faBookmark} className="fs-5" />
        </div>
      </div>
    </div>
  </Link>
            </div>
          <div className="col-md-6 mb-2">
  <Link to='/cleaner/training-details' className="card text-decoration-none rounded-top-4 h-100 training-card">
    <img
      src="/assets/training-card-img.png"
      className="training-card-img img-fluid w-100 rounded-top-4"
      alt="card-img"
    />

    <div className="card-body p-2 d-flex flex-column">
      <div className="training-card-title mb-2">
        Develop an organized cleaning plan
      </div>

      <div className="training-card-desc mb-2">
        Cleaning your home is an essential task for maintaining a clean and healthy environment,
        but it can be overwhelming if not organized properly. 
      </div>

      {/* icons */}
      <div className="card-actions d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <ThumbDownOffAltOutlinedIcon />
          <ThumbUpOffAltOutlinedIcon />
        </div>

        <div className="d-flex align-items-center gap-3">
          <FontAwesomeIcon icon={faDownload} className="fs-5" />
          <FontAwesomeIcon icon={faBookmark} className="fs-5" />
        </div>
      </div>
    </div>
  </Link>
            </div>
          <div className="col-md-6 mb-2">
  <Link to='/cleaner/training-details' className="card text-decoration-none rounded-top-4 h-100 training-card">
    <img
      src="/assets/training-card-img.png"
      className="training-card-img img-fluid w-100 rounded-top-4"
      alt="card-img"
    />

    <div className="card-body p-2 d-flex flex-column">
      <div className="training-card-title mb-2">
        Develop an organized cleaning plan
      </div>

      <div className="training-card-desc mb-2">
        Cleaning your home is an essential task for maintaining a clean and healthy environment,
        but it can be overwhelming if not organized properly. 
      </div>

      {/* icons */}
      <div className="card-actions d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <ThumbDownOffAltOutlinedIcon />
          <ThumbUpOffAltOutlinedIcon />
        </div>

        <div className="d-flex align-items-center gap-3">
          <FontAwesomeIcon icon={faDownload} className="fs-5" />
          <FontAwesomeIcon icon={faBookmark} className="fs-5" />
        </div>
      </div>
    </div>
  </Link>
            </div>
          <div className="col-md-6 mb-2">
  <Link to='/cleaner/training-details' className="card text-decoration-none rounded-top-4 h-100 training-card">
    <img
      src="/assets/training-card-img.png"
      className="training-card-img img-fluid w-100 rounded-top-4"
      alt="card-img"
    />

    <div className="card-body p-2 d-flex flex-column">
      <div className="training-card-title mb-2">
        Develop an organized cleaning plan
      </div>

      <div className="training-card-desc mb-2">
        Cleaning your home is an essential task for maintaining a clean and healthy environment,
        but it can be overwhelming if not organized properly. 
      </div>

      {/* icons */}
      <div className="card-actions d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <ThumbDownOffAltOutlinedIcon />
          <ThumbUpOffAltOutlinedIcon />
        </div>

        <div className="d-flex align-items-center gap-3">
          <FontAwesomeIcon icon={faDownload} className="fs-5" />
          <FontAwesomeIcon icon={faBookmark} className="fs-5" />
        </div>
      </div>
    </div>
  </Link>
            </div>


        </div>
        
      </div>
    </section>
  );
};

export default CleanerTrainingMain;