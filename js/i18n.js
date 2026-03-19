const LANG_KEY = 'siteLang';

const getPreferredLang = () => {
  const stored = localStorage.getItem(LANG_KEY);
  if (stored === 'en' || stored === 'es') return stored;
  return document.documentElement.lang?.toLowerCase().startsWith('en') ? 'en' : 'es';
};

async function loadTranslations(nextLang) {
  const lang = nextLang || getPreferredLang();
  document.documentElement.lang = lang;
  try {
    const response = await fetch(`./i18n/${lang}.json`);
    if (!response.ok) throw new Error('No se pudo cargar i18n');
    const translations = await response.json();
    applyTranslations(translations, lang);
    updateLangButtons(lang);
    document.dispatchEvent(new CustomEvent('i18n:changed', { detail: { lang } }));
  } catch (error) {
    console.warn('i18n: usando textos por defecto', error);
  }
}

function applyTranslations(map, lang) {
  Object.entries(map).forEach(([id, text]) => {
    const el = document.getElementById(id);
    if (!el) return;
    // Preserve any HTML in translations (needed for icons / line breaks)
    el.innerHTML = text;
  });

  // Elements with explicit per-language text
  document.querySelectorAll('[data-i18n-es],[data-i18n-en]').forEach((el) => {
    const nextText = lang === 'en' ? el.dataset.i18nEn : el.dataset.i18nEs;
    if (nextText) el.textContent = nextText;
  });


  // Elements with translatable placeholders
  document.querySelectorAll('[data-i18n-placeholder-es],[data-i18n-placeholder-en]').forEach((el) => {
    const nextText = lang === 'en' ? el.dataset.i18nPlaceholderEn : el.dataset.i18nPlaceholderEs;
    if (nextText) el.setAttribute('placeholder', nextText);
  });

  // Elements that map to a key without id
  document.querySelectorAll('[data-i18n-key]').forEach((el) => {
    const key = el.dataset.i18nKey;
    if (!key) return;
    const text = map[key];
    if (text) el.innerHTML = text;
  });
}

function updateLangButtons(lang) {
  document.querySelectorAll('[data-lang]').forEach((btn) => {
    const active = btn.dataset.lang === lang;
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    btn.classList.toggle('is-active', active);
  });
}

function setLanguage(lang) {
  if (lang !== 'en' && lang !== 'es') return;
  localStorage.setItem(LANG_KEY, lang);
  loadTranslations(lang);
}

document.addEventListener('DOMContentLoaded', () => {
  loadTranslations();
  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });
});
