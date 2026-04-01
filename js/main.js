import './particles.js';
import './navbar.js';
import './tema.js';
import './maquinaescribir.js';
import './popup.js';
import './copymailscript.js';
import './barraidioma.js';
import './pdfscript.js';
import './scrollanimation.js';
import './baffleEffect.js';
import './courseGroups.js';
import './premiumEffects.js';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      const banner = document.getElementById('update-banner');
      const reloadBtn = document.getElementById('update-reload');
      const showBanner = () => banner?.classList.add('is-visible');

      if (registration.waiting) showBanner();

      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (!newWorker) return;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            showBanner();
          }
        });
      });

      reloadBtn?.addEventListener('click', () => {
        if (!registration.waiting) return;
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      });
    }).catch((error) => {
      console.warn('Service Worker error:', error);
    });

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    });
  });
}
