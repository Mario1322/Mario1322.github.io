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

    // 1. Copiar al portapapeles
    navigator.clipboard.writeText(fullEmail).then(() => {
      // 2. Mostrar popup de éxito
      popup.style.display = "flex";
      setTimeout(() => {
        popup.style.display = "none";
      }, 2000);

      // 3. Abrir la aplicación de correo del sistema (opcionalmente con pequeño delay para no interrumpir el portapapeles)
      setTimeout(() => {
        window.location.href = `mailto:${fullEmail}`;
      }, 100);
    });
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
