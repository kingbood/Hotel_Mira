import{n as e,r as t,t as n}from"./room-slider-BBgQVe8-.js";function r(e){return`${e.toLocaleString(`ru-RU`)} ₽`}function i(t){return`
    <div class="room-card__slider" data-slider>
      <div class="slider__track" data-track>${t.images.map((e,n)=>`<img src="${e}" alt="${t.title} — фото ${n+1}" loading="lazy" />`).join(``)}</div>
      ${t.images.length>1?e():``}
    </div>
  `}function a(e){return`
    <article class="room-card" data-category="${e.category}">
      ${i(e)}
      <a class="room-card__body" href="room.html?slug=${e.slug}">
        <div class="room-card__top">
          <h3 class="room-card__title">${e.title}</h3>
          <span class="room-card__price">${r(e.price)}<small>/сутки</small></span>
        </div>
        <p class="room-card__desc">${e.shortDescription}</p>
        <span class="room-card__cta">Подробнее →</span>
      </a>
    </article>
  `}function o(e){let t=e.amenities.slice(0,4),n=e.amenities.length-t.length,a=t.map(e=>`<li>${e}</li>`).join(``),o=encodeURIComponent(`Здравствуйте! Хочу узнать о наличии апартаментов «${e.title}» на моих датах.`);return`
    <article class="room-card room-card--catalog" data-category="${e.category}">
      ${i(e)}
      <div class="room-card__body">
        <div class="room-card__top">
          <h3 class="room-card__title">${e.title}</h3>
          <span class="room-card__price">${r(e.price)}<small>/сутки</small></span>
        </div>
        <p class="room-card__desc">${e.shortDescription}</p>
        <ul class="room-card__amenities">
          ${a}
          ${n>0?`<li class="room-card__amenities-more">+${n}</li>`:``}
        </ul>
        <div class="room-card__actions">
          <a class="btn btn--primary room-card__book" href="https://wa.me/79177690505?text=${o}" target="_blank" rel="noopener noreferrer">
            <span class="btn__label">Проверить наличие</span>
          </a>
          <a class="room-card__more" href="room.html?slug=${e.slug}">Подробнее →</a>
        </div>
      </div>
    </article>
  `}function s(e){let t=document.querySelectorAll(`[data-filter]`),n=e.querySelectorAll(`.room-card`);t.forEach(e=>{e.addEventListener(`click`,()=>{let r=e.dataset.filter??`all`;t.forEach(t=>t.classList.toggle(`is-active`,t===e)),n.forEach(e=>{e.hidden=r!==`all`&&e.dataset.category!==r})})})}function c(){let e=document.querySelector(`[data-rooms-grid]`);e&&(e.innerHTML=t.map(o).join(``),e.querySelectorAll(`[data-slider]`).forEach(n),s(e))}function l(e){let r=document.querySelector(`[data-rooms-preview-grid]`);r&&(r.innerHTML=e.map(e=>t.find(t=>t.slug===e)).filter(e=>!!e).map(a).join(``),r.querySelectorAll(`[data-slider]`).forEach(n))}export{c as n,l as r,r as t};