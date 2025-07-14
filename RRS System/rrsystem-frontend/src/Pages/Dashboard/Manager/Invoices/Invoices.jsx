import React, { useState, useEffect } from "react";
import Navigation from "../../../../Shared/Dashboard/Manager/NavigationManager.jsx";

function Invoices() {
    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(invoices.length / itemsPerPage);

    useEffect(() => {
        fetch("http://localhost:8081/api/manager/invoices",{
            method: "GET",
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => setInvoices(data))
        .catch((error) => console.error("Error:", error));
    }, []);   

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = invoices.slice(indexOfFirstItem, indexOfLastItem);

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
                <h1 className="page-name">Invoices</h1>
                <div className="table-responsive pl-5 pr-5 pb-5">
                    <table className="table table-bordered table-hover 1-list-table">
                        <thead className="thead-custom text-center">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Customer Name</th>
                                <th scope="col">Service Name</th>
                                <th scope="col">Amount Paid</th>
                                <th scope="col">Billing Address</th>
                                <th scope="col">City</th>
                                <th scope="col">Postal Code</th>
                                <th scope="col">Email</th>
                                <th scope="col">Payment Date</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                        {currentItems.map((invoice, index) => (
                            <tr
                                key={invoice.id}
                                style={{ color: invoice.userInfo?.activeness === 0 ? 'var(--second-color)' : 'inherit' }}
                            >
                            <th scope="row">{index + 1 + (currentPage - 1) * itemsPerPage}</th>
                            <td className="font-weight-bold">{invoice.name + " " + invoice.surname}</td>
                            <td>{invoice.serviceName} </td>
                            <td>${invoice.amountPaid}</td>
                            <td>{invoice.billingAddress}</td>
                            <td>{invoice.city} </td>
                            <td>{invoice.postalCode} </td>
                            <td>{invoice.emailAddress} </td>
                            <td>{invoice.paymentDate ? formatDate(invoice.paymentDate) : "-"}</td>
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

export default Invoices;
