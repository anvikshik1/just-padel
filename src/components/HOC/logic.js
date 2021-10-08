import axios from "axios";
import { environment } from '../../env';

export const LoginMethod = (emails, passwords) => {
    const loginUrl = `${environment.baseUrl}api/user/login/`; 

    const loginCreadentials = {
        email: emails,
        password: passwords
    };
    
    const result = axios.post(loginUrl, loginCreadentials)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        })
    return result;
};

export const RegistrationMethod = (registration) => {
    const registrationUrl = `${environment.baseUrl}api/user/registration/`;
    const result = axios.post(registrationUrl, registration)
        .then((response)=>{
            return response;
        })
        .catch((error)=>{
            return error;
        })
    return result;
};

export const VerifyEmail = (emailToVerify) => {
    const emailData ={ email:emailToVerify }
    const verifyEmailUrl = `${environment.baseUrl}email/`;
    const result = axios.post(verifyEmailUrl, emailData)
        .then((response)=>{
            return response;
        })
        .catch((error)=>{
            return error;
        })
    return result;
}

