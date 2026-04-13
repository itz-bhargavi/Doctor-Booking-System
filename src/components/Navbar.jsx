import React, { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar({ page, navigate, appointmentCount }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { key: "home", label: "Home" },
    { key: "doctors", label: "Find Doctors" },
    { key: "appointments", label: "My Appointments" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-inner">
        <div className="navbar-logo" onClick={() => navigate("home")}>
          <div className="logo-icon">
            <span>+</span>
          </div>
          <div className="logo-text">
            <span className="logo-main">DocBridge</span>
            <span className="logo-sub">Healthcare</span>
          </div>
        </div>

        <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
          {links.map((l) => (
            <button
              key={l.key}
              className={`nav-link ${page === l.key ? "active" : ""}`}
              onClick={() => { navigate(l.key); setMenuOpen(false); }}
            >
              {l.label}
              {l.key === "appointments" && appointmentCount > 0 && (
                <span className="nav-badge">{appointmentCount}</span>
              )}
            </button>
          ))}
          <button className="btn btn-primary btn-sm nav-cta" onClick={() => { navigate("doctors"); setMenuOpen(false); }}>
            Book Now
          </button>
        </div>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={menuOpen ? "open" : ""}></span>
          <span className={menuOpen ? "open" : ""}></span>
          <span className={menuOpen ? "open" : ""}></span>
        </button>
      </div>
    </nav>
  );
}
