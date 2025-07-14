import React from "react";
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

const AvarFooter = () => {
  return (
    <footer className="avar-footer">
      <div className="avar-footer-content">
        <div className="avar-footer-logo">
          <h2>AVAR <span>Kebap</span></h2>
        </div>
        <div className="avar-footer-info">
          <p><FaMapMarkerAlt /> Bağdat Caddesi No:42, İstanbul</p>
          <p><FaPhone /> +90 (212) 123 45 67</p>
          <p><FaEnvelope /> rezervasyon@avarkebap.com</p>
        </div>
        <div className="avar-footer-hours">
          <h4>Çalışma Saatleri</h4>
          <p>Her gün: 12:00 – 00:00</p>
        </div>
      </div>
    </footer>
  );
};

export default AvarFooter;

