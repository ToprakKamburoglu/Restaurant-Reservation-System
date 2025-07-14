import { useState, useEffect, useRef } from "react";
import Navigation from "../../../../Shared/Dashboard/Restaurant-Owner/NavigationRestaurantOwner.jsx";

const getTodayInTurkeyTime = () => {
  const now = new Date();
  const turkeyTimeOffset = 3 * 60 * 60 * 1000;
  const turkeyTime = new Date(now.getTime() + turkeyTimeOffset);
  return turkeyTime.toISOString().slice(0, 10);
};

function CreateSessions() {
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const today = getTodayInTurkeyTime();
  const [selectedDate, setSelectedDate] = useState(today);
  
  const [minTime, setMinTime] = useState("");
  const [sessions, setSessions] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sessions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sessions.length / itemsPerPage);
  
  const formatTime = (time) => {
    if (!time) {
      return '';
    }
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  };

  
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', options).replace(/\//g, '.');
  };

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setCurrentPage(1);
  };
  
  const fetchSessions = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/restaurant-owner/sessions/all-sessions", {
        method: "GET",
        credentials: "include",
    });
      const data = await response.json();
      setSessions(data);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    if (selectedDate === today) {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setMinTime(`${hours}:${minutes}`);
    } else {
      setMinTime("");
    }
  }, [selectedDate]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const startDate = new Date(`${selectedDate} ${startTime}`);
    const endDate = new Date(`${selectedDate} ${endTime}`);

    
  if (!startTime || !endTime) {
    setErrorMessage("Session Start or End cannot be null.");
    setSuccesMessage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });

    return;
  }
  
  
    if (startDate.getTime() === endDate.getTime()) {
      setErrorMessage("Session Start and End cannot be the same.");
      setSuccesMessage(null);
      window.scrollTo({ top: 0, behavior: "smooth" });

      return;
    }

    
  const startDateTime = new Date(`${selectedDate}T${startTime}`);
  const endDateTime = new Date(`${selectedDate}T${endTime}`);

  if (endDateTime < startDateTime) {
    endDateTime.setDate(endDateTime.getDate() + 1);
  }

  const diffInMinutes = (endDateTime - startDateTime) / (1000 * 60);
  if (diffInMinutes < 50) {
    setErrorMessage("There must be at least 50 minutes between session start and end, even if the session spans over midnight.");
    setSuccesMessage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }


  
    const newSession = {
      session_date: selectedDate,
      session_start: startTime,
      session_end: endTime,
    };
  
    try {
      const response = await fetch("http://localhost:8081/api/restaurant-owner/sessions/add-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newSession),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage("Failed to add session.");
        setSuccesMessage(null);
        window.scrollTo({ top: 0, behavior: "smooth" });

        throw new Error(errorData.message || "Failed to add session");
      }
  
      const data = await response.json();
      setSessions([...sessions, data]);
      setSuccesMessage("Session added successfully.");
      setErrorMessage(null);
      window.scrollTo({ top: 0, behavior: "smooth" });

      console.log("New session added:", data);
    } catch (error) {
      console.error("Error adding session:", error);
      window.scrollTo({ top: 0, behavior: "smooth" });

    }
  };
  
  const handleDeactivate = async (id) => {
    const deletionDate = new Date().toISOString();
    try {
      const response = await fetch(`http://localhost:8081/api/restaurant-owner/sessions/deactivate/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ session_deletion: deletionDate }),
      });

      if (response.ok) {
        setSessions(
          sessions.map((session) =>
            session.id === id
              ? { ...session, session_activeness: 0, session_deletion: deletionDate }
              : session
          )
        );
        setSuccesMessage("Session deactivated successfully.");
        setErrorMessage(null);

        window.scrollTo({ top: 0, behavior: "smooth" });

        console.log("Session deactivated:", id);
      } else {
        console.error("Error deactivating session:", response.statusText);
        setErrorMessage("Error deactivating session.");
        setSuccesMessage(null);
        window.scrollTo({ top: 0, behavior: "smooth" });

      }
    } catch (error) {
      console.error("Error deactivating session:", error);
      setErrorMessage("Error deactivating session.");
      setSuccesMessage(null);
      window.scrollTo({ top: 0, behavior: "smooth" });

    } finally {
      setShowDeleteModal(false);
      setSelectedSessionId(null);
      fetchSessions();
    }
  };

  const handleDeleteModal = (id) => {
    setSelectedSessionId(id);
    setShowDeleteModal(true);
  };

  const alertRef = useRef(null);
  const [succesMessage, setSuccesMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
    

  return (
    <>
      <Navigation />
      <div id="content">
        <h1 className="page-name">Create Sessions</h1>
        <div className="create-session-div">
          <div className="container">
            <form onSubmit={handleFormSubmit}>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label className="form-label">
                    <i className="fas fa-calendar-day icon-spacing"></i> Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    value={selectedDate}
                    onChange={handleDateChange}
                    onKeyDown={(e) => e.preventDefault()}
                    min={today}
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">
                    <i className="fas fa-hourglass-start icon-spacing"></i> Start Time:
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    min={minTime}
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">
                    <i className="fas fa-hourglass-end icon-spacing"></i> End Time:
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    min={minTime}
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
                <div className="col-md-3 text-center">
                  <div className="btn-div-create-session">
                    <button className="btn-create-session" onClick={handleFormSubmit}>
                      <i className="fas fa-plus-circle icon-spacing"></i> Add Session
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
                <th>Session Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {currentItems.map((session) => (
                <tr key={session.id}>
                  <th>{formatDate(session.session_date)}</th>
                  <td>{formatTime(session.session_start)}</td>
                  <td>{formatTime(session.session_end)}</td>
                  <td className="p-3">
                    <button
                      className="btn btn-trash ml-1"
                      onClick={() => handleDeleteModal(session.id)}
                    >
                      <i className="fas fa-trash"></i>
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

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="text-center">
              <img src="/images/logo-last-modal.png" alt="Logo" className="modal-logo" />
            </div>
            <h4 className="modal-title">Are you sure you want to permanently delete this session?</h4>
            <div className="modal-buttons">
              <button className="btn btn-modal" onClick={() => handleDeactivate(selectedSessionId)}>
                Yes, Delete
              </button>
              <button className="btn btn-modal-cancel" onClick={() => setShowDeleteModal(false)}>
                Cancel Deletion
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}

export default CreateSessions;
