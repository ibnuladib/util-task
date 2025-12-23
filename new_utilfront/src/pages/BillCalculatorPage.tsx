import React from 'react';
import BillCalculator from '../components/BillCalculator';

const BillCalculatorPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <BillCalculator />
    </div>
  );
};

export default BillCalculatorPage;
