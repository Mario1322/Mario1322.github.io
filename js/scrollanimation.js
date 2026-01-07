document.addEventListener('DOMContentLoaded', function () {
    const botonArriba = document.getElementById('boton-arriba');

    if (botonArriba) {
        // Evento click para subir suavemente
        botonArriba.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Mostrar/Ocultar botón al hacer scroll
        window.addEventListener('scroll', function () {
            if (window.scrollY > 0) {
                // Equivalente a slideDown (mostrar)
                botonArriba.style.display = 'block';
                botonArriba.style.opacity = '1';
            } else {
                // Equivalente a slideUp (ocultar)
                botonArriba.style.display = 'none';
                botonArriba.style.opacity = '0';
            }
        });
    }
});