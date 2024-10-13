import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBW36h1veRDnPzRMuSpHCr5esJrdqPpleE",
  authDomain: "gradheadshot.firebaseapp.com",
  projectId: "gradheadshot",
  storageBucket: "gradheadshot.appspot.com",
  messagingSenderId: "755995023379",
  appId: "1:755995023379:web:b520a0e61c5f026c2bc7e6",
  measurementId: "G-5LCM2RY6QY",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Initialize Analytics and get a reference to the service
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, auth, db, analytics, googleProvider };
