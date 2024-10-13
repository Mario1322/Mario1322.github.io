document.addEventListener('DOMContentLoaded', function () {
    const popupContainer = document.querySelector('.popup-container');
    const closeButton = document.querySelector('.close');
    const popupInfo = document.querySelector('.popup-info');
    let hidePopupTimeout; // Para el timer que oculta el popup

    // Inicializa el popup como oculto
    popupContainer.style.display = 'none';

    closeButton.addEventListener('click', function () {
        popupContainer.style.display = 'none'; // Cerrar el popup
        clearTimeout(hidePopupTimeout); // Limpia el timeout si se cierra manualmente
    });

    const popupTriggers = document.querySelectorAll('.popup-trigger');

    popupTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', function () {
            clearTimeout(hidePopupTimeout); // Limpiar timeout antes de mostrar
            const info = this.dataset.info; // Obtiene el texto del atributo data-info
            if (info) {
                popupInfo.textContent = info; // Establece el texto en el popup
                popupContainer.style.display = 'flex'; // Muestra el popup
            }
        });

        trigger.addEventListener('mouseleave', function () {
            // Establecer un timeout para ocultar el popup
            hidePopupTimeout = setTimeout(() => {
                popupContainer.style.display = 'none'; // Oculta el popup
            }, 50); // Espera 300ms antes de ocultar
        });
    });

    // Para evitar el parpadeo si el mouse entra en el popup
    popupContainer.addEventListener('mouseenter', function () {
        clearTimeout(hidePopupTimeout); // Limpia el timeout si el mouse entra en el popup
    });

    popupContainer.addEventListener('mouseleave', function () {
        popupContainer.style.display = 'none'; // Oculta el popup al salir
    });
});
