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

  const chatEndRef = useRef(null);

  // Load chat history
  useEffect(() => {
    const saved = localStorage.getItem("astroChat");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  // Save chat history
  useEffect(() => {
    localStorage.setItem("astroChat", JSON.stringify(messages));
  }, [messages]);

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fetch coordinates
  const fetchCoordinates = async (place) => {

    if (!place) return;

    try {

      const res = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${place}&key=dbb4002b29024b2291596817072e3f0b`
      );

      const data = await res.json();

      if (data.results.length > 0) {

        const { lat, lng } = data.results[0].geometry;

        setFormData(prev => ({
          ...prev,
          place,
          latitude: lat,
          longitude: lng
        }));

      }

    } catch (err) {
      console.log("Location error:", err);
    }
  };

  // Generate kundli
  const generateKundli = async () => {

    if (!formData.name || !formData.date || !formData.time || !formData.place) {
      alert("Please fill all details");
      return;
    }

    if (!formData.latitude || !formData.longitude) {
      alert("Fetching location... please wait");
      return;
    }

    setLoading(true);

    try {

      const res = await fetch("https://astro-world-1.onrender.com/api/kundli/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      console.log("Generated kundli:", data);

      if (data.error) {
        alert("Kundli generation failed");
        return;
      }

      setKundli(data);

      setMessages([
        {
          type: "ai",
          text: `Namaste ${formData.name}! Your Kundli is ready. Ask me anything about your destiny 🔮`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);

      // Scroll to chat
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);

    } catch (err) {
      console.log(err);
      alert("Server error");
    }

    setLoading(false);
  };

  // Ask AI
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

      const res = await fetch("https://astro-world-1.onrender.com/api/ai/ask-ai", {
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
        text: data.answer || "AI failed to respond",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);

    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (

    <div className="ai-wrapper">

      <header className="chat-header">
        <div className="header-info">
          <div className="avatar">🔮</div>
          <div>
            <h3>Astro World AI</h3>
            <p>{loading ? "Reading your stars..." : "Online"}</p>
          </div>
        </div>
      </header>

      {!kundli ? (

        <div className="form-container">

          <div className="form-card">

            <h2>Let's Chat With Astro World AI</h2>

            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
            />

            <div className="input-row">

              <input
                type="date"
                name="date"
                onChange={handleChange}
              />

              <input
                type="time"
                name="time"
                onChange={handleChange}
              />

            </div>

            <input
              name="place"
              placeholder="Birth Place (City)"
              value={formData.place}
              onChange={(e) => {
                setFormData({ ...formData, place: e.target.value });
                if (e.target.value.length > 3) {
                  fetchCoordinates(e.target.value);
                }
              }}
            />

            <button
              className="gen-btn"
              onClick={generateKundli}
            >
              Generate My Kundli
            </button>

          </div>

        </div>

      ) : (

        <div className="whatsapp-container">

          <div className="chat-body">

            {messages.map((msg, i) => (

              <div key={i} className={`message-wrapper ${msg.type}`}>

                <div className="message-bubble">
                  {msg.text}
                  <span className="msg-time">{msg.time}</span>
                </div>

              </div>

            ))}

            {loading && (

              <div className="message-wrapper ai">
                <div className="message-bubble typing">
                  AI is reading stars...
                </div>
              </div>

            )}

            <div ref={chatEndRef}></div>

          </div>

          <div className="chat-footer">

            <input
              placeholder="Ask about career, marriage, future..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && askAI()}
            />

            <button
              className="send-btn"
              onClick={askAI}
            >
              ➤
            </button>

          </div>

        </div>

      )}

    </div>

  );
}
