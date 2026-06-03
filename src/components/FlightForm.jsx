import React from 'react';
import InputField from './InputField';

export default function FlightForm({
    number,
    setNumber,
    dest,
    setDest,
    time,
    setTime,
    status,
    setStatus,
    onSubmit,
    buttonText,
    onCancel,
}) {
    return (
        <form className="airline-form" onSubmit={onSubmit}>
            <InputField
                id="number"
                label="Номер рейсу:"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Наприклад: BA-301"
            />
            <InputField
                id="dest"
                label="Напрямок:"
                value={dest}
                onChange={(e) => setDest(e.target.value)}
                placeholder="Наприклад: Львів — Париж"
            />
            <InputField
                id="time"
                label="Час вильоту:"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Наприклад: 14:20"
            />
            <div className="form-group">
                <label htmlFor="status">
                    Статус:
                    <select
                        id="status"
                        className="form-input"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="on-time">Вчасно</option>
                        <option value="delayed">Затримується</option>
                    </select>
                </label>
            </div>
            <div className="form-actions">
                <button type="submit" className="btn-submit">{buttonText}</button>
                <button type="button" className="btn-cancel" onClick={onCancel}>
                    Скасувати
                </button>
            </div>
        </form>
    );
}
