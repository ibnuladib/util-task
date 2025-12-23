import React, { useEffect } from 'react';
import PriceSetting from '../components/PriceSetting';
import { getToken } from '../auth/auth';
import { useNavigate } from 'react-router-dom';

const PriceSettingPage: React.FC = () => {
        const navigate = useNavigate();
    
            useEffect(() => {
            if (!getToken()) {
            navigate("/login");
            }
        }, [navigate]);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <PriceSetting />
        </div>
    );
    };

export default PriceSettingPage;
