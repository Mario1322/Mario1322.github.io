const BAFFLE_SRC = 'js/baffle.min.js';

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[data-dynamic-src="${src}"]`);
        if (existing) {
            existing.addEventListener('load', resolve, { once: true });
            existing.addEventListener('error', reject, { once: true });
            return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.dataset.dynamicSrc = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const profesionNode = document.querySelector('.profesion');
    if (!profesionNode) {
        return;
    }

    const startEffect = () => {
        if (typeof baffle !== 'undefined') {
            const profesion = baffle('.profesion');

            profesion.set({
                characters: '█▓▓ ░░>██ ▓█▓>▓ ▓<█ ░<▒░▓ █░<█ █▒> ▓░▓< ▒▓░░',
                speed: 90
            });

            profesion.start();
            profesion.reveal(3000);
        }
    };

    const boot = () => loadScript(BAFFLE_SRC).then(startEffect).catch(() => {});
    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(boot, { timeout: 1500 });
    } else {
        setTimeout(boot, 500);
    }
});
