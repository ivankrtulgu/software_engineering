// -*- coding: utf-8 -*-
/**
 * Скрипт для интерфейса мастера
 */

let currentOrderId = null;

// Проверка авторизации при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('access_token');
    if (!token) {
        window.location.href = '/login';
        return;
    }

    // Загружаем данные пользователя
    loadUserProfile();
    
    // Загружаем заказы
    loadOrders();
    
    // Загружаем запчасти
    loadParts();
    
    // Настраиваем навигацию
    setupNavigation();
});

// Настройка навигации
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Убираем активный класс со всех ссылок и секций
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Добавляем активный класс к выбранной ссылке и секции
            this.classList.add('active');
            const targetSection = this.getAttribute('data-section');
            document.getElementById(targetSection + '-section').classList.add('active');
        });
    });
}

// Загрузка профиля пользователя
async function loadUserProfile() {
    try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        document.getElementById('userName').textContent = user.name || 'Мастер';
        document.getElementById('profileName').value = user.name || '';
        document.getElementById('profileEmail').value = user.email || '';
        document.getElementById('profileSpecialization').value = user.specialization || 'Ремонт техники';
    } catch (error) {
        console.error('Ошибка загрузки профиля:', error);
    }
}

// Загрузка заказов мастера
async function loadOrders() {
    try {
        const response = await api.getMastersOrders();
        renderOrdersTable(response.orders || []);
    } catch (error) {
        console.error('Ошибка загрузки заказов:', error);
        ErrorHandler.handle(error);
    }
}

// Отображение таблицы заказов
function renderOrdersTable(orders) {
    const tbody = document.getElementById('ordersTableBody');
    tbody.innerHTML = '';

    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center">Нет назначенных заказов</td></tr>';
        return;
    }

    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.client_name || 'Не указан'}</td>
            <td>${order.device || 'Не указано'}</td>
            <td>${order.description || 'Нет описания'}</td>
            <td><span class="priority priority-${order.priority}">${getPriorityText(order.priority)}</span></td>
            <td><span class="status status-${order.status}">${getStatusText(order.status)}</span></td>
            <td>${formatDate(order.created_at)}</td>
            <td>
                <button onclick="openOrderModal(${order.id})" class="btn btn-sm btn-primary">Работать</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Загрузка запчастей
async function loadParts() {
    try {
        const response = await api.getInventory();
        renderPartsTable(response.inventory || []);
    } catch (error) {
        console.error('Ошибка загрузки запчастей:', error);
        ErrorHandler.handle(error);
    }
}

// Отображение таблицы запчастей
function renderPartsTable(parts) {
    const tbody = document.getElementById('partsTableBody');
    tbody.innerHTML = '';

    if (parts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center">Нет запчастей в наличии</td></tr>';
        return;
    }

    parts.forEach(part => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${part.name}</td>
            <td>${part.quantity}</td>
            <td>${part.price ? part.price + ' ₽' : 'Не указана'}</td>
            <td>
                <button onclick="reservePart(${part.id})" class="btn btn-sm btn-secondary">Зарезервировать</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Открытие модального окна для работы с заказом
function openOrderModal(orderId) {
    currentOrderId = orderId;
    document.getElementById('orderModal').style.display = 'block';
    
    // Сброс формы
    document.getElementById('orderWorkForm').reset();
}

// Закрытие модального окна
function closeOrderModal() {
    document.getElementById('orderModal').style.display = 'none';
    currentOrderId = null;
}

// Обработка формы работы с заказом
document.getElementById('orderWorkForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!currentOrderId) return;

    const formData = {
        status: document.getElementById('orderStatus').value,
        comment: document.getElementById('orderComment').value,
        work_hours: parseFloat(document.getElementById('workHours').value) || 0
    };

    try {
        await api.updateTicket(currentOrderId, formData);
        closeOrderModal();
        loadOrders(); // Обновляем список заказов
        ErrorHandler.showSuccess('Изменения сохранены');
    } catch (error) {
        console.error('Ошибка обновления заказа:', error);
        ErrorHandler.handle(error);
    }
});

// Резервирование запчасти
async function reservePart(partId) {
    const quantity = prompt('Введите количество для резервирования:');
    if (!quantity || isNaN(quantity) || quantity <= 0) {
        return;
    }

    try {
        await api.reserveInventory(partId, parseInt(quantity));
        loadParts(); // Обновляем список запчастей
        ErrorHandler.showSuccess('Запчасть зарезервирована');
    } catch (error) {
        console.error('Ошибка резервирования запчасти:', error);
        ErrorHandler.handle(error);
    }
}

// Фильтрация заказов по статусу
function filterOrders() {
    const statusFilter = document.getElementById('statusFilter').value;
    const rows = document.querySelectorAll('#ordersTableBody tr');
    
    rows.forEach(row => {
        if (statusFilter === '') {
            row.style.display = '';
        } else {
            const statusCell = row.querySelector('.status');
            if (statusCell && statusCell.classList.contains(`status-${statusFilter}`)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    });
}

// Обновление заказов
function refreshOrders() {
    loadOrders();
}

// Обновление запчастей
function refreshParts() {
    loadParts();
}

// Выход из системы
function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    window.location.href = '/login';
}

// Вспомогательные функции
function getPriorityText(priority) {
    const priorities = {
        'low': 'Низкий',
        'medium': 'Средний',
        'high': 'Высокий',
        'urgent': 'Срочный'
    };
    return priorities[priority] || priority;
}

function getStatusText(status) {
    const statuses = {
        'new': 'Новая',
        'assigned': 'Назначена',
        'in_progress': 'В работе',
        'waiting_parts': 'Ожидает запчасти',
        'completed': 'Завершена',
        'cancelled': 'Отменена'
    };
    return statuses[status] || status;
}

function formatDate(dateString) {
    if (!dateString) return 'Не указана';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU') + ' ' + date.toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'});
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    const modal = document.getElementById('orderModal');
    if (event.target === modal) {
        closeOrderModal();
    }
}
