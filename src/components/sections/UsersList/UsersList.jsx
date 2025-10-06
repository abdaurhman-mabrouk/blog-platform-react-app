import React, { useState, useEffect } from 'react';
import { FetchUsersService } from '../../../services/PostServices';
import './UsersList.css'; // external stylesheet
import { Link } from 'react-router-dom';

export default function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await FetchUsersService();
        setUsers(Array.isArray(fetchedUsers) ? fetchedUsers : []);
      } catch (error) {
        console.log('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="users-container">
      <h2 className="users-title">Users List</h2>
      <div className="users-grid">
        {users.length > 0 ? (
          users.map((user) => (
            <div className="user-card" key={user.id} id={'user_' + user.id}>
              <Link to={`/user/${user.username}`}>
                <div className="user-header">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="user-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor">
                    <circle cx="12" cy="7" r="4" />
                    <path d="M6 21c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                  </svg>
                  <h5 className="user-name">{user.username}</h5>
                </div>
                <p className="user-email">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="email-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor">
                    <path d="M4 4h16v16H4z" strokeWidth="1.5" />
                    <path d="M4 4l8 8 8-8" strokeWidth="1.5" />
                  </svg>
                  {user.email}
                </p>
                <span className="user-role">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-person-fill"
                    viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                  </svg>
                  {user.role || 'user'}
                </span>
              </Link>
            </div>
          ))
        ) : (
          <div className="no-users">No users found.</div>
        )}
      </div>
    </div>
  );
}
