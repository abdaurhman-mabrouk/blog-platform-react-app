import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext';
import {
  SendFriendRequest,
  UnfriendUserByUsername,
} from '../../../services/FriendsServices';
import './FriendCard.css'; // external CSS

function FriendCard({ friend }) {
  const { user } = useAuth();

  const isFriend =
    user?.friends &&
    user.friends.includes(
      typeof friend === 'string' ? friend : friend.username
    );

  return (
    <div className="friend-card shadow-sm border-0">
      <div className="friend-card-body d-flex align-items-center gap-3">
        {/* Friend Profile */}
        <Link to={`/user/${friend.username}`} className="friend-link">
          <span className="friend-avatar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              fill="#0d6efd"
              className="bi bi-person-circle"
              viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                fillRule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8
                   m8-7a7 7 0 0 0-5.468 11.37C3.242
                   11.226 4.805 10 8 10s4.757 1.225
                   5.468 2.37A7 7 0 0 0 8 1"
              />
            </svg>
          </span>
          <span className="friend-info">
            <h5 className="friend-name">
              {typeof friend === 'string' ? friend : friend.username}
            </h5>
          </span>
        </Link>

        {/* Friend Actions */}
        <span className="ms-auto friend-actions">
          {isFriend ? (
            <button
              className="btn-friend unfriend-btn"
              onClick={() => {
                UnfriendUserByUsername(
                  user.id,
                  'f',
                  typeof friend === 'string' ? friend : friend.username
                );
              }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="#dc3545"
                className="bi bi-person-fill-dash"
                viewBox="0 0 16 16">
                <path
                  d="M12.5 16a3.5 3.5 0 1 0
                         0-7 3.5 3.5 0 0 0 0 7M11
                         12h3a.5.5 0 0 1 0 1h-3a.5.5
                         0 0 1 0-1m0-7a3 3 0 1 1-6
                         0 3 3 0 0 1 6 0"
                />
                <path
                  d="M2 13c0 1 1 1 1
                         1h5.256A4.5 4.5 0 0 1 8
                         12.5a4.5 4.5 0 0 1
                         1.544-3.393Q8.844 9.002
                         8 9c-5 0-6 3-6 4"
                />
              </svg>
            </button>
          ) : (
            <button
              className="btn-friend addfriend-btn"
              onClick={() => {
                SendFriendRequest(user.id, user.username, friend.username);
              }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="#198754"
                className="bi bi-person-plus-fill"
                viewBox="0 0 16 16">
                <path
                  d="M1 14s-1 0-1-1 
                         1-4 6-4 6 3 6 4-1 1-1 
                         1zm5-6a3 3 0 1 0 
                         0-6 3 3 0 0 0 0 6"
                />
                <path
                  fillRule="evenodd"
                  d="M13.5 5a.5.5 0 0 1 
                     .5.5V7h1.5a.5.5 0 0 1 0 
                     1H14v1.5a.5.5 0 0 1-1 
                     0V8h-1.5a.5.5 0 0 1 
                     0-1H13V5.5a.5.5 0 0 1 
                     .5-.5"
                />
              </svg>
            </button>
          )}
        </span>

        {/* Chat Icon if already friends */}
        {isFriend && (
          <span className="chat-icon ms-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="#198754"
              className="bi bi-chat-square-fill"
              viewBox="0 0 16 16">
              <path
                d="M2 0a2 2 0 0 0-2 
                       2v8a2 2 0 0 0 2 
                       2h2.5a1 1 0 0 1 
                       .8.4l1.9 2.533a1 
                       1 0 0 0 1.6 0l1.9-2.533a1 
                       1 0 0 1 .8-.4H14a2 
                       2 0 0 0 2-2V2a2 2 0 
                       0 0-2-2z"
              />
            </svg>
          </span>
        )}
      </div>
    </div>
  );
}

export default FriendCard;
