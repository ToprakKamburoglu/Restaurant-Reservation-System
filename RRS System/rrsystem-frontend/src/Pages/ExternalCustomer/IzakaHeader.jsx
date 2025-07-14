import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="izaka-header">
        <div className="izaka-logo">
          <h1>IZAKA</h1>
          <span>TERRACE</span>
        </div>
        <div className="menu-toggle" onClick={() => setIsMenuOpen(true)}>
          <FaBars size={20} />
        </div>
      </header>

      {isMenuOpen && (
        <div className="overlay-menu" onClick={() => setIsMenuOpen(false)}>
          <div className="overlay-close" onClick={() => setIsMenuOpen(false)}>
            <FaTimes />
          </div>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <ul>
              <li><a href="#">Ana Sayfa</a></li>
              <li><a href="#">Hikayemiz</a></li>
              <li><a href="#">Menü</a></li>
              <li><a href="#">Bar</a></li>
              <li><a href="#">Etkinlikler</a></li>
              <li><a href="#">Izaka 360</a></li>
              <li><a href="#">Rezervasyon</a></li>
              <li><a href="#">İletişim</a></li>
              <li><a href="#">🇹🇷 Türkçe</a></li>
              <li><a href="#">🇺🇸 English</a></li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

