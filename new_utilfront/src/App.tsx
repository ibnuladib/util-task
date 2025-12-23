import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLoginPage from "./pages/AdminLoginPage";
import PriceSetting from "./pages/PriceSettingPage";
import Calculator from "./pages/BillCalculatorPage";
import "./App.css"
import "./index.css"

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Calculator />} />
        <Route path="/login" element={<AdminLoginPage />} />
        <Route path="/admin/pricing" element={<PriceSetting />} />

      </Routes>
    </Router>
  );
}

export default App;
