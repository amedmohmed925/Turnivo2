import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginMain = () => {
  const [email, setEmail] = useState('');

  return (
    <div className="min-vh-100 d-flex align-items-center">
      <div className="container p-0">
        <div className="row g-0 min-vh-100">
          {/* Left side - Image */}
          <div className="col-lg-7 mt-3 p-3 d-none d-lg-block">
            <div 
              className="h-100 d-flex align-items-center justify-content-center rounded-3"
              style={{
                backgroundImage: `url('../assets/login.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor: '#f8f9fa'
              }}
            >
              <div className="text-center d-flex justify-content-center align-items-center p-4 w-100 h-100" style={{ backgroundColor: '#FFFFFF33', borderRadius: '10px' }}>
                <img 
                  src="../assets/logo.png" 
                  alt="Logo" 
                  height="180" 
                  className="mb-3"
                />
              </div>
            </div>
          </div>
          
          {/* Right side - Form */}
          <div className="col-lg-5 mt-3 p-3">
            <div className='d-flex align-items-start justify-content-center bg-white shadow-sm rounded-3 h-100'>
            <div className="w-100 p-4" style={{ maxWidth: '450px' }}>
              {/* Logo */}
              <div className="text-center">
                <img 
                  src="../assets/logo.png" 
                  alt="Logo" 
                  height="70" 
                  className="mb-3"
                />
              </div>
              
              {/* Title and Description */}
              <div className="text-center">
                <h2 className="mb-3 login-title">Login with ONS</h2>
                <p className="login-description">Welcome back! Please log in to continue</p>
              </div>
              
              {/* Login Form */}
              <form>
                {/* Email Input */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label mb-1">Email Address</label>
                  <input
                    type="email"
                    className="form-control rounded-2 py-2 px-3"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                
                {/* Login Button */}
                <Link to='/client/dashboard' 
                  type="submit" 
                  className="sec-btn w-100 rounded-2 py-2 text-center text-decoration-none"
                >
                  Log in
                </Link>
              </form>
              
              {/* Sign up link */}
              <div className="text-center mt-3">
                <p className="mb-0 not-have">
                  Don't have an account?{' '}
                  <Link to="/activation-code" className="text-decoration-none login-create-account">
                    Create an account
                  </Link>
                </p>
              </div>
            </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginMain;