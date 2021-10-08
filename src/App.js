import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import AboutUs from './components/AboutUs/AboutUs';
import Courts from './components/Courts/Courts';
import Events from './components/Events/Events';
import ContactUs from './components/ContactUs/ContactUs';
import BookNow from './components/BookNow/BookNow';
import BookingList from './components/BookingList/BookingList';
import BookingAddons from './components/BookingAddons/BookingAddon';
import CustomerDetails from './components/CustomerDetailes/CustomerDetails';
import Footer from './components/Footer/Footer';
import axios from "axios";
import { environment } from '../src/env';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "../src/components/Redux/Action/index";
import React, { useEffect, useState } from 'react'
import Payment from './components/Payment/payment';

function App() {
  const dispatch = useDispatch();
  const loginCreadentials = {
    email: "justpadel_admin@gmail.com",
    password: "justpadel@2021"
  };

  const handleSubmit = () => {
    const loginUrl = `${environment.baseUrl}api/user/login/`;
    axios.post(loginUrl, loginCreadentials)
      .then((response) => {
        dispatch(loginUser(response.data.access,response.data.role,response.data.userid,response.data.username));
      })
      .catch((error) => {
        console.log("Error", error);
      })
  };

  useEffect(() => {
    handleSubmit();
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        
        <Switch>
           <Route exact path="/" component={Home}/>
           <Route exact path="/aboutus" component={AboutUs}/>
           <Route exact path="/courts" component={Courts}/>
           <Route exact path="/events" component={Events}/>
           <Route exact path="/contactus" component={ContactUs}/>
           <Route exact path="/BookNow" component={BookNow}/>
           <Route exact path="/booking_list/:id" component={BookingList}/>
           <Route exact path="/booking-addons" component={BookingAddons}/>
           <Route exact path="/customer-details" component={CustomerDetails}/>
           <Route exact path="/footer" component={Footer}/>
           <Route exact path="/payment" component={Payment} />
        </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
