document.addEventListener('DOMContentLoaded', function () {
    const popupContainer = document.querySelector('.popup-container');
    const closeButton = document.querySelector('.close');
    const popupInfo = document.querySelector('.popup-info');

    // Inicializa el popup como oculto
    popupContainer.style.display = 'none';

    closeButton.addEventListener('click', function () {
        popupContainer.style.display = 'none'; // Cerrar el popup
    });

    const popupTriggers = document.querySelectorAll('.popup-trigger');

    popupTriggers.forEach(trigger => {
        trigger.addEventListener('click', function () {
            const info = this.dataset.info; // Obtiene el texto del atributo data-info
            if (info) {
                popupInfo.textContent = info; // Establece el texto en el popup
                popupContainer.style.display = 'flex'; // Muestra el popup
            }
        });
    });

    // Opcional: cerrar el popup al hacer clic fuera de él
    window.addEventListener('click', function (e) {
        if (popupContainer.style.display === 'flex' && !popupContainer.contains(e.target) && !e.target.classList.contains('popup-trigger')) {
            popupContainer.style.display = 'none';
        }
    });
});
