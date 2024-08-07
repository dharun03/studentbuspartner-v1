import { applicationDefault, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase/auth";
const admin = initializeApp();

var serviceAccount = import("C:/Users/admin/Downloads/serviceAccountKey.json");

admin.initializeApp({
  credential: admin,
  databaseURL:
    "https://studentbuspartner-da65f-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const adminAuth = getAuth(admin);

export { admin, adminAuth };
