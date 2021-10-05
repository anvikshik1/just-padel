import './App.css';
import Navbar from './components/Navbar/Navbar'
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

function App() {
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
           <Route exact path="/booking_list" component={BookingList}/>
           <Route exact path="/booking-addons" component={BookingAddons}/>
           <Route exact path="/customer-details" component={CustomerDetails}/>
           <Route exact path="/footer" component={Footer}/>
        </Switch>
    </BrowserRouter>
    </div>
  );
}

export default App;
