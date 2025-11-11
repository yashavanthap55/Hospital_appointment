import React, { useEffect, useRef,useContext } from 'react'
import './../styles/NavBar.css'
import {NavLink,useNavigate} from 'react-router-dom'
import gsap from 'gsap';
import { Appcontext } from '../context/Appcontext';


const NavBar = () => {
  const navigate=useNavigate();
 const NavRef=useRef(null);
 const { islogin, Setislogin } = useContext(Appcontext);
 const handleSignOut=()=>{
  localStorage.removeItem('token');
  Setislogin(false);
  navigate('/');
 };

 useEffect(() => {
  if (NavRef.current) {
    gsap.fromTo(
      NavRef.current,
      { top: '-20vh' },
      { top: '0vh', duration: 2,ease: "power4.out" }
    );
  }
}, []); 
  return (
    <div className='Navbar' ref={NavRef}>
      <NavLink to='/' style={{textDecoration:'none'}}><div className="navleft">
      RH
      </div></NavLink>
      <div className="navright">
       <ul>
        <NavLink to='/' style={{textDecoration:'none'}}>
          <li>Home</li>
          <li>Home</li>
        </NavLink>
        <NavLink to='/doctors' style={{textDecoration:'none'}}>
          <li>Doctors</li>
          <li>Doctors</li>
        </NavLink>
        <NavLink to='/appointments' style={{textDecoration:'none'}}>
          <li>Appointments</li>
          <li>Appointments</li>
        </NavLink>
       </ul>
      </div>
      <div className="prof">
        <NavLink to='/login'><li style={{display:islogin?'none':''}}>Sign in/log in</li></NavLink>
        <li style={{display:islogin?'':'none'}} onClick={handleSignOut}>Sign Out</li>
      </div>
    </div>
  )
}

export default NavBar;