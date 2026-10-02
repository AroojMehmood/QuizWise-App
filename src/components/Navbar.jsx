import {NavLink} from "react-router";
import { useState } from "react";
import "./Navbar.css" ;
export const Navbar = ()=>{
  const [isMenuOpen, setIsMenuOpen] = useState(false);
return(
<div >
    <nav className="navbar">
  <span className="app-logo">
  <span className="logo-icon-box">
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinejoin="round"/>
  </svg>
</span>
  <span className="logo-text">
    Quiz<span className="logo-accent">Wise</span>
  </span>

</span>

<button className="hamburger-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
    ☰
  </button>
   <div className={`nav-links ${isMenuOpen ? "nav-links-open" : ""}`}>
      <NavLink to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
    <NavLink to="/quiz" className="nav-link" onClick={() => setIsMenuOpen(false)}>Quiz</NavLink>
    <NavLink to="/dashboard" className="nav-link" onClick={() => setIsMenuOpen(false)}>Dashboard</NavLink>
  </div>
</nav>
</div>
);
};