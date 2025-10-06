import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Register.css';

const API_BASE_URL =
  import.meta.env.VITE_BASE_API_URL || 'http://192.168.1.13:3001';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(''); // path/URL returned from upload
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const validateEmail = (em) => {
    // simple email check
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
  };

  const uploadUserPicture = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setUploadStatus('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      setUploadStatus('Uploading...');

      const res = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => '');
        throw new Error(txt || 'File upload failed');
      }

      const data = await res.json();
      // depending on your backend, data may contain { filename, path, url } — adapt as needed
      const uploadedPath = data.url || data.path || data.filename || '';
      setProfilePicture(uploadedPath);
      setUploadStatus('Upload successful');
    } catch (err) {
      console.error(err);
      setUploadStatus('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim()) {
      setErrorMsg('Username is required.');
      return;
    }
    if (!validateEmail(email)) {
      setErrorMsg('Please enter a valid email.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    try {
      setLoading(true);

      // check email uniqueness
      const checkRes = await fetch(
        `${API_BASE_URL}/users?email=${encodeURIComponent(email)}`
      );
      const existing = await checkRes.json();
      if (Array.isArray(existing) && existing.length > 0) {
        setErrorMsg('Email already signed up.');
        return;
      }

      // optional: check username uniqueness
      const unameRes = await fetch(
        `${API_BASE_URL}/users?username=${encodeURIComponent(username)}`
      );
      const unameExisting = await unameRes.json();
      if (Array.isArray(unameExisting) && unameExisting.length > 0) {
        setErrorMsg('Username already taken.');
        return;
      }

      const newUser = {
        id: Date.now() + Math.floor(Math.random() * 1000),
        username: username.trim(),
        email: email.trim(),
        password, // password should be handled/hashed server-side — do NOT rely on client-side hashing for security
        token: '',
        expiresAt: '',
        friends: [],
        profilePicture, // may be empty string if user didn't upload
        joinedAt: new Date().toISOString(),
        addsRequests: [],
        role: 'user',
      };

      const createRes = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (!createRes.ok) {
        const txt = await createRes.text().catch(() => '');
        throw new Error(txt || 'Sign up failed');
      }

      alert('Signed up successfully.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred during signup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleRegister} noValidate>
        <h2 className="form-title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="title-icon"
            viewBox="0 0 16 16"
            width="24"
            height="24"
            fill="currentColor">
            <path d="M8 0a5 5 0 1 0 0 10A5 5 0 0 0 8 0zM2 14s1-3 6-3 6 3 6 3v1H2v-1z" />
          </svg>
          Create account
        </h2>

        {/* file upload */}
        <label className="file-group" aria-label="Profile picture">
          <div className="file-left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="file-icon">
              <path d="M4.5 3a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
              <path d="M4.5 6A1.5 1.5 0 0 1 6 4.5h4A1.5 1.5 0 0 1 11.5 6V12a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V6z" />
            </svg>
            <div className="file-info">
              <div className="file-label">Profile picture (optional)</div>
              <div className="file-status">{uploadStatus}</div>
            </div>
          </div>

          <div className="file-controls">
            <input
              ref={fileInputRef}
              id="fileInput"
              type="file"
              accept="image/*"
              className="file-input"
            />
            <button
              type="button"
              className="btn upload-btn"
              onClick={uploadUserPicture}
              disabled={uploading}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor">
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm.5 4.5V9h-1V4.5H5l3-3 3 3h-2.5z" />
              </svg>
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </label>

        {/* username */}
        <div className="input-group">
          <span className="icon-left" aria-hidden>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="currentColor">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              <path d="M2 14s1-3 6-3 6 3 6 3v1H2v-1z" />
            </svg>
          </span>
          <input
            className="text-input"
            type="text"
            placeholder="User name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            aria-label="User name"
          />
        </div>

        {/* email */}
        <div className="input-group">
          <span className="icon-left" aria-hidden>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="currentColor">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v.217l-8 4.8-8-4.8V4z" />
              <path d="M0 6.383V12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6.383l-7.555 4.533a.5.5 0 0 1-.49 0L0 6.383z" />
            </svg>
          </span>
          <input
            className="text-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email"
          />
        </div>

        {/* password */}
        <div className="input-group">
          <span className="icon-left" aria-hidden>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="currentColor">
              <path d="M8 1a4 4 0 0 0-4 4v2H3a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1h-1V5a4 4 0 0 0-4-4zM6 5a2 2 0 1 1 4 0v2H6V5z" />
            </svg>
          </span>
          <input
            className="text-input"
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Password"
          />
        </div>

        {errorMsg && <div className="form-error">{errorMsg}</div>}

        <button
          className="btn primary-btn"
          type="submit"
          disabled={loading || uploading}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor">
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 8.5h-2V11a.5.5 0 0 1-1 0V8.5H6.5a.5.5 0 0 1 0-1H8V5a.5.5 0 0 1 1 0v2.5h2.5a.5.5 0 0 1 0 1z" />
          </svg>
          {loading ? 'Signing up...' : 'Sign up'}
        </button>
      </form>
    </div>
  );
}
