/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useAuth } from '../../../auth/AuthContext';

import './EditProfileForm.css'; // ✅ custom CSS

function EditProfileForm() {
  const { user } = useAuth();
  const [userId, setUserId] = useState(user.id);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  // const [age, setAge] = useState(user.age);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check email
    const emailCheck = await fetch(
      `http://192.168.1.13:3001/users?email=${email}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0 && data[0].id !== userId) {
          alert('The Email Already Signed!');
          return false;
        }
        return true;
      });

    // Check username
    const usernameCheck = await fetch(
      `http://192.168.1.13:3001/users?username=${username}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0 && data[0].id !== userId) {
          alert('The Username Already Signed!');
          return false;
        }
        return true;
      });

    if (emailCheck && usernameCheck) {
      await fetch(`http://192.168.1.13:3001/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      alert('Profile updated successfully!');
    }
  };

  return (
    <div className="edit-profile-wrapper">
      <h2 className="form-title">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          viewBox="0 0 16 16">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 14s-1 0-1-1 1-4 7-4 7 3 7 4-1 1-1 1H2z" />
        </svg>
        Edit Profile
      </h2>

      <form className="edit-profile-form" onSubmit={handleSubmit}>
        {/* Username */}
        <div className="form-group">
          <span className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 14s-1 0-1-1 1-4 7-4 7 3 7 4-1 1-1 1H2z" />
            </svg>
          </span>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <span className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 16 16">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v.217L8 8.917.001 4.217V4zm0 1.383v6.634l5.803-3.764L0 5.383zm6.761 3.962L0 13.383A2 2 0 0 0 2 14h12a2 2 0 0 0 2-.617l-6.761-5.021L8 9.583l-1.239-.238z" />
            </svg>
          </span>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Age
        <div className="form-group">
          <span className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 16 16">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v.217L8 8.917.001 4.217V4zm0 1.383v6.634l5.803-3.764L0 5.383zm6.761 3.962L0 13.383A2 2 0 0 0 2 14h12a2 2 0 0 0 2-.617l-6.761-5.021L8 9.583l-1.239-.238z" />
            </svg>
          </span>
          <input
            type="number"
            id="age"
            name="age"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div> */}

        {/* Password */}
        <div className="form-group">
          <span className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 16 16">
              <path d="M8 1a4 4 0 0 0-4 4v3H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1h-1V5a4 4 0 0 0-4-4zM5 5a3 3 0 1 1 6 0v3H5V5z" />
            </svg>
          </span>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn-submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5.5a.5.5 0 0 0-1 0v4a.5.5 0 0 0 1 0V6zm2 .5a.5.5 0 0 1 .5-.5h.5a.5.5 0 0 1 0 1H10v3.5a.5.5 0 0 1-1 0V6.5z" />
            <path
              fillRule="evenodd"
              d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4.5l6-3 6 3zm-6.553 8.106a.5.5 0 0 0 .707 0l2-2a.5.5 0 1 0-.707-.707L8 11.793 6.553 10.447a.5.5 0 1 0-.707.707l2 2z"
            />
          </svg>
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProfileForm;
