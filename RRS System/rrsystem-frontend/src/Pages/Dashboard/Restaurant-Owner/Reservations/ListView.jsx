import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "../../../../Shared/Dashboard/Restaurant-Owner/NavigationRestaurantOwner.jsx";

function ListView() {
  const [reservations, setReservations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/restaurant-owner/reservations/all-reservations", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch reservations");
        }

        const data = await response.json();
        setReservations(data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);

  const totalPages = Math.ceil(reservations.length / itemsPerPage);
  const currentItems = reservations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR");
  };

  const handleCancel = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/api/restaurant-owner/reservations/cancel/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setReservations(reservations.filter((reservation) => reservation.id !== id));
        setShowDeleteModal(false);
      } else {
        alert("Failed to cancel reservation");
      }
    } catch (error) {
      console.error("Error canceling reservation:", error);
      alert("An error occurred while canceling the reservation.");
    }
  };

  return (
    <>
      <Navigation />
      <div id="content">
        <h1 className="page-name text-center">Reservations - List View</h1>
        <div className="text-center mb-4">
          <button className="btn btn-trash">
            <a href="/restaurant-owner/reservations/reservation-analysis" className="a-reservation-analysis">
              Reservation Analysis
            </a>
          </button>
        </div>
        <div className="table-responsive pl-5 pr-5 pb-5">
          <table className="table table-bordered table-hover">
            <thead className="thead-custom text-center">
              <tr>
                <th>Reservation Owner</th>
                <th>Number of Customers</th>
                <th>Reservation Date</th>
                <th>Reservation Time</th>
                <th>Customer Phone</th>
                <th>Customer Email</th>
                <th>Customer Note</th>
                <th>Send Date</th>
                <th>Cancel Reservation</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {currentItems.map((reservation, index) => (
                <tr key={reservation.id}>
                  <td className="font-weight-bold">{reservation.name || "-"} {reservation.surname || "-"}</td>
                  <td>{reservation.peopleNo || "-"}</td>
                  <td>{formatDate(reservation.session?.session_date) || "-"}</td>
                  <td>{reservation.session?.session_start.substring(0, 5) || "-"}</td>
                  <td>{reservation.phone || "-"}</td>
                  <td>{reservation.email || "-"}</td>
                  <td>{reservation.note || "-"}</td>
                  <td>
                    {reservation.sendDate ? (() => {
                        const date = new Date(reservation.sendDate);
                        const day = String(date.getDate()).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const year = date.getFullYear();
                        const hours = String(date.getHours()).padStart(2, '0');
                        const minutes = String(date.getMinutes()).padStart(2, '0');
                        return `${day}.${month}.${year} - ${hours}:${minutes}`;
                      })() : "-"}
                  </td>
                  <td>
                    <button 
                      className="btn btn-trash mr-2" 
                      onClick={() => {
                        setSelectedReservationId(reservation.id); 
                        setShowDeleteModal(true);
                      }}
                      disabled={reservation.isCheckedBySystem === 1}
                    >
                      <i class="far fa-window-close"></i>
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
                  <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="text-center">
                <img src="/images/logo-last-modal.png" alt="Logo" className="modal-logo" />
              </div>
              <h4 className="modal-title">Are you sure you want to permanently delete this reservation?</h4>
              <div className="modal-buttons">
                <button className="btn btn-modal" onClick={() => handleCancel(selectedReservationId)}>
                  Yes, Delete
                </button>
                <button className="btn btn-modal-cancel" onClick={() => setShowDeleteModal(false)}>
                  Cancel Deletion
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ListView;
