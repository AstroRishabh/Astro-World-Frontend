// src/pages/KundliMilan.jsx

import React, { useState } from "react";
import "./KundliMilan.css";

export default function KundliMilan() {

  const [boy, setBoy] = useState({
    name: "",
    dob: "",
    time: "",
    city: ""
  });

  const [girl, setGirl] = useState({
    name: "",
    dob: "",
    time: "",
    city: ""
  });

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);


  // 🔮 Submit

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/kundli-milan/match",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            boy,
            girl
          })
        }
      );

      const data = await response.json();

      console.log(data);

      setResult(data);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

      alert("Error generating kundli milan");
    }
  };


  return (

    <div className="kundli-container">

      <div className="overlay">

        <h1 className="title">
          ❤️ Kundli Milan
        </h1>

        <p className="subtitle">
          Advanced Astrology Compatibility Report
        </p>

        <form
          className="kundli-form"
          onSubmit={handleSubmit}
        >

          {/* BOY */}

          <div className="form-box">

            <h2>👦 Boy Details</h2>

            <input
              type="text"
              placeholder="Boy Name"
              value={boy.name}
              onChange={(e) =>
                setBoy({
                  ...boy,
                  name: e.target.value
                })
              }
              required
            />

            <input
              type="date"
              value={boy.dob}
              onChange={(e) =>
                setBoy({
                  ...boy,
                  dob: e.target.value
                })
              }
              required
            />

            <input
              type="time"
              value={boy.time}
              onChange={(e) =>
                setBoy({
                  ...boy,
                  time: e.target.value
                })
              }
              required
            />

            <input
              type="text"
              placeholder="Birth City"
              value={boy.city}
              onChange={(e) =>
                setBoy({
                  ...boy,
                  city: e.target.value
                })
              }
              required
            />

          </div>


          {/* GIRL */}

          <div className="form-box">

            <h2>👧 Girl Details</h2>

            <input
              type="text"
              placeholder="Girl Name"
              value={girl.name}
              onChange={(e) =>
                setGirl({
                  ...girl,
                  name: e.target.value
                })
              }
              required
            />

            <input
              type="date"
              value={girl.dob}
              onChange={(e) =>
                setGirl({
                  ...girl,
                  dob: e.target.value
                })
              }
              required
            />

            <input
              type="time"
              value={girl.time}
              onChange={(e) =>
                setGirl({
                  ...girl,
                  time: e.target.value
                })
              }
              required
            />

            <input
              type="text"
              placeholder="Birth City"
              value={girl.city}
              onChange={(e) =>
                setGirl({
                  ...girl,
                  city: e.target.value
                })
              }
              required
            />

          </div>


          <button
            type="submit"
            className="submit-btn"
          >

            {
              loading
                ? "Generating..."
                : "Generate Kundli Milan"
            }

          </button>

        </form>


        {/* RESULT */}

        {
          result && (

            <div className="result-box">

              <h2>
                ✨ Compatibility Result
              </h2>

              <h1 className="score">
                {
                  result.result.total_guna
                }/36
              </h1>

              <h3 className="compatibility">

                {
                  result.result.compatibility
                }

              </h3>


              <table>

                <thead>

                  <tr>

                    <th>Guna</th>

                    <th>Score</th>

                    <th>Max</th>

                  </tr>

                </thead>

                <tbody>

                  {
                    result.result.report.map(
                      (item, index) => (

                        <tr key={index}>

                          <td>
                            {item.guna}
                          </td>

                          <td>
                            {item.score}
                          </td>

                          <td>
                            {item.max}
                          </td>

                        </tr>
                      )
                    )
                  }

                </tbody>

              </table>

            </div>
          )
        }

      </div>

    </div>
  );
}