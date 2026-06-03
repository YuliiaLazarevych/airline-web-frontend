import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getFlights, deleteFlight } from '../services/flightService';
import FlightFilter from '../components/FlightFilter';
import FlightRow from '../components/FlightRow';

export default function Flights() {
    const { user } = useAuth();
    const [flights, setFlights] = useState([]);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const fetchFlights = () => {
        getFlights()
            .then((data) => setFlights(data))
            .catch((err) => setError(err.message));
    };

    useEffect(() => {
        fetchFlights();
    }, []);

    const handleDelete = (id) => {
        // eslint-disable-next-line no-alert
        if (window.confirm('Ви дійсно хочете видалити цей рейс?')) {
            deleteFlight(id)
                .then(() => fetchFlights())
                .catch((err) => setError(err.message));
        }
    };

    const filteredFlights = useMemo(() => flights.filter((f) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch = f.dest.toLowerCase().includes(query)
            || f.number.toLowerCase().includes(query);
        const matchesStatus = statusFilter === 'all' || f.status === statusFilter;
        return matchesSearch && matchesStatus;
    }), [flights, searchQuery, statusFilter]);

    const isAdmin = user && user.role.toLowerCase() === 'admin';

    return (
        <main className="container">
            <section className="flights-board">
                <h1>Online-табло вильотів</h1>
                {error && <div className="status status-delayed">{error}</div>}

                <FlightFilter
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                />

                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Рейс</th>
                            <th>Напрямок</th>
                            <th>Час вильоту</th>
                            <th>Статус</th>
                            {isAdmin && <th>Дії</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFlights.map((f) => (
                            <FlightRow
                                key={f.id}
                                flight={f}
                                isAdmin={isAdmin}
                                onDelete={handleDelete}
                            />
                        ))}
                    </tbody>
                </table>
                {isAdmin && (
                    <div className="actions-bar-bottom">
                        <Link to="/create-flight" className="btn-submit">
                            + Додати новий рейс
                        </Link>
                    </div>
                )}
            </section>
        </main>
    );
}
