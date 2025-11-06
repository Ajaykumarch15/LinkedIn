import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import Navbar from "./components/Navbar";

// Pages
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import NetworkPage from "./pages/NetworkPage";
import JobsPage from "./pages/JobsPage";
import NotificationsPage from "./pages/NotificationsPage";
import SettingsPage from "./pages/SettingsPage";
import HelpPage from "./pages/HelpPage";
import PlaceholderCard from "./pages/PlaceholderCard";

function App() {
  const { user } = useAuth();
  const location = useLocation();

  // ✅ Hide navbar on login/signup routes
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="app-root">
      {!hideNavbar && <Navbar />}

      {/* ✅ Remove top margin when navbar is hidden */}
      <main
        className="main-content"
        style={{ marginTop: hideNavbar ? "0" : "55px" }}
      >
        <Routes>
          {/* Redirect root path */}
          <Route
            path="/"
            element={<Navigate to={user ? "/feed" : "/login"} />}
          />

          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Routes */}
          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <FeedPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile/:userId"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/network"
            element={
              <ProtectedRoute>
                <NetworkPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/jobs"
            element={
              <ProtectedRoute>
                <JobsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <NotificationsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/help"
            element={
              <ProtectedRoute>
                <HelpPage />
              </ProtectedRoute>
            }
          />

          {/* 404 Fallback */}
          <Route
            path="*"
            element={
              <PlaceholderCard
                title="Page Not Found"
                message="Oops! This page doesn’t exist or is under construction."
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
