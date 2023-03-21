import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">
                    <img src="/assets/navigation_logo.png" alt="AIRPORT PARKING - RESERVATIONS.COM" height="40" />
                </Link>
                <div className="col"></div>
                
                <div className="collapse navbar-collapse flex-row-reverse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="login">
                               Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="profile">
                               My Account
                            </Link>
                        </li>
                        
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header;