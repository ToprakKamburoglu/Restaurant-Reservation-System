import React from 'react';

const Section8 = () => {
    return (
        <section className="section8 py-5 text-center">
            <div className="container">
                <div className="contact-content mb-5">
                    <h2>Contact Us</h2>
                    <p>For Any Questions or Inquiries, Please Reach Out To Us Below</p>
                </div>
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <div className="contact-card h-100">
                            <div className="card-body">
                                <div className="d-flex justify-content-center mb-3">
                                    <i className="fa fa-map-marker-alt fa-2x text-primary mt-4" aria-hidden="true"></i>
                                    <div className="ms-3 mt-4">
                                        <h3>Address</h3>
                                        <p>Istanbul, Turkey</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="contact-card h-100">
                            <div className="card-body">
                                <div className="d-flex justify-content-center mb-3">
                                    <i className="fa fa-phone fa-2x text-primary mt-4" aria-hidden="true"></i>
                                    <div className="ms-3 mt-4">
                                        <h3>Phone</h3>
                                        <p>+90 212 345 67 89</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 mb-4">
                        <div className="contact-card h-100">
                            <div className="card-body">
                                <div className="d-flex justify-content-center mb-3">
                                    <i className="fa fa-at fa-2x text-primary mt-4" aria-hidden="true"></i>
                                    <div className="ms-3 mt-4">
                                        <h3>Email</h3>
                                        <p>rezal@bariscanaslan.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="contact-form card">
                            <div className="card-body">
                                <h2 className="mb-4">Send Message</h2>
                                <form>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" required placeholder="Full Name" />
                                    </div>
                                    <div className="mb-3">
                                        <input type="email" className="form-control" required placeholder="Email" />
                                    </div>
                                    <div className="mb-3">
                                        <textarea className="form-control" rows="5" required placeholder="Type your Message..."></textarea>
                                    </div>
                                    <div>
                                        <button type="submit" className="btn btn-primary">Send</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Section8;