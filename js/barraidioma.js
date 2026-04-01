document.addEventListener("DOMContentLoaded", function () {
  const progresosIdiomas = {
    espanol: 100, // Nativo
    ingles: 85,  // C1 Avanzado
  };

  for (let idioma in progresosIdiomas) {
    if (Object.prototype.hasOwnProperty.call(progresosIdiomas, idioma)) {
      let barra = document.querySelector(`.${idioma} .bar`);

      if (barra) {
        // Inicialmente a 0 para que la animación suba
        barra.style.width = "0%";
        
        setTimeout(function () {
          barra.style.transition = "width 1.75s cubic-bezier(0.1, 0.5, 0.2, 1)";
          barra.style.width = progresosIdiomas[idioma] + "%";
        }, 300);
      }
    }
  }
});
