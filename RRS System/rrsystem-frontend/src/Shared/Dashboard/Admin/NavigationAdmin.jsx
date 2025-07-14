import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from "../../../Routes/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function Navigation() {
    const toggleRef = useRef(null);
    const navRef = useRef(null);
    const bodyRef = useRef(null);
    const headerRef = useRef(null);
    const location = useLocation();

    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const { logout, userId } = useAuth();
    
    useEffect(() => {
        const toggle = toggleRef.current;
        const nav = navRef.current;
        const bodypd = bodyRef.current;
        const headerpd = headerRef.current;

        if (toggle && nav && bodypd && headerpd) {
            const handleToggle = () => {
                nav.classList.toggle("show");
                toggle.classList.toggle("bx-x");
                bodypd.classList.toggle("body-pd");
                headerpd.classList.toggle("body-pd");
            };

            toggle.addEventListener("click", handleToggle);

            return () => {
                toggle.removeEventListener("click", handleToggle);
            };
        }
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);    

    const getNavLinkClass = (path) => {
        return location.pathname === path ? "nav_link active" : "nav_link";
    };

    const handleLogout = async () => {
        await logout(); 
        navigate("/login");
    };
    

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) return;
            try {
                const response = await fetch(`http://localhost:8081/api/navigation-admin/${userId}`, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    console.error('Error fetching user data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUserData();
    }, [userId]);

    return (
        <div id="body-pd" ref={bodyRef}>
            <header className="header" id="header" ref={headerRef}>
                <div className="header_toggle">
                    <i className="bx bx-menu" id="header-toggle" ref={toggleRef}></i>
                </div>
                {userData ? (
                    <>
                        <div className="header-name-div">
                            <p className="header-name-p">{userData.name} {userData.surname}</p>
                        </div>
                        <div className="header_img">
                            <img src={userData.photo || "https://i.hizliresim.com/qw6n8zx.jpg"} alt="Profile" />
                        </div>
                    </>
                ) : (
                    <div>Loading...</div>
                )}
            </header>
            <div className="l-navbar" id="nav-bar" ref={navRef}>
                <nav className="nav">
                    <div>
                        <a href="#" className="nav_logo">
                            <img src="/images/logo-last-modal.png" height="24px" width="24px" alt="Rezal Logo" />
                            <span className="nav_logo-name">Rezal</span>
                        </a>
                        <div className="nav_list">
                            <Link to="/admin/home" className={getNavLinkClass("/admin/home")}>
                                <i className="fas fa-home nav_icon"></i>
                                <span className="nav_name">Home</span>
                            </Link>
                            <Link to="/admin/customer-list" className={getNavLinkClass("/admin/customer-list")}>
                                <i className="fas fa-user-friends nav_icon"></i>
                                <span className="nav_name">Customer List</span>
                            </Link>
                            <Link to="/admin/managers/add-manager" className={getNavLinkClass("/admin/managers/add-manager")}>
                                <i className="fas fa-user-plus nav_icon"></i>
                                <span className="nav_name">Add Manager</span>   
                            </Link>
                            <Link to="/admin/managers/manager-list" className={getNavLinkClass("/admin/managers/manager-list")}>
                                <i className="fas fa-user-tie nav_icon"></i>
                                <span className="nav_name">Manager List</span>
                            </Link>
                            <Link to="/admin/edit-prices" className={getNavLinkClass("/admin/edit-prices")}>
                                <i className="fas fa-money-bill nav_icon"></i>
                                <span className="nav_name">Edit Prices</span>
                            </Link>
                            <Link to="/admin/restaurants/restaurant-list" className={getNavLinkClass("/admin/restaurants/restaurant-list")}>
                                <i className="fas fa-utensils nav_icon"></i>
                                <span className="nav_name">Restaurant List</span>
                            </Link>
                            <Link to="/admin/cuisines/cuisine-list" className={getNavLinkClass("/admin/cuisines/cuisine-list")}>
                                <i className="fas fa-utensil-spoon nav_icon"></i>
                                <span className="nav_name">Cuisine List</span>
                            </Link>
                            <Link to="/admin/locations/location-list" className={getNavLinkClass("/admin/locations/location-list")}>
                                <i className="fas fa-map-pin nav_icon"></i>
                                <span className="nav_name">Location List</span>
                            </Link>
                            <Link to="/admin/update-personel-info" className={getNavLinkClass("/admin/update-personel-info")}>
                                <i className="fas fa-user-circle nav_icon"></i>
                                <span className="nav_name">Update Personel Info</span>   
                            </Link>
                            <Link to="/admin/change-password" className={getNavLinkClass("/admin/change-password")}>
                                <i className="fas fa-lock nav_icon"></i>
                                <span className="nav_name">Change Password</span>   
                            </Link>
                        </div>
                    </div>
                    <Link className="nav_link" onClick={handleLogout}>
                        <i className="bx bx-log-out nav_icon"></i>
                        <span className="nav_name">Sign Out</span>
                    </Link>
                </nav>
            </div>
        </div>
    );
}

export default Navigation;
