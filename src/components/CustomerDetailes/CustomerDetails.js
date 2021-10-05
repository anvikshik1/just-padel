import React from 'react'
import './CustomerDetails.css';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'


const CustomerDetailes = () => {
    return (
      <>
      <Navbar/>
         <div className="calender-Container">
             <div className="inner-calender">
              <div className="inner-lhs">
                <div className="feild-detail">
                    <label htmlFor="name" className="form-label">Customer Name</label>
                    <input type="text" id="name"/>
                </div>
                <div className="feild-detail">
                    <label htmlFor="name" className="form-label">Customer Phone</label>
                    <input type="text" id="name"/>
                </div>
                <div className="feild-detail">
                    <label htmlFor="name" className="form-label">Additional Comments</label>
                    <textarea name="" id=""   className="textarea"></textarea>
                </div>
              </div>
              <div className="inner-rhs">
              <div className="textarea-rhs">
                <div className="feild-detail">
                  <label htmlFor="name" className="form-label">Customer Email</label>
                  <input type="text" id="name"/>
                </div>
                <div className="feild-detail">
                  <label htmlFor="name" className="form-label">Payment Type</label>
                  <input type="text" id="name"/>
                  </div>
                <div className="feild-detail">
                  <label htmlFor="name" className="form-label">Booked By</label>
                  <input type="text" id="name"/>
                </div>
                
              </div>
               <div className="submit-btns">
                  <Link  className="add">book Now</Link>
                  <Link className="cancel" to="/customer-details">Cancel</Link>
               </div>
              </div>
             </div>
         </div>
         </>
    )
}

export default CustomerDetailes;
