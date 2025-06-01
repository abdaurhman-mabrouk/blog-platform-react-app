import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={styles.nav}>
      <h2>📚 Blog Platform</h2>

      <div style={styles.links}>
        <Link to="/">Home</Link>

        {user ? (
          <>
            <span>Hello, {user.username}</span>
            <Link to="/new_post">New Post</Link>
            <Link to="/feed">Feed</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/edit_profile">Edit Profile</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    padding: '10px 20px',
    backgroundColor: '#0077cc',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  links: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
  },
};
