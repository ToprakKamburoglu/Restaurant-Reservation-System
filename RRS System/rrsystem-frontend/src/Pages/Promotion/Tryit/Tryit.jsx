import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Tryit() {
    const [formData, setFormData] = useState({
        yourName: "",
        yourSurname: "",
        restaurantName: "",
        userEmail: "",
        userPhoto: "",
        userPhone: "",
        cuisine: "",
        location: "",
        website: "",
        email: "",
        phone: "",
        hoursOfOperation: "",
        dressCode: "",
        parkingDetails: "",
        documentation: null
    });

    const [isChecked, setIsChecked] = useState(false);
    const [cuisines, setCuisines] = useState([]);
    const [locations, setLocations] = useState([]);

    const [successMessage, setSuccessMessage] = useState("");
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        fetch("http://localhost:8081/api/tryit/tryit-cuisine-select", { credentials: "include" })
            .then(res => res.json())
            .then(data => {
                setCuisines(data);
                if (data.length > 0) {
                    setFormData(prev => ({ ...prev, cuisine: data[0].id.toString() }));
                }
            })
            .catch(err => console.error("Cuisine fetch error:", err));
    
        fetch("http://localhost:8081/api/tryit/tryit-location-select", { credentials: "include" })
            .then(res => res.json())
            .then(data => {
                setLocations(data);
                if (data.length > 0) {
                    setFormData(prev => ({ ...prev, location: data[0].id.toString() }));
                }
            })
            .catch(err => console.error("Location fetch error:", err));
    }, []);
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, documentation: e.target.files[0] });
    };

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitDisabled(true);
    
        const requestBody = {
            name: formData.yourName,
            surname: formData.yourSurname,
            restaurantName: formData.restaurantName,
            email: formData.userEmail,
            photo: formData.userPhoto.path,
            phone: formData.userPhone,
            cuisine: { id: parseInt(formData.cuisine) },
            location: { id: parseInt(formData.location) },
            restaurantOwner: `${formData.yourName} ${formData.yourSurname}`,
            restaurantWebsite: formData.website, 
            restaurantEmail: formData.email,
            restaurantPhone: formData.phone,
            hoursOfOperation: formData.hoursOfOperation,
            dressCode: formData.dressCode,
            parkingDetails: formData.parkingDetails,
            requestStatus: 0,
            requestResponse: ""
        };
    
        try {
            const response = await fetch("http://localhost:8081/api/tryit/send-restaurant-request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(requestBody),
            });
    
            if (response.ok) {
                const data = await response.json();
                setSuccessMessage("Request successfully sent! Redirecting to promotion page...");
                setTimeout(() => {
                    navigate("/");
                }, 5000);
            } else {
                alert("Failed to send request");
                setSubmitDisabled(false);
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("An error occurred while sending the request.");
            setSubmitDisabled(false);
        }
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
    
        fetch("http://localhost:8081/api/tryit/upload-photo", {
            method: "POST",
            credentials: "include",
            body: formData,
        })
            .then((res) => res.json())
            .then((data) => {
                setFormData((prev) => ({
                    ...prev,
                    userPhoto: {
                        name: file.name,
                        path: data.path
                    },
                }));
            })
            .catch((err) => console.error("Upload failed", err));
    };
    
    
    return (
        <div className="tryit-content">
            <div className="tryit-div">
                <h1 className="tryit-h1">Try Rezal for 7-days</h1>
                <p className="text-center tryittext">Send a request for a free trial and explore all the features.</p>
                {successMessage && (
                        <div className="alert alert-success text-center" role="alert">
                            {successMessage}
                        </div>
                )}
                <form className="tryit-form" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group pt-2">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control" name="yourName" value={formData.yourName} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group pt-2">
                                <label className="form-label">Surname</label>
                                <input type="text" className="form-control" name="yourSurname" value={formData.yourSurname} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group pt-2">
                                <label className="form-label">Restaurant Name</label>
                                <input type="text" className="form-control" name="restaurantName" value={formData.restaurantName} onChange={handleChange} required />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group pt-2">
                                <label className="form-label">User Email</label>
                                <input type="text" className="form-control" name="userEmail" value={formData.userEmail} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group pt-2">
                                <label className="form-label">User Photo</label>
                                <label className="custom-file-upload">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        id="photo"
                                        name="photo"
                                        onChange={handlePhotoUpload}
                                    />
                                    <i className="fas fa-image mr-1"> </i> Upload Photo
                                </label>
                                {/* Fotoğraf adı */}
                                {formData.userPhoto && (
                                    <div className="selected-file-name">
                                        {formData.userPhoto.name}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group pt-2">
                                <label className="form-label">User Phone</label>
                                <input type="text" className="form-control" name="userPhone" value={formData.userPhone} onChange={handleChange} required />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group pt-2">
                                <label className="form-label">Business Email</label>
                                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group pt-2">
                                <label className="form-label">Phone Number</label>
                                <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group pt-2">
                                <label className="form-label">Hours of Operation</label>
                                <input type="text" className="form-control" name="hoursOfOperation" value={formData.hoursOfOperation} onChange={handleChange} required />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group pt-2">
                                <label className="form-label">Dress Code</label>
                                <input type="text" className="form-control" name="dressCode" value={formData.dressCode} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group pt-2">
                                <label className="form-label">Parking Details</label>
                                <input type="text" className="form-control" name="parkingDetails" value={formData.parkingDetails} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group pt-2">
                                <label className="form-label">Website</label>
                                <input type="text" className="form-control" name="website" value={formData.website} onChange={handleChange} required />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group pt-2">
                                <label className="form-label">Choose the Cuisine</label>
                                <select className="form-select" name="cuisine" value={formData.cuisine} onChange={handleChange} required>
                                    <option value="" disabled>Select Cuisine</option>
                                    {cuisines.map((cuisine) => (
                                        <option key={cuisine.id} value={cuisine.id}>
                                            {cuisine.cuisineName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group pt-2">
                                <label className="form-label">Choose the Location</label>
                                <select className="form-select" name="location" value={formData.location} onChange={handleChange} required>
                                    <option value="" disabled>Select Location</option>
                                    {locations.map((location) => (
                                        <option key={location.id} value={location.id}>
                                            {location.cityName}, {location.countryName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row pt-3">
                        <div className="col-md-12 text-center">
                            <label className="form-label">
                                <span className="privacy-text">I agree to the Terms of Service and Privacy Policy*</span>
                                <input className="form-check-input ms-2" type="checkbox" value="" onChange={handleCheckboxChange} />
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`btn-tryit ${!isChecked || submitDisabled ? 'disabled' : ''}`}
                        disabled={!isChecked || submitDisabled}
                    >
                        {submitDisabled ? "Sending..." : "Send Request"}
                    </button>

                </form>
                
            </div>

        </div>
    );
}

export default Tryit;