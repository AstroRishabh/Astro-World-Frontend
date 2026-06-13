import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import BookingModal from "../components/BookingModal";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [activeAstrologer, setActiveAstrologer] = useState(null);
  
  // 🔥 Mobile Hamburger Sidebar State Trigger
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token) {
      navigate("/login");
      return;
    }

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleBookAstrologer = (astrologer) => {
    setActiveAstrologer(astrologer);
    setShowModal(true);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Kundli", path: "/kundli", icon: "📜" },
    { name: "Numerology", path: "/numerology", icon: "🔢" },
    { name: "Rashifal", path: "/horoscope", icon: "☀️" },
    { name: "AI Kundli", path: "/ai-kundli", icon: "🤖" },
  ];

  const features = [
    { title: "Generate Kundli", icon: "🔮", path: "/kundli", desc: "Get your detailed birth chart" },
    { title: "Kundli Milan", icon: "❤️", path: "/compatibility", desc: "Check marriage compatibility" },
    { title: "Daily Rashifal", icon: "🌞", path: "/horoscope", desc: "Know your daily predictions" },
    { title: "Lucky Number", icon: "🎯", path: "/numerology", desc: "Find your numerology profile" },
    { title: "Palm Reading", icon: "✋", path: "/palm", desc: "Scan your hands via AI scan" },
    { title: "Tarot Reading", icon: "🃏", path: "/tarot", desc: "Pick your destiny cards" },
  ];

  const astrologers = [
    { name: "Acharya Raj", rating: "4.8", exp: "12 Years", price: "₹500/hr", img: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Pandit Vivek", rating: "4.6", exp: "8 Years", price: "₹400/hr", img: "https://randomuser.me/api/portraits/men/44.jpg" },
    { name: "Dr. Shivi Astrologer", rating: "4.9", exp: "15 Years", price: "₹800/hr", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  ];

  return (
    <div className="dashboard-container">
      <div className="stars-layer"></div>

      {/* Mobile Header Toolbar - Laptop par automatic hidden rahega */}
      <div className="mobile-top-bar">
        <button className="hamburger-btn" onClick={toggleSidebar} aria-label="Toggle Menu">
          {isSidebarOpen ? "✕" : "☰"}
        </button>
        <div className="mobile-logo">
          <span>✨</span> Astro World
        </div>
      </div>

      {/* Mobile Backdrop Overlay - Sidebar khulne par background click se close karne ke liye */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

      {/* Sidebar Layout - Mobile toggle matching classes updated */}
      <aside className={`sidebar ${isSidebarOpen ? "sidebar-mobile-open" : ""}`}>
        <div className="logo-section">
          <span className="logo-spark">✨</span>
          <h1>Astro World</h1>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <div
              key={item.path}
              className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
              onClick={() => {
                navigate(item.path);
                setIsSidebarOpen(false); // Mobile par page click hote hi close ho jaye
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.name}</span>
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn-minimal" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content Workspace Layout */}
      <main className="main-content">
        
        {/* Header - Glassmorphic Profile Box */}
        <header className="dashboard-header fade-in">
          <div className="welcome-greet">
            <h2>Namaste, {user?.name?.split(" ")[0] || "Seeker"}! 🙏</h2>
            <p>The cosmos is aligned in your favor today.</p>
          </div>

          <div className="profile-glass">
            <img
              src={user?.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
              alt="profile"
              className="profile-img"
            />
            <div className="profile-info">
              <span className="profile-name">{user?.name || "Astro User"}</span>
              <span className="profile-role">Premium Seeker</span>
            </div>
          </div>
        </header>

        {/* Cosmic Toolkit Grid Layout */}
        <section className="section-container">
          <h3 className="section-title">🔮 Cosmic Toolkit</h3>
          <div className="features-grid">
            {features.map((f, i) => (
              <div
                key={i}
                className="feature-card-premium slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
                onClick={() => navigate(f.path)}
              >
                <div className="feat-icon-wrapper">{f.icon}</div>
                <div className="feat-content">
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
                <div className="feat-arrow">→</div>
              </div>
            ))}
          </div>
        </section>

        {/* Astrologers Profiles Row Layout */}
        <section className="section-container">
          <div className="section-header-row">
            <h3 className="section-title">👳 Book your appointment with our best Astrologers</h3>
            <span className="view-all">View All</span>
          </div>

          <div className="astrologer-grid">
            {astrologers.map((astro, index) => (
              <div 
                key={index} 
                className="astro-glass-card slide-up"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="astro-card-top">
                  <img src={astro.img} alt={astro.name} className="astro-avatar"/>
                  <span className="astro-price">{astro.price}</span>
                </div>
                <div className="astro-card-body">
                  <h4>{astro.name}</h4>
                  <div className="astro-stats">
                    <span>⭐ {astro.rating}</span>
                    <span className="divider">|</span>
                    <span>⏳ {astro.exp}</span>
                  </div>
                </div>
                <button 
                  className="astro-book-btn" 
                  onClick={() => handleBookAstrologer(astro)} // Fixed: Triggers modal state correctly with data
                >
                  Schedule Session
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      {showModal && (
        <BookingModal 
          astrologer={activeAstrologer} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </div>
  );
}
