"use strict";

/*=============== МЕНЮ БУРГЕР ===============*/
const iconMenu = document.querySelector('.menu__icon');
const navLink = document.querySelectorAll('.menu__link');
const menuBody = document.querySelector('.menu__body');
const header = document.querySelector('.header');

if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
		header.classList.add('_active');
	});

	navLink.forEach(link => {
		link.addEventListener('click', function () {
			// Закрываем мобильное меню
			document.body.classList.remove('_lock');
			iconMenu.classList.remove('_active');
			menuBody.classList.remove('_active');
			header.classList.add('_active');
		});
	});
}

/*=============== Анимация появления фона Header::before ===============*/
// Функция для проверки положения страницы и класса _active каждую секунду
function checkScrollAndMenu() {
	var header = document.querySelector('.header');
	var pageOrder = document.querySelector('.page__order.order');
	var menuBody = document.querySelector('.menu__body');

	var pageOrderTop = pageOrder.offsetTop - 80; // добавляем 20 пикселей к верхней координате блока page__order order

	if (window.scrollY > pageOrderTop) {
		header.classList.add('_active');
	} else {
		if (!menuBody.classList.contains('_active')) {
			header.classList.remove('_active');
		}
	}
}

// Вызываем функцию checkScrollAndMenu каждую секунду
setInterval(checkScrollAndMenu, 1000);

/*=============== VIDEO ===============*/
document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('video').playbackRate = 2;
});

/*=============== Parallax ===============*/
// Ждем загрузку контента
window.onload = function () {
	const parallax = document.querySelector('.main');

	if (parallax) {
		const content = document.querySelector('.main__container');
		const parallaxOne = document.querySelector('.images-parallax-1');
		const parallaxTwo = document.querySelector('.images-parallax-2');

		// Коэффициенты
		const forParallaxOne = 40;
		const forParallaxTwo = 30;

		// Скорость анимации
		const speed = 0.05;

		// Объявление переменных
		let positionX = 0, positionY = 0;
		let coordXprocent = 0, coordYprocent = 0;

		// Анимация при изменение положении курсора мыши
		function setMouseParallaxStyle() {
			const distX = coordXprocent - positionX;
			const distY = coordYprocent - positionY;

			positionX = positionX + (distX * speed);
			positionY = positionY + (distY * speed);

			// Передаем стили
			parallaxOne.style.cssText = `transform: translate(${positionX / forParallaxOne}%,${positionY / forParallaxOne}%);`;
			parallaxTwo.style.cssText = `transform: translate(${positionX / forParallaxTwo}%,${positionY / forParallaxTwo}%);`;

			requestAnimationFrame(setMouseParallaxStyle);
		}

		setMouseParallaxStyle();

		parallax.addEventListener("mousemove", function (e) {
			// Получение ширины и высоты блока
			const parallaxWidth = parallax.offsetWidth;
			const parallaxHeight = parallax.offsetHeight;

			// Ноль по середине
			const coordX = e.pageX - parallaxWidth / 2;
			const coordY = e.pageY - parallaxHeight / 2;

			// Получаем проценты
			coordXprocent = coordX / parallaxWidth * 100;
			coordYprocent = coordY / parallaxHeight * 100;
		});

		// Parallax при скролле

		let thresholdSets = [];
		for (let i = 0; i <= 1.0; i += 0.005) {
			thresholdSets.push(i);
		}
		const callback = function (entries, observer) {
			const scrollTopProcent = window.scrollY / parallax.offsetHeight * 100;
			setParallaxItemsStyle(scrollTopProcent);
		};
		const observer = new IntersectionObserver(callback, {
			threshold: thresholdSets
		});

		observer.observe(document.querySelector('.main'));
		// Коэффициент при скролле
		const setParallaxItemsStyle = function (scrollTopProcent) {
			content.style.cssText = `transform: translate(0%,-${scrollTopProcent / 6}%);`;
			parallaxTwo.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 9}%);`;
		};
	}
};

/*=============== COUNTDOWN TIMER ===============*/
document.addEventListener('DOMContentLoaded', () => {
	// Задать дату
	const date = new Date('Apr 1 2024 00:00:00');

	const daysVal = document.querySelector('.count-time__days .count-time__value');
	const hoursVal = document.querySelector('.count-time__hours .count-time__value');
	const minutesVal = document.querySelector('.count-time__minutes .count-time__value');
	const secondsVal = document.querySelector('.count-time__seconds .count-time__value');

	const daysText = document.querySelector('.count-time__days .count-time__text');
	const hoursText = document.querySelector('.count-time__hours .count-time__text');
	const minutesText = document.querySelector('.count-time__minutes .count-time__text');
	const secondsText = document.querySelector('.count-time__seconds .count-time__text');

	function declOfNum(number, titles) {
		let cases = [2, 0, 1, 1, 1, 2];
		return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
	}

	const timeCount = () => {
		let now = new Date();
		let leftUntil = date - now;

		if (leftUntil <= 0) {
			// Если время истекло, добавляем +X день
			date.setDate(date.getDate() + 2);
			leftUntil = date - now; // Обновляем оставшееся время
		}

		let days = Math.floor(leftUntil / 1000 / 60 / 60 / 24);
		let hours = Math.floor(leftUntil / 1000 / 60 / 60) % 24;
		let minutes = Math.floor(leftUntil / 1000 / 60) % 60;
		let seconds = Math.floor(leftUntil / 1000) % 60;

		days = days < 10 ? '0' + days : days;
		hours = hours < 10 ? '0' + hours : hours;
		minutes = minutes < 10 ? '0' + minutes : minutes;
		seconds = seconds < 10 ? '0' + seconds : seconds;

		// Добавление '0' перед значениями меньше 10
		daysVal.textContent = days;
		hoursVal.textContent = hours;
		minutesVal.textContent = minutes;
		secondsVal.textContent = seconds;
		// Склонение числительных
		daysText.textContent = declOfNum(days, ['Day', 'Day', 'Days']);
		hoursText.textContent = declOfNum(hours, ['Hour', 'Hour', 'Clock']);
		minutesText.textContent = declOfNum(minutes, ['Minute', 'Minutes', 'Minutes']);
		secondsText.textContent = declOfNum(seconds, ['Second', 'Seconds', 'Seconds']);
	};

	const animate = () => {
		timeCount();
		requestAnimationFrame(animate);
	};

	animate();
});

/*==================================================*/
// Функция для перемещения и изменения классов при изменении размера окна
function moveAndChangeClass() {
	// Проверяем ширину экрана
	if (window.matchMedia('(max-width: 767.98px)').matches) {
		// Находим блоки item-value и item-info
		const itemValue = document.querySelector('.fast__item.item-value');
		const itemInfo = document.querySelector('.fast__item.item-info');

		// Находим все элементы с классом fast__value в блоке item-value
		const values = itemValue.querySelectorAll('.fast__value');

		// Перемещаем значения из item-value в item-info, сохраняя класс fast__value и добавляя класс fast-grid
		values.forEach(value => {
			// Создаем копию элемента для каждого значения
			const newValue = value.cloneNode(true);
			// Добавляем новый элемент в блок item-info
			itemInfo.appendChild(newValue);
		});

		// Удаляем все элементы с классом fast__value из блока item-value
		values.forEach(value => {
			value.remove();
		});
	} else {
		// Ширина экрана выше 767.98px

		// Находим блоки item-value и item-info
		const itemValue = document.querySelector('.fast__item.item-value');
		const itemInfo = document.querySelector('.fast__item.item-info');

		// Находим все элементы с классом fast__value в блоке item-info
		const values = itemInfo.querySelectorAll('.fast__value');

		// Перемещаем значения из item-info в item-value, удаляя класс fast-grid
		values.forEach(value => {
			// Создаем копию элемента для каждого значения
			const newValue = value.cloneNode(true);
			// Добавляем новый элемент в блок item-value
			itemValue.appendChild(newValue);
		});

		// Удаляем все элементы с классом fast__value из блока item-info
		values.forEach(value => {
			value.remove();
		});
	}
}

// Вызываем функцию при загрузке страницы и при изменении размера окна
window.addEventListener('load', moveAndChangeClass);
window.addEventListener('resize', moveAndChangeClass);

/*=============== SWIPER SLIDER ===============*/
const swiper = new Swiper('.partners__swiper', {
	// Optional parameters
	loop: true,
	allowTouchMove: false,
	autoplay: {
		delay: 0,
		disableOnInteraction: false,
	},
	speed: 5000,
	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		560: {
			slidesPerView: 2,
		},
		768: {
			slidesPerView: 3,
		},
		1024: {
			slidesPerView: 4,
		},
	},
});

/*=============== Функция для обновления высоты элемента .training__body каждую секунду ===============*/
function updateHeight() {
	// Находим все элементы li с классом timeline-training__item
	var items = document.querySelectorAll('.timeline-training__item');

	// Переменная для хранения суммарной высоты элементов
	var totalHeight = 0;

	// Проходимся по каждому элементу и добавляем его высоту к общей высоте
	items.forEach(function (item) {
		totalHeight += item.offsetHeight;
	});

	// Находим элемент .training__body
	var trainingBody = document.querySelector('.training__body');

	// Устанавливаем высоту элемента .training__body равной суммарной высоте элементов li
	trainingBody.style.height = totalHeight + 'px';
}

// Вызываем функцию updateHeight каждую секунду
setInterval(updateHeight, 1000);

// Также вызываем функцию updateHeight сразу после загрузки страницы, чтобы установить начальную высоту
window.addEventListener('load', updateHeight);

/*=============== Scroll Animation ===============*/
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
	// Запуск анимации с помощью события
	window.addEventListener('scroll', animOnScroll);
	function animOnScroll(params) {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			// Регулирует момент старта анимации
			const animStart = 4;
			
			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((window.scrollY > animItemOffset - animItemPoint) && window.scrollY < (animItemOffset + animItemHeight)) {
				// Время задержки анимации
				setTimeout(() => {
					animItem.classList.add('_active');
				}, 300);
			} else {
				// _anim-no-hide убирает анимацию появления по кругу c помощью CSS
				if (!animItem.classList.contains('_anim-no-hide')) {
					// Повторяет анимацию по кругу /  если она не нужна, убираем animItem.classList.remove('_active');
					// animItem.classList.remove('_active');
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.scrollX || document.documentElement.scrollLeft,
			scrollTop = window.scrollY || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
	}
	// Активирует функцию без действия скролла (Чтобы анимация сработала сразу после загрузке страницы)
	animOnScroll();
}