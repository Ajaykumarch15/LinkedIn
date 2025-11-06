// src/components/PostCard.jsx
import React, { useState } from 'react';
import api from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';

export default function PostCard({ post, onUpdate }) {
  const { user } = useAuth();
  const [comment, setComment] = useState('');
  const [showComment, setShowComment] = useState(false);

  const liked = post.likes.some((id) => id === user?.id || id === user?._id);

  const handleLike = async () => {
    await api.post(`/api/posts/${post._id}/like`);
    onUpdate();
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    await api.post(`/api/posts/${post._id}/comment`, { text: comment });
    setComment('');
    onUpdate();
  };

  return (
    <div className="post-card enhanced">
      <div className="post-header">
        <img src={post.user?.profileImage || 'https://placehold.co/40'} className="avatar" alt="user" />
        <div className="post-meta">
          <h4>{post.user?.name}</h4>
          <span>{new Date(post.createdAt).toLocaleString()}</span>
        </div>
      </div>

      <p className="post-text">{post.content}</p>

      <div className="post-actions">
        <button onClick={handleLike} className={liked ? 'liked' : ''}>
          👍 Like ({post.likes.length})
        </button>
        <button onClick={() => setShowComment((s) => !s)}>
          💬 Comment ({post.comments.length})
        </button>
      </div>

      {showComment && (
        <form onSubmit={handleComment} className="comment-box">
          <input
            type="text"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      )}

      {post.comments.length > 0 && (
        <div className="comments">
          {post.comments.map((c) => (
            <div key={c._id} className="comment">
              <strong>{c.user?.name}</strong> {c.text}
            </div>
          ))}
        </div>
      )}
      {post.mediaUrl && (
  <div className="post-media">
    {post.mediaUrl.endsWith(".mp4") || post.mediaUrl.endsWith(".mov") ? (
      <video src={post.mediaUrl} controls width="100%" />
    ) : (
      <img src={post.mediaUrl} alt="Post media" />
    )}
  </div>
)}

    </div>
  );
}
