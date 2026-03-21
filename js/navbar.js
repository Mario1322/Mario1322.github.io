// navbar.js

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
    menuIcon.setAttribute('aria-expanded', 'false');

    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
        menuIcon.setAttribute('aria-expanded', navbar.classList.contains('active').toString());
    };

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navbar.classList.contains('active')) {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
            menuIcon.setAttribute('aria-expanded', 'false');
            menuIcon.focus();
        }
    });
}

window.onscroll = () => {
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('header nav a');
    let currentSectionId = null;
    let maxVisibleArea = 0;

    let viewportTop = window.scrollY;
    let viewportBottom = window.scrollY + window.innerHeight;

    sections.forEach(sec => {
        let secTop = sec.offsetTop;
        let secBottom = secTop + sec.offsetHeight;

        // Calculate visible height of the section in the viewport
        let visibleTop = Math.max(viewportTop, secTop);
        let visibleBottom = Math.min(viewportBottom, secBottom);

        if (visibleBottom > visibleTop) {
            let visibleHeight = visibleBottom - visibleTop;
            
            // If the section occupies more visible pixels than previous ones, it wins
            if (visibleHeight > maxVisibleArea) {
                maxVisibleArea = visibleHeight;
                currentSectionId = sec.getAttribute('id');
            }
        }
    });

    // Fallback: If at absolute bottom and no section clearly dominated (rare but possible on weird heights)
    // We can just rely on the area logic, it naturally highlights whatever takes up the most screen space!

    if (currentSectionId) {
        navLinks.forEach(link => link.classList.remove('active'));
        let navLink = document.querySelector(`header nav a[href="#${currentSectionId}"]`);
        if (navLink) navLink.classList.add('active');
    }

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    if (menuIcon) {
        menuIcon.classList.remove('bx-x');
        menuIcon.setAttribute('aria-expanded', 'false');
    }
    if (navbar) {
        navbar.classList.remove('active');
    }
};
