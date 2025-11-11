import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './../styles/Appointment.css';
import { Appcontext } from './../context/Appcontext';

const Appointment = () => {
  const [patients, setPatients] = useState([]);
  const { user } = useContext(Appcontext); // make sure you store the logged-in user in context

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/appointments');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);


  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:5000/appointments/${id}/approve`);
      alert("Appointment approved!");
      fetchPatients();
    } catch (err) {
      alert("Error approving appointment");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/appointments/${id}`);
      alert("Appointment deleted!");
      fetchPatients();
    } catch (err) {
      alert("Error deleting appointment");
    }
  };

  return (
    <div className='Appointment'>
      <div className="table">
        <h1>Appointments</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              {user?.username === "admin" && <th>Actions</th>}
            </tr>
          </thead>
<tbody>
  {patients.length > 0 ? (
    patients.map((p) => (
      <tr key={p._id}>
        <td data-label="Name">{p.name}</td>
        <td data-label="Age">{p.age}</td>
        <td data-label="Gender">{p.gender}</td>
        <td data-label="Address">{p.address}</td>
        <td data-label="Doctor">{p.doctor}</td>
        <td data-label="Date">{p.date}</td>
        <td data-label="Time">{p.time}</td>
        <td data-label="Status">{p.status || 'pending'}</td>
        {user?.username === "admin" && (
          <td data-label="Actions">
            <button onClick={() => handleApprove(p._id)} disabled={p.status === "approved"}>
              Approve
            </button>
            <button onClick={() => handleDelete(p._id)}>Delete</button>
          </td>
        )}
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="9">No appointments found</td>
    </tr>
  )}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default Appointment;
