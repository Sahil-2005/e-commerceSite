// src/App.jsx
import React from "react";
import HomePage from './pages/HomePage';
import DisplayProducts from './pages/DisplayProducts';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import CrudProducts from './pages/CrudProducts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* protected /shop */}
        <Route
          path="/shop"
          element={
            <ProtectedRoute>
              <DisplayProducts />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        {/* protected /crud */}
        <Route
          path="/crud"
          element={
            <ProtectedRoute>
              <CrudProducts />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
