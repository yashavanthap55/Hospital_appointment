import React, { useEffect, useLayoutEffect, useRef } from 'react';
import './../styles/MRI.css';
import * as THREE from 'three';
import Location from './Location';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { AmbientLight, DirectionalLight } from 'three';
import { log, rotate } from 'three/webgpu';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const MRI = () => {
  const mriRef = useRef(null);
  const containerRef = useRef(null);
  useEffect(() => {
    let listItems = [...document.querySelectorAll('.righttext li')];

    let options = {
      rootMargin: '0%',
      threshold: 0.0
    };

    let observer = new IntersectionObserver(showItem, options);

    function showItem(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let letters = [...entry.target.querySelectorAll('span')];
          letters.forEach((letter, idx) => {
            setTimeout(() => {
              letter.classList.add('active');
            }, idx * 30);
          });
          entry.target.children[0].classList.add('active');
        }
      });
    }

    listItems.forEach(item => {
      if (item.children.length > 0) {
        let newString = '';
        let itemText = item.children[0].innerText.split('');
        itemText.forEach(letter => {
          newString += letter === ' ' ? `<span class='gap'> </span>` : `<span>${letter}</span>`;
        });
        item.innerHTML = newString;
        observer.observe(item);
      } else {
        console.warn('No child found for item', item);
      }
    });

    return () => observer.disconnect(); // Clean up observer
  }, []);

  useLayoutEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              '.svgback',
              {x:-100},
              {x:0, duration: 1, ease: 'power2.out' }
            );
          }
        });
      },
      { threshold: 0.3 }
    );

    if (mriRef.current) {
      observer.observe(mriRef.current);
    }

    return () => {
      if (mriRef.current) {
        observer.unobserve(mriRef.current);
      }
    };
  }, []);

  // THREE.js logic
  useLayoutEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const ambientLight = new AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const topLight = new DirectionalLight(0xffffff, 1);
    topLight.position.set(5, 5, 5);
    scene.add(topLight);

    const loader = new GLTFLoader();
    loader.load(
      '/3D_model/hospital_bed.glb',
      (gltf) => {
        const bed = gltf.scene;
        bed.position.set(-3, -1, 0);
        bed.rotation.y = 1.5;
        scene.add(bed);
      },
      (xhr) => {},
      (error) => {
        console.error('An error occurred', error);
      }
    );

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [containerRef]);


  return (
    <div className="MRI" id='MRI' ref={mriRef}>
      <svg 
        id="wave" 
        style={{ transition: '0.3s', position: 'absolute', width: '100%', top: '-50vh', left: '0' }} 
        viewBox="0 20 1440 490" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
            <stop stopColor="#2E8B57" offset="0%" />
            <stop stopColor="#2E8B57" offset="100%" />
          </linearGradient>
        </defs>
        <path 
          style={{ opacity: 1 }} 
          fill="url(#sw-gradient-0)" 
          d="M0,294L48,310.3C96,327,192,359,288,351.2C384,343,480,294,576,294C672,294,768,343,864,367.5C960,392,1056,392,1152,359.3C1248,327,1344,261,1440,245C1536,229,1632,261,1728,269.5C1824,278,1920,261,2016,245C2112,229,2208,212,2304,220.5C2400,229,2496,261,2592,253.2C2688,245,2784,196,2880,171.5C2976,147,3072,147,3168,187.8C3264,229,3360,310,3456,285.8C3552,261,3648,131,3744,130.7C3840,131,3936,261,4032,310.3C4128,359,4224,327,4320,334.8C4416,343,4512,392,4608,408.3C4704,425,4800,408,4896,351.2C4992,294,5088,196,5184,196C5280,196,5376,294,5472,318.5C5568,343,5664,294,5760,245C5856,196,5952,147,6048,130.7C6144,114,6240,131,6336,179.7C6432,229,6528,310,6624,310.3C6720,310,6816,229,6864,187.8L6912,147L6912,490L6864,490C6816,490,6720,490,6624,490C6528,490,6432,490,6336,490C6240,490,6144,490,6048,490C5952,490,5856,490,5760,490C5664,490,5568,490,5472,490C5376,490,5280,490,5184,490C5088,490,4992,490,4896,490C4800,490,4704,490,4608,490C4512,490,4416,490,4320,490C4224,490,4128,490,4032,490C3936,490,3840,490,3744,490C3648,490,3552,490,3456,490C3360,490,3264,490,3168,490C3072,490,2976,490,2880,490C2784,490,2688,490,2592,490C2496,490,2400,490,2304,490C2208,490,2112,490,2016,490C1920,490,1824,490,1728,490C1632,490,1536,490,1440,490C1344,490,1248,490,1152,490C1056,490,960,490,864,490C768,490,672,490,576,490C480,490,384,490,288,490C192,490,96,490,48,490L0,490Z"
        />
      </svg>
       <div className="svgback">
 <svg id="sw-js-blob-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
      <stop id="stop1" stopColor="var(--background--)" offset="0%"></stop>
      <stop id="stop2" stopColor="var(--background--)" offset="100%"></stop>
    </linearGradient>
    <filter id="inner-shadow">
      <feComponentTransfer in="SourceAlpha">
        <feFuncA type="table" tableValues="1 0" />
      </feComponentTransfer>
      <feGaussianBlur stdDeviation="3" />
      <feOffset dx="0" dy="0" />
      <feFlood floodColor="rgba(0, 0, 0, 0.5)" />
      <feComposite in2="SourceAlpha" operator="in" />
      <feMerge>
        <feMergeNode />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
  <path 
    fill="url(#sw-gradient)" 
    d="M23.1,-30.2C30.9,-26.2,38.9,-20.7,40.6,-13.6C42.3,-6.5,37.7,2.1,33.6,9.7C29.5,17.4,25.9,24,20.3,27.8C14.8,31.6,7.4,32.5,0.1,32.4C-7.2,32.3,-14.5,31.1,-20.6,27.5C-26.7,23.9,-31.6,17.9,-33.9,11C-36.1,4.1,-35.6,-3.6,-34.3,-12.2C-32.9,-20.7,-30.8,-30.1,-24.9,-34.7C-19.1,-39.4,-9.5,-39.4,-0.9,-38.1C7.7,-36.8,15.3,-34.2,23.1,-30.2Z"
    width="100%" 
    height="100%" 
    transform="translate(50 50)" 
    strokeWidth="0" 
    style={{ transition: '0.3s', opacity: 0.8 }}  // Decrease opacity to 80%
    filter="url(#inner-shadow)"  // Apply inner shadow filter
  />
</svg>
 </div>
 <div className="righttext">
 <ul >
    <li><span>Online Booking</span></li>
    <li><span>Experienced Staff</span></li>
    <li><span>Timely Care</span></li>
    <li><span>Compassionate Team</span></li>
    <li><span>24/7 Service</span></li>
    <li><span>Modern Facilities</span></li>
    <li><span>Personalized Care</span></li>
    <li><span>Efficient Management</span></li>
    <li><span>Trusted Patients</span></li>
</ul>
 </div>
      <div ref={containerRef} className="container3D">     
      </div>
    </div>
  );
}

export default MRI;