import React, { useEffect, useRef, useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { Appcontext } from "../context/Appcontext";
import { Menu, X } from "lucide-react";
import "./../styles/NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const NavRef = useRef(null);
  const { islogin, Setislogin } = useContext(Appcontext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    Setislogin(false);
    navigate("/");
    setMenuOpen(false);
  };

  useEffect(() => {
    if (NavRef.current) {
      gsap.fromTo(
        NavRef.current,
        { top: "-20vh" },
        { top: "0vh", duration: 2, ease: "power4.out" }
      );
    }

    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="Navbar" ref={NavRef}>
      <NavLink to="/" style={{ textDecoration: "none" }}>
        <div className="navleft">RH</div>
      </NavLink>

      {/* Mobile Menu Button */}
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={30} /> : <Menu size={30} />}
      </div>

      {/* Main Menu */}
      <div className={`navright ${menuOpen ? "open" : ""}`}>
        <ul>
          <NavLink
            to="/"
            style={{ textDecoration: "none" }}
            onClick={() => setMenuOpen(false)}
          >
            <li>Home</li>
             {!isMobile && (
            <li>Home</li>)}
          </NavLink>
          <NavLink
            to="/doctors"
            style={{ textDecoration: "none" }}
            onClick={() => setMenuOpen(false)}
          >
            <li>Doctors</li>
             {!isMobile && (
            <li>Doctors</li>)}
          </NavLink>
          <NavLink
            to="/appointments"
            style={{ textDecoration: "none" }}
            onClick={() => setMenuOpen(false)}
          >
            <li>Appointments</li>
             {!isMobile && (
            <li>Appointments</li>)}
          </NavLink>
        </ul>

        {isMobile && (
          <div className="prof">
            <NavLink to="/login" onClick={() => setMenuOpen(false)}>
              <li style={{ display: islogin ? "none" : "" }}>Sign in/log in</li>
            </NavLink>
            <li
              style={{ display: islogin ? "" : "none" }}
              onClick={handleSignOut}
            >
              Sign Out
            </li>
          </div>
        )}
      </div>

      {!isMobile && (
        <div className="prof">
          <NavLink to="/login" onClick={() => setMenuOpen(false)}>
            <li style={{ display: islogin ? "none" : "" }}>Sign in/log in</li>
          </NavLink>
          <li
            style={{ display: islogin ? "" : "none" }}
            onClick={handleSignOut}
          >
            Sign Out
          </li>
        </div>
      )}
    </div>
  );
};

export default NavBar;
