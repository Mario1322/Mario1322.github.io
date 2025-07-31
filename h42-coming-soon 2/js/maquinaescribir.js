// typingEffect.js

const texto = "Soy un joven apasionado con un constante anhelo de aprender y expresar mi sabiduría. Mi sed de conocimiento me impulsa a explorar continuamente nuevas tecnologías y herramientas, buscando mejorar y perfeccionar mis habilidades en cada paso del camino.";
const output = document.getElementById("textosobremi");
let index = 0;

function typeWriter() {
    if (index < texto.length) {
        output.innerHTML += texto.charAt(index);
        index++;
        setTimeout(typeWriter, Math.floor(Math.random() * 100) + 20);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM completamente cargado');
    typeWriter();
});
