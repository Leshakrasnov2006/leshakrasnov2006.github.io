[file name]: script.js
[file content begin]
// Плавная прокрутка для навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Изменение хедера при скролле
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (header && window.scrollY > 100) {
        header.classList.add('scrolled');
    } else if (header) {
        header.classList.remove('scrolled');
    }
});

// Анимация появления элементов при скролле
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => observer.observe(el));

// Анимация счетчиков
const counters = document.querySelectorAll('.stat-number');
const speed = 200;

const startCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(startCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
};

// Запуск счетчиков при попадании в область видимости
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    });
    statsObserver.observe(statsSection);
}

// Мобильное меню
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Поиск по сайту
const searchBox = document.querySelector('.search-box');
if (searchBox) {
    searchBox.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        if (searchTerm.length > 2) {
            // Здесь можно добавить логику поиска
            console.log('Поиск:', searchTerm);
        }
    });
}

// Отслеживание целей для Яндекс.Метрики
document.addEventListener('DOMContentLoaded', function() {
    // Цель: клик по кнопке "Начать проект"
    const startProjectBtn = document.querySelector('.hero .btn');
    if (startProjectBtn) {
        startProjectBtn.addEventListener('click', function() {
            if (typeof ym !== 'undefined') {
                ym(97567890, 'reachGoal', 'start_project');
            }
        });
    }

    // Цель: отправка контактной формы
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            if (typeof ym !== 'undefined') {
                ym(97567890, 'reachGoal', 'contact_form_submit');
            }
        });
    }
});

// Оптимизация загрузки изображений
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});
[file content end]
