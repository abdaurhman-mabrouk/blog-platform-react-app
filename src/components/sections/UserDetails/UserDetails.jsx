import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../auth/AuthContext';
import { useParams } from 'react-router-dom';
import { FetchUserPostsService } from '../../../services/PostServices';
import PostCard from '../PostCard/PostCard';
import './UserDetails.css';

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;

export default function UserDetails() {
  const [userDetails, setUserDetails] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/users?username=${username}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        if (!response.ok) throw new Error('Failed to fetch user details');

        const data = await response.json();
        setUserDetails(data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();
  }, [username]);

  useEffect(() => {
    if (userDetails) {
      const fetchUserPosts = async () => {
        try {
          const posts = await FetchUserPostsService(
            userDetails.username,
            userDetails.id
          );
          setUserPosts(posts);
        } catch (error) {
          console.error('Failed to fetch user posts:', error);
        }
      };
      fetchUserPosts();
    }
  }, [userDetails]);

  return (
    <div className="user-details-container">
      {userDetails ? (
        <>
          {/* Cover */}
          <div className="cover">
            <img
              className="avatar"
              src="https://via.placeholder.com/120"
              alt="User Avatar"
            />
          </div>

          {/* Info */}
          <div className="profile-info">
            <h1>{userDetails.username}</h1>
            <p className="text-muted">{userDetails.email} • Egypt</p>
            <div className="profile-meta">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="#0d6efd"
                  className="bi bi-person-badge"
                  viewBox="0 0 16 16">
                  <path
                    d="M6.5 2a2 2 0 1 1 3 0H13a1
                          1 0 0 1 1 1v10a1 1 0 0
                          1-1 1H3a1 1 0 0 1-1-1V3a1
                          1 0 0 1 1-1h3.5zM8 4a1
                          1 0 1 0 0-2 1 1 0 0 0
                          0 2zm-3 8h6v-.5a2.5 2.5
                          0 0 0-5 0V12z"
                  />
                </svg>{' '}
                Role: {userDetails.role}
              </span>

              {/*Friends Svg*/}
              <span>
                👤 Friends: ({userDetails.friends.length}){' '}
                {userDetails.friends.join(', ')}
              </span>
            </div>
          </div>

          {/* Bio */}
          <div className="section">
            <h2>📝 Bio</h2>
            <p>{userDetails.bio || 'No bio available.'}</p>
          </div>

          {/* Posts */}
          <div className="section">
            <h2>📰 Posts</h2>
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <PostCard
                  key={post.id}
                  postId={post.id}
                  postTitle={post.title}
                  postBody={post.body}
                  postAuthor={post.author}
                  postDate={post.createdAt}
                  postLikes={post.likes}
                  postComments={post.comments}
                  postShares={post.shares}
                />
              ))
            ) : (
              <div className="no-posts">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  fill="#6c757d"
                  className="bi bi-journal-x"
                  viewBox="0 0 16 16">
                  <path
                    d="M6 8.707 4.646
                          10.354l-.708-.708L5.293
                          8 3.938 6.646l.708-.708L6
                          7.293l1.354-1.355.708.708L6.707
                          8l1.355 1.354-.708.708L6
                          8.707z"
                  />
                  <path
                    d="M3 0h10a2 2 0 0 
                          1 2 2v12a2 2 0 0 
                          1-2 2H3a2 2 0 0 
                          1-2-2V2a2 2 0 0 
                          1 2-2zm0 
                          1a1 1 0 0 0-1 
                          1v12a1 1 0 0 0 
                          1 1h10a1 1 0 0 
                          0 1-1V2a1 1 0 0 
                          0-1-1H3z"
                  />
                </svg>
                <p>No posts yet.</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="loading">Loading user details...</div>
      )}
    </div>
  );
}
