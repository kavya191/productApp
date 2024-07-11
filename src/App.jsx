import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'
import Profile from './Pages/Profile/Profile'
import Products from './Pages/Products/Products'
import Viewproduct from './Pages/Viewproduct/Viewproduct'
import Cart from './Pages/Cart/Cart'

function App() {
  return (
  <Routes>
    
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/products' element={<Products />} />
      <Route path='/viewproduct' element={<Viewproduct />} />
      <Route path='/cart' element={<Cart />} />

    </Routes>

  )
}

export default App
