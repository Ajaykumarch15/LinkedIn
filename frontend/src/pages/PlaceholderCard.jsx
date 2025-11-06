import React from "react";
import "./PlaceholderCard.css";

export default function PlaceholderCard({ title, message }) {
  return (
    <div className="placeholder-container">
      <div className="placeholder-card">
        <h1>{title}</h1>
        <p>{message}</p>
        <p className="placeholder-footer">(Feature in development 🚀)</p>
      </div>
    </div>
  );
}
