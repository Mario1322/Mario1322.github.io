// Seleccionar elementos
const copyButton = document.getElementById("copy-button");
const popup = document.getElementById("popup1");
const closePopup = document.getElementById("close-popup1");
const emailNode = document.getElementById("email-text");

function decodeEmail() {
  if (!emailNode) return "";
  const user = emailNode.dataset.user;
  const domain = emailNode.dataset.domain;
  if (user && domain) {
    const email = `${user}@${domain}`;
    emailNode.textContent = email;
    return email;
  }
  return emailNode.innerText.trim();
}

if (copyButton && popup && closePopup && emailNode) {
  // Reconstruir el email al cargar para UX, pero después de que los scrapers pasen
  let fullEmail = decodeEmail();

  // Evento para copiar el correo y abrir la app de correo
  copyButton.addEventListener("click", () => {
    // Asegurarse de tener el mail actualizado
    if (!fullEmail) fullEmail = decodeEmail();

    const proceedWithMailto = () => {
      // Mostrar popup de éxito
      popup.style.display = "flex";
      setTimeout(() => {
        popup.style.display = "none";
      }, 2000);

      // Abrir la aplicación de correo del sistema (opcionalmente con pequeño delay)
      setTimeout(() => {
        window.location.href = `mailto:${fullEmail}`;
      }, 100);
    };

    // Copiar al portapapeles con fallback seguro para local/HTTP
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(fullEmail)
        .then(proceedWithMailto)
        .catch((err) => {
          console.warn("Clipboard API write failed:", err);
          proceedWithMailto();
        });
    } else {
      // Fallback usando el método clásico
      const textArea = document.createElement("textarea");
      textArea.value = fullEmail;
      textArea.style.position = "fixed"; // Evitar scroll no deseado
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
      } catch (err) {
        console.warn("Fallback copy method failed:", err);
      }
      document.body.removeChild(textArea);
      proceedWithMailto();
    }
  });

  // Evento para cerrar el popup
  closePopup.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Cerrar el popup si se hace clic fuera del contenido
  window.addEventListener("click", (event) => {
    if (event.target === popup) {
      popup.style.display = "none";
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && popup.style.display === "flex") {
      popup.style.display = "none";
    }
  });
}
