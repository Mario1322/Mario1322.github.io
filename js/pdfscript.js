const PDFJS_SRC = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.min.js";
const PDF_WORKER_SRC = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";
const CANVAS_WIDTH = 1000;
const CANVAS_MAX_HEIGHT = 1400;

const STATIC_PDF_ITEMS = [
  {
    path: "certificados/Certificado-Mario-De-La-Rosa-Garcia-lpc7vju0.pdf",
    title: "Certificado Mario De La Rosa Garcia",
  },
];

let currentPage = 0;
let pdfLibPromise = null;
let hasInitialRender = false;
let pdfItems = [];

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-dynamic-src="${src}"]`);
    if (existing) {
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.dataset.dynamicSrc = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function getPdfLib() {
  if (window["pdfjs-dist/build/pdf"]) {
    return Promise.resolve(window["pdfjs-dist/build/pdf"]);
  }

  if (!pdfLibPromise) {
    pdfLibPromise = loadScript(PDFJS_SRC).then(() => window["pdfjs-dist/build/pdf"]);
  }

  return pdfLibPromise;
}

function showCanvasStatus(context, message) {
  context.save();
  context.font = "20px Arial";
  context.fillStyle = "#001F3F";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  context.fillText(message, context.canvas.width / 2, context.canvas.height / 2);
  context.restore();
}

function buildPdfItems() {
  const items = [...STATIC_PDF_ITEMS];
  const seenPaths = new Set(items.map((item) => item.path));

  document.querySelectorAll(".popup-trigger[data-pdf]").forEach((node) => {
    const path = node.dataset.pdf?.trim();
    if (!path || seenPaths.has(path)) return;

    const title =
      node.dataset.title ||
      node.dataset.titleEs ||
      node.querySelector("h3")?.textContent?.trim() ||
      path
        .split("/")
        .pop()
        ?.replace(/\.[^/.]+$/, "") ||
      path;

    items.push({ path, title });
    seenPaths.add(path);
  });

  return items;
}

async function loadPDF(index) {
  const canvas = document.getElementById("pdf-render");
  if (!canvas || !pdfItems.length) return;

  const context = canvas.getContext("2d");
  const isEnglish = document.documentElement.lang.toLowerCase().startsWith("en");
  showCanvasStatus(context, isEnglish ? "Loading certificate..." : "Cargando certificado...");

  try {
    const pdfjsLib = await getPdfLib();
    if (!pdfjsLib) {
      showCanvasStatus(
        context,
        isEnglish ? "PDF.js could not be loaded." : "No se pudo cargar PDF.js.",
      );
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

    const titleElem = document.getElementById("titulo-pdf");
    const downloadLink = document.getElementById("download-pdf");
    if (titleElem) titleElem.innerText = item.title;
    if (downloadLink) downloadLink.href = item.path;
  } catch (error) {
    showCanvasStatus(
      context,
      isEnglish ? "Could not load certificate." : "No se pudo cargar el certificado.",
    );
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
  if (currentPage < pdfItems.length - 1) {
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

document.addEventListener("DOMContentLoaded", () => {
  const certificadoSection = document.getElementById("certificado");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  pdfItems = buildPdfItems();

  if (!certificadoSection || !prevBtn || !nextBtn || !pdfItems.length) {
    return;
  }

  prevBtn.addEventListener("click", showPrevPDF);
  nextBtn.addEventListener("click", showNextPDF);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ensureFirstRender();
            observer.disconnect();
          }
        });
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(certificadoSection);
  } else {
    setTimeout(ensureFirstRender, 1200);
  }
});
