import React from 'react';
import AdminLogin from '../components/AdminLogin';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AdminLogin onLoginSuccess={() => navigate('/admin/pricing')} />
    </div>
  );
};

export default AdminLoginPage;
