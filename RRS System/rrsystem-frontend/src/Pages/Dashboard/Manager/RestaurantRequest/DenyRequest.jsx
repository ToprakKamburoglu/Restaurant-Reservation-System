import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "../../../../Shared/Dashboard/Manager/NavigationManager.jsx";

function DenyRequest() {
    const location = useLocation();
    const { id } = location.state; 
    const navigate = useNavigate();

    const [selectedRequest, setSelectedRequest] = useState(null);
    const [cuisines, setCuisines] = useState([]);
    const [locations, setLocations] = useState([]);
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (!id) {
            setMessage("Invalid request ID");
            return;
        }

        fetch(`http://localhost:8081/api/manager/restaurant-request/${id}`, {
            credentials: "include",
        })
            .then(res => res.json())
            .then(setSelectedRequest)
            .catch(err => {
                console.error("Request fetch error:", err);
                setMessage(err.message);
            });

        fetch("http://localhost:8081/api/manager/cuisine-select", { credentials: "include" })
            .then(res => res.json())
            .then(setCuisines)
            .catch(err => console.error("Cuisine fetch error:", err));

        fetch("http://localhost:8081/api/manager/location-select", { credentials: "include" })
            .then(res => res.json())
            .then(setLocations)
            .catch(err => console.error("Location fetch error:", err));
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "cuisine") {
            const selectedCuisine = cuisines.find(c => c.id === parseInt(value));
            setSelectedRequest(prev => ({ ...prev, cuisine: selectedCuisine || null }));
        } else if (name === "location") {
            const selectedLocation = locations.find(l => l.id === parseInt(value));
            setSelectedRequest(prev => ({ ...prev, location: selectedLocation || null }));
        } else {
            setSelectedRequest(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleDeny = (e) => {
        e.preventDefault();

        if (!selectedRequest) {
            setMessage("Request data is not available.");
            return;
        }

        fetch(`http://localhost:8081/api/manager/restaurant-request/${id}/deny`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(selectedRequest.requestResponse),
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(err.message || "Denial failed.") });
                }
                return response.text();
            })
            .then(() => {
                setMessage("Request denied successfully.");
                setIsSuccess(true);
            })
            .catch(err => {
                console.error("Deny error:", err);
                setMessage(err.message);
                setIsSuccess(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
    };

    if (!selectedRequest) return <div>Loading...</div>;

    return (
        <>
            <Navigation />
            <div id="content">
                <h1 className="page-name">Deny Restaurant Request</h1>
                {message && (
                    <p className={`text-center add-cuisine-message ${isSuccess ? 'success' : 'error'}`}>
                        {message}
                    </p>
                )}
                <div className="approve-request-div mb-4">
                    <form className="approve-request-form" onSubmit={handleDeny}>
                        <div className="form-group">
                            <label htmlFor="restaurantName">Restaurant Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="restaurantName"
                                value={selectedRequest.restaurantName || ""}
                                onChange={handleChange}
                                readOnly
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Cuisine</label>
                            <select
                                className="form-select form-control bold-select"
                                name="cuisine"
                                value={selectedRequest.cuisine?.id || ""}
                                onChange={handleChange}
                                disabled
                                required
                            >
                                <option value="" disabled>Select a cuisine</option>
                                {cuisines.map((cuisine) => (
                                    <option key={cuisine.id} value={cuisine.id}>
                                        {cuisine.cuisineName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Location</label>
                            <select
                                className="form-select form-control bold-select"
                                name="location"
                                value={selectedRequest.location?.id || ""}
                                onChange={handleChange}
                                disabled
                                required
                            >
                                <option value="" disabled>Select a location</option>
                                {locations.map((location) => (
                                    <option key={location.id} value={location.id}>
                                        {location.cityName}, {location.countryName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {["restaurantWebsite", "restaurantEmail", "restaurantPhone", "hoursOfOperation", "dressCode", "parkingDetails"].map((field) => (
                            <div className="form-group" key={field}>
                                <label htmlFor={field}>Enter {field.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name={field}
                                    value={selectedRequest[field] || ""}
                                    onChange={handleChange}
                                    required
                                    readOnly
                                />
                            </div>
                        ))}

                        <div className="form-group">
                            <label htmlFor="requestResponse">Request Response</label>
                            <textarea
                                rows="4"
                                type="text"
                                className="form-control"
                                name="requestResponse"
                                value={selectedRequest.requestResponse || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-check text-center pt-3">
                            <input className="form-check-input" type="checkbox" id="ownerApprove" required />
                            <label className="form-check-label" htmlFor="ownerApprove">
                                I reviewed all the information, called the client and got the necessary approval.
                            </label>
                        </div>

                        <div className="btn-div-approve-request">
                            <button 
                                type="submit" 
                                className="btn btn-add-manager" 
                                onClick={() => window.location.href = '/manager/restaurant-requests'}
                            >
                                Deny Request
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}

export default DenyRequest;