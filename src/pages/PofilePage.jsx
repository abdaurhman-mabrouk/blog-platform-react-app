import React from 'react';
import UserPostsList from '../components/sections/UserPostsList/UserPostsList';
import { useAuth } from '../auth/AuthContext';
import AdminDashboard from '../components/sections/AdminDashboard/AdminDashboard';

function PofilePage() {
  const { user } = useAuth();
  return (
    <>
      <AdminDashboard />
      <UserPostsList />
    </>
  );
}

export default PofilePage;
