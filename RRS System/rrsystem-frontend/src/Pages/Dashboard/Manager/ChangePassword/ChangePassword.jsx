import React, { useState, useEffect, useRef } from "react";
import Navigation from "../../../../Shared/Dashboard/Manager/NavigationManager.jsx";
import { useAuth } from "../../../../Routes/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const [showModal, setShowModal] = useState(false);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordAgain, setNewPasswordAgain] = useState("");

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showNewPasswordAgain, setShowNewPasswordAgain] = useState(false);

    const alertRef = useRef(null);
    const [succesMessage, setSuccesMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    

    const handleSubmit = (event) => {
        event.preventDefault();
    
        fetch("http://localhost:8081/api/manager/change-password/change", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                oldpassword: oldPassword,
                newpassword: newPassword,
                newpasswordagain: newPasswordAgain,
            }),
        })
            .then(async (response) => {
                const text = await response.text();
                try {
                    const json = JSON.parse(text);
                    setSuccesMessage(json.message);
                    setErrorMessage(null);
                    if (response.ok) {
                        setShowModal(true);
                        setTimeout(() => {
                            logout();
                            navigate("/login");
                        }, 5000);
                    }
                } catch (error) {
                    setErrorMessage(text);
                    setSuccesMessage(null);
                }
            })
            .catch((error) => {
                setErrorMessage("Error updating user info.");
                setSuccesMessage(null);
                console.error("Error updating user info:", error);
            });
    };
    
    return (
        <>
            <Navigation />
            <div id="content">
                <h1 className="page-name">Change Password</h1>
                <div className="change-password-div mb-4 p-5">
                    <div className="password-warnings">
                        <p className="text-danger mb-1 fw-semibold">
                            Passwords are encrypted using the Bcrypt hashing method.
                        </p>
                        <p className="text-danger fw-semibold">
                            Never share your password, even with system administrators.
                        </p>
                    </div>
                    <form className="change-password-form" onSubmit={handleSubmit}>
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
                        <div className="form-group">
                            <label className="form-label d-flex justify-content-between align-items-center">
                                Old Password
                            </label>
                            <div className="position-relative">
                                {/* Old Password */}
                                <input 
                                    type={showOldPassword ? "text" : "password"} 
                                    className="form-control pe-5" 
                                    name="oldpassword" 
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    required 
                                />
                                <span 
                                    className="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer"
                                    onClick={() => setShowOldPassword(!showOldPassword)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {showOldPassword ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
                                </span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label d-flex justify-content-between align-items-center">
                                New Password
                            </label>
                            <div className="position-relative">
                                {/* New Password */}
                                <input 
                                    type={showNewPassword ? "text" : "password"} 
                                    className="form-control pe-5" 
                                    name="newpassword" 
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required 
                                />
                                <span 
                                    className="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {showNewPassword ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
                                </span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label d-flex justify-content-between align-items-center">
                                New Password Again
                            </label>
                            <div className="position-relative">
                                {/* New Password Again */}
                                <input 
                                    type={showNewPasswordAgain ? "text" : "password"} 
                                    className="form-control pe-5" 
                                    name="newpasswordagain" 
                                    onChange={(e) => setNewPasswordAgain(e.target.value)}
                                    required 
                                />
                                <span 
                                    className="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer"
                                    onClick={() => setShowNewPasswordAgain(!showNewPasswordAgain)}
                                    style={{ cursor: "pointer" }}
                                >
                                    {showNewPasswordAgain ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
                                </span>
                            </div>
                        </div>
                        

                        <div className="btn-div-change-password">
                            <button type="submit" className="btn-change-password">
                                Change Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Deactivation Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h4 className="modal-redirect-h4">You will be redirected to the Login page in 5 seconds...</h4>
                    </div>
                </div>
            )}
        </>
    );
}

export default ChangePassword;
