import React, { useState, useRef } from "react";
import Navigation from "../../../../Shared/Dashboard/Admin/NavigationAdmin.jsx";

const countryCodes = ["+1",  "+33", "+34", "+44", "+49", "+61", "+90"];

function AddManager() {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        username: "",
        photo: "",
        email: "",
        phone: "",
        countryCode: countryCodes[6]
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        if ((id === "name" || id === "surname") && /[^a-zA-ZĞğÜüŞşİıÖöÇç ]/.test(value)) return;
        if (id === "phone" && /\D/.test(value)) return;
        if (id !== "photo" && value.length > 200) return;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newManager = {
            ...formData,
            phone: `${formData.countryCode}${formData.phone}`,
            userType: 2,
            activeness: 1
        };
    
        try {
            const response = await fetch("http://localhost:8081/api/admin/managers/add-manager", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newManager),
                mode: 'cors'
            });
    
            const result = await response.text(); 
    
            if (response.ok) {
                setSuccesMessage("Manager added successfully!");
                setErrorMessage(null);

                setFormData({ name: "", surname: "", username: "", photo: "", email: "", phone: "", countryCode: countryCodes[0] });
            } else {
                setErrorMessage(result);
                setSuccesMessage(null);
                
            }
        } catch (error) {
            console.error("Error adding manager:", error);
            setErrorMessage("An error occurred.");
            setSuccesMessage(null);

        }
    };
    
    const alertRef = useRef(null);
    const [succesMessage, setSuccesMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        const uploadData = new FormData();
        uploadData.append("file", file);
    
        fetch("http://localhost:8081/api/admin/user-info/upload-photo", {
            method: "POST",
            credentials: "include",
            body: uploadData,
        })
            .then((res) => res.json())
            .then((data) => {
                setFormData((prev) => ({
                    ...prev,
                    photo: data.path,
                }));
            })
            .catch((err) => console.error("Upload failed", err));
    };

    return (
        <>
            <Navigation />
            <div id="content">
                <h1 className="page-name">Add Manager</h1>
                <div className="add-manager-div">
                    <div ref={alertRef} className="pt-2">
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
                    <form className="add-manager-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group col">
                                <label htmlFor="name"><i class="fas fa-user-tag"></i> Name</label>
                                <input type="text" className="form-control" id="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="form-group col">
                                <label htmlFor="surname"><i class="fas fa-id-badge"></i> Surname</label>
                                <input type="text" className="form-control" id="surname" value={formData.surname} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="form-group">
                        <label htmlFor="username"> <i className="fas fa-user"></i> Username</label>
                            <input type="text" className="form-control" id="username" value={formData.username} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="photo"> <i className="fas fa-image"></i> User Photo</label>
                            <label className="custom-file-upload">
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="photo"
                                    name="photo"
                                    onChange={handlePhotoUpload}
                                />
                                <i className="fas fa-image"></i> Upload Photo
                            </label>
                            {formData.photo && (
                                <p className="selected-file-name">
                                    Selected: {formData.photo.split("/").pop()}
                                </p>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email"><i class="fas fa-envelope"></i> Email</label>
                            <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone"><i class="fas fa-phone"></i> Phone Number</label>
                            <div className="phone-input-container">
                                <select className="form-control country-code" value={formData.countryCode} onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}>
                                    {countryCodes.map((code) => (
                                        <option key={code} value={code}>{code}</option>
                                    ))}
                                </select>
                                <input type="tel" className="form-control phone-number" id="phone" value={formData.phone} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="btn-div-add-manager">
                            <button type="submit" className="btn-add-manager">Add Manager</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddManager;
