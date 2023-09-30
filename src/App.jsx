import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
//components
import Footer from './components/Footer'
// import MapComponent from './components/Maps/MapComponent'
import Navbar from './components/NavBar/Navbar'
import Home from './layout/Home/home'
import Tickets from './layout/Tickets/tickets'
import Activation from './layout/Activation/Activation'
import MuiAlert from '@mui/material/Alert';

import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

import { createContext } from 'react'

import { ContextVariable } from './Context'


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

function App({ db }) {

  const [alert, setalert] = useState({
    open: false,
    severity: 'success',
    message: 'Default'
  })

  useEffect(() => {
    setState({
      ...state,
      open: alert.open
    })
    
  },[alert]);

  const [state, setState] = useState({
    open: alert.open,
    Transition: SlideTransition,
    vertical: 'bottom',
    horizontal: 'right',
  })

  const handleClick = () => {
    setalert({ 
      ...alert,
      open: true,
    });
  }

  const handleClose = () => {
    setState({
      ...state,
      open: false,
      vertical: 'bottom',
      horizontal: 'right'
    })
  }

  const { vertical, horizontal, open } = state;

  return (
    <ContextVariable.Provider value={{ alert, setalert }}>
      <div>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          autoHideDuration={4000}
          open={state.open}
          onClose={handleClose}
          TransitionComponent={state.Transition}
        >
          <Alert onClose={handleClose} severity={alert.severity} sx={{ width: '100%' }}>
            {alert.message}
          </Alert>
        </Snackbar>
        <Router>
          <header>
            <Navbar />
            {/* <button onClick={handleClick}>Activate Breadcrumb</button> */}
          </header>
          <main className=''>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/boletas' element={<Tickets />} />
              <Route exact path='/activacion' element={<Activation />} />
              {/* <Route exact path='contacto' element={<MapComponent />} /> */}
            </Routes>
            <Footer />
          </main>
        </Router>
      </div>
    </ContextVariable.Provider>
  )
}

export default App
