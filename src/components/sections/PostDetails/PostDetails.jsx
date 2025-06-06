/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../auth/AuthContext';
import PostCard from '../PostCard/PostCard';
import { useParams } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;
const UI_BASE_URL = import.meta.env.VITE_BASE_URL;

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/posts/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch post');
      })
      .then((data) => {
        setPost(data);
      })
      .catch((error) => {
        setPost(null);
      });
  }, [id]);

  return (
    <>
      {post && (
        <PostCard
          postKey={post.id}
          postId={post.id}
          postTitle={post.title}
          postBody={post.body}
          postAuthor={post.author}
          postDate={post.createdAt}
          postComments={post.comments}
          postLikes={post.likes}
          postShares={post.shares}
        />
      )}
    </>
  );
}

export default PostDetails;
