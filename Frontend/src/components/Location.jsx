import React, { useLayoutEffect, useRef } from 'react';
import './../styles/Location.css';
import gs from './../assets/glucose_stand.png';
import rb from './../assets/radial_bottom.png';
import loc from "./../assets/location.png";
import MRI from './MRI';
import gsap from 'gsap';

const Location = () => {
  const rightRef = useRef(null); // Create a reference for the right div

  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              rightRef.current, 
              { width: '0%' },
              { width: '60%', duration: 1,ease: "circ.out" }
            );
          }
        });
      },
      { threshold: 0.0}
    );

    if (rightRef.current) {
      observer.observe(rightRef.current); // Observe the right div
    }

    return () => {
      if (rightRef.current) {
        observer.unobserve(rightRef.current); // Clean up the observer
      }
    };
  }, []);

  return (
    <div className='Location' id='Location'>
      <div className="right" ref={rightRef}> {/* Attach the ref here */}
        <a href="https://maps.app.goo.gl/FnhgSDz2CV3ye6ty5" target='_blank' rel="noopener noreferrer">
          <img src={loc} alt="Location" />
        </a>
      </div>
      <div className="left">
        <img src={gs} alt="Glucose Stand" />
      </div>
      <div className="bottom">
        <img src={rb} alt="Radial Bottom" />
      </div>
    </div>
  );
};

export default Location;
