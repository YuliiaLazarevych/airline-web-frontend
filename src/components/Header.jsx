import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        navigate('/login');
    };

    return (
        <header className="main-header">
            <Link to="/" className="logo">Bayraktar Air</Link>
            <nav>
                <ul>
                    <li><NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Головна</NavLink></li>
                    <li><NavLink to="/flights" className={({ isActive }) => (isActive ? 'active' : '')}>Рейси</NavLink></li>
                    <li><NavLink to="/analytics" className={({ isActive }) => (isActive ? 'active' : '')}>Аналітика</NavLink></li>
                    {user && user.role.toLowerCase() === 'admin' && (
                        <li><NavLink to="/users" className={({ isActive }) => (isActive ? 'active' : '')}>Персонал</NavLink></li>
                    )}
                    {user ? (
                        <li>
                            <a href="#logout" onClick={handleLogout}>
                                Вихід (
                                {user.username}
                                )
                            </a>
                        </li>
                    ) : (
                        <li><NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>Вхід</NavLink></li>
                    )}
                </ul>
            </nav>
        </header>
    );
}
