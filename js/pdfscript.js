// Lista de PDFs a cargar
const pdfFiles = [
    '../certificados/Certificado_Seguridad_y_privacidad.pdf',
    '../certificados/Introducción_a_la_Gestión_Ambiental_Certificado.pdf',
    '../certificados/Seguridad y Privacidad de datos_Certificado Seguridad y Privacidad de Datos .pdf',
    '../certificados/Teletrabajo y Prevencion de Riesgos Laborales_Certificado Teletrabajo y Prevención de Riesgos Laborales.pdf',
    '../certificados/Seguridad de la informacion_Certificado Seguridad de la información.pdf',
    '../certificados/Prevencion de riesgos laborales P.V.D_Descarga_Certificado.pdf',

];

// Variable global para el índice actual del PDF
let currentPage = 0;

// Función para cargar un PDF dado un índice
function loadPDF(index) {
    const canvas = document.getElementById('pdf-render');
    const context = canvas.getContext('2d');
    const pdfjsLib = window['pdfjs-dist/build/pdf'];
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

    const loadingTask = pdfjsLib.getDocument(pdfFiles[index]);
    loadingTask.promise.then(pdf => {
        // Cargar la primera página del PDF
        pdf.getPage(1).then(page => {
            const scale = 1.5; // Ajusta la escala según sea necesario
            const viewport = page.getViewport({ scale });
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);

            // Actualiza el título o muestra el número del PDF cargado
            document.getElementById('titulo-pdf').innerText = `PDF ${currentPage + 1} de ${pdfFiles.length}`;
        }).catch(error => {
            console.error('Error al acceder a la página del PDF: ', error);
        });
    }).catch(error => {
        console.error('Error al cargar el PDF: ', error);
    });
}

// Funciones para manejar la navegación
function showPrevPDF() {
    if (currentPage > 0) {
        currentPage--; // Decrementa el índice
        loadPDF(currentPage); // Carga el PDF anterior
    }
}

function showNextPDF() {
    if (currentPage < pdfFiles.length - 1) {
        currentPage++; // Incrementa el índice
        loadPDF(currentPage); // Carga el siguiente PDF
    }
}

// Asignar eventos de clic a los botones de navegación
document.getElementById('prevBtn').addEventListener('click', showPrevPDF);
document.getElementById('nextBtn').addEventListener('click', showNextPDF);

// Cargar el primer PDF al iniciar
loadPDF(currentPage);
