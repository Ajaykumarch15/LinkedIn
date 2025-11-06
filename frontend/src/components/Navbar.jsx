// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setShowMenu(false);
  };

  const handleSettingsClick = () => {
    navigate("/settings");
    setShowMenu(false);
  };

  const handleHelpClick = () => {
    navigate("/help");
    setShowMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      {/* Left Section */}
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          <img
            src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
            alt="LinkedIn"
          />
        </Link>

        {user && (
          <div className="nav-search">
            <input type="text" placeholder="Search..." />
          </div>
        )}
      </div>

      {/* Center Navigation */}
      {user && (
        <div className="nav-center">
          <Link to="/feed" className="nav-item">
            Home
          </Link>
          <Link to="/network" className="nav-item">
            My Network
          </Link>
          <Link to="/jobs" className="nav-item">
            Jobs
          </Link>
          <Link to="/notifications" className="nav-item">
            Notifications
          </Link>
        </div>
      )}

      {/* Right Section */}
      <div className="nav-right" ref={menuRef}>
        {user ? (
          <>
            <div
              className="nav-user"
              onClick={() => setShowMenu((prev) => !prev)}
            >
              <img
                src={user.profileImage || "https://placehold.co/30x30"}
                alt="user"
                className="nav-avatar"
              />
              <span className="nav-username">{user.name.split(" ")[0]}</span>
              <span className="nav-caret">▼</span>
            </div>

            {showMenu && (
              <div className="dropdown-menu">
                <button onClick={handleProfileClick}>View Profile</button>
                <button onClick={handleSettingsClick}>Settings & Privacy</button>
                <button onClick={handleHelpClick}>Help</button>
                <hr />
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <Link to="/login" className="btn">
              Login
            </Link>
            <Link to="/signup" className="btn-outline">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
