import React, { useState, useEffect, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaClock, FaUser } from "react-icons/fa";
import Select, { components } from "react-select";
import IzzakaHeader from "./IzakaHeader.jsx";
import IzzakaFooter from "./IzakaFooter.jsx";
import { useLocation } from "react-router-dom";

const DropdownIndicator = (props) => {
  const { menuIsOpen } = props.selectProps;
  return (
    <components.DropdownIndicator {...props}>
      <div
        style={{
          transform: menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.25s ease",
        }}
      >
        ▲
      </div>
    </components.DropdownIndicator>
  );
};

const guestOptions = Array.from({ length: 15 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1} ${i + 1 === 1 ? "Guest" : "Guests"}`,
}));

const CustomDateInput = forwardRef(({ value, onClick, placeholder }, ref) => {
  return (
    <div className="booking-input-wrapper booking-date-wrapper" onClick={onClick}>
      <FaCalendarAlt className="booking-icon" />
      <input
        type="text"
        ref={ref}
        value={value}
        className="booking-input booking-date-input"
        placeholder={placeholder}
        readOnly
      />
    </div>
  );
});

const ReserveIzaka = ({ hideHeaderFooter = false }) => {
  const location = useLocation();

  const apiKey = "g2vYCegc87e4NjrMA4Ix4xq2Z5e22S4jCF6uhj12JzjeVBhkiSjaxln9de2sMcPH";

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [people, setPeople] = useState(1);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [showReservationDetails, setShowReservationDetails] = useState(false);

  const [message, setMessage] = useState({ text: "", type: "" });
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    specialRequest: "",
  });

  const [reservationDetails, setReservationDetails] = useState(null);

  const getSessionsUrl = () => {

    const formattedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
    if (apiKey) {
      return `http://localhost:8081/api/embedded/sessions?apiKey=${apiKey}&date=${formattedDate}`;
    } 
  };

  const getCreateReservationUrl = () => {
    if (apiKey) {
      return `http://localhost:8081/api/embedded/create?apiKey=${apiKey}`;
    }
  };

  useEffect(() => {
    const fetchSessions = async () => {
      if (!date) return;
      try {
        const response = await fetch(getSessionsUrl(), {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();

          const now = new Date();
          const isToday =
            date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear();

          function formatTimeToHHMM(timeStr) {
            if (!timeStr) return "";
            const [h, m] = timeStr.split(":");
            return `${h}:${m}`;
          }

          const times = data
            .map((session) => ({
              value: session.session_start,
              label: formatTimeToHHMM(session.session_start),
              sessionId: session.id,
            }))
            .filter((session) => {
              if (!isToday) return true;
              const [h, m] = session.value.split(":");
              const sessionDate = new Date(date);
              sessionDate.setHours(Number(h), Number(m), 0, 0);
              return sessionDate > now;
            });

          setAvailableTimes(times);

          if (times.length > 0) {
            setTime(times[0].value);
          } else {
            setTime("");
          }
        } else {
          setAvailableTimes([]);
          setTime("");
        }
      } catch (error) {
        setAvailableTimes([]);
        setTime("");
      }
    };

    fetchSessions();
  }, [date, apiKey]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (availableTimes.length === 0) {
      setMessage({
        text: "No available sessions were found on the date you selected.",
        type: "alert-danger",
      });
      return;
    }

    setShowSecondForm(true);
  };

  const handleSecondFormSubmit = async (e) => {
    e.preventDefault();

    const selectedSession = availableTimes.find((session) => session.value === time);
    const sessionId = selectedSession ? selectedSession.sessionId : null;

    if (!sessionId) {
      setMessage({ text: "No session found for the selected time.", type: "alert-danger" });
      return;
    }

    const reservationData = {
      ...(apiKey ? {} : { restaurant: { id: restaurantId } }),
      session: { id: sessionId },
      peopleNo: people,
      phone: customerInfo.phone,
      note: customerInfo.specialRequest,
      email: customerInfo.email,
      name: customerInfo.name,
      surname: customerInfo.surname,
      sendDate: new Date().toISOString(),
    };

    try {
      const response = await fetch(getCreateReservationUrl(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(reservationData),
      });

      const result = await response.text();

      if (response.ok) {
        setMessage({ text: result || "Reservation successful!", type: "alert-success" });
        setShowSecondForm(false);
        setCustomerInfo({
          name: "",
          surname: "",
          email: "",
          phone: "",
          specialRequest: "",
        });
        setReservationDetails(reservationData);
        setShowReservationDetails(true);
      } else {
        setMessage({ text: "Reservation failed: " + result, type: "alert-danger" });
      }
    } catch (error) {
      setMessage({ text: "An error occurred during reservation.", type: "alert-danger" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <>
      {!hideHeaderFooter && <IzzakaHeader />}
      {message.text && (
        <div className={`alert ${message.type} mt-4 m-3 p-3`}>{message.text}</div>
      )}
      <div className="booking-content izaka">
        <div className="booking-container">
          {!showSecondForm && !showReservationDetails && (
            <form className="booking-form" onSubmit={handleSubmit}>
              <h2 className="booking-title">Make a booking</h2>
              <DatePicker
                selected={date}
                minDate={new Date()}
                onChange={(d) => {
                  setDate(d);
                  setTime("");
                }}
                dateFormat="dd.MM.yyyy"
                customInput={<CustomDateInput placeholder="gg.aa.yyyy" />}
              />
              <div className="booking-input-wrapper">
                <FaClock className="booking-icon" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Select
                    options={availableTimes}
                    value={availableTimes.find((o) => o.value === time)}
                    onChange={(selected) => setTime(selected.value)}
                    placeholder="Select a time"
                    isSearchable={false}
                    classNamePrefix="custom-select"
                    components={{ DropdownIndicator }}
                  />
                </div>
              </div>
              <div className="booking-input-wrapper">
                <FaUser className="booking-icon" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Select
                    options={guestOptions}
                    value={guestOptions.find((o) => o.value === Number(people))}
                    onChange={(selected) => setPeople(selected.value)}
                    placeholder="Select guests"
                    isSearchable={false}
                    classNamePrefix="custom-select"
                    components={{ DropdownIndicator }}
                  />
                </div>
              </div>
              <button
                className="booking-button"
                type="submit"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Find a Table
              </button>
              <img src="/images/logo-last-modal.png" className="rezal-booking-logo" height="60px" width="60px" alt="Rezal Logo" />
            </form>
          )}

          {showSecondForm && !showReservationDetails && (
            <div className="booking-container">
              <form className="booking-form" onSubmit={handleSecondFormSubmit}>
                <h2 className="booking-form-title">Your Information</h2>
                <div className="booking-form-field">
                  <span className="booking-icon"><i className="fas fa-user"></i></span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    className="booking-input"
                    required
                  />
                </div>
                <div className="booking-form-field">
                  <span className="booking-icon"><i className="fas fa-user-tag"></i></span>
                  <input
                    type="text"
                    name="surname"
                    placeholder="Surname"
                    value={customerInfo.surname}
                    onChange={handleInputChange}
                    className="booking-input"
                    required
                  />
                </div>
                <div className="booking-form-field">
                  <span className="booking-icon"><i className="fas fa-envelope"></i></span>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    className="booking-input"
                    required
                  />
                </div>
                <div className="booking-form-field">
                  <span className="booking-icon"><i className="fas fa-phone"></i></span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    className="booking-input"
                    required
                  />
                </div>
                <div className="booking-form-field">
                  <span className="booking-icon"><i className="fas fa-comment-alt"></i></span>
                  <textarea
                    name="specialRequest"
                    placeholder="Special Request"
                    value={customerInfo.specialRequest}
                    onChange={handleInputChange}
                    className="booking-textarea"
                  />
                </div>
                <div className="booking-button-group">
                  <button
                    type="submit"
                    className="booking-submit-btn"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  >
                    Make Reservation
                  </button>
                  <button
                    type="button"
                    className="booking-return-btn"
                    onClick={() => window.location.href = '/reserve-izaka'}
                  >
                    Return to Sessions
                  </button>
                </div>
              </form>
              <div className="booking-details-card">
                <h3 className="details-title">Reservation Summary</h3>
                <div className="details-item">
                  <i className="fas fa-calendar-day details-icon"></i>
                  <div>
                    <p className="details-label">Date</p>
                    <p className="details-value">{date ? date.toLocaleDateString() : "Not selected"}</p>
                  </div>
                </div>
                <div className="details-item">
                  <i className="far fa-clock details-icon"></i>
                  <div>
                    <p className="details-label">Time</p>
                    <p className="details-value">{time?.substring(0, 5) || "Not selected"}</p>
                  </div>
                </div>
                <div className="details-item">
                  <i className="fas fa-users details-icon"></i>
                  <div>
                    <p className="details-label">Guests</p>
                    <p className="details-value">{people || "Not selected"}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showReservationDetails && (
            <div className="reservation-details-container">
              <h2 className="booking-title">Reservation Details</h2>
              <div className="form-group mb-3">
                <strong className="selected-strong">Name:</strong> {reservationDetails.name} {reservationDetails.surname}
              </div>
              <div className="form-group mb-3">
                <strong className="selected-strong">Email:</strong> {reservationDetails.email}
              </div>
              <div className="form-group mb-3">
                <strong className="selected-strong">Phone:</strong> {reservationDetails.phone}
              </div>
              <div className="form-group mb-3">
                <strong className="selected-strong">Guests:</strong> {reservationDetails.peopleNo}
              </div>
              <div className="form-group mb-3">
                <strong className="selected-strong">Special Request:</strong> {reservationDetails.note}
              </div>
              <div className="form-group mb-3">
                <strong className="selected-strong">Reservation Time:</strong> {time.substring(0,5) || "Not selected"} - {date ? date.toLocaleDateString() : "Not selected"}
              </div>
            </div>
          )}
        </div>
      </div>
      {!hideHeaderFooter && <IzzakaFooter />}
    </>
  );
};

export default ReserveIzaka;