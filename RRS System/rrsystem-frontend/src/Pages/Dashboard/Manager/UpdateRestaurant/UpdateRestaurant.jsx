import React, { useState, useEffect, useRef } from "react";
import Navigation from "../../../../Shared/Dashboard/Manager/NavigationManager.jsx";

function UpdateRestaurant() {
    const [restaurants, setRestaurants] = useState([]);
    const [cuisines, setCuisines] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    
    useEffect(() => {
        fetch("http://localhost:8081/api/manager/cuisine-select", {
                method: "GET",
                credentials: "include",
            })
            .then(response => response.json())
            .then(data => setCuisines(data));

        fetch("http://localhost:8081/api/manager/location-select", {
                method: "GET",
                credentials: "include",
            })
            .then(response => response.json())
            .then(data => setLocations(data));

        fetch("http://localhost:8081/api/manager/restaurant-select", {
                method: "GET",
                credentials: "include",
            })
            .then(response => response.json())
            .then(data => {
                setRestaurants(data);
                if (data.length > 0) {
                    setSelectedRestaurant(data[0]);
                }
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
            setErrorMessage("Please select a valid cuisine and location.");
            setSuccesMessage(null);

            return;
        }

        const updatedRestaurant = {
            ...selectedRestaurant,
            cuisine: { id: selectedRestaurant.cuisine.id },
            location: { id: selectedRestaurant.location.id },
        };

        fetch(`http://localhost:8081/api/manager/update-restaurant/${updatedRestaurant.id}`, {
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
                setSuccesMessage("Restaurant successfully updated!");
                setErrorMessage(null);

                window.scrollTo({ top: 0, behavior: "smooth" });
            })
            .catch((error) => {
                console.error("Error updating restaurant:", error);
                setErrorMessage(error.message);
                setSuccesMessage(null);

                window.scrollTo({ top: 0, behavior: "smooth" });
            });
    };

    const alertRef = useRef(null);
    const [succesMessage, setSuccesMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    return (
        <>
            <Navigation />
            <div id="content">
                <h1 className="page-name">Update Restaurant</h1>

                <div ref={alertRef}>
                    {succesMessage && (
                        <div className="alert alert-success m-5 p-3" role="alert">
                            {succesMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className="alert alert-danger m-5 p-3" role="alert">
                            {errorMessage}
                        </div>
                    )}
                </div>

                <div className="update-restaurant-div mb-4">
                    <form className="update-restaurant-form">
                        <p className="update-attention">Do not make any changes without informing the restaurant owner!</p>
                        {/* Restaurant Selection */}
                        <div className="form-group pt-3">
                            <label>Choose the Restaurant</label>
                            <select
                                className="form-select form-control bold-select"
                                onChange={handleRestaurantChange}
                                value={selectedRestaurant?.id || ""}
                                required
                            >
                                <option value="" disabled>Select a restaurant</option>
                                {restaurants
                                    .sort((a, b) => a.restaurantName.localeCompare(b.restaurantName))
                                    .map((restaurant) => (
                                        <option key={restaurant.id} value={restaurant.id}>
                                            {restaurant.restaurantName}
                                        </option>
                                    ))}
                            </select>
                        </div>

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
