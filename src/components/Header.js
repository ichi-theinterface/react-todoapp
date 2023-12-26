import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <header className="header-container">
            <div className="logo">
                <Link to="/" className="nav-link">Logo</Link>
            </div>
            <nav className="nav">
                <Link to="/dashboard" className="nav-link">Go to Dashboard</Link>
                <Link to="/signin" className="nav-link">Sign In</Link>
                <Link to="/signup" className="nav-link">Sign Up</Link>
            </nav>
        </header>
    );
}

export default Header;
