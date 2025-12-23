import React from "react";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../auth/auth";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken(); 
    navigate("/login"); 
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default LogoutButton;