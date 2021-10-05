import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt,faMinusCircle,faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import './bookingAddon.css';
import Navbar from '../Navbar/Navbar'

function BookongList(){
    return (
        <div>
        <Navbar/>
          <div className="calender-Container">
            <div className="inner-calender">
               <div className="inner-lhs">
                  <div className="my-court-head">
                    <h2>Just Padel - My Cart</h2>
                  </div>
                <div className="my-court">
                  <div className="myCourt-inner-container">
                      <div className="myCourt-details" >
                          <h5 className="court-numbers">Mina Rashid - Court 7</h5>
                          <h5 class="court-timing">2021-10-01 10:30 AM-11:15 AM AED 22</h5>
                      </div>
                      <div>
                        <button className="remove-btn"><FontAwesomeIcon icon={faTrashAlt}  className="faTrashAlt"/>Remove</button>
                      </div>
                  </div>
                  <div className="myCourt-inner-container">
                      <div className="myCourt-details" >
                          <h5 className="court-numbers">Mina Rashid - Court 7</h5>
                          <h5 class="court-timing">2021-10-01 10:30 AM-11:15 AM AED 22</h5>
                      </div>
                      <div>
                        <button className="remove-btn"><FontAwesomeIcon icon={faTrashAlt}  className="faTrashAlt"/> Remove</button>
                      </div>
                  </div>
                  <div className="myCourt-inner-container">
                      <div className="myCourt-details" >
                          <h5 className="court-numbers">Mina Rashid - Court 7</h5>
                          <h5 class="court-timing">2021-10-01 10:30 AM-11:15 AM AED 22</h5>
                      </div>
                      <div>
                        <button className="remove-btn"><FontAwesomeIcon icon={faTrashAlt}  className="faTrashAlt"/> Remove</button>
                      </div>
                  </div>
                </div>
                 
                  <div className="my-court-head">
                    <h2>Add On's</h2>
                  </div>
                <div className="addons">
                    <div className="addons-content">
                     <div className="inner-addons">
                          <input name="isGoing" type="checkbox"/>
                        <div className="rents">
                          <h2>Rent Ball</h2>
                          <small>(set of 3 balls)</small>
                          <h3>Qty.</h3>
                        </div>
                     </div>
                     <div className="addons-minuts">
                          <h4>AED 15</h4>
                          <div className="select-minuts">
                            <FontAwesomeIcon icon={faMinusCircle}  className="faMinus"/>
                            <small>0</small>
                            <FontAwesomeIcon icon={faPlusCircle}  className="faPlus"/>
                          </div>
                     </div>
                    </div>
                    <div className="addons-content">
                     <div className="inner-addons">
                          <input name="isGoing" type="checkbox"/>
                        <div className="rents">
                          <h2>Rent Ball</h2>
                          <small>(set of 3 balls)</small>
                          <h3>Qty.</h3>
                        </div>
                     </div>
                     <div className="addons-minuts">
                          <h4>AED 15</h4>
                          <div className="select-minuts">
                            <FontAwesomeIcon icon={faMinusCircle}  className="faMinus"/>
                            <small>0</small>
                            <FontAwesomeIcon icon={faPlusCircle}  className="faPlus"/>
                          </div>
                     </div>
                    </div>
                    <div className="addons-content">
                     <div className="inner-addons">
                          <input name="isGoing" type="checkbox"/>
                        <div className="rents">
                          <h2>Rent Ball</h2>
                          <small>(set of 3 balls)</small>
                          <h3>Qty.</h3>
                        </div>
                     </div>
                     <div className="addons-minuts">
                          <h4>AED 15</h4>
                          <div className="select-minuts">
                            <FontAwesomeIcon icon={faMinusCircle}  className="faMinus"/>
                            <small>0</small>
                            <FontAwesomeIcon icon={faPlusCircle}  className="faPlus"/>
                          </div>
                     </div>
                    </div>
                </div>
               </div>

                    
               <div className="inner-rhs">
               <div className="coupan-code">
                    <div className="my-court-head-rhs">
                        <h2>Apply Coupon Code</h2>
                    </div>
                    <div className="coupan-input">
                            <input type="text" placeholder="Coupan code" />
                            <button>Apply</button>
                    </div>
                    <div></div>
                    <div className="my-court-head-rhs">
                        <h2>Total Amount</h2>
                    </div>
                    <div className="total-amount">
                        <div className="total-details">
                            <div>Amount</div>
                            <div>AED 660</div>
                        </div>
                        <div className="total-details">
                            <div>VAT 5%</div>
                            <div>AED 33</div>
                        </div>
                        <div className="total-details">
                            <div>Total Amount</div>
                            <div>AED 693.00</div>
                        </div>
                        <div className="total-details">
                            <div>discounted price</div>
                            <div>AED 0.00</div>
                        </div>
                    </div>
               </div>
               <div className="submit-btns">
                  <Link  className="add">back</Link>
                  <Link className="cancel" to="/customer-details">Next</Link>
               </div>
               </div>
            </div>
          </div>
        </div>
    )
}

export default BookongList


