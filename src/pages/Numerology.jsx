import React, { useState } from "react";
import "./Numerology.css";

export default function Numerology() {

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);
    setError("");

    try {

      const res = await fetch("https://astro-world-1.onrender.com/api/numerology/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, dob })
      });

      const data = await res.json();
      setResult(data);

    } catch (err) {

      console.error(err);
      setError("Something went wrong. Check backend.");

    }

    setLoading(false);

  };

  return (

    <div className="numerology-container">

      <div className="floating-numbers">
        <span>1</span><span>2</span><span>3</span>
        <span>4</span><span>5</span><span>6</span>
        <span>7</span><span>8</span><span>9</span>
      </div>

      <h1 className="title">🔮 Numerology Calculator</h1>

      <p className="tagline">
        Discover the hidden meaning of your destiny through the mystical power of numbers.
      </p>

      <form onSubmit={handleSubmit} className="numerology-form">

        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="date"
          value={dob}
          required
          onChange={(e) => setDob(e.target.value)}
        />

        <button type="submit">
          {loading ? "Calculating..." : "Reveal My Numbers"}
        </button>

      </form>

      {error && <p className="error">{error}</p>}

      {result && (

        <div className="result-container">

          <div className="number-card">
            <h2>🧭 Life Path Number</h2>
            <h1 className="big-number">{result.lifePath}</h1>
            <p><strong>Planet :</strong> {result.lifePlanet}</p>
            <p>{result.lifePathInfo}</p>
          </div>

          <div className="number-card">
            <h2>⭐ Destiny Number</h2>
            <h1 className="big-number">{result.destiny}</h1>
            <p><strong>Planet :</strong> {result.destinyPlanet}</p>
            <p>{result.destinyPlanetInfo}</p>
          </div>

          <div className="prediction-grid">

            <div className="prediction-card"><h3>🧠 Personality</h3><p>{result?.prediction?.personality}</p></div>
            <div className="prediction-card"><h3>💼 Career</h3><p>{result?.prediction?.career}</p></div>
            <div className="prediction-card"><h3>📚 Education</h3><p>{result?.prediction?.education}</p></div>
            <div className="prediction-card"><h3>🌍 Life</h3><p>{result?.prediction?.life}</p></div>
            <div className="prediction-card"><h3>🏆 Field of Success</h3><p>{result?.prediction?.success}</p></div>
            <div className="prediction-card"><h3>❤️ Love Life</h3><p>{result?.prediction?.love}</p></div>
            <div className="prediction-card"><h3>💍 Marriage</h3><p>{result?.prediction?.marriage}</p></div>
            <div className="prediction-card"><h3>👫 Life Partner</h3><p>{result?.prediction?.wife}</p></div>
            <div className="prediction-card"><h3>💰 Finance</h3><p>{result?.prediction?.finance}</p></div>
            <div className="prediction-card"><h3>🩺 Health</h3><p>{result?.prediction?.health}</p></div>
            <div className="prediction-card"><h3>🧘 Spirituality</h3><p>{result?.prediction?.spirituality}</p></div>
            <div className="prediction-card"><h3>💪 Strengths</h3><p>{result?.prediction?.strengths}</p></div>
            <div className="prediction-card"><h3>⚠️ Weakness</h3><p>{result?.prediction?.weakness}</p></div>
            <div className="prediction-card"><h3>🔮 Advice</h3><p>{result?.prediction?.advice}</p></div>

          </div>

        </div>

      )}

    </div>

  );

}
