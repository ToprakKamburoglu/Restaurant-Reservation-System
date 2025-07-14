import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const AvarHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="avar-header">
      <div className="avar-header-inner">
        <nav className="avar-header-nav">
          <ul className={`avar-nav-links ${menuOpen ? "active" : ""}`}>
            <li><a href="#">Ana Sayfa</a></li>
            <li><a href="#">Menü</a></li>
            <li><a href="#">Rezervasyon</a></li>
            <li><a href="#">İletişim</a></li>
          </ul>
        </nav>

        <div className="avar-logo">AVAR <span>Kebap</span></div>

        <button className="avar-menu-toggle" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
};

export default AvarHeader;