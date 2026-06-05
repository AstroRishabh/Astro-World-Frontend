import React, { useState, useEffect } from "react";
import "./Booking.css";

const allSlots = [
  "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "04:00 PM"
];

export default function Booking() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", date: "", time: ""
  });

  const [bookedSlots, setBookedSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateError, setDateError] = useState(""); // 🚨 New State for Date Error

  // Aaj ki date nikalne ke liye (Format: YYYY-MM-DD)
  const todayStr = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!form.date) return;

    // 🔥 Dynamic Validation: Agar user manually past date daalta hai
    if (form.date < todayStr) {
      setDateError("⚠️ Past dates are invalid in the cosmic realm!");
      setBookedSlots([]); // Purani date ke slots hide kar do
      return;
    } else {
      setDateError(""); // Clear error if date is valid
    }

    const fetchSlots = async () => {
      try {
        const res = await fetch(`https://astro-world-1.onrender.com/api/booking/slots?date=${form.date}`);
        const data = await res.json();
        setBookedSlots(data.bookedSlots || []);
      } catch (err) {
        console.error("Slot fetch error", err);
      }
    };

    fetchSlots();
  }, [form.date, todayStr]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const selectSlot = (slot) => {
    if (bookedSlots.includes(slot)) return;
    setForm({ ...form, time: slot });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone || !form.date || !form.time) {
      return alert("⚠️ Please fill all fields and select a slot.");
    }
    if (dateError) {
      return alert("❌ Cannot book for a past date!");
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        alert("🎉 Booking Confirmed! The stars have aligned.");
        setForm({ name: "", email: "", phone: "", date: "", time: "" });
        setBookedSlots([...bookedSlots, form.time]);
      } else {
        alert("❌ Booking Failed. Please try again.");
      }
    } catch {
      alert("❌ Server Error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="astro-booking-container">
      <div className="twinkling-stars"></div>

      <div className="astro-card">
        <div className="zodiac-icon">✨</div>
        <h2 className="title">Book Your Astro Session</h2>
        <p className="subtitle">Connect with the cosmos at your preferred time</p>

        <div className="form-grid">
          <div className="input-group">
            <label>Full Name</label>
            <input name="name" value={form.name} placeholder="Arjun Sharma" onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input name="email" type="email" value={form.email} placeholder="arjun@example.com" onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <input name="phone" type="tel" value={form.phone} placeholder="+91 XXXXX XXXXX" onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Consultation Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              min={todayStr} // ✅ Calendar me past dates disable karne ke liye
              onChange={handleChange}
              className={dateError ? "input-error" : ""}
            />
            {/* 🛑 UI error display */}
            {dateError && <span className="error-message">{dateError}</span>}
          </div>
        </div>

        {form.date && !dateError && (
          <div className="slots-section">
            <p className="slots-title">🔮 Available Cosmic Slots</p>
            <div className="slots-grid">
              {allSlots.map((slot) => {
                const isBooked = bookedSlots.includes(slot);
                const isSelected = form.time === slot;

                return (
                  <button
                    key={slot}
                    disabled={isBooked}
                    className={`slot-btn ${isBooked ? "booked" : "available"} ${isSelected ? "selected" : ""}`}
                    onClick={() => selectSlot(slot)}
                  >
                    {slot}
                    {isBooked && <span className="status-badge">Taken</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 🔒 Agar date galat hai, to click disable ho jayega */}
        <button 
          className="submit-btn" 
          onClick={handleSubmit} 
          disabled={loading || !!dateError}
        >
          {loading ? "Consulting the stars..." : "✨ Confirm Cosmic Consultation"}
        </button>
      </div>
    </div>
  );
}
