const form = document.querySelector('.contenidodatos');
const popup = document.getElementById('popup1');
const popupMessage = document.getElementById('popup-message');

if (form && popup && popupMessage) {
  const defaultMessageEs = popupMessage.dataset.i18nEs || popupMessage.textContent;
  const defaultMessageEn = popupMessage.dataset.i18nEn || popupMessage.textContent;

  const getLang = () => (document.documentElement.lang || 'es').toLowerCase().startsWith('en') ? 'en' : 'es';

  const messages = {
    es: {
      success: 'Mensaje enviado correctamente.',
      error: 'No se pudo enviar. Intentalo de nuevo.'
    },
    en: {
      success: 'Message sent successfully.',
      error: 'Could not send. Please try again.'
    }
  };

  const showPopup = (text) => {
    popupMessage.textContent = text;
    popup.style.display = 'flex';
    setTimeout(() => {
      popup.style.display = 'none';
      popupMessage.textContent = getLang() === 'en' ? defaultMessageEn : defaultMessageEs;
    }, 2200);
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const lang = getLang();
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        mode: 'no-cors'
      });
      if (response || response === undefined) {
        form.reset();
        showPopup(messages[lang].success);
      }
    } catch (error) {
      showPopup(messages[lang].error);
    }
  });
}
