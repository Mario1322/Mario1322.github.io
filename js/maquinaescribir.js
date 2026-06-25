// typingEffect.js

const textoES = "Soy un joven apasionado con un constante anhelo de aprender y expresar mi sabiduría. Mi sed de conocimiento me impulsa a explorar continuamente nuevas tecnologías y herramientas, buscando mejorar y perfeccionar mis habilidades en cada paso del camino.";

const textoEN = "I am a young man passionate about learning and expressing my knowledge. My thirst for knowledge drives me to continuously explore new technologies and tools, seeking to improve and refine my skills every step of the way.";

const getLang = () => {
    let stored = null;
    try {
        stored = localStorage.getItem('siteLang');
    } catch (e) {
        console.warn("Storage read restricted:", e);
    }
    if (stored === 'en' || stored === 'es') return stored;
    return document.documentElement.lang?.toLowerCase().startsWith('en') ? 'en' : 'es';
};

const output = document.getElementById("textosobremi");
let index = 0;
let timeoutId = null;
let hasStarted = false;

function getTexto() {
    return getLang() === 'en' ? textoEN : textoES;
}

function typeWriter(texto) {
    if (!output) return;
    if (index < texto.length) {
        output.innerHTML += texto.charAt(index);
        index++;
        timeoutId = setTimeout(() => typeWriter(texto), Math.floor(Math.random() * 40) + 10);
    }
}

function resetTyping() {
    if (!output) return;
    if (timeoutId) clearTimeout(timeoutId);
    output.innerHTML = '';
    index = 0;
    typeWriter(getTexto());
}

// Escuchar cambios de idioma
document.addEventListener('i18n:changed', () => {
    if (hasStarted) {
        resetTyping();
    }
});

// Inicializar IntersectionObserver para disparar al entrar al viewport
if (output) {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                hasStarted = true;
                obs.unobserve(entry.target);
                resetTyping();
            }
        });
    }, { threshold: 0.1 });
    observer.observe(output);
}
