/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { lazy } from 'react';
import { useState, useEffect } from 'react';
import { Meta, useParams } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
const ConfirmProcessModal = lazy(() => {
  return import('../ConfirmProcessModal/ConfirmProcessModal');
});

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;
const UI_BASE_URL = import.meta.env.VITE_BASE_URL;

export default function EditPostForm({ postId, postTitle, postBody }) {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState({
    title: '',
    body: '',
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setPost({
          title: data.title,
          body: data.body,
        });
      })
      .catch((error) => {
        setPost(null);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      fetch(`${API_BASE_URL}/posts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: post.title,
          body: post.body,
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      window.location.href = `${UI_BASE_URL}/post/${id}`;
    }
  };

  return (
    <div className="container py-4">
      <form
        className="bg-white p-4 rounded shadow-sm"
        onSubmit={(e) => e.preventDefault()}>
        <h2 className="mb-4">Edit Post</h2>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="body" className="form-label">
            Body:
          </label>
          <textarea
            id="body"
            className="form-control"
            value={post.body}
            onChange={(e) => setPost({ ...post, body: e.target.value })}
            required
          />
        </div>

        <button
          type="button"
          className="btn btn-primary w-100 mb-3"
          onClick={handleSubmit}
          data-bs-toggle="modal"
          data-bs-target="#confirmProcessModal">
          Update Post
        </button>

        <ConfirmProcessModal
          modalTitle={'Are You Sure ?'}
          modalBody={'To Update The Post Click Confirm!'}
          modalBtnFunction={handleSubmit}
          modalBtnText={'Update'}
        />
      </form>
    </div>
  );
}
