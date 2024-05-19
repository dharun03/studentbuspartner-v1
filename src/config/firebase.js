// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getMessaging, onMessage, getToken } from "firebase/messaging";

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
const messaging = getMessaging(app);
const auth = getAuth(app);

export function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      return getToken(messaging, {
        vapidKey:
          "BPAcDNO_V4RrfdwqURE1TKl7tuMUwFqpraukSsvH4gL-NYUZ_VkmT7p5hNadsLwbpqehiEBtBP3mutKbz7lZIwg",
      })
        .then((currentToken) => {
          if (currentToken) {
            // Send the token to your server and update the UI if necessary
            // ...
            console.log("Client Token: ", currentToken);
          } else {
            // Show permission request UI
            console.log(
              "No registration token available. Request permission to generate one.",
            );
            // ...
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
          // ...
        });
    } else {
      console.log("User Permission Denied");
    }
  });
}

requestPermission();

export function onMessageListener() {
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
}

export { db, messaging, auth };
