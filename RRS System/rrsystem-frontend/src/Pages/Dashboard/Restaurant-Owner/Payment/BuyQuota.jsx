import React, { useEffect, useState, useRef } from "react";
import Select, { components } from "react-select";
import { useAuth } from "../../../../Routes/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const DropdownIndicator = (props) => {
    const { menuIsOpen } = props.selectProps;
    return (
        <components.DropdownIndicator {...props}>
        <div
            style={{
            transition: "transform 0.3s ease",
            transform: menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
        >
            ▲
        </div>
        </components.DropdownIndicator>
    );
};

const detectCardType = (number) => {
    const cleaned = number.replace(/\D/g, "");
    if (/^4/.test(cleaned)) return "visa";
    if (/^5[1-5]/.test(cleaned) || /^2(2[2-9][1-9]|2[3-9]|[3-6]|7[01]|720)/.test(cleaned)) return "mastercard";
    if (/^9792/.test(cleaned)) return "troy";
    return "unknown";
};

function BuyQuota() {

    const [selectedQuota, setSelectedQuota] = useState(null);

    const [cardholderNameRaw, setCardholderNameRaw] = useState("");
    const [cardNumberRaw, setCardNumberRaw] = useState("");
    const [expiryMonth, setExpiryMonth] = useState("MM");
    const [expiryYear, setExpiryYear] = useState("YY");
    const [cvc, setCvc] = useState("###");
    const [isBack, setIsBack] = useState(false);
    const [openMenu, setOpenMenu] = useState("");
    const cardType = detectCardType(cardNumberRaw);
    const [succesMessage, setSuccesMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const alertRef = useRef(null);

    const [cardVisible, setCardVisible] = useState(false);
    const [quotaVisible, setQuotaVisible] = useState(true);

    const currentYear = new Date().getFullYear();

    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout(); 
        navigate("/login");
    };

    const monthOptions = Array.from({ length: 12 }, (_, i) => {
    const m = (i + 1).toString().padStart(2, "0");
    return { value: m, label: m };
    });

    const yearOptions = Array.from({ length: 11 }, (_, i) => {
    const fullYear = currentYear + i;
    const shortYear = fullYear.toString().slice(2);
    return { value: shortYear, label: fullYear.toString() };
    });

    const formatCardNumber = (number) => {
    const cleaned = number.replace(/\D/g, "").slice(0, 16);
    return cleaned.replace(/(.{4})/g, "$1 ").trim();
    };

    const formatName = (raw) => raw.toUpperCase();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!cardNumberRaw || cardNumberRaw.trim().replace(/\s/g, "").length < 16) {
            setErrorMessage("Please enter a valid card number.");
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }
    
        const today = new Date();
        const currentYearShort = today.getFullYear() % 100;
        const currentMonth = today.getMonth() + 1;
    
        const enteredYear = parseInt(expiryYear, 10);
        const enteredMonth = parseInt(expiryMonth, 10);
    
        if (
            isNaN(enteredYear) ||
            isNaN(enteredMonth) ||
            enteredYear < currentYearShort ||
            (enteredYear === currentYearShort && enteredMonth < currentMonth)
        ) {
            setErrorMessage("Card date expired!");
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }
    
        if (!selectedQuota) {
            setErrorMessage("No quota selected.");
            return;
        }

        try {

            const response = await fetch(`http://localhost:8081/api/expired-quota/buy-quota?selectedQuota=${selectedQuota}`, {
                method: "PUT",
                credentials: "include",
            });            
    
            if (!response.ok) {
                const text = await response.text();
                setErrorMessage(`Failed to update quota: ${text}`);
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                let serviceName = "";
                if (selectedQuota === 100) serviceName = "Add 100 Quota";
                else if (selectedQuota === 275) serviceName = "Add 275 Quota";
                else if (selectedQuota === 600) serviceName = "Add 600 Quota";
                else serviceName = `Add ${selectedQuota} Quota`;
              
                const invoiceData = {
                  serviceName,
                  amountPaid: price,
                  billingAddress,
                  city,
                  postalCode,
                  emailAddress,
                };
              
                const invoiceResponse = await fetch("http://localhost:8081/api/restaurant-owner/invoices/create-invoice", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  credentials: "include",
                  body: JSON.stringify(invoiceData),
                });
              
                if (!invoiceResponse.ok) {
                  const text = await invoiceResponse.text();
                  setErrorMessage(`Invoice creation failed: ${text}`);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  return;
                }
              
                setErrorMessage(null);
                setSuccesMessage("Your payment was successful. Your quota has been updated. You're redirecting to login page...");
                window.scrollTo({ top: 0, behavior: "smooth" });
              
                setTimeout(() => {
                  handleLogout();
                }, 3000);
              }

        } catch (error) {
            console.error("Error during plan update:", error);
            setErrorMessage("Something went wrong.");
        }
    };

    const [price, setPrice] = useState(0);
    

    const handleQuotaSelect = (selectedQuota, selectedPrice) => {
        setSelectedQuota(selectedQuota);
        setPrice(selectedPrice);
        window.scrollTo({ top: 0, behavior: "smooth" });
        console.log("Selected quota:", selectedQuota, " - ", "Price:", selectedPrice);
        setQuotaVisible(false);
        setCardVisible(true);
    };

    const handleGoBack = () => {
        setSelectedQuota(null);
        location.reload();
    }

    const [billingAddress, setBillingAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [emailAddress, setEmailAddress] = useState("");

    return (
        <>
            {quotaVisible && (
            <div className="plans-content">
                <div className="plans-div">
                    <h1 className="plans-h1">Choose a Quota</h1>
                    <p className="text-center planstext">Your quota has expired. Please choose a number of quota that you want to add.</p>
                    <form className="plans-form">
                        <div className="row row-plans">
                            <button 
                                className="submit-button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleQuotaSelect(100, 15);
                                }}
                            >
                                Add 100 Quota - $15
                            </button>
                            <button 
                                className="submit-button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleQuotaSelect(275, 25);
                                }}
                            >
                                Add 275 Quota - $25
                            </button>
                            <button 
                                className="submit-button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleQuotaSelect(600, 30);
                                }}
                            >
                                Add 600 Quota - $30
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            )}

            {cardVisible && (
            <div className="card-content">
                <div className="card-container" style={{ marginTop: "2rem" }}>
                    <button className="go-back" onClick={handleGoBack}>←</button>
                    <h2 className="text-center mt-2 mb-4">Your Invoice Amount</h2>
                    <h3 className="text-center bold mb-2">${(price)}</h3>
                    <h5 className="text-center mb-4">Annual Payment</h5>

                    <div className={`credit-card ${isBack ? "flip" : ""}`}>
                    {/* Front */}
                    <div className="card-front">
                        <div className="row card-row">
                            <div className="col card-col">
                                <div className={`card-chip card-mastercard ${cardType === "mastercard" ? "active" : ""}`}></div>
                            </div>
                            <div className="col card-col">
                                <div className={`card-chip card-visa ${cardType === "visa" ? "active" : ""}`}></div>
                            </div>
                            <div className="col card-col">
                                <div className={`card-chip card-troy ${cardType === "troy" ? "active" : ""}`}></div>
                            </div>
                        </div>
            
                        <div className="card-number">
                            {cardNumberRaw ? formatCardNumber(cardNumberRaw) : "#### #### #### ####"}
                        </div>
                        <div className="card-info">
                            <span className="card-name">
                                {cardholderNameRaw ? formatName(cardholderNameRaw) : "FULL NAME"}
                            </span>
                        </div>
                    </div>
            
                    {/* Back */}
                    <div className="card-back">
                        <div className="black-bar"></div>
                            <div className="card-cvc-bar">
                                <span>CVC</span>
                                <div className="cvc-value">{cvc || "###"}</div>
                            </div>
                            <div className="card-expiry-back">
                                EXP: {expiryMonth}/{expiryYear}
                            </div>
                        </div>
                    </div>
            
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
            
                    <form className="card-form" onSubmit={handleSubmit}>
                        <label className="mt-3">
                            Cardholder Name
                            <input
                            type="text"
                            maxLength="200"
                            required
                            value={cardholderNameRaw}
                            onChange={(e) => {
                                const onlyValidChars = e.target.value.replace(/[^a-zA-ZçÇğĞıİöÖşŞüÜ.\s]/g, "");
                                setCardholderNameRaw(onlyValidChars);
                            }}
                            placeholder="Name Surname"
                            />
                        </label>
                
                        <label>
                            Card Number
                            <input
                            type="text"
                            required
                            maxLength="19"
                            minLength="19"
                            value={formatCardNumber(cardNumberRaw)}
                            onChange={(e) => setCardNumberRaw(e.target.value.replace(/\D/g, ""))}
                            placeholder="1234 5678 9012 3456"
                            />
                        </label>
                
                        <label>
                            Expiry Month
                            <Select
                            options={monthOptions}
                            placeholder="MM"
                            isSearchable={false}
                            onMenuOpen={() => {
                                setOpenMenu("month");
                                setIsBack(true);
                            }}
                            onMenuClose={() => {
                                setOpenMenu("");
                                setIsBack(false);
                            }}
                            onChange={(option) => setExpiryMonth(option.value)}
                            menuIsOpen={openMenu === "month"}
                            menuPosition="absolute"
                            menuShouldScrollIntoView={false}
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                            classNamePrefix="react-select"
                            components={{ DropdownIndicator }}
                            />
                        </label>
                
                        <label>
                            Expiry Year
                            <Select
                            options={yearOptions}
                            placeholder="YY"
                            isSearchable={false}
                            onMenuOpen={() => {
                                setOpenMenu("year");
                                setIsBack(true);
                            }}
                            onMenuClose={() => {
                                setOpenMenu("");
                                setIsBack(false);
                            }}
                            onChange={(option) => setExpiryYear(option.value)}
                            menuIsOpen={openMenu === "year"}
                            menuPosition="absolute"
                            menuShouldScrollIntoView={false}
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                            classNamePrefix="react-select"
                            components={{ DropdownIndicator }}
                            />
                        </label>
                
                        <label>
                            CVC
                            <input
                            type="text"
                            required
                            maxLength="3"
                            onFocus={() => setIsBack(true)}
                            onBlur={() => setIsBack(false)}
                            onChange={(e) => setCvc(e.target.value)}
                            placeholder="123"
                            />
                        </label>
                
                        <label>
                            Billing Address
                            <input
                            type="text"
                            maxLength="200"
                            placeholder="Street, Building No, etc."
                            required
                            value={billingAddress}
                            onChange={(e) => setBillingAddress(e.target.value)}
                            />
                        </label>
                
                        <label>
                            City
                            <input
                            type="text"
                            maxLength="200"
                            placeholder="Your City"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            />
                        </label>
                
                        <label>
                            Postal Code
                            <input
                            type="text"
                            maxLength="5"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            placeholder="00000"
                            required
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, ""))}
                            />
                        </label>
                
                        <label>
                            Email Address
                            <input
                            type="email"
                            maxLength="200"
                            placeholder="example@mail.com"
                            required
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                            />
                        </label>
                
                        <button
                            type="submit"
                            className="submit-button"
                            style={{ marginBottom: "2rem" }}
                        >
                            Complete Payment
                        </button>
                    </form>
                </div>
            </div>    
            )}
        </>
    );
}

export default BuyQuota;
