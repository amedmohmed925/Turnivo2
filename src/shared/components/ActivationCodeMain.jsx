import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ActivationCodeMain = () => {
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  // Focus the first input when component mounts
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Handle input change
  const handleChange = (index, e) => {
    const value = e.target.value;
    
    // Only allow numbers
    if (isNaN(value)) return;
    
    // Update the OTP values
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    
    // Move to the next input if a value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle key down for backspace
  const handleKeyDown = (index, e) => {
    // If backspace is pressed and the current input is empty, move to the previous input
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    
    // Check if pasted data is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const newOtpValues = pastedData.split('');
      setOtpValues(newOtpValues);
      
      // Focus the last input
      inputRefs.current[5].focus();
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const otp = otpValues.join('');
    
    // Validate that all fields are filled
    if (otp.length !== 6) {
      alert('Please enter all 6 digits');
      return;
    }
    
    // Process the OTP
    console.log('OTP submitted:', otp);
    // Here you would typically send the OTP to your server for verification
  };

  return (
    <div className="min-vh-100 d-flex align-items-center">
      <div className="container p-0">
        <div className="row g-0 min-vh-100 justify-content-center">
          
          {/* Right side - Form */}
          <div className="col-lg-5 mt-3 p-3">
            <div className='d-flex align-items-center justify-content-center bg-white shadow-sm rounded-3 h-100'>
              <div className="w-100 p-md-5 p-3" style={{ maxWidth: '450px' }}>
                {/* Logo */}
                <div className="text-center">
                  <img 
                    src="../assets/logo.png" 
                    alt="Logo" 
                    height="70" 
                    className="mb-3 img-fluid"
                  />
                </div>
                
                {/* Title and Description */}
                <div className="text-center">
                  <h2 className="mb-3 login-title">Enter the activation code</h2>
                  <p className="login-description">Please enter the 6-character code sent To your email </p>
                </div>
                
                {/* OTP Form */}
                <form onSubmit={handleSubmit}>
                  {/* OTP Input Fields */}
                  <div className="d-flex justify-content-between gap-1 gap-md-2 mb-4">
                    {otpValues.map((value, index) => (
                      <input
                        key={index}
                        type="text"
                        className="form-control text-center otp-input"
                        value={value}
                        onChange={(e) => handleChange(index, e)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={index === 0 ? handlePaste : undefined}
                        ref={(el) => (inputRefs.current[index] = el)}
                        maxLength="1"
                        required
                      />
                    ))}
                  </div>
                  
                  {/* Login Button */}
                  <Link to='/login' 
                    type="submit" 
                    className="sec-btn w-100 rounded-2 py-2 text-center text-decoration-none"
                  >
                    Confirm
                  </Link>
                </form>
                
                {/* Sign up link */}
                <div className="text-center mt-3">
                  <p className="mb-0 not-have">
                    Resend the code in{' '}
                    <Link to="/register" className="text-decoration-none login-create-account">
                      58s
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

export default ActivationCodeMain;