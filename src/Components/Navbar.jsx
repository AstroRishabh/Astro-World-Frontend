import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ user }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <h2>Astro World</h2>

      <div className="profile" onClick={() => setOpen(!open)}>
        <span>{user.name}</span>

        {open && (
          <div className="dropdown">
            <p>{user.email}</p>
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;