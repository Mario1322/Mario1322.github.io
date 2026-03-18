document.addEventListener('DOMContentLoaded', () => {
    const particlesContainer = document.getElementById('particles-js');

    if (!particlesContainer || typeof particlesJS === 'undefined') {
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
});
