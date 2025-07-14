import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";


const Section4 = () => {
    return (
        <section className='section4'>
            <div className="container">
                <h2 className='section4-title'>Select Suitable Plan to Manage Your Reservations Well !</h2>
                <div className="price-row">
                    <div className="price-card">
                    <p><strong>Standard Package</strong></p>
                        <h3>19 $ <span>/ Month</span></h3>
                        <p className="description">Designed for small or emerging venues
                        seeking simple, effective booking tools
                        to streamline the daily operations, with a
                        reliable and well constructed system.</p>
                        <ul>
                            <li><FontAwesomeIcon icon={faCheck}/> 50 Bookings Monthly</li>
                            <li><FontAwesomeIcon icon={faCheck}/> Support via email</li>
                            <li><FontAwesomeIcon icon={faCheck}/> Basic analytics</li>
                            <li><FontAwesomeIcon icon={faCheck}/> Customizable booking widget</li>
                            <li><FontAwesomeIcon icon={faCheck}/> Access to mobile app</li>
                            <li><FontAwesomeIcon icon={faCheck}/> Basic customer database</li>
                        </ul>
                    </div>
                    <div className="price-card">
                    <p><strong>Advanced Package</strong></p>
                        <h3>24 $ <span>/ Month</span></h3>
                        <p className="description">Perfect for small or growing eateries,
                        this plan supports up to 300 monthly bookings
                        and lets you to manage the reservations easily
                        without difficulty. </p>
                        <ul>
                            <li><FontAwesomeIcon icon={faCheck}/> Up to 300 reservations per month</li>
                            <li><FontAwesomeIcon icon={faCheck}/> Priority email support</li>
                            <li><FontAwesomeIcon icon={faCheck}/> Advanced analytics</li>
                            <li><FontAwesomeIcon icon={faCheck}/> Customizable booking widget</li>
                            <li><FontAwesomeIcon icon={faCheck}/> Access to mobile app</li>
                            <li><FontAwesomeIcon icon={faCheck}/> Advanced customer database</li>
                        </ul>
                    </div>
                    <div className="price-card">
                        <p><strong>Premium Package</strong></p>
                        <h3>48 $ <span>/ Month</span></h3>
                        <p className="description">Larger and bustling restaurants opt for our success plan to effortlessly handle all their online reservation needs. Take advantage of our cost effective annual.</p>
                        <ul>
                            <li><FontAwesomeIcon icon={faCheck}/> Unlimited reservations</li>
                            <li><FontAwesomeIcon icon={faCheck}/> 24/7 priority support</li>
                            <li><FontAwesomeIcon icon={faCheck}/> Comprehensive analytics</li>
                            <li><FontAwesomeIcon icon={faCheck}/> Customizable booking widget</li>
                            <li><FontAwesomeIcon icon={faCheck}/> Access to mobile app</li>
                            <li><FontAwesomeIcon icon={faCheck}/> Full customer database</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Section4;