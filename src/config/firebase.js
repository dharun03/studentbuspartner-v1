// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyB9vVxXR8HH31S4s28S62zGPO1jmj7Za98",
  authDomain: "studentbuspartner-da65f.firebaseapp.com",
  databaseURL:
    "https://studentbuspartner-da65f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "studentbuspartner-da65f",
  storageBucket: "studentbuspartner-da65f.appspot.com",
  messagingSenderId: "213564465903",
  appId: "1:213564465903:web:18a959d196e01d1309f11a",
  measurementId: "G-YJN3ZJEWJL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
