// Глобальные переменные
let currentTab = 'all';
let currentPriority = 'all';
let currentPage = 1;
const ticketsPerPage = 3;
let allTickets = document.querySelectorAll('.ticket');
let filteredTickets = [...allTickets];

// Функция обновления видимости тикетов
function updateTicketVisibility() {
    const searchQuery = document.querySelector('.filters__search-input').value.toLowerCase().trim();
    
    filteredTickets = [...allTickets].filter(ticket => {
    const title = ticket.querySelector('.ticket__title').textContent.toLowerCase();
    const description = ticket.querySelector('.ticket__description').textContent.toLowerCase();
    const author = ticket.querySelector('.ticket__author-name').textContent.toLowerCase();
    
    const matchesSearch = !searchQuery || 
        title.includes(searchQuery) || 
        description.includes(searchQuery) || 
        author.includes(searchQuery);
    
    const matchesTab = currentTab === 'all' || ticket.dataset.status === currentTab;
    const matchesPriority = currentPriority === 'all' || ticket.dataset.priority === currentPriority;
    
    return matchesSearch && matchesTab && matchesPriority;
    });

    // Скрываем все тикеты
    allTickets.forEach(ticket => ticket.classList.add('ticket--hidden'));
    
    // Показываем отфильтрованные
    filteredTickets.forEach(ticket => ticket.classList.remove('ticket--hidden'));
    
    // Если нет результатов
    if (filteredTickets.length === 0) {
    const noResults = document.createElement('div');
    noResults.className = 'no-results';
    noResults.textContent = 'No tickets found matching your criteria.';
    document.querySelector('.ticket-list').appendChild(noResults);
    } else {
    const noResults = document.querySelector('.no-results');
    if (noResults) noResults.remove();
    }

    // Обновляем пагинацию
    updatePagination();
}

// Функция обновления пагинации
function updatePagination() {
    const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
    
    // Обновляем кнопки Previous/Next
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= totalPages;
    
    prevBtn.classList.toggle('pagination__button--disabled', currentPage <= 1);
    nextBtn.classList.toggle('pagination__button--disabled', currentPage >= totalPages);
    
    // Обновляем номера страниц
    const pageButtons = document.querySelectorAll('.pagination__button[data-page]');
    pageButtons.forEach(btn => btn.remove());
    
    // Добавляем новые кнопки страниц
    for (let i = 1; i <= Math.min(totalPages, 3); i++) {
    const btn = document.createElement('button');
    btn.className = 'pagination__button';
    if (i === currentPage) btn.classList.add('pagination__button--active');
    btn.setAttribute('data-page', i);
    btn.textContent = i;
    btn.addEventListener('click', () => {
        currentPage = i;
        updatePagination();
        showCurrentPage();
    });
    document.querySelector('.pagination').insertBefore(btn, nextBtn);
    }
    
    // Показываем текущую страницу
    showCurrentPage();
}

// Функция показа текущей страницы
function showCurrentPage() {
    const startIndex = (currentPage - 1) * ticketsPerPage;
    const endIndex = startIndex + ticketsPerPage;
    
    allTickets.forEach(ticket => ticket.classList.add('ticket--hidden'));
    
    filteredTickets.slice(startIndex, endIndex).forEach(ticket => {
    ticket.classList.remove('ticket--hidden');
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    // Выпадающее меню приоритетов
    const priorityBtn = document.querySelector('.filters__priority-btn');
    const priorityDropdown = document.querySelector('.filters__priority-dropdown');
    
    priorityBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    priorityDropdown.classList.toggle('filters__priority-dropdown--visible');
    });
    
    // Закрытие выпадающего меню при клике вне его
    document.addEventListener('click', function(e) {
    if (!priorityBtn.contains(e.target) && !priorityDropdown.contains(e.target)) {
        priorityDropdown.classList.remove('filters__priority-dropdown--visible');
    }
    });
    
    // Обработчики для опций приоритетов
    document.querySelectorAll('.filters__priority-option').forEach(option => {
    option.addEventListener('click', function() {
        currentPriority = this.dataset.priority;
        priorityBtn.innerHTML = `${this.textContent} <span>▼</span>`;
        priorityDropdown.classList.remove('filters__priority-dropdown--visible');
        updateTicketVisibility();
    });
    });
    
    // Обработчики для вкладок
    document.querySelectorAll('.tabs__item').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.tabs__item').forEach(t => t.classList.remove('tabs__item--active'));
        this.classList.add('tabs__item--active');
        currentTab = this.dataset.tab;
        updateTicketVisibility();
    });
    });
    
    // Обработчик поиска
    document.querySelector('.filters__search-input').addEventListener('input', updateTicketVisibility);
    
    // Обработчик кнопки "New Ticket"
    document.querySelector('.filters__new-ticket').addEventListener('click', function() {
    alert('Creating new ticket...');
    // Здесь можно добавить логику создания нового тикета
    });
    
    // Обработчики пагинации
    document.getElementById('prevBtn').addEventListener('click', function() {
    if (currentPage > 1) {
        currentPage--;
        updatePagination();
    }
    });
    
    document.getElementById('nextBtn').addEventListener('click', function() {
    const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        updatePagination();
    }
    });
    
    // Инициализация
    updateTicketVisibility();
});

document.addEventListener('DOMContentLoaded', function() {
// Боковое меню
const sidebar = document.querySelector('.sidebar');
const menuToggle = document.querySelector('.header__menu-toggle');

// // Страницы заглушки
// const pages = {
//     dashboard: `
//     <div class="page-content">
//         <h1 class="page-content__title">Dashboard</h1>
//         <p>Dashboard content goes here.</p>
//     </div>
//     `,
//     users: `
//     <div class="page-content">
//         <h1 class="page-content__title">Users</h1>
//         <p>Users management page.</p>
//     </div>
//     `,
//     tickets: `
//     <div class="page-content">
//         <h1 class="page-content__title">Tickets</h1>
//         <p>Tickets management page.</p>
//     </div>
//     `,
//     officials: `
//     <div class="page-content">
//         <h1 class="page-content__title">Officials</h1>
//         <p>Officials management page.</p>
//     </div>
//     `,
//     settings: `
//     <div class="page-content">
//         <h1 class="page-content__title">Site Settings</h1>
//         <p>Site configuration page.</p>
//     </div>
//     `
// };

// Переключение бокового меню
menuToggle.addEventListener('click', function() {
    sidebar.classList.toggle('sidebar--collapsed');
    if (sidebar.classList.contains('sidebar--collapsed')) {
    sidebar.style.display = 'none';
    } else {
    sidebar.style.display = 'flex';
    }
});

// Обработчики для навигации по вкладкам
document.querySelectorAll('.sidebar__nav-item').forEach((item, index) => {
    item.addEventListener('click', function() {
    // Убираем активный класс у всех элементов
    document.querySelectorAll('.sidebar__nav-item').forEach(el => {
        el.classList.remove('sidebar__nav-item--active');
    });
    
    // Добавляем активный класс текущему элементу
    this.classList.add('sidebar__nav-item--active');
    
    // Получаем ключ страницы из текста элемента
    const pageKey = [
        'dashboard',
        'users', 
        'tickets',
        'officials',
        'settings'
    ][index];
    
    // Заменяем содержимое main-content
    document.querySelector('.main-content').innerHTML = pages[pageKey];
    });
});
});