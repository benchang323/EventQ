// src/components/Navbar.js

import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h1>Event Manager</h1>
      <button onClick={handleSignOut} className="button-secondary">
        Sign Out
      </button>
    </nav>
  );
};

export default Navbar;
