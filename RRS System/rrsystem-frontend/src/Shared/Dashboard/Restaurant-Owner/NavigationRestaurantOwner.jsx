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
                const response = await fetch(`http://localhost:8081/api/navigation-restaurant-owner/${userId}`, {
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
                <div className="header-name-div">
                    <p className="header-name-p">
                        {userData ? `${userData.name} ${userData.surname}` : 'Loading...'}
                    </p>
                </div>
                <div className="header_img">
                    <img src={userData ? userData.photo : "https://i.hizliresim.com/qw6n8zx.jpg"} alt="Profile" />
                </div>
            </header>
            <div className="l-navbar" id="nav-bar" ref={navRef}>
                <nav className="nav">
                    <div>
                        <a href="#" className="nav_logo">
                            <img src="/images/logo-last-modal.png" height="24px" width="24px" alt="Rezal Logo" />
                            <span className="nav_logo-name">Rezal</span>
                        </a>
                        <div className="nav_list">
                            <Link to="/restaurant-owner/home" className={getNavLinkClass("/restaurant-owner/home")}>
                                <i className="fas fa-home nav_icon"></i>
                                <span className="nav_name">Home</span>
                            </Link>
                            <Link to="/restaurant-owner/update-restaurant" className={getNavLinkClass("/restaurant-owner/update-restaurant")}>
                                <i className="fas fa-pen-square nav_icon"></i>
                                <span className="nav_name">Update Restaurant</span>
                            </Link>
                            <Link to="/restaurant-owner/table-info" className={getNavLinkClass("/restaurant-owner/table-info")}>
                                <i className="fas fa-chair nav_icon"></i>
                                <span className="nav_name">Table Information</span>
                            </Link> 
                            <Link to="/restaurant-owner/create-sessions" className={getNavLinkClass("/restaurant-owner/create-sessions")}>
                                <i className="fas fa-clock nav_icon"></i>
                                <span className="nav_name">Create Sessions</span>
                            </Link>
                            <Link to="/restaurant-owner/reservations/calendar-view" className={getNavLinkClass("/restaurant-owner/reservations/calendar-view")}>
                                <i className="fas fa-calendar nav_icon"></i>
                                <span className="nav_name">Calendar View</span>   
                            </Link>
                            <Link to="/restaurant-owner/reservations/list-view" className={getNavLinkClass("/restaurant-owner/reservations/list-view")}>
                                <i className="fas fa-list-alt nav_icon"></i>
                                <span className="nav_name">List View</span>   
                            </Link>
                            <Link to="/restaurant-owner/your-api" className={getNavLinkClass("/restaurant-owner/your-api")}>
                                <i class="fas fa-code"></i>
                                <span className="nav_name">Your API Key</span>   
                            </Link>
                            <Link to="/restaurant-owner/your-plan" className={getNavLinkClass("/restaurant-owner/your-plan")}>
                                <i className="far fa-star nav_icon"></i>
                                <span className="nav_name">Your Plan</span>   
                            </Link>
                            <Link to="/restaurant-owner/update-personel-info" className={getNavLinkClass("/restaurant-owner/update-personel-info")}>
                                <i className="fas fa-user-circle nav_icon"></i>
                                <span className="nav_name">Update Personel Info</span>   
                            </Link>
                            <Link to="/restaurant-owner/change-password" className={getNavLinkClass("/restaurant-owner/change-password")}>
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