import firebase from "firebase/app";
import "firebase/messaging";
const initializedFirebaseApp = firebase.initializeApp({
  // Project Settings => Add Firebase to your web app
  apiKey: "AIzaSyBEreXeH2yJhBzlkyTa6HJjSiBb_P5HzJ8",
  authDomain: "crimeanalyser.firebaseapp.com",
  projectId: "crimeanalyser",
  storageBucket: "crimeanalyser.appspot.com",
  messagingSenderId: "83931387865",
  appId: "1:83931387865:web:73702aafdcf1e7ff582bc8",
});
const messaging = initializedFirebaseApp.messaging();
export { messaging };
