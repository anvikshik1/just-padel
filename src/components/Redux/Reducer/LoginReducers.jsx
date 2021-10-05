import { environment } from '../../../env';
import axios from 'axios';

const initial = {
    LoggedUser: [],
    logged: false
}
const loginUrl = `${environment.baseUrl}api/user/login/`;

const LoginReducer = (log = initial, action) => {
    switch (action.type) {

        case "LOGIN":
            let AdminCredentials = {
                email: action.payload.email,
                password: action.payload.password
            }
            const loginResult = axios.post(loginUrl, AdminCredentials)
                .then((response) => {
                    if (response.data.status === 201 || 200) {
                        return {
                            // ...log,
                            LoggedUser:[
                                // ...log.LoggedUser,
                                {
                                    userId: response.data.userid,
                                    username: response.data.username,
                                    email: action.payload.email,
                                    accessToken: response.data.access,
                                    userRole:response.data.role
                                }
                            ]
                        }
                    } else {
                        console.log("Error While Logging")
                    }
                })
                .catch((error)=>{
                    console.log("Error : "+error)
                })


        // if (loggedUserData) {
        //     return {
        //         ...log,
        //         logged: true,
        //     }
        // } else {
        //     return {
        //         ...log,
        //         logged: false
        //     }
        // }
        case "LOGOUT":
            return {
                ...log,
                logged: false
            }
        default:
            return log;
    }

}

export default LoginReducer;