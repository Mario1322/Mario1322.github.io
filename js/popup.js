document.addEventListener('DOMContentLoaded', () => {
    const popupContainer = document.querySelector('.popup-container');
    const popupDialog = popupContainer?.querySelector('.popup-content');
    const closeButton = popupContainer?.querySelector('.close');
    const popupInfo = popupContainer?.querySelector('.popup-info');
    const popupTriggers = document.querySelectorAll('.popup-trigger');

    if (!popupContainer || !popupDialog || !closeButton || !popupInfo || popupTriggers.length === 0) {
        return;
    }
    const getIsEnglish = () => document.documentElement.lang.toLowerCase().startsWith('en');

    const getLabels = (isEnglish) => isEnglish ? {
        category: 'Category',
        usefulFor: 'Useful for',
        details: 'Detailed explanation',
        docs: 'Official docs',
        noDocs: 'No official docs linked yet',
        defaultCategory: 'Project',
        close: 'Close popup'
    } : {
        category: 'Categoria',
        usefulFor: 'Util para',
        details: 'Explicacion detallada',
        docs: 'Documentacion oficial',
        noDocs: 'Aun no hay documentacion enlazada',
        defaultCategory: 'Proyecto',
        close: 'Cerrar popup'
    };

    const skillData = {
        html5: {
            docs: 'https://developer.mozilla.org/docs/Web/HTML',
            use: {
                es: 'Estructurar contenido web semantico y accesible.',
                en: 'Build semantic and accessible web structure.'
            }
        },
        css3: {
            docs: 'https://developer.mozilla.org/docs/Web/CSS',
            use: {
                es: 'Crear interfaces visuales responsive y modernas.',
                en: 'Create responsive and modern visual interfaces.'
            }
        },
        javascript: {
            docs: 'https://developer.mozilla.org/docs/Web/JavaScript',
            use: {
                es: 'Dar interactividad, validaciones y logica al front-end.',
                en: 'Add interactivity, validation, and front-end logic.'
            }
        },
        jquery: {
            docs: 'https://api.jquery.com/',
            use: {
                es: 'Acelerar manipulacion del DOM en proyectos legacy.',
                en: 'Speed up DOM work in legacy projects.'
            }
        },
        java: {
            docs: 'https://docs.oracle.com/en/java/',
            use: {
                es: 'Desarrollar aplicaciones robustas orientadas a objetos.',
                en: 'Build robust object-oriented applications.'
            }
        },
        sql: {
            docs: 'https://www.postgresql.org/docs/',
            use: {
                es: 'Consultar, modelar y mantener bases de datos relacionales.',
                en: 'Query, model, and maintain relational databases.'
            }
        },
        python: {
            docs: 'https://docs.python.org/3/',
            use: {
                es: 'Automatizacion, backend y analisis de datos.',
                en: 'Automation, back-end, and data analysis.'
            }
        },
        php: {
            docs: 'https://www.php.net/docs.php',
            use: {
                es: 'Construir backends web y APIs del lado servidor.',
                en: 'Build server-side web backends and APIs.'
            }
        },
        c: {
            docs: 'https://en.cppreference.com/w/c',
            use: {
                es: 'Programar software de alto rendimiento y bajo nivel.',
                en: 'Develop high-performance low-level software.'
            }
        },
        github: {
            docs: 'https://docs.github.com/',
            use: {
                es: 'Colaborar en equipo y versionar codigo con Git.',
                en: 'Collaborate and version code with Git.'
            }
        },
        linux: {
            docs: 'https://www.kernel.org/doc/html/latest/',
            use: {
                es: 'Administrar sistemas, servidores y entornos de desarrollo.',
                en: 'Manage systems, servers, and development environments.'
            }
        },
        redes: {
            docs: 'https://www.cloudflare.com/learning/network-layer/what-is-a-computer-network/',
            use: {
                es: 'Diseñar y proteger comunicaciones entre sistemas.',
                en: 'Design and secure communication between systems.'
            }
        },
        networks: {
            docs: 'https://www.cloudflare.com/learning/network-layer/what-is-a-computer-network/',
            use: {
                es: 'Disenar y proteger comunicaciones entre sistemas.',
                en: 'Design and secure communication between systems.'
            }
        },
        androidstudio: {
            docs: 'https://developer.android.com/studio',
            use: {
                es: 'Crear y depurar apps Android de forma productiva.',
                en: 'Build and debug Android apps productively.'
            }
        }
    };

    const skillAliases = {
        android: 'androidstudio',
        'androidstudio': 'androidstudio',
        'redes': 'redes',
        'networks': 'networks'
    };

    const escapeHtml = (value) => value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');

    const normalizeSkill = (value) => value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '');

    const getSkillKey = (skillName) => {
        const normalized = normalizeSkill(skillName);
        return skillAliases[normalized] || normalized;
    };
    const getCategory = (trigger, labels) => {
        const category =
            getDataAttrLang(trigger, 'category') ||
            trigger.closest('.cartas')?.querySelector('h3')?.textContent?.trim();
        return category || labels.defaultCategory;
    };

    const getDataAttr = (trigger, name) =>
        trigger.dataset[name] || trigger.querySelector(`[data-${name}]`)?.dataset[name];
    const getDataAttrLang = (trigger, name) => {
        const isEnglish = getIsEnglish();
        const key = isEnglish ? `${name}En` : `${name}Es`;
        return trigger.dataset[key] ||
            trigger.querySelector(`[data-${name}-${isEnglish ? 'en' : 'es'}]`)?.dataset[key] ||
            getDataAttr(trigger, name);
    };

    const getSummary = (text) => {
        const clean = text.replace(/\s+/g, ' ').trim();
        const sentence = clean.match(/[^.!?]+[.!?]/);
        return sentence ? sentence[0].trim() : clean;
    };

    let lastFocusedElement = null;
    let lastTrigger = null;

    const closePopup = () => {
        popupContainer.classList.remove('is-open');
        popupContainer.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('no-scroll');
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    };

    const openPopup = (trigger) => {
        const isEnglish = getIsEnglish();
        const labels = getLabels(isEnglish);
        const skillName =
            getDataAttrLang(trigger, 'title') ||
            trigger.querySelector('h3')?.textContent?.trim() ||
            trigger.textContent.trim();
        const category = getCategory(trigger, labels);
        const detail = getDataAttrLang(trigger, 'info')?.trim() || '';
        const summary = getSummary(detail);
        const skillKey = getSkillKey(skillName);
        const resource = skillData[skillKey];
        const usefulText = resource?.use?.[isEnglish ? 'en' : 'es'] || summary;
        const projectLink = getDataAttr(trigger, 'link') || trigger.closest('.link')?.dataset.link;
        const projectImage = trigger.closest('.content')?.querySelector('.project-image');
        const imageBlock = projectImage
            ? `<figure class="skill-popup-figure"><img src="${projectImage.src}" alt="${escapeHtml(projectImage.alt || skillName)}"></figure>`
            : '';
        const projectButton = projectLink
            ? `<a class="skill-popup-link" href="${escapeHtml(projectLink)}" target="_blank" rel="noopener noreferrer">${isEnglish ? 'View on GitHub' : 'Ver en GitHub'}</a>`
            : '';
        const pdfUrl = getDataAttr(trigger, 'pdf');
        const pdfBlock = pdfUrl
            ? `<iframe class="popup-pdf" src="${escapeHtml(pdfUrl)}#toolbar=0&navpanes=0&scrollbar=0&zoom=page-width" title="${escapeHtml(skillName)} PDF preview" loading="lazy"></iframe>`
            : '';
        const courseMeta = (getDataAttrLang(trigger, 'date') || getDataAttrLang(trigger, 'issuer'))
            ? `<p class="skill-popup-meta">${getDataAttrLang(trigger, 'date') ? `<strong>${isEnglish ? 'Date:' : 'Fecha:'}</strong> ${escapeHtml(getDataAttrLang(trigger, 'date'))} · ` : ''}${getDataAttrLang(trigger, 'issuer') ? `<strong>${isEnglish ? 'Issuer:' : 'Emisor:'}</strong> ${escapeHtml(getDataAttrLang(trigger, 'issuer'))}` : ''}</p>`
            : '';
        const viewPdfBtn = pdfUrl
            ? `<a class="skill-popup-link" href="${escapeHtml(pdfUrl)}" target="_blank" rel="noopener noreferrer">${isEnglish ? 'View certificate' : 'Ver certificado'}</a>`
            : '';
        const downloadBtn = getDataAttr(trigger, 'download')
            ? `<a class="skill-popup-link" href="${escapeHtml(getDataAttr(trigger, 'download'))}" download>${isEnglish ? 'Download PDF' : 'Descargar PDF'}</a>`
            : '';

        const docsBlock = resource?.docs
            ? `<a class="skill-popup-link" href="${resource.docs}" target="_blank" rel="noopener noreferrer">${labels.docs}</a>`
            : '';

        const actions = [docsBlock, viewPdfBtn, downloadBtn, projectButton].filter(Boolean).join('');

        popupInfo.innerHTML = `
            <article class="skill-popup-card">
                <p class="skill-popup-kicker">${labels.category}: ${escapeHtml(category)}</p>
                <h3 class="skill-popup-title" id="skill-popup-title">${escapeHtml(skillName)}</h3>
                ${imageBlock}
                ${courseMeta}
                ${pdfBlock}
                <p class="skill-popup-summary">${escapeHtml(summary)}</p>
                <p class="skill-popup-useful"><strong>${labels.usefulFor}:</strong> ${escapeHtml(usefulText)}</p>
                <details class="skill-popup-details">
                    <summary>${labels.details}</summary>
                    <p>${escapeHtml(detail)}</p>
                </details>
                <div class="skill-popup-actions">${actions}</div>
            </article>
        `;

        lastFocusedElement = trigger;
        lastTrigger = trigger;
        closeButton.setAttribute('aria-label', labels.close);
        popupContainer.classList.add('is-open');
        popupContainer.setAttribute('aria-hidden', 'false');
        document.body.classList.add('no-scroll');
        closeButton.focus();
    };

    popupTriggers.forEach((trigger) => {
        trigger.setAttribute('tabindex', '0');
        trigger.setAttribute('aria-haspopup', 'dialog');
        const linkContainer = trigger.closest('.link');

        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            openPopup(trigger);
        });
        trigger.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openPopup(trigger);
            }
        });

        if (linkContainer) {
            linkContainer.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                openPopup(trigger);
            });
        }
    });

    document.addEventListener('i18n:changed', () => {
        if (popupContainer.classList.contains('is-open') && lastTrigger) {
            openPopup(lastTrigger);
        }
    });

    closeButton.addEventListener('click', closePopup);
    popupContainer.addEventListener('click', (event) => {
        if (event.target === popupContainer) {
            closePopup();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && popupContainer.classList.contains('is-open')) {
            closePopup();
        }
    });
});
