import React, { useState, useEffect } from "react";
import Navigation from "../../../../Shared/Dashboard/Restaurant-Owner/NavigationRestaurantOwner.jsx";

function UpdateRestaurant() {
    const [restaurants, setRestaurants] = useState([]);
    const [cuisines, setCuisines] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    
    useEffect(() => {
        fetch("http://localhost:8081/api/restaurant-owner/cuisine-select", {
            method: "GET",
            credentials: "include",
        })
            .then(response => response.json())
            .then(data => setCuisines(data));
    
        fetch("http://localhost:8081/api/restaurant-owner/location-select", {
            method: "GET",
            credentials: "include",
        })
            .then(response => response.json())
            .then(data => setLocations(data));
    
        fetch("http://localhost:8081/api/restaurant-owner/restaurant-select", {
            method: "GET",
            credentials: "include",
        })
            .then(response => response.json())
            .then(data => {
                setSelectedRestaurant(data);
            });
    }, []);
    

    const handleRestaurantChange = (event) => {
        const restaurantId = parseInt(event.target.value);
        const foundRestaurant = restaurants.find(r => r.id === restaurantId);
        setSelectedRestaurant(foundRestaurant);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "cuisine") {
            const selectedCuisine = cuisines.find(c => c.id === parseInt(value));
            setSelectedRestaurant(prev => ({
                ...prev,
                cuisine: selectedCuisine || null,
            }));
        } else if (name === "location") {
            const selectedLocation = locations.find(l => l.id === parseInt(value));
            setSelectedRestaurant(prev => ({
                ...prev,
                location: selectedLocation || null,
            }));
        } else {
            setSelectedRestaurant(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleUpdate = () => {
        if (!selectedRestaurant || !selectedRestaurant.cuisine || !selectedRestaurant.location) {
            setMessage("Please select a valid cuisine and location.");
            setIsSuccess(false);
            return;
        }

        const updatedRestaurant = {
            ...selectedRestaurant,
            cuisine: { id: selectedRestaurant.cuisine.id },
            location: { id: selectedRestaurant.location.id },
        };

        fetch(`http://localhost:8081/api/restaurant-owner/update-restaurant`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedRestaurant),
        })        
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(err.message || "Failed to update restaurant.") });
                }
                return response.json();
            })
            .then(() => {
                setMessage("Restaurant successfully updated!");
                setIsSuccess(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
            })
            .catch((error) => {
                console.error("Error updating restaurant:", error);
                setMessage(error.message);
                setIsSuccess(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
    };

    return (
        <>
            <Navigation />
            <div id="content">
                <h1 className="page-name">Update Restaurant</h1>

                {message && (
                    <p className={`text-center add-cuisine-message ${isSuccess ? 'success' : 'error'}`}>
                        {message}
                    </p>
                )}

                <div className="update-restaurant-div mb-4">
                    <form className="update-restaurant-form">

                        {/* Restaurant Name */}
                        <div className="form-group">
                            <label htmlFor="restaurantName">Restaurant Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="restaurantName"
                                name="restaurantName"
                                value={selectedRestaurant?.restaurantName || ""}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Cuisine Selection */}
                        <div className="form-group">
                            <label>Choose the Cuisine</label>
                            <select
                                className="form-select form-control bold-select"
                                name="cuisine"
                                value={selectedRestaurant?.cuisine?.id || ""}
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

                        {/* Location Selection */}
                        <div className="form-group">
                            <label>Choose the Location</label>
                            <select
                                className="form-select form-control bold-select"
                                name="location"
                                value={selectedRestaurant?.location?.id || ""}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select a location</option>
                                {locations.map((location) => (
                                    <option key={location.id} value={location.id}>
                                        {location.cityName + ", " + location.countryName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Other Restaurant Details */}
                        {["restaurantOwner", "restaurantWebsite", "restaurantEmail", "restaurantPhone", "hoursOfOperation", "dressCode", "parkingDetails"].map((field) => (
                            <div className="form-group" key={field}>
                                <label htmlFor={field}>Enter {field.replace(/([A-Z])/g, " $1")}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id={field}
                                    name={field}
                                    value={selectedRestaurant?.[field] || ""}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        ))}

                        <button type="button" onClick={handleUpdate} className="btn btn-add-manager">
                            Update Restaurant
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UpdateRestaurant;
