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
  EditPostService,
  DeleteCommentService,
  ReplayCommentPostService,
} from '../../../services/PostServices';
import './PostCard.css';

const API_BASE_URL = import.meta.env.VITE_BASE_API_URL;
const UI_BASE_URL = import.meta.env.VITE_BASE_URL;

function PostCard({
  postKey,
  postId,
  postTitle = 'Post_Title',
  postBody = 'Post_Body',
  postAuthor = '@User_Name',
  postDate = 'Post_Date',
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

  const togglePostMenu = (e) => {
    const postMenu = document.getElementById(`post_${postId}_menu`);

    if (postMenu.style.display == 'none') {
      postMenu.style.display = '';
    } else {
      postMenu.style.display = 'none';
    }
  };

  const toggleCommentReplies = (commentId) => {
    const repliesSection = document.getElementById(
      `comment_${commentId}_replies`
    );
    if (repliesSection.style.display === 'none') {
      repliesSection.style.display = 'block';
    } else {
      repliesSection.style.display = 'none';
    }
  };

  return (
    <>
      <div className="post-container" style={{ position: 'relative' }}>
        <span
          className="post-menu-mark-wrapper-container"
          onClick={togglePostMenu}>
          ...
          {/*Hidden Container for post-menu-mark*/}
          <div
            id={`post_${postId}_menu`}
            style={{
              display: 'none',
              position: 'absolute',
              top: '0',
              right: '0',
              padding: '3px',
              border: '1px solid #000',
            }}>
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
            {postAuthor === user.username ? (
              <button
                className="post-btn"
                type="button"
                onClick={() => {
                  EditPostService(postId, postAuthor, user.username, user.role);
                }}>
                Edit
              </button>
            ) : (
              ''
            )}
          </div>
        </span>
        <center>
          <Link
            to={`/post/${postId}`}
            style={{ textDecoration: 'none', color: 'black' }}>
            <div id={'post_' + postId} className="post-card">
              <span>
                <span className="post-title-wrapper-container">
                  <h3>{postTitle}</h3>
                </span>
              </span>
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
              <div
                key={key}
                className="post-comment"
                onClick={() => {
                  toggleCommentReplies(comment.id);
                }}>
                {/* Comment User icon SVG*/}
                <span>
                  <p className="post-comment-text">
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
                </span>
                <span>
                  <button
                    type="button"
                    onClick={() => {
                      DeleteCommentService(
                        postId,
                        postAuthor,
                        comment.id,
                        user.username,
                        user.role
                      );
                    }}>
                    Delete
                  </button>
                  <button type="button" onClick={() => {}}>
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const replayContainer = document.getElementById(
                        `post_${postId}_comment_${comment.id}_replay_container`
                      );
                      // Hide all other replay containers
                      const allReplayContainers =
                        document.querySelectorAll('.post-replay');
                      allReplayContainers.forEach((container) => {
                        if (container !== replayContainer) {
                          container.style.display = 'none';
                        }
                      });

                      // Show the clicked replay container
                      replayContainer.style.display =
                        replayContainer.style.display === 'block'
                          ? 'none'
                          : 'block';
                      const replayInput = document.getElementById(
                        `post_${postId}_comment_${comment.id}_replay_input`
                      );
                      replayInput.focus();
                    }}>
                    Reply
                  </button>
                </span>
                <div
                  className="post-replay"
                  id={`post_${postId}_comment_${comment.id}_replay_container`}
                  style={{ display: 'none' }}>
                  <input
                    type="text"
                    placeholder="Replay to This Comment."
                    id={`post_${postId}_comment_${comment.id}_replay_input`}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      ReplayCommentPostService(
                        postId,
                        postAuthor,
                        user.username,
                        user.role,
                        comment.id,
                        document.getElementById(
                          `post_${postId}_comment_${comment.id}_replay_input`
                        ).value
                      );
                    }}>
                    Replay
                  </button>
                </div>

                {/* Comment Replies Section */}
                <div
                  className="post-replies"
                  id={`comment_${comment.id}_replies`}
                  style={{
                    display: 'none',
                    padding: '10px',
                    marginTop: '10px',
                    border: '1px solid #000',
                  }}>
                  <h3>Replies</h3>

                  {Array.isArray(comment.replies) &&
                    comment.replies.map((replay, key) => {
                      return (
                        <div key={key} className="post-reply">
                          <p className="post-reply-text">
                            <strong>{replay.username}</strong>: {replay.text}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default PostCard;
