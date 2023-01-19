import { useState } from 'react'
// import './App.css'
import {
  BrowserRouter as Router,
  Route, Routes
} from 'react-router-dom';


//components
import Analytics from './components/Analytics'
import Cards from './components/Cards'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/NavBar/Navbar'
import Newsletter from './components/Newsletter'
import Map from './components/Maps/Map';

//components
import Home from './components/Home/Home';

function App() {

  return (
    <div>
      <Router>
        <header>
          <Navbar />
        </header>
        <main>
          <Hero />
          <Analytics />
          <Newsletter />
          <Cards />
          <Footer /> 
          {/* <Map/> */}
          <Routes>
            {/* <Route exact path='/' element={<Home />}/>
            <Route exact path='/Analytics' element={<Analytics />}/>
            <Route exact path='/Newsletter' element={<Newsletter />}/>
            <Route exact path='/Cards' element={<Cards />}/> */}
          </Routes>
          {/* <Footer />  */}
        </main>
      </Router>
    </div>
  )
}

export default App
