import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://astro-world-engine-4.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
console.log("LOGIN RESPONSE:", data);

      if (res.ok && data.token) {
        alert("Login Successful 🚀");

        localStorage.setItem("token", data.token);

        localStorage.setItem("user", JSON.stringify(
          data.user || {
            name: email.split("@")[0],
            email: email,
            image: ""
          }
        ));

        navigate("/dashboard");
      } else {
        alert("You input Invalid Details,Please Recheck it");
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
        <h2>Astro World Portal</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p className="link-text" onClick={() => navigate("/signup")}>
          Create New Account
        </p>
      </div>
    </div>
  </>
);
};

export default Login;
