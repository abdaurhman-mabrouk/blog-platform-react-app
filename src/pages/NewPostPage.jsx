/* eslint-disable no-unused-vars */
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../auth/AuthContext';
import NewPostForm from '../components/sections/NewPostForm/NewPostForm.jsx';
export default function NewPostPage() {
  return (
    <>
      <NewPostForm />
    </>
  );
}
