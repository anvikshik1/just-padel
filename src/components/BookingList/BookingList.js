import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './bookingList.css'
import 'react-calendar/dist/Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'

function BookongList() {
    const [value, onChange] = useState(new Date());
    return (
        <div>
        <Navbar/>
          <div className="calender-Container">
            <div className="inner-calender">
               <div className="inner-lhs">
                    <Calendar
                    minDate={new Date()}
                    value={value}
                    />
                <div className="select-time">
                    <h2>Select Time</h2>
                    <select className="timeSlot">
                        <option> Select Time Slot</option>
                        <option>10:00 am to 12:30am</option>
                        <option>10:00 am to 12:30am</option>
                    </select>
                </div>
                <div className="select-inc-dec">
                <h3>Select Mins</h3>
                 <FontAwesomeIcon icon={faMinusCircle}  className="faMinus"/>
                <small>0 Mins</small>
                 <FontAwesomeIcon icon={faPlusCircle}  className="faPlus"/>
                </div>
               </div>
               <div className="inner-rhs">
                 <h3>Select the Date to view the time slots.</h3>
                 <div className="cart">
                     <div className="clild-cart">
                         <h5 className="number">1</h5>
                         <h5 className="doors">INDOOR</h5>
                         <h5 className="ladies-only">LADIES ONLY</h5>
                     </div>
                     <div className="clild-cart">
                         <h5 className="number">1</h5>
                         <h5 className="doors">INDOOR</h5>
                         <h5 className="ladies-only">LADIES ONLY</h5>
                     </div>
                     <div className="clild-cart">
                         <h5 className="number">1</h5>
                         <h5 className="doors">INDOOR</h5>
                         <h5 className="ladies-only">LADIES ONLY</h5>
                     </div>
                     <div className="clild-cart">
                         <h5 className="number">1</h5>
                         <h5 className="doors">INDOOR</h5>
                         <h5 className="ladies-only">LADIES ONLY</h5>
                     </div>
                     <div className="clild-cart">
                         <h5 className="number">1</h5>
                         <h5 className="doors">INDOOR</h5>
                         <h5 className="ladies-only">LADIES ONLY</h5>
                     </div>
                     <div className="clild-cart">
                         <h5 className="number">1</h5>
                         <h5 className="doors">INDOOR</h5>
                         <h5 className="ladies-only">LADIES ONLY</h5>
                     </div>
                     <div className="clild-cart">
                         <h5 className="number">1</h5>
                         <h5 className="doors">INDOOR</h5>
                         <h5 className="ladies-only">LADIES ONLY</h5>
                     </div>
                 </div>
                 <div className="submit-btns">
                    <Link to="/booking-addons" className="add">Add to Cart</Link>
                    <button className="cancel">Cancel</button>
                 </div>
               </div>
            </div>
          </div>
        </div>
    )
}

export default BookongList


