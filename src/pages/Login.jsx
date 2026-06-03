import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('regular');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            setError('Будь ласка, заповніть усі поля.');
            return;
        }

        login(username, role);
        navigate('/');
    };

    return (
        <div className="login-page">
            <main className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Вхід у систему</h2>

                    {error && (
                        <div className="status status-delayed" style={{ marginBottom: '15px' }}>
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="username">
                            Логін:
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Введіть логін"
                                className="form-input"
                            />
                        </label>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            Пароль:
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Введіть пароль"
                                className="form-input"
                            />
                        </label>
                    </div>

                    <div className="form-group">
                        <label htmlFor="role">
                            Оберіть роль для тестування:
                            <select
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="form-input"
                            >
                                <option value="regular">Користувач (Regular)</option>
                                <option value="admin">Адміністратор (Admin)</option>
                            </select>
                        </label>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-submit">Ok</button>
                    </div>
                </form>
            </main>
        </div>
    );
}
