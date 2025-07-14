import React, { useState, useEffect } from "react";
import Navigation from "../../../../Shared/Dashboard/Admin/NavigationAdmin.jsx";

function ManagerList() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const itemsPerPage = 10;

    const fetchUsers = () => {
        fetch("http://localhost:8081/api/admin/managers",{
            method: "GET",
            credentials: "include",
        })
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(error => console.error("Error fetching data:", error));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}.${month}.${year} - ${hours}:${minutes}`;
    };

    const handleActivate = (id) => {
        fetch(`http://localhost:8081/api/admin/managers/${id}/activate`, {
            method: "PUT",
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("API Response:", data);
            if (data.success) {
                fetchUsers();
            } else {
                console.error("Failed to activate managers:", data.message);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    };

    const confirmActivate = (user) => {
        handleActivate(user.id);
    };    

    const handleDelete = (id) => {
        fetch(`http://localhost:8081/api/admin/managers/${id}/deactivate`, {
            method: "PUT",
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                fetchUsers();
                setShowModal(false);
            } else {
                console.error("Failed to deactivate manager:", data.message);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    };

    const confirmDelete = (user) => {
        setUserToDelete(user);
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        if (userToDelete) {
            handleDelete(userToDelete.id);
        }
    };

    const handleCancelDelete = () => {
        setShowModal(false);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(users.length / itemsPerPage);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <Navigation />
            <div id="content">
                <h1 className="page-name">Manager List</h1>
                <div className="table-responsive pl-5 pr-5 pb-5">
                    <table className="table table-bordered table-hover">
                        <thead className="thead-custom text-center">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Username</th>
                                <th scope="col">Name</th>
                                <th scope="col">Surname</th>
                                <th scope="col">Photo</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">Creation Date</th>
                                <th scope="col">Deletion / Update Date</th>
                                <th scope="col">Activeness</th>
                                <th scope="col">Activate</th>
                                <th scope="col">Deactivate</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {currentItems.map((user, index) => (
                                <tr key={user.id}>
                                    <th scope="row">{index + 1 + (currentPage - 1) * itemsPerPage}</th>
                                    <td className="font-weight-bold">{user.username || "-"}</td>
                                    <td>{user.name || "-"}</td>
                                    <td>{user.surname || "-"}</td>
                                    <td>
                                        <div className="img-container">
                                            <img src={user.photo || "default-photo-url"} alt={user.username || "-"} height="50px" width="50px" />
                                        </div>
                                    </td>
                                    <td>{user.email || "-"}</td>
                                    <td>{user.phone || "-"}</td>
                                    <td>{user.createdAt ? formatDate(user.createdAt) : "-"}</td>
                                    <td>{user.deletedAt ? formatDate(user.deletedAt) : "-"}</td>
                                    <td>
                                        <span 
                                            style={{
                                                color: user.activeness === 1 ? "var(--main-color)" : "var(--second-color)",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {user.activeness === 1 ? "Active" : "Deactive"}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-trash mr-1"
                                            onClick={() => confirmActivate(user)}
                                            disabled={user.activeness === 1}
                                        >
                                            <i className="fas fa-user-plus"></i>
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-trash ml-1"
                                            onClick={() => confirmDelete(user)}
                                            disabled={user.activeness === 0}
                                        >
                                            <i className="fas fa-user-minus"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
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

            {/* Modal for Deactivating Customer */}
            {showModal && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="text-center">
                        <img src="/images/logo-last-modal.png" alt="Logo" className="modal-logo" />
                    </div>
                    <h4 className="modal-title">Are you sure you want to deactivate this customer?</h4>
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

export default ManagerList;
