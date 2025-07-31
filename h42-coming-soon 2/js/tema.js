// theme.js

let toggle = document.getElementById('toggle');
toggle.addEventListener('change', (event) => {
    let checked = event.target.checked;
    document.body.classList.toggle('cambiocolor');
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // Cambiar icono e imágenes
    if (checked) {
        label_toggle.innerHTML = "<i class='bx bx-moon'></i>";
    } else {
        label_toggle.innerHTML = "<i class='bx bx-sun'></i>";
    }
});
