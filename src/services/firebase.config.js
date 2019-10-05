import firebase from "firebase";
import 'firebase/storage';
require('dotenv').config();
const firebaseConfig = {
    apiKey: process.env.apiKeyy,
    authDomain: "fundoo-firebase-auth.firebaseapp.com",
    databaseURL: "https://fundoo-firebase-auth.firebaseio.com",
    projectId: "fundoo-firebase-auth",
    storageBucket: "fundoo-firebase-auth.appspot.com",
    messagingSenderId: process.env.messagingSenderIdd,
    appId: process.env.appIdd
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage()
const database = firebase.database();
const firestore = firebase.firestore();

export default {
    storage, firebase, database, firestore
}