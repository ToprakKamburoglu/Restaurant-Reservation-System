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

    const handleLogout = () => {
        logout();
        navigate('/login');

    };

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) return;
            try {
                const response = await fetch(`http://localhost:8081/api/navigation-manager/${userId}`, {
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
                            <Link to="/manager/home" className={getNavLinkClass("/manager/home")}>
                                <i className="fas fa-home nav_icon"></i>
                                <span className="nav_name">Home</span>
                            </Link>
                            <Link to="/manager/restaurant-list" className={getNavLinkClass("/manager/restaurant-list")}>
                                <i className="fas fa-utensils nav_icon"></i>
                                <span className="nav_name">Restaurant List</span>
                            </Link>
                            <Link to="/manager/restaurant-requests" className={getNavLinkClass("/manager/restaurant-requests")}>
                                <i className="fas fa-bell nav_icon"></i>
                                <span className="nav_name">Restaurant Requests</span>   
                            </Link>
                            <Link to="/manager/update-restaurant" className={getNavLinkClass("/manager/update-restaurant")}>
                                <i className="fas fa-pen-square nav_icon"></i>
                                <span className="nav_name">Update Restaurant Info</span>
                            </Link>
                            <Link to="/manager/invoices" className={getNavLinkClass("/manager/invoices")}>
                                <i class="fas fa-scroll"></i>
                                <span className="nav_name">Invoices</span>
                            </Link>
                            <Link to="/manager/revenue" className={getNavLinkClass("/manager/revenue")}>
                                <i className="fas fa-dollar-sign nav_icon"></i>
                                <span className="nav_name">Revenue</span>
                            </Link>
                            <Link to="/manager/update-personel-info" className={getNavLinkClass("/manager/update-personel-info")}>
                                <i className="fas fa-user-circle nav_icon"></i>
                                <span className="nav_name">Update Personel Info</span>   
                            </Link>
                            <Link to="/manager/change-password" className={getNavLinkClass("/manager/change-password")}>
                                <i className="fas fa-lock nav_icon"></i>
                                <span className="nav_name">Change Password</span>   
                            </Link>
                        </div>
                    </div>
                    <Link to="/login" className="nav_link" onClick={handleLogout}>
                        <i className="bx bx-log-out nav_icon"></i>
                        <span className="nav_name">Sign Out</span>
                    </Link>
                </nav>
            </div>
        </div>
    );
}

export default Navigation;