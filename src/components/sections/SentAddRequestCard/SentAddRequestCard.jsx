import React from 'react';
import { CancelFriendSentRequest } from '../../../services/FriendsServices';
import './SentAddRequestCard.css'; // External CSS
import { Link } from 'react-router-dom';

export default function SentAddRequestCard({
  requestId,
  requestSender,
  requestReceiver,
  requestDate,
}) {
  return (
    <div className="sent-request-card" id={requestId}>
      <div className="sent-request-info">
        <div className="user-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="45"
            height="45"
            fill="#0d6efd"
            viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242
              11.226 4.805 10 8 10s4.757 1.225
              5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>
        </div>
        <div className="request-text">
          You sent a friend request to{' '}
          <Link to={`/user/${requestReceiver}`}>
            <strong className="receiver">{requestReceiver}</strong>
          </Link>
          <br />
          <small className="date">{new Date(requestDate).toDateString()}</small>
        </div>
      </div>

      {/* Cancel Friend Request */}
      <button
        className="cancel-btn"
        type="button"
        onClick={() => CancelFriendSentRequest(requestId)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="#fff"
          viewBox="0 0 16 16">
          <path
            d="M5.5 5.5a.5.5 0 0 1 .5.5v6.5a.5.5 0 0 1-1
          0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0
          1 .5.5v6.5a.5.5 0 0 1-1
          0V6a.5.5 0 0 1 .5-.5zm2.5.5a.5.5 0 0
          1 1 0v6.5a.5.5 0 0 1-1
          0V6z"
          />
          <path
            fillRule="evenodd"
            d="M14.5 3a1 1 0 0 1-1
            1H13v9a2 2 0 0 1-2
            2H5a2 2 0 0 1-2-2V4h-.5a1
            1 0 0 1 0-2h3.5V1a1
            1 0 0 1 1-1h2a1 1 0 0 1 1
            1v1h3.5a1 1 0 0 1 1
            1zM5.118 4 5 4.059V13a1
            1 0 0 0 1 1h6a1 1 0 0
            0 1-1V4.059L10.882 4H5.118zM8
            1a.5.5 0 0 0-.5.5V2h1v-.5A.5.5
            0 0 0 8 1z"
          />
        </svg>
        Cancel
      </button>
    </div>
  );
}
