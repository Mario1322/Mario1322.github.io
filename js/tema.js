document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('toggle');
    const label_toggle = document.getElementById('label_toggle');
    const body = document.body;
    
    // Elementos del menú (para cerrarlo automáticamente al cambiar tema)
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');

    // Verificamos que los elementos existan para evitar errores
    if (toggle && label_toggle) {
        
        // 1. LÓGICA DE PERSISTENCIA: Revisar si hay preferencia guardada al cargar
        const temaGuardado = localStorage.getItem('tema');
        
        if (temaGuardado === 'oscuro') {
            toggle.checked = true;
            body.classList.add('cambiocolor');
            label_toggle.innerHTML = "<i class='bx bx-moon'></i>";
        }

        // 2. EVENTO: Escuchar cambios, aplicar tema y guardar preferencia
        toggle.addEventListener('change', (event) => {
            const isChecked = event.target.checked;

            if (isChecked) {
                // Activar modo oscuro
                body.classList.add('cambiocolor');
                label_toggle.innerHTML = "<i class='bx bx-moon'></i>";
                localStorage.setItem('tema', 'oscuro'); // Guardar en navegador
            } else {
                // Activar modo claro
                body.classList.remove('cambiocolor');
                label_toggle.innerHTML = "<i class='bx bx-sun'></i>";
                localStorage.setItem('tema', 'claro'); // Guardar en navegador
            }

            // Mejora UX: Cerrar menú si está abierto en móvil al cambiar el tema
            if (menuIcon) menuIcon.classList.remove('bx-x');
            if (navbar) navbar.classList.remove('active');
        });
    }
});