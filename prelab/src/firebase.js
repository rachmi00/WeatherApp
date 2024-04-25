// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA62QbbIABZtN_aLYR2vKczIASPu19lhX0",
  authDomain: "weather-2efca.firebaseapp.com",
  projectId: "weather-2efca",
  storageBucket: "weather-2efca.appspot.com",
  messagingSenderId: "229593105684",
  appId: "1:229593105684:web:ad94814db954dccae82e01",
  measurementId: "G-FKMV00GYHB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;