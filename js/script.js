// Данные приложения
const exhibitsData = [
    { id: 1, title: "Звездная ночь", author: "Винсент Ван Гог", year: 1889, category: "classic", icon: "🎨" },
    { id: 2, title: "Черный квадрат", author: "Казимир Малевич", year: 1915, category: "modern", icon: "⬛" },
    { id: 3, title: "Мона Лиза", author: "Леонардо да Винчи", year: 1503, category: "classic", icon: "🖼️" },
    { id: 4, title: "Постоянство памяти", author: "Сальвадор Дали", year: 1931, category: "modern", icon: "⏳" },
    { id: 5, title: "Девочка с персиками", author: "Валентин Серов", year: 1887, category: "classic", icon: "🍑" },
    { id: 6, title: "Композиция VIII", author: "Василий Кандинский", year: 1923, category: "modern", icon: "📐" }
];

let favorites = [];

// Элементы DOM
const grid = document.getElementById('gallery-grid');
const favCountDisplay = document.getElementById('fav-count');
const filterBtns = document.querySelectorAll('.filter-btn');
const bookingForm = document.getElementById('booking-form');
const formMessage = document.getElementById('form-message');

// Функция отрисовки галереи
function renderGallery(filter = 'all') {
    grid.innerHTML = '';
    
    const filteredData = filter === 'all' 
        ? exhibitsData 
        : exhibitsData.filter(item => item.category === filter);

    filteredData.forEach(item => {
        const isFav = favorites.includes(item.id);
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card-img">${item.icon}</div>
            <div class="card-body">
                <h3 class="card-title">${item.title}</h3>
                <p class="card-author">${item.author}, ${item.year}</p>
                <button class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite(${item.id})">
                    ${isFav ? 'В избранном' : 'В избранное'}
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Переключение избранного
window.toggleFavorite = function(id) {
    const index = favorites.indexOf(id);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(id);
    }
    favCountDisplay.innerText = favorites.length;
    renderGallery(document.querySelector('.filter-btn.active').dataset.filter);
};

// Фильтрация
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderGallery(btn.dataset.filter);
    });
});

// Обработка формы
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    
    formMessage.style.display = 'block';
    formMessage.style.backgroundColor = '#d4edda';
    formMessage.style.color = '#155724';
    formMessage.innerText = `Спасибо, ${name}! Билет успешно оформлен и отправлен на почту.`;
    
    bookingForm.reset();
});

// Инициализация
renderGallery();