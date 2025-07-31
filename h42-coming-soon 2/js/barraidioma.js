// barraidioma.js


// Itera sobre cada idioma y actualiza su barra de progreso
for (let idioma in progresosIdiomas) {
    if (progresosIdiomas.hasOwnProperty(idioma)) {
        // Calcula el ancho del contenido de la barra en función del progreso del idioma
        var barContentWidth = progresosIdiomas[idioma] + "%";

        // Selecciona la barra de progreso correspondiente al idioma y actualiza su ancho
        setTimeout(function () {
            document.querySelector(`.${idioma} .bar`).style.width = barContentWidth;
        }, 1000); // Cambia el valor de 1000 a la cantidad de milisegundos de retraso que desees
    }
}
