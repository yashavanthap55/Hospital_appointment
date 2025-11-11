import React from 'react';
import './../assets/assets_frontend/assets.js'
import {useNavigate} from 'react-router-dom'
import { assets } from './../assets/assets_frontend/assets.js';

const createacc = () => {
  const navigate=useNavigate();
  const login=()=>{
    navigate('/login',scrollTo(0,0))
  }
  return (
    <div id='createacc' style={{position:'relative',
        width:'100%',
        height:'70%',
        top:'100vh',
        display:'flex',
        justifyContent:'center',    
        alignItems:'center'
    }}>
        <div className="imagecontainer" style={{height:'70%',fontFamily: "Plus Jakarta Sans",width:'70%',backgroundColor:'#2E8B57',position:'relative',borderRadius:'30px',alignItems:'start',display:'flex',cursor:'default'}}>
            <div className="text" style={{height:"100%",width:'50%',position:'relative',padding:'5vw 0 0 5vw',color:'#000'}}>
            <h1 >Book appointment</h1>
            <h1 style={{margin:'1.5vw 0 3vw 0'}}>With 100% Trusted Doctors</h1>
            <div className="button" style={{width:'7vw',height:'3vw',backgroundColor:'var(--background--)',borderRadius:'20px',padding:'15px 25px',display:'flex',justifyContent:'center',alignItems:'center',color:'#000'}} onClick={login}>
                Create Account
            </div>
            </div>
         <div className="img" style={{width:'50%',height:'120%',position:'relative',transform:'translateY(-75px)'}}>
            <img src={assets.appointment_img} alt="appointment" />
         </div>
        </div>
    </div>
  )
}

export default createacc