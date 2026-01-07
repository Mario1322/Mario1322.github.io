document.addEventListener('DOMContentLoaded', function () {
    // Verificamos si la librería baffle está cargada y si el elemento existe
    if (typeof baffle !== 'undefined' && document.querySelector(".profesion")) {
        const profesion = baffle(".profesion");
        
        profesion.set({
            characters: '█▓▓ ░░>██ ▓█▓>▓ ▓<█ ░<▒░▓ █░<█ █▒> ▓░▓< ▒▓░░',
            speed: 90
        });

        profesion.start();
        profesion.reveal(3000);
    }
});