import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Navigation from "../../../../Shared/Dashboard/Manager/NavigationManager.jsx";

function RestaurantRequests() {
    const [restaurantRequests, setRestaurantRequests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetch("http://localhost:8081/api/manager/restaurant-requests", {
            method: "GET",
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setRestaurantRequests(data);
                } else if (data.requests) {
                    setRestaurantRequests(data.requests);
                } else {
                    console.error("Unexpected data format:", data);
                }
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = restaurantRequests.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(restaurantRequests.length / itemsPerPage);

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

    const navigate = useNavigate();

    const handleNavigate = (path, condition, request) => {
        if (condition) {
            navigate(path, { state: { id: request.id } });
        } else {
            console.log("Condition not met for navigation:", condition);
        }
    };    

    return (
        <>
            <Navigation />
            <div id="content">
                <h1 className="page-name">Restaurant Requests</h1>
                <div className="table-responsive pl-5 pr-5 pb-5">
                    <table className="table table-bordered table-hover restaurant-list-table">
                        <thead className="thead-custom text-center">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Restaurant Name</th>
                                <th scope="col">Name</th>
                                <th scope="col">Surname</th>
                                <th scope="col">Cuisine</th>
                                <th scope="col">Location</th>
                                <th scope="col">Restaurant Owner</th>
                                <th scope="col">Website</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">Hours of Operation</th>
                                <th scope="col">Dress Code</th>
                                <th scope="col">Parking Details</th>
                                <th scope="col">Request Send Date</th>
                                <th scope="col">Request Status</th>
                                <th scope="col">Request Response</th>
                                <th scope="col">Approve</th>
                                <th scope="col">Deny</th>
                                <th scope="col">Info</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {currentItems.map((request, index) => (
                                <tr key={request.id}>
                                    <th scope="row">{index + 1 + (currentPage - 1) * itemsPerPage}</th>
                                    <td className="font-weight-bold">{request.restaurantName || "-"}</td>
                                    <td>{request.name || "-"}</td>
                                    <td>{request.surname || "-"}</td>
                                    <td>{request.cuisine?.cuisineName || "-"}</td>
                                    <td>{(request.location?.cityName + ", " + request.location?.countryName) || "-"}</td>
                                    <td>{request.restaurantOwner || "-"}</td>
                                    <td>
                                        <a href={request.restaurantWebsite} className="restaurant-link" target="_blank" rel="noopener noreferrer">
                                            {request.restaurantName || "-"}
                                        </a>
                                    </td>
                                    <td>{request.restaurantEmail || "-"}</td>
                                    <td>{request.restaurantPhone || "-"}</td>
                                    <td>{request.hoursOfOperation || "-"}</td>
                                    <td>{request.dressCode || "-"}</td>
                                    <td>{request.parkingDetails || "-"}</td>
                                    <td>{request.requestSendDate ? formatDate(request.requestSendDate) : "-"}</td>
                                    <td style={{ color: request.requestStatus === 1 ? 'var(--main-color)' : request.requestStatus === 2 ? 'var(--second-color)' : 'var(--fourth-color)' }}>
                                        {request.requestStatus === 0 ? "Pending" : request.requestStatus === 1 ? "Approved" : "Rejected"}
                                    </td>
                                    <td>{(request.requestResponse && request.requestResponse.length > 20) 
                                        ? request.requestResponse.substring(0, 20) + "..." 
                                        : request.requestResponse || "-"}
                                    </td>
                                    <td>
                                        <button
                                        className="btn btn-trash mr-2"
                                        onClick={() => handleNavigate("/manager/approve-request", request.requestStatus === 0, request)}

                                        disabled={request.requestStatus !== 0}
                                        title={request.requestStatus !== 0 ? "Already processed" : ""}
                                        >
                                        <i className="fas fa-check"></i>
                                        </button>
                                    </td>

                                    <td>
                                        <button
                                        className="btn btn-trash mr-2"
                                        onClick={() => handleNavigate("/manager/deny-request", request.requestStatus === 0, request)}

                                        disabled={request.requestStatus !== 0}
                                        title={request.requestStatus !== 0 ? "Already processed" : ""}
                                        >
                                        <i className="fas fa-window-close"></i>
                                        </button>
                                    </td>

                                    <td>
                                        <button
                                        className="btn btn-trash mr-2"
                                        onClick={() => handleNavigate("/manager/info-request", request.requestStatus === 1 || request.requestStatus === 2, request)}

                                        disabled={request.requestStatus !== 1 && request.requestStatus !== 2}
                                        title={request.requestStatus !== 1 && request.requestStatus !== 2 ? "Not yet processed" : ""}
                                        >
                                        <i className="fas fa-info-circle"></i>
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
        </>
    );
}

export default RestaurantRequests;
