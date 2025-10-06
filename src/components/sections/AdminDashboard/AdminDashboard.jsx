import React, { useEffect, useState } from 'react';
import {
  FetchLikesService,
  FetchPostsService,
  FetchUsersService,
  FetchCommentsService,
} from '../../../services/PostServices';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllData() {
      try {
        const [fetchedPosts, fetchedUsers, totalLikes, totalComments] =
          await Promise.all([
            FetchPostsService(),
            FetchUsersService(),
            FetchLikesService(),
            FetchCommentsService(),
          ]);

        setPosts(Array.isArray(fetchedPosts) ? fetchedPosts : []);
        setUsers(Array.isArray(fetchedUsers) ? fetchedUsers : []);
        setLikesCount(typeof totalLikes === 'number' ? totalLikes : 0);
        setCommentsCount(typeof totalComments === 'number' ? totalComments : 0);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllData();
  }, []);

  if (loading) return <p>Loading admin dashboard...</p>;

  return (
    <div className="admin-dashboard-container">
      <h2 className="admin-dashboard-title">Admin Dashboard</h2>
      <div className="admin-dashboard-grid">
        <Link to={`/users`}>
          <div className="admin-dashboard-card users">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="admin-dashboard-icon"
              viewBox="0 0 24 24"
              fill="currentColor">
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
            <span className="admin-dashboard-count">{users.length}</span>
            <span className="admin-dashboard-label">Total Users</span>
          </div>
        </Link>

        <Link to={`/feed`}>
          <div className="admin-dashboard-card posts">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="admin-dashboard-icon"
              viewBox="0 0 24 24"
              fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14l4-4h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
            </svg>
            <span className="admin-dashboard-count">{posts.length}</span>
            <span className="admin-dashboard-label">Total Posts</span>
          </div>
        </Link>

        <Link to={`/feed`}>
          <div className="admin-dashboard-card likes">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="admin-dashboard-icon"
              viewBox="0 0 24 24"
              fill="currentColor">
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 
              6 4 4 6.5 4c1.74 0 3.41 1 4.22 2.44C11.09 
              5 12.76 4 14.5 4 17 4 19 6 19 
              8.5c0 3.78-3.4 6.86-8.55 
              11.54L12 21.35z"
              />
            </svg>
            <span className="admin-dashboard-count">{likesCount}</span>
            <span className="admin-dashboard-label">Total Likes</span>
          </div>
        </Link>

        <Link to={`/feed`}>
          <div className="admin-dashboard-card comments">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="admin-dashboard-icon"
              viewBox="0 0 24 24"
              fill="currentColor">
              <path
                d="M21 6h-2v9H6v2c0 .55.45 1 1 
              1h11l4 4V7c0-.55-.45-1-1-1zM17 
              12V3c0-.55-.45-1-1-1H3c-.55 0-1 
              .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"
              />
            </svg>
            <span className="admin-dashboard-count">{commentsCount}</span>
            <span className="admin-dashboard-label">Total Comments</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
