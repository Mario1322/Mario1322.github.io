async function loadTranslations() {
  const lang = document.documentElement.lang?.toLowerCase().startsWith('en') ? 'en' : 'es';
  try {
    const response = await fetch(`./i18n/${lang}.json`);
    if (!response.ok) throw new Error('No se pudo cargar i18n');
    const translations = await response.json();
    applyTranslations(translations);
  } catch (error) {
    console.warn('i18n: usando textos por defecto', error);
  }
}

function applyTranslations(map) {
  Object.entries(map).forEach(([id, text]) => {
    const el = document.getElementById(id);
    if (!el) return;
    // Preserve any HTML in translations (needed for icons / line breaks)
    el.innerHTML = text;
  });
}

document.addEventListener('DOMContentLoaded', loadTranslations);
