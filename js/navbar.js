// navbar.js

let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

if (menuIcon && navbar) {
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
  menuIcon.setAttribute("aria-expanded", "false");

  menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
    menuIcon.setAttribute("aria-expanded", navbar.classList.contains("active").toString());
  };

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navbar.classList.contains("active")) {
      menuIcon.classList.remove("bx-x");
      navbar.classList.remove("active");
      menuIcon.setAttribute("aria-expanded", "false");
      menuIcon.focus();
    }
  });
}

// Función de throttle para rendimiento
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

const handleScroll = () => {
  let sections = document.querySelectorAll("section");
  let navLinks = document.querySelectorAll("header nav a");
  let fromTop = window.scrollY;
  let viewportBottom = window.innerHeight + window.scrollY;
  let documentHeight = document.documentElement.scrollHeight;
  let isAtPageBottom = viewportBottom >= documentHeight - 4;
  let matchedLink = null;

  sections.forEach((sec) => {
    let sectionId = sec.getAttribute("id");
    let navLink = document.querySelector(
      `header nav a[href="#${sectionId}"], header nav a[href$="/#${sectionId}"]`,
    );
    let offset = sec.offsetTop - 150; // Ajustado para un trigger más natural
    let height = sec.offsetHeight;

    if (fromTop >= offset && fromTop < offset + height && navLink) {
      matchedLink = navLink;
    }
  });

  if (isAtPageBottom) {
    let contactLink = document.querySelector(
      'header nav a[href="#contacto"], header nav a[href$="/#contacto"]',
    );
    if (contactLink) {
      matchedLink = contactLink;
    }
  }

  if (matchedLink) {
    navLinks.forEach((link) => {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    });
    matchedLink.classList.add("active");
    matchedLink.setAttribute("aria-current", "page");
  }

  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

  // Cerrar menú móvil al hacer scroll (opcional, mejora UX en ciertos diseños)
  if (window.scrollY > 100 && navbar?.classList.contains("active")) {
    menuIcon?.classList.remove("bx-x");
    menuIcon?.setAttribute("aria-expanded", "false");
    navbar?.classList.remove("active");
  }
};

window.addEventListener("scroll", throttle(handleScroll, 80));
