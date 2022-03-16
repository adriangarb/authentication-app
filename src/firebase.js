import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyC3rL7B7hN-ArPCVyMuo2irhMPe7chM3HU",
    authDomain: "my-login-f781d.firebaseapp.com",
    projectId: "my-login-f781d",
    storageBucket: "my-login-f781d.appspot.com",
    messagingSenderId: "1041896078096",
    appId: "1:1041896078096:web:449046b45ef18075ffc395"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore()
export {auth}