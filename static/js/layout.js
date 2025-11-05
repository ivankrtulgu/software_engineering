document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('userDropdownToggle');
    const dropdown = document.getElementById('userDropdown');

    toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        dropdown.classList.toggle('header__user-dropdown--active');
    });

    // Закрытие при клике вне меню
    document.addEventListener('click', function (e) {
        if (!toggle.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('header__user-dropdown--active');
        }
    });
});

// document.addEventListener('DOMContentLoaded', () => {
//     const logoutBtn = document.getElementById('logoutButton');
//     if (logoutBtn) {
//         logoutBtn.addEventListener('click', async (event) => {
//             event.preventDefault(); // чтобы ссылка не прыгала
//             try {
//                 await api.logout();  // вызываем API logout
//                 window.location.href = '/auth/login'; // редирект на страницу входа
//             } catch (error) {
//                 ErrorHandler.handle(error); // если что-то пошло не так
//             }
//         });
//     }
// });

// Переключение бокового меню
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.querySelector('.header__menu-toggle');

    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('sidebar--collapsed');
        if (sidebar.classList.contains('sidebar--collapsed')) {
        sidebar.style.display = 'none';
        } else {
        sidebar.style.display = 'flex';
        }
    });
});
