document.addEventListener("DOMContentLoaded", function () {
    const ticketList = document.getElementById("ticketList");
    const pagination = document.getElementById("pagination");
    const tabs = document.querySelectorAll(".tabs__item");
    const searchInput = document.querySelector(".filters__search-input");

    if (!ticketList || !pagination || !tabs.length || !searchInput) return;

    const ticketsPerPage = 5;
    const tickets = Array.from(ticketList.children);
    let currentPage = 1;
    let currentFilter = "all";
    let filteredTickets = tickets.slice(); // для фильтрации и поиска

    const statuses = ["На диагностике", "Диагностика завершена", "В ремонте", "Готов к выдаче", "Завершено", "Отменено"];

    function getFilteredTickets() {
        let temp = tickets.slice();

        // Фильтр по статусу
        if (currentFilter !== "all") {
            temp = temp.filter(ticket => ticket.dataset.status === currentFilter);
        }

        // Фильтр по поиску
        const query = searchInput.value.toLowerCase().trim();
        if (query) {
            temp = temp.filter(ticket => {
                const ticketId = ticket.querySelector(".ticket__id")?.textContent.toLowerCase() || "";
                return ticketId.includes(query);
            });
        }

        filteredTickets = temp;
        return filteredTickets;
    }

    function showPage(page) {
        const currentTickets = getFilteredTickets();
        tickets.forEach(ticket => ticket.style.display = "none");
        const start = (page - 1) * ticketsPerPage;
        const end = start + ticketsPerPage;
        currentTickets.slice(start, end).forEach(ticket => ticket.style.display = "block");
    }

    function renderPagination() {
        const currentTickets = getFilteredTickets();
        const totalPages = Math.ceil(currentTickets.length / ticketsPerPage);
        pagination.innerHTML = "";
        if (totalPages === 0) return;

        const createButton = (label, page, disabled = false, active = false) => {
            const btn = document.createElement("button");
            btn.textContent = label;
            btn.className = "pagination__button";
            if (active) btn.classList.add("pagination__button--active");
            btn.disabled = disabled;
            btn.onclick = () => {
                if (!disabled && page !== currentPage) changePage(page);
            };
            pagination.appendChild(btn);
        };

        const addEllipsis = () => {
            const span = document.createElement("span");
            span.textContent = "...";
            span.className = "pagination__ellipsis";
            pagination.appendChild(span);
        };

        createButton("<", currentPage - 1, currentPage === 1);

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) createButton(i, i, false, i === currentPage);
        } else {
            createButton(1, 1, false, currentPage === 1);
            if (currentPage > 3) addEllipsis();

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            for (let i = start; i <= end; i++) createButton(i, i, false, i === currentPage);

            if (currentPage < totalPages - 2) addEllipsis();
            createButton(totalPages, totalPages, false, currentPage === totalPages);
        }

        createButton(">", currentPage + 1, currentPage === totalPages);
    }

    function changePage(page) {
        currentPage = page;
        showPage(currentPage);
        renderPagination();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function applyFilter(filter) {
        currentFilter = filter;
        currentPage = 1;

        tabs.forEach(tab => tab.classList.remove("tabs__item--active"));
        const activeTab = Array.from(tabs).find(tab => {
            if (filter === "all" && tab.dataset.tab === "all") return true;
            return tab.dataset.tab === filter;
        });
        if (activeTab) activeTab.classList.add("tabs__item--active");

        showPage(currentPage);
        renderPagination();
    }

    // Вкладки — фильтрация
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const filter = tab.dataset.tab;
            if (statuses.includes(filter) || filter === "all") applyFilter(filter);
        });
    });

    // Поиск по номеру заявки
    searchInput.addEventListener("input", () => {
        currentPage = 1;
        showPage(currentPage);
        renderPagination();
    });

    // Подсчёт количества заявок на вкладках
    const statusCounts = { "На диагностике": 0, "Диагностика завершена": 0, "В ремонте": 0, "Готов к выдаче": 0, "Завершено": 0, "Отменено": 0 };
    tickets.forEach(ticket => {
        const status = ticket.dataset.status;
        if (statusCounts[status] !== undefined) statusCounts[status]++;
    });

    tabs.forEach(tab => {
        const tabStatus = tab.dataset.tab;
        if (tabStatus === "all") tab.textContent = `Все заявки (${tickets.length})`;
        else if (statusCounts[tabStatus] !== undefined) tab.textContent = `${tabStatus} (${statusCounts[tabStatus]})`;
    });

    // Инициализация
    applyFilter("all");
});
