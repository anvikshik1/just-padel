import React, { useState, useEffect } from 'react'
import Banner from "../images/banner_3.jpg";
import './booknow.css'
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import Footer from "../Footer/Footer"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faPhone, faClock } from '@fortawesome/free-solid-svg-icons';
import { loginUser } from "../Redux/Action/index";
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../CustomAxios';
import { environment } from '../../env';


function BookNow() {
  const [mainCourtData, setMainCourtData] = useState([]);
  const mainCourtURL = `${environment.baseUrl}maincourts`;

  useEffect(() => {
    axios.get(mainCourtURL)
      .then((response) => {
        setMainCourtData(response.data);
      })
      .catch((error) => {
        console.log("Error : " + error);
      })
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
          {
            mainCourtData.map((data, index) => {
              return (
                <div className="courts">
                  <img src={data?.maincourtimage} alt={data?.maincourtimage} className="padelImg" />
                  <div className="court-details-container">
                    <div className="court-details">
                      <div className="court-inner">
                        <div>
                          <h4>{data?.courtName}</h4>
                        </div>
                        <div className="court-icons">
                          <FontAwesomeIcon icon={faPhone} className="faPhone" />
                          <FontAwesomeIcon icon={faPaperPlane} className="faPaperPlane" />
                        </div>
                      </div>
                      <div className="court-count">
                        <h5>{data?.padelCourts} {data.courttype.courttype} Courts</h5>
                      </div>
                      <div className="court-time">
                        <FontAwesomeIcon icon={faClock} className="faClock" />
                        <h5>{data?.timeslot}</h5>
                      </div>
                      <div className="court-has">
                        <small>Outdoor</small>
                        {data?.features?.split(",").map((feature) => (
                          <small>{feature}</small>
                        ))}
                        
                      </div>
                      <Link className="book-btn" to={`/booking_list/${data.id}`}>
                        <h5>BOOK COURT</h5>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default BookNow
