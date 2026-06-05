import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://astro-world-1.onrender.com/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Account Created Successfully 🌟");
        navigate("/");
      } else {
        alert(data.message || "Signup Failed");
      }
    } catch (error) {
      alert("Server Error ❌");
    }
  };

  return (
    <>
      <div className="stars"></div>
      <div className="planet"></div>

      <div className="auth-container">
        <div className="auth-card">
          <h2>Create Cosmic Account</h2>

          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Enter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Sign Up</button>
          </form>

          <p className="link-text" onClick={() => navigate("/")}>
            Already have an account? Login
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
