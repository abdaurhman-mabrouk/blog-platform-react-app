/* eslint-disable no-unused-vars */
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../auth/AuthContext';
import NewPost from '../components/sections/NewPost/NewPost.jsx';
export default function NewPostPage() {
  return (
    <>
      <NewPost />
    </>
  );
}
