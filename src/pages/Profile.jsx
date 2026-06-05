import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const user = {
    name: "Rishabh Agarwal",
    email: "rishabh@gmail.com"
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="profile-card">
      <h2>Your Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;