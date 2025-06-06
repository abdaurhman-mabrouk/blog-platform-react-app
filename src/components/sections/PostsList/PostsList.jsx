/* eslint-disable no-unused-vars */
import React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../auth/AuthContext.jsx';
import PostCard from '../PostCard/PostCard.jsx';

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;
const UI_BASE_URL = import.meta.env.VITE_BASE_URL;

function PostList() {
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
    <div className="post-list-container">
      {posts.map((post, key) => {
        return (
          <PostCard
            key={key}
            postKey={key}
            postId={post.id}
            postAuthor={post.author}
            postDate={post.createdAt}
            postTitle={post.title}
            postBody={post.body}
            postLikes={post.likes}
            postComments={post.comments}
            postShares={post.shares}
          />
        );
      })}
    </div>
  );
}

export default PostList;
