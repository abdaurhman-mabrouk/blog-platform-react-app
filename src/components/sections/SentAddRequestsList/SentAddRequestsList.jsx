import React, { useState, useEffect } from 'react';
import { FetchUserSentAddRequestsByUsername } from '../../../services/FriendsServices';
import SentAddRequestCard from '../SentAddRequestCard/SentAddRequestCard';
import './SentAddRequestsList.css';

export default function SentAddRequestsList({ username }) {
  const [sentRequests, setSentRequests] = useState([]);

  useEffect(() => {
    // Fetch Sent Add Requests
    FetchUserSentAddRequestsByUsername(username).then((data) => {
      setSentRequests(data);
    });
  }, [username]);

  return (
    <div className="sent-requests-container">
      <h2 className="sent-requests-title">📤 Your Sent Friend Requests</h2>

      {sentRequests.length > 0 ? (
        <ul className="sent-requests-list">
          {sentRequests.map((request) => (
            <SentAddRequestCard
              key={request.id}
              requestId={request.id}
              requestSender={request.sender}
              requestReceiver={request.receiver}
              requestDate={request.date}
            />
          ))}
        </ul>
      ) : (
        <div className="no-requests">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            fill="#6c757d"
            className="bi bi-inbox"
            viewBox="0 0 16 16">
            <path
              d="M4.98 2a.5.5 0 0 0-.39.188l-3.5 
                     4.5A.5.5 0 0 0 1 7h3l2 2h4l2-2h3a.5.5 
                     0 0 0 .39-.812l-3.5-4.5A.5.5 0 0 
                     0 11.02 2zm-3.9 6a.5.5 0 0 0-.493.57l1 
                     7A1.5 1.5 0 0 0 3.08 17h9.84a1.5 
                     1.5 0 0 0 1.473-1.43l1-7A.5.5 0 
                     0 0 14.02 8h-2.775l-1.528 1.529a1.5 
                     1.5 0 0 1-1.06.44h-2.314a1.5 1.5 
                     0 0 1-1.06-.44L4.755 8H1.08z"
            />
          </svg>
          <p>No Sent Friend Requests</p>
        </div>
      )}
    </div>
  );
}
