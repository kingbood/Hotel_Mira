import { rooms, type Room } from '../data/rooms';
import { formatPrice } from './rooms-catalog';
import { initSlider } from './room-slider';

type Guests = '1-2' | '3-4' | '5+';
type RestType = 'romantic' | 'family' | 'friends' | 'calm';
type Priority = 'sea' | 'pool' | 'banya' | 'space' | 'lounge';

interface Answers {
  checkIn: string;
  checkOut: string;
  guests: Guests | null;
  restType: RestType | null;
  priority: Priority | null;
}

const GUEST_OPTIONS: { value: Guests; label: string }[] = [
  { value: '1-2', label: '1–2 гостя' },
  { value: '3-4', label: '3–4 гостя' },
  { value: '5+', label: '5 и более гостей' },
];

const REST_OPTIONS: { value: RestType; label: string }[] = [
  { value: 'romantic', label: 'Романтический отдых' },
  { value: 'family', label: 'Семейный отдых' },
  { value: 'friends', label: 'Отдых с друзьями' },
  { value: 'calm', label: 'Спокойный отдых' },
];

const PRIORITY_OPTIONS: { value: Priority; label: string }[] = [
  { value: 'sea', label: 'Вид на море' },
  { value: 'pool', label: 'Бассейн' },
  { value: 'banya', label: 'Банный чан' },
  { value: 'space', label: 'Просторный номер' },
  { value: 'lounge', label: 'Зона отдыха' },
];

const TOTAL_STEPS = 4;

function pickCategory(a: Answers): '1' | '2' | '3' {
  const scores: Record<'1' | '2' | '3', number> = { '1': 0, '2': 0, '3': 0 };

  if (a.guests === '1-2') scores['1'] += 2;
  if (a.guests === '3-4') scores['2'] += 2;
  if (a.guests === '5+') scores['3'] += 2;

  if (a.restType === 'romantic') scores['1'] += 1;
  if (a.restType === 'calm') scores['1'] += 1;
  if (a.restType === 'family') scores['2'] += 1;
  if (a.restType === 'friends') scores['3'] += 1;

  if (a.priority === 'space') {
    scores['2'] += 1;
    scores['3'] += 1;
  }

  return (['1', '2', '3'] as const).reduce((best, cat) => (scores[cat] > scores[best] ? cat : best));
}

function pickRoom(category: '1' | '2' | '3'): Room {
  const candidates = rooms.filter((r) => r.category === category);
  return candidates.reduce((cheapest, r) => (r.price < cheapest.price ? r : cheapest), candidates[0]);
}

function formatDate(value: string): string {
  if (!value) return '';
  const [y, m, d] = value.split('-');
  return `${d}.${m}.${y}`;
}

export function initQuiz() {
  const root = document.querySelector<HTMLElement>('[data-quiz]');
  if (!root) return;

  const answers: Answers = { checkIn: '', checkOut: '', guests: null, restType: null, priority: null };
  let step = 0; // 0 = intro, 1..4 = questions, 5 = result

  function progressHTML(current: number): string {
    return `
      <div class="quiz__progress" aria-hidden="true">
        <span class="quiz__progress-bar" style="width:${(current / TOTAL_STEPS) * 100}%"></span>
      </div>
      <p class="quiz__step-count">Вопрос ${current} из ${TOTAL_STEPS}</p>
    `;
  }

  function renderIntro(): string {
    return `
      <div class="quiz__intro">
        <button class="btn btn--primary quiz__start" type="button" data-quiz-start>
          <span class="btn__label">Подобрать апартаменты</span>
        </button>
      </div>
    `;
  }

  function renderQuestion(n: number): string {
    if (n === 1) {
      return `
        ${progressHTML(1)}
        <h3 class="quiz__question">Когда планируете приехать?</h3>
        <div class="quiz__dates">
          <label class="quiz__date-field">
            <span>Заезд</span>
            <input type="date" data-quiz-checkin value="${answers.checkIn}" />
          </label>
          <label class="quiz__date-field">
            <span>Выезд</span>
            <input type="date" data-quiz-checkout value="${answers.checkOut}" />
          </label>
        </div>
        <div class="quiz__nav">
          <button class="btn btn--ghost quiz__skip" type="button" data-quiz-next>
            <span class="btn__label">Далее</span>
          </button>
        </div>
      `;
    }

    if (n === 2) {
      return `
        ${progressHTML(2)}
        <h3 class="quiz__question">Сколько будет гостей?</h3>
        <div class="quiz__options" role="group" aria-label="Количество гостей">
          ${GUEST_OPTIONS.map(
            (o) =>
              `<button class="quiz__option${answers.guests === o.value ? ' is-active' : ''}" type="button" data-quiz-option="guests" data-value="${o.value}">${o.label}</button>`
          ).join('')}
        </div>
        <div class="quiz__nav">
          <button class="quiz__back" type="button" data-quiz-back>← Назад</button>
        </div>
      `;
    }

    if (n === 3) {
      return `
        ${progressHTML(3)}
        <h3 class="quiz__question">Какой отдых планируете?</h3>
        <div class="quiz__options" role="group" aria-label="Тип отдыха">
          ${REST_OPTIONS.map(
            (o) =>
              `<button class="quiz__option${answers.restType === o.value ? ' is-active' : ''}" type="button" data-quiz-option="restType" data-value="${o.value}">${o.label}</button>`
          ).join('')}
        </div>
        <div class="quiz__nav">
          <button class="quiz__back" type="button" data-quiz-back>← Назад</button>
        </div>
      `;
    }

    return `
      ${progressHTML(4)}
      <h3 class="quiz__question">Что для вас особенно важно?</h3>
      <div class="quiz__options" role="group" aria-label="Что важно">
        ${PRIORITY_OPTIONS.map(
          (o) =>
            `<button class="quiz__option${answers.priority === o.value ? ' is-active' : ''}" type="button" data-quiz-option="priority" data-value="${o.value}">${o.label}</button>`
        ).join('')}
      </div>
      <div class="quiz__nav">
        <button class="quiz__back" type="button" data-quiz-back>← Назад</button>
      </div>
    `;
  }

  function renderResult(): string {
    const category = pickCategory(answers);
    const room = pickRoom(category);

    const dateLine =
      answers.checkIn && answers.checkOut
        ? ` на ${formatDate(answers.checkIn)}–${formatDate(answers.checkOut)}`
        : '';
    const message = encodeURIComponent(
      `Здравствуйте! Прошёл подбор на сайте — подходят апартаменты «${room.title}». Хочу проверить наличие${dateLine}.`
    );

    return `
      <div class="quiz__result">
        <p class="quiz__result-eyebrow">Для вашего отдыха подойдёт</p>
        <h3 class="quiz__result-title">${room.title}</h3>
        <div class="quiz__result-card">
          <div class="quiz__result-media" data-slider>
            <div class="slider__track" data-track>
              <img src="${room.images[0]}" alt="${room.title}" loading="lazy" />
            </div>
          </div>
          <div class="quiz__result-body">
            <p class="quiz__result-desc">${room.shortDescription}</p>
            <span class="quiz__result-price">${formatPrice(room.price)}<small>/сутки</small></span>
            <div class="quiz__result-actions">
              <a class="btn btn--primary" href="https://wa.me/79177690505?text=${message}" target="_blank" rel="noopener noreferrer">
                <span class="btn__label">Проверить наличие</span>
              </a>
              <a class="quiz__result-more" href="room.html?slug=${room.slug}">Подробнее об апартаментах →</a>
            </div>
          </div>
        </div>
        <button class="quiz__restart" type="button" data-quiz-restart>Пройти опрос заново</button>
      </div>
    `;
  }

  function render() {
    if (step === 0) {
      root!.innerHTML = renderIntro();
    } else if (step >= 1 && step <= TOTAL_STEPS) {
      root!.innerHTML = renderQuestion(step);
    } else {
      root!.innerHTML = renderResult();
    }
    wire();
  }

  function wire() {
    root!.querySelector('[data-quiz-start]')?.addEventListener('click', () => {
      step = 1;
      render();
    });

    root!.querySelector('[data-quiz-checkin]')?.addEventListener('change', (e) => {
      answers.checkIn = (e.target as HTMLInputElement).value;
    });
    root!.querySelector('[data-quiz-checkout]')?.addEventListener('change', (e) => {
      answers.checkOut = (e.target as HTMLInputElement).value;
    });

    root!.querySelectorAll<HTMLButtonElement>('[data-quiz-option]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const field = btn.dataset.quizOption as 'guests' | 'restType' | 'priority';
        const value = btn.dataset.value as string;
        (answers as unknown as Record<string, unknown>)[field] = value;
        step += 1;
        render();
      });
    });

    root!.querySelector('[data-quiz-next]')?.addEventListener('click', () => {
      step += 1;
      render();
    });

    root!.querySelector('[data-quiz-back]')?.addEventListener('click', () => {
      step = Math.max(1, step - 1);
      render();
    });

    root!.querySelector('[data-quiz-restart]')?.addEventListener('click', () => {
      answers.checkIn = '';
      answers.checkOut = '';
      answers.guests = null;
      answers.restType = null;
      answers.priority = null;
      step = 0;
      render();
    });

    const slider = root!.querySelector<HTMLElement>('[data-slider]');
    if (slider) initSlider(slider);
  }

  render();
}
