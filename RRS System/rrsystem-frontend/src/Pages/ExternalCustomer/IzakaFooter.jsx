import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

const IzakaFooter = () => {
  return (
    <footer className="izaka-footer">
      <div className="izaka-footer__column">
        <h3 className="izaka-footer__title">İletişim</h3>
        <p>
          <FaMapMarkerAlt className="izaka-footer__icon" />
          Gümüşsuyu Mahallesi İnönü Cad. No:8, İstanbul / Türkiye
        </p>
        <p>
          <FaPhoneAlt className="izaka-footer__icon" />
          +90 (212) 708-3838
        </p>
        <p>
          <FaEnvelope className="izaka-footer__icon" />
          <a href="mailto:izaka.reservation@izakaterrace.com">
            izaka.reservation@izakaterrace.com
          </a>
        </p>
      </div>

      <div className="izaka-footer__column izaka-footer__column--right">
        <p className="izaka-footer__days">PAZARTESİ - PAZAR</p>
        <p className="izaka-footer__hours">12:00 - 01:30</p>
        <div className="izaka-footer__socials">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="izaka-footer__social-icon instagram" />
          </a>
          <a
            href="https://wa.me/905555555555"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp className="izaka-footer__social-icon whatsapp" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default IzakaFooter;

