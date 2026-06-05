import React, { useState } from "react";

export default function KundliMilan() {
  const [person1, setPerson1] = useState({
    name: "",
    dob: "",
    time: "",
    city: "",
  });

  const [person2, setPerson2] = useState({
    name: "",
    dob: "",
    time: "",
    city: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("https://astro-world-engine-4.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          person1,
          person2,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
      setResult({ error: "Server error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
        color: "white",
      }}
    >
      <h1 style={{ textAlign: "center" }}>🔮 Kundli Milan</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "600px",
          margin: "auto",
          background: "rgba(255,255,255,0.1)",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        {/* PERSON 1 */}
        <h2>Person 1</h2>

        <input
          type="text"
          placeholder="Name"
          value={person1.name}
          onChange={(e) =>
            setPerson1({ ...person1, name: e.target.value })
          }
          required
        />

        <input
          type="date"
          value={person1.dob}
          onChange={(e) =>
            setPerson1({ ...person1, dob: e.target.value })
          }
          required
        />

        <input
          type="time"
          value={person1.time}
          onChange={(e) =>
            setPerson1({ ...person1, time: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="City"
          value={person1.city}
          onChange={(e) =>
            setPerson1({ ...person1, city: e.target.value })
          }
          required
        />

        {/* PERSON 2 */}
        <h2 style={{ marginTop: "20px" }}>Person 2</h2>

        <input
          type="text"
          placeholder="Name"
          value={person2.name}
          onChange={(e) =>
            setPerson2({ ...person2, name: e.target.value })
          }
          required
        />

        <input
          type="date"
          value={person2.dob}
          onChange={(e) =>
            setPerson2({ ...person2, dob: e.target.value })
          }
          required
        />

        <input
          type="time"
          value={person2.time}
          onChange={(e) =>
            setPerson2({ ...person2, time: e.target.value })
          }
          required
        />

        <input
          type="text"
          placeholder="City"
          value={person2.city}
          onChange={(e) =>
            setPerson2({ ...person2, city: e.target.value })
          }
          required
        />

        <button
          type="submit"
          style={{
            marginTop: "15px",
            width: "100%",
            padding: "10px",
            background: "#fff",
            color: "#333",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {loading ? "Calculating..." : "Generate Kundli Milan"}
        </button>
      </form>

      {/* RESULT */}
      {result && (
        <div
          style={{
            maxWidth: "600px",
            margin: "20px auto",
            background: "rgba(255,255,255,0.1)",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>🔮 Compatibility Result</h2>

          {result.error ? (
            <p>{result.error}</p>
          ) : (
            <>
              <p>
                <strong>Total Score:</strong> {result.totalScore} / 36
              </p>
              <p>
                <strong>Verdict:</strong> {result.verdict}
              </p>

              <h3>Guna Milan Breakdown:</h3>
              <ul>
                <li>Varna: {result.guna?.varna}</li>
                <li>Vashya: {result.guna?.vashya}</li>
                <li>Tara: {result.guna?.tara}</li>
                <li>Yoni: {result.guna?.yoni}</li>
                <li>Graha Maitri: {result.guna?.grahaMaitri}</li>
                <li>Gana: {result.guna?.gana}</li>
                <li>Bhakoot: {result.guna?.bhakoot}</li>
                <li>Nadi: {result.guna?.nadi}</li>
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
