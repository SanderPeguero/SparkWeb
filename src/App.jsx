App
import React from 'react'
import { useState, useEffect } from 'react'
import { doc, getDoc, getFirestore } from "firebase/firestore"
import { HashRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom'

//MUI
import MuiAlert from '@mui/material/Alert'
import Slide from '@mui/material/Slide'
import Snackbar from '@mui/material/Snackbar'

//Components
import Footer from './components/Footer'
import Navbar from './components/NavBar/Navbar'

//Layouts
import Home from './layout/Home/home'
import Login from './layout/Login/Login'
import SignIn from './layout/SignIn/SignIn'
import Screen from './layout/Dashboard/Screen'
import Tickets from './layout/Tickets/tickets'
import Dashboard from './layout/Dashboard/Dashboard'
import Activation from './layout/Activation/Activation'
import ActivationsDash from './layout/ActivationsDash/Dashboard'

//Data
import { ContextVariable } from './Context'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import ContainerCard from './components/ContainerCard/ContainerCard'
import EmailConfirmation from './components/EmailConfirmation/EmailConfirmation'

import { getDatabase, ref, get } from 'firebase/database';
import { obtenerTodasLasImagenes } from './Scripts/UploadHero1'
import Purchase from './layout/Tickets/purchase'
import ReserveTicket from './layout/Tickets/reserveTicket'
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

function App() {

  const FirebaseAuth = getAuth();

  useEffect(() => {

    onAuthStateChanged(FirebaseAuth, (user) => {
      if (user) {

        setauth(user)
        getUser(user)

      } else {
        setauth(null)
      }
    })

  }, []);


  const [alert, setalert] = useState({
    open: false,
    severity: 'success',
    message: 'Default'
  })

  const [auth, setauth] = useState(null)
  const [user, setuser] = useState(null)

  const db = getFirestore()

  const getUser = async (data) => {

    const docRef = doc(db, "Users", data.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {

      setuser(docSnap.data())

    } else {

      console.log("No such user document!");

    }

  }

  useEffect(() => {
    setState({
      ...state,
      open: alert.open
    })

  }, [alert]);

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

  const [isOpenLogIn, setIsOpenLogIn] = useState(false)
  const [isOpenSignUp, setIsOpenSignUp] = useState(false)
  const [reserveTicket, setreserveTicket] = useState(false)
  const [comprarTicket, setcomprarTicket] = useState(false)
  const [isOpenEditImg, setisOpenEditImg] = useState(false)
  const [GalleryVisible, setGalleryVisible] = useState(false)
  const [categories, setCategories] = useState([])
  const [listImg, setListImg] = useState([])
  const [ListImages, setListImages] = useState([])
  
  useEffect(() => {
    obtenerTodasLasImagenes(setListImages)
  }, [])

  useEffect(() => {
  }, [ListImages])



  const { vertical, horizontal, open } = state;

  const [locattion, setlocattion] = useState(null)

  const commonRoutes = [
    { path: '/', element: <Home /> },
    { path: '/boletas', element: <Tickets /> },
    { path: '/comprar', element: <Purchase /> },
    { path: '/reservar', element: <ReserveTicket /> },
    { path: '/activacion', element: <Activation /> },
    { path: '/emailConfi', element: <EmailConfirmation /> },
    { path: '/login', element: !auth ? <Login /> : <Navigate to='/' /> },
    { path: '/signin', element: !auth ? <SignIn /> : <Navigate to='/' /> },
    { path: '*', element: <Navigate to='/' /> }
  ];

  const adminRoutes = [
    { path: '/', element: <Home /> },
    { path: '/boletas', element: <Tickets /> },
    { path: '/comprar', element: <Purchase /> },
    { path: '/reservar', element: <ReserveTicket /> },
    { path: '/activacion', element: <Activation /> },
    { path: '/ticketsdash', element: <Screen /> },
    { path: '/dashboardsparkle', element: <Dashboard /> },
    { path: '/activationsdash', element: <ActivationsDash /> },
  ];


  const routes = [...commonRoutes, ...(user && user.role === 'admin' ? adminRoutes.map(route => ({ ...route, path: `/admin${route.path}` })) : [])];
  return (
    <ContextVariable.Provider value={{
      user,
      alert,
      setalert,
      auth,
      setauth,
      locattion,
      setlocattion,
      isOpenLogIn,
      setIsOpenLogIn,
      isOpenSignUp,
      setIsOpenSignUp,
      reserveTicket,
      setreserveTicket,
      comprarTicket,
      setcomprarTicket,
      isOpenEditImg,
      setisOpenEditImg,
      listImg,
      setListImg,
      GalleryVisible,
      setGalleryVisible,
      ListImages,
      setListImages,
      categories,
      setCategories

    }}>
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
            {locattion !== "/" && locattion !== "/admin" && (
              <Navbar auth={auth} user={user} />
            )}
          </header>
          <main className=''>
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} {...route} />
              ))}
            </Routes>
            <Footer />
          </main>
        </Router>
      </div>
    </ContextVariable.Provider>
  )
}

export default App
