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
  // === 1. Редактирование таблицы (оставляем) ===
  const table = document.querySelector('.clients-table tbody');
  if (table) {
    function makeEditable(cell) {
      const currentValue = cell.textContent.trim();
      const fieldName = cell.dataset.field;

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

      const saveValue = () => {
        const newValue = input.value.trim();
        if (newValue !== currentValue) {
          cell.textContent = newValue;
          console.log(`Поле "${fieldName}" обновлено: ${currentValue} → ${newValue}`);
          // Здесь можно добавить отправку на сервер
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
      if (cell && !cell.classList.contains('editing')) {
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

  // === 4. Кнопка "Новая заявка" — можно оставить как заглушку ===
  const newTicketBtn = document.querySelector('.filters__new-ticket');
  if (newTicketBtn) {
    newTicketBtn.addEventListener('click', function () {
      alert('Функция создания новой записи пока не реализована.');
      // Позже можно добавить модальное окно или добавление строки в таблицу
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