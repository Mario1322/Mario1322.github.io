const PARTICLES_SRC = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';

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

function shouldRenderParticles() {
    const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveDataEnabled = navigator.connection && navigator.connection.saveData;
    const isSmallScreen = window.innerWidth < 640;
    return !hasReducedMotion && !saveDataEnabled && !isSmallScreen;
}

function initParticles() {
    if (typeof particlesJS !== 'function') {
        return;
    }

    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#1B365D' },
            shape: { type: 'edge' },
            opacity: { value: 1, random: true },
            size: { value: 4, random: true },
            line_linked: { enable: true, distance: 150, color: '#1B365D', opacity: 0.4, width: 1 },
            move: { enable: true, speed: 1, random: true, out_mode: 'out' }
        },
        interactivity: {
            detect_on: 'window',
            events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'repulse' },
                resize: true
            },
            modes: {
                repulse: { distance: 120, duration: 0.5 }
            }
        },
        retina_detect: true
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const particlesContainer = document.getElementById('particles-js');
    if (!particlesContainer) {
        return;
    }

    if (!shouldRenderParticles()) {
        particlesContainer.style.display = 'none';
        return;
    }

    const startParticles = () => {
        loadScript(PARTICLES_SRC)
            .then(initParticles)
            .catch(() => {
                particlesContainer.style.display = 'none';
            });
    };

    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(startParticles, { timeout: 2000 });
    } else {
        setTimeout(startParticles, 600);
    }
});
