﻿/* eslint-disable no-unused-vars */
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext.jsx';

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
    <div style={styles.container}>
      <h2>✍️ Add New Post</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        <textarea
          placeholder="Post Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={10}
          style={styles.textarea}
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Publishing...' : 'Publish Post'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: { padding: '20px', maxWidth: '700px', margin: '0 auto' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: { padding: '10px', fontSize: '16px' },
  textarea: { padding: '10px', fontSize: '16px' },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#0077cc',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

export default NewPostForm;
