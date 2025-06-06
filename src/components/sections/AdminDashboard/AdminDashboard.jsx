import React, { useEffect, useState } from 'react';
import {
  FetchLikesService,
  FetchPostsService,
  FetchUsersService,
  FetchCommentsService,
} from '../../../services/PostServices';

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;
const UI_BASE_URL = import.meta.env.VITE_BASE_URL;

function AdminDashboard() {
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
    <>
      <div className="admin-dashboard-container">
        <h2 className="admin-dashboard-title">Admin Dashboard</h2>
        <div className="admin-dashboard-grid">
          <div className="admin-dashboard-card users">
            <span className="admin-dashboard-count">{users.length}</span>
            <span className="admin-dashboard-label">Total Users</span>
          </div>
          <div className="admin-dashboard-card posts">
            <span className="admin-dashboard-count">{posts.length}</span>
            <span className="admin-dashboard-label">Total Posts</span>
          </div>
          <div className="admin-dashboard-card likes">
            <span className="admin-dashboard-count">{likesCount}</span>
            <span className="admin-dashboard-label">Total Likes</span>
          </div>
          <div className="admin-dashboard-card comments">
            <span className="admin-dashboard-count">{commentsCount}</span>
            <span className="admin-dashboard-label">Total Comments</span>
          </div>
        </div>
        <style>{`
        .admin-dashboard-container {
          max-width: 480px;
          margin: 2rem auto;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          padding: 2rem;
        }
        .admin-dashboard-title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          text-align: center;
          color: #2d3748;
        }
        .admin-dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .admin-dashboard-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          border-radius: 10px;
          padding: 1rem;
          background: #f9fafb;
        }
        .admin-dashboard-card.users { background: #e3edfa; }
        .admin-dashboard-card.posts { background: #e6f9ea; }
        .admin-dashboard-card.likes { background: #fffbe6; }
        .admin-dashboard-card.comments { background: #f3e8ff; }
        .admin-dashboard-count {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        .admin-dashboard-card.users .admin-dashboard-count { color: #2563eb; }
        .admin-dashboard-card.posts .admin-dashboard-count { color: #059669; }
        .admin-dashboard-card.likes .admin-dashboard-count { color: #ca8a04; }
        .admin-dashboard-card.comments .admin-dashboard-count { color: #7c3aed; }
        .admin-dashboard-label {
          color: #4b5563;
          margin-top: 0.25rem;
        }
      `}</style>
      </div>
    </>
  );
}

export default AdminDashboard;
