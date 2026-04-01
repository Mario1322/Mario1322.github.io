/**
 * Premium Effects Module
 * Includes Scroll Progress Bar & 3D Tilt Effect
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    init3DTilt();
});

/**
 * Gold Scroll Progress Bar
 * Injected at the bottom of the sticky header
 */
function initScrollProgress() {
    const header = document.querySelector('.header');
    if (!header) return;

    const container = document.createElement('div');
    container.className = 'scroll-progress-container';
    
    const bar = document.createElement('div');
    bar.className = 'scroll-progress-bar';
    
    container.appendChild(bar);
    header.appendChild(container);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        bar.style.width = scrolled + "%";
    });
}

/**
 * 3D Tilt Effect for Project Cards
 * Physics-based rotation following the mouse
 */
function init3DTilt() {
    const cards = document.querySelectorAll('.project-card-full');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Adjust rotation strength (increase/decrease for different effect)
            const rotateX = (centerY - y) / 15; 
            const rotateY = (x - centerX) / 15;
            
            card.style.transform = `perspective(1000px) translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // Subtly move the inner before-gradient
            const before = card.style;
            card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
            card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) translateY(0) rotateX(0deg) rotateY(0deg)`;
        });
    });
}
