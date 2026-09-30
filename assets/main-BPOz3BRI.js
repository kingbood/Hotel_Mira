import{a as e,i as t,o as n,r,s as i,t as a}from"./room-slider-BBgQVe8-.js";import{r as o,t as s}from"./rooms-catalog-Dwzl9Fyn.js";var c=[{slug:`views`,eyebrow:`Территория`,title:`Виды на море и горы`,text:[`С балконов и террас апарт-отеля открывается панорама на Чёрное море и горы Крыма — от ясного утра до огней вечерней Ялты.`,`Здесь хочется просто сидеть с чашкой кофе и смотреть, как меняется свет: днём — синева моря и солнце над горным хребтом, вечером — розовый закат, силуэты гор и первые звёзды.`],images:[`images/territory/views/1.webp`,`images/territory/views/2.webp`,`images/territory/views/3.webp`],mediaSide:`right`},{slug:`pool`,eyebrow:`Территория`,title:`Бассейн`,text:[`Просторный бассейн — сердце территории апарт-отеля. Здесь можно провести целый день: поплавать, позагорать или просто расслабиться на воде под крымским солнцем.`,`Рядом — удобные лежаки в тени зелени, где приятно отдохнуть с книгой или прохладным напитком после купания.`],images:[`images/territory/pool/1.webp`,`images/territory/pool/2.webp`,`images/territory/pool/3.webp`],mediaSide:`left`},{slug:`garden`,eyebrow:`Территория`,title:`Сад`,text:[`В самом сердце территории — уютный тропический сад с пышной зеленью и крупными резными листьями алоказии. Деревянная перголa и мощёные дорожки создают атмосферу настоящего южного оазиса.`,`Здесь приятно укрыться в тени в жаркий полдень, неспешно прогуляться среди зелени или сделать несколько красивых фотографий на память.`],images:[`images/territory/garden/1.webp`,`images/territory/garden/2.webp`],mediaSide:`right`},{slug:`banya-bbq`,eyebrow:`Территория`,title:`Банный чан и BBQ-зона`,text:[`Деревянный банный чан под открытым небом — место для настоящего расслабления: горячая вода, свежий воздух и вид на зелень сада. Отличное завершение дня перед сном или бодрое начало утра.`,`Рядом — мангальная зона, где приятно собраться компанией вечером: приготовить ужин на углях и продолжить разговоры допоздна.`],images:[`images/territory/banya-bbq/1.webp`,`images/territory/banya-bbq/2.webp`],mediaSide:`left`}];function l(e){let t=e.images.map((t,n)=>`<img src="${t}" alt="${e.title} — фото ${n+1}" loading="lazy" />`).join(``),n=e.text.map(e=>`<p>${e}</p>`).join(``),r=e.mediaSide===`left`?` territory-block--media-left`:``,i=` territory-block__media--count-${Math.min(e.images.length,3)}`;return`
    <section class="territory-block${r}" data-reveal>
      <div class="territory-block__content">
        <p class="territory-block__eyebrow">${e.eyebrow}</p>
        <h2 class="territory-block__title">${e.title}</h2>
        <div class="territory-block__text">${n}</div>
      </div>
      <div class="territory-block__media${i}">${t}</div>
    </section>
  `}function u(){let e=document.querySelector(`[data-territory-blocks]`);e&&(e.innerHTML=c.map(l).join(``))}var d=[{value:`1-2`,label:`1–2 гостя`},{value:`3-4`,label:`3–4 гостя`},{value:`5+`,label:`5 и более гостей`}],f=[{value:`romantic`,label:`Романтический отдых`},{value:`family`,label:`Семейный отдых`},{value:`friends`,label:`Отдых с друзьями`},{value:`calm`,label:`Спокойный отдых`}],p=[{value:`sea`,label:`Вид на море`},{value:`pool`,label:`Бассейн`},{value:`banya`,label:`Банный чан`},{value:`space`,label:`Просторный номер`},{value:`lounge`,label:`Зона отдыха`}],m=4;function h(e){let t={1:0,2:0,3:0};return e.guests===`1-2`&&(t[1]+=2),e.guests===`3-4`&&(t[2]+=2),e.guests===`5+`&&(t[3]+=2),e.restType===`romantic`&&(t[1]+=1),e.restType===`calm`&&(t[1]+=1),e.restType===`family`&&(t[2]+=1),e.restType===`friends`&&(t[3]+=1),e.priority===`space`&&(t[2]+=1,t[3]+=1),[`1`,`2`,`3`].reduce((e,n)=>t[n]>t[e]?n:e)}function g(e){let t=r.filter(t=>t.category===e);return t.reduce((e,t)=>t.price<e.price?t:e,t[0])}function _(e){if(!e)return``;let[t,n,r]=e.split(`-`);return`${r}.${n}.${t}`}function v(){let e=document.querySelector(`[data-quiz]`);if(!e)return;let t={checkIn:``,checkOut:``,guests:null,restType:null,priority:null},n=0;function r(e){return`
      <div class="quiz__progress" aria-hidden="true">
        <span class="quiz__progress-bar" style="width:${e/m*100}%"></span>
      </div>
      <p class="quiz__step-count">Вопрос ${e} из ${m}</p>
    `}function i(){return`
      <div class="quiz__intro">
        <button class="btn btn--primary quiz__start" type="button" data-quiz-start>
          <span class="btn__label">Подобрать апартаменты</span>
        </button>
      </div>
    `}function o(e){return e===1?`
        ${r(1)}
        <h3 class="quiz__question">Когда планируете приехать?</h3>
        <div class="quiz__dates">
          <label class="quiz__date-field">
            <span>Заезд</span>
            <input type="date" data-quiz-checkin value="${t.checkIn}" />
          </label>
          <label class="quiz__date-field">
            <span>Выезд</span>
            <input type="date" data-quiz-checkout value="${t.checkOut}" />
          </label>
        </div>
        <div class="quiz__nav">
          <button class="btn btn--ghost quiz__skip" type="button" data-quiz-next>
            <span class="btn__label">Далее</span>
          </button>
        </div>
      `:e===2?`
        ${r(2)}
        <h3 class="quiz__question">Сколько будет гостей?</h3>
        <div class="quiz__options" role="group" aria-label="Количество гостей">
          ${d.map(e=>`<button class="quiz__option${t.guests===e.value?` is-active`:``}" type="button" data-quiz-option="guests" data-value="${e.value}">${e.label}</button>`).join(``)}
        </div>
        <div class="quiz__nav">
          <button class="quiz__back" type="button" data-quiz-back>← Назад</button>
        </div>
      `:e===3?`
        ${r(3)}
        <h3 class="quiz__question">Какой отдых планируете?</h3>
        <div class="quiz__options" role="group" aria-label="Тип отдыха">
          ${f.map(e=>`<button class="quiz__option${t.restType===e.value?` is-active`:``}" type="button" data-quiz-option="restType" data-value="${e.value}">${e.label}</button>`).join(``)}
        </div>
        <div class="quiz__nav">
          <button class="quiz__back" type="button" data-quiz-back>← Назад</button>
        </div>
      `:`
      ${r(4)}
      <h3 class="quiz__question">Что для вас особенно важно?</h3>
      <div class="quiz__options" role="group" aria-label="Что важно">
        ${p.map(e=>`<button class="quiz__option${t.priority===e.value?` is-active`:``}" type="button" data-quiz-option="priority" data-value="${e.value}">${e.label}</button>`).join(``)}
      </div>
      <div class="quiz__nav">
        <button class="quiz__back" type="button" data-quiz-back>← Назад</button>
      </div>
    `}function c(){let e=g(h(t)),n=t.checkIn&&t.checkOut?` на ${_(t.checkIn)}–${_(t.checkOut)}`:``,r=encodeURIComponent(`Здравствуйте! Прошёл подбор на сайте — подходят апартаменты «${e.title}». Хочу проверить наличие${n}.`);return`
      <div class="quiz__result">
        <p class="quiz__result-eyebrow">Для вашего отдыха подойдёт</p>
        <h3 class="quiz__result-title">${e.title}</h3>
        <div class="quiz__result-card">
          <div class="quiz__result-media" data-slider>
            <div class="slider__track" data-track>
              <img src="${e.images[0]}" alt="${e.title}" loading="lazy" />
            </div>
          </div>
          <div class="quiz__result-body">
            <p class="quiz__result-desc">${e.shortDescription}</p>
            <span class="quiz__result-price">${s(e.price)}<small>/сутки</small></span>
            <div class="quiz__result-actions">
              <a class="btn btn--primary" href="https://wa.me/79177690505?text=${r}" target="_blank" rel="noopener noreferrer">
                <span class="btn__label">Проверить наличие</span>
              </a>
              <a class="quiz__result-more" href="room.html?slug=${e.slug}">Подробнее об апартаментах →</a>
            </div>
          </div>
        </div>
        <button class="quiz__restart" type="button" data-quiz-restart>Пройти опрос заново</button>
      </div>
    `}function l(){n===0?e.innerHTML=i():n>=1&&n<=m?e.innerHTML=o(n):e.innerHTML=c(),u()}function u(){e.querySelector(`[data-quiz-start]`)?.addEventListener(`click`,()=>{n=1,l()}),e.querySelector(`[data-quiz-checkin]`)?.addEventListener(`change`,e=>{t.checkIn=e.target.value}),e.querySelector(`[data-quiz-checkout]`)?.addEventListener(`change`,e=>{t.checkOut=e.target.value}),e.querySelectorAll(`[data-quiz-option]`).forEach(e=>{e.addEventListener(`click`,()=>{let r=e.dataset.quizOption,i=e.dataset.value;t[r]=i,n+=1,l()})}),e.querySelector(`[data-quiz-next]`)?.addEventListener(`click`,()=>{n+=1,l()}),e.querySelector(`[data-quiz-back]`)?.addEventListener(`click`,()=>{n=Math.max(1,n-1),l()}),e.querySelector(`[data-quiz-restart]`)?.addEventListener(`click`,()=>{t.checkIn=``,t.checkOut=``,t.guests=null,t.restType=null,t.priority=null,n=0,l()});let r=e.querySelector(`[data-slider]`);r&&a(r)}l()}i(),e(),n(),t(),o([`mira-1`,`panorama-1`,`lazur-1`]),u(),v();