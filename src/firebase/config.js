// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnehLMbDOfHim47th-c1Q2Hp6bvkksExI",
  authDomain: "drishti-9911.firebaseapp.com",
  projectId: "drishti-9911",
  storageBucket: "drishti-9911.firebasestorage.app",
  messagingSenderId: "568790835477",
  appId: "1:568790835477:web:c873cc92ff0ca19c8f491c",
  measurementId: "G-8EPSNGB5NS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
export default app;
