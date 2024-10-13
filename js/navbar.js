// navbar.js

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

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
            navLink.classList.add('active');
        }
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};
