import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(false);

  /** ---------- Auth Helpers ---------- **/
  const saveAuth = (token, userData) => {
    if (token) localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const clearAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  /** ---------- Auth Actions ---------- **/
  const register = async ({ name, email, password }) => {
    setLoading(true);
    try {
      const res = await api.post("/api/auth/register", { name, email, password });
      saveAuth(res.data.token, res.data.user);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.response?.data?.message || err.message };
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await api.post("/api/auth/login", { email, password });
      saveAuth(res.data.token, res.data.user);
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.response?.data?.message || err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => clearAuth();

  /** ---------- Validate token & load profile on mount ---------- **/
  useEffect(() => {
    const validate = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await api.get("/api/auth/profile");
        saveAuth(token, res.data.user);
      } catch (err) {
        console.warn("Token validation failed:", err.message);
        clearAuth();
      }
    };
    validate();
    // eslint-disable-next-line
  }, []);

  /** ---------- Provide global context ---------- **/
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser, // ✅ Added so ProfilePage and others can update user data
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
