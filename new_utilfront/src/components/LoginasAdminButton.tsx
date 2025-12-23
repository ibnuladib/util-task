import React from "react";
import { useNavigate } from "react-router-dom";

const LoginasAdminButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
    >
      Login as Admin
    </button>
  );
};

export default LoginasAdminButton;
