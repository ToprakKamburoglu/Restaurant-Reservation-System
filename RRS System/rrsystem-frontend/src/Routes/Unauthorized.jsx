import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Unauthorized = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleGoBack = () => {
        window.history.back();
    };

    const handleLogin = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="reserve-content d-flex align-items-center justify-content-center vh-100">
            <div className="reserve-div text-center p-4 shadow rounded bg-white">
                <h1 className="unauth-h1">Unauthorized!</h1>
                <p className="unauth-p">You do not have permission to view this page.</p>
                <div className="mt-4">
                    <button onClick={handleGoBack} className="btn btn-secondary-custom me-2">Go Back</button>
                    <button onClick={handleLogin} className="btn btn-primary-custom">Go to Login</button>
                </div>
            </div>
        </div>
    );
};

export default Unauthorized;
