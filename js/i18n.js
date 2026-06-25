const LANG_KEY = "siteLang";
const LANGUAGE_URLS = {
  es: "/",
  en: "/en/",
};

const getPageLang = () =>
  document.documentElement.lang?.toLowerCase().startsWith("en") ? "en" : "es";

const getPreferredLang = () => getPageLang();

const buildLocalizedUrl = (lang) => {
  const currentPath = window.location.pathname;
  const filename = currentPath.split("/").pop() || "index.html";
  const hash = window.location.hash || "";

  // Directorio base según el idioma
  const basePath = lang === "en" ? "/en/" : "/";

  // Evitar duplicar /en/ si ya estamos allí o si volvemos a la raíz
  return `${basePath}${filename}${hash}`;
};

const META_COPY = {
  es: {
    title: "Mario De La Rosa García",
    description:
      "Portfolio de Mario De La Rosa García, un desarrollador de software especializado en ciberseguridad y desarrollo de aplicaciones multiplataforma. Explora mis habilidades, formación y proyectos.",
    ogTitle: "Portafolio de Mario De La Rosa - Desarrollador & Ciberseguridad",
    ogDescription:
      "Echa un vistazo a mis proyectos, certificaciones y habilidades en desarrollo de software y seguridad informática.",
    locale: "es_ES",
    websiteName: "Portfolio de Mario De La Rosa Garcia",
    workName: "Portafolio de Mario De La Rosa Garcia",
    workDescription:
      "Portfolio de proyectos, certificaciones y habilidades en desarrollo de software y ciberseguridad.",
    workLanguage: "es",
    pageUrl: "https://mario1322.github.io/",
    workId: "https://mario1322.github.io/#portfolio-es",
  },
  en: {
    title: "Mario De La Rosa García",
    description:
      "Portfolio of Mario De La Rosa García, a software developer specialized in cybersecurity and multiplatform application development. Explore my skills, education, and projects.",
    ogTitle: "Mario De La Rosa Portfolio - Developer & Cybersecurity",
    ogDescription:
      "Take a look at my projects, certifications, and skills in software development and cybersecurity.",
    locale: "en_US",
    websiteName: "Mario De La Rosa Portfolio",
    workName: "Mario De La Rosa Portfolio",
    workDescription:
      "Portfolio of projects, certifications, and skills in software development and cybersecurity.",
    workLanguage: "en",
    pageUrl: "https://mario1322.github.io/en/",
    workId: "https://mario1322.github.io/#portfolio-en",
  },
};

function updateMeta(lang) {
  const copy = META_COPY[lang] || META_COPY.es;
  document.title = copy.title;

  const description = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const ogLocale = document.querySelector('meta[property="og:locale"]');
  const ogUrl = document.querySelector('meta[property="og:url"]');
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  const canonical = document.querySelector('link[rel="canonical"]');

  if (description) description.setAttribute("content", copy.description);
  if (ogTitle) ogTitle.setAttribute("content", copy.ogTitle);
  if (ogDescription) ogDescription.setAttribute("content", copy.ogDescription);
  if (ogLocale) ogLocale.setAttribute("content", copy.locale);
  if (ogUrl) ogUrl.setAttribute("content", copy.pageUrl);
  if (twitterTitle) twitterTitle.setAttribute("content", copy.ogTitle);
  if (twitterDescription) twitterDescription.setAttribute("content", copy.ogDescription);
  if (canonical) canonical.setAttribute("href", copy.pageUrl);
}

function updateStructuredData(lang) {
  const copy = META_COPY[lang] || META_COPY.es;
  const script = document.getElementById("structured-data");
  if (!script?.textContent) return;

  try {
    const data = JSON.parse(script.textContent);
    const graph = Array.isArray(data["@graph"]) ? data["@graph"] : [];
    const website = graph.find((entry) => entry["@type"] === "WebSite");
    const work = graph.find((entry) => entry["@type"] === "CreativeWork");

    if (website) {
      website.name = copy.websiteName;
    }

    if (work) {
      work.name = copy.workName;
      work.description = copy.workDescription;
      work.inLanguage = copy.workLanguage;
      work["@id"] = copy.workId;
      work.url = copy.pageUrl;
      work.mainEntityOfPage = copy.pageUrl;
    }

    script.textContent = JSON.stringify(data);
  } catch (error) {
    console.warn("i18n: no se pudo actualizar el schema", error);
  }
}

function updateAttributeTranslations(lang, attribute) {
  const dataKey = attribute
    .split("-")
    .map((part, index) => (index === 0 ? part : `${part[0].toUpperCase()}${part.slice(1)}`))
    .join("");
  const capitalizedKey = `${dataKey[0].toUpperCase()}${dataKey.slice(1)}`;

  document
    .querySelectorAll(`[data-i18n-${attribute}-es],[data-i18n-${attribute}-en]`)
    .forEach((el) => {
      const nextText =
        lang === "en"
          ? el.dataset[`i18n${capitalizedKey}En`]
          : el.dataset[`i18n${capitalizedKey}Es`];
      if (nextText) el.setAttribute(attribute, nextText);
    });
}

function updatePopupTriggerTitles(lang) {
  document.querySelectorAll(".popup-trigger[data-title], .popup-trigger[data-title-en]").forEach((el) => {
    const titleElement = el.querySelector("h3");
    if (!titleElement) return;

    const nextTitle = lang === "en" ? el.dataset.titleEn || el.dataset.title : el.dataset.title;
    if (nextTitle) titleElement.textContent = nextTitle;
  });
}

async function loadTranslations(nextLang) {
  const lang = nextLang || getPreferredLang();
  document.documentElement.lang = lang;
  try {
    const response = await fetch(`/i18n/${lang}.json`);
    if (!response.ok) throw new Error("No se pudo cargar i18n");
    const translations = await response.json();
    applyTranslations(translations, lang);
    updateLangButtons(lang);
    updateMeta(lang);
    updateStructuredData(lang);
    document.dispatchEvent(new CustomEvent("i18n:changed", { detail: { lang } }));
  } catch (error) {
    console.warn("i18n: usando textos por defecto", error);
    updateLangButtons(lang);
    updateMeta(lang);
    updateStructuredData(lang);
  }
}

function applyTranslations(map, lang) {
  Object.entries(map).forEach(([id, text]) => {
    const el = document.getElementById(id);
    if (!el) return;
    // Preserve any HTML in translations (needed for icons / line breaks)
    el.innerHTML = text;
  });

  // Elements with explicit per-language text (Support HTML for formatting)
  document.querySelectorAll("[data-i18n-es],[data-i18n-en]").forEach((el) => {
    const nextText = lang === "en" ? el.dataset.i18nEn : el.dataset.i18nEs;
    if (nextText) el.innerHTML = nextText;
  });

  // Elements with translatable placeholders
  document
    .querySelectorAll("[data-i18n-placeholder-es],[data-i18n-placeholder-en]")
    .forEach((el) => {
      const nextText = lang === "en" ? el.dataset.i18nPlaceholderEn : el.dataset.i18nPlaceholderEs;
      if (nextText) el.setAttribute("placeholder", nextText);
    });

  // Elements that map to a key without id
  document.querySelectorAll("[data-i18n-key]").forEach((el) => {
    const key = el.dataset.i18nKey;
    if (!key) return;
    const text = map[key];
    if (text) el.innerHTML = text;
  });

  updateAttributeTranslations(lang, "aria-label");
  updateAttributeTranslations(lang, "alt");
  updatePopupTriggerTitles(lang);
}

function updateLangToggle(lang) {
  const toggle = document.querySelector("[data-lang-toggle]");
  if (!toggle) return;
  const nextLang = lang === "en" ? "es" : "en";
  toggle.dataset.lang = nextLang;
  toggle.setAttribute("aria-pressed", "false");
  toggle.setAttribute(
    "aria-label",
    nextLang === "en" ? "Switch to English version" : "Cambiar a Español",
  );
  const img = toggle.querySelector("img");
  const source = toggle.querySelector("source");
  if (!img) return;
  if (nextLang === "en") {
    img.src = "/imagenes/english-24.png";
    img.srcset = "/imagenes/english-24.png 24w, /imagenes/english-48.png 48w";
    img.alt = "Switch to English language";
    if (source) source.srcset = "/imagenes/english-24.webp 24w, /imagenes/english-48.webp 48w";
  } else {
    img.src = "/imagenes/espanol-24.png";
    img.srcset = "/imagenes/espanol-24.png 24w, /imagenes/espanol-48.png 48w";
    img.alt = "Cambiar a idioma Español";
    if (source) source.srcset = "/imagenes/espanol-24.webp 24w, /imagenes/espanol-48.webp 48w";
  }
}

function updateLangButtons(lang) {
  document.querySelectorAll("[data-lang]:not([data-lang-toggle])").forEach((btn) => {
    const active = btn.dataset.lang === lang;
    btn.setAttribute("aria-pressed", active ? "true" : "false");
    btn.classList.toggle("is-active", active);
  });
  updateLangToggle(lang);
}

function setLanguage(lang) {
  if (lang !== "en" && lang !== "es") return;
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch (e) {
    console.warn("Storage write restricted:", e);
  }

  // Efecto de salida suave
  document.body.classList.add("page-fade-out");

  setTimeout(() => {
    window.location.href = buildLocalizedUrl(lang);
  }, 400); // Coincide con la duración del CSS (0.4s)
}

// Exponer globalmente
window.setLanguage = setLanguage;

document.addEventListener("DOMContentLoaded", () => {
  // Efecto de entrada suave
  document.body.classList.add("page-fade-in");
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.body.classList.remove("page-fade-in");
    }, 50);
  });

  const lang = getPreferredLang();

  // ─── Auto-detección de idioma en primera visita ──────────────────────────────
  // Solo actúa si el usuario nunca ha elegido idioma manualmente.
  // Si el navegador/sistema está en inglés y estamos en la versión española → redirigir.
  let savedLang = null;
  try {
    savedLang = localStorage.getItem(LANG_KEY);
  } catch (e) {
    console.warn("Storage read restricted:", e);
  }
  if (!savedLang) {
    const browserLang = (navigator.language || navigator.userLanguage || "").toLowerCase();
    if (browserLang.startsWith("en") && lang === "es") {
      // Guardamos 'en' antes de redirigir para que la elección se respete en siguientes visitas
      try {
        localStorage.setItem(LANG_KEY, "en");
      } catch (e) {
        console.warn("Storage write restricted:", e);
      }
      window.location.href = buildLocalizedUrl("en");
      return; // Detenemos ejecución — la página va a cambiar
    }
  }

  // Nota: NO guardamos en localStorage aquí al cargar.
  // El guardado solo ocurre cuando el usuario elige manualmente (en setLanguage()).
  loadTranslations(lang);
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });
});
