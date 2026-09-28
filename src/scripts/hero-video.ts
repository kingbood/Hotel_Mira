export function initHeroVideo() {
  const videos = document.querySelectorAll<HTMLVideoElement>('.hero__video');
  videos.forEach((video) => {
    const start = () => video.play().catch(() => undefined);
    if (video.readyState >= 2) start();
    else video.addEventListener('loadeddata', start, { once: true });
  });
}
