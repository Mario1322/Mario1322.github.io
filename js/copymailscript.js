// Seleccionar elementos
const copyButton = document.getElementById('copy-button');
const popup = document.getElementById('popup1');
const closePopup = document.getElementById('close-popup1');
const emailNode = document.getElementById('email-text');

if (copyButton && popup && closePopup && emailNode) {
    const emailText = emailNode.innerText.trim();

    // Evento para copiar el correo
    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(emailText).then(() => {
            popup.style.display = 'flex';
            setTimeout(() => {
                popup.style.display = 'none';
            }, 2000);
        });
    });

    // Evento para cerrar el popup
    closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Cerrar el popup si se hace clic fuera del contenido
    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && popup.style.display === 'flex') {
            popup.style.display = 'none';
        }
    });
}
