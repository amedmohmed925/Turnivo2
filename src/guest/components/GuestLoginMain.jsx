import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const GuestLoginMain = () => {
  const inputRefs = useRef([]);

  // Focus the first input when component mounts
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  return (
    <div className="min-vh-100 d-flex align-items-center">
      <div className="container p-0">
        <div className="row g-0 min-vh-100 justify-content-center">
          
          {/* Right side - Form */}
          <div className="col-lg-5 mt-3 p-3">
            <div className='d-flex align-items-center justify-content-center bg-white shadow-sm rounded-3 h-100'>
              <div className="w-100 p-4">
                {/* Logo */}
                <div className="text-center">
                  <img 
                    src="/assets/logo.png" 
                    alt="Logo" 
                    height="70" 
                    className="mb-3 img-fluid"
                  />
                </div>
                
                {/* Title and Description */}
                <div className="text-center">
                  <h2 className="mb-3 login-title">Get your smart lock code</h2>
                  <p className="login-description">Welcome back!</p>
                </div>
                
                {/* OTP Form */}
                <form>
                  {/* OTP Input Fields */}
                                  <div className="mb-3">
                  <label htmlFor="email" className="form-label mb-1">Email Address</label>
                  <input
                    type="email"
                    className="form-control rounded-2 py-2 px-3"
                    id="email"
                    placeholder="Enter your email"
                  />
                </div>
                                  <div className="mb-3">
                  <label htmlFor="code" className="form-label mb-1">temp code</label>
                  <input
                    type="text"
                    className="form-control rounded-2 py-2 px-3"
                    id="code"
                    placeholder="Enter code"
                  />
                </div>
                  
                  {/* Login Button */}
                  <Link to='/guest/login-successfuly' 
                    type="submit" 
                    className="sec-btn w-100 rounded-2 py-2 text-center text-decoration-none"
                  >
                    sign in
                  </Link>
                </form>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestLoginMain;