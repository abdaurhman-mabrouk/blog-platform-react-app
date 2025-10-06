/* eslint-disable no-unused-vars */
import React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../auth/AuthContext.jsx';
import PostCard from '../PostCard/PostCard.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;
const UI_BASE_URL = import.meta.env.VITE_BASE_URL;

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/posts`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        setPosts(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        console.log('done');
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      <center>
        <div className="container my-4" style={{ width: '90%' }}>
          <h2 className="mb-4">All Posts</h2>
          <div className="col-12">
            {posts.map((post) => (
              <div
                className="col-12 col-md-6 col-lg-4"
                key={post.id}
                id={`post_${post.id}`}>
                <PostCard
                  postId={post.id}
                  postAuthor={post.author}
                  postDate={post.createdAt}
                  postTitle={post.title}
                  postBody={post.body}
                  postLikes={post.likes}
                  postComments={post.comments}
                  postShares={post.shares}
                />
              </div>
            ))}
          </div>
        </div>
      </center>
    </>
  );
}
