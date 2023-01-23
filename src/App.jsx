import {HashRouter as Router, Route, Routes} from 'react-router-dom'

//components
import Footer from './components/Footer'
import MapComponent from './components/Maps/MapComponent'
import Navbar from './components/NavBar/Navbar'
import Home from './components/Initial/home'

function App() {

  return (
    <div>
      <Router>
        <header>
          <Navbar />
        </header>
        <main className=''>
          <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route exact path='contacto' element={<MapComponent />} />
          </Routes>
          <Footer/>
        </main>
      </Router>
    </div>
  )
}

export default App
