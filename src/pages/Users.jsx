import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    const fetchUsers = () => {
        window.fetch('http://localhost:3000/users')
            .then((res) => {
                if (!res.ok) throw new Error('Помилка завантаження');
                return res.json();
            })
            .then((data) => setUsers(data))
            .catch((err) => setError(err.message));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = (id) => {
        // eslint-disable-next-line no-alert
        if (window.confirm('Видалити цього співробітника?')) {
            window.fetch(`http://localhost:3000/users/${id}`, { method: 'DELETE' })
                .then(() => fetchUsers());
        }
    };

    return (
        <div className="container">
            <section className="user-list-section">
                <h1>Керування персоналом</h1>
                {error && <div className="status status-delayed">{error}</div>}
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Прізвище та Ім&apos;я</th>
                            <th>Посада</th>
                            <th>Дії</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.username}</td>
                                <td><strong>{u.role}</strong></td>
                                <td>
                                    <Link to={`/edit-user?id=${u.id}`} className="link-edit">Редагувати</Link>
                                    <button type="button" className="btn-delete-text" onClick={() => handleDelete(u.id)}>Видалити</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="actions-bar-bottom">
                    <Link to="/create-user" className="btn-submit">+ Додати співробітника</Link>
                </div>
            </section>
        </div>
    );
}
