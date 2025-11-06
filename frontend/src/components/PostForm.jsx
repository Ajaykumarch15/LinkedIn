import React, { useState,useEffect } from "react";
import api from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import Modal from "./Modal";

export default function PostForm({ onPostCreated }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
  if (open) document.body.style.overflow = "hidden";
  else document.body.style.overflow = "auto";
}, [open]);


  // Handle local file preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setMedia(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !media) {
      alert("Please write something or attach a media file.");
      return;
    }

    setLoading(true);
    try {
      let mediaUrl = "";

      if (media) {
        const formData = new FormData();
        formData.append("media", media);
        const uploadRes = await api.post("/api/posts/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        mediaUrl = uploadRes.data.mediaUrl;
      }

      const res = await api.post("/api/posts", { content, mediaUrl });
      onPostCreated(res.data);
      setContent("");
      setMedia(null);
      setPreview("");
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Error creating post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card post-box">
      <div className="post-start">
        <img
          src={user?.profileImage || "https://placehold.co/40"}
          alt=""
          className="avatar"
        />
        <button className="post-btn" onClick={() => setOpen(true)}>
          Start a post
        </button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title="Create a Post">
  <div className="modal-body">
    <form onSubmit={handleSubmit}>
      <textarea
        rows={4}
        placeholder="What do you want to talk about?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          width: "100%",
          border: "1px solid #ddd",
          borderRadius: "6px",
          padding: "8px",
          marginBottom: "12px",
        }}
      />

      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        style={{ marginBottom: "12px" }}
      />

      {preview && (
        <div style={{ marginBottom: "12px", textAlign: "center" }}>
          {media.type.startsWith("video") ? (
            <video
              src={preview}
              width="100%"
              controls
              style={{ borderRadius: "8px", maxHeight: "300px", objectFit: "contain" }}
            />
          ) : (
            <img
              src={preview}
              alt="Preview"
              style={{
                maxWidth: "100%",
                borderRadius: "8px",
                maxHeight: "300px",
                objectFit: "contain",
              }}
            />
          )}
        </div>
      )}
    </form>
  </div>

  <div className="modal-footer">
    <button
      type="button"
      className="btn-outline"
      onClick={() => setOpen(false)}
      disabled={loading}
    >
      Cancel
    </button>
    <button type="submit" className="btn" onClick={handleSubmit} disabled={loading}>
      {loading ? "Posting..." : "Post"}
    </button>
  </div>
</Modal>

    </div>
  );
}
