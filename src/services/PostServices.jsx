/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';

//Like Post Service/Function
export async function LikePostService(postId, username) {
  try {
    const response = await fetch(`http://192.168.1.13:3001/posts/${postId}`);
    const data = await response.json();

    if (data.likes.includes(username)) {
      alert('You already liked this post!');
      return;
    }

    const updatedLikes = [...data.likes, username];

    const updateResponse = await fetch(
      `http://192.168.1.13:3001/posts/${postId}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ likes: updatedLikes }),
      }
    );

    return await updateResponse.json();
  } catch (error) {
    console.error('Failed to like post:', error);
    throw error;
  }
}

//Comment Post Service/Function
export async function CommentPostService(postId, username) {
  try {
    const response = await fetch(`http://192.168.1.13:3001/posts/${postId}`);
    const data = await response.json();

    const comment = window.prompt('Enter Your Comment:');
    if (!comment) return;

    if (!Array.isArray(data.comments)) {
      data.comments = [];
    }

    data.comments.push({ username: username, text: comment });

    const updateResponse = await fetch(
      `http://192.168.1.13:3001/posts/${postId}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comments: data.comments }),
      }
    );

    return await updateResponse.json();
  } catch (error) {
    console.error('Failed to comment on post:', error);
    throw error;
  }
}
