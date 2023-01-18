import { useState } from 'react'
// import './App.css'

//components
import Analytics from './components/Analytics'
import Cards from './components/Cards'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Newsletter from './components/Newsletter'

function App() {

  return (
    <div>
      <header></header>
      <main>
        <Navbar/>
        <Hero/>
        <Analytics/>
        <Newsletter/>
        <Cards/>
        <Footer/>
      </main>
    </div>
  )
}

export default App
