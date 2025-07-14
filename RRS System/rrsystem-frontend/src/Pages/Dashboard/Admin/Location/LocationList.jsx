import React, { useState, useEffect, useRef } from "react";
import Navigation from "../../../../Shared/Dashboard/Admin/NavigationAdmin.jsx";

function LocationList() {
    const [locations, setLocations] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [locationToDelete, setLocationToDelete] = useState(null);    

    const itemsPerPage = 10;
    const [formData, setFormData] = useState({ cityName: "", countryName: "" });
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(null);

    const fetchLocations = () => {
        fetch("http://localhost:8081/api/admin/locations", {
            method: "GET",
            credentials: "include",
        })
        .then((response) => response.json())
        .then((data) => setLocations(data))
        .catch((error) => console.error("Error fetching locations:", error));
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = locations.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(locations.length / itemsPerPage);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}.${month}.${year} - ${hours}:${minutes}`;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;

        if ((/\d/.test(value) && (id === "cityName" || id === "countryName")) || value.length > 200) {
            return;
        }

        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8081/api/admin/locations/add-location", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.text();

            if (response.ok) {
                setSuccesMessage("Location added successfully!");
                setErrorMessage(null);

                setIsSuccess(true);
                setFormData({ cityName: "", countryName: "" });
                fetchLocations();
            } else {
                setErrorMessage(result);
                setSuccesMessage(null);
                
                setIsSuccess(false);
            }
        } catch (error) {
            console.error("Error adding location:", error);
            setErrorMessage("Error adding location:", error);
            setSuccesMessage(null);
            setIsSuccess(false);
        }
    };

    
    const handleActivate = (id) => {
        fetch(`http://localhost:8081/api/admin/locations/${id}/activate`, {
            method: "PUT",
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("API Response:", data);
            if (data.success) {
                fetchLocations();
            } else {
                console.error("Failed to activate locations:", data.message);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    };

    const confirmActivate = (location) => {
        handleActivate(location.id);
    };    

    const handleDelete = (id) => {
        fetch(`http://localhost:8081/api/admin/locations/${id}/deactivate`, {
            method: "PUT",
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("API Response:", data);
            if (data.success) {
                fetchLocations();
                setShowModal(false);
            } else {
                console.error("Failed to deactivate location:", data.message);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    };

    const confirmDelete = (location) => {
        if (location.restaurantCount > 0) {
            setErrorMessage("You have to change Restaurant's Locations before!");
            setSuccesMessage(null);

            setIsSuccess(false);
            setShowModal(false);
        } else {
            setLocationToDelete(location);
            setShowModal(true);
        }
    };

    const handleConfirmDelete = () => {
        if (locationToDelete) {
            handleDelete(locationToDelete.id);
        }
    };

    const handleCancelDelete = () => {
        setShowModal(false);
    };

    const alertRef = useRef(null);
    const [succesMessage, setSuccesMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    return (
        <>
            <Navigation />
            <div id="content">
                <h1 className="page-name">Location List</h1>

                <div className="add-location-div mb-5">
                    <form className="add-location-form" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="countryName">
                                        <i className="fas fa-flag"></i> Country Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="countryName"
                                        value={formData.countryName}
                                        onChange={handleChange}
                                        placeholder="Enter new country name"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cityName">
                                        <i className="fas fa-city"></i> City Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cityName"
                                        value={formData.cityName}
                                        onChange={handleChange}
                                        placeholder="Enter new city name"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col col-custom">
                                <div className="btn-div-add-location">
                                    <button type="submit" className="btn-add-location">
                                        <i className="fas fa-plus-circle"></i> Add Location
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                    </form>
                </div>


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

                {/* Location Table */}
                <div className="table-responsive pl-5 pr-5 pb-5">
                    <table className="table table-bordered table-hover">
                        <thead className="thead-custom text-center">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">City</th>
                                <th scope="col">Country</th>
                                <th scope="col">How Many Restaurants</th>
                                <th scope="col">Creation Date</th>
                                <th scope="col">Deletion / Update Date</th>
                                <th scope="col">Activeness</th>
                                <th scope="col">Activate</th>
                                <th scope="col">Deactivate</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {currentItems.map((location, index) => (
                                <tr key={location.id}>
                                    <th scope="row">{index + 1 + (currentPage - 1) * itemsPerPage}</th>
                                    <td className="font-weight-bold">{location.cityName}</td>
                                    <td className="font-weight-bold">{location.countryName}</td>
                                    <td>{location.restaurantCount}</td>
                                    <td>{formatDate(location.locationCreation)}</td>
                                    <td>{formatDate(location.locationDeletion)}</td>
                                    <td>
                                        <span 
                                            style={{
                                                color: location.locationActiveness === 1 ? "var(--main-color)" : "var(--second-color)",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {location.locationActiveness === 1 ? "Active" : "Deactive"}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-trash mr-1"
                                            onClick={() => confirmActivate(location)}
                                            disabled={location.locationActiveness === 1}
                                        >
                                            <i className="fas fa-plus-square"></i>
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-trash ml-1"
                                            onClick={() => confirmDelete(location)}
                                            disabled={location.locationActiveness === 0}
                                        >
                                            <i className="fas fa-minus-square"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="pagination-div">
                    <nav>
                        <ul className="pagination">
                            {[...Array(totalPages)].map((_, index) => (
                                <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                                    <button className="page-link" onClick={() => handleClick(index + 1)}>
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Modal for Deactivating Location */}
            {showModal && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="text-center">
                        <img src="/images/logo-last-modal.png" alt="Logo" className="modal-logo" />
                    </div>
                    <h4 className="modal-title">Are you sure you want to deactivate this location?</h4>
                    <div className="modal-buttons">
                        <button
                        className="btn btn-modal"
                        onClick={handleConfirmDelete}
                        >
                        Yes, Deactivate
                        </button>
                        <button
                        className="btn btn-modal-cancel"
                        onClick={handleCancelDelete}
                        >
                        Cancel Deactivation
                        </button>
                    </div>
                </div>
            </div>
            )}

        </>
    );
}

export default LocationList;
