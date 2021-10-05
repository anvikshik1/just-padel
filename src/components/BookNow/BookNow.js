import React, { useState,useEffect } from 'react'
import Banner from "../images/banner_3.jpg"
import PadelOne from "../images/Rectangle-124.png"
import PadelTwo from "../images/Rectangle-125.png"
import PadelThree from "../images/Rectangle-126.png"
import Padelfour from "../images/Rectangle-130.png"
import Padelfive from "../images/Rectangle-131.png"
import Padelsix from "../images/image00003.jpeg"
import Padelseven from "../images/Greenfield-International-School.jpeg"
import './booknow.css'
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import Footer from "../Footer/Footer"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faPhone, faClock } from '@fortawesome/free-solid-svg-icons';
import { loginUser } from "../Redux/Action/index";
import { useDispatch, useSelector } from 'react-redux';


function BookNow() {
  const dispatch = useDispatch();
  const loginCreadentials = {
    email: "justpadel_admin@gmail.com",
    password: "justpadel@2021"
  };
  
  // const logger = useSelector((state) => state.log.LoggedUser);
  // console.log("Logger", logger);
  const handleSubmit = () => {
    dispatch(loginUser(loginCreadentials.email, loginCreadentials.password));
  }
  const Userlist = useSelector((state) => state.LoginReducers.LoggedUser);
  // const logged = useSelector((state) => state.RegistrationReducer.logged);
  
  useEffect(() => {
    console.log("Userdetails",Userlist);
    console.log("Userdetails");
  }, [])
  return (
    <div>
      <Navbar />
      <div className="banner-container">
        <div className="img-container">
          <img src={Banner} alt="justpadel.logo" className="banner" />
          <div className="background-overlay"></div>
          <div className="padel-title">
            <h1>PADEL COURT LOCATIONS</h1>
          </div>
        </div>
        <div className="booking-containers">
          <div className="courts">
            <img src={PadelOne} alt="justpadel.logo" className="padelImg" />
            <div className="court-details-container">
              <div className="court-details">
                <div className="court-inner">
                  <div>
                    <h4>Mina Rashid</h4>
                  </div>
                  <div className="court-icons">
                    <FontAwesomeIcon icon={faPhone} className="faPhone" />
                    <FontAwesomeIcon icon={faPaperPlane} className="faPaperPlane" />
                  </div>
                </div>
                <div className="court-count">
                  <h5>7 Indoor Courts</h5>
                </div>
                <div className="court-time">
                  <FontAwesomeIcon icon={faClock} className="faClock" />
                  <h5>6:00 am to 12:15 am</h5>
                </div>
                <div className="court-has">
                  <small>Indoor</small>
                  <small>Fully Air Conditioned</small>
                </div>
                <Link className="book-btn" to="/booking_list">
                  <h5>BOOK COURT</h5>
                </Link>
              </div>
            </div>
          </div>

          <div className="courts">
            <img src={PadelTwo} alt="justpadel.logo" className="padelImg" />
            <div className="court-details-container">
              <div className="court-details">
                <div className="court-inner">
                  <div>
                    <h4>Kite Beach</h4>
                  </div>
                  <div className="court-icons">
                    <FontAwesomeIcon icon={faPhone} className="faPhone" />
                    <FontAwesomeIcon icon={faPaperPlane} className="faPaperPlane" />
                  </div>
                </div>
                <div className="court-count">
                  <h5>2 Outdoor Courts</h5>
                </div>
                <div className="court-time">
                  <FontAwesomeIcon icon={faClock} className="faClock" />
                  <h5>6:00 am to 12:15 am</h5>
                </div>
                <div className="court-has">
                  <small>Outdoor</small>
                  <small>Equipment Rental</small>
                </div>
                <Link className="book-btn" to="/booking_list">
                  <h5>BOOK COURT</h5>
                </Link>
              </div>
            </div>
          </div>

          <div className="courts">
            <img src={PadelThree} alt="justpadel.logo" className="padelImg" />
            <div className="court-details-container">
              <div className="court-details">
                <div className="court-inner">
                  <div>
                    <h4>Kent College</h4>
                  </div>
                  <div className="court-icons">
                    <FontAwesomeIcon icon={faPhone} className="faPhone" />
                    <FontAwesomeIcon icon={faPaperPlane} className="faPaperPlane" />
                  </div>
                </div>
                <div className="court-count">
                  <h5>2 Outdoor Courts</h5>
                </div>
                <div className="court-time">
                  <FontAwesomeIcon icon={faClock} className="faClock" />
                  <h5>4:30 am to 12:00 am</h5>
                </div>
                <div className="court-has">
                  <small>Outdoor</small>
                  <small>Equipment Rental</small>
                </div>
                <Link className="book-btn" to="/booking_list">
                  <h5>BOOK COURT</h5>
                </Link>
              </div>
            </div>
          </div>

          <div className="courts">
            <img src={Padelfour} alt="justpadel.logo" className="padelImg" />
            <div className="court-details-container">
              <div className="court-details">
                <div className="court-inner">
                  <div>
                    <h4>Uptown School</h4>
                  </div>
                  <div className="court-icons">
                    <FontAwesomeIcon icon={faPhone} className="faPhone" />
                    <FontAwesomeIcon icon={faPaperPlane} className="faPaperPlane" />
                  </div>
                </div>
                <div className="court-count">
                  <h5>3 Outdoor Courts</h5>
                </div>
                <div className="court-time">
                  <FontAwesomeIcon icon={faClock} className="faClock" />
                  <h5>4:30 pm to 12.:00 am</h5>
                </div>
                <div className="court-has">
                  <small>Indoor</small>
                  <small>Fully Air Conditioned</small>
                </div>
                <Link className="book-btn" to="/booking_list">
                  <h5>BOOK COURT</h5>
                </Link>
              </div>
            </div>
          </div>

          <div className="courts">
            <img src={Padelfive} alt="justpadel.logo" className="padelImg" />
            <div className="court-details-container">
              <div className="court-details">
                <div className="court-inner">
                  <div>
                    <h4>Ripe Market</h4>
                  </div>
                  <div className="court-icons">
                    <FontAwesomeIcon icon={faPhone} className="faPhone" />
                    <FontAwesomeIcon icon={faPaperPlane} className="faPaperPlane" />
                  </div>
                </div>
                <div className="court-count">
                  <h5>2 Outdoor Courts</h5>
                </div>
                <div className="court-time">
                  <FontAwesomeIcon icon={faClock} className="faClock" />
                  <h5>6:00 am to 12:00 am</h5>
                </div>
                <div className="court-has">
                  <small>Indoor</small>
                  <small>Fully Air Conditioned</small>
                </div>
                <Link className="book-btn" to="/booking_list">
                  <h5>BOOK COURT</h5>
                </Link>
              </div>
            </div>
          </div>
          <div className="courts">
            <img src={Padelsix} alt="justpadel.logo" className="padelImg" />
            <div className="court-details-container">
              <div className="court-details">
                <div className="court-inner">
                  <div>
                    <h4>Arab Unity School</h4>
                  </div>
                  <div className="court-icons">
                    <FontAwesomeIcon icon={faPhone} className="faPhone" />
                    <FontAwesomeIcon icon={faPaperPlane} className="faPaperPlane" />
                  </div>
                </div>
                <div className="court-count">
                  <h5>2 Outdoor Courts</h5>
                </div>
                <div className="court-time">
                  <FontAwesomeIcon icon={faClock} className="faClock" />
                  <h5>Sun to Fri: 5:00 pm to 11:00 pm</h5>
                </div>
                <div className="court-time-second">
                  <FontAwesomeIcon icon={faClock} className="faClock" />
                  <h5>Sat: 6:00 am to 11:00 pm</h5>
                </div>
                <div className="court-has-time">
                  <small>Indoor</small>
                  <small>Fully Air Conditioned</small>
                </div>
                <Link className="book-btn" to="/booking_list">
                  <h5>BOOK COURT</h5>
                </Link>
              </div>
            </div>
          </div>
          <div className="courts">
            <img src={Padelseven} alt="justpadel.logo" className="padelImg" />
            <div className="court-details-container">
              <div className="court-details">
                <div className="court-inner">
                  <div>
                    <h4>Greenfield International School</h4>
                  </div>
                  <div className="court-icons">
                    <FontAwesomeIcon icon={faPhone} className="faPhone" />
                    <FontAwesomeIcon icon={faPaperPlane} className="faPaperPlane" />
                  </div>
                </div>
                <div className="court-count">
                  <h5>2 Outdoor Courts</h5>
                </div>
                <div className="court-time">
                  <FontAwesomeIcon icon={faClock} className="faClock" />
                  <h5>4:30 pm to 12.:00 am</h5>
                </div>
                <div className="court-has-title">
                  <small>Indoor</small>
                  <small>Fully Air Conditioned</small>
                </div>
                <Link className="book-btn" to="/booking_list">
                  <h5>BOOK COURT</h5>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default BookNow
