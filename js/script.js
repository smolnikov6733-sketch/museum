document.addEventListener('DOMContentLoaded', () => {
    
    // База данных экспонатов с реальными изображениями картин
    const exhibitsData = [
        {
            id: 1,
            title: "Возвращение блудного сына",
            author: "Рембрандт ван Рейн",
            year: "1669",
            museumCode: "hermitage",
            museumName: "Государственный Эрмитаж",
            price: 500,
            image: "https://hermitagemuseum.org/api/files/fshow?needlePath=%2Fapi%2Fspf%2Fg59VmR1MCiVCAzdMLB9KQZKupRHO18Te1lWUWkCRl_gq-Znan-z2IuxJbQU7ZnEd.jpg%3Fw%3D1600%26h%3D1600"
        },
        {
            id: 2,
            title: "Мона Лиза (Джоконда)",
            author: "Леонардо да Винчи",
            year: "1503",
            museumCode: "louvre",
            museumName: "Лувр (Париж)",
            price: 650,
            image: "images/louvre.jpg"
        },
        {
            id: 3,
            title: "Богатыри",
            author: "Виктор Васнецов",  
            year: "1898",
            museumCode: "tretyakov",
            museumName: "Третьяковская галерея",
            price: 400,
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Viktor_Vasnetsov_-_%D0%91%D0%BE%D0%B3%D0%B0%D1%82%D1%8B%D1%80%D0%B8_-_Google_Art_Project.jpg/500px-Viktor_Vasnetsov_-_%D0%91%D0%BE%D0%B3%D0%B0%D1%82%D1%8B%D1%80%D0%B8_-_Google_Art_Project.jpg"
        },
        {
            id: 5,
            title: "Дама с горностаем",
            author: "Леонардо да Винчи",
            year: "1490",
            museumCode: "louvre",
            museumName: "Лувр (Париж)",
            price: 650,
            image: "images/ermine.jpg"
        },
        {
            id: 6,
            title: "Девочка на шаре",
            author: "Пабло Пикассо",
            year: "1905",
            museumCode: "hermitage",
            museumName: "Государственный Эрмитаж",
            price: 500,
            image: "https://upload.wikimedia.org/wikipedia/ru/thumb/0/08/Picasso01.jpg/330px-Picasso01.jpg"
        }
    ];

    let favorites = [];
    let cart = [];

    // Элементы DOM
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.tab-section');
    const galleryGrid = document.getElementById('gallery-grid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const favCountSpan = document.getElementById('fav-count');
    const cartCountSpan = document.getElementById('cart-count');
    const cartItemsList = document.getElementById('cart-items-list');
    const totalPriceVal = document.getElementById('total-price-val');
    const ticketForm = document.getElementById('ticket-form');
    const goToCatalogBtn = document.getElementById('go-to-catalog-btn');

    // --- СИСТЕМА ВКЛАДОК ---
    function switchTab(tabId) {
        sections.forEach(sec => sec.classList.add('hidden'));
        navLinks.forEach(link => link.classList.remove('active'));

        const targetSection = document.getElementById(tabId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
        }

        const activeLink = document.querySelector(`.nav-link[data-tab="${tabId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        window.scrollTo(0, 0);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const tabId = link.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    if (goToCatalogBtn) {
        goToCatalogBtn.addEventListener('click', () => {
            switchTab('catalog');
        });
    }

    // --- ОТРИСОВКА КАРТОЧЕК С РЕАЛЬНЫМИ ИЗОБРАЖЕНИЯМИ ---
    function renderGallery(dataArray) {
        galleryGrid.innerHTML = '';
        
        if (dataArray.length === 0) {
            galleryGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 40px; color:#999;">Экспонаты не найдены.</p>';
            return;
        }

        dataArray.forEach(item => {
            const isFav = favorites.includes(item.id);
            const inCart = cart.includes(item.id);
            
            const cardHtml = `
                <article class="exhibit-card">
                    <div class="image-container">
                        <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.onerror=null;this.src='images/default.svg';">
                    </div>
                    <div class="card-content">
                        <span class="museum-badge">${item.museumName}</span>
                        <h3>${item.title}</h3>
                        <p class="author">${item.author}</p>
                        <p class="year">${item.year} г.</p>
                        <div class="price-tag">${item.price} ₽</div>
                        <div class="card-actions">
                            <button class="action-btn fav-btn ${isFav ? 'active' : ''}" data-id="${item.id}">
                                ${isFav ? '★ В Избранном' : '☆ Избранное'}
                            </button>
                            <button class="action-btn cart-btn ${inCart ? 'active' : ''}" data-id="${item.id}">
                                ${inCart ? '✓ В корзине' : 'Купить билет'}
                            </button>
                        </div>
                    </div>
                </article>
            `;
            galleryGrid.insertAdjacentHTML('beforeend', cardHtml);
        });
    }

    // --- ОБРАБОТКА СЕССИИ (ДЕЛЕГИРОВАНИЕ КЛИКОВ) ---
    galleryGrid.addEventListener('click', (e) => {
        const targetBtn = e.target.closest('.action-btn');
        if (!targetBtn) return;

        const id = parseInt(targetBtn.getAttribute('data-id'));
        
        if (targetBtn.classList.contains('fav-btn')) {
            if (favorites.includes(id)) {
                favorites = favorites.filter(favId => favId !== id);
                targetBtn.classList.remove('active');
                targetBtn.textContent = '☆ Избранное';
            } else {
                favorites.push(id);
                targetBtn.classList.add('active');
                targetBtn.textContent = '★ В Избранном';
            }
            favCountSpan.textContent = favorites.length;
        } 
        else if (targetBtn.classList.contains('cart-btn')) {
            if (cart.includes(id)) {
                cart = cart.filter(cartId => cartId !== id);
                targetBtn.classList.remove('active');
                targetBtn.textContent = 'Купить билет';
            } else {
                cart.push(id);
                targetBtn.classList.add('active');
                targetBtn.textContent = '✓ В корзине';
            }
            cartCountSpan.textContent = cart.length;
            updateCartUI();
        }
    });

    // --- ОБНОВЛЕНИЕ ИНТЕРФЕЙСА КОРЗИНЫ ---
    function updateCartUI() {
        cartItemsList.innerHTML = '';
        let totalCost = 0;

        if (cart.length === 0) {
            cartItemsList.innerHTML = '<li class="empty-cart-msg">Ваша корзина пуста. Выберите билеты во вкладке «Музеи и Экспонаты», чтобы продолжить.</li>';
        } else {
            cart.forEach(id => {
                const item = exhibitsData.find(ex => ex.id === id);
                if (item) {
                    totalCost += item.price;
                    const li = document.createElement('li');
                    li.className = 'cart-item-node';
                    li.innerHTML = `
                        <div>
                            <span class="item-museum-prefix">${item.museumName}</span>
                            <b>Выставка «${item.title}»</b>
                        </div>
                        <span>${item.price} ₽</span>
                    `;
                    cartItemsList.appendChild(li);
                }
            });
        }
        totalPriceVal.textContent = totalCost;
    }

    // --- ФИЛЬТРАЦИЯ ПО МУЗЕЯМ ---
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            
            const selectedMuseum = e.target.getAttribute('data-museum');
            if (selectedMuseum === 'all') {
                renderGallery(exhibitsData);
            } else {
                const filtered = exhibitsData.filter(item => item.museumCode === selectedMuseum);
                renderGallery(filtered);
            }
        });
    });

    // --- ОТПРАВКА ФОРМЫ С ВАЛИДАЦИЕЙ ---
    ticketForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameValue = document.getElementById('user-name').value.trim();
        const emailValue = document.getElementById('user-email').value.trim();

        if (cart.length === 0) {
            alert('Ошибка оформления! Пожалуйста, добавьте хотя бы один билет в корзину.');
            return;
        }

        const bookedTickets = cart.map(id => {
            const ex = exhibitsData.find(ex => ex.id === id);
            return ex ? `${ex.museumName} — Выставка «${ex.title}»` : '';
        }).filter(Boolean);

        alert(`БРОНИРОВАНИЕ УСПЕШНО ОФОРМЛЕНО!\n\nПокупатель: ${nameValue}\nE-mail: ${emailValue}\n\nСформированные входные билеты:\n— ${bookedTickets.join('\n— ')}\n\nИтоговая стоимость: ${totalPriceVal.textContent} ₽.\nЭлектронные билеты с защищенным кодом отправлены на вашу почту.`);
        
        // Очистка сессии и возврат в дефолтное состояние
        favorites = [];
        cart = [];
        favCountSpan.textContent = '0';
        cartCountSpan.textContent = '0';
        ticketForm.reset();
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector('.filter-btn[data-museum="all"]').classList.add('active');
        
        renderGallery(exhibitsData);
        updateCartUI();
        switchTab('about');
    });

    // Первичный запуск
    renderGallery(exhibitsData);
});