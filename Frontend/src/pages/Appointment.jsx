import React,{useEffect,useState} from 'react'
import './../styles/Appointment.css'


const Appointment = () => {
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('http://localhost:5000/appointments');
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };
    fetchPatients();
  }, []);
  
  return (
    <div className='Appointment'>
      <div className="table">
        <h1>table</h1>
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
            </tr>
          </thead>
          <tbody>
            {patients.length > 0 ? (
              patients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.address}</td>
                  <td>{patient.doctor}</td>
                  <td>{patient.date}</td>
                  <td>{patient.time}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">SQL connection lost</td>
              </tr>
            )}
          </tbody>
          </table>
      </div>
    </div>
  )
}

export default Appointment
