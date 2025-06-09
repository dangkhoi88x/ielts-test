
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAeSXNfBmene1UAyuD6E1-_EtUXZCVKPSs",
    authDomain: "ietls-journey.firebaseapp.com",
    projectId: "ietls-journey",
    storageBucket: "ietls-journey.firebasestorage.app",
    messagingSenderId: "885364990540",
    appId: "1:885364990540:web:ee43c7f3f96bc85db30ae9",
    measurementId: "G-B4LM9BB311"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, doc, getDoc };
