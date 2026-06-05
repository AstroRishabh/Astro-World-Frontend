import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h3>Menu</h3>
      <ul>
        <li onClick={() => navigate("/dashboard")}>Dashboard</li>
        <li onClick={() => alert("Bookings Page Coming Soon")}>My Bookings</li>
        <li onClick={() => alert("Kundli Page Coming Soon")}>Kundli</li>
        <li onClick={() => alert("Numerology Page Coming Soon")}>Numerology</li>
      </ul>
    </div>
  );
}

export default Sidebar;