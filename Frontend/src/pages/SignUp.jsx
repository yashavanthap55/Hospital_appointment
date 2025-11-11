import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Appcontext } from './../context/Appcontext';

const SignUp = () => {
  const navigate = useNavigate();
  const { Setislogin } = useContext(Appcontext);
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!formData.username || !formData.password) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/signup", {
        username: formData.username,
        password: formData.password
      });
      
      if (response?.data?.message) {
        setSuccessMessage("Username is available!");
        Setislogin(true); 
        navigate('/'); 
      } else {
        throw new Error("Unexpected response structure");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage(error.response?.data?.error || "An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'radial-gradient(var(--background--),#509857)', fontFamily: 'Ubuntu' }}>
      <div style={{ width: '300px', padding: '20px', borderRadius: '8px', backgroundColor: '#e0f8e0', boxShadow: '0 0 10px rgba(0, 128, 0, 0.2)' }}>
        <h2 style={{ textAlign: 'center', color: '#2e8b57' }}>Sign Up</h2>
        <form onSubmit={handleFormSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ color: '#2e8b57' }}>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #2e8b57' }}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ color: '#2e8b57' }}>Password:</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px', border: '1px solid #2e8b57' }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                style={{ position: 'absolute', right: '10px', top: '8px', background: 'none', border: 'none', color: '#2e8b57', cursor: 'pointer' }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          <button
            type="submit"
            style={{ width: '100%', padding: '10px', color: '#ffffff', backgroundColor: '#2e8b57', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Create account
          </button>
        </form>
        <p style={{ marginTop: '10px', textAlign: 'center', color: '#2e8b57', cursor: 'pointer' }}>
          <NavLink style={{ textDecoration: 'none', color: 'inherit' }} to={'/login'}>
            Already have an account? Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
