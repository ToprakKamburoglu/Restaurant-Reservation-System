import React, { useState, useEffect } from "react";
import Navigation from "../../../../Shared/Dashboard/Restaurant-Owner/NavigationRestaurantOwner.jsx";
import { FaEye, FaEyeSlash, FaClipboard } from 'react-icons/fa'; 

function YourApi() {
    const [showApiKey, setShowApiKey] = useState(false);
    const [apiKey, setApiKey] = useState("");
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchApiKey = async () => {
            try {
                const response = await fetch("http://localhost:8081/api/restaurant-owner/your-api/get-api-key", {
                    method: "GET",
                    credentials: "include",
                });
                if (response.ok) {
                    const key = await response.text();
                    setApiKey(key);
                } else {
                    setApiKey("");
                }
            } catch (error) {
                setApiKey("");
            }
            setLoading(false);
        };
        fetchApiKey();
    }, []);

    const handleToggleApiKeyVisibility = () => {
        setShowApiKey((prevState) => !prevState);
    };

    const handleCopyApiKey = () => {
        navigator.clipboard.writeText(apiKey);
    };

    const maskedApiKey = showApiKey 
        ? apiKey 
        : apiKey
            ? `${apiKey.slice(0, 3)}${"*".repeat(apiKey.length - 3)}`
            : "";

    // Modal açma
    const handleRegenerateApiKey = () => {
        setShowModal(true);
    };

    // Modalda "Yes, Regenerate" tıklandığında
    const handleConfirmRegenerate = async () => {
        setLoading(true);
        setShowModal(false);
        try {
            const response = await fetch("http://localhost:8081/api/restaurant-owner/your-api/regenerate-api-key", {
                method: "PUT",
                credentials: "include",
            });
            if (response.ok) {
                const newKey = await response.text();
                setApiKey(newKey);
            }
        } catch (error) {
            // Hata yönetimi ekleyebilirsin
        }
        setLoading(false);
    };

    // Modalda "Cancel" tıklandığında
    const handleCancelRegenerate = () => {
        setShowModal(false);
    };

    const iframeCode = `<iframe 
    src="http://localhost:5173/embed-reservation?apiKey=your_api_key" 
    width="800" 
    height="600"
    style="border:none;"
    >
</iframe>`;
    

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navigation />
            <div id="content">
                <h1 className="page-name">Your API Key</h1>
                <div className="add-cuisine-div mb-5">
                    <form className="add-cuisine-form">
                        <div className="form-group">
                            <label htmlFor="apiKey">Your API Key</label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="apiKey"
                                    value={maskedApiKey}
                                    readOnly
                                />
                                <div className="input-group-append">
                                    <button
                                        type="button"
                                        className="btn"
                                        onClick={handleToggleApiKeyVisibility}
                                    >
                                        {showApiKey ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn"
                                        onClick={handleCopyApiKey}
                                    >
                                        <FaClipboard />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="btn-div-add-cuisine">
                            <p className="attention-api">
                                Please write down your API key and do not lose it.
                                Do not share your API key with anyone.
                                With this key you can access the UI that provides reservations to your customers.
                            </p>
                            <button type="button" className="btn-add-cuisine" onClick={handleRegenerateApiKey}>Regenerate</button>
                        </div>
                    </form>
                    <div class="form-group p-3">
                        <label className="font-weight-bold" for="frame">Embed Your Reservation UI</label>
                        <textarea
                            className="form-control"
                            id="frame"
                            rows="7"
                            value={iframeCode}
                            readOnly
                        />
                    </div>
                </div>
            </div>

            {/* Modal for Regenerating API Key */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="text-center">
                            <img src="/images/logo-last-modal.png" alt="Logo" className="modal-logo" />
                        </div>
                        <h4 className="modal-title">If you regenerate your API Key, you will need to change your embedded structures again.</h4>
                        <h4 className="modal-title">Are you sure you want to regenerate your API Key?</h4>
                        <div className="modal-buttons">
                            <button
                                className="btn btn-modal"
                                onClick={handleConfirmRegenerate}
                            >
                                Yes, Regenerate
                            </button>
                            <button
                                className="btn btn-modal-cancel"
                                onClick={handleCancelRegenerate}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default YourApi;