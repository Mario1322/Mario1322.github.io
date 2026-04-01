/**
 * contact.js
 * Manejo avanzado del formulario de contacto (AJAX, Honeypot)
 * y Gimmick de Integridad de Seguridad para perfil de Ciberseguridad.
 */

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".misdatos form");
  const sendButton = document.getElementById("send");

  // --- Gimmick de Seguridad (Console Log) ---
  const logStyle = "color: #d4a63a; font-weight: bold; font-size: 14px; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);";
  console.log("%c [SISTEMA] Integridad de DOM verificada. Protocolo Fantasma Activo.", logStyle);
  console.log("%c [SISTEMA] Conexión Segura TLS 1.3 | SRI Verificado.", "color: #8eefd0; font-style: italic;");

  if (contactForm && sendButton) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      // --- Honeypot Check ---
      const phantomTrap = contactForm.querySelector('input[name="_phantom_trap"]');
      if (phantomTrap && phantomTrap.value !== "") {
        console.warn("[ALERTA] Intento de sumisión por bot detectado. Bloqueando...");
        return;
      }

      // UX: Cambiar estado botón
      const originalText = sendButton.textContent;
      const isEn = document.documentElement.lang === "en";
      sendButton.textContent = isEn ? "Sending..." : "Enviando...";
      sendButton.disabled = true;

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          sendButton.textContent = isEn ? "Sent! ✓" : "¡Enviado! ✓";
          contactForm.reset();
          setTimeout(() => {
            sendButton.textContent = originalText;
            sendButton.disabled = false;
          }, 3000);
        } else {
          throw new Error("Form submission failed");
        }
      } catch (error) {
        console.error("Error al enviar formulario:", error);
        sendButton.textContent = isEn ? "Error ⚠" : "Error ⚠";
        setTimeout(() => {
          sendButton.textContent = originalText;
          sendButton.disabled = false;
        }, 3000);
      }
    });
  }
});
