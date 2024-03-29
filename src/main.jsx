import React from 'react'
import ReactDOM from 'react-dom/client'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import App from './App'
import './index.css'

import './firebase.js'
import { Router } from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <App/>
  // </React.StrictMode>
)
