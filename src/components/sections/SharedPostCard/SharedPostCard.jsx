import React from 'react';
import PostCard from '../PostCard/PostCard';
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export default function SharedPostCard({
  sharedPost,
  postId,
  postAuthor,
  postTitle,
  postBody,
  postDate,
  postLikes,
  postComments,
  postShares,
}) {
  return (
    <>
      <PostCard
        postId={postId}
        postAuthor={postAuthor}
        postTitle={postTitle}
        postDate={postDate}
        postLikes={postLikes}
        postComments={postComments}
        postShares={postShares}>
        <PostCard
          postId={sharedPost.id}
          postAuthor={sharedPost.author}
          postTitle={sharedPost.title}
          postBody={sharedPost.body}
          postDate={sharedPost.date}
          postLikes={sharedPost.likes}
          postComments={sharedPost.comments}
          postShares={sharedPost.shares}
        />
      </PostCard>
    </>
  );
}
