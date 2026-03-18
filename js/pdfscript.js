// Lista de PDFs a cargar
const pdfFiles = [
    'certificados/Certificado_Seguridad_y_privacidad.pdf',
    'certificados/Introducción_a_la_Gestión_Ambiental_Certificado.pdf',
    'certificados/Seguridad y Privacidad de datos_Certificado Seguridad y Privacidad de Datos .pdf',
    'certificados/Teletrabajo y Prevencion de Riesgos Laborales_Certificado Teletrabajo y Prevención de Riesgos Laborales.pdf',
    'certificados/Seguridad de la informacion_Certificado Seguridad de la información.pdf',
    'certificados/Prevencion de riesgos laborales P.V.D_Descarga_Certificado.pdf',
    'certificados/106_mariodelarosagr2003@gmail.com.pdf',
    'certificados/157_mariodelarosagr2003@gmail.com.pdf',
    'certificados/340_mariodelarosagr2003@gmail.com.pdf',
    'certificados/787_mariodelarosagr2003@gmail.com.pdf'
];

// Array con los nombres/títulos de los certificados
const pdfTitles = [
    'Seguridad y Privacidad',
    'Gestión Ambiental',
    'Seguridad y Privacidad de Datos',
    'Teletrabajo y Prevención de Riesgos Laborales',
    'Seguridad de la Información',
    'Prevención de Riesgos Laborales P.V.D',
    'IA Generativa',
    'Escritura efectiva y persuasiva',
    'Copilot',
    'Google: Inteligencia Artificial y productividad'
];

let currentPage = 0;

function loadPDF(index) {
    const canvas = document.getElementById('pdf-render');
    if (!canvas) return; // Seguridad si no existe el canvas

    const context = canvas.getContext('2d');
    
    // Indicador visual de carga
    context.font = "20px Arial";
    context.fillStyle = "black";
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillText("Cargando certificado...", 50, 50);

    // Configuración de PDF.js
    const pdfjsLib = window['pdfjs-dist/build/pdf'];
    if (!pdfjsLib) {
        context.fillText("No se pudo cargar PDF.js.", 50, 50);
        return;
    }
    // Asegúrate de que la versión coincida con la del CDN en tu HTML
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

    const loadingTask = pdfjsLib.getDocument(pdfFiles[index]);

    loadingTask.promise.then(pdf => {
        pdf.getPage(1).then(page => {
            const scale = 1.5;
            const viewport = page.getViewport({ scale });
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);

            // Actualizar título y enlace de descarga
            const titleElem = document.getElementById('titulo-pdf');
            const downloadLink = document.getElementById('download-pdf');
            
            if(titleElem) titleElem.innerText = pdfTitles[index];
            if(downloadLink) downloadLink.href = pdfFiles[index];

        }).catch(error => {
            console.error('Error al acceder a la página del PDF: ', error);
            context.fillText("Error al visualizar la página.", 50, 50);
        });
    }).catch(error => {
        console.error('Error al cargar el PDF: ', error);
        context.fillText("Error al cargar el archivo PDF.", 50, 50);
    });
}

function showPrevPDF() {
    if (currentPage > 0) {
        currentPage--;
        loadPDF(currentPage);
    }
}

function showNextPDF() {
    if (currentPage < pdfFiles.length - 1) {
        currentPage++;
        loadPDF(currentPage);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) prevBtn.addEventListener('click', showPrevPDF);
    if (nextBtn) nextBtn.addEventListener('click', showNextPDF);

    loadPDF(currentPage);
});
