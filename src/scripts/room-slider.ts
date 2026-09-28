export function sliderControlsHTML(): string {
  return `
    <button class="slider__nav slider__nav--prev" data-prev type="button" aria-label="Предыдущее фото">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
    <button class="slider__nav slider__nav--next" data-next type="button" aria-label="Следующее фото">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
    <div class="slider__dots" data-dots></div>
  `;
}

export function initSlider(root: HTMLElement) {
  const track = root.querySelector<HTMLElement>('[data-track]');
  const prev = root.querySelector<HTMLButtonElement>('[data-prev]');
  const next = root.querySelector<HTMLButtonElement>('[data-next]');
  const dotsWrap = root.querySelector<HTMLElement>('[data-dots]');
  if (!track) return;

  const slides = Array.from(track.children) as HTMLElement[];
  const count = slides.length;
  if (count <= 1) return;

  let index = 0;
  const dots: HTMLButtonElement[] = [];

  function update() {
    track!.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
  }

  function goTo(i: number) {
    index = (i + count) % count;
    update();
  }

  if (dotsWrap) {
    dotsWrap.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'slider__dot';
      dot.setAttribute('aria-label', `Фото ${i + 1}`);
      dot.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        goTo(i);
      });
      dotsWrap.appendChild(dot);
      dots.push(dot);
    });
  }

  prev?.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    goTo(index - 1);
  });

  next?.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    goTo(index + 1);
  });

  update();
}
