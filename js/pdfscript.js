const PDFJS_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js';
const PDF_WORKER_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';

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

const pdfTitlesEs = [
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

const pdfTitlesEn = [
    'Security and Privacy',
    'Environmental Management',
    'Data Security and Privacy',
    'Remote Work and Occupational Risk Prevention',
    'Information Security',
    'Occupational Risk Prevention P.V.D',
    'Generative AI',
    'Effective and Persuasive Writing',
    'Copilot',
    'Google: AI and Productivity'
];

let currentPage = 0;
let pdfLibPromise = null;
let hasInitialRender = false;

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[data-dynamic-src="${src}"]`);
        if (existing) {
            existing.addEventListener('load', resolve, { once: true });
            existing.addEventListener('error', reject, { once: true });
            return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.dataset.dynamicSrc = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

function getPdfLib() {
    if (window['pdfjs-dist/build/pdf']) {
        return Promise.resolve(window['pdfjs-dist/build/pdf']);
    }

    if (!pdfLibPromise) {
        pdfLibPromise = loadScript(PDFJS_SRC).then(() => window['pdfjs-dist/build/pdf']);
    }
    return pdfLibPromise;
}

function getPageTitles() {
    return document.documentElement.lang.toLowerCase().startsWith('en') ? pdfTitlesEn : pdfTitlesEs;
}

function showCanvasStatus(context, message) {
    context.font = '20px Arial';
    context.fillStyle = '#001F3F';
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillText(message, 30, 50);
}

async function loadPDF(index) {
    const canvas = document.getElementById('pdf-render');
    if (!canvas) return;

    const context = canvas.getContext('2d');
    const isEnglish = document.documentElement.lang.toLowerCase().startsWith('en');
    showCanvasStatus(context, isEnglish ? 'Loading certificate...' : 'Cargando certificado...');

    try {
        const pdfjsLib = await getPdfLib();
        if (!pdfjsLib) {
            showCanvasStatus(context, isEnglish ? 'PDF.js could not be loaded.' : 'No se pudo cargar PDF.js.');
            return;
        }

        pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_WORKER_SRC;
        const pdf = await pdfjsLib.getDocument(pdfFiles[index]).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1.5 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport }).promise;

        const titleElem = document.getElementById('titulo-pdf');
        const downloadLink = document.getElementById('download-pdf');
        const titles = getPageTitles();
        if (titleElem) titleElem.innerText = titles[index];
        if (downloadLink) downloadLink.href = pdfFiles[index];
    } catch (error) {
        showCanvasStatus(context, isEnglish ? 'Could not load certificate.' : 'No se pudo cargar el certificado.');
    }
}

async function showPrevPDF() {
    await ensureFirstRender();
    if (currentPage > 0) {
        currentPage -= 1;
        await loadPDF(currentPage);
    }
}

async function showNextPDF() {
    await ensureFirstRender();
    if (currentPage < pdfFiles.length - 1) {
        currentPage += 1;
        await loadPDF(currentPage);
    }
}

async function ensureFirstRender() {
    if (hasInitialRender) {
        return;
    }
    hasInitialRender = true;
    await loadPDF(currentPage);
}

document.addEventListener('DOMContentLoaded', () => {
    const certificadoSection = document.getElementById('certificado');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!certificadoSection || !prevBtn || !nextBtn) {
        return;
    }

    prevBtn.addEventListener('click', showPrevPDF);
    nextBtn.addEventListener('click', showNextPDF);

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    ensureFirstRender();
                    observer.disconnect();
                }
            });
        }, { rootMargin: '300px 0px' });
        observer.observe(certificadoSection);
    } else {
        setTimeout(ensureFirstRender, 1200);
    }
});
