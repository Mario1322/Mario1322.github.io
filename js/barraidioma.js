document.addEventListener("DOMContentLoaded", function () {
  const progresosIdiomas = {
    espanol: 100,
    ingles: 85,
  };

  const barras = Object.entries(progresosIdiomas).map(([idioma, pct]) => {
    const container = document.querySelector(`.bar-container.${idioma}`);
    const bar = container?.querySelector(".bar");
    return { container, bar, pct, animated: false };
  }).filter((b) => b.container && b.bar);

  if (barras.length === 0) return;

  // Empezar en 0 para que la animación sea visible
  barras.forEach((b) => { b.bar.style.width = "0%"; });

  // Disparar cuando el contenedor entre en el viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const barra = barras.find((b) => b.container === entry.target);
        if (!barra || barra.animated) return;
        barra.animated = true;
        observer.unobserve(entry.target);
        requestAnimationFrame(() => {
          barra.bar.style.transition = "width 1.75s cubic-bezier(0.1, 0.5, 0.2, 1)";
          barra.bar.style.width = barra.pct + "%";
        });
      });
    },
    { threshold: 0.1 },
  );

  barras.forEach((b) => observer.observe(b.container));
});
