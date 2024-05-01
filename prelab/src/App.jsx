import React from 'react'
import './App.css'
import WeatherApp from './components/WeatherApp/WeatherApp'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import LoginPage from './components/LoginPage/LoginPage'
import SignUp from './components/SignUp/SignUp'
import Navbar from './components/Blog/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Bloggy from './components/Blog/Bloggy'
import Blog from './components/Blog/Blog'

function App() {
 

  return (
    <>
    
     <Router>
     <Navbar/>
      <Routes>
      <Route path='/' element={<Blog/>}></Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/weather' element={<WeatherApp/>}/>
        
      </Routes>
     </Router>
    </>
  )
}

export default App
