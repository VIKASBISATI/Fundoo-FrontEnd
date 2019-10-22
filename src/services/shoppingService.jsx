import Firebase from '../services/firebase.config'
// import database from './firebase.config';
// import firestore from './firebase.config';
import axios from 'axios';
require('dotenv').config();
const baseURL = process.env.REACT_APP_BASE_URL;
export function userRegister(regDetails) {
    console.log("base" + baseURL);

    return axios.post(baseURL + '/user/userSignUp', regDetails)
}
export function userLogin(loginData) {
    return axios.post(baseURL + '/user/login', loginData)
}
export function userForgotPassword(forgotData) {
    return axios.post(baseURL + '/user/reset', forgotData)
}
export async function abc() {
    console.log("in abc");
    var snap = await Firebase.firestore.collection('fundoo').doc('image').get()    
    console.log("res",snap._document.proto.fields.url.stringValue);
    var url=snap._document.proto.fields.url.stringValue
    return url;
}
