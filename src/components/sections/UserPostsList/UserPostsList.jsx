import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../auth/AuthContext';
import PostCard from '../PostCard/PostCard';

function UserPostsList() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchUserPosts() {
      try {
        const response = await fetch(
          `http://192.168.1.13:3001/posts?author=${user.username}`,
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
    <>
      <div>
        {posts.length > 0 ? (
          posts.map((post, key) => (
            <PostCard
              key={post.id}
              postId={post.id}
              Author={post.author}
              postTitle={post.title}
              postBody={post.body}
              postLikes={post.likes}
              postComments={post.comments}
              postDate={post.createdAt}
            />
          ))
        ) : (
          <p>You Didn't Publish Posts Yet.</p>
        )}
      </div>
    </>
  );
}

export default UserPostsList;
