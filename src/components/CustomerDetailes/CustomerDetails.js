import React, { useState, useEffect } from 'react'
import './CustomerDetails.css';
import Navbar from '../Navbar/Navbar';
import { LoginMethod, RegistrationMethod, VerifyEmail } from "../HOC/logic";
import { useDispatch } from 'react-redux';
import { loginUser } from "../Redux/Action/index";


const CustomerDetailes = () => {
  const dispatch = useDispatch();
  const [loginDetails, setloginDetails] = useState({ loginEmail: '', loginPassword: '' });
  const [loginError, setLoginError] = useState({ ErrorMessage: "Please Provide Valid Credentials", error: false });
  const [registrationDetails, setRegistrationDetails] = useState({ first_name: '', email: '', phone_no: '', password: '', cnf_password: '', source: 'website' });
  const [registrationSuccessMessage, setRegistrationSuccessMessage] = useState({ SuccessMessage: "Registration Done Successfully, Please Login Now", success: false });
  const [emailExistsMessage, setEmailExistsMessage] = useState({ Message: "Email is already exist", error: false });

  /*------------------------------ This function used for handle login change  ------------------------------*/
  function handleLoginChange(event) {
    const { name, value } = event.target;
    setloginDetails({ ...loginDetails, [name]: value });
  };

  /*------------------------------ This function used for login  ------------------------------*/
  const handleLogin = () => {
    LoginMethod(loginDetails.loginEmail, loginDetails.loginPassword).then((response) => {
      if (response.error_code === 24) {
        setLoginError({ ErrorMessage: "Please Provide Valid Credentials", error: true });
      } else {
        setLoginError({ ErrorMessage: "Please Provide Valid Credentials", error: false });
        dispatch(loginUser(response.access, response.role, response.userid, response.username));
      }
    });
  }

  /*------------------------------ This function used for handle login change  ------------------------------*/
  function handleRegistrationChange(event) {
    const { name, value } = event.target;
    setRegistrationDetails({ ...registrationDetails, [name]: value });
  };

  const handleRegistration = () => {
    if (registrationDetails.first_name === '' || registrationDetails.email === '' || registrationDetails.phone_no === '' || registrationDetails.password === '') {
      alert("Please Enter The Details Below");
    } else if (registrationDetails.password !== registrationDetails.cnf_password) {
      alert("Please Enter the password that match corrcetly");
    } else {
      VerifyEmail(registrationDetails.email)
        .then((response) => {
          if (response.data.Message === "Email already Exists") {
            setEmailExistsMessage({ Message: "Email is already Exists", error: true });
          } else {
            RegistrationMethod(registrationDetails)
              .then((response) => {
                if (response.message === "Request failed with status code 404") {
                  setRegistrationSuccessMessage({ SuccessMessage: "Error...While Registering, Try again after some time", success: true });
                  setEmailExistsMessage({ Message: "Email is already Exists", error: false });
                } else if (response.data.message === 'Registration Sucessfull Done') {
                  setRegistrationSuccessMessage({ SuccessMessage: "Registration Done Successfully, Please Login Now", success: true });
                  setRegistrationDetails({ first_name: '', email: '', phone_no: '', password: '', cnf_password: '', source: 'website' });
                  setEmailExistsMessage({ Message: "Email is already Exists", error: false });
                }
              })
              .catch((error) => {
                console.log(error);
              })
          }
        })
    }
  }
  return (
    <>
      <Navbar />
      <div className="calender-Container" style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <div>
          <h2>Already existing user, Login Here</h2>
          <div className="inner-calender">
            <div className="inner-rhs" style={{ width: "100%" }}>
              {loginError.error === true ? <h2>Please Enter The Valid Login Credentials</h2> : " "}
              <div className="textarea-rhs">
                <div className="feild-detail">
                  <label htmlFor="login-email" className="form-label">Email Id</label>
                  <input type="text" id="login-email" name="loginEmail" onChange={handleLoginChange} />
                </div>
                <div className="feild-detail">
                  <label htmlFor="login-password" className="form-label">Password</label>
                  <input type="password" id="login-password" name="loginPassword" onChange={handleLoginChange} />
                </div>
              </div>
              <div className="submit-btns">
                <button className="add" onClick={handleLogin}>Login Now</button>
                <button className="cancel">Cancel</button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2>Register Here</h2>
          <div className="inner-calender">
            <div className="inner-rhs" style={{ width: "100%" }}>
              { registrationSuccessMessage.success === true ? `${registrationSuccessMessage.SuccessMessage}` : " " }
              { emailExistsMessage.error === true ? `${emailExistsMessage.Message}` : '' }
              <div className="textarea-rhs">
                <div className="feild-detail">
                  <label htmlFor="fname" className="form-label">First Name</label>
                  <input type="text" id="fname" name="first_name" onChange={handleRegistrationChange} value={registrationDetails.first_name} required />
                </div>
                <div className="feild-detail">
                  <label htmlFor="email" className="form-label">Email Id</label>
                  <input type="text" id="email" name="email" onChange={handleRegistrationChange} value={registrationDetails.email} required />
                </div>
                <div className="feild-detail">
                  <label htmlFor="phone_no" className="form-label">Contact No.</label>
                  <input type="number" id="contact_no" name="phone_no" onChange={handleRegistrationChange} value={registrationDetails.phone_no} required />
                </div>
                <div className="feild-detail">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" id="password" name="password" onChange={handleRegistrationChange} value={registrationDetails.password} required />
                </div>
                <div className="feild-detail">
                  <label htmlFor="cnf_password" className="form-label">Confirm Password</label>
                  <input type="password" id="cnf_password" name="cnf_password" onChange={handleRegistrationChange} value={registrationDetails.cnf_password} required />
                </div>
              </div>
              <div className="submit-btns">
                <button className="add" onClick={handleRegistration}>Register Now</button>
                <button className="cancel">Cancel</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default CustomerDetailes;
