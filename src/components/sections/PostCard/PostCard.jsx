/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthContext';
import {
  CommentPostService,
  LikePostService,
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
