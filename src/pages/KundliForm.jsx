import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function KundliForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    place: "",
    gender: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/kundli", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      navigate("/result", { state: data });
    } catch (error) {
      console.error("Error generating Kundli:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card" style={{ maxWidth: "500px" }}> {/* Thoda width badhaye horizontal spacing ke liye */}
        <h2>Generate Kundli</h2>
        <p className="form-subtitle">Enter your birth details to unlock premium cosmic insights.</p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          
          {/* Full Name Row */}
          <div style={{ display: "grid", gridTemplateColumns: "130px 1fr", alignItems: "center", gap: "12px" }}>
            <label htmlFor="name" style={{ color: "var(--text-muted)", fontSize: "13px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>Full Name :</label>
            <input 
              id="name"
              type="text"
              name="name" 
              placeholder="Enter full name" 
              onChange={handleChange} 
              disabled={loading}
              style={{ width: "100%", boxSizing: "border-box" }}
              required 
            />
          </div>

          {/* Date of Birth Row */}
          <div style={{ display: "grid", gridTemplateColumns: "130px 1fr", alignItems: "center", gap: "12px" }}>
            <label htmlFor="date" style={{ color: "var(--text-muted)", fontSize: "13px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>Birth Date :</label>
            <input 
              id="date"
              type="date" 
              name="date" 
              onChange={handleChange} 
              disabled={loading}
              style={{ width: "100%", boxSizing: "border-box" }}
              required 
            />
          </div>

          {/* Time of Birth Row */}
          <div style={{ display: "grid", gridTemplateColumns: "130px 1fr", alignItems: "center", gap: "12px" }}>
            <label htmlFor="time" style={{ color: "var(--text-muted)", fontSize: "13px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>Birth Time :</label>
            <input 
              id="time"
              type="time" 
              name="time" 
              onChange={handleChange} 
              disabled={loading}
              style={{ width: "100%", boxSizing: "border-box" }}
              required 
            />
          </div>

          {/* Place of Birth Row */}
          <div style={{ display: "grid", gridTemplateColumns: "130px 1fr", alignItems: "center", gap: "12px" }}>
            <label htmlFor="place" style={{ color: "var(--text-muted)", fontSize: "13px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>Birth Place :</label>
            <div className="geo-input-wrapper" style={{ width: "100%" }}>
              <input 
                id="place"
                type="text"
                name="place" 
                placeholder="e.g. New Delhi, India" 
                onChange={handleChange} 
                disabled={loading}
                style={{ width: "100%", boxSizing: "border-box" }}
                required 
              />
              {formData.place && <span className="geo-success" style={{ right: "12px" }}>✅</span>}
            </div>
          </div>

          {/* Gender Row */}
          <div style={{ display: "grid", gridTemplateColumns: "130px 1fr", alignItems: "center", gap: "12px" }}>
            <label htmlFor="gender" style={{ color: "var(--text-muted)", fontSize: "13px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>Gender :</label>
            <select 
              id="gender"
              name="gender" 
              onChange={handleChange} 
              className="form-card input"
              disabled={loading}
              style={{ width: "100%", boxSizing: "border-box", cursor: "pointer", padding: "14px 16px" }}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Action Button Row */}
          <div style={{ display: "grid", gridTemplateColumns: "130px 1fr", gap: "12px", marginTop: "10px" }}>
            <div></div> {/* Empty space to align button with inputs */}
            <button 
              type="submit" 
              className={`gen-btn ${loading ? "btn-disabled" : ""}`}
              disabled={loading}
              style={{ width: "100%", margin: 0 }}
            >
              {loading ? "Calculating Charts..." : "Generate Kundli →"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
