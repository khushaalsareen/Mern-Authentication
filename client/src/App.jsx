import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import About from './pages/About'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Header from './components/Header'

const App = () => {
  return (
    <BrowserRouter>
    {/* header */}
    <Header />
      <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/about' element = {<About />} />
        <Route path='/sign-in' element = {<Signin />} />
        <Route path='/sign-up' element = {<SignUp />} />
        <Route path='/profile' element = {<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App