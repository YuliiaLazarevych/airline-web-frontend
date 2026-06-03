import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function EditUser() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('regular');
    const navigate = useNavigate();

    useEffect(() => {
        window.fetch(`http://localhost:3000/users/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setUsername(data.username);
                setRole(data.role);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        window.fetch(`http://localhost:3000/users/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, role }),
        }).then(() => navigate('/users'));
    };

    return (
        <div className="container">
            <section className="form-card">
                <h2>Редагувати працівника</h2>
                <form className="edit-form" onSubmit={handleSubmit}>
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
                        <button type="submit" className="btn-submit">Зберегти</button>
                        <button type="button" className="btn-cancel" onClick={() => navigate('/users')}>Скасувати</button>
                    </div>
                </form>
            </section>
        </div>
    );
}
