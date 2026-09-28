import { rooms, type Room } from '../data/rooms';
import { initSlider, sliderControlsHTML } from './room-slider';

function formatPrice(price: number): string {
  return `${price.toLocaleString('ru-RU')} ₽`;
}

function renderCard(room: Room): string {
  const slides = room.images
    .map((src, i) => `<img src="${src}" alt="${room.title} — фото ${i + 1}" loading="lazy" />`)
    .join('');

  return `
    <article class="room-card" data-category="${room.category}">
      <div class="room-card__slider" data-slider>
        <div class="slider__track" data-track>${slides}</div>
        ${room.images.length > 1 ? sliderControlsHTML() : ''}
      </div>
      <a class="room-card__body" href="room.html?slug=${room.slug}">
        <div class="room-card__top">
          <h3 class="room-card__title">${room.title}</h3>
          <span class="room-card__price">${formatPrice(room.price)}<small>/сутки</small></span>
        </div>
        <p class="room-card__desc">${room.shortDescription}</p>
        <span class="room-card__cta">Смотреть апартаменты →</span>
      </a>
    </article>
  `;
}

export function initRoomsCatalog() {
  const grid = document.querySelector<HTMLElement>('[data-rooms-grid]');
  if (!grid) return;

  grid.innerHTML = rooms.map(renderCard).join('');
  grid.querySelectorAll<HTMLElement>('[data-slider]').forEach(initSlider);

  const filterButtons = document.querySelectorAll<HTMLButtonElement>('[data-filter]');
  const cards = grid.querySelectorAll<HTMLElement>('.room-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const value = btn.dataset.filter ?? 'all';
      filterButtons.forEach((b) => b.classList.toggle('is-active', b === btn));
      cards.forEach((card) => {
        card.hidden = value !== 'all' && card.dataset.category !== value;
      });
    });
  });
}
