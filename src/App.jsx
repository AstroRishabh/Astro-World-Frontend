import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Kundli from "./pages/Kundli";
import KundliForm from "./pages/KundliForm";
import KundliResult from "./pages/KundliResult";
import AIKundli from "./pages/AIKundli";
import Booking from "./pages/Booking";
import Numerology from "./pages/Numerology";
import Horoscope from "./pages/Horoscope";
import KundliMilan from "./pages/KundliMilan";
import Rashiphal from "./pages/Rashiphal";
import Lucky from "./pages/Lucky";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Main */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/kundli" element={<Kundli />} />
        <Route path="/kundli-form" element={<KundliForm />} />
        <Route path="/result" element={<KundliResult />} />
        <Route path="/ai-kundli" element={<AIKundli />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/kundliMilan" element={<KundliMilan />} />

        {/* Features */}
        <Route path="/horoscope" element={<Horoscope />} />
        <Route path="/compatibility" element={<KundliMilan />} />
        <Route path="/numerology" element={<Numerology />} />
        <Route path="/rashiphal" element={<Rashiphal />} />
        <Route path="/lucky" element={<Lucky />} />
      </Routes>
    </Router>
  );
}

export default App;