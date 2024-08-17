import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './pages/LandingPage'
import Navbar from './components/navbar/Navbar'
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import FooterPages from './pages/FooterPages'
import LandingNavbar from './components/navbar/LandingNavbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <LandingNavbar/>
      <LandingPage/>
      <FooterPages/>
    </div>
  )
}

export default App
