/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext';
import {
  CommentPostService,
  SharePostService,
  LikePostService,
  DeletePostService,
} from '../../../services/PostServices';
import './PostCard.css';

function PostCard({
  postKey,
  postId,
  postTitle,
  postBody,
  postAuthor,
  postDate,
  postLikes = [],
  postComments = [],
  postShares = [],
}) {
  const { user } = useAuth();

  const toggleCommentsSection = (postId) => {
    const commentsSection = document.getElementById(
      'post_' + postId + '_comments'
    );

    if (commentsSection.style.display == 'none') {
      commentsSection.style.display = 'block';
    } else {
      commentsSection.style.display = 'none';
    }
  };

  return (
    <>
      <div className="post-container">
        <center>
          <Link
            to={`/post/${postId}`}
            style={{ textDecoration: 'none', color: 'black' }}>
            <div key={postKey} id={'post_' + postId} className="post-card">
              <h3>{postTitle}</h3>
              <p>{postBody}</p>
              <p>Author: {postAuthor}</p>
              <p>Post Date: {new Date(postDate).toLocaleDateString()}</p>
            </div>
          </Link>
        </center>
        <center>
          <div className="post-controll-container">
            <button
              className="post-btn"
              type="button"
              onClick={() => {
                LikePostService(postId, postAuthor);
              }}>
              {Array.isArray(postLikes) ? postLikes.length : 0} Like
            </button>

            <button
              className="post-btn"
              type="button"
              onClick={() => {
                CommentPostService(postId, user.username);
              }}>
              {postComments.length} Comment
            </button>

            <button
              className="post-btn"
              type="button"
              onClick={() => {
                SharePostService(postId, user.username);
              }}>
              {postShares.length} Share
            </button>

            {postAuthor === user.username || user.role === 'admin' ? (
              <button
                className="post-btn"
                type="button"
                onClick={() => {
                  DeletePostService(
                    postId,
                    postAuthor,
                    user.username,
                    user.role
                  );
                }}>
                Delete
              </button>
            ) : (
              ''
            )}
          </div>
        </center>
        <button
          type="button"
          onClick={() => {
            toggleCommentsSection(postId);
          }}>
          Post Comments
        </button>
        <div className="post-comments" id={'post_' + postId + '_comments'}>
          {postComments.map((comment, key) => {
            return (
              <div key={key} className="post-comment">
                <p className="post-comment-text">
                  {/* Comment User icon SVG*/}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-person-circle"
                    viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path
                      fillRule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                    />
                  </svg>
                  {comment.username}: {comment.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default PostCard;
