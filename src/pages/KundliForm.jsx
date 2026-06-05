import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function KundliForm() {
  const navigate = useNavigate();

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

    const response = await fetch("http://localhost:5000/api/kundli", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    // 🔥 Navigate to result page with data
    navigate("/result", { state: data });
  };

  return (
    <div className="form-container">
      <h2>Generate Kundli</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input type="date" name="date" onChange={handleChange} required />
        <input type="time" name="time" onChange={handleChange} required />
        <input name="place" placeholder="Place" onChange={handleChange} required />

        <select name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <button type="submit">Generate Kundli</button>
      </form>
    </div>
  );
}