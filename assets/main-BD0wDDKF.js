import{a as e,i as t,n,o as r,r as i,s as a,t as o}from"./room-slider-CpAylEwN.js";function s(e){return`${e.toLocaleString(`ru-RU`)} ₽`}function c(e){let t=e.images.map((t,n)=>`<img src="${t}" alt="${e.title} — фото ${n+1}" loading="lazy" />`).join(``);return`
    <article class="room-card" data-category="${e.category}">
      <div class="room-card__slider" data-slider>
        <div class="slider__track" data-track>${t}</div>
        ${e.images.length>1?n():``}
      </div>
      <a class="room-card__body" href="room.html?slug=${e.slug}">
        <div class="room-card__top">
          <h3 class="room-card__title">${e.title}</h3>
          <span class="room-card__price">${s(e.price)}<small>/сутки</small></span>
        </div>
        <p class="room-card__desc">${e.shortDescription}</p>
        <span class="room-card__cta">Смотреть апартаменты →</span>
      </a>
    </article>
  `}function l(){let e=document.querySelector(`[data-rooms-grid]`);if(!e)return;e.innerHTML=i.map(c).join(``),e.querySelectorAll(`[data-slider]`).forEach(o);let t=document.querySelectorAll(`[data-filter]`),n=e.querySelectorAll(`.room-card`);t.forEach(e=>{e.addEventListener(`click`,()=>{let r=e.dataset.filter??`all`;t.forEach(t=>t.classList.toggle(`is-active`,t===e)),n.forEach(e=>{e.hidden=r!==`all`&&e.dataset.category!==r})})})}var u=[{slug:`views`,eyebrow:`Территория`,title:`Виды на море и горы`,text:[`С балконов и террас апарт-отеля открывается панорама на Чёрное море и горы Крыма — от ясного утра до огней вечерней Ялты.`,`Здесь хочется просто сидеть с чашкой кофе и смотреть, как меняется свет: днём — синева моря и солнце над горным хребтом, вечером — розовый закат, силуэты гор и первые звёзды.`],images:[`images/territory/views/1.webp`,`images/territory/views/2.webp`,`images/territory/views/3.webp`],mediaSide:`right`},{slug:`pool`,eyebrow:`Территория`,title:`Бассейн`,text:[`Просторный бассейн — сердце территории апарт-отеля. Здесь можно провести целый день: поплавать, позагорать или просто расслабиться на воде под крымским солнцем.`,`Рядом — удобные лежаки в тени зелени, где приятно отдохнуть с книгой или прохладным напитком после купания.`],images:[`images/territory/pool/1.webp`,`images/territory/pool/2.webp`,`images/territory/pool/3.webp`],mediaSide:`left`},{slug:`garden`,eyebrow:`Территория`,title:`Сад`,text:[`В самом сердце территории — уютный тропический сад с пышной зеленью и крупными резными листьями алоказии. Деревянная перголa и мощёные дорожки создают атмосферу настоящего южного оазиса.`,`Здесь приятно укрыться в тени в жаркий полдень, неспешно прогуляться среди зелени или сделать несколько красивых фотографий на память.`],images:[`images/territory/garden/1.webp`,`images/territory/garden/2.webp`],mediaSide:`right`},{slug:`banya-bbq`,eyebrow:`Территория`,title:`Банный чан и BBQ-зона`,text:[`Деревянный банный чан под открытым небом — место для настоящего расслабления: горячая вода, свежий воздух и вид на зелень сада. Отличное завершение дня перед сном или бодрое начало утра.`,`Рядом — мангальная зона, где приятно собраться компанией вечером: приготовить ужин на углях и продолжить разговоры допоздна.`],images:[`images/territory/banya-bbq/1.webp`,`images/territory/banya-bbq/2.webp`],mediaSide:`left`}];function d(e){let t=e.images.map((t,n)=>`<img src="${t}" alt="${e.title} — фото ${n+1}" loading="lazy" />`).join(``),n=e.text.map(e=>`<p>${e}</p>`).join(``),r=e.mediaSide===`left`?` territory-block--media-left`:``,i=` territory-block__media--count-${Math.min(e.images.length,3)}`;return`
    <section class="territory-block${r}" data-reveal>
      <div class="territory-block__content">
        <p class="territory-block__eyebrow">${e.eyebrow}</p>
        <h2 class="territory-block__title">${e.title}</h2>
        <div class="territory-block__text">${n}</div>
      </div>
      <div class="territory-block__media${i}">${t}</div>
    </section>
  `}function f(){let e=document.querySelector(`[data-territory-blocks]`);e&&(e.innerHTML=u.map(d).join(``))}a(),e(),r(),t(),l(),f();