import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import Logo from '../images/Just-Padel-Logo.png'

function Navbar() {
    return (
        <div>
            <div className="nav-components">
            <div className="nav-inner">
              <div className="logo-container">
                <img src={Logo} alt="justpadel.logo" width={250}/>
              </div>
              <div className="Navbar">
                  <ul>
                      <li>
                        <Link to="/" className="navName">Home</Link>
                      </li>
                      <li>
                        <Link to="/aboutus" className="navName">About Us</Link>
                      </li>
                      <li>
                        <Link to="/courts" className="navName">Courts</Link>
                      </li>
                      <li>
                        <Link to="/events" className="navName">Events</Link>
                      </li>
                      <li>
                        <Link to="/contactus" className="navName">Contact Us</Link>
                      </li>
                  </ul>
              </div>
              <div className="nav-btn-container">
                <Link to="/booknow" className="bookNow-btn">BOOK NOW!</Link>
              </div>
            </div>
            </div>
        </div>
    )
}

export default Navbar

