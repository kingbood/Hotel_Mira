export function initLoader() {
  const root = document.documentElement;
  const loader = document.querySelector<HTMLElement>('[data-loader]');

  let revealed = false;
  function reveal() {
    if (revealed) return;
    revealed = true;
    root.classList.remove('is-loading');
    if (loader) {
      loader.classList.add('is-hidden');
      window.setTimeout(() => loader.remove(), 500);
    }
  }

  const fontsReady = 'fonts' in document ? document.fonts.ready.catch(() => undefined) : Promise.resolve();

  const heroVideo = document.querySelector<HTMLVideoElement>('.hero__video[src]');
  const videoReady = heroVideo
    ? new Promise<void>((resolve) => {
        if (heroVideo.readyState >= 2) resolve();
        else heroVideo.addEventListener('loadeddata', () => resolve(), { once: true });
      })
    : Promise.resolve();

  Promise.all([fontsReady, videoReady]).then(reveal);
  window.setTimeout(reveal, 2000);
}
