import React from 'react';

const Section6 = () => {
    return (
        <section className="section6 py-5 bg-light text-center">
            <div className="container">
                <h2 className="mb-4">
                    <span>Rezal</span> Reservation System Essential Features
                </h2>
                <p className="mb-5">Everything You Need to Manage Your Reservations Easily and Efficiently, All in One Place</p>
                <div className="row">
                    <div className="col-md-6 col-lg-3 mb-4">
                        <div className="card h-100">
                            <img src="images/foto1.png" className="card-img-top" alt="Feature 1" />
                            <div className="card-body">
                                <h3 className="card-title">Easy Online Reservations</h3>
                                <p className="card-text">Let customers easily book a table anytime online.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 mb-4">
                        <div className="card h-100">
                            <img src="images/foto2.png" className="card-img-top" alt="Feature 2" />
                            <div className="card-body">
                                <h3 className="card-title">Real-time Availability</h3>
                                <p className="card-text">Keep track of your tables with up-to-the-minute updates.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 mb-4">
                        <div className="card h-100">
                            <img src="images/foto3.png" className="card-img-top" alt="Feature 3" />
                            <div className="card-body">
                                <h3 className="card-title">Auto Confirmations</h3>
                                <p className="card-text">Send booking confirmations and reminders to avoid no-shows.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3 mb-4">
                        <div className="card h-100">
                            <img src="images/foto4.png" className="card-img-top" alt="Feature 4" />
                            <div className="card-body">
                                <h3 className="card-title">Customer Insights</h3>
                                <p className="card-text">Gain valuable data on customer preferences and behaviors.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Section6;