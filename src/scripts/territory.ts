import { territoryBlocks } from '../data/territory';

function renderBlock(block: (typeof territoryBlocks)[number]): string {
  const photos = block.images
    .map((src, i) => `<img src="${src}" alt="${block.title} — фото ${i + 1}" loading="lazy" />`)
    .join('');

  const paragraphs = block.text.map((p) => `<p>${p}</p>`).join('');
  const modifier = block.mediaSide === 'left' ? ' territory-block--media-left' : '';

  return `
    <section class="territory-block${modifier}" data-reveal>
      <div class="territory-block__content">
        <p class="territory-block__eyebrow">${block.eyebrow}</p>
        <h2 class="territory-block__title">${block.title}</h2>
        <div class="territory-block__text">${paragraphs}</div>
      </div>
      <div class="territory-block__media">${photos}</div>
    </section>
  `;
}

export function initTerritory() {
  const list = document.querySelector<HTMLElement>('[data-territory-blocks]');
  if (!list) return;

  list.innerHTML = territoryBlocks.map(renderBlock).join('');
}
