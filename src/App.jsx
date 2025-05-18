/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './auth/Login.jsx';
import Register from './auth/Register.jsx';
import Navbar from './components/sections/Navbar/Navbar.jsx';
import PrivateRoute from './components/sections/PrivateRoute/PrivateRoute.jsx';
import NewPostPage from './pages/NewPostPage.jsx';
import PostCard from './components/sections/PostCard/PostCard.jsx';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={'Home'} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/new"
          element={
            <PrivateRoute>
              <NewPostPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={<PrivateRoute>{/*<EditPost />*/}</PrivateRoute>}
        />

        <Route path="/post/:id" element={'post'} />
        <Route path="/posts" element={<PostCard />} />

        <Route path="/feed" element={<PrivateRoute>posts</PrivateRoute>} />

        <Route path="*" element={'not found - 404'} />
      </Routes>
    </>
  );
}

export default App;
