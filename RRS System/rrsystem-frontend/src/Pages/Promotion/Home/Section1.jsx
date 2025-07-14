import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const Section1 = () => {
    const navigate = useNavigate();

    const handleSignupClick = () => {
        navigate('/tryit');
    };

    const handlePricingClick = () => {
        navigate('/pricing');
    };

    return (
        <section className='section1'>
            <div className="colored-div">
                <div className="container section1-content">
                    <div className="row align-items-center">
                        <div className="col-md-6 order-md-1">
                            <img src="/images/2.png" alt="Section Image" className="img-fluid section-image" />
                        </div>
                        <div className="col-md-6 about-col section1-col order-md-2">
                            <h2 className="title text-center">Table Booking System For Advanced Restaurants</h2>
                            <p className="description text-center mb-5">
                            Boost Sales, Satisfy Customers, and Save Time with Smart Booking.
                            </p>
                            <ul>
                                <li><FontAwesomeIcon icon={faCheckCircle} className="custom-check-icon" /> Digital reservation book for the team, making it easy to manage all bookings</li>
                                <li><FontAwesomeIcon icon={faCheckCircle} className="custom-check-icon" /> Seamless online reservation access, ensuring a smooth booking experience</li>
                                <li><FontAwesomeIcon icon={faCheckCircle} className="custom-check-icon" /> Manager's data and reports for the key strategic decision-making analytics</li>
                            </ul>
                            <div className="button-container">
                                <button className="btn btn-primary" onClick={handleSignupClick}>Try It Free</button>
                                <button className="btn btn-secondary" onClick={handlePricingClick}>See Pricing</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Section1;
