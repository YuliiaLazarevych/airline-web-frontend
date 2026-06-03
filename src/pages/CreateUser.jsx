import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateUser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('regular');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        window.fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, role }),
        }).then(() => navigate('/users'));
    };

    return (
        <div className="container">
            <section className="form-card">
                <h2>Реєстрація нового працівника</h2>
                <form className="airline-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">
                            Логін:
                            <input
                                type="text"
                                id="username"
                                className="form-input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">
                            Пароль:
                            <input
                                type="password"
                                id="password"
                                className="form-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">
                            Роль:
                            <select
                                id="role"
                                className="form-input"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="admin">Admin</option>
                                <option value="regular">Regular</option>
                            </select>
                        </label>
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn-submit">Ok</button>
                        <button type="button" className="btn-cancel" onClick={() => navigate('/users')}>Скасувати</button>
                    </div>
                </form>
            </section>
        </div>
    );
}
