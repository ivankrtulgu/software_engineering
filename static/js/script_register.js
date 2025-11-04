// Получаем элементы формы
const form = document.getElementById('registerForm');
const fullNameInput = document.getElementById('registerFullName');
const loginInput = document.getElementById('registerLogin');

// Сохраняем данные в localStorage при вводе
form.addEventListener('input', () => {
    const formData = {
        full_name: fullNameInput.value,
        login: loginInput.value
    };
    localStorage.setItem('register_form_data', JSON.stringify(formData));
});

// При загрузке страницы подставляем сохранённые значения
window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('register_form_data');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            if (data.full_name) fullNameInput.value = data.full_name;
            if (data.login) loginInput.value = data.login;
        } catch (e) {
            console.warn('Ошибка при чтении localStorage:', e);
        }
    }
});
