import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import DummyPage from "./pages/DummyPage";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
      />

      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/kundli" element={<DummyPage title="Kundli Page" />} />
      <Route path="/horoscope" element={<DummyPage title="Horoscope Page" />} />
      <Route path="/numerology" element={<DummyPage title="Numerology Page" />} />
      <Route path="/compatibility" element={<DummyPage title="Compatibility Page" />} />
    </Routes>
  );
}

export default App;