import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `http://192.168.1.13:3001/users?email=${email}&password=${password}`
    );

    const data = await res.json();

    if (data.length > 0) {
      login(data[0]);
      navigate('/');
    } else {
      alert('Email or password is incorrect.');
    }
  };

  return (
    <>
      <center>
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <br />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <br />

          <button type="submit">Login</button>
        </form>
      </center>
    </>
  );
}
