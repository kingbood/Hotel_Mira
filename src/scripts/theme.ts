type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

function applyToggleLabel(button: HTMLButtonElement, theme: Theme) {
  const next: Theme = theme === 'dark' ? 'light' : 'dark';
  const label = next === 'dark' ? 'Переключить тему на ночную' : 'Переключить тему на дневную';
  button.setAttribute('aria-pressed', String(theme === 'dark'));
  button.setAttribute('aria-label', label);
}

export function initThemeToggle() {
  const root = document.documentElement;
  const button = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
  if (!button) return;

  const current = (root.getAttribute('data-theme') as Theme) || 'dark';
  applyToggleLabel(button, current);

  button.addEventListener('click', () => {
    const activeTheme = (root.getAttribute('data-theme') as Theme) || 'dark';
    const nextTheme: Theme = activeTheme === 'dark' ? 'light' : 'dark';

    root.setAttribute('data-theme', nextTheme);

    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      /* localStorage unavailable (private mode, disabled storage) — theme still applies for this view */
    }

    applyToggleLabel(button, nextTheme);
  });
}
