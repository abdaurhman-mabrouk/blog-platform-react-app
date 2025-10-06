import React, { useState, useEffect } from 'react';
import AddRequestCard from '../AddRequestCard/AddRequestCard';
import { FetchUserAddRequestsByUsername } from '../../../services/FriendsServices';
import './UserAddRequestsList.css';

export default function UserAddRequestsList({ username }) {
  const [addRequests, setAddRequests] = useState([]);

  useEffect(() => {
    if (!username) return;

    FetchUserAddRequestsByUsername(username)
      .then((requests) => setAddRequests(requests))
      .catch((error) => console.error('Error fetching add requests:', error));
  }, [username]);

  return (
    <div className="requests-container">
      <div className="requests-header">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-person-fill-add"
          viewBox="0 0 16 16">
          <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
          <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
        </svg>
        <h2>Your Add Requests</h2>
      </div>

      <ul className="requests-list">
        {addRequests.length > 0 ? (
          addRequests.map((request) => (
            <AddRequestCard
              key={request.id}
              requestId={request.id}
              requestSender={request.sender}
              requestReceiver={request.receiver}
            />
          ))
        ) : (
          <p className="empty-message">No Add Requests</p>
        )}
      </ul>
    </div>
  );
}
