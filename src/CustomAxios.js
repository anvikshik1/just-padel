import axios from 'axios';
import { environment } from './env';

const customAxios = axios.create({
    baseURL: `${environment.baseUrl}`,
});

const requestHandler = request => {
    const userToken = localStorage.getItem('Token');
    request.headers.Authorization = `Bearer ${userToken}`;
    return request;
};

const responseHandler = response => {

    console.log("api Response: ");
    if (response.status === 401) {
        // window.location.href = '/login';
    }
    return response;
};

const errorHandler = error => {
    console.log("api error: ", error);
    // window.location.href = '/';
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