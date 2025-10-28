// API клиент для работы с бэкендом
class ServiceCenterAPI {
    constructor() {
        this.baseURL = 'http://localhost:5000/api';
        this.token = localStorage.getItem('access_token');
    }

    // Установка токена авторизации
    setToken(token) {
        this.token = token;
        localStorage.setItem('access_token', token);
    }

    // Удаление токена
    clearToken() {
        this.token = null;
        localStorage.removeItem('access_token');
    }

    // Базовый метод для HTTP запросов
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...(this.token && { 'Authorization': `Bearer ${this.token}` })
            },
            ...options
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Ошибка сервера');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // ==================== АУТЕНТИФИКАЦИЯ ====================

    async register(userData) {
        return this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }

    async login(email, password) {
        const response = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        
        if (response.access_token) {
            this.setToken(response.access_token);
        }
        
        return response;
    }

    async logout() {
        const response = await this.request('/auth/logout', {
            method: 'POST'
        });
        
        this.clearToken();
        return response;
    }

    // ==================== КЛИЕНТЫ ====================

    async getClients() {
        return this.request('/clients');
    }

    async createClient(clientData) {
        return this.request('/clients', {
            method: 'POST',
            body: JSON.stringify(clientData)
        });
    }

    async updateClient(clientId, clientData) {
        return this.request(`/clients/${clientId}`, {
            method: 'PUT',
            body: JSON.stringify(clientData)
        });
    }

    // ==================== ЗАЯВКИ ====================

    async getTickets() {
        return this.request('/tickets');
    }

    async createTicket(ticketData) {
        return this.request('/tickets', {
            method: 'POST',
            body: JSON.stringify(ticketData)
        });
    }

    async updateTicket(ticketId, ticketData) {
        return this.request(`/tickets/${ticketId}`, {
            method: 'PUT',
            body: JSON.stringify(ticketData)
        });
    }

    async assignTicket(ticketId, masterId) {
        return this.request(`/tickets/${ticketId}/assign`, {
            method: 'POST',
            body: JSON.stringify({ master_id: masterId })
        });
    }

    // ==================== МАСТЕРЫ ====================

    async getMasters() {
        return this.request('/masters');
    }

    async createMaster(masterData) {
        return this.request('/masters', {
            method: 'POST',
            body: JSON.stringify(masterData)
        });
    }

    async getMasterTickets(masterId) {
        return this.request(`/masters/${masterId}/tickets`);
    }

    async getMastersOrders() {
        return this.request('/masters/orders');
    }

    // ==================== СКЛАД ====================

    async getInventory() {
        return this.request('/inventory');
    }

    async createInventoryItem(itemData) {
        return this.request('/inventory', {
            method: 'POST',
            body: JSON.stringify(itemData)
        });
    }

    async reserveParts(itemId, quantity) {
        return this.request(`/inventory/${itemId}/reserve`, {
            method: 'POST',
            body: JSON.stringify({ quantity })
        });
    }

    async reserveInventory(partId, quantity) {
        return this.request(`/inventory/${partId}/reserve`, {
            method: 'POST',
            body: JSON.stringify({ quantity })
        });
    }

    // ==================== ОТЧЕТЫ ====================

    async getTicketReport(startDate, endDate) {
        const params = new URLSearchParams();
        if (startDate) params.append('start_date', startDate);
        if (endDate) params.append('end_date', endDate);
        
        return this.request(`/reports/tickets?${params}`);
    }
}

// Создаем глобальный экземпляр API
window.api = new ServiceCenterAPI();

// Утилиты для работы с данными
class DataUtils {
    // Форматирование даты
    static formatDate(dateString) {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Форматирование статуса заявки
    static formatTicketStatus(status) {
        const statusMap = {
            'Новая': { text: 'Новая', class: 'status-new' },
            'В работе': { text: 'В работе', class: 'status-in-progress' },
            'Ожидает запчасти': { text: 'Ожидает запчасти', class: 'status-waiting' },
            'На согласовании': { text: 'На согласовании', class: 'status-pending' },
            'Завершена': { text: 'Завершена', class: 'status-completed' },
            'Отменена': { text: 'Отменена', class: 'status-cancelled' }
        };
        
        return statusMap[status] || { text: status, class: 'status-unknown' };
    }

    // Форматирование приоритета
    static formatPriority(priority) {
        const priorityMap = {
            'LOW': { text: 'Низкий', class: 'priority-low' },
            'MEDIUM': { text: 'Средний', class: 'priority-medium' },
            'HIGH': { text: 'Высокий', class: 'priority-high' },
            'CRITICAL': { text: 'Критический', class: 'priority-critical' }
        };
        
        return priorityMap[priority] || { text: priority, class: 'priority-unknown' };
    }

    // Валидация email
    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Валидация телефона
    static isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }
}

// Обработка ошибок API
class ErrorHandler {
    static handle(error) {
        console.error('Error:', error);
        
        // Показываем пользователю понятное сообщение об ошибке
        let message = 'Произошла ошибка';
        
        if (error.message.includes('401')) {
            message = 'Необходимо войти в систему';
            // Перенаправляем на страницу входа
            window.location.href = '/login.html';
        } else if (error.message.includes('403')) {
            message = 'Недостаточно прав доступа';
        } else if (error.message.includes('404')) {
            message = 'Ресурс не найден';
        } else if (error.message.includes('500')) {
            message = 'Ошибка сервера';
        } else {
            message = error.message || 'Неизвестная ошибка';
        }
        
        // Показываем уведомление пользователю
        this.showNotification(message, 'error');
    }

    static showNotification(message, type = 'info') {
        // Создаем элемент уведомления
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Добавляем стили
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            z-index: 10000;
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        // Цвета в зависимости от типа
        const colors = {
            'info': '#007bff',
            'success': '#28a745',
            'warning': '#ffc107',
            'error': '#dc3545'
        };
        
        notification.style.backgroundColor = colors[type] || colors.info;
        
        // Добавляем на страницу
        document.body.appendChild(notification);
        
        // Удаляем через 5 секунд
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем авторизацию
    const token = localStorage.getItem('access_token');
    if (token) {
        api.setToken(token);
    }
    
    // Добавляем обработчики для всех форм
    const forms = document.querySelectorAll('form[data-api]');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
});

// Обработчик отправки форм
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const action = form.dataset.api;
    const method = form.method || 'POST';
    
    try {
        // Собираем данные формы
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Вызываем соответствующий API метод
        let result;
        switch (action) {
            case 'login':
                result = await api.login(data.email, data.password);
                break;
            case 'register':
                result = await api.register(data);
                break;
            case 'create-client':
                result = await api.createClient(data);
                break;
            case 'create-master':
                result = await api.createMaster(data);
                break;
            case 'create-ticket':
                result = await api.createTicket(data);
                break;
            default:
                throw new Error('Неизвестное действие формы');
        }
        
        // Показываем успешное уведомление
        ErrorHandler.showNotification(result.message || 'Операция выполнена успешно', 'success');
        
        // Обновляем страницу или таблицу
        if (typeof refreshData === 'function') {
            refreshData();
        }
        
        // Закрываем модальное окно, если есть
        const modal = form.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
            form.reset();
        }
        
    } catch (error) {
        ErrorHandler.handle(error);
    }
}
