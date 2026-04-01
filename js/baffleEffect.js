const BAFFLE_SRC = "js/baffle.min.js";

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-dynamic-src="${src}"]`);
    if (existing) {
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.dynamicSrc = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

document.addEventListener("DOMContentLoaded", () => {
  if (prefersReducedMotion()) return;

  const characters = "█▓▓ ░░>██ ▓█▓>▓ ▓<█ ░<▒░▓ █░<█ █▒> ▓░▓< ▒▓░░";
  let isLoaded = false;

  const applyBaffle = (node, duration = 1200) => {
    if (typeof window.baffle === "undefined") return;
    const b = window.baffle(node, { characters, speed: 60 });
    b.start().reveal(duration);
  };

  const initSectionBaffle = () => {
    const titles = document.querySelectorAll('.titulo h2');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          applyBaffle(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    titles.forEach(t => observer.observe(t));
    
    // Also apply to profession line on load
    const profession = document.querySelector('.profesion');
    if (profession) applyBaffle(profession, 2000);
  };

  const boot = () =>
    loadScript(BAFFLE_SRC)
      .then(() => {
        isLoaded = true;
        initSectionBaffle();
      })
      .catch(() => {});

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(boot, { timeout: 1500 });
  } else {
    setTimeout(boot, 500);
  }

  // Support re-trigger on language change for profession only
  document.addEventListener("i18n:changed", () => {
    if (isLoaded && !prefersReducedMotion()) {
      const profession = document.querySelector('.profesion');
      if (profession) applyBaffle(profession, 1500);
    }
  });
});
