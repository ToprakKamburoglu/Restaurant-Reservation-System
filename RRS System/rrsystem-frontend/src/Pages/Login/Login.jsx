import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Routes/AuthContext.jsx";
import { Link } from "react-router-dom";


function Login() {
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login, isAuthenticated, userType } = useAuth();
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            if (userType === 1) navigate("/admin");
            else if (userType === 2) navigate("/manager");
            else if (userType === 3) navigate("/restaurant-owner");
            else if (userType === 4) navigate("/plans");
            else if (userType === 5) navigate("/buy-quota");
        }
    }, [isAuthenticated, userType, navigate]);

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:8081/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ username, password }),
            });

            const text = await response.text();
            let result;

            try {
                result = JSON.parse(text);
            } catch (e) {
                throw new Error("Invalid response received from the server: " + text);
            }

            if (!response.ok) {
                throw new Error(result.message || "An error occurred.");
            }

            if (response.status === 200) {
                const userData = result.user;
                login(userData);

                if (userData.userType === 1) navigate("/admin");
                else if (userData.userType === 2) navigate("/manager");
                else if (userData.userType === 3) navigate("/restaurant-owner");
            }

        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="login-content">
            <div className="login-div">
                <h1 className="login-h1 text-center">Login</h1>
                <p className="text-center">Access your dashboard.</p>

                <div className="login-form">
                    {error && <p className="text-danger text-center">{error}</p>}
                    <div className="form-group pt-2">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group pt-2 position-relative">
                        <label className="form-label d-flex justify-content-between align-items-center">
                            Password
                        </label>
                        <div className="position-relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                className="form-control pe-5" 
                                name="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                            <span 
                                className="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ cursor: "pointer" }}
                            >
                                {showPassword ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
                            </span>
                        </div>
                    </div>

                    <div className="text-center mt-4">
                        <button onClick={handleLogin} className="btn-login w-100">
                            Login
                        </button>
                    </div>

                    <div className="text-center mt-3">
                        <p>Do you want to join us? <Link to="/tryit" className="text-decoration-none login-forgot-password">Try it for 7 Days</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
