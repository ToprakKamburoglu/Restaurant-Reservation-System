import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navigation from "../../../../Shared/Dashboard/Restaurant-Owner/NavigationRestaurantOwner.jsx";

function TableInfo() {

    const [currentPage, setCurrentPage] = useState(1);
    const [newTableName, setNewTableName] = useState("");
    const [newTableCapacity, setNewTableCapacity] = useState(1);
    const [tables, setTables] = useState([]);
    const itemsPerPage = 10;

    const [showModal, setShowModal] = useState(false);
    const [currentTableId, setCurrentTableId] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false); 
    const [editedTableName, setEditedTableName] = useState("");
    const [editedTableCapacity, setEditedTableCapacity] = useState(1);

    const fetchTables = () => {
        fetch("http://localhost:8081/api/restaurant-owner/tables/all-tables", {
            method: "GET",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => setTables(data)) 
            .catch((error) => console.error("Error fetching tables:", error)); 
    };
    
    useEffect(() => {
        fetchTables();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tables.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(tables.length / itemsPerPage);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleShowEditModal = (id, name, capacity) => {
        setCurrentTableId(id);
        setEditedTableName(name);
        setEditedTableCapacity(capacity);
        setShowEditModal(true);
    };
    
    const handleCloseModal = () => {
        setShowEditModal(false);
        setShowModal(false); 
    };
    
    const handleShowModal = (id) => {
        setCurrentTableId(id); 
        setShowModal(true); 
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        if (newTableCapacity <= 0) {
            setErrorMessage("The capacity can't be negative or zero.");
            setSuccesMessage(null);
            return;
        }
    
        const newTable = {
            tableName: newTableName,
            tableCapacity: newTableCapacity,
        };
    
        try {
            const response = await fetch("http://localhost:8081/api/restaurant-owner/tables/add-table", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(newTable),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Network response was not ok");
            }
    
            const data = await response.json();
            setTables([...tables, data]);
            setNewTableName("");
            setNewTableCapacity(1);
            fetchTables();

            setSuccesMessage("New table added!");
            setErrorMessage(null);
            console.log("New table added:", data);

        } catch (error) {
            console.error("Error adding table:", error);
            setErrorMessage(`${error.message}`);
            setSuccesMessage(null);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleDeactivate = async (id) => {
        try {
            const response = await fetch(`http://localhost:8081/api/restaurant-owner/tables/deactivate/${id}`, {
                method: "PUT",
                credentials: "include",
            });
    
            if (response.ok) {
                const updatedTable = tables.map((table) =>
                    table.id === id ? { ...table, tableActiveness: 0 } : table
                );
                setTables(updatedTable);
                setShowModal(false);

                setSuccesMessage("Table deleted!");
                setErrorMessage(null);
                window.scrollTo({ top: 0, behavior: "smooth" });

                fetchTables();  
                console.log("Table deactivated:", id);
            } else {
                console.error("Error deactivating table:", response.statusText);
            }
        } catch (error) {
            console.error("Error deactivating table:", error);
        }
    };

    const handleUpdateTable = async () => {

        if (editedTableCapacity <= 0) {
            setErrorMessage("Table capacity must be greater than 0.");
            setSuccesMessage(null);
            return;
        }
    
        const updatedTable = {
            tableName: editedTableName,
            tableCapacity: editedTableCapacity,
        };
    
        try {
            const response = await fetch(`http://localhost:8081/api/restaurant-owner/tables/update-table/${currentTableId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(updatedTable),
            });
    
            if (response.ok) {
                const updatedTables = tables.map((table) =>
                    table.id === currentTableId
                        ? { ...table, tableName: editedTableName, tableCapacity: editedTableCapacity }
                        : table
                );
                setTables(updatedTables); 
                setShowEditModal(false);

                setSuccesMessage("Table updated successfully!");
                setErrorMessage(null);
                window.scrollTo({ top: 0, behavior: "smooth" });

                fetchTables();  
            } else {
                const errorData = await response.json();
                setShowEditModal(false);
    
                if (errorData.message) {
                    setErrorMessage(errorData.message);
                    setSuccesMessage(null);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                    setErrorMessage("There was an issue updating the table.");
                    setSuccesMessage(null);
                    window.scrollTo({ top: 0, behavior: "smooth" });

                }
            }
        } catch (error) {
            console.error("Error updating table:", error);
            setShowEditModal(false);
            setErrorMessage("There was an error while updating the table.");
            setSuccesMessage(null);
        }
    };

    const alertRef = useRef(null);
    const [succesMessage, setSuccesMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    

    return (
        <>
            <Navigation/>
            <div id="content">
                <h1 className="page-name">Table Information</h1>
                <div className="add-table-div">
                    <div className="container">
                        <form onSubmit={handleFormSubmit}>
                            <div className="row">
                                <div className="col text-center">
                                    <div className="form-group">
                                        <label htmlFor="tableName" className="label-ro-custom">
                                            <i className="fas fa-chair icon-spacing"></i> Table Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Table Name"
                                            value={newTableName}
                                            onChange={(e) => setNewTableName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col text-center">
                                    <div className="form-group">
                                        <label htmlFor="tableCapacity" className="label-ro-custom">
                                            <i className="fas fa-users icon-spacing"></i> Table Capacity
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Table Capacity"
                                            value={newTableCapacity}
                                            onChange={(e) => setNewTableCapacity(e.target.value)}
                                            required
                                            min="1"
                                            max="50"
                                        />
                                    </div>
                                </div>
                                <div className="col text-center">
                                    <div className="btn-div-add-table">
                                        <button type="submit" className="btn-add-table">
                                            <i className="fas fa-plus-circle icon-spacing"></i> Add Table
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div ref={alertRef}>
                            {succesMessage && (
                                <div className="alert alert-success mt-5" role="alert">
                                    {succesMessage}
                                </div>
                            )}
                            {errorMessage && (
                                <div className="alert alert-danger mt-5" role="alert">
                                    {errorMessage}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="table-responsive pl-5 pr-5 pb-5">
                    <table className="table table-bordered table-hover">
                        <thead className="thead-custom text-center">
                            <tr>
                                <th scope="col">Table Name</th>
                                <th scope="col">Capacity</th>
                                <th scope="col">Update</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {currentItems.map((table) => (
                                <tr key={table.id}>
                                    <td className="font-weight-bold">{table.tableName}</td>
                                    <td>{table.tableCapacity}</td>
                                    <td>
                                        <button
                                            className="btn btn-trash ml-3"
                                            onClick={() => handleShowEditModal(table.id, table.tableName, table.tableCapacity)}
                                            disabled={table.tableActiveness === 0}
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-trash ml-2"
                                            onClick={() => handleShowModal(table.id)}
                                            disabled={table.tableActiveness === 0}
                                        >
                                            <i className="fas fa-trash nav_icon"></i>
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
                                <li
                                    key={index}
                                    className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => handleClick(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Modal for Deactivating Table */}
            {showModal && (
            <div className="modal-overlay">
                <div className="modal-content">
                <div className="text-center">
                    <img src="/images/logo-last-modal.png" alt="Logo" className="modal-logo" />
                </div>
                <h4 className="modal-title">Are you sure you want to deactivate this table?</h4>
                <div className="modal-buttons">
                    <button
                    className="btn btn-modal"
                    onClick={() => handleDeactivate(currentTableId)}
                    >
                    Yes, Delete
                    </button>
                    <button
                    className="btn btn-modal-cancel"
                    onClick={handleCloseModal}
                    >
                    Cancel Deletion
                    </button>
                </div>
                </div>
            </div>
            )}

        
            {/* Modal for Editing Table */}
            {showEditModal && (
            <div className="modal-overlay">
                <div className="modal-content">
                <div className="text-center">
                    <img src="/images/logo-last-modal.png" alt="Logo" className="modal-logo" />
                </div>

                <div className="modal-form">
                    {/* Table Name Input */}
                    <div className="form-group">
                    <label htmlFor="editedTableName">Table Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="editedTableName"
                        value={editedTableName}
                        onChange={(e) => setEditedTableName(e.target.value)}
                        required
                    />
                    </div>

                    {/* Table Capacity Input */}
                    <div className="form-group">
                    <label htmlFor="editedTableCapacity">Table Capacity</label>
                    <input
                        type="number"
                        className="form-control"
                        id="editedTableCapacity"
                        value={editedTableCapacity}
                        onChange={(e) => setEditedTableCapacity(e.target.value)}
                        required
                        min="1"
                        max="50"
                    />
                    </div>

                    {/* Buttons */}
                    <div className="modal-buttons">
                    <button className="btn btn-modal" onClick={handleUpdateTable}>
                        Save Changes
                    </button>
                    <button className="btn btn-modal-cancel" onClick={handleCloseModal}>
                        Cancel Update
                    </button>
                    </div>
                </div>
                </div>
            </div>
            )}


        </>
    );
}

export default TableInfo;