import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getFlightById, updateFlight } from '../services/flightService';
import FlightForm from '../components/FlightForm';

export default function EditFlight() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [number, setNumber] = useState('');
    const [dest, setDest] = useState('');
    const [time, setTime] = useState('');
    const [status, setStatus] = useState('on-time');
    const navigate = useNavigate();

    useEffect(() => {
        getFlightById(id).then((data) => {
            setNumber(data.number);
            setDest(data.dest);
            setTime(data.time);
            setStatus(data.status);
        });
    }, [id]);

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
        updateFlight(id, flightData).then(() => {
            const socket = new WebSocket('ws://localhost:8080');
            socket.onopen = () => {
                socket.send(`Рейс ${number} до напрямку ${dest} змінено на статус: ${statusText}`);
                // Даємо сокету 100мс, щоб гарантовано проштовхнути пакет у мережу
                setTimeout(() => socket.close(), 100);
            };
            navigate('/flights');
        });
    };

    return (
        <main className="container">
            <section className="form-card">
                <h2>Редагувати рейс</h2>
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
                    buttonText="Зберегти"
                    onCancel={() => navigate('/flights')}
                />
            </section>
        </main>
    );
}
