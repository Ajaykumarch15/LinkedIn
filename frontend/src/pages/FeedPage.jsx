import React, { useEffect, useState } from 'react';
import api from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import './FeedPage.css';

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/posts');
      setPosts(res.data);
    } catch (err) {
      console.error('Fetch posts error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleNewPost = (createdPost) => {
    setPosts((prev) => [createdPost, ...prev]);
  };

  return (
    <div className="feed-container">
      <div className="feed-left">
        {/* Welcome Panel */}
        <div className="panel card welcome-card">
          <h2>Welcome{user ? `, ${user.name.split(' ')[0].toUpperCase()}` : ''}</h2>
          <p>Share an update with your professional community.</p>
        </div>

        {/* Post Create Box */}
        <PostForm onPostCreated={handleNewPost} />

        {/* Posts Feed */}
        {loading ? (
          <div className="card loading-card">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="card empty-feed">No posts yet. Be the first to share something!</div>
        ) : (
          posts.map((p) => (
            <PostCard key={p._id} post={p} onUpdate={fetchPosts} />
          ))
        )}
      </div>

      {/* Right Sidebar */}
      <div className="feed-right">
        <div className="card">
          <h4>Jobs</h4>
          <p>Coming soon — job posts will appear here.</p>
        </div>
        <div className="card">
          <h4>Suggestions</h4>
          <p>People you may know — coming soon.</p>
        </div>
      </div>
    </div>
  );
}
