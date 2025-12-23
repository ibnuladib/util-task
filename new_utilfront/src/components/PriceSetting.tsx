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
        <div className="relative min-h-screen bg-gray-50">


        {/* Pricing card */}
        <div className="max-w-md mx-auto mt-24 p-8 bg-white border border-gray-200 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Update Pricing</h2>

            <div className="space-y-4">
            <div>
                <label className="block text-gray-700 mb-1">Rate per Unit</label>
                <input
                type="number"
                value={ratePerUnit}
                onChange={(e) => setRatePerUnit(+e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Rate per Unit"
                />
            </div>

            <div>
                <label className="block text-gray-700 mb-1">VAT Percentage (%)</label>
                <input
                type="number"
                value={vatPercentage}
                onChange={(e) => setVatPercentage(+e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="VAT %"
                />
            </div>

            <div>
                <label className="block text-gray-700 mb-1">Service Charge</label>
                <input
                type="number"
                value={serviceCharge}
                onChange={(e) => setServiceCharge(+e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Service Charge"
                />
            </div>
            </div>

            <button
            onClick={handleUpdate}
            className="w-full mt-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
            >
            Update
            </button>

            {message && (
            <p className="mt-4 text-center text-gray-700">{message}</p>
            )}
        </div>
        </div>

    );

};

export default PriceSetting;
