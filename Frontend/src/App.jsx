import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Navbar from './components/NavBar.jsx'
import Doctors from './pages/doctorsList.jsx'
import Login from './pages/LoginForm.jsx'
import SignUp from './pages/SignUp.jsx'
import Appointments from './pages/Appointment.jsx'
import GetAppointment from './pages/getappoint.jsx'
import './styles/App.css'


const App = () => {
  
  return (
    <>
    <Navbar/>
    <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/doctors' element={<Doctors/>}/>
     <Route path='/doctors/:speciality' element={<Doctors/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/signup' element={<SignUp/>}/>
     <Route path='/appointments' element={<Appointments/>}/>
     <Route path="/getappointment" element={<GetAppointment/>} />
    </Routes>
    </>
  )
}

export default App