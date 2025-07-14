import React, { useState, useEffect } from "react";
import Navigation from "../../../../Shared/Dashboard/Admin/NavigationAdmin.jsx";

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [customerToDelete, setCustomerToDelete] = useState(null);
    const [customerToActivate, setCustomerToActivate] = useState(null);
    const itemsPerPage = 10;

    const fetchCustomers = () => {
        fetch(`http://localhost:8081/api/admin/customers`, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("Fetched data:", data);
            setCustomers(data);
        })
        .catch((error) => console.error("Error:", error));
    };

    useEffect(() => {
        fetchCustomers();
    }, []);
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = customers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(customers.length / itemsPerPage);

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

    const handleActivate = (id) => {
        fetch(`http://localhost:8081/api/admin/customers/${id}/activate`, {
            method: "PUT",
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("API Response:", data);
            if (data.success) {
                fetchCustomers();
                setShowModal(false);
            } else {
                console.error("Failed to activate customer:", data.message);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:8081/api/admin/customers/${id}/deactivate`, {
            method: "PUT",
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("API Response:", data);
            if (data.success) {
                fetchCustomers();
                setShowModal(false);
            } else {
                console.error("Failed to deactivate customer:", data.message);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    };

    const confirmDelete = (customer) => {
        setCustomerToDelete(customer);
        setShowModal(true);
        fetchCustomers();
    };

    const confirmActivate = (customer) => {
        setCustomerToActivate(customer);

        if(customerToActivate) {
            handleActivate(customerToActivate.userInfo?.id);
        }

        fetchCustomers();
    };

    const handleConfirmDelete = () => {
        if (customerToDelete) {
            handleDelete(customerToDelete.userInfo?.id);
        }
    };

    const handleCancelDelete = () => {
        setShowModal(false);
    };

    return (
        <>
            <Navigation />
            <div id="content">
                <h1 className="page-name">Customer List </h1>
                <div className="table-responsive pl-5 pr-5 pb-5">
                    <table className="table table-bordered table-hover customer-list-table">
                        <thead className="thead-custom text-center">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Username</th>
                                <th scope="col">Name</th>
                                <th scope="col">Surname</th>
                                <th scope="col">Photo</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">Restaurant Name</th>
                                <th scope="col">Plan</th>
                                <th scope="col">Active Quota</th>
                                <th scope="col">Creation Date</th>
                                <th scope="col">Deletion / Update Date</th>
                                <th scope="col">Activeness</th>
                                <th scope="col">Activate</th>
                                <th scope="col">Deactivate</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {currentItems.map((customer, index) => (
                                <tr key={customer.id}>
                                    <th className="id-th-custom" scope="row">{index + 1 + (currentPage - 1) * itemsPerPage}</th>
                                    <td className="p-2 font-weight-bold">{customer.userInfo?.username || "-"}</td>
                                    <td>{customer.userInfo?.name || "-"}</td>
                                    <td>{customer.userInfo?.surname || "-"}</td>
                                    <td>
                                        <div className="img-container">
                                            {customer.userInfo?.photo ? (
                                                <img
                                                    src={customer.userInfo.photo}
                                                    alt={customer.userInfo.username}
                                                    height="50px"
                                                    width="50px"
                                                />
                                            ) : (
                                                <span>No Photo</span>
                                            )}
                                        </div>
                                    </td>
                                    <td>{customer.userInfo?.email || "-"}</td>
                                    <td>{customer.userInfo?.phone || "-"}</td>
                                    <td>{customer.restaurantInfo?.restaurantName || "-"}</td>
                                    <td>{customer.payment?.plan?.planName || "-"}</td>
                                    <td>{(customer.payment?.activeQuota) >= 1000000 ? "Unlimited" : customer.payment?.activeQuota}</td>  
                                    <td>{customer.userInfo?.createdAt ? formatDate(customer.userInfo?.createdAt) : "-"}</td>
                                    <td>{customer.userInfo?.deletedAt ? formatDate(customer.userInfo?.deletedAt) : "-"}</td>
                                    <td>
                                        <span
                                        style={{
                                            color: customer.userInfo?.activeness === 1 ? "var(--main-color)" : "var(--second-color)",
                                            fontWeight: "bold",
                                        }}>
                                            {customer.userInfo?.activeness === 1 ? "Active" : "Deactive"}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-trash mr-1"
                                            onClick={() => confirmActivate(customer)}
                                            disabled={customer.userInfo?.activeness === 1}
                                        >
                                            <i class="fas fa-user-plus"></i>
                                        </button>
                                        
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-trash ml-1"
                                            onClick={() => confirmDelete(customer)}
                                            disabled={customer.userInfo?.activeness === 0}
                                        >
                                            <i class="fas fa-user-minus"></i>
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

export default CustomerList;
