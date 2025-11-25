import React from 'react'
import HomePage from './pages/HomePage'
import DisplayProducts from './pages/DisplayProducts'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import CrudProducts from './pages/CrudProducts'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<DisplayProducts />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/crud" element={<CrudProducts />} />
    </Routes>

    </BrowserRouter>
  )
}

export default App