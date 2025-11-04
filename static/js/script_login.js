const form = document.getElementById('loginForm');
const loginInput = document.getElementById('login');
const passwordInput = document.getElementById('password');

form.addEventListener('input', () => {
    localStorage.setItem('login_form_data', JSON.stringify({
    login: loginInput.value,
    }));
});

window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('login_form_data');
    if (saved) {
    try {
        const data = JSON.parse(saved);
        if (data.login) loginInput.value = data.login;
    } catch (e) {
        console.warn('Ошибка при чтении localStorage:', e);
    }
    }
});