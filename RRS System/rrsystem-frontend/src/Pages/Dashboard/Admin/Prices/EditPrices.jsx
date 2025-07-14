import React, { useState, useEffect } from "react";
import Navigation from "../../../../Shared/Dashboard/Admin/NavigationAdmin.jsx";

function EditPrices() {
    const [plans, setPlans] = useState([]);
    const [updatedPrices, setUpdatedPrices] = useState({});
    const [updatedQuotas, setUpdatedQuotas] = useState({});
    const [message, setMessage] = useState(""); 
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8081/api/admin/prices",{
            method: "GET",
            credentials: "include",
        })
        .then((response) => response.json())
        .then((data) => setPlans(data))
        .catch((error) => console.error("Error fetching prices:", error));
    }, []);

    const handlePriceInputChange = (id, newPrice) => {
        setUpdatedPrices((prevState) => ({
            ...prevState,
            [id]: newPrice,
        }));
    };

    const handleQuotaInputChange = (id, newQuota) => {
        setUpdatedQuotas((prevState) => ({
            ...prevState,
            [id]: newQuota,
        }));
    };

    const handlePriceChange = async (id) => {
        const newPrice = updatedPrices[id];
        if (newPrice === undefined || newPrice === "") return;
    
        try {
            const response = await fetch(`http://localhost:8081/api/admin/prices/update-price/${id}`, {
                method: 'PUT',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ price: newPrice }),
            });
    
            const textResponse = await response.text();
    
            if (response.ok) {
                setMessage(textResponse);
                const updatedPlan = plans.map((plan) =>
                    plan.id === id ? { ...plan, planPrice: newPrice } : plan
                );
                setIsSuccess(true);
                setPlans(updatedPlan);
            } else {
                setIsSuccess(false);
                setMessage(`Failed to update price: ${textResponse}`);
            }
        } catch (error) {
            setIsSuccess(false);
            console.error('Error updating price:', error);
            setMessage("An error occurred while updating price.");
        }
    };
    

    const handleQuotaChange = async (id) => {
        const newQuota = updatedQuotas[id];
        if (newQuota === undefined || newQuota === "") return;
    
        try {
            const response = await fetch(`http://localhost:8081/api/admin/prices/update-quota/${id}`, {
                method: 'PUT',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quota: newQuota }),
            });
    
            const textResponse = await response.text(); 
    
            if (response.ok) {
                setMessage(textResponse);  
                const updatedPlan = plans.map((plan) =>
                    plan.id === id ? { ...plan, planQuota: newQuota } : plan
                );
                setIsSuccess(true);
                setPlans(updatedPlan);
            } else {
                setIsSuccess(false);
                setMessage(`Failed to update quota: ${textResponse}`);
            }
        } catch (error) {
            setIsSuccess(false);
            console.error('Error updating quota:', error);
            setMessage("An error occurred while updating quota.");
        }
    };
    

    return (
        <>
            <Navigation />
            <div id="content">
                <h1 className="page-name">Edit Prices</h1>
                {message && (
                    <p
                        className={`text-center message ${
                        isSuccess ? 'success-message' : 'error-message'
                        }`}
                    >
                        {message}
                    </p>
                )}


                <div className="container text-center">
                    <div className="row">
                        {plans.map((plan) => (
                            <div key={plan.id} className="col-sm">
                                <div className="card card-price">
                                    <div className="card-body card-body-price">
                                        <h4 className="card-title-price">{plan.planName}</h4>
                                        <p className="card-text-price">Update the price of {plan.planName} plan.</p>
                                        <div className="form-group">
                                            <label className="card-label-price" htmlFor={`price-${plan.id}`}>Enter the Price ($):</label>
                                            <input
                                                type="number"
                                                className="card-price-input form-control"
                                                id={`price-${plan.id}`}
                                                value={updatedPrices[plan.id] || plan.planPrice}
                                                onChange={(e) => handlePriceInputChange(plan.id, e.target.value)}
                                                min="0"
                                                required
                                            />
                                        </div>
                                        <button type="button" className="btn-price" onClick={() => handlePriceChange(plan.id)}>
                                            Update Price
                                        </button>
                                        <div className="form-group pt-4">
                                            <label className="card-label-price" htmlFor={`quota-${plan.id}`}>Enter the Quota:</label>
                                            <input
                                                type="number"
                                                className="card-price-input form-control"
                                                id={`quota-${plan.id}`}
                                                value={updatedQuotas[plan.id] || plan.planQuota}
                                                onChange={(e) => handleQuotaInputChange(plan.id, e.target.value)}
                                                min="0"
                                                required
                                            />
                                        </div>
                                        <button type="button" className="btn-price" onClick={() => handleQuotaChange(plan.id)}>
                                            Update Quota
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditPrices;
