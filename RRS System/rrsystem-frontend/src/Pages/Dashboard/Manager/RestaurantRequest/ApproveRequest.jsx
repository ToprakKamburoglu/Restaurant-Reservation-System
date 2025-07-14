import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "../../../../Shared/Dashboard/Manager/NavigationManager.jsx";

function ApproveRequest() {
    const location = useLocation();
    const { id } = location.state; 
    const navigate = useNavigate();

    const [selectedRequest, setSelectedRequest] = useState(null);
    const [cuisines, setCuisines] = useState([]);
    const [locations, setLocations] = useState([]);
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const [isChecked, setIsChecked] = useState(false);

    const [username, setUsername] = useState("");

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
        } else if (name === "username") {
            setUsername(value); 
            checkUsernameAvailability(value);
        } else {
            setSelectedRequest(prev => ({ ...prev, [name]: value }));
        }
    };

    const checkUsernameAvailability = (usernameToCheck) => {
        if (!usernameToCheck) return;
    
        fetch(`http://localhost:8081/api/tryit/check-username?username=${usernameToCheck}`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(exists => {
                if (exists) {
                    setMessage("This username is already taken. Please choose another one.");
                    setIsSuccess(false);
                } else {
                    setMessage("");
                }
            })
            .catch(err => {
                console.error("Username check failed:", err);
                setMessage("Error checking username.");
                setIsSuccess(false);
            });
    };
    

    const handleApprove = (e) => {
        e.preventDefault();
    
        if (!selectedRequest) {
            setMessage("Request data is not available.");
            return;
        }
    
        // Check username availability again before submission
        fetch(`http://localhost:8081/api/tryit/check-username?username=${username}`, {
            credentials: "include",
        })
            .then(res => res.json())
            .then(exists => {
                if (exists) {
                    setMessage("This username is already taken. Please choose another one.");
                    setIsSuccess(false);
                    return;
                }
    
                const updatedRequest = {
                    ...selectedRequest,
                    cuisine: { id: selectedRequest.cuisine.id },
                    location: { id: selectedRequest.location.id }
                };
    
                fetch(`http://localhost:8081/api/manager/restaurant-request/${id}/approve?username=${username}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(updatedRequest),
                })
                    .then(response => {
                        if (!response.ok) {
                            return response.json().then(err => { throw new Error(err.message || "Approval failed.") });
                        }
                        return response.text();
                    })
                    .then(() => {
                        setMessage("Request approved successfully.");
                        setIsSuccess(true);
                        navigate("/manager/restaurant-requests");
                    })
                    .catch(err => {
                        console.error("Approve error:", err);
                        setMessage(err.message);
                        setIsSuccess(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    });
    
            })
            .catch(err => {
                console.error("Username re-check failed:", err);
                setMessage("Username validation failed.");
                setIsSuccess(false);
            });
    };
    

    if (!selectedRequest) return <div>Loading...</div>;

    return (
        <>
            <Navigation />
            <div id="content">
                <h1 className="page-name">Approve Restaurant Request</h1>
                {message && (
                    <p className={`text-center add-cuisine-message ${isSuccess ? 'success' : 'error'}`}>
                        {message}
                    </p>
                )}
                <div className="approve-request-div mb-4">
                    <form className="approve-request-form" onSubmit={handleApprove}>
                        {/* Set Username */}
                        <div className="form-group">    
                            <label htmlFor="username">Set a Username</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Sender Name */}
                        <div className="form-group">
                            <label htmlFor="name">Sender Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={selectedRequest.name || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Sender Surname */}
                        <div className="form-group">
                            <label htmlFor="surname">Sender Surname</label>
                            <input
                                type="text"
                                className="form-control"
                                name="surname"
                                value={selectedRequest.surname || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Restaurant Name */}
                        <div className="form-group">
                            <label htmlFor="restaurantName">Restaurant Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="restaurantName"
                                value={selectedRequest.restaurantName || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">User Email</label>
                            <input
                                type="text"
                                className="form-control"
                                name="email"
                                value={selectedRequest.email || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">User Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                name="phone"
                                value={selectedRequest.phone || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Cuisine Select */}
                        <div className="form-group">
                            <label>Choose the Cuisine</label>
                            <select
                                className="form-select form-control bold-select"
                                name="cuisine"
                                value={selectedRequest.cuisine?.id || ""}
                                onChange={handleChange}
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

                        {/* Location Select */}
                        <div className="form-group">
                            <label>Choose the Location</label>
                            <select
                                className="form-select form-control bold-select"
                                name="location"
                                value={selectedRequest.location?.id || ""}
                                onChange={handleChange}
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
                                />
                            </div>
                        ))}


                        {/* Approve Checkbox */}
                        <div className="form-check text-center pt-3">
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                id="ownerApprove" 
                                required 
                                checked={isChecked}
                                onChange={(e) => setIsChecked(e.target.checked)} 
                            />

                            <label className="form-check-label" htmlFor="ownerApprove">
                                I reviewed all the information, called the client and got the necessary approval.
                            </label>
                        </div>

                        <div className="btn-div-approve-request">
                            <button 
                                type="submit" 
                                className="btn btn-add-manager" 
                                disabled={!isChecked}
                            >
                                Approve Request
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ApproveRequest;
