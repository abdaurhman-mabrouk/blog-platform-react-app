import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import {
  GenerateLoginTokenService,
  LoginTokenService,
} from '../services/TokenServices';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;
const UI_BASE_URL = import.meta.env.VITE_BASE_URL;

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
      `${API_BASE_URL}/users?email=${email}&password=${password}`
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
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow-sm w-100"
        style={{ maxWidth: 400 }}>
        <h2 className="mb-4 text-center">Login</h2>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
}
