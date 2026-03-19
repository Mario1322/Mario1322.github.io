document.addEventListener('DOMContentLoaded', function() {
    const label_toggle = document.getElementById('label_toggle');
    const body = document.body;
    
    // Elementos del menú (para cerrarlo automáticamente al cambiar tema)
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');

    // Verificamos que los elementos existan para evitar errores
    if (label_toggle) {
        
        // 1. LÓGICA DE PERSISTENCIA: Revisar si hay preferencia guardada al cargar
        const temaGuardado = localStorage.getItem('tema');
        
        if (temaGuardado === 'oscuro') {
            body.classList.add('cambiocolor');
            label_toggle.innerHTML = "<i class='bx bx-sun' aria-hidden='true'></i>";
            label_toggle.setAttribute('aria-pressed', 'true');
        } else {
            label_toggle.innerHTML = "<i class='bx bx-moon' aria-hidden='true'></i>";
            label_toggle.setAttribute('aria-pressed', 'false');
        }

        // 2. EVENTO: Escuchar cambios, aplicar tema y guardar preferencia
        label_toggle.addEventListener('click', () => {
            const isDark = body.classList.contains('cambiocolor');

            if (isDark) {
                // Activar modo claro
                body.classList.remove('cambiocolor');
                label_toggle.innerHTML = "<i class='bx bx-moon' aria-hidden='true'></i>";
                localStorage.setItem('tema', 'claro'); // Guardar en navegador
                label_toggle.setAttribute('aria-pressed', 'false');
            } else {
                // Activar modo oscuro
                body.classList.add('cambiocolor');
                label_toggle.innerHTML = "<i class='bx bx-sun' aria-hidden='true'></i>";
                localStorage.setItem('tema', 'oscuro'); // Guardar en navegador
                label_toggle.setAttribute('aria-pressed', 'true');
            }

            // Mejora UX: Cerrar menú si está abierto en móvil al cambiar el tema
            if (menuIcon) {
                menuIcon.classList.remove('bx-x');
                menuIcon.setAttribute('aria-expanded', 'false');
            }
            if (navbar) navbar.classList.remove('active');

            document.dispatchEvent(new CustomEvent('theme:changed', { detail: { isDark: body.classList.contains('cambiocolor') } }));
        });
    }
});
