import React from 'react'
import './App.css'
import WeatherApp from './components/WeatherApp/WeatherApp'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import LoginPage from './components/LoginPage/LoginPage'
import SignUp from './components/SignUp/SignUp'

function App() {
 

  return (
    <>
     <Router>
      <Routes>
      <Route path='/' element={<SignUp/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/weather' element={<WeatherApp/>}/>
        
      </Routes>
     </Router>
    </>
  )
}

export default App
