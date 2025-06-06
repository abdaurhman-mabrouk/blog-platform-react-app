/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

//Environment Variables init
const VITE_BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

// Like Post Service
export async function LikePostService(postId, username) {
  try {
    const response = await fetch(`${VITE_BASE_API_URL}/posts/${postId}`);
    const data = await response.json();

    let updatedLikes;
    if (data.likes?.includes(username)) {
      // Remove the like if user already liked
      updatedLikes = data.likes.filter((user) => user !== username);
    } else {
      // Add the like if user hasn't liked yet
      updatedLikes = [...(data.likes || []), username];
    }

    const updateResponse = await fetch(`${VITE_BASE_API_URL}/posts/${postId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ likes: updatedLikes }),
    });

    return await updateResponse.json();
  } catch (error) {
    console.error('Failed to like post:', error);
    throw error;
  }
}

// Comment Post Service
export async function CommentPostService(postId, username) {
  try {
    const response = await fetch(`${VITE_BASE_API_URL}/posts/${postId}`);
    const data = await response.json();

    const comment = window.prompt('Enter Your Comment:');
    if (!comment) return;

    const commentId =
      Date.now().toString() + Math.random().toString(36).substr(2, 9);

    const updatedComments = [
      ...(data.comments || []),
      { id: commentId, username, text: comment },
    ];

    const updateResponse = await fetch(`${VITE_BASE_API_URL}/posts/${postId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comments: updatedComments }),
    });

    return await updateResponse.json();
  } catch (error) {
    console.error('Failed to comment on post:', error);
    throw error;
  }
}
// Comment Post Service
export async function ReplayCommentPostService(
  postId,
  postAuthor,
  username,
  userRole,
  commentId,
  replayText
) {
  try {
    const response = await fetch(`${VITE_BASE_API_URL}/posts/${postId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();

    const replay = replayText.trim();
    if (!replay) return;

    const replayId =
      Date.now().toString() + Math.random().toString(36).substr(2, 9);

    const updatedComments = data.comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [
            ...(comment.replies || []),
            { id: replayId, username, text: replay },
          ],
        };
      }
      return comment;
    });

    const updateResponse = await fetch(`${VITE_BASE_API_URL}/posts/${postId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comments: updatedComments }),
    });
    return await updateResponse.json();
  } catch (error) {
    console.error('Failed to comment on post:', error);
    throw error;
  }
}

//Delete Comment Service
export async function DeleteCommentService(
  postId,
  postAuthor,
  commentId,
  username,
  userRole
) {
  //Check if the User is the Author of the Post or Admin
  if (postAuthor === username || userRole === 'admin') {
    //fetch the comment's post data
    try {
      const response = await fetch(`${VITE_BASE_API_URL}/posts/${postId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();

      //Check if the comments exist
      if (!data || !data.comments) return;

      //Confirm the deletion
      const confirmDeletion = window.confirm(
        'Are you sure you want to delete this comment? This action cannot be undone.'
      );

      if (confirmDeletion) {
        //Filter out the comment to be deleted
        const updatedComments = data.comments.filter(
          (comment) => comment.id !== commentId
        );

        //Update the post Comments
        const updatedResponse = await fetch(
          `${VITE_BASE_API_URL}/posts/${postId}`,
          {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ comments: updatedComments }),
          }
        );
      } else {
        return;
      }
    } catch (error) {
      console.error('Failed to delete comment:', error);
      throw error;
    } finally {
      console.log('Comment deletion process completed.');
    }
  }
}

// Share Post Service
export async function SharePostService(postId, username) {
  try {
    const response = await fetch(`${VITE_BASE_API_URL}/posts/${postId}`);
    const data = await response.json();

    const updatedShares = [...(data.shares || []), username];

    const updateResponse = await fetch(`${VITE_BASE_API_URL}/posts/${postId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ shares: updatedShares }),
    });

    return await updateResponse.json();
  } catch (error) {
    console.error('Failed to share post:', error);
    throw error;
  }
}

export async function EditPostService(postId, username) {
  window.location.href.assign(`/edit_post/${postId}`);
}

//Delete Post Service
export async function DeletePostService(
  postId,
  postAuthor,
  username,
  userRole
) {
  if (postAuthor === username || userRole === 'admin') {
    try {
      const response = await fetch(`${VITE_BASE_API_URL}/posts/${postId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    alert('You Can Not Delete This Post!');
  }
}

// Fetch All Posts Service
export async function FetchPostsService() {
  try {
    const response = await fetch(`${VITE_BASE_API_URL}/posts`);
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    throw error;
  }
}

// Fetch All Posts Service
export async function FetchPostByIdService(postId) {
  try {
    const response = await fetch(`${VITE_BASE_API_URL}/posts/${postId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    throw error;
  }
}

// Fetch User Posts Service
export async function FetchUserPostsService(username, userId) {
  try {
    const query = username
      ? `username=${username}`
      : userId
        ? `userId=${userId}`
        : '';

    if (!query) return [];

    const response = await fetch(`${VITE_BASE_API_URL}/posts?${query}`);
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch user posts:', error);
    throw error;
  }
}

// Fetch Users Service
export async function FetchUsersService(username, userId) {
  try {
    let url = `${VITE_BASE_API_URL}/users`;
    if (username) url += `?username=${username}`;
    else if (userId) url += `/${userId}`;

    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
}

// Fetch Likes Service
export async function FetchLikesService(username) {
  try {
    const response = await fetch(`${VITE_BASE_API_URL}/posts`);
    const data = await response.json();

    if (username) {
      return data.filter((post) => post.likes?.includes(username));
    } else {
      return data.reduce((total, post) => total + (post.likes?.length || 0), 0);
    }
  } catch (error) {
    console.error('Failed to fetch likes:', error);
    throw error;
  }
}

// Fetch Comments Service
export async function FetchCommentsService(username) {
  try {
    const response = await fetch(`${VITE_BASE_API_URL}/posts`);
    const data = await response.json();

    if (username) {
      return data
        .flatMap((post) => post.comments || [])
        .filter((comment) => comment.username === username);
    } else {
      return data.reduce(
        (total, post) => total + (post.comments?.length || 0),
        0
      );
    }
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    return 0;
  }
}

// Fetch Admin Data
export async function FetchAdminDataService(username, userId) {
  try {
    const [users, posts] = await Promise.all([
      FetchUsersService(username, userId),
      FetchPostsService(),
    ]);
    return { users, posts };
  } catch (error) {
    console.error('Failed to fetch admin data:', error);
    throw error;
  }
}
