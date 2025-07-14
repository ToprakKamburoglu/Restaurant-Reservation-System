import React, { useState, useEffect, useRef } from "react";
import Navigation from "../../../../Shared/Dashboard/Restaurant-Owner/NavigationRestaurantOwner.jsx";
import { useAuth } from "../../../../Routes/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function UpdatePersonel() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const alertRef = useRef(null);
    const [succesMessage, setSuccesMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [oldUsername, setOldUsername] = useState("");

    const [selectedPersonel, setSelectedPersonel] = useState({
        username: "",
        name: "",
        surname: "",
        email: "",
        phone: "",
        photo: "",
    });

    useEffect(() => {
        fetch("http://localhost:8081/api/restaurant-owner/user-info/get-info", {
            method: "GET",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => {

                setOldUsername(data.username || "");

                if (data) {
                    setSelectedPersonel({
                        username: data.username || "",
                        name: data.name || "",
                        surname: data.surname || "",
                        email: data.email || "",
                        phone: data.phone || "",
                        photo: data.photo || "",
                    });
                }
            })
            .catch((error) => console.error("Error fetching user info:", error));
    }, []);

    const handleChange = (event) => {
        setSelectedPersonel({
            ...selectedPersonel,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        fetch("http://localhost:8081/api/restaurant-owner/user-info/update-user-info", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(selectedPersonel),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.text().then((text) => {
                        try {
                            const data = JSON.parse(text);
                            throw new Error(data.error || "Error updating user info.");
                        } catch (e) {
                            throw new Error(text); 
                        }
                    });
                }
                return response.json();
            })
            .then((data) => {
                setSuccesMessage(data.message);
                setIsSuccess(true);
    
                if (selectedPersonel.username !== oldUsername) {
                    setShowModal(true);
                    setTimeout(() => {
                        logout();
                        navigate("/login");
                    }, 5000);
                }
            })
            .catch((error) => {
                setErrorMessage(error.message);
                setIsSuccess(false);
                console.error("Error updating user info:", error.message);
            });
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
    
        fetch("http://localhost:8081/api/restaurant-owner/user-info/upload-photo", {
            method: "POST",
            credentials: "include",
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                setSelectedPersonel({
                    ...selectedPersonel,
                    photo: data.path,
                });
            })
            .catch((err) => console.error("Upload failed", err));
    };
    
    
    return (
        <>
            <Navigation />
            <div id="content">
                <h1 className="page-name">Update Personel Information</h1>
                <div className="update-personel-div mb-4">
                    <img src={selectedPersonel.photo} alt="Profile Photo" className="update-personel-img mb-5"/>
                    <div className="form-group text-center mb-5">
                            <label className="custom-file-upload">
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="photo"
                                    name="photo"
                                    onChange={handlePhotoUpload}
                                />
                                <i class="fas fa-image"></i> Upload Photo
                            </label>
                            {selectedPersonel.photo && (
                                <p className="selected-file-name">
                                    Selected: {selectedPersonel.photo.split("/").pop()}
                                </p>
                            )}
                        </div>
                    <div ref={alertRef}>
                        {succesMessage && (
                            <div className="alert alert-success mb-5" role="alert">
                                {succesMessage}
                            </div>
                        )}
                        {errorMessage && (
                            <div className="alert alert-danger mb-5" role="alert">
                            {errorMessage}
                            </div>
                        )}
                    </div>
                    <form className="update-personel-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={selectedPersonel.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={selectedPersonel.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="surname">Surname</label>
                            <input
                                type="text"
                                className="form-control"
                                id="surname"
                                name="surname"
                                value={selectedPersonel.surname}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                name="email"
                                value={selectedPersonel.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={selectedPersonel.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>


                        <div className="btn-div-update-personel">
                            <button type="submit" className="btn-update-personel">
                                Update Personel Info
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {showModal && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="text-center">
                        <img src="/images/logo-last-modal.png" alt="Logo" className="modal-logo" />
                    </div>
                    <h3 className="modal-title">Your Username: {selectedPersonel.username}</h3>
                    <h4 className="modal-redirect-h4">You will be redirected to the Login page in 5 seconds...</h4>
                </div>
            </div>
            )}
        </>
    );
}

export default UpdatePersonel;
