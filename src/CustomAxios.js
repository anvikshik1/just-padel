import axios from 'axios';
import { environment } from './env';
import store from './store';

const customAxios = axios.create({
    baseURL: `${environment.baseUrl}`,
});

const requestHandler = request => {
    // const userToken = localStorage.getItem('Token');
    const state = store.getState();
    const userToken = state.LoginReducers.loggedUserDetails[0].token;
    request.headers.Authorization = `Bearer ${userToken}`;
    return request;
};

const responseHandler = response => {
    if (response.status === 401) {
        window.location.href = '/';
    }
    return response;
};

const errorHandler = error => {
    window.location.href = '/';
    return Promise.reject(error);
};

customAxios.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
);


export default customAxios;