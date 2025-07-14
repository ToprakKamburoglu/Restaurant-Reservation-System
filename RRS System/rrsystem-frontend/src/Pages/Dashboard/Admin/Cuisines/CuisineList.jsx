import React, { useState, useEffect, useRef } from "react";
import Navigation from "../../../../Shared/Dashboard/Admin/NavigationAdmin.jsx";

function CuisineList() {
    const [cuisines, setCuisines] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [cuisineToDelete, setCuisineToDelete] = useState(null);

    const itemsPerPage = 10;
    const [formData, setFormData] = useState({ cuisineName: "" });
    const [isSuccess, setIsSuccess] = useState(null);

    const fetchCuisines = () => {
        fetch("http://localhost:8081/api/admin/cuisines", {
            method: "GET",
            credentials: "include",
        })
        .then((response) => response.json())
        .then((data) => setCuisines(data))
        .catch((error) => console.error("Error fetching cuisines:", error));
    };
    

    useEffect(() => {
        fetchCuisines();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = cuisines.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(cuisines.length / itemsPerPage);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const formatDate = (dateString) => {
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
    
        if (id === "cuisineName") {
            if (/\d/.test(value)) return;
            if (value.length > 200) return;
        }
    
        setFormData({ ...formData, [id]: value });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8081/api/admin/cuisines/add-cuisine", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
    
            const result = await response.text();
    
            if (response.ok) {
                setSuccesMessage("Cuisine added successfully!");
                setErrorMessage(null);

                setIsSuccess(true);

                setFormData({ cuisineName: "" });
                fetchCuisines();
            } else {
                setErrorMessage("Failed to add cuisine.");
                setSuccesMessage(null);

                setIsSuccess(false);
            }
        } catch (error) {
            console.error("Error adding cuisine:", error);
            setErrorMessage("An error occurred.");
            setSuccesMessage(null);

            setIsSuccess(false);
        }
    };
    
    const handleActivate = (id) => {
        fetch(`http://localhost:8081/api/admin/cuisines/${id}/activate`, {
            method: "PUT",
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("API Response:", data);
            if (data.success) {
                fetchCuisines();
            } else {
                setErrorMessage("Failed to activate cuisine.");
                setSuccesMessage(null);

                console.error("Failed to activate cuisine:", data.message);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    };

    const confirmActivate = (cuisine) => {
        handleActivate(cuisine.id);
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:8081/api/admin/cuisines/${id}/deactivate`, {
            method: "PUT",
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("API Response:", data);
            if (data.success) {
                fetchCuisines();
                setShowModal(false);
            } else {
                setErrorMessage("Failed to deactivate cuisine.");
                setSuccesMessage(null);

                console.error("Failed to deactivate cuisine:", data.message);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    };    

    const confirmDelete = (cuisine) => {
        if (cuisine.restaurantCount > 0) {

            setErrorMessage("You have to change Restaurant's Cuisines before!");
            setIsSuccess(false);
            setShowModal(false);
        } else {
            setCuisineToDelete(cuisine);
            setShowModal(true);
        }
    };
    

    const handleConfirmDelete = () => {
        if (cuisineToDelete) {
            handleDelete(cuisineToDelete.id);
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
                <h1 className="page-name">Cuisine List</h1>

                {/* Add Cuisine Form */}
                <div className="add-cuisine-div mb-5">
                    <form className="add-cuisine-form" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="cuisineName">
                                        <i className="fas fa-utensils"></i> Cuisine Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cuisineName"
                                        value={formData.cuisineName}
                                        onChange={handleChange}
                                        placeholder="Enter new cuisine name"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col col-custom">
                                <div className="btn-div-add-cuisine">
                                    <button type="submit" className="btn-add-cuisine">
                                        <i className="fas fa-plus-circle"></i> Add Cuisine
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

                {/* Cuisine Table */}
                <div className="table-responsive pl-5 pr-5 pb-5">
                    <table className="table table-bordered table-hover">
                        <thead className="thead-custom text-center">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Cuisine Name</th>
                                <th scope="col">How Many Restaurants</th>
                                <th scope="col">Creation Date</th>
                                <th scope="col">Deletion / Update Date</th>
                                <th scope="col">Activeness</th>
                                <th scope="col">Activate</th>
                                <th scope="col">Deactivate</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {currentItems.map((cuisine, index) => (
                                <tr key={cuisine.id}>
                                    <th scope="row">{index + 1 + (currentPage - 1) * itemsPerPage}</th>
                                    <td className="font-weight-bold">{cuisine.cuisineName}</td>
                                    <td>{cuisine.restaurantCount}</td>
                                    <td>{cuisine.cuisineCreation ? formatDate(cuisine.cuisineCreation) : "-"}</td>
                                    <td>{cuisine.cuisineDeletion ? formatDate(cuisine.cuisineDeletion) : "-"}</td>
                                    <td>
                                        <span
                                            style={{
                                                color: cuisine.cuisineActiveness === 1 ? "var(--main-color)" : "var(--second-color)",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {cuisine.cuisineActiveness === 1 ? "Active" : "Deactive"}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-trash mr-1"
                                            onClick={() => confirmActivate(cuisine)}
                                            disabled={cuisine.cuisineActiveness === 1}
                                        >
                                            <i class="fas fa-plus-square"></i>
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-trash ml-1"
                                            onClick={() => confirmDelete(cuisine)}
                                            disabled={cuisine.cuisineActiveness === 0}
                                        >
                                            <i class="fas fa-minus-square"></i>
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

            {/* Modal for Deactivating Cuisine */}
            {showModal && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="text-center">
                        <img src="/images/logo-last-modal.png" alt="Logo" className="modal-logo" />
                    </div>
                    <h4 className="modal-title">Are you sure you want to deactivate this cuisine?</h4>
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

export default CuisineList;
