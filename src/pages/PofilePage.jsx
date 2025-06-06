import React from 'react';
import UserPostsList from '../components/sections/UserPostsList/UserPostsList';
import { useAuth } from '../auth/AuthContext';
import AdminDashboard from '../components/sections/AdminDashboard/AdminDashboard';

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;
const UI_BASE_URL = import.meta.env.VITE_BASE_URL;

function PofilePage() {
  const { user } = useAuth();
  return (
    <>
      {user.role === 'admin' ? (
        <>
          <AdminDashboard />
          <UserPostsList />
        </>
      ) : (
        ''
      )}
    </>
  );
}

export default PofilePage;
