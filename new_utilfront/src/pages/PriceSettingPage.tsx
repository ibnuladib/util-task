import React, { useEffect } from 'react';
import PriceSetting from '../components/PriceSetting';
import { getToken } from '../auth/auth';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

const PriceSettingPage: React.FC = () => {
        const navigate = useNavigate();
    
            useEffect(() => {
            if (!getToken()) {
            navigate("/login");
            }
        }, [navigate]);
        return (
            <>
                <div className="absolute top-4 right-4">
                <LogoutButton />
                </div>
                <div className="flex items-center justify-center min-h-screen">
                <PriceSetting />
                </div>
            </>
            );
};

export default PriceSettingPage;
