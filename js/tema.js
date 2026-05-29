document.addEventListener('DOMContentLoaded', function () {
  const label_toggle = document.getElementById('label_toggle');
  const body = document.body;
  const menuIcon = document.querySelector('#menu-icon');
  const navbar = document.querySelector('.navbar');

  if (!label_toggle) return;

  // ─── Aplicar tema ───────────────────────────────────────────────────────────
  function aplicarTema(tema) {
    if (tema === 'oscuro') {
      body.classList.add('cambiocolor');
      label_toggle.innerHTML = "<i class='bx bx-sun' aria-hidden='true'></i>";
      label_toggle.setAttribute('aria-pressed', 'true');
    } else {
      body.classList.remove('cambiocolor');
      label_toggle.innerHTML = "<i class='bx bx-moon' aria-hidden='true'></i>";
      label_toggle.setAttribute('aria-pressed', 'false');
    }
    document.dispatchEvent(
      new CustomEvent('theme:changed', { detail: { isDark: tema === 'oscuro' } })
    );
  }

  // ─── 1. Decidir tema inicial ─────────────────────────────────────────────────
  const temaGuardado   = localStorage.getItem('tema');
  const elegidoManual  = localStorage.getItem('temaManual') === 'true';

  if (temaGuardado) {
    // Ya tiene preferencia guardada → usarla
    aplicarTema(temaGuardado);
  } else {
    // Primera visita → detectar sistema
    const prefiereDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const temaInicial  = prefiereDark ? 'oscuro' : 'claro';
    localStorage.setItem('tema', temaInicial);
    // No marcamos temaManual → sigue "auto"
    aplicarTema(temaInicial);
  }

  // ─── 2. Cambio manual (botón) ────────────────────────────────────────────────
  label_toggle.addEventListener('click', function () {
    const isDark   = body.classList.contains('cambiocolor');
    const nuevoTema = isDark ? 'claro' : 'oscuro';

    localStorage.setItem('tema', nuevoTema);
    localStorage.setItem('temaManual', 'true'); // Marcar como elección consciente
    aplicarTema(nuevoTema);

    // UX: cerrar menú móvil si estaba abierto
    if (menuIcon) {
      menuIcon.classList.remove('bx-x');
      menuIcon.setAttribute('aria-expanded', 'false');
    }
    if (navbar) navbar.classList.remove('active');
  });

  // ─── 3. Cambio del sistema en tiempo real (solo si no eligió manualmente) ────
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    const esManual = localStorage.getItem('temaManual') === 'true';
    if (!esManual) {
      const nuevoTema = e.matches ? 'oscuro' : 'claro';
      localStorage.setItem('tema', nuevoTema);
      aplicarTema(nuevoTema);
    }
  });
});
