const API_URL = 'http://localhost:3000/users';

const form = document.getElementById('create-user-form');
const errorNotification = document.getElementById('error-notification');

function showError(message) {
    if (errorNotification) {
        errorNotification.textContent = message;
        errorNotification.classList.remove('hidden');
    }
}

if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const usernameInput = document.getElementById('username');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirm-password');
        const roleSelect = document.getElementById('role');

        if (!usernameInput || !passwordInput || !confirmPasswordInput || !roleSelect) {
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

        window.fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, role }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Не вдалося створити користувача.');
                }
                window.location.href = 'users.html';
            })
            .catch((error) => {
                showError(error.message);
            });
    });
}
