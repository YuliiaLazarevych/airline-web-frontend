const API_URL = 'http://localhost:3000/flights';

export async function getFlights() {
    const res = await window.fetch(API_URL);
    if (!res.ok) throw new Error('Не вдалося завантажити розклад рейсів.');
    return res.json();
}

export async function getFlightById(id) {
    const res = await window.fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error('Не вдалося завантажити рейс.');
    return res.json();
}

export async function createFlight(flightData) {
    const res = await window.fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(flightData),
    });
    if (!res.ok) throw new Error('Не вдалося створити рейс.');
    return res.json();
}

export async function updateFlight(id, flightData) {
    const res = await window.fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(flightData),
    });
    if (!res.ok) throw new Error('Не вдалося оновити рейс.');
    return res.json();
}

export async function deleteFlight(id) {
    const res = await window.fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Не вдалося видалити рейс.');
    return res.json();
}
