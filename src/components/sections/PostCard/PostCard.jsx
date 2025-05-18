/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

function PostCard() {
  const [post, setPost] = useState(null);

  useEffect(() => {
    try {
      fetch('http://localhost:3001/posts/1', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        } else {
          setPost(response.json());
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      console.log('done');
    }
  }, []);

  return <div className="post-card">{post && post}</div>;
}

export default PostCard;
