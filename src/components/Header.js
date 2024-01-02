import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/signin'); // Redirect to the login page
    };

    return (
        <header className="header-container">
            <div className="logo">
                <Link to="/" className="nav-link">Logo</Link>
            </div>
            <nav className="nav">
                <Link to="/dashboard" className="nav-link">Go to Dashboard</Link>
                {isLoggedIn ? (
                    <button onClick={handleLogout} className="nav-link">Logout</button>
                ) : (
                    <>
                        <Link to="/signin" className="nav-link">Sign In</Link>
                        <Link to="/signup" className="nav-link">Sign Up</Link>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;
