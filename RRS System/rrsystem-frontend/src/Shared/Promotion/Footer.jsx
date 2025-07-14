import React from 'react';

const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-lg-5 col-12 ft-1">
                    <h3 style={{ display: "flex", alignItems: "left", fontSize: "25px", margin: 0 ,  fontWeight: "bold" }}>
                    <img 
                        src="/images/logo-last.png" class="ms-0 me-2"
                        alt="Rezal Logo"
                        style={{ height: "28px", width: "auto", margin: "0 5px" }}
                    />
                    Rezal
                    </h3>
                        <p>
                            Table Booking System For Advanced Restaurants<br />
                            Boost sales and save time with smart booking
                        </p>
                        <div className="footer-icons">
                            <i className="fab fa-facebook"></i>
                            <i className="fab fa-twitter"></i>
                            <i className="fab fa-instagram"></i>
                            <i className="fab fa-linkedin-in"></i>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 col-12 ft-2">
                        <ul>
                            <li className="nav-item">
                                <a className="footer-a" href="/home">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="footer-a" href="/pricing">Pricing</a>
                            </li>
                            <li className="nav-item">
                                <a className="footer-a" href="/features">Features</a>
                            </li>
                            <li className="nav-item">
                                <a className="footer-a" href="/contact">Contact</a>
                            </li>
                            <li className="nav-item">
                                <a className="footer-a" href="/tryit">Try It Free</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-6 col-lg-4 col-12 ft-3">
                        <p><i className="fas fa-phone-volume"></i> +90 212 345 67 89</p>
                        <p><i className="fas fa-envelope"></i> rezal@gmail.com</p>
                        <p><i className="fas fa-map-marker-alt"></i> Istanbul, Turkey.</p>
                    </div>
                    <p className="lasttext">© 2025 Rezal. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;