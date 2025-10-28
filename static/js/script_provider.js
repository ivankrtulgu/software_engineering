// // Глобальные переменные
// let currentTab = 'all';
// let currentPriority = 'all';
// let currentPage = 1;
// const ticketsPerPage = 3;
// let allTickets = document.querySelectorAll('.ticket');
// let filteredTickets = [...allTickets];

// // Функция обновления видимости тикетов
// function updateTicketVisibility() {
//     const searchQuery = document.querySelector('.filters__search-input').value.toLowerCase().trim();
    
//     filteredTickets = [...allTickets].filter(ticket => {
//     const title = ticket.querySelector('.ticket__title').textContent.toLowerCase();
//     const description = ticket.querySelector('.ticket__description').textContent.toLowerCase();
//     const author = ticket.querySelector('.ticket__author-name').textContent.toLowerCase();
    
//     const matchesSearch = !searchQuery || 
//         title.includes(searchQuery) || 
//         description.includes(searchQuery) || 
//         author.includes(searchQuery);
    
//     const matchesTab = currentTab === 'all' || ticket.dataset.status === currentTab;
//     const matchesPriority = currentPriority === 'all' || ticket.dataset.priority === currentPriority;
    
//     return matchesSearch && matchesTab && matchesPriority;
//     });

//     // Скрываем все тикеты
//     allTickets.forEach(ticket => ticket.classList.add('ticket--hidden'));
    
//     // Показываем отфильтрованные
//     filteredTickets.forEach(ticket => ticket.classList.remove('ticket--hidden'));
    
//     // Если нет результатов
//     if (filteredTickets.length === 0) {
//     const noResults = document.createElement('div');
//     noResults.className = 'no-results';
//     noResults.textContent = 'No tickets found matching your criteria.';
//     document.querySelector('.ticket-list').appendChild(noResults);
//     } else {
//     const noResults = document.querySelector('.no-results');
//     if (noResults) noResults.remove();
//     }

//     // Обновляем пагинацию
//     updatePagination();
// }

// // Функция обновления пагинации
// function updatePagination() {
//     const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
    
//     // Обновляем кнопки Previous/Next
//     const prevBtn = document.getElementById('prevBtn');
//     const nextBtn = document.getElementById('nextBtn');
    
//     prevBtn.disabled = currentPage <= 1;
//     nextBtn.disabled = currentPage >= totalPages;
    
//     prevBtn.classList.toggle('pagination__button--disabled', currentPage <= 1);
//     nextBtn.classList.toggle('pagination__button--disabled', currentPage >= totalPages);
    
//     // Обновляем номера страниц
//     const pageButtons = document.querySelectorAll('.pagination__button[data-page]');
//     pageButtons.forEach(btn => btn.remove());
    
//     // Добавляем новые кнопки страниц
//     for (let i = 1; i <= Math.min(totalPages, 3); i++) {
//     const btn = document.createElement('button');
//     btn.className = 'pagination__button';
//     if (i === currentPage) btn.classList.add('pagination__button--active');
//     btn.setAttribute('data-page', i);
//     btn.textContent = i;
//     btn.addEventListener('click', () => {
//         currentPage = i;
//         updatePagination();
//         showCurrentPage();
//     });
//     document.querySelector('.pagination').insertBefore(btn, nextBtn);
//     }
    
//     // Показываем текущую страницу
//     showCurrentPage();
// }

// // Функция показа текущей страницы
// function showCurrentPage() {
//     const startIndex = (currentPage - 1) * ticketsPerPage;
//     const endIndex = startIndex + ticketsPerPage;
    
//     allTickets.forEach(ticket => ticket.classList.add('ticket--hidden'));
    
//     filteredTickets.slice(startIndex, endIndex).forEach(ticket => {
//     ticket.classList.remove('ticket--hidden');
//     });
// }

// // Инициализация
// document.addEventListener('DOMContentLoaded', () => {
//     // Выпадающее меню приоритетов
//     const priorityBtn = document.querySelector('.filters__priority-btn');
//     const priorityDropdown = document.querySelector('.filters__priority-dropdown');
    
//     priorityBtn.addEventListener('click', function(e) {
//     e.stopPropagation();
//     priorityDropdown.classList.toggle('filters__priority-dropdown--visible');
//     });
    
//     // Закрытие выпадающего меню при клике вне его
//     document.addEventListener('click', function(e) {
//     if (!priorityBtn.contains(e.target) && !priorityDropdown.contains(e.target)) {
//         priorityDropdown.classList.remove('filters__priority-dropdown--visible');
//     }
//     });
    
//     // Обработчики для опций приоритетов
//     document.querySelectorAll('.filters__priority-option').forEach(option => {
//     option.addEventListener('click', function() {
//         currentPriority = this.dataset.priority;
//         priorityBtn.innerHTML = `${this.textContent} <span>▼</span>`;
//         priorityDropdown.classList.remove('filters__priority-dropdown--visible');
//         updateTicketVisibility();
//     });
//     });
    
//     // Обработчики для вкладок
//     document.querySelectorAll('.tabs__item').forEach(tab => {
//     tab.addEventListener('click', function() {
//         document.querySelectorAll('.tabs__item').forEach(t => t.classList.remove('tabs__item--active'));
//         this.classList.add('tabs__item--active');
//         currentTab = this.dataset.tab;
//         updateTicketVisibility();
//     });
//     });
    
//     // Обработчик поиска
//     document.querySelector('.filters__search-input').addEventListener('input', updateTicketVisibility);
    
//     // Обработчик кнопки "New Ticket"
//     document.querySelector('.filters__new-ticket').addEventListener('click', function() {
//     alert('Creating new ticket...');
//     // Здесь можно добавить логику создания нового тикета
//     });
    
//     // Обработчики пагинации
//     document.getElementById('prevBtn').addEventListener('click', function() {
//     if (currentPage > 1) {
//         currentPage--;
//         updatePagination();
//     }
//     });
    
//     document.getElementById('nextBtn').addEventListener('click', function() {
//     const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);
//     if (currentPage < totalPages) {
//         currentPage++;
//         updatePagination();
//     }
//     });
    
//     // Инициализация
//     updateTicketVisibility();
// });

// document.addEventListener('DOMContentLoaded', function() {
// // Боковое меню
// const sidebar = document.querySelector('.sidebar');
// const menuToggle = document.querySelector('.header__menu-toggle');

// // // Страницы заглушки
// // const pages = {
// //     dashboard: `
// //     <div class="page-content">
// //         <h1 class="page-content__title">Dashboard</h1>
// //         <p>Dashboard content goes here.</p>
// //     </div>
// //     `,
// //     users: `
// //     <div class="page-content">
// //         <h1 class="page-content__title">Users</h1>
// //         <p>Users management page.</p>
// //     </div>
// //     `,
// //     tickets: `
// //     <div class="page-content">
// //         <h1 class="page-content__title">Tickets</h1>
// //         <p>Tickets management page.</p>
// //     </div>
// //     `,
// //     officials: `
// //     <div class="page-content">
// //         <h1 class="page-content__title">Officials</h1>
// //         <p>Officials management page.</p>
// //     </div>
// //     `,
// //     settings: `
// //     <div class="page-content">
// //         <h1 class="page-content__title">Site Settings</h1>
// //         <p>Site configuration page.</p>
// //     </div>
// //     `
// // };

// // Переключение бокового меню
// menuToggle.addEventListener('click', function() {
//     sidebar.classList.toggle('sidebar--collapsed');
//     if (sidebar.classList.contains('sidebar--collapsed')) {
//     sidebar.style.display = 'none';
//     } else {
//     sidebar.style.display = 'flex';
//     }
// });

// // Обработчики для навигации по вкладкам
// document.querySelectorAll('.sidebar__nav-item').forEach((item, index) => {
//     item.addEventListener('click', function() {
//     // Убираем активный класс у всех элементов
//     document.querySelectorAll('.sidebar__nav-item').forEach(el => {
//         el.classList.remove('sidebar__nav-item--active');
//     });
    
//     // Добавляем активный класс текущему элементу
//     this.classList.add('sidebar__nav-item--active');
    
//     // Получаем ключ страницы из текста элемента
//     const pageKey = [
//         'dashboard',
//         'users', 
//         'tickets',
//         'officials',
//         'settings'
//     ][index];
    
//     // Заменяем содержимое main-content
//     document.querySelector('.main-content').innerHTML = pages[pageKey];
//     });
// });
// });

// document.addEventListener('DOMContentLoaded', function() {
//   const table = document.querySelector('.clients-table tbody');

//   // Функция для редактирования ячейки
//   function makeEditable(cell) {
//     const currentValue = cell.textContent.trim();
//     const fieldName = cell.dataset.field;

//     // Создаем input/textarea в зависимости от поля
//     let input;
//     if (fieldName === 'info' || fieldName === 'address') {
//       input = document.createElement('textarea');
//       input.rows = 2;
//       input.style.resize = 'vertical';
//     } else {
//       input = document.createElement('input');
//       input.type = 'text';
//     }

//     input.value = currentValue;
//     input.className = 'editing-input';

//     // Заменяем содержимое ячейки на input
//     cell.innerHTML = '';
//     cell.appendChild(input);
//     cell.classList.add('editing');

//     // Фокус на поле
//     input.focus();

//     // Сохранение при потере фокуса или нажатии Enter
//     const saveValue = () => {
//       const newValue = input.value.trim();
//       if (newValue !== currentValue) {
//         cell.textContent = newValue;
//         // Здесь можно отправить AJAX-запрос на сервер, если нужно
//         console.log(`Поле "${fieldName}" обновлено: ${currentValue} → ${newValue}`);
//       }
//       cell.classList.remove('editing');
//     };

//     input.addEventListener('blur', saveValue);
//     input.addEventListener('keydown', function(e) {
//       if (e.key === 'Enter') {
//         saveValue();
//       } else if (e.key === 'Escape') {
//         cell.textContent = currentValue;
//         cell.classList.remove('editing');
//       }
//     });
//   }

//   // Добавляем обработчик двойного клика
//   table.addEventListener('dblclick', function(e) {
//     const cell = e.target.closest('td');
//     if (cell && !cell.classList.contains('editing')) {
//       makeEditable(cell);
//     }
//   });
// });

document.addEventListener('DOMContentLoaded', function () {
  // Проверяем авторизацию
  const token = localStorage.getItem('access_token');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  // Загружаем данные при загрузке страницы
  loadClients();
  loadTickets();
  loadMasters();

  // === 1. Редактирование таблицы ===
  const table = document.querySelector('.clients-table tbody');
  if (table) {
    function makeEditable(cell) {
      const currentValue = cell.textContent.trim();
      const fieldName = cell.dataset.field;
      const row = cell.closest('tr');
      const clientId = row.dataset.clientId;

      let input;
      if (fieldName === 'info' || fieldName === 'address') {
        input = document.createElement('textarea');
        input.rows = 2;
        input.style.resize = 'vertical';
      } else {
        input = document.createElement('input');
        input.type = 'text';
      }

      input.value = currentValue;
      input.style.width = '100%';
      input.style.padding = '4px 6px';
      input.style.border = '1px solid #6c5ce7';
      input.style.borderRadius = '4px';
      input.style.outline = 'none';
      input.style.fontSize = '14px';

      cell.innerHTML = '';
      cell.appendChild(input);
      cell.classList.add('editing');

      input.focus();

      const saveValue = async () => {
        const newValue = input.value.trim();
        if (newValue !== currentValue && clientId) {
          try {
            const updateData = { [fieldName]: newValue };
            await api.updateClient(clientId, updateData);
            cell.textContent = newValue;
            ErrorHandler.showNotification('Клиент обновлен', 'success');
          } catch (error) {
            ErrorHandler.handle(error);
            cell.textContent = currentValue;
          }
        } else {
          cell.textContent = newValue;
        }
        cell.classList.remove('editing');
      };

      input.addEventListener('blur', saveValue);
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          saveValue();
        } else if (e.key === 'Escape') {
          cell.textContent = currentValue;
          cell.classList.remove('editing');
        }
      });
    }

    table.addEventListener('dblclick', function (e) {
      const cell = e.target.closest('td');
      if (cell && !cell.classList.contains('editing') && cell.dataset.field) {
        makeEditable(cell);
      }
    });
  }

  // === 2. Переключение сайдбара (оставляем, если нужно) ===
  const sidebar = document.querySelector('.sidebar');
  const menuToggle = document.querySelector('.header__menu-toggle');

  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', function () {
      sidebar.classList.toggle('sidebar--collapsed');
      if (sidebar.classList.contains('sidebar--collapsed')) {
        sidebar.style.display = 'none';
      } else {
        sidebar.style.display = 'flex';
      }
    });
  }

  // === 3. Навигация по сайдбару (если у вас есть другие страницы) ===
  // Если вы НЕ используете динамическую подгрузку других страниц — можно удалить
  document.querySelectorAll('.sidebar__nav-item').forEach((item, index) => {
    item.addEventListener('click', function () {
      document.querySelectorAll('.sidebar__nav-item').forEach(el => {
        el.classList.remove('sidebar__nav-item--active');
      });
      this.classList.add('sidebar__nav-item--active');
      // Если вы не меняете содержимое страницы динамически — этот блок можно убрать
    });
  });

  // === 4. Кнопка "Новая заявка" ===
  const newTicketBtn = document.querySelector('.filters__new-ticket');
  if (newTicketBtn) {
    newTicketBtn.addEventListener('click', function () {
      // Открываем модальное окно создания заявки
      const modal = document.getElementById('createTicketModal');
      if (modal) {
        modal.style.display = 'block';
      }
    });
  }

  // === 5. Поиск по таблице (опционально, но полезно) ===
  const searchInput = document.querySelector('.filters__search-input');
  const rows = document.querySelectorAll('.clients-table tbody tr');

  if (searchInput && rows.length > 0) {
    searchInput.addEventListener('input', function () {
      const query = this.value.toLowerCase().trim();

      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
      });
    });
  }

  // === 5. ИЗМЕНЕНИЕ ШИРИНЫ СТОЛБЦОВ ===
//   function initColumnResize() {
//     const table = document.querySelector('.clients-table');
//     const headers = table.querySelectorAll('th');

//     headers.forEach((header, index) => {
//       // Удаляем старый хэндл, если есть (на случай повторного вызова)
//       const oldHandle = header.querySelector('.resize-handle');
//       if (oldHandle) oldHandle.remove();

//       const resizeHandle = document.createElement('div');
//       resizeHandle.className = 'resize-handle';
//       resizeHandle.style.cssText = `
//         position: absolute;
//         right: 0;
//         top: 0;
//         bottom: 0;
//         width: 6px;
//         cursor: col-resize;
//         background: transparent;
//         z-index: 10;
//       `;
//       header.style.position = 'relative';
//       header.appendChild(resizeHandle);

//       let startX, startWidth;

//       resizeHandle.addEventListener('mousedown', function(e) {
//         // Предотвращаем выделение текста и конфликты с редактированием
//         e.preventDefault();
//         startX = e.clientX;
//         startWidth = header.offsetWidth;

//         const onMouseMove = (e) => {
//           const delta = e.clientX - startX;
//           const newWidth = Math.max(50, startWidth + delta); // мин. ширина 50px
//           header.style.width = `${newWidth}px`;
//           header.style.minWidth = `${newWidth}px`;

//           // Применяем ширину ко всем ячейкам в этом столбце
//           const cells = table.querySelectorAll(`tbody tr td:nth-child(${index + 1})`);
//           cells.forEach(cell => {
//             cell.style.width = `${newWidth}px`;
//             cell.style.minWidth = `${newWidth}px`;
//           });
//         };

//         const onMouseUp = () => {
//           document.removeEventListener('mousemove', onMouseMove);
//           document.removeEventListener('mouseup', onMouseUp);
//         };

//         document.addEventListener('mousemove', onMouseMove);
//         document.addEventListener('mouseup', onMouseUp);
//       });
//     });
//   }

    function initColumnResize() {
    const table = document.querySelector('.clients-table');
    const headers = Array.from(table.querySelectorAll('th'));

    // Устанавливаем начальную ширину для ВСЕХ столбцов (чтобы избежать "прыжков")
    headers.forEach((header, index) => {
        if (!header.style.width) {
        // Запоминаем естественную ширину при первой загрузке
        const naturalWidth = header.offsetWidth;
        header.style.width = `${naturalWidth}px`;
        header.style.minWidth = `${naturalWidth}px`;

        // Применяем к ячейкам
        const cells = table.querySelectorAll(`tbody tr td:nth-child(${index + 1})`);
        cells.forEach(cell => {
            cell.style.width = `${naturalWidth}px`;
            cell.style.minWidth = `${naturalWidth}px`;
        });
        }

        // Удаляем старый хэндл
        const oldHandle = header.querySelector('.resize-handle');
        if (oldHandle) oldHandle.remove();

        const resizeHandle = document.createElement('div');
        resizeHandle.className = 'resize-handle';
        resizeHandle.style.cssText = `
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 6px;
        cursor: col-resize;
        background: transparent;
        z-index: 10;
        `;
        header.style.position = 'relative';
        header.appendChild(resizeHandle);

        let startX, startWidth;

        resizeHandle.addEventListener('mousedown', function(e) {
        e.preventDefault();
        startX = e.clientX;
        startWidth = parseFloat(header.style.width) || header.offsetWidth;

        const onMouseMove = (e) => {
            const delta = e.clientX - startX;
            const newWidth = Math.max(50, startWidth + delta); // мин. 50px

            // МЕНЯЕМ ТОЛЬКО ЭТОТ СТОЛБЕЦ
            header.style.width = `${newWidth}px`;
            header.style.minWidth = `${newWidth}px`;

            const cells = table.querySelectorAll(`tbody tr td:nth-child(${headers.indexOf(header) + 1})`);
            cells.forEach(cell => {
            cell.style.width = `${newWidth}px`;
            cell.style.minWidth = `${newWidth}px`;
            });

            // Обновляем min-width таблицы, чтобы появился скролл при расширении
            const totalWidth = headers.reduce((sum, h) => {
            return sum + (parseFloat(h.style.width) || h.offsetWidth);
            }, 0);
            table.style.minWidth = `${Math.max(1400, totalWidth)}px`;
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        });
    });
    }

  // === 6. ИЗМЕНЕНИЕ ВЫСОТЫ СТРОК ===
  function initRowResize() {
    const table = document.querySelector('.clients-table');
    const rows = table.querySelectorAll('tbody tr');

    rows.forEach(row => {
      const oldHandle = row.querySelector('.resize-handle-row');
      if (oldHandle) oldHandle.remove();

      const resizeHandle = document.createElement('div');
      resizeHandle.className = 'resize-handle-row';
      resizeHandle.style.cssText = `
        position: absolute;
        left: 0;
        right: 0;
        bottom: -4px;
        height: 6px;
        cursor: row-resize;
        background: transparent;
        z-index: 10;
      `;
      row.style.position = 'relative';
      row.appendChild(resizeHandle);

      let startY, startHeight;

      resizeHandle.addEventListener('mousedown', function(e) {
        e.preventDefault();
        startY = e.clientY;
        startHeight = row.offsetHeight;

        const onMouseMove = (e) => {
          const delta = e.clientY - startY;
          const newHeight = Math.max(30, startHeight + delta); // мин. высота 30px
          row.style.height = `${newHeight}px`;
        };

        const onMouseUp = () => {
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      });
    });
  }

  // === 7. ЗАПУСК ИНИЦИАЛИЗАЦИИ ===
  initColumnResize();
//   initRowResize();

    // Обработчики для вкладок
    document.querySelectorAll('.tabs__item').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.tabs__item').forEach(t => t.classList.remove('tabs__item--active'));
        this.classList.add('tabs__item--active');
        currentTab = this.dataset.tab;
        updateTicketVisibility();
    });
    });

  // === 6. Вкладки и фильтры приоритета — НЕ нужны для таблицы клиентов ===
  // Их можно полностью удалить, так как таблица не использует статусы "new", "resolved" и т.д.
});

// Функции для загрузки данных с сервера
async function loadClients() {
  try {
    const clients = await api.getClients();
    renderClientsTable(clients);
  } catch (error) {
    ErrorHandler.handle(error);
  }
}

async function loadTickets() {
  try {
    const tickets = await api.getTickets();
    renderTicketsTable(tickets);
  } catch (error) {
    ErrorHandler.handle(error);
  }
}

async function loadMasters() {
  try {
    const masters = await api.getMasters();
    renderMastersTable(masters);
  } catch (error) {
    ErrorHandler.handle(error);
  }
}

// Функции для отображения данных в таблицах
function renderClientsTable(clients) {
  const tbody = document.querySelector('.clients-table tbody');
  if (!tbody) return;

  tbody.innerHTML = '';
  
  clients.forEach(client => {
    const row = document.createElement('tr');
    row.dataset.clientId = client.id;
    row.innerHTML = `
      <td data-field="name">${client.name || '-'}</td>
      <td data-field="group">${client.group || '-'}</td>
      <td data-field="mobile_phone">${client.mobile_phone || '-'}</td>
      <td data-field="phone">${client.phone || '-'}</td>
      <td data-field="address">${client.address || '-'}</td>
      <td data-field="contact_person">${client.contact_person || '-'}</td>
      <td data-field="email">${client.email || '-'}</td>
      <td data-field="additional_info">${client.additional_info || '-'}</td>
      <td data-field="author">${client.created_by || '-'}</td>
      <td data-field="editor">${client.updated_by || '-'}</td>
      <td data-field="datetime">${DataUtils.formatDate(client.created_at)}</td>
    `;
    tbody.appendChild(row);
  });
}

function renderTicketsTable(tickets) {
  const tbody = document.querySelector('.tickets-table tbody');
  if (!tbody) return;

  tbody.innerHTML = '';
  
  tickets.forEach(ticket => {
    const statusInfo = DataUtils.formatTicketStatus(ticket.status);
    const priorityInfo = DataUtils.formatPriority(ticket.priority);
    
    const row = document.createElement('tr');
    row.dataset.ticketId = ticket.id;
    row.innerHTML = `
      <td data-field="status">${statusInfo.text}</td>
      <td data-field="date_received">${DataUtils.formatDate(ticket.created_at)}</td>
      <td data-field="order_number">${ticket.id}</td>
      <td data-field="client">${ticket.client ? ticket.client.name : '-'}</td>
      <td data-field="mobile">${ticket.client ? ticket.client.mobile_phone : '-'}</td>
      <td data-field="phone">${ticket.client ? ticket.client.phone : '-'}</td>
      <td data-field="address">${ticket.client ? ticket.client.address : '-'}</td>
      <td data-field="device_type">${ticket.device_type || '-'}</td>
      <td data-field="manufacturer">${ticket.manufacturer || '-'}</td>
      <td data-field="model">${ticket.model || '-'}</td>
      <td data-field="serial_number">${ticket.serial_number || '-'}</td>
      <td data-field="client_issue">${ticket.client_issue || '-'}</td>
      <td data-field="diagnosed_issue">${ticket.diagnosed_issue || '-'}</td>
      <td data-field="repair_type">${ticket.repair_type || '-'}</td>
      <td data-field="additional_info">${ticket.additional_info || '-'}</td>
    `;
    tbody.appendChild(row);
  });
}

function renderMastersTable(masters) {
  const tbody = document.querySelector('.masters-table tbody');
  if (!tbody) return;

  tbody.innerHTML = '';
  
  masters.forEach(master => {
    const row = document.createElement('tr');
    row.dataset.masterId = master.id;
    row.innerHTML = `
      <td data-field="name">${master.name || '-'}</td>
      <td data-field="specialization">${master.specialization || '-'}</td>
      <td data-field="phone">${master.phone || '-'}</td>
      <td data-field="status">${master.status || '-'}</td>
      <td data-field="active_tickets">${master.active_tickets || 0}</td>
      <td class="actions-cell">
        <button class="btn btn--primary assign-ticket-btn" data-master-id="${master.id}">
          Назначить заявку
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Функция для обновления данных (вызывается после изменений)
function refreshData() {
  const currentPage = window.location.pathname;
  if (currentPage.includes('index_provider.html')) {
    loadClients();
  } else if (currentPage.includes('index_provider_orders.html')) {
    loadTickets();
  } else if (currentPage.includes('index_provider_masters.html')) {
    loadMasters();
  }
}



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



document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('createClientModal');
  const openBtn = document.querySelector('.filters__new-client');
  const closeBtn = document.getElementById('closeModalBtn');
  const cancelBtn = document.getElementById('cancelClientBtn');
  const overlay = document.getElementById('modalOverlay');
  const form = document.getElementById('createClientForm');
  const tableBody = document.querySelector('.clients-table tbody');

  // Открытие модалки
  if (openBtn) {
    openBtn.addEventListener('click', () => {
      modal.style.display = 'block';
    });
  }

  // Закрытие модалки
  function closeModal() {
    modal.style.display = 'none';
    form.reset();
    // Сброс чекбоксов (если нужно)
    form.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = cb.name === 'is_active');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);

  // Обработка отправки формы
  if (form && tableBody) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const now = new Date().toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      // Создаём новую строку
      const row = document.createElement('tr');

      // Поля в порядке заголовков таблицы
      const fields = [
        'client', 'group', 'mobile', 'phone', 'address',
        'contact', 'email', 'info'
      ];

      fields.forEach(field => {
        const cell = document.createElement('td');
        cell.dataset.field = field;
        cell.textContent = formData.get(field) || '-';
        row.appendChild(cell);
      });

      // Автор записи (можно брать из localStorage или хардкодить)
      const authorCell = document.createElement('td');
      authorCell.dataset.field = 'author';
      authorCell.textContent = 'Приемщик'; // или document.querySelector('.header__username').textContent
      row.appendChild(authorCell);

      // Изменил запись — пока тот же
      const editorCell = document.createElement('td');
      editorCell.dataset.field = 'editor';
      editorCell.textContent = 'Приемщик';
      row.appendChild(editorCell);

      // Дата и время записи
      const datetimeCell = document.createElement('td');
      datetimeCell.dataset.field = 'datetime';
      datetimeCell.textContent = now;
      row.appendChild(datetimeCell);

      // Добавляем строку в таблицу
      tableBody.appendChild(row);

      // Закрываем модалку
      closeModal();

      // Опционально: уведомление
      alert('Клиент успешно создан!');
    });
  }
});


// === Модальное окно: Добавление мастера ===
const masterModal = document.getElementById('createMasterModal');
const openMasterBtn = document.querySelector('.filters__new-master');
const closeMasterBtn = document.getElementById('closeMasterModalBtn');
const cancelMasterBtn = document.getElementById('cancelMasterBtn');
const masterOverlay = document.getElementById('masterModalOverlay');
const masterForm = document.getElementById('createMasterForm');
const masterTableBody = document.querySelector('.masters-table tbody');

// Открытие
if (openMasterBtn) {
  openMasterBtn.addEventListener('click', () => {
    masterModal.style.display = 'block';
  });
}

// Закрытие
function closeMasterModal() {
  masterModal.style.display = 'none';
  if (masterForm) masterForm.reset();
}

if (closeMasterBtn) closeMasterBtn.addEventListener('click', closeMasterModal);
if (cancelMasterBtn) cancelMasterBtn.addEventListener('click', closeMasterModal);
if (masterOverlay) masterOverlay.addEventListener('click', closeMasterModal);

// Отправка формы
if (masterForm && masterTableBody) {
  masterForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(masterForm);

    const row = document.createElement('tr');

    // Поля в порядке заголовков таблицы
    const fields = ['name', 'specialization', 'phone', 'status', 'active_tickets'];
    fields.forEach(field => {
      const cell = document.createElement('td');
      cell.dataset.field = field;
      cell.textContent = formData.get(field) || '-';
      row.appendChild(cell);
    });

    // Кнопка "Назначить заявку"
    const actionsCell = document.createElement('td');
    actionsCell.className = 'actions-cell';
    const assignBtn = document.createElement('button');
    assignBtn.className = 'btn btn--primary assign-ticket-btn';
    assignBtn.textContent = 'Назначить заявку';
    // Можно добавить data-master-id позже, если будет API
    actionsCell.appendChild(assignBtn);
    row.appendChild(actionsCell);

    // Добавляем в таблицу
    masterTableBody.appendChild(row);

    // Закрываем и уведомляем
    closeMasterModal();
    alert('Мастер успешно добавлен!');
  });
}


// === Модальное окно: Назначение заявки мастеру ===
let currentMasterId = null;

// Открытие модалки при клике на "Назначить заявку"
document.querySelectorAll('.assign-ticket-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    currentMasterId = this.dataset.masterId;
    document.getElementById('assignTicketModal').style.display = 'block';
  });
});

// Закрытие модалки
function closeAssignModal() {
  document.getElementById('assignTicketModal').style.display = 'none';
  currentMasterId = null;
}

document.getElementById('closeAssignModalBtn')?.addEventListener('click', closeAssignModal);
document.getElementById('assignModalOverlay')?.addEventListener('click', closeAssignModal);

// Назначение заявки
document.querySelectorAll('.attach-ticket-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const ticketRow = this.closest('tr');
    const ticketId = ticketRow.dataset.ticketId;
    
    if (currentMasterId && ticketId) {
      // Здесь можно отправить AJAX-запрос:
      // POST /api/assign-ticket { masterId: currentMasterId, ticketId: ticketId }
      
      alert(`Заявка №${ticketId} назначена мастеру ID ${currentMasterId}`);
      
      // Опционально: обновить статус в таблице мастеров (активные заявки +1)
      // Или закрыть модалку сразу
      closeAssignModal();
    }
  });
});


// === Модальное окно: Новая заявка ===
const ticketModal = document.getElementById('createTicketModal');
const openTicketBtn = document.querySelector('.filters__new-ticket');
const closeTicketBtn = document.getElementById('closeTicketModalBtn');
const cancelTicketBtn = document.getElementById('cancelTicketBtn');
const ticketOverlay = document.getElementById('ticketModalOverlay');
const ticketForm = document.getElementById('createTicketForm');

// Установка сегодняшней даты по умолчанию
if (ticketForm) {
  const today = new Date().toISOString().split('T')[0];
  ticketForm.querySelector('[name="date_received"]').value = today;
}

// Открытие
if (openTicketBtn) {
  openTicketBtn.addEventListener('click', () => {
    ticketModal.style.display = 'block';
  });
}

// Закрытие
function closeTicketModal() {
  ticketModal.style.display = 'none';
  if (ticketForm) ticketForm.reset();
}

if (closeTicketBtn) closeTicketBtn.addEventListener('click', closeTicketModal);
if (cancelTicketBtn) cancelTicketBtn.addEventListener('click', closeTicketModal);
if (ticketOverlay) ticketOverlay.addEventListener('click', closeTicketModal);

// Отправка формы
if (ticketForm) {
  ticketForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Здесь можно собрать данные и отправить на сервер
    const formData = new FormData(ticketForm);
    console.log('Новая заявка:', Object.fromEntries(formData));

    // Пример: добавить строку в таблицу заявок (если она есть)
    const ticketTableBody = document.querySelector('.assign-tickets-table tbody');
    if (ticketTableBody) {
      const row = document.createElement('tr');
      row.dataset.ticketId = Date.now(); // временный ID
      row.innerHTML = `
        <td>${formData.get('status') || 'Новая'}</td>
        <td>${formData.get('date_received')}</td>
        <td>#${Date.now().toString().slice(-4)}</td>
        <td>${formData.get('client')}</td>
        <td>${formData.get('mobile') || '-'}</td>
        <td>${formData.get('model')}</td>
        <td>${formData.get('client_issue')}</td>
        <td><button class="btn btn--primary btn--small attach-ticket-btn">Прикрепить</button></td>
      `;
      ticketTableBody.appendChild(row);

      // Назначить обработчик на новую кнопку
      row.querySelector('.attach-ticket-btn').addEventListener('click', function () {
        alert('Заявка назначена!');
      });
    }

    closeTicketModal();
    alert('Заявка успешно создана!');
  });
}


  document.addEventListener('DOMContentLoaded', () => {
    // --- Открытие модальных окон ---
    document.getElementById('openClientSelector')?.addEventListener('click', () => {
      document.getElementById('selectClientModal').style.display = 'block';
    });

    document.getElementById('openMasterSelector')?.addEventListener('click', () => {
      document.getElementById('selectMasterModal').style.display = 'block';
    });

    // --- Закрытие по крестику ---
    document.getElementById('closeClientModalBtn')?.addEventListener('click', () => {
      document.getElementById('selectClientModal').style.display = 'none';
    });

    document.getElementById('closeMasterModalBtn')?.addEventListener('click', () => {
      document.getElementById('selectMasterModal').style.display = 'none';
    });

    // --- Закрытие по клику на оверлей ---
    document.getElementById('clientModalOverlay')?.addEventListener('click', () => {
      document.getElementById('selectClientModal').style.display = 'none';
    });

    document.getElementById('masterModalOverlay')?.addEventListener('click', () => {
      document.getElementById('selectMasterModal').style.display = 'none';
    });

    // --- Закрытие по нажатию "Выбрать" ---

    // Для клиентов (делегирование события на tbody или modal content)
    document.querySelector('#selectClientModal .table-container')?.addEventListener('click', (e) => {
      if (e.target.classList.contains('select-client-btn')) {
        const row = e.target.closest('tr');
        const clientId = row.dataset.clientId;
        const clientName = row.dataset.clientName;

        // Здесь можно добавить логику: например, заполнить поле формы
        console.log('Выбран клиент:', { id: clientId, name: clientName });

        // Закрываем модальное окно
        document.getElementById('selectClientModal').style.display = 'none';
      }
    });

    // Для мастеров
    document.querySelector('#selectMasterModal .table-container')?.addEventListener('click', (e) => {
      if (e.target.classList.contains('select-master-btn')) {
        const row = e.target.closest('tr');
        const masterId = row.dataset.masterId;
        const masterName = row.dataset.masterName;

        // Здесь можно добавить логику: например, заполнить поле формы
        console.log('Выбран мастер:', { id: masterId, name: masterName });

        // Закрываем модальное окно
        document.getElementById('selectMasterModal').style.display = 'none';
      }
    });
  });

  