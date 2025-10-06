/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
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
import { Link } from 'react-router-dom';
import './PostCard.css'; // external CSS

export default function PostCard({
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
  const [showComments, setShowComments] = useState(false);
  const [replyInputs, setReplyInputs] = useState([]);
  const [commentReplies, setCommentReplies] = useState([]);

  const toggleCommentsSection = () => setShowComments((prev) => !prev);
  const toggleCommentReplies = (commentId) =>
    setCommentReplies((prev) => ({ ...prev, [commentId]: !prev[commentId] }));

  return (
    <Link to={`/post/${postId}`} className="post-link">
      <div className="post-card">
        <div className="post-body">
          <div className="post-header">
            <h5 className="post-title">{postTitle}</h5>
            <div className="dropdown">
              <button className="dropdown-btn" type="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  viewBox="0 0 16 16">
                  <circle cx="2" cy="8" r="1.5" />
                  <circle cx="8" cy="8" r="1.5" />
                  <circle cx="14" cy="8" r="1.5" />
                </svg>
              </button>
              <ul className="dropdown-menu">
                {(postAuthor === user.username || user.role === 'admin') && (
                  <li>
                    <button
                      className="dropdown-item delete"
                      type="button"
                      onClick={() =>
                        DeletePostService(
                          postId,
                          postAuthor,
                          user.username,
                          user.role
                        )
                      }>
                      🗑 Delete
                    </button>
                  </li>
                )}
                {postAuthor === user.username && (
                  <li>
                    <button
                      className="dropdown-item edit"
                      type="button"
                      onClick={() =>
                        EditPostService(
                          postId,
                          postAuthor,
                          user.username,
                          user.role
                        )
                      }>
                      ✏ Edit
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <p className="post-text">{postBody}</p>
          <div className="post-meta">
            <span>👤 {postAuthor}</span> |{' '}
            <span>📅 {new Date(postDate).toLocaleDateString()}</span>
          </div>

          <div className="post-actions">
            <button
              className="action-btn"
              onClick={() => LikePostService(postId, postAuthor)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="silver"
                className="bi bi-hand-thumbs-up-fill"
                viewBox="0 0 16 16">
                <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a10 10 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733q.086.18.138.363c.077.27.113.567.113.856s-.036.586-.113.856c-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.2 3.2 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.8 4.8 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
              </svg>
              {Array.isArray(postLikes) ? postLikes.length : 0}
            </button>

            <button className="action-btn" onClick={toggleCommentsSection}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="silver"
                viewBox="0 0 16 16">
                <path d="M8 2a6 6 0 1 0 4.472 10.248L16 14l-1.752-3.528A6 6 0 0 0 8 2z" />
              </svg>
              {postComments?.length || 0}
            </button>

            <button
              className="action-btn"
              onClick={() => SharePostService(postId, user.username)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="silver"
                className="bi bi-share-fill"
                viewBox="0 0 16 16">
                <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5" />
              </svg>
              {postShares?.length || 0}
            </button>
          </div>

          {showComments && (
            <div className="comments-section">
              <h6>💬 Comments</h6>
              {Array.isArray(postComments) && postComments.length > 0 ? (
                postComments.map((comment) => (
                  <div key={comment.id} className="comment-card">
                    <div className="comment-header">
                      <span className="comment-user">{comment.username}</span>
                      <div className="comment-actions">
                        <button
                          className="comment-btn delete"
                          onClick={() =>
                            DeleteCommentService(
                              postId,
                              comment.id,
                              user.username,
                              user.role
                            )
                          }>
                          🗑
                        </button>
                        <button
                          className="comment-btn edit"
                          onClick={() =>
                            EditPostService(
                              postId,
                              postAuthor,
                              user.username,
                              user.role,
                              comment.id
                            )
                          }>
                          ✏
                        </button>
                        <button
                          className="comment-btn reply"
                          onClick={() => toggleCommentReplies(comment.id)}>
                          ↩
                        </button>
                      </div>
                    </div>
                    <div className="comment-text">{comment.text}</div>

                    {commentReplies[comment.id] && (
                      <div className="replies">
                        <strong>Replies</strong>
                        {Array.isArray(comment.replies) &&
                        comment.replies.length > 0 ? (
                          comment.replies.map((replay, key) => (
                            <div key={key} className="reply-item">
                              <span className="reply-user">
                                {replay.username}
                              </span>
                              : {replay.text}
                            </div>
                          ))
                        ) : (
                          <div className="no-replies">No replies yet.</div>
                        )}
                      </div>
                    )}

                    <div className="reply-box">
                      <input
                        type="text"
                        className="reply-input"
                        placeholder="Reply..."
                        value={replyInputs[comment.id] || ''}
                        onChange={(e) =>
                          setReplyInputs({
                            ...replyInputs,
                            [comment.id]: e.target.value,
                          })
                        }
                      />
                      <button
                        className="reply-btn"
                        onClick={() => {
                          ReplayCommentPostService(
                            postId,
                            postAuthor,
                            user.username,
                            user.role,
                            comment.id,
                            replyInputs[comment.id] || ''
                          );
                        }}>
                        Send
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-comments">No comments yet.</div>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
