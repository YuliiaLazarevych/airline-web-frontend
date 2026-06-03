const API_URL = 'http://localhost:3000/users';

const form = document.getElementById('edit-user-form');
const errorNotification = document.getElementById('error-notification');

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

function showError(message) {
    if (errorNotification) {
        errorNotification.textContent = message;
        errorNotification.classList.remove('hidden');
    }
}

function loadUserData() {
    if (!userId) {
        showError('Користувача не знайдено.');
        return;
    }

    window.fetch(`${API_URL}/${userId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Помилка завантаження даних користувача.');
            }
            return response.json();
        })
        .then((user) => {
            const usernameInput = document.getElementById('username');
            const roleSelect = document.getElementById('role');

            if (usernameInput) usernameInput.value = user.username;
            if (roleSelect) roleSelect.value = user.role;
        })
        .catch((error) => {
            showError(error.message);
        });
}

if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirm-password');
        const roleSelect = document.getElementById('role');

        if (!usernameInput || !passwordInput || !confirmPasswordInput || !roleSelect || !userId) {
            return;
        }

        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const role = roleSelect.value;

        if (password !== confirmPassword) {
            showError('Паролі не збігаються.');
            return;
        }

        window.fetch(`${API_URL}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, role }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Не вдалося оновити дані.');
                }
                window.location.href = 'users.html';
            })
            .catch((error) => {
                showError(error.message);
            });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadUserData();
});
