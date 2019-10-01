import axios from 'axios';
require('dotenv').config();
const baseURL =process.env.REACT_APP_BASE_URL;
export function userRegister(regDetails) {
    console.log("base"+baseURL);
    
    return axios.post(baseURL + '/user/userSignUp', regDetails)
}
export function userLogin(loginData) {
    return axios.post(baseURL + '/user/login', loginData)
}
export function userForgotPassword(forgotData) {
    return axios.post(baseURL + '/user/reset', forgotData)
}        