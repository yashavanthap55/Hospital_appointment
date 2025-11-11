import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './../styles/getappointment.css';
import { doctors } from '../assets/assets_frontend/assets.js';
import axios from 'axios';
import { Appcontext } from './../context/Appcontext';

const GetAppointment = () => {
  const navigate = useNavigate(); 
  const { islogin, Setislogin } = useContext(Appcontext);

  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    address: '',
    doctor: '',  
    date: '',  
    time: ''    
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    if (id === "doctor") {
      setSelectedDoctor(value);  
      setFormData((prevData) => ({ ...prevData, doctor: value })); 
    } else {
      setFormData((prevData) => ({ ...prevData, [id]: value }));
    }
  };  

  const isFormValid = formData.name && formData.age && formData.gender && formData.address && formData.doctor && formData.date && formData.time;

const handleSubmit = async (event) => {
  event.preventDefault();
  if (!isFormValid) return;

  try {
    const response = await axios.post("http://localhost:5000/getappointment", formData);

    if (response?.data?.message) {
      alert("Appointment booked successfully!");
      navigate('/appointments');
    } else {
      throw new Error("Unexpected response structure");
    }
  } catch (error) {
    console.error("Submission error:", error);
    if (error.response?.data?.error === "Doctor already booked at this time.") {
      alert("That doctor is already booked at this time!");
    } else {
      alert("⚠️ Something went wrong. Please try again.");
    }
  }
};


  return (
    <div className='upper'>
      {!islogin && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'background: radial-gradient(var(--background--),#509857)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection:'column',
          color: 'white',
          fontSize: '24px',
        }}>
          <p style={{color:'var(--primary_green--)',marginBottom:'25px'}}>You need to have an account to book an appointment.</p>
          <button 
            onClick={() => navigate('/login')}
            style={{
              padding: '10px 20px',
              backgroundColor: 'white',
              color: 'green',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Go to Login
          </button>
        </div>
      )}

      {islogin && (
        <div className='get-appointment'>
          <h2>Get Appointment</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              value={formData.age}
              onChange={handleChange}
              required
            />

            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <label htmlFor="doctor">Choose a Doctor:</label>
            <select
              id="doctor"
              value={formData.doctor}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select a doctor</option>
              {doctors.map((doctor, index) => (
                <option key={doctor.id || index} value={doctor.name}>
                  {doctor.name}
                </option>
              ))}
            </select>

            <label htmlFor="date">Appointment Date:</label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <label htmlFor="time">Appointment Time:</label>
            <input
              type="time"
              id="time"
              value={formData.time}
              onChange={handleChange}
              required
            />

            {!isFormValid && (
              <p style={{ color: 'red', marginTop: '10px' }}>
                Please fill out all fields to book an appointment.
              </p>
            )}

            <button
              type="submit"
              disabled={!isFormValid}
              style={{
                opacity: isFormValid ? 1 : 0.5,
                cursor: isFormValid ? 'pointer' : 'not-allowed'
              }}
            >
              Book Appointment
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default GetAppointment;
