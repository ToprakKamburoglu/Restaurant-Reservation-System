import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
    
    return (
        <div className="reserve-content">
            <div className="reserve-div">
                <h1 className="reserve-h1 text-center">Forgot Password?</h1>
                <p className="text-center logintext">Enter your email to receive password reset instructions.</p>

                <div className="reserve-form">
                    
                    <div className="form-group pt-2">
                        <label className="form-label">Email</label>
                        <input type="text" className="form-control" name="username" required />
                    </div>


                    <div className="text-center mt-4">
                         <button className="btn-login w-100">Send Password Reset Link</button>
                    </div>

                    <div className="text-center mt-3">
                        <p><Link to="/login" className="text-decoration-none login-forgot-password">Go Back To Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;