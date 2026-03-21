const form = document.querySelector('form.contenidodatos');
const popup = document.getElementById('popup2');
const closePopup = document.getElementById('close-popup2');
const popupMessage = document.getElementById('popup-message2');

// Close logic
if (closePopup && popup) {
    closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
    });

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

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Disable button while sending
        const submitBtn = form.querySelector('button[id="send"]');
        const originalBtnText = submitBtn.innerText;
        const currentLang = document.documentElement.lang || 'es';
        
        // Set sending text based on language
        submitBtn.innerText = currentLang === 'en' ? 'Sending...' : 'Enviando...';
        submitBtn.disabled = true;

        const formData = new FormData(form);
        const actionUrl = form.getAttribute('action');

        try {
            const response = await fetch(actionUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                form.reset();
                if (popup) {
                    popup.style.display = 'flex';
                    setTimeout(() => {
                        popup.style.display = 'none';
                    }, 3000);
                }
            } else {
                alert(currentLang === 'en' ? 'Error sending message. Please try again later.' : 'Error al enviar el mensaje. Por favor, inténtelo de nuevo más tarde.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert(currentLang === 'en' ? 'Error sending message. Please try again later.' : 'Error al enviar el mensaje. Por favor, inténtelo de nuevo más tarde.');
        } finally {
            if (submitBtn) {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        }
    });
}
