import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../auth/AuthContext';
import PostCard from '../PostCard/PostCard';

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;
const UI_BASE_URL = import.meta.env.VITE_BASE_URL;

function UserPostsList() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchUserPosts() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/posts?author=${user.username}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log('Error fetching posts:', error);
      }
    }

    if (user?.username) {
      fetchUserPosts();
    }
  }, [user?.username]);

  return (
    <div className="container my-4">
      <h2 className="mb-4">Your Posts</h2>
      <div className="col-12">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className="col-12 col-md-6 col-lg-4" key={post.id}>
              <PostCard
                postId={post.id}
                postAuthor={post.author}
                postTitle={post.title}
                postBody={post.body}
                postDate={post.createdAt}
                postLikes={post.likes}
                postComments={post.comments}
                postShares={post.shares}
              />
            </div>
          ))
        ) : (
          <div className="text-muted">You Didn't Publish Posts Yet.</div>
        )}
      </div>
    </div>
  );
}

export default UserPostsList;
