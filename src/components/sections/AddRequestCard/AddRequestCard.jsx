import React from 'react';
import './AddRequestCard.css';
import {
  AcceptFriendRequest,
  DenclineFriendRequest,
} from '../../../services/FriendsServices';

export default function AddRequestCard({
  requestId,
  requestSender,
  requestReceiver,
  requestDate,
}) {
  return (
    <>
      <div className="add-request-card-main-container" id={requestId}>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="45"
            height="45"
            fill="#0d6efd"
            className="bi bi-person-circle"
            viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
            />
          </svg>
        </span>
        {requestSender} Send To You a Friend Request.
        {/*Accept a Friend Request*/}
        <span
          style={{
            width: '140px',
            float: 'right',
            justifyContent: 'space-between',
          }}>
          <button
            type="button"
            onClick={() => {
              AcceptFriendRequest(requestId, requestSender, requestReceiver);
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="38"
              height="38"
              fill="#0f0"
              className="bi bi-check-circle-fill"
              viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
          </button>

          {/* Disagree a Friend Request */}
          <button
            type="button"
            onClick={() => {
              DenclineFriendRequest(requestId, requestSender, requestReceiver);
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="38"
              height="38"
              fill="#f00"
              className="bi bi-x-circle-fill"
              viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
            </svg>
          </button>
        </span>
      </div>
    </>
  );
}
