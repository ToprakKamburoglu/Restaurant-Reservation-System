import React from 'react';

const integrations = [
    { text: "HTML Code-Based Widget", icon: "fas fa-code" },
    { text: "Email Integration", icon: "fas fa-envelope" },
    { text: "Google Analytics Tracking", icon: "fab fa-google" },
];

const Section7 = () => {
    return (
        <section className="section7 py-5 bg-light text-center">
            <div className="container">
                <h2 className="mb-4">Powerful Widget Integrations for Online Reservations</h2>
                <p className="mb-5">
                    Get More Reservations by Allowing Clients to Book Online From Any Marketing Tools for Your Business Uses with Seamless Rezal Integrations
                </p>
                <div className="row">
                    {integrations.map((item, index) => (
                        <div key={index} className="col-12 col-sm-6 col-lg-4 mb-4">
                            <div className="list-group-item d-flex justify-content-between align-items-center h-100">
                                {item.text} <i className={`${item.icon} section7-figure`}></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Section7;
