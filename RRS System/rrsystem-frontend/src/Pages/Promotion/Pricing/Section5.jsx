import React from 'react';

const Section5 = () => {
    return (
        <section className="section5">
            <div className="container">
                <h2 className='section5-title'>Chosen by Restaurants, Bars & Clubs in 50+ Countries</h2>
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <div className="card h-100">
                            <div className="card-body d-flex flex-column justify-content-between">
                                <div className="mb-3">
                                    <span className="text-warning">&#9733;</span>
                                    <span className="text-warning">&#9733;</span>
                                    <span className="text-warning">&#9733;</span>
                                    <span className="text-warning">&#9734;</span>
                                    <span className="text-warning">&#9734;</span>
                                </div>
                                <p className="card-text">
                                "It was relatively easy to set up and embed into our website, with minimal technical knowledge required. Online users interacted with it quite well, and we didn’t receive any complaints about confusion. While it functions smoothly overall, a few more customization options would improve the experience for both staff and customers."
                                </p>
                                <div className="d-flex justify-content-between">
                                    <p className="card-text mb-0 mt-1"><strong>Emily Williams - Canada</strong></p>
                                        <div class="d-flex align-items-end">
                                            <img src="/images/CanadaFlag.png" alt="Canada Flag" className="flag" /> 
                                        </div>
                                </div>    
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card h-100">
                            <div className="card-body d-flex flex-column justify-content-between">
                                <div className="mb-3">
                                    <span className="text-warning">&#9733;</span>
                                    <span className="text-warning">&#9733;</span>
                                    <span className="text-warning">&#9733;</span>
                                    <span className="text-warning">&#9733;</span>
                                    <span className="text-warning">&#9733;</span>
                                </div>
                                <p className="card-text">
                                "Simple to use and manage information from anywhere and on any device. Our restaurant does not need extra staff, because waiting staff is fully responsible for booking from any location. The system is easy to use for team members, as it is easy to see gaps between reservations and book more tables efficiently and confidently."
                                </p>
                                <div className="d-flex justify-content-between">
                                    <p className="card-text mb-0 mt-1"><strong>Ivan Kovalenko - Ukraine</strong></p>
                                    <div class="d-flex align-items-end">
                                        <img src="/images/UkraineFlag.png" alt="Ukraine Flag " className="flag" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="card h-100">
                            <div className="card-body d-flex flex-column justify-content-between">
                                <div className="mb-3">
                                    <span className="text-warning">&#9733;</span>
                                    <span className="text-warning">&#9733;</span>
                                    <span className="text-warning">&#9733;</span>
                                    <span className="text-warning">&#9733;</span>
                                    <span className="text-warning">&#9734;</span>
                                </div>
                                <p className="card-text">
                                    "This system really helped cut down on no shows. 
                                    It had so many useful features to fully control our reservation. 
                                    I loved that they hosted it so it was less things on my to-do. 
                                    Don't think our way of doing it didn't do the job, but it was definitely 
                                    less professional than this. The team responds to any questions I had within the hour!"
                                </p>
                                <div className="d-flex justify-content-between">
                                    <p className="card-text mb-0 mt-1"><strong>John Michaelson - USA</strong></p>
                                    <div class="d-flex align-items-end">
                                        <img src="/images/UsaFlag.png" alt="Usa Flag" className="flag" />
                                    </div>
                                 </div>   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Section5;