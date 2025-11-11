import React, { useContext, useEffect, useRef, useState } from 'react';
import './../styles/Home.css';
import tree from './../assets/tree.js';
import gsap from 'gsap';
import MRI from '../components/MRI.jsx';
import Location from '../components/Location.jsx';
import Footer from './../components/footer.jsx';
import Createacc from '../components/createacc.jsx';
import { Appcontext } from '../context/Appcontext';

const Home = () => {
  const homeRef = useRef(null);
  const firstBranchRef = useRef(null);
  const secondBranchRef = useRef(null);
  const thirdBranchRef = useRef(null);
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);
  const textRef4 = useRef(null);  
  const cursorRef = useRef(null);
  const [scaleCursor, setScaleCursor] = useState(false);

  const { islogin, Setislogin } = useContext(Appcontext);

  useEffect(() => {
    if (firstBranchRef.current) {
      gsap.fromTo(firstBranchRef.current, { rotation: 120 }, { rotation: 70, duration: 2 });
    }

    if (secondBranchRef.current) {
      gsap.fromTo(
        secondBranchRef.current,
        { right: '-30vw', rotation: -50 },
        { right: '-13vw', duration: 2, ease: "circ.out", rotation: 10 }
      );
    }

    if (thirdBranchRef.current) {
      gsap.fromTo(
        thirdBranchRef.current,
        { rotation: -20, right: '-5vh' },
        { rotation: 0, right: '-10px', duration: 3, ease: "circ.out" }
      );
    }

    if (textRef1.current) {
      gsap.fromTo(
        textRef1.current,
        { marginLeft: '25vw', opacity: 0 },
        { marginLeft: '0vw', opacity: 1, duration: 2, ease: "elastic.out(1,0.3)", delay: 0.3 }
      );
    }
    if (textRef2.current) {
      gsap.fromTo(
        textRef2.current,
        { marginRight: '25vw', opacity: 0 },
        { marginRight: '0vw', opacity: 1, duration: 2, ease: "elastic.out(1,0.3)", delay: 0.3 }
      );
    }

    if (textRef3.current) {
      gsap.fromTo(
        textRef3.current,
        { marginLeft: '25vw', opacity: 0 },
        { marginLeft: '0vw', opacity: 1, duration: 2, ease: "elastic.out(1,0.3)", delay: 0.3 }
      );
    }
    if (textRef4.current) {
      gsap.fromTo(
        textRef4.current,
        { marginRight: '25vw', opacity: 0 },
        { marginRight: '0vw', opacity: 1, duration: 2, ease: "elastic.out(1,0.3)", delay: 0.3 }
      );
    }

  }, []);
  
  const handleScale = () => {
    setScaleCursor(true);
  };

  const dishandleScale = () => {
    setScaleCursor(false);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      gsap.to(".cursor", {
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
        duration: 0.7,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.pageX}px`;
        cursorRef.current.style.top = `${e.pageY}px`;
      }
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <div className='Home' ref={homeRef}>
      <div className="branches">
        <div className="firstbranch" ref={firstBranchRef}>
          <img src={tree[0]} alt="First branch" />
        </div>
        <div className="secondbranch" ref={secondBranchRef}>
          <img src={tree[1]} alt="Second branch" />
        </div>
        <div className="thirdbranch" ref={thirdBranchRef}>
          <img src={tree[2]} alt="Third branch" />
        </div>
        <div className="center">
          <h1 ref={textRef1}>GET</h1>
          <h1 ref={textRef2} onMouseEnter={handleScale} onMouseLeave={dishandleScale}>APPOINTMENT</h1>
        </div>
        <div className="center-overlay">
          <h1 ref={textRef3} onMouseEnter={handleScale} onMouseLeave={dishandleScale}>GET</h1>
          <h1 ref={textRef4} onMouseEnter={handleScale} onMouseLeave={dishandleScale}>APPOINTMENT</h1>
        </div>
      </div>
      <div className="cursor" style={{ scale: scaleCursor ? '2' : '1' }}></div>
      <div className="custom-cursor" ref={cursorRef}></div>
      <MRI />
      <Location />
      {!islogin && <Createacc />}
      <Footer />
    </div>
  );
};

export default Home;
