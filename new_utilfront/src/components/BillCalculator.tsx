import React, { useState } from 'react';
import api from '../api/api';


const BillCalculator: React.FC = () => {
  const [units, setUnits] = useState(0);
  const [result, setResult] = useState<any>(null);

  const handleCalculate = async () => {
    try {
      const res = await api.post('/util/calculate', { units });
      setResult(res.data);
    } catch (err: any) {
      setResult({ error: err.response?.data?.message || 'Calculation failed' });
    }
  };

  return (
    
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-xl mb-4">Calculate Utility Bill</h2>
      <input type="number" value={units} onChange={(e) => setUnits(+e.target.value)} placeholder="Units consumed" className="w-full mb-2 p-2 border rounded"/>
      <button onClick={handleCalculate} className="w-full bg-blue-500 text-white p-2 rounded">Calculate</button>
      {result && (
        <div className="mt-4">
          {result.error ? (
            <p className="text-red-500">{result.error}</p>
          ) : (
            <div>
              <p>Base: {result.base}</p>
              <p>VAT: {result.vatAmount}</p>
              <p>Service Charge: {result.serviceCharge}</p>
              <p>Total: {result.totalAmount}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BillCalculator;
