import React, { useState } from 'react';
import api from '../api/api';
import { generateBillPDF } from '../pdf/genpdf';


const BillCalculator: React.FC = () => {
  const [units, setUnits] = useState(0);
  const [result, setResult] = useState<any>(null);

  const handleCalculate = async () => {
    try {
      const res = await api.post('/util/calculate', { units });
      setResult(res.data);
    } catch (err: any) {
      setResult('Calculation failed' );
    }
  };

  return (
      <div className="max-w-md mx-auto mt-12 p-8 bg-white border border-gray-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Calculate Bill
        </h2>

        <div className="space-y-4">
          <label className="block text-gray-700">Units:</label>
          <input
            type="number"
            value={units === 0 ? "" : units} 
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (value >= 0 || e.target.value === "") { // allow empty 
                setUnits(e.target.value === "" ? 0 : value);
              }
            }}
            min={0} // prevents negative 
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Enter units"
          />
        </div>

        <button
          onClick={handleCalculate}
          className="w-full mt-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
        >
          Calculate
        </button>

        {result && (
          <div className="mt-6 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">
              Bill Details
            </h3>
            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <span className="font-medium">Units:</span>
              <span>{result.units}</span>

              <span className="font-medium">Rate per Unit:</span>
              <span>${result.ratePerUnit.toFixed(2)}</span>

              <span className="font-medium">Base:</span>
              <span>${result.base.toFixed(2)}</span>

              <span className="font-medium">VAT ({result.vatPercentage}%):</span>
              <span>${result.vatAmount.toFixed(2)}</span>

              <span className="font-medium">Service Charge:</span>
              <span>${result.serviceCharge.toFixed(2)}</span>

              <span className="font-medium">Total Amount:</span>
              <span className="font-semibold text-green-600">
                ${result.totalAmount.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => generateBillPDF(result)}
              className="w-full mt-6 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
            >
              Download PDF
            </button>
          </div>
        )}

      </div>
    );
};

export default BillCalculator;
