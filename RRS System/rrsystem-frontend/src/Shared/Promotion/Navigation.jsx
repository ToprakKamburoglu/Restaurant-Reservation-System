import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

function Navigation() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        window.scrollTo(0, 0); 
    }, [location]); 

    return (
        <nav>
          <Link to="/" className="logo-link" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img 
                src="/images/logo-last.png"
                alt="Rezal Logo"
                style={{ height: "45px", width: "auto" }}
            /> 
                <span style={{
                    fontSize: "30px",
                    fontWeight: "bold" 
                    }}>
                    Rezal
                </span>
            </Link>

            <input type="checkbox" id="click" />
            <label htmlFor="click" className="menu-btn">
                <i className="fas fa-bars"></i>
            </label>
            <ul>
                <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
                <li><NavLink to="/pricing" activeClassName="active">Pricing</NavLink></li>
                <li><NavLink to="/features" activeClassName="active">Features</NavLink></li>
                <li><NavLink to="/contact" activeClassName="active">Contact</NavLink></li>
                <li><NavLink to="/login" target="_blank" activeClassName="active">Login</NavLink></li>
            </ul>
        </nav>
    );
}

export default Navigation;
