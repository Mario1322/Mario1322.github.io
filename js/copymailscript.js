// Seleccionar elementos
const copyButton = document.getElementById('copy-button');
const popup = document.getElementById('popup1');
const closePopup = document.getElementById('close-popup1');
const emailText = document.getElementById('email-text').innerText;

// Evento para copiar el correo
copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(emailText).then(() => {
        // Mostrar el popup
        popup.style.display = 'flex'; // Mostrar el popup
        
        // Cerrar el popup automáticamente después de 5 segundos
        setTimeout(() => {
            popup.style.display = 'none'; // Ocultar el popup
        }, 2000); // 2000 ms = 2 segundos
    });
});

// Evento para cerrar el popup
closePopup.addEventListener('click', () => {
    popup.style.display = 'none'; // Ocultar el popup
});

// Cerrar el popup si se hace clic fuera del contenido
window.addEventListener('click', (event) => {
    if (event.target === popup) {
        popup.style.display = 'none'; // Ocultar el popup
    }
});
