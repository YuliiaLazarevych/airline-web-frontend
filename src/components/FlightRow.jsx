import React from 'react';
import { Link } from 'react-router-dom';

export default function FlightRow({ flight, isAdmin, onDelete }) {
    return (
        <tr>
            <td><strong>{flight.number}</strong></td>
            <td>{flight.dest}</td>
            <td>{flight.time}</td>
            <td>
                <span className={`status status-${flight.status}`}>
                    {flight.statusText}
                </span>
            </td>
            {isAdmin && (
                <td>
                    <Link to={`/edit-flight?id=${flight.id}`} className="link-edit">
                        Редагувати
                    </Link>
                    <button
                        type="button"
                        className="btn-delete-text"
                        onClick={() => onDelete(flight.id)}
                    >
                        Видалити
                    </button>
                </td>
            )}
        </tr>
    );
}
