import React from 'react'
import ReactDOM from 'react-dom/client'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import App from './App'
import './index.css'

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfVE-mnNIFggp-z0ZpFqxwnwP_GuGJXO4",
  authDomain: "sparkgroup-506bf.firebaseapp.com",
  databaseURL: "https://sparkgroup-506bf-default-rtdb.firebaseio.com",
  projectId: "sparkgroup-506bf",
  storageBucket: "sparkgroup-506bf.appspot.com",
  messagingSenderId: "500296261817",
  appId: "1:500296261817:web:3c1295f04a74f9d2747b68",
  measurementId: "G-EK1C1Q3KK0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <App db={db}/>
  // </React.StrictMode>
)
