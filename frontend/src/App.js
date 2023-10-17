import "./index.css"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerOnboarding from "./pages/CustomerOnboarding";
import Home from "./pages/Home";
import StaffOnboarding from "./pages/StaffOnboarding";
import DashBoardOnboarding from "./pages/DashBoardOnboarding";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/customer" element={<CustomerOnboarding />} />
        <Route exact path="/employee" element={<StaffOnboarding />} />
        <Route exact path="/dashboard" element={<DashBoardOnboarding />} />
      </Routes>
    </Router>
  );
}

export default App;
