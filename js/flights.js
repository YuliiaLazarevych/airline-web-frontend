const API_URL_FLIGHTS = 'http://localhost:3000/flights';

async function loadFlights() {
    try {
        const response = await window.fetch(API_URL_FLIGHTS);
        const flights = await response.json();
        const tableBody = document.querySelector('.data-table tbody');
        if (!tableBody) return;

        tableBody.innerHTML = '';
        flights.forEach((f) => {
            const row = `
                <tr>
                    <td><strong>${f.number}</strong></td>
                    <td>${f.dest}</td>
                    <td>${f.time}</td>
                    <td><span class="status status-${f.status}">${f.statusText}</span></td>
                </tr>`;
            tableBody.insertAdjacentHTML('beforeend', row);
        });
    } catch (error) {
        const err = document.getElementById('error-notification');
        if (err) err.classList.remove('hidden');
    }
}

document.addEventListener('DOMContentLoaded', loadFlights);
