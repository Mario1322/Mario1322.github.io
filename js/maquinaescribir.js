// typingEffect.js

const textoES = "Soy un joven apasionado con un constante anhelo de aprender y expresar mi sabiduría. Mi sed de conocimiento me impulsa a explorar continuamente nuevas tecnologías y herramientas, buscando mejorar y perfeccionar mis habilidades en cada paso del camino.";

const textoEN = "I am a young man passionate about learning and expressing my knowledge. My thirst for knowledge drives me to continuously explore new technologies and tools, seeking to improve and refine my skills every step of the way.";

// Detecta si estás en el index en inglés (por ejemplo: index-en.html)
const esIngles = window.location.pathname.includes("indexen");

const texto = esIngles ? textoEN : textoES;
const output = document.getElementById("textosobremi");
let index = 0;

function typeWriter() {
    if (index < texto.length) {
        output.innerHTML += texto.charAt(index);
        index++;
        setTimeout(typeWriter, Math.floor(Math.random() * 100) + 20);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    typeWriter();
});