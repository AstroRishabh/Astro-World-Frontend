import React, { useState } from "react";

export default function Lucky() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Placeholder: backend calculation yahan hoga
    const fakeResult = {
      numbers: [3, 7, 9],
      colors: ["Red", "Blue", "Green"],
    };

    setResult(fakeResult);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lucky Numbers & Colors</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Date of Birth: </label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>
          Get Lucky Info
        </button>
      </form>

      {result && (
        <div style={{ padding: "10px", border: "1px solid #ccc" }}>
          <h2>Lucky Numbers:</h2>
          <p>{result.numbers.join(", ")}</p>

          <h2>Lucky Colors:</h2>
          <p>{result.colors.join(", ")}</p>
        </div>
      )}
    </div>
  );
}