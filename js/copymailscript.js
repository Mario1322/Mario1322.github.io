document.addEventListener("DOMContentLoaded", function() {
    function copyEmail() {
        const emailText = document.getElementById("email-text").innerText; // Obtener el texto del correo
        navigator.clipboard.writeText(emailText) // Copiar al portapapeles
            .then(() => {
                alert("Correo copiado: " + emailText); // Mensaje de confirmación
            })
            .catch(err => {
                console.error("Error al copiar el correo: ", err);
            });
    }

    // Asegúrate de que la función esté disponible
    window.copyEmail = copyEmail; // Hacer que la función sea accesible globalmente
});
