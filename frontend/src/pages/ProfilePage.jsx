import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import PostCard from "../components/PostCard";
import "./ProfilePage.css";
import { FaCamera } from "react-icons/fa";

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    headline: "",
    about: "",
    profileImage: "",
    bannerImage: "",
  });
  const [previewAvatar, setPreviewAvatar] = useState("");
  const [previewBanner, setPreviewBanner] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMyPosts = async () => {
    try {
      const res = await api.get("/api/posts");
      const mine = res.data.filter(
        (p) => p.user?._id === user?.id || p.user?._id === user?._id
      );
      setPosts(mine);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await api.get("/api/users/me");
      setForm({
        name: res.data.name || "",
        headline: res.data.headline || "",
        about: res.data.about || "",
        profileImage: res.data.profileImage || "",
        bannerImage: res.data.bannerImage || "",
      });
      setPreviewAvatar(res.data.profileImage);
      setPreviewBanner(res.data.bannerImage);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyPosts();
      fetchProfile();
    }
  }, [user]);

  // Upload helper
  const handleImageUpload = async (file, type) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await api.post("/api/users/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (type === "avatar") {
        setForm((f) => ({ ...f, profileImage: res.data.profileImage }));
        setPreviewAvatar(res.data.profileImage);
      } else {
        setForm((f) => ({ ...f, bannerImage: res.data.profileImage }));
        setPreviewBanner(res.data.profileImage);
      }
    } catch (err) {
      console.error(err);
      alert("Image upload failed.");
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await api.put("/api/users/me", form);
      setUser(res.data);
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container profile-page">
      <div className="left-column">
        <div className="card profile-card">
          {/* ===== Banner ===== */}
          <div className="profile-banner-container">
            <img
              className="profile-banner"
              src={
                previewBanner
                  ? previewBanner.replace(
                      "/upload/",
                      "/upload/w_1200,h_300,c_fill,q_auto,f_auto/"
                    )
                  : "https://placehold.co/900x200"
              }
              alt="banner"
            />

            {/* Hover Camera Overlay */}
            {editing && (
              <label className="image-upload-btn banner-overlay">
                <FaCamera />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload(e.target.files[0], "banner")
                  }
                  hidden
                />
              </label>
            )}

            {/* Avatar Overlay */}
            <div className="avatar-wrapper">
              <img
                className="avatar large"
                src={
                  previewAvatar
                    ? previewAvatar.replace(
                        "/upload/",
                        "/upload/w_200,h_200,c_thumb,g_face,q_auto,f_auto/"
                      )
                    : "https://placehold.co/100x100"
                }
                alt="avatar"
              />

              {editing && (
                <label className="image-upload-btn avatar-overlay">
                  <FaCamera />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleImageUpload(e.target.files[0], "avatar")
                    }
                    hidden
                  />
                </label>
              )}
            </div>
          </div>

          {/* ===== Profile Info ===== */}
          <div className="profile-info">
            {editing ? (
              <>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your Name"
                />
                <input
                  value={form.headline}
                  onChange={(e) =>
                    setForm({ ...form, headline: e.target.value })
                  }
                  placeholder="Headline"
                />
                <textarea
                  rows={3}
                  value={form.about}
                  onChange={(e) => setForm({ ...form, about: e.target.value })}
                  placeholder="About you"
                />
              </>
            ) : (
              <>
                <h3>{form.name}</h3>
                <p>{form.headline || "Your headline here"}</p>
                <p>{form.about}</p>
              </>
            )}
          </div>

          {/* ===== Buttons ===== */}
          <div className="profile-actions">
            {editing ? (
              <>
                <button onClick={() => setEditing(false)}>Cancel</button>
                <button onClick={handleSave} disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </button>
              </>
            ) : (
              <button onClick={() => setEditing(true)}>Edit Profile</button>
            )}
          </div>
        </div>

        {/* ===== User Posts ===== */}
        <div className="card">
          <h4>Your posts</h4>
          {posts.length === 0 ? (
            <p>No posts yet.</p>
          ) : (
            posts.map((p) => (
              <PostCard key={p._id} post={p} onUpdate={fetchMyPosts} />
            ))
          )}
        </div>
      </div>

      {/* ===== Right Column ===== */}
      <div className="right-column">
        <div className="card">
          <h4>Connections</h4>
          <p>Feature coming soon.</p>
        </div>
      </div>
    </div>
  );
}
