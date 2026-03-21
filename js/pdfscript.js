const PDFJS_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js';
const PDF_WORKER_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';
const CANVAS_WIDTH = 1800;
const CANVAS_MAX_HEIGHT = 2400;

const pdfPaths = [
    'certificados/Certificado-Mario-De-La-Rosa-Garcia-lpc7vju0.pdf',
    'certificados/Curos ViewNext/Certificado_Seguridad_y_privacidad.pdf',
    'certificados/Curos ViewNext/Introducción_a_la_Gestión_Ambiental_Certificado.pdf',
    'certificados/Curos ViewNext/Prevencion de riesgos laborales P.V.D_Descarga_Certificado.pdf',
    'certificados/Curos ViewNext/Seguridad de la informacion_Certificado Seguridad de la información.pdf',
    'certificados/Curos ViewNext/Seguridad y Privacidad de datos_Certificado Seguridad y Privacidad de Datos .pdf',
    'certificados/Curos ViewNext/Teletrabajo y Prevencion de Riesgos Laborales_Certificado Teletrabajo y Prevención de Riesgos Laborales.pdf',
    'certificados/Cursos Anthropic/certificate-3h3t26ywwzu2-1773772519.pdf',
    'certificados/Cursos Anthropic/certificate-4hh4tdtbqqy7-1773805696.pdf',
    'certificados/Cursos Anthropic/certificate-8z9wogust2pz-1773810028.pdf',
    'certificados/Cursos Anthropic/certificate-faysp8dsfbvi-1773632316.pdf',
    'certificados/Cursos Anthropic/certificate-fjpcuuzp3axs-1773810732.pdf',
    'certificados/Cursos Anthropic/certificate-je89wz78bthp-1773807123.pdf',
    'certificados/Cursos Anthropic/certificate-p99kpkpnfep4-1773630086.pdf',
    'certificados/Cursos Anthropic/certificate-ptgen3d5im77-1773805537.pdf',
    'certificados/Cursos Anthropic/certificate-rwfr2vvwxmuc-1773708150.pdf',
    'certificados/Cursos Anthropic/certificate-tefgmwns58gg-1773792500.pdf',
    'certificados/Cursos Anthropic/certificate-viwbv6x33wt8-1773709293.pdf',
    'certificados/Cursos Anthropic/certificate-wh9apdr5yxpt-1773809476.pdf',
    'certificados/Cursos Anthropic/certificate-y46v74gu67xt-1773632012.pdf',
    'certificados/Cursos Santander Open Academy/106_mariodelarosagr2003@gmail.com.pdf',
    'certificados/Cursos Santander Open Academy/107_mariodelarosagr2003@gmail.com.pdf',
    'certificados/Cursos Santander Open Academy/109_mariodelarosagr2003@gmail.com.pdf',
    'certificados/Cursos Santander Open Academy/10_mariodelarosagr2003@gmail.com.pdf',
    'certificados/Cursos Santander Open Academy/110_mariodelarosagr2003@gmail.com.pdf',
    'certificados/Cursos Santander Open Academy/11_mariodelarosagr2003@gmail.com.pdf',
    'certificados/Cursos Santander Open Academy/12_mariodelarosagr2003@gmail.com.pdf',
    'certificados/Cursos Santander Open Academy/1311_mariodelarosagr2003@gmail.com.pdf',
    'certificados/Cursos Santander Open Academy/148_mariodelarosagr2003@gmail.com.pdf',
    'certificados/Cursos Santander Open Academy/157_mariodelarosagr2003@gmail.com.pdf',
    'certificados/Cursos Santander Open Academy/161_mariodelarosagr2003@gmail.com.pdf',
    'certificados/Cursos Santander Open Academy/166_mariodelarosagr2003@gmail.com.pdf',
    'certificados/Cursos Santander Open Academy/340_mariodelarosagr2003@gmail.com.pdf',
    'certificados/Cursos Santander Open Academy/373_mariodelarosagr2003@gmail.com.pdf',
    'certificados/Cursos Santander Open Academy/508_mariodelarosagr2003@gmail.com.pdf',
    'certificados/Cursos Santander Open Academy/582_mariodelarosagr2003@gmail.com.pdf',
    'certificados/Cursos Santander Open Academy/787_mariodelarosagr2003@gmail.com.pdf',
    'certificados/Cursos Santander Open Academy/8_mariodelarosagr2003@gmail.com.pdf',
    'certificados/Cursos Santander Open Academy/9_mariodelarosagr2003@gmail.com.pdf'
];

function buildTitleFromPath(path) {
    const parts = path.split('/');
    const fileName = parts.pop()?.replace(/\.[^/.]+$/, '') || '';
    const folder = parts.slice(1).join(' › ');
    const cleaned = fileName
        .replace(/[_-]+/g, ' ')
        .replace(/mariodelarosagr2003@gmail.com/i, '')
        .replace(/\s+@.*$/, '')
        .replace(/\s+/g, ' ')
        .trim();
    return folder ? `${folder}: ${cleaned}` : cleaned;
}

const pdfItems = pdfPaths.map((path) => ({
    path,
    title: buildTitleFromPath(path)
}));

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

function showCanvasStatus(context, message) {
    context.save();
    context.font = '20px Arial';
    context.fillStyle = '#001F3F';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillText(message, context.canvas.width / 2, context.canvas.height / 2);
    context.restore();
}

async function loadPDF(index) {
    const canvas = document.getElementById('pdf-render');
    if (!canvas || !pdfItems.length) return;

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
        const item = pdfItems[index];
        const pdf = await pdfjsLib.getDocument(item.path).promise;
        const page = await pdf.getPage(1);
        const baseViewport = page.getViewport({ scale: 1 });
        const scaleToWidth = CANVAS_WIDTH / baseViewport.width;
        const scaleToHeight = CANVAS_MAX_HEIGHT / baseViewport.height;
        const scale = Math.min(scaleToWidth, scaleToHeight);
        const viewport = page.getViewport({ scale });

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        context.clearRect(0, 0, canvas.width, canvas.height);
        await page.render({ canvasContext: context, viewport }).promise;

        const titleElem = document.getElementById('titulo-pdf');
        const downloadLink = document.getElementById('download-pdf');
        if (titleElem) titleElem.innerText = item.title;
        if (downloadLink) downloadLink.href = item.path;
    } catch (error) {
        showCanvasStatus(context, isEnglish ? 'Could not load certificate.' : 'No se pudo cargar el certificado.');
    }
}

async function showPrevPDF() {
    await ensureFirstRender();
    if (!pdfItems.length) return;
    if (currentPage > 0) {
        currentPage -= 1;
        await loadPDF(currentPage);
    }
}

async function showNextPDF() {
    await ensureFirstRender();
    if (pdfItems.length && currentPage < pdfItems.length - 1) {
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

    if (!certificadoSection || !prevBtn || !nextBtn || !pdfItems.length) {
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
