import React from "react";
import "./../styles/footer.css";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="scg">
        <svg
          id="wave"
          viewBox="0 0 1440 170"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="sw-gradient-0"
              x1="0"
              x2="0"
              y1="1"
              y2="0"
            >
              <stop stopColor="var(--primary_green--)" offset="0%"></stop>
              <stop stopColor="var(--primary_green--)" offset="100%"></stop>
            </linearGradient>
          </defs>
          <path
            fill="url(#sw-gradient-0)"
            d="M0,85L30,82.2C60,79,120,74,180,62.3C240,51,300,34,360,45.3C420,57,480,96,540,119C600,142,660,147,720,130.3C780,113,840,74,900,73.7C960,74,1020,113,1080,119C1140,125,1200,96,1260,73.7C1320,51,1380,34,1440,34C1500,34,1560,51,1620,48.2C1680,45,1740,23,1800,34C1860,45,1920,91,1980,99.2C2040,108,2100,79,2160,65.2C2220,51,2280,51,2340,68C2400,85,2460,119,2520,119C2580,119,2640,85,2700,68C2760,51,2820,51,2880,48.2C2940,45,3000,40,3060,56.7C3120,74,3180,113,3240,133.2C3300,153,3360,153,3420,138.8C3480,125,3540,96,3600,85C3660,74,3720,79,3780,79.3C3840,79,3900,74,3960,76.5C4020,79,4080,91,4140,90.7C4200,91,4260,79,4290,73.7L4320,68L4320,170L0,170Z"
          ></path>
        </svg>
      </div>
      <div className="main">
        <div className="rvu">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate
          modi aut.
        </div>
        <div className="redirect">
          <h2>Home</h2>
          <h2>About us</h2>
          <h2>Contact us</h2>
          <h2>Privacy policy</h2>
        </div>
        <div className="gic">
          <h2>+91 8484545545</h2>
          <h2>rvu@edu.in</h2>
        </div>
      </div>
      <div className="copyright">
        <p>copyright © 2024 RV Hospital-All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
