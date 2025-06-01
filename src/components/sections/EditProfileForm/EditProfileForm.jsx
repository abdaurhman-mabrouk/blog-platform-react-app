/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useAuth } from '../../../auth/AuthContext';

function EditProfileForm() {
  const { user } = useAuth();
  const [userId, setUserId] = useState(user.id);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the email already exists (excluding current user)
    const emailCheck = await fetch(
      `http://192.168.1.13:3001/users?email=${email}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0 && data[0].id !== userId) {
          alert('The Email Already Signed!');
          return false;
        } else {
          return true;
        }
      });

    // Check if the username already exists (excluding current user)
    const usernameCheck = await fetch(
      `http://192.168.1.13:3001/users?username=${username}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0 && data[0].id !== userId) {
          alert('The Username Already Signed!');
          return false;
        } else {
          return true;
        }
      });

    // if both are unique or belong to current user, update profile
    if (emailCheck && usernameCheck) {
      await fetch(`http://192.168.1.13:3001/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      alert('Profile updated successfully!');
    }
  };

  return (
    <>
      <center>
        <form className="edit-profile-form">
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button type="submit" onClick={handleSubmit}>
            Save Changes
          </button>
        </form>
      </center>
    </>
  );
}

export default EditProfileForm;
