import axios from 'axios';
const baseURL = "http://fundoonotes.incubation.bridgelabz.com/api"
export function userRegister(regDetails) {
    return axios.post(baseURL + '/user/userSignUp', regDetails)
}
export function userLogin(loginData) {
    return axios.post(baseURL + '/user/login', loginData)
}
export function userForgotPassword(forgotData) {
    return axios.post(baseURL + '/user/reset', forgotData)
}        