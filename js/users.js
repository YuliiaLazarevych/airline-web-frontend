const API_URL = 'http://localhost:3000/users';

const errorBox = document.getElementById('error-notification');
const tableBody = document.getElementById('users-table-body');

async function loadUsers() {
    try {
        const response = await window.fetch(API_URL);
        if (!response.ok) throw new Error('Помилка мережі');
        const users = await response.json();

        if (!tableBody) return;

        tableBody.innerHTML = '';
        users.forEach((user) => {
            const row = `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td><strong>${user.role}</strong></td>
                    <td>
                        <a href="edit-user.html?id=${user.id}" class="link-edit">Редагувати</a>
                        <button class="btn-delete-text" data-id="${user.id}">Видалити</button>
                    </td>
                </tr>`;
            tableBody.insertAdjacentHTML('beforeend', row);
        });
    } catch (error) {
        if (errorBox) {
            errorBox.textContent = 'Помилка завантаження даних';
            errorBox.classList.remove('hidden');
        }
    }
}

async function deleteUser(id) {
    try {
        const response = await window.fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Не вдалося видалити');
        loadUsers();
    } catch (error) {
        if (errorBox) {
            errorBox.textContent = 'Помилка при видаленні';
            errorBox.classList.remove('hidden');
        }
    }
}

if (tableBody) {
    tableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-delete-text')) {
            const userId = event.target.getAttribute('data-id');
            deleteUser(userId);
        }
    });
}

document.addEventListener('DOMContentLoaded', loadUsers);
