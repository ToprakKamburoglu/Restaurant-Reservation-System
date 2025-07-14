import React, { useState, useEffect, useRef } from "react";
import Navigation from "../../../../Shared/Dashboard/Restaurant-Owner/NavigationRestaurantOwner.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../Routes/AuthContext.jsx";
import { set } from "date-fns";


function YourPlan() {

    const navigate = useNavigate();
    const { logout } = useAuth();

    const [yourPlan, setyourPlan] = useState({
            yourPlan: "",
            activeQuota: "",
            paymentDate: "",
            expirationDate: "",
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}.${month}.${year} - ${hours}:${minutes}`;
    };

    useEffect(() => {
            fetch("http://localhost:8081/api/restaurant-owner/your-plan/customer-plan", {
                method: "GET",
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    setyourPlan({
                        yourPlan: data.payment && data.payment.plan ? data.payment.plan.planName : "",
                        activeQuota: data.payment ? data.payment.activeQuota : "",
                        paymentDate: data.payment ? data.payment.paymentDate : "",
                        expirationDate: data.payment ? data.payment.expirationDate : "",
                    });
                })
                .catch((error) => console.error("Error fetching user info:", error));
    }, []);

    const [showModalCancel, setShowModalCancel] = useState(false);
    const [showModalChange, setShowModalChange] = useState(false);
    const [showModalAddQuota, setShowModalAddQuota] = useState(false);

    const handleAddQuota = () => {
        setShowModalAddQuota(true);
    }

    const handleChangePlan = () => {
        setShowModalChange(true);
    }

    const handleCancelSubscription = () => {
        setShowModalCancel(true);
    }
    
    const handleConfirmCSubscription = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/restaurant-owner/your-plan/cancel-subscription", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({})
            });
            if (response.ok) {
                setShowModalCancel(false);
                setSuccesMessage("Subscription cancelled successfully. You will be logged out in 5 seconds.");

                setTimeout(() => {
                    logout();
                    navigate("/login");
                }, 5000);
            } else {
                setErrorMessage("Cancel subscription failed.");
            }
        } catch (error) {
            setErrorMessage("Cancel subscription error: " + error);
        }
    };
    
    const handleConfirmChange = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/restaurant-owner/your-plan/change-plan", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({})
            });
            if (response.ok) {
                setShowModalChange(false);
                setSuccesMessage("Subscription cancelled successfully. You will be logged out in 5 seconds.");

                setTimeout(() => {
                    logout();
                    navigate("/login");
                }, 5000);
            } else {
                setErrorMessage("Change plan failed.");
            }
        } catch (error) {
            setErrorMessage("Change plan error: " + error);
        }
    };
    
    const handleConfirmAdd = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/restaurant-owner/your-plan/add-quota", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({})
            });
            if (response.ok) {
                setShowModalAddQuota(false);
                setSuccesMessage("Subscription cancelled successfully. You will be logged out in 5 seconds.");

                setTimeout(() => {
                    logout();
                    navigate("/login");
                }, 5000);
            } else {
                setErrorMessage("Add quota failed.");
            }
        } catch (error) {
            setErrorMessage("Add quota error: " + error);
        }
    };

    
    const handleCancelCSubscription = () => {
        setShowModalCancel(false);
    }

    const handleCancelChange = () => {
        setShowModalChange(false);
    }

    
    const handleCancelAdd = () => {
        setShowModalAddQuota(false);
    }

    const alertRef = useRef(null);
    const [succesMessage, setSuccesMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    return (
        <>
            <Navigation/>
            <div id="content">
                <h1 className="page-name">Your Plan Information</h1>
                
                <div className="your-plan-div mb-4">
                    <form className="your-plan-form">
                        <div ref={alertRef}>
                            {succesMessage && (
                                <div className="alert alert-success m-5 p-3" role="alert">
                                    {succesMessage}
                                </div>
                            )}
                            {errorMessage && (
                                <div className="alert alert-danger m-5 p-3" role="alert">
                                    {errorMessage}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="yourPlan">Your Plan</label>
                            <input
                                type="text"
                                className="form-control"
                                id="yourPlan"
                                name="yourPlan"
                                value={yourPlan.yourPlan}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="activeQuota">Active Quota</label>
                            <input
                                type="text"
                                className="form-control"
                                id="activeQuota"
                                name="activeQuota"
                                value={(yourPlan.activeQuota) > 1000000 ? "Unlimited" : yourPlan.activeQuota}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="paymentDate">Last Payment Date</label>
                            <input
                                type="text"
                                className="form-control"
                                id="paymentDate"
                                name="paymentDate"
                                value={formatDate(yourPlan.paymentDate)}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="expirationDate">Expiration Date</label>
                            <input
                                type="text"
                                className="form-control"
                                id="expirationDate"
                                name="expirationDate"
                                value={formatDate(yourPlan.expirationDate)}
                                readOnly
                            />
                        </div>

                        <div className="row text-center">
                            <div className="col p-3">
                                <button 
                                type="button"
                                className="btn btn-trash btn-custom"
                                onClick={() => handleAddQuota()}
                                >
                                    <i class="fas fa-plus-square"></i> Add Quota
                                </button>
                            </div>
                            <div className="col p-3">
                                <button 
                                type="button"
                                className="btn btn-trash btn-custom"
                                onClick={() => handleChangePlan()}
                                >
                                    <i class="fas fa-exchange-alt"></i> Change Plan
                                </button>
                            </div>
                            <div className="col p-3">
                                <button 
                                type="button"
                                className="btn btn-trash btn-custom"
                                onClick={() => handleCancelSubscription()}
                                >
                                    <i class="fas fa-ban"></i> Cancel Subscription
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {showModalCancel && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="text-center">
                        <img src="/images/logo-last-modal.png" alt="Logo" className="modal-logo" />
                    </div>
                    <h4 className="modal-title">Since we charge subscription fees annually, if you cancel your membership you will not receive any refund. Also, in case of cancellation, you need to purchase a new annual membership. You can purchase a new subscription by logging in again. For more information contact@rezal.info</h4>
                    <h4 className="modal-title">Are you sure you want to cancel your subscription?</h4>
                    <div className="modal-buttons">
                        <button
                        className="btn btn-modal"
                        onClick={handleConfirmCSubscription}
                        >
                        Yes, Cancel
                        </button>
                        <button
                        className="btn btn-modal-cancel"
                        onClick={handleCancelCSubscription}
                        >
                        No Cancellation
                        </button>
                    </div>
                </div>
            </div>
            )}

            {showModalChange && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="text-center">
                        <img src="/images/logo-last-modal.png" alt="Logo" className="modal-logo" />
                    </div>
                    <h4 className="modal-title">Since we charge you annually, you will not receive any refund. If you click yes, you will need to log in again, choose a new plan and pay for it annually. For more information, contact@rezal.info</h4>
                    <h4 className="modal-title">Are you sure you want to change your plan?</h4>
                    <div className="modal-buttons">
                        <button
                        className="btn btn-modal"
                        onClick={handleConfirmChange}
                        >
                        Yes, Change My Plan
                        </button>
                        <button
                        className="btn btn-modal-cancel"
                        onClick={handleCancelChange}
                        >
                        Cancel Change
                        </button>
                    </div>
                </div>
            </div>
            )}

            {showModalAddQuota && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="text-center">
                        <img src="/images/logo-last-modal.png" alt="Logo" className="modal-logo" />
                    </div>
                    <h4 className="modal-title">If you click Yes, you will need to log in again, select a quota and pay for it. If you do not purchase a new quota, you will not be able to access your dashboard. For more information and assistance, contact@rezal.info</h4>
                    <h4 className="modal-title">Are you sure you want to add quota?</h4>
                    <div className="modal-buttons">
                        <button
                        className="btn btn-modal"
                        onClick={handleConfirmAdd}
                        >
                        Yes, Add Quota
                        </button>
                        <button
                        className="btn btn-modal-cancel"
                        onClick={handleCancelAdd}
                        >
                        Cancel Adding
                        </button>
                    </div>
                </div>
            </div>
            )}
        </>
    );
}

export default YourPlan;