/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext.jsx';

import './NewPostForm.css'; // ✅ custom CSS with SVG support

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;
const UI_BASE_URL = import.meta.env.VITE_BASE_URL;

function NewPostForm() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !body) {
      alert('The Post Title and Body are required!');
      return;
    }

    setLoading(true);

    const newPost = {
      title,
      body,
      author: user.username,
      userId: user.id,
      createdAt: new Date().toISOString(),
    };

    try {
      await fetch('http://192.168.1.13:3001/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });

      navigate('/feed');
    } catch (error) {
      alert('An error occurred while posting!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrapper">
      <h2 className="form-title">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          viewBox="0 0 16 16">
          <path d="M12.854.146a.5.5 0 0 1 .11.54L12.5 2l1.646 1.646a.5.5 0 0 1-.708.708L11.793 2.707l-1.147.764a.5.5 0 0 1-.54-.11l-1-1a.5.5 0 0 1 .11-.74l4-2a.5.5 0 0 1 .638.069zM11 5.5v6.379a1.5 1.5 0 0 1-.44 1.06l-3.5 3.5a1.5 1.5 0 0 1-2.12 0l-3.5-3.5A1.5 1.5 0 0 1 1 11.879V5.5A2.5 2.5 0 0 1 3.5 3h7A2.5 2.5 0 0 1 13 5.5z" />
        </svg>
        Add New Post
      </h2>

      <form onSubmit={handleSubmit} className="post-form">
        {/* Title Input */}
        <div className="form-group">
          <span className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69 12.31 1.541l1.043-1.043a.5.5 0 0 1 .707 0l1.442 1.442zm-1.75 2.456L9.708 8.44a.5.5 0 0 1-.168.11l-3.5 1.5a.5.5 0 0 1-.65-.65l1.5-3.5a.5.5 0 0 1 .11-.168l4.043-4.043 2.146 2.147z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Body Input */}
        <div className="form-group">
          <span className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              viewBox="0 0 16 16">
              <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm1 3.5h6v1H5v-1zm0 3h6v1H5v-1zm0 3h6v1H5v-1z" />
            </svg>
          </span>
          <textarea
            placeholder="Post Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={10}
            required
          />
        </div>

        {/* Button */}
        <button type="submit" disabled={loading} className="btn-submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            viewBox="0 0 16 16">
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.5 13a.5.5 0 0 1-.958-.002L8.66 9.373 1.316 6.994a.5.5 0 0 1-.002-.958l13-5.5a.5.5 0 0 1 .54.11z" />
          </svg>
          {loading ? 'Publishing...' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
}

export default NewPostForm;
