import { useLocation, useNavigate } from "react-router-dom";

export default function KundliResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state;

  if (!result) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>No Data Found</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="result-container">
      <h2>Kundli Result</h2>

      <h3>Lagna</h3>
      <p>
        {result.lagna.sign} ({result.lagna.degree}°)
      </p>

      <h3>Planetary Positions</h3>
      <table>
        <thead>
          <tr>
            <th>Planet</th>
            <th>Degree</th>
            <th>Sign</th>
            <th>House</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(result.planets || {}).map(
            ([planet, value], index) => (
              <tr key={index}>
                <td>{planet}</td>
                <td>{parseFloat(value.degree).toFixed(2)}°</td>
                <td>{value.sign}</td>
                <td>{value.house}</td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <button onClick={() => navigate("/")}>
        Generate New Kundli
      </button>
    </div>
  );
}