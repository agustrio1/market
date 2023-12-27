// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3LeVdaBvo4u8dldn3BKvG-3CXzPD55ds",
  authDomain: "web-store-8304e.firebaseapp.com",
  databaseURL: "https://web-store-8304e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "web-store-8304e",
  storageBucket: "web-store-8304e.appspot.com",
  messagingSenderId: "120453699927",
  appId: "1:120453699927:web:3b697f65970be434a24612",
  measurementId: "G-76NYC96CZ2"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };