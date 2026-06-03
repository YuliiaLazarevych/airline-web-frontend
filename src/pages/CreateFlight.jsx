import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createFlight } from '../services/flightService';
import FlightForm from '../components/FlightForm';

export default function CreateFlight() {
    const [number, setNumber] = useState('');
    const [dest, setDest] = useState('');
    const [time, setTime] = useState('');
    const [status, setStatus] = useState('on-time');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const statusText = status === 'on-time' ? 'Вчасно' : 'Затримується';
        const flightData = {
            number,
            dest,
            time,
            status,
            statusText,
        };
        createFlight(flightData).then(() => navigate('/flights'));
    };

    return (
        <main className="container">
            <section className="form-card">
                <h2>Додати новий рейс</h2>
                <FlightForm
                    number={number}
                    setNumber={setNumber}
                    dest={dest}
                    setDest={setDest}
                    time={time}
                    setTime={setTime}
                    status={status}
                    setStatus={setStatus}
                    onSubmit={handleSubmit}
                    buttonText="Ok"
                    onCancel={() => navigate('/flights')}
                />
            </section>
        </main>
    );
}
