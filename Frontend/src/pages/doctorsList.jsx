import React, { useContext, useEffect, useState } from 'react';
import './../styles/doctorsList.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Appcontext } from '../context/Appcontext';

const DoctorsList = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const { doctors } = useContext(Appcontext); 

  const appointmentClicked = () => {
    navigate(`/getappointment`);
  };

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);  


  return (
    <div className='doctorsList'>
      <p className='brows' style={{ color: 'var(--primary_green--)'}}>Browse through the doctors specialist</p>
      <div className="flex">
        <div className='special'>
          <p onClick={() => navigate('/doctors/General physician')}>General physician</p>
          <p onClick={() => navigate('/doctors/Gynecologist')}>Gynecologist</p>
          <p onClick={() => navigate('/doctors/Dermatologist')}>Dermatologist</p>
          <p onClick={() => navigate('/doctors/Pediatricians')}>Pediatricians</p>
          <p onClick={() => navigate('/doctors/Neurologist')}>Neurologist</p>
          <p onClick={() => navigate('/doctors/Gastroenterologist')}>Gastroenterologist</p>
        </div>

        <div className='flex2'>
          {
            filterDoc.map((item, index) => (
              <div className='p1' key={index}>
                <div className="img"><img src={item.image} alt={item.name} /></div>
                <div className='p2'>
                  <div className='p3'>
                    <p style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: 'var(--background--)' }}></p>
                    <p style={{ color: 'var(--background--)' }}>Available</p>
                  </div>
                  <div className="p4" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="r">
                      <p style={{ fontSize: '1.3vw', fontWeight: '700', color: '#50C878' }}>{item.name}</p>
                      <p style={{ color: '#17B169' }}>{item.speciality}</p>
                    </div>
                    <div className="l">
                      <p style={{ color: 'var(--background--)', cursor: 'pointer' }} onClick={() => appointmentClicked()}>Book</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default DoctorsList;
