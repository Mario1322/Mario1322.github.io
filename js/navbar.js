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
    let fromTop = window.scrollY;

    sections.forEach(sec => {
        let sectionId = sec.getAttribute('id');
        let navLink = document.querySelector(`header nav a[href="#${sectionId}"]`);
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;

        if (fromTop >= offset && fromTop < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });

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
