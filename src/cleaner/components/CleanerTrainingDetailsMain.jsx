import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import {faBookmark as faBookmark} from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import CleanerHeader from './CleanerHeader';
const CleanerTrainingDetailsMain = ({ onMobileMenuClick }) => {


  return (
    <section>
      <CleanerHeader title="Training Details" onMobileMenuClick={onMobileMenuClick} />
      <div className="dashboard-home-content px-3 mt-2">
        <div className="row g-0 g-lg-2 mt-3">
          <div className="col-12 mb-2">
  <div className="">
    <img
      src="/assets/training-card-img.png"
      className="training-details-card-img img-fluid w-100 rounded-2"
      alt="card-img"
    />

    <div className="card-body p-2 d-flex flex-column">
            {/* icons */}
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <ThumbDownOffAltOutlinedIcon />
          <ThumbUpOffAltOutlinedIcon />
        </div>

        <div className="d-flex align-items-center gap-3">
          <FontAwesomeIcon icon={faDownload} className="fs-5" />
          <FontAwesomeIcon icon={faBookmark} className="fs-5" />
        </div>
      </div>
      <div className="training-card-title mb-2">
        Develop an organized cleaning plan
      </div>

      <div className="training-details-card-desc mb-2">
        Cleaning your home is essential for maintaining a clean and healthy environment, but it can be overwhelming if not well-organized. In this guide, we will outline steps and tips to help you clean your home efficiently and easily.
      </div>
      <div className="training-card-sub-title mb-2">
        1. Creating an Organized Cleaning Plan
      </div>
      <div className="training-details-card-desc mb-2">
       Before you start, identify the tasks that need to be completed. You can divide them by room or by type of work (such as floor cleaning, dusting, and organizing). This will help you save time and effort.
      </div>
      <div className="training-card-sub-title mb-2">
        2. Using the Right Tools
      </div>
      <div className="training-details-card-desc">
       For effective cleaning, make sure you have the following supplies:
      </div>
      <ul>
        <li className="training-details-card-desc">
              Mop and floor cleaning products
        </li>
        <li className="training-details-card-desc">
              Antibacterial cleaning wipes
        </li>
        <li className="training-details-card-desc">
              Cleaning brush and multipurpose spray bottle
        </li>
        <li className="training-details-card-desc">
              Vacuum cleaner or hand broom
        </li>
        <li className="training-details-card-desc">
              Garbage bags
        </li>
      </ul>
            <div className="training-card-sub-title mb-2">
        3. Regular Cleaning to Keep Your Home Tidy
      </div>
      <div className="training-details-card-desc">
       Schedule daily cleaning for simple tasks like organizing items and wiping surfaces. <br />
Dedicate one day a week for deep cleaning each room. <br />
Don’t postpone small tasks to prevent them from piling up.
      </div>

    </div>
  </div>
            </div>


        </div>
        
      </div>
    </section>
  );
};

export default CleanerTrainingDetailsMain;