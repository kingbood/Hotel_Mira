export function initHeroVideo() {
  const videos = document.querySelectorAll<HTMLVideoElement>('.hero__video');
  videos.forEach((video) => {
    if (!video.src) return;
    const start = () => video.play().catch(() => undefined);
    if (video.readyState >= 2) start();
    else video.addEventListener('loadeddata', start, { once: true });
  });
}

export function activateHeroVideo(theme: 'light' | 'dark') {
  const selector = theme === 'light' ? '.hero__video--day' : '.hero__video--night';
  const video = document.querySelector<HTMLVideoElement>(selector);
  if (!video) return;

  if (!video.src) {
    const poster = video.dataset.poster;
    const src = video.dataset.src;
    if (poster) video.poster = poster;
    if (src) video.src = src;
    video.preload = 'auto';
  }

  video.play().catch(() => undefined);
}
