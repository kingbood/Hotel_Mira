import { rooms, type Room } from '../data/rooms';
import { initSlider, sliderControlsHTML } from './room-slider';

export function formatPrice(price: number): string {
  return `${price.toLocaleString('ru-RU')} ₽`;
}

function buildSliderHTML(room: Room): string {
  const slides = room.images
    .map((src, i) => `<img src="${src}" alt="${room.title} — фото ${i + 1}" loading="lazy" />`)
    .join('');

  return `
    <div class="room-card__slider" data-slider>
      <div class="slider__track" data-track>${slides}</div>
      ${room.images.length > 1 ? sliderControlsHTML() : ''}
    </div>
  `;
}

/** Compact card: whole body is one link. Used for the homepage preview. */
export function renderCard(room: Room): string {
  return `
    <article class="room-card" data-category="${room.category}">
      ${buildSliderHTML(room)}
      <a class="room-card__body" href="room.html?slug=${room.slug}">
        <div class="room-card__top">
          <h3 class="room-card__title">${room.title}</h3>
          <span class="room-card__price">${formatPrice(room.price)}<small>/сутки</small></span>
        </div>
        <p class="room-card__desc">${room.shortDescription}</p>
        <span class="room-card__cta">Подробнее →</span>
      </a>
    </article>
  `;
}

/** Fuller card with amenity chips and two separate CTAs. Used on the /rooms catalog. */
export function renderCatalogCard(room: Room): string {
  const shown = room.amenities.slice(0, 4);
  const moreCount = room.amenities.length - shown.length;
  const amenities = shown.map((a) => `<li>${a}</li>`).join('');
  const bookText = encodeURIComponent(
    `Здравствуйте! Хочу узнать о наличии апартаментов «${room.title}» на моих датах.`
  );

  return `
    <article class="room-card room-card--catalog" data-category="${room.category}">
      ${buildSliderHTML(room)}
      <div class="room-card__body">
        <div class="room-card__top">
          <h3 class="room-card__title">${room.title}</h3>
          <span class="room-card__price">${formatPrice(room.price)}<small>/сутки</small></span>
        </div>
        <p class="room-card__desc">${room.shortDescription}</p>
        <ul class="room-card__amenities">
          ${amenities}
          ${moreCount > 0 ? `<li class="room-card__amenities-more">+${moreCount}</li>` : ''}
        </ul>
        <div class="room-card__actions">
          <a class="btn btn--primary room-card__book" href="https://wa.me/79177690505?text=${bookText}" target="_blank" rel="noopener noreferrer">
            <span class="btn__label">Проверить наличие</span>
          </a>
          <a class="room-card__more" href="room.html?slug=${room.slug}">Подробнее →</a>
        </div>
      </div>
    </article>
  `;
}

function wireFilters(grid: HTMLElement) {
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

/** Full catalog grid (/rooms page): every room, filterable, two CTAs per card. */
export function initRoomsCatalog() {
  const grid = document.querySelector<HTMLElement>('[data-rooms-grid]');
  if (!grid) return;

  grid.innerHTML = rooms.map(renderCatalogCard).join('');
  grid.querySelectorAll<HTMLElement>('[data-slider]').forEach(initSlider);
  wireFilters(grid);
}

/** Small homepage teaser: a handful of rooms, no filter, single CTA per card. */
export function initRoomsPreview(slugs: string[]) {
  const grid = document.querySelector<HTMLElement>('[data-rooms-preview-grid]');
  if (!grid) return;

  const selected = slugs
    .map((slug) => rooms.find((r) => r.slug === slug))
    .filter((room): room is Room => Boolean(room));

  grid.innerHTML = selected.map(renderCard).join('');
  grid.querySelectorAll<HTMLElement>('[data-slider]').forEach(initSlider);
}
