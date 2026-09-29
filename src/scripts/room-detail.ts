import { rooms } from '../data/rooms';
import { initSlider, sliderControlsHTML } from './room-slider';

function formatPrice(price: number): string {
  return `${price.toLocaleString('ru-RU')} ₽`;
}

export function initRoomDetail() {
  const params = new URLSearchParams(location.search);
  const slug = params.get('slug');
  const room = rooms.find((r) => r.slug === slug);

  const content = document.querySelector<HTMLElement>('[data-room-detail]');
  if (!content) return;

  if (!room) {
    content.innerHTML = `
      <div class="room-detail__missing">
        <h1>Апартаменты не найдены</h1>
        <p>Возможно, ссылка устарела.</p>
        <a class="btn btn--primary" href="index.html#rooms"><span class="btn__label">Ко всем апартаментам</span></a>
      </div>
    `;
    return;
  }

  document.title = `${room.title} — Апартаменты на Мира`;

  const slides = room.images
    .map((src, i) => `<img src="${src}" alt="${room.title} — фото ${i + 1}" loading="${i === 0 ? 'eager' : 'lazy'}" />`)
    .join('');
  const paragraphs = room.description.map((p) => `<p>${p}</p>`).join('');
  const amenities = room.amenities.map((a) => `<li>${a}</li>`).join('');

  content.innerHTML = `
    <a class="room-detail__back" href="index.html#rooms">← Все апартаменты</a>
    <div class="room-detail__gallery" data-slider>
      <div class="slider__track" data-track>${slides}</div>
      ${room.images.length > 1 ? sliderControlsHTML() : ''}
    </div>
    <div class="room-detail__body">
      <div class="room-detail__heading">
        <h1 class="room-detail__title">${room.title}</h1>
        <span class="room-detail__price">${formatPrice(room.price)}<small>/сутки</small></span>
      </div>
      <div class="room-detail__text">${paragraphs}</div>
      <ul class="room-detail__amenities">${amenities}</ul>
      <a class="btn btn--primary room-detail__cta" href="https://wa.me/79177690505" target="_blank" rel="noopener noreferrer"><span class="btn__label">Забронировать</span></a>
    </div>
  `;

  const slider = content.querySelector<HTMLElement>('[data-slider]');
  if (slider) initSlider(slider);
}
