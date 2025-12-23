import React, { useState, useEffect } from 'react';
import api from '../api/api';

import LogoutButton from './LogoutButton';

const PriceSetting: React.FC = () => {
    const [ratePerUnit, setRatePerUnit] = useState(0);
    const [vatPercentage, setVatPercentage] = useState(0);
    const [serviceCharge, setServiceCharge] = useState(0);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchConfig = async () => {
        const res = await api.get('/util/getpricing'); 
        setRatePerUnit(res.data.ratePerUnit);
        setVatPercentage(res.data.vatPercentage);
        setServiceCharge(res.data.serviceCharge);
        };
        fetchConfig();
    }, []);

    const handleUpdate = async () => {
        try {
        const res = await api.put('/util/updatepricing', { ratePerUnit, vatPercentage, serviceCharge });
        setMessage('Pricing updated successfully!');
        } catch (err: any) {
        setMessage(err.response?.data?.message || 'Update failed');
        }
    };

    return (
        <><div className="flex justify-end mb-4">
            <LogoutButton />
        </div><div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
                <h2 className="text-xl mb-4">Update Pricing</h2>
                <input type="number" value={ratePerUnit} onChange={(e) => setRatePerUnit(+e.target.value)} className="w-full mb-2 p-2 border rounded" placeholder="Rate per Unit" />
                <input type="number" value={vatPercentage} onChange={(e) => setVatPercentage(+e.target.value)} className="w-full mb-2 p-2 border rounded" placeholder="VAT %" />
                <input type="number" value={serviceCharge} onChange={(e) => setServiceCharge(+e.target.value)} className="w-full mb-2 p-2 border rounded" placeholder="Service Charge" />
                <button onClick={handleUpdate} className="w-full bg-green-500 text-white p-2 rounded">Update</button>
                {message && <p className="mt-2">{message}</p>}
            </div></>
    );
};

export default PriceSetting;
