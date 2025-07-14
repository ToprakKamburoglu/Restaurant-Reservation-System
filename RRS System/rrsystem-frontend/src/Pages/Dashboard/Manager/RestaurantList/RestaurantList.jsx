import React, { useState, useEffect } from "react";
import Navigation from "../../../../Shared/Dashboard/Manager/NavigationManager.jsx";

function RestaurantList() {
    const [restaurants, setRestaurants] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(restaurants.length / itemsPerPage);

    useEffect(() => {
        fetch("http://localhost:8081/api/manager/restaurants",{
            method: "GET",
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => setRestaurants(data))
        .catch((error) => console.error("Error:", error));
    }, []);   

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = restaurants.slice(indexOfFirstItem, indexOfLastItem);

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

    return (
        <>
            <Navigation/>
            <div id="content">
                <h1 className="page-name">Restaurant List</h1>
                <div className="table-responsive pl-5 pr-5 pb-5">
                    <table className="table table-bordered table-hover restaurant-list-table">
                        <thead className="thead-custom text-center">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Restaurant Name</th>
                                <th scope="col">Cuisine</th>
                                <th scope="col">Location</th>
                                <th scope="col">Website</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">Restaurant Owner</th>
                                <th scope="col">Restaurant Customer</th>
                                <th scope="col">Hours of Operation</th>
                                <th scope="col">Dress Code</th>
                                <th scope="col">Parking Details</th>
                                <th scope="col">Creation Date</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                        {currentItems.map((restaurant, index) => (
                            <tr
                                key={restaurant.id}
                                style={{ color: restaurant.userInfo?.activeness === 0 ? 'var(--second-color)' : 'inherit' }}
                            >
                            <th scope="row">{index + 1 + (currentPage - 1) * itemsPerPage}</th>
                            <td className="font-weight-bold">{restaurant.restaurantName || "-"}</td>
                            <td>{restaurant.cuisine?.cuisineName || "-"}</td>
                            <td>{(restaurant.location?.cityName + ", " + restaurant.location?.countryName) || "-"}</td>
                            <td>
                                <a 
                                    href={restaurant.restaurantWebsite} 
                                    className="restaurant-link" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                {restaurant.restaurantName || "-"}
                                </a>
                            </td>
                            <td>{restaurant.restaurantEmail || "-"}</td>
                            <td>{restaurant.restaurantPhone || "-"}</td>
                            <td>{restaurant.restaurantOwner || "-"}</td>
                            <td>
                                {(restaurant.userInfo?.name + " " + restaurant.userInfo?.surname) || "-"}
                                {restaurant.userInfo?.activeness === 0 ? " (Deactive Customer)" : ""}
                            </td>
                            <td>{restaurant.hoursOfOperation || "-"}</td>
                            <td>{restaurant.dressCode || "-"}</td>
                            <td>{restaurant.parkingDetails || "-"}</td>
                            <td>{restaurant.restaurantCreation ? formatDate(restaurant.restaurantCreation) : "-"}</td>
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

export default RestaurantList;
