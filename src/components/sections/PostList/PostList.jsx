/* eslint-disable no-unused-vars */
import React from 'react';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../auth/AuthContext.jsx';
import PostCard from '../PostCard/PostCard.jsx';

function PostList() {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://192.168.1.13:3001/posts', {
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
    <div>
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
          />
        );
      })}
    </div>
  );
}

export default PostList;
