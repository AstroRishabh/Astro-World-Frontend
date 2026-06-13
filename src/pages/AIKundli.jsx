import React, { useState, useEffect, useRef } from "react";
import "./AIKundli.css";

export default function AIKundli() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    place: "",
    latitude: "",
    longitude: ""
  });

  const [kundli, setKundli] = useState(null);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);

  const chatEndRef = useRef(null);
  const debounceRef = useRef(null);

  // Load chat history on mount
  useEffect(() => {
    const saved = localStorage.getItem("astroChat");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  // Save chat history whenever messages array changes
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("astroChat", JSON.stringify(messages));
    }
  }, [messages]);

  // Auto scroll to latest chat messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fetch coordinates from OpenCage Data
  const fetchCoordinates = async (placeName) => {
    if (!placeName.trim()) return;
    setLocationLoading(true);

    try {
      const res = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(placeName)}&key=dbb4002b29024b2291596817072e3f0b`
      );
      const data = await res.json();

      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        setFormData(prev => ({
          ...prev,
          latitude: lat,
          longitude: lng
        }));
      }
    } catch (err) {
      console.error("Location coordinate fetching error:", err);
    } finally {
      setLocationLoading(false);
    }
  };

  // Handled search typing with a proper 800ms Debounce system
  const handlePlaceChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, place: value, latitude: "", longitude: "" }));

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.trim().length > 3) {
      debounceRef.current = setTimeout(() => {
        fetchCoordinates(value);
      }, 800);
    }
  };

  // Generate Kundli
  const generateKundli = async () => {
    if (!formData.name || !formData.date || !formData.time || !formData.place) {
      alert("Please fill all details completely.");
      return;
    }

    if (!formData.latitude || !formData.longitude) {
      alert("Still fetching geo-coordinates for the location... please wait a moment.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/kundli/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      console.log("Generated kundli data:", data);

      if (data.error) {
        alert("Kundli generation failed. Please check inputs.");
        setLoading(false);
        return;
      }

      setKundli(data);
      setMessages([
        {
          type: "ai",
          text: `Namaste ${formData.name}! Your Kundli has been calculated perfectly. Ask me anything about your career, relationship, or destiny 🔮`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      console.error("Server Connection Error:", err);
      alert("Server connection error! Please check if your backend is running.");
    } finally {
      setLoading(false);
    }
  };

  // Ask AI Engine
  const askAI = async () => {
    if (!question.trim()) return;

    const userMsg = {
      type: "user",
      text: question,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/ai/ask-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: userMsg.text,
          kundli: kundli
        })
      });

      const data = await res.json();

      const aiMsg = {
        type: "ai",
        text: data.answer || "I apologize, my cosmic vision is blurry at the moment. Please ask again.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error("AI API Error:", err);
      setMessages(prev => [
        ...prev,
        {
          type: "ai",
          text: "Astrology service is currently facing network anomalies. Please try again shortly.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    if (window.confirm("Do you want to reset your conversation history?")) {
      localStorage.removeItem("astroChat");
      if (kundli) {
        setMessages([
          {
            type: "ai",
            text: `History cleared. How else can I guide you today, ${formData.name}? 🔮`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        setMessages([]);
      }
    }
  };

  return (
    <div className="ai-wrapper">
      {/* Header View */}
      <header className="chat-header">
        <div className="header-info">
          <div className="avatar">🔮</div>
          <div>
            <h3>Astro World AI</h3>
            <p>{loading ? "Reading your stars..." : "Online"}</p>
          </div>
        </div>
        {messages.length > 0 && (
          <button className="clear-history-btn" onClick={clearChat} title="Clear Chat History">
            Clear Chat
          </button>
        )}
      </header>

      {/* Conditional Rendering View */}
      {!kundli ? (
        <div className="form-container">
          <div className="form-card">
            <h2>Let's Chat With Astro World AI</h2>
            <p className="form-subtitle">Enter your birth details to sync with the celestial alignment</p>

            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                placeholder="Enter your full name"
                onChange={handleChange}
              />
            </div>

            <div className="input-row">
              <div className="input-group">
                <label htmlFor="date">Birth Date</label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label htmlFor="time">Birth Time</label>
                <input
                  id="time"
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="place">Birth Place (City)</label>
              <div className="geo-input-wrapper">
                <input
                  id="place"
                  name="place"
                  type="text"
                  placeholder="e.g. New Delhi, Delhi, India"
                  value={formData.place}
                  onChange={handlePlaceChange}
                />
                {locationLoading && <span className="geo-loader">📍 Mapping...</span>}
                {!locationLoading && formData.latitude && <span className="geo-success">✅ Geocoded</span>}
              </div>
            </div>

            <button
              className={`gen-btn ${loading ? "btn-disabled" : ""}`}
              onClick={generateKundli}
              disabled={loading}
            >
              {loading ? "Aligning Constellations..." : "Generate My Kundli"}
            </button>
          </div>
        </div>
      ) : (
        <div className="whatsapp-container">
          <div className="chat-body">
            {messages.map((msg, i) => (
              <div key={i} className={`message-wrapper ${msg.type}`}>
                <div className="message-bubble">
                  <p className="msg-text">{msg.text}</p>
                  <span className="msg-time">{msg.time}</span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="message-wrapper ai">
                <div className="message-bubble typing">
                  <span className="dot-animation">AI is analyzing house transits...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef}></div>
          </div>

          {/* Footer Area for Inputting Questions */}
          <div className="chat-footer">
            <input
              type="text"
              placeholder="Ask about career, marriage, future transits..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && askAI()}
              disabled={loading}
            />
            <button
              className="send-btn"
              onClick={askAI}
              disabled={loading || !question.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
