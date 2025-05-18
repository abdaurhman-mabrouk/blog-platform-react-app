/* eslint-disable no-unused-vars */
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext.jsx';

function NewPost() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !body) {
      alert('العنوان والمحتوى مطلوبان!');
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
      await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });

      navigate('/feed'); // ارجع للصفحة الرئيسية بعد الإضافة
    } catch (error) {
      alert('حدث خطأ أثناء النشر!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>✍️ إضافة مقال جديد</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="عنوان المقال"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />

        <textarea
          placeholder="محتوى المقال"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={10}
          style={styles.textarea}
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'جارٍ النشر...' : 'نشر المقال'}
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

export default NewPost;
