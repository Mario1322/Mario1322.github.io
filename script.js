function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function getCookie(name) {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, '');
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function removeQueryParam(param) {
  const url = new URL(window.location);
  url.searchParams.delete(param);
  window.history.replaceState({}, document.title, url.pathname + url.search);
}

document.addEventListener("DOMContentLoaded", function () {
  const defaultSection = document.getElementById("default");
  const subscribedSection = document.getElementById("subscribed");
  const form = document.getElementById("newsletter");

 

  

  

  particlesJS("particles-js", {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#1B365D" },
      shape: { type: "edge" },
      opacity: { value: 1, random: true },
      size: { value: 4, random: true },
      line_linked: { enable: true, distance: 150, color: "#1B365D", opacity: 0.4, width: 1 },
      move: { enable: true, speed: 1, random: true, out_mode: "out" }
    },
    interactivity: {
      detect_on: "window",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "repulse" },
        resize: true
      },
      modes: {
        repulse: { distance: 120, duration: 0.5 },
  
      }
    },
    retina_detect: true
  });
});
