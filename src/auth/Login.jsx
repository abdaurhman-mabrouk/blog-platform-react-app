import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import {
  GenerateLoginTokenService,
  LoginTokenService,
} from '../services/TokenServices';

export default function Login() {
  const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function autoLoginIfValidToken() {
      const user = await LoginTokenService();
      if (user) {
        login(user);
        navigate('/');
      }
    }
    autoLoginIfValidToken();
  }, [login, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `${REACT_APP_API_URL}/users?email=${email}&password=${password}`
    );

    const data = await response.json();

    if (data.length > 0) {
      const user = data[0];
      login(user);
      await GenerateLoginTokenService({ email, password });
      navigate('/');
    } else {
      alert('Email or password is incorrect.');
    }
  };

  return (
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
  );
}
