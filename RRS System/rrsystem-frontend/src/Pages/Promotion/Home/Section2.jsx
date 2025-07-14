import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faChartBar, faUserTag, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const Section2 = () => {
    return (
        <section className="section2">
            <div className="container section2-content">
                <h2 className="section2-title">Restaurant Owners: Discover What You Can Achieve with Rezal</h2>
                <p className="section2-top-description">
                Unlock seamless reservations and smarter restaurant management with Rezal. Learn more in our  
                    <a href="/features" className="section2-details-link"> Features</a>
                </p>
                <div className="row about-row">
                    <div className="col about-col section2-col">
                        <div className="home-icon">
                            <FontAwesomeIcon icon={faCalendarAlt} />
                        </div>
                        <p className="section2-p">Reservation Management</p>
                        <p className="section2-description">
                            Strategically optimize your restaurant’s layout and reservation system to ensure maximum seating capacity, 
                            minimize waste of time, and create a seamless dining experience for your customers.
                        </p>
                        <ul>
                            <li className="section2-li mb-2"><FontAwesomeIcon icon={faCheckCircle} className="custom-check-icon" /> Digital Reservation System</li>
                            <li className="section2-li mb-2"><FontAwesomeIcon icon={faCheckCircle} className="custom-check-icon" /> All-in-one Booking Platform</li>
                            <li className="section2-li"><FontAwesomeIcon icon={faCheckCircle} className="custom-check-icon" /> Streamlined Reservations</li>
                        </ul>
                    </div>
                    <div className="col about-col section2-col">
                        <div className="home-icon">
                            <FontAwesomeIcon icon={faChartBar} />
                        </div>
                        <p className="section2-p">Restaurant Enhancement</p>
                        <p className="section2-description">
                        Access proven marketing tools and strategies to successfully grow your restaurant, attract more guests, boost profits, and build a trusted brand with long-lasting impact and success.
                        </p>
                        <ul>
                            <li className="section2-li mb-2"><FontAwesomeIcon icon={faCheckCircle} className="custom-check-icon" /> Offers, Promos, and Events</li>
                            <li className="section2-li mb-2"><FontAwesomeIcon icon={faCheckCircle} className="custom-check-icon" /> Cancel Fees and Payments</li>
                            <li className="section2-li"><FontAwesomeIcon icon={faCheckCircle} className="custom-check-icon" /> Website Builder and Menus</li>
                        </ul>
                    </div>
                    <div className="col about-col section2-col">
                        <div className="home-icon">
                            <FontAwesomeIcon icon={faUserTag} />
                        </div>
                        <p className="section2-p">Evaluation Of Companies</p>
                        <p className="section2-description">
                        Use insights from rezTable to make smart, data-driven decisions that grow your restaurant, improve operations, boost guest satisfaction, increase profits, and drive long-term success. 
                        </p>
                        <ul>
                            <li className="section2-li mb-2"><FontAwesomeIcon icon={faCheckCircle} className="custom-check-icon" /> Key Analytics and Reports</li>
                            <li className="section2-li mb-2"><FontAwesomeIcon icon={faCheckCircle} className="custom-check-icon" /> Customer Data Management</li>
                            <li className="section2-li"><FontAwesomeIcon icon={faCheckCircle} className="custom-check-icon" /> Review Management Tools</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Section2;
