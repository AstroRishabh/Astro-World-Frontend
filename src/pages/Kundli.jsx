import React, { useState } from "react";
import "./Kundli.css";
import { useTranslation } from "react-i18next";

export default function Kundli() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chartType, setChartType] = useState("D1");
  const [openMaha, setOpenMaha] = useState(null);
  const [openAntar, setOpenAntar] = useState(null);

  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    date: "",
    time: "",
    place: "",
  });

  const RASHI_MAP = {
    Aries: 1, Taurus: 2, Gemini: 3, Cancer: 4, Leo: 5, Virgo: 6,
    Libra: 7, Scorpio: 8, Sagittarius: 9, Capricorn: 10, Aquarius: 11, Pisces: 12,
  };

  const PLANET_SYMBOLS = {
    Sun: "Su", Moon: "Mo", Mars: "Ma", Mercury: "Me",
    Jupiter: "Ju", Venus: "Ve", Saturn: "Sa", Rahu: "Ra", Ketu: "Ke",
  };

  // Modern Neon Astro Colors
  const PLANET_COLORS = {
    Sun: "#FF9F43",
    Moon: "#00D2D3",
    Mars: "#FF6B6B",
    Mercury: "#1DD1A1",
    Jupiter: "#FECA57",
    Venus: "#FF9FF3",
    Saturn: "#54A0FF",
    Rahu: "#5F27CD",
    Ketu: "#C8D6E5",
  };

  function getPlanetLabel(planet) {
    const data = result.planets[planet];
    let label = PLANET_SYMBOLS[planet] || planet;
    if (data?.retrograde) label += "*";
    if (data?.combust) label += "☀";
    if (data?.exalted) label += "↑";
    if (data?.debilitated) label += "↓";
    return label;
  }

  const houseConfig = [
    { id: 1, rX: 200, rY: 135, cX: 200, cY: 85 },
    { id: 2, rX: 110, rY: 45, cX: 90, cY: 55 },
    { id: 3, rX: 45, rY: 110, cX: 30, cY: 75 },
    { id: 4, rX: 135, rY: 200, cX: 100, cY: 200 },
    { id: 5, rX: 45, rY: 290, cX: 45, cY: 300 },
    { id: 6, rX: 110, rY: 355, cX: 90, cY: 345 },
    { id: 7, rX: 200, rY: 265, cX: 200, cY: 315 },
    { id: 8, rX: 290, rY: 355, cX: 290, cY: 330 },
    { id: 9, rX: 355, rY: 290, cX: 345, cY: 300 },
    { id: 10, rX: 265, rY: 200, cX: 300, cY: 200 },
    { id: 11, rX: 355, rY: 110, cX: 345, cY: 75 },
    { id: 12, rX: 290, rY: 45, cX: 300, cY: 35 },
  ];

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${formData.place}`
      );
      const geoData = await geoRes.json();

      const res = await fetch("http://localhost:5001/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          latitude: geoData[0]?.lat,
          longitude: geoData[0]?.lon,
        }),
      });

      const data = await res.json();
      setResult(data);
      setTimeout(() => {
        window.scrollTo({ top: 600, behavior: "smooth" });
      }, 500);
    } catch (err) {
      alert("Error generating kundli! Make sure server is running on port 5001.");
    }
    setLoading(false);
  };

  const planetHouseMap = {};
  if (result?.north_indian_chart) {
    Object.entries(result.north_indian_chart).forEach(([house, planets]) => {
      planets.forEach((p) => {
        planetHouseMap[p] = house;
      });
    });
  }

  let chartData = {};
  if (chartType === "D1") chartData = result?.north_indian_chart || {};
  if (chartType === "D4") chartData = result?.d4_chart || {};
  if (chartType === "D9") chartData = result?.d9_chart || {};

  return (
    <div className="astro-container">
      {/* Background Animated Stars and Nebulas */}
      <div className="stars-overlay"></div>
      <div className="nebula-1"></div>
      <div className="nebula-2"></div>

      <header className="astro-hero fade-in">
        <h1 className="gold-text">Astro World</h1>
        <p className="subtitle">Decode the Language of the Stars</p>
      </header>

      <div className="glass-card form-box slide-up">
        <form onSubmit={handleGenerate} className="astro-form">
          <div className="form-row">
            <input name="name" placeholder={t("Full Name")} onChange={handleChange} required />
            <select name="gender" onChange={handleChange} required>
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="form-row">
            <input name="date" type="date" onChange={handleChange} required />
            <input name="time" type="time" onChange={handleChange} required />
          </div>
          <input name="place" placeholder={t("Birth City (e.g. Delhi, India)")} onChange={handleChange} required />
          <button type="submit" className={`glow-btn ${loading ? "loading" : ""}`}>
            {loading ? <span className="spinner"></span> : "Generate Kundli"}
          </button>
        </form>
      </div>

      {result && (
        <div className="results-container slide-up-heavy">
          <div className="lang-switch">
            <button className={i18n.language === "en" ? "active-lang" : ""} onClick={() => i18n.changeLanguage("en")}>EN</button>
            <button className={i18n.language === "hi" ? "active-lang" : ""} onClick={() => i18n.changeLanguage("hi")}>HI</button>
          </div>

          <div className="glass-card profile-banner">
            <div className="profile-item">
              <label>Native</label>
              <span className="glow-text-subtle">{formData.name}</span>
            </div>
            <div className="profile-item highlight">
              <label>Lagna (Ascendant)</label>
              <span>{result.lagna.sign} <small>{result.lagna.degree.toFixed(2)}°</small></span>
            </div>
            <div className="profile-item highlight">
              <label>Nakshatra</label>
              <span>{result.nakshatra.nakshatra}</span>
              <small>Pada {result.nakshatra.pada} (Lord: {result.nakshatra.lord})</small>
            </div>
          </div>

          <div className="chart-select">
            <select value={chartType} onChange={(e) => setChartType(e.target.value)}>
              <option value="D1">Lagna Chart (D1)</option>
              <option value="D4">Chaturthamsa (D4)</option>
              <option value="D9">Navamsa (D9)</option>
            </select>
          </div>

          <div className="main-grid">
            {/* Chart Section */}
            <div className="glass-card chart-wrapper">
              <h3 className="section-title">
                {chartType === "D1" && "Lagna Chart (D1)"}
                {chartType === "D4" && "Chaturthamsa Chart (D4)"}
                {chartType === "D9" && "Navamsa Chart (D9)"}
              </h3>
              <div className="svg-container">
                <svg viewBox="0 0 400 400" className="kundli-svg">
                  <rect width="400" height="400" className="chart-bg" />
                  <line x1="0" y1="0" x2="400" y2="400" className="chart-line" />
                  <line x1="400" y1="0" x2="0" y2="400" className="chart-line" />
                  <line x1="200" y1="0" x2="400" y2="200" className="chart-line" />
                  <line x1="400" y1="200" x2="200" y2="400" className="chart-line" />
                  <line x1="200" y1="400" x2="0" y2="200" className="chart-line" />
                  <line x1="0" y1="200" x2="200" y2="0" className="chart-line" />

                  {houseConfig.map((house) => {
                    const startSign = RASHI_MAP[result.lagna.sign];
                    const rashiNum = ((startSign + house.id - 2) % 12) + 1;
                    const planets = chartData?.[house.id] || chartData?.[String(house.id)] || [];

                    return (
                      <g key={house.id}>
                        <text x={house.rX} y={house.rY} className="rashi-num-text">
                          {rashiNum}
                        </text>
                        {planets.map((p, index) => (
                          <text key={p} x={house.cX} y={house.cY + index * 18} fill={PLANET_COLORS[p] || "#ffffff"} className="planet-text">
                            {getPlanetLabel(p)}
                          </text>
                        ))}
                      </g>
                    );
                  })}
                </svg>
              </div>
              <div className="chart-legend">
                <span>* Vakri</span>
                <span>☀ Ast</span>
                <span>↑ Uchh</span>
                <span>↓ Neech</span>
              </div>
            </div>

            {/* Planets Table */}
            <div className="glass-card table-wrapper">
              <h3 className="section-title">Planetary Status</h3>
              <div className="scrollable-table">
                <table className="astro-table">
                  <thead>
                    <tr>
                      <th>{t("Planet")}</th>
                      <th>{t("Sign")}</th>
                      <th>{t("Degree")}</th>
                      <th>{t("House")}</th>
                      <th>{t("Vakri")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(result.planets).map(([p, val]) => (
                      <tr key={p}>
                        <td className="p-bold" style={{ color: PLANET_COLORS[p] }}>{p}</td>
                        <td>{val.sign}</td>
                        <td>{val.degree.toFixed(2)}°</td>
                        <td>{planetHouseMap[p] || "-"}</td>
                        <td>{val.retrograde ? "Yes" : "No"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Dasha Section */}
          <div className="glass-card dasha-container">
            <h3 className="section-title">Vimshottari Dasha</h3>
            <div className="dasha-list">
              {result.dasha.map((maha, mIndex) => (
                <div key={mIndex} className="dasha-item">
                  <div className="maha-row" onClick={() => setOpenMaha(openMaha === mIndex ? null : mIndex)}>
                    <span className={`arrow ${openMaha === mIndex ? "down" : ""}`}>✦</span>
                    <span className="p-name" style={{ color: PLANET_COLORS[maha.planet] }}>{maha.planet} Mahadasha</span>
                    <span className="dates">{maha.start} - {maha.end}</span>
                  </div>

                  <div className={`collapsible-content ${openMaha === mIndex ? "open" : ""}`}>
                    <div className="antar-list">
                      {maha.antar.map((antar, aIndex) => (
                        <div key={aIndex} className="antar-item">
                          <div className="antar-row" onClick={(e) => { e.stopPropagation(); setOpenAntar(openAntar === aIndex ? null : aIndex); }}>
                            <span>{antar.planet}</span>
                            <span className="dates">{antar.start} - {antar.end}</span>
                          </div>
                          
                          <div className={`collapsible-content ${openAntar === aIndex ? "open" : ""}`}>
                            <div className="prat-list">
                              {antar.pratyantar.map((p, pIndex) => (
                                <div key={pIndex} className="prat-row">
                                  <span>{p.planet}</span>
                                  <span className="dates">{p.start} - {p.end}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}