import React from 'react';
import UserPostsList from '../components/sections/UserPostsList/UserPostsList';
import { useAuth } from '../auth/AuthContext';
import AdminDashboard from '../components/sections/AdminDashboard/AdminDashboard';
import UserAddRequestsList from '../components/sections/UserAddRequestsList/UserAddRequestsList';
import SentAddRequestList from '../components/sections/SentAddRequestsList/SentAddRequestsList';

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;
const UI_BASE_URL = import.meta.env.VITE_BASE_URL;

function PofilePage() {
  const { user } = useAuth();
  return (
    <>
      {user.role === 'admin' ? (
        <>
          <UserAddRequestsList username={user.username} />
          <SentAddRequestList username={user.username} />
          <AdminDashboard />
          <UserPostsList />
        </>
      ) : (
        <>
          <UserAddRequestsList username={user.username} />
          <SentAddRequestList username={user.username} />
          {/* <AdminDashboard /> */}
          <UserPostsList />
        </>
      )}
    </>
  );
}

export default PofilePage;
