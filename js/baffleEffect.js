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
  if (prefersReducedMotion()) {
    return;
  }

  let baffleInstance = null;
  let isLoaded = false;

  const startEffect = () => {
    const profesionNode = document.querySelector(".profesion");
    if (!profesionNode || typeof window.baffle === "undefined") {
      return;
    }

    if (baffleInstance) {
      baffleInstance.stop();
    }

    baffleInstance = window.baffle(profesionNode);
    baffleInstance.set({
      characters: "█▓▓ ░░>██ ▓█▓>▓ ▓<█ ░<▒░▓ █░<█ █▒> ▓░▓< ▒▓░░",
      speed: 90,
    });
    baffleInstance.start();
    baffleInstance.reveal(3000);
  };

  const boot = () =>
    loadScript(BAFFLE_SRC)
      .then(() => {
        isLoaded = true;
        startEffect();
      })
      .catch(() => {});

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(boot, { timeout: 1500 });
  } else {
    setTimeout(boot, 500);
  }

  document.addEventListener("i18n:changed", () => {
    if (prefersReducedMotion()) {
      return;
    }
    if (isLoaded) {
      startEffect();
    } else {
      boot();
    }
  });
});
