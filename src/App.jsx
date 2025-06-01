/* eslint-disable no-unused-vars */
import React, { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './auth/Login.jsx';
import Register from './auth/Register.jsx';
import Navbar from './components/sections/Navbar/Navbar.jsx';
import PrivateRoute from './components/sections/PrivateRoute/PrivateRoute.jsx';
import NewPostPage from './pages/NewPostPage.jsx';
import PostCard from './components/sections/PostCard/PostCard.jsx';
import PostsList from './components/sections/PostsList/PostsList.jsx';
import EditPostForm from './components/sections/EditPostForm/EditPostForm.jsx';
import EditProfileForm from './components/sections/EditProfileForm/EditProfileForm.jsx';
import PostDetails from './components/sections/PostDetails/PostDetails.jsx';
import NotFound from './pages/NotFound.jsx';
import PofilePage from './pages/PofilePage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import UsersList from './components/sections/UsersList/UsersList.jsx';

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/new_post"
          element={
            <PrivateRoute>
              <NewPostPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <PofilePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit_profile"
          element={
            <PrivateRoute>
              <EditProfileForm />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit_post/:id"
          element={
            // <PrivateRoute>
            <EditPostForm />
            // </PrivateRoute>
          }
        />

        <Route
          path="/post/:id"
          element={
            // <PrivateRoute>
            <PostDetails />
            // </PrivateRoute>
          }
        />

        <Route
          path="/feed"
          element={
            <PrivateRoute>
              <PostsList />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            // <PrivateRoute>
            <DashboardPage />
            // </PrivateRoute>
          }
        />

        <Route
          path="/users"
          element={
            // <PrivateRoute>
            <UsersList />
            // </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
