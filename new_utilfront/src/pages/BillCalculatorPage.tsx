import React from 'react';
import BillCalculator from '../components/BillCalculator';
import LoginasAdminButton from '../components/LoginasAdminButton';

const BillCalculatorPage: React.FC = () => {
  return (
    <><div className="absolute top-4 right-4">
      <LoginasAdminButton />
    </div><div className="min-h-screen flex items-center justify-center bg-gray-100">
        <BillCalculator />
      </div></>
  );
};

export default BillCalculatorPage;
