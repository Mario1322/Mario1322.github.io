document.addEventListener('DOMContentLoaded', function() {
    let toggle = document.getElementById('toggle');
    let label_toggle = document.getElementById('label_toggle');
    
    // Selectores locales para evitar dependencias externas
    let menuIcon = document.querySelector('#menu-icon');
    let navbar = document.querySelector('.navbar');

    if (toggle) {
        toggle.addEventListener('change', (event) => {
            let checked = event.target.checked;
            document.body.classList.toggle('cambiocolor');
            
            // Cerrar menú si está abierto al cambiar tema
            if (menuIcon) menuIcon.classList.remove('bx-x');
            if (navbar) navbar.classList.remove('active');

            // Cambiar icono
            if (label_toggle) {
                if (checked) {
                    label_toggle.innerHTML = "<i class='bx bx-moon'></i>";
                } else {
                    label_toggle.innerHTML = "<i class='bx bx-sun'></i>";
                }
            }
        });
    }
});