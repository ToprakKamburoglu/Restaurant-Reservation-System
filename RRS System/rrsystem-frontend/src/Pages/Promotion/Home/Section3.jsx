import React from 'react';

const Section3 = () => {
    return (
        <section className="section3">
            <div className="container section3-content">
                <h2>Join Rezal - Simplify Bookings, Guide Reservations, and Grow Your Brasserie !</h2>
                <p className='text-center'>Start your 7-day free trial today. No card, no risk. If you have questions, visit our <a href="/contact" className="details-link">Contact Us</a></p>
                <div className="table-container">
                    <table className="table section3-table">
                        <thead>
                            <tr>
                                {/*<th scope="col">#</th>*/}
                                <th scope="col">Customization Options</th>
                                <th scope="col">Automation & Notifications</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {/*<th scope="row">1</th>*/}
                                <td>Calendar-Based Reservation View</td>
                                <td>Automated Email/SMS Confirmation</td>
                            </tr>
                            <tr>
                                {/*<th scope="row">2</th>*/}
                                <td>List Format Reservation Display</td>
                                <td>Automated Email/SMS Reminder</td>
                            </tr>
                            <tr>
                                {/*<th scope="row">3</th>*/}
                                <td>Interactive Floor Plan for Reservations</td>
                                <td>Automated Email/SMS Feedback Request</td>
                            </tr>
                            <tr>
                                {/*<th scope="row">5</th>*/}
                                <td>Extended Reservation Timeframe</td>
                                <td>Pending Reservation Approval Alerts</td>
                            </tr>
                            <tr>
                                {/*<th scope="row">6</th>*/}
                                <td>Custom Event Reservation Window</td>
                                <td>Automated Cancellation Notification</td>
                            </tr>
                            <tr>
                                {/*<th scope="row">8</th>*/}
                                <td>Table Locking for Reservation Management</td>
                                <td>Payment Request Email for Confirmation</td>
                            </tr>
                            <tr>
                                {/*<th scope="row">10</th>*/}
                                <td>Advanced Reservation Search Tool</td>
                                <td>Table Ready Notification via Email</td>
                            </tr>
                            <tr>
                                {/*<th scope="row">11</th>*/}
                                <td>Filtering Options for Reservations</td>
                                <td>No-Show Reservation Alert via Email</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Section3;