// src/pages/KundliMilan.jsx
import React, { useState } from "react";
import "./KundliMilan.css";

export default function KundliMilan() {
  const [boy, setBoy] = useState({ name: "", dob: "", time: "", city: "" });
  const [girl, setGirl] = useState({ name: "", dob: "", time: "", city: "" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/kundli-milan/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ boy, girl })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Error generating kundli milan");
    } finally {
      setLoading(false);
    }
  };

  // Common label inline style blueprint to ensure symmetry across inputs
  const labelStyle = {
    color: "#b3a1d9",
    fontSize: "12px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  };

  return (
    <div className="kundli-container">
      <div className="overlay">
        <h1 className="title">❤️ Kundli Milan</h1>
        <p className="subtitle">Advanced Vedic Astrology Compatibility Report</p>

        <form className="kundli-form" onSubmit={handleSubmit}>
          {/* Main Cards Wrapper Grid */}
          <div className="form-sections-grid">
            
            {/* BOY DETAILS CARD */}
            <div className="form-box">
              <h2>👦 Boy Details</h2>
              <div className="form-fields-stack">
                <div className="horizontal-input-group">
                  <label htmlFor="boy-name" style={labelStyle}>Name :</label>
                  <input
                    id="boy-name"
                    type="text"
                    placeholder="Enter name"
                    value={boy.name}
                    disabled={loading}
                    onChange={(e) => setBoy({ ...boy, name: e.target.value })}
                    required
                  />
                </div>
                <div className="horizontal-input-group">
                  <label htmlFor="boy-dob" style={labelStyle}>Birth Date :</label>
                  <input
                    id="boy-dob"
                    type="date"
                    value={boy.dob}
                    disabled={loading}
                    onChange={(e) => setBoy({ ...boy, dob: e.target.value })}
                    required
                  />
                </div>
                <div className="horizontal-input-group">
                  <label htmlFor="boy-time" style={labelStyle}>Birth Time :</label>
                  <input
                    id="boy-time"
                    type="time"
                    value={boy.time}
                    disabled={loading}
                    onChange={(e) => setBoy({ ...boy, time: e.target.value })}
                    required
                  />
                </div>
                <div className="horizontal-input-group">
                  <label htmlFor="boy-city" style={labelStyle}>Birth City :</label>
                  <input
                    id="boy-city"
                    type="text"
                    placeholder="e.g. Mumbai"
                    value={boy.city}
                    disabled={loading}
                    onChange={(e) => setBoy({ ...boy, city: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            {/* GIRL DETAILS CARD */}
            <div className="form-box">
              <h2>👧 Girl Details</h2>
              <div className="form-fields-stack">
                <div className="horizontal-input-group">
                  <label htmlFor="girl-name" style={labelStyle}>Name :</label>
                  <input
                    id="girl-name"
                    type="text"
                    placeholder="Enter name"
                    value={girl.name}
                    disabled={loading}
                    onChange={(e) => setGirl({ ...girl, name: e.target.value })}
                    required
                  />
                </div>
                <div className="horizontal-input-group">
                  <label htmlFor="girl-dob" style={labelStyle}>Birth Date :</label>
                  <input
                    id="girl-dob"
                    type="date"
                    value={girl.dob}
                    disabled={loading}
                    onChange={(e) => setGirl({ ...girl, dob: e.target.value })}
                    required
                  />
                </div>
                <div className="horizontal-input-group">
                  <label htmlFor="girl-time" style={labelStyle}>Birth Time :</label>
                  <input
                    id="girl-time"
                    type="time"
                    value={girl.time}
                    disabled={loading}
                    onChange={(e) => setGirl({ ...girl, time: e.target.value })}
                    required
                  />
                </div>
                <div className="horizontal-input-group">
                  <label htmlFor="girl-city" style={labelStyle}>Birth City :</label>
                  <input
                    id="girl-city"
                    type="text"
                    placeholder="e.g. Pune"
                    value={girl.city}
                    disabled={loading}
                    onChange={(e) => setGirl({ ...girl, city: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Action Trigger Button */}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Matching Celestial Coordinates..." : "Check Compatibility Score →"}
          </button>
        </form>

        {/* RESULTS WRAPPER VIEW */}
        {result && (
          <div className="result-box slide-up">
            <h2>✨ Compatibility Analysis</h2>
            <div className="score-wrapper">
              <span className="score-label">Total Guna Match</span>
              <h1 className="score">{result.result.total_guna}/36</h1>
            </div>
            <h3 className="compatibility">Verdict: {result.result.compatibility}</h3>

            <div className="table-responsive">
              <table className="guna-table">
                <thead>
                  <tr>
                    <th>Ashta Guna</th>
                    <th>Obtained Score</th>
                    <th>Maximum Score</th>
                  </tr>
                </thead>
                <tbody>
                  {result.result.report.map((item, index) => (
                    <tr key={index}>
                      <td><strong>{item.guna}</strong></td>
                      <td className="score-highlight">{item.score}</td>
                      <td>{item.max}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
