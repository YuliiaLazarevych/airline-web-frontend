import React, { useEffect, useState } from 'react';

export default function Analytics() {
    const [flights, setFlights] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        window.fetch('http://localhost:3000/flights')
            .then((res) => {
                if (!res.ok) throw new Error('Помилка завантаження аналітики.');
                return res.json();
            })
            .then((data) => setFlights(data))
            .catch((err) => setError(err.message));
    }, []);

    const totalFlights = flights.length;
    const delayedFlights = flights.filter((f) => f.status === 'delayed').length;
    // Умовно вважаємо, що кожен наш літак перевозить 145 пасажирів
    const totalPassengers = totalFlights * 145;

    return (
        <main className="container">
            <section className="analytics-section">
                <h1>Аналітичні дані авіакомпанії</h1>
                {error && <div className="status status-delayed">{error}</div>}
                <div className="stats-grid">
                    <div className="stat-card">
                        <h2>{totalFlights}</h2>
                        <p>Літаків у небі</p>
                    </div>
                    <div className="stat-card">
                        <h2>{totalPassengers}</h2>
                        <p>Пасажирів сьогодні</p>
                    </div>
                    <div className="stat-card">
                        <h2>{delayedFlights}</h2>
                        <p>Поточна затримка</p>
                    </div>
                </div>
            </section>
        </main>
    );
}
