import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from '../components/sections/AdminDashboard/AdminDashboard.jsx';
import { useAuth } from '../auth/AuthContext';
import UsersList from '../components/sections/UsersList/UsersList.jsx';
function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // or a loading indicator if you prefer
  }

  if (user.role !== 'admin') {
    return <p>Unauthorized: You are not an admin.</p>;
  }

  return (
    <>
      <AdminDashboard />
      <UsersList />
    </>
  );
}

export default DashboardPage;
