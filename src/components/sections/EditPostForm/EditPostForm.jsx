/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { lazy } from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext';
import './EditPostForm.css';
const ConfirmProcessModal = lazy(() => {
  return import('../ConfirmProcessModal/ConfirmProcessModal');
});

function EditPostForm({ postId, postTitle, postBody }) {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState({
    title: '',
    body: '',
  });

  useEffect(() => {
    fetch(`http://192.168.1.13:3001/posts/${id}`, {
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
      fetch(`http://192.168.1.13:3001/posts/${id}`, {
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
      console.log('done');
    }
  };

  return (
    <>
      <div className="edit-post-form-container">
        <form className="edit-post-form">
          <h2>Edit Post</h2>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label htmlFor="body">Body:</label>
            <textarea
              id="body"
              value={post.body}
              onChange={(e) => setPost({ ...post, body: e.target.value })}
              required
            />
          </div>
          <button
            type="button"
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
    </>
  );
}

export default EditPostForm;
