import{a as e,i as t,n,r,s as i,t as a}from"./room-slider-DQ1TFVdc.js";function o(e){return`${e.toLocaleString(`ru-RU`)} ₽`}function s(){let e=new URLSearchParams(location.search).get(`slug`),t=r.find(t=>t.slug===e),i=document.querySelector(`[data-room-detail]`);if(!i)return;if(!t){i.innerHTML=`
      <div class="room-detail__missing">
        <h1>Апартаменты не найдены</h1>
        <p>Возможно, ссылка устарела.</p>
        <a class="btn btn--primary" href="index.html#rooms"><span class="btn__label">Ко всем апартаментам</span></a>
      </div>
    `;return}document.title=`${t.title} — Апартаменты на Мира`;let s=t.images.map((e,n)=>`<img src="${e}" alt="${t.title} — фото ${n+1}" loading="${n===0?`eager`:`lazy`}" />`).join(``),c=t.description.map(e=>`<p>${e}</p>`).join(``),l=t.amenities.map(e=>`<li>${e}</li>`).join(``);i.innerHTML=`
    <a class="room-detail__back" href="index.html#rooms">← Все апартаменты</a>
    <div class="room-detail__gallery" data-slider>
      <div class="slider__track" data-track>${s}</div>
      ${t.images.length>1?n():``}
    </div>
    <div class="room-detail__body">
      <div class="room-detail__heading">
        <h1 class="room-detail__title">${t.title}</h1>
        <span class="room-detail__price">${o(t.price)}<small>/сутки</small></span>
      </div>
      <div class="room-detail__text">${c}</div>
      <ul class="room-detail__amenities">${l}</ul>
      <a class="btn btn--primary room-detail__cta" href="https://wa.me/79177690505" target="_blank" rel="noopener noreferrer"><span class="btn__label">Забронировать</span></a>
    </div>
  `;let u=i.querySelector(`[data-slider]`);u&&a(u)}i(),e(),t(),s();