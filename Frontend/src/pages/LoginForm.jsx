import React, { useState ,useContext} from "react";
import axios from "axios";
import { Appcontext } from '../context/Appcontext';
import { useNavigate, NavLink } from "react-router-dom";

const LoginForm = ({ toggleForm }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { islogin, Setislogin,setUser} = useContext(Appcontext);

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
      const response = await axios.post("http://localhost:5000/login", {
        username: formData.username,
        password: formData.password
      });
      if (response?.data?.message) {
  if (response.data.token) {
  localStorage.setItem("token", response.data.token);
setUser({
  username: response.data.username,
  role: response.data.role || "user",
});
localStorage.setItem(
  "user",
  JSON.stringify({
    username: response.data.username,
    role: response.data.role || "user",
  })
);

    setSuccessMessage("Login successful! Redirecting...");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }
} else {
        throw new Error("Unexpected response structure");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage("SQL lost");
    }
  };

  return (
    <div
      style={{
        display: 'flex',
         fontFamily: 'Ubuntu',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background:'radial-gradient(var(--background--),#509857)'
      }}
    >
      <div
        style={{
          width: '300px',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: '#e0f8e0',
          boxShadow: '0 0 10px rgba(0, 128, 0, 0.2)',
        }}
      >
        <h2 style={{ textAlign: 'center', color: '#2e8b57' }}>Login</h2>
        <form onSubmit={handleFormSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ color: '#2e8b57' }}>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '5px',
                borderRadius: '4px',
                border: '1px solid #2e8b57',
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ color: '#2e8b57' }}>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '5px',
                borderRadius: '4px',
                border: '1px solid #2e8b57',
              }}
              required
            />
          </div>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              color: '#ffffff',
              backgroundColor: '#2e8b57',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Login
          </button>
        </form>
        <p
          style={{
            marginTop: '10px',
            textAlign: 'center',
            color: '#2e8b57',
            cursor: 'pointer',
          }}
        >
          <NavLink style={{ textDecoration: 'none', color: 'inherit' }} to={'/signup'}>
            Don't have an account? Sign Up
          </NavLink>
        </p>  
      </div>
    </div>
  );
};

export default LoginForm;
