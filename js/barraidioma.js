document.addEventListener('DOMContentLoaded', function () {
    // Definimos los progresos aquí para evitar errores de referencia
    const progresosIdiomas = {
        espanol: 100,
        ingles: 75
    };

    // Itera sobre cada idioma y actualiza su barra de progreso
    for (let idioma in progresosIdiomas) {
        if (progresosIdiomas.hasOwnProperty(idioma)) {
            let barra = document.querySelector(`.${idioma} .bar`);
            
            if (barra) {
                // Calcula el ancho
                var barContentWidth = progresosIdiomas[idioma] + "%";

                // Animación simple con setTimeout
                setTimeout(function () {
                    barra.style.width = barContentWidth;
                    // Aseguramos que la transición CSS funcione (debe estar en el CSS)
                    barra.style.transition = "width 1s ease-in-out"; 
                }, 500); 
            }
        }
    }
});