// src/components/Header.js

import React from "react";
import { FaRedo } from "react-icons/fa"; // Import the refresh icon

function Header({ username, onLogout, onRefresh }) {
  return (
    <div className="header">
      <h1>Roulettech Weather App</h1>
      <div className="header-info">
        <p>{username}</p>
        <button className="refresh-button" onClick={onRefresh}>
          <FaRedo />
        </button>
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
