# Mario De La Rosa García - Portfolio Personal

Un portfolio web interactivo, bilingüe y moderno diseñado para presentar mis proyectos, habilidades, certificaciones y experiencia como desarrollador de software especializado en ciberseguridad y desarrollo de aplicaciones multiplataforma.

## 🚀 Características

- **Internacionalización (i18n):** Soporte bilingüe completo Español / Inglés.
- **Modo Oscuro / Claro:** Alternancia de temas con persistencia de preferencias.
- **PWA (Progressive Web App):** Instalable en dispositivos móviles y escritorio, soportado por `manifest.json` y Service Workers.
- **Diseño Responsivo:** Completamente adaptable a pantallas móviles, tablets y monitores de escritorio.
- **UI/UX Moderna:**
  - Animaciones dinámicas al hacer scroll en la página.
  - Fondo animado e interactivo mediante partículas.
  - Efecto de texto de máquina de escribir.
  - Ventanas modales (popups) personalizadas para la visualización fluida de certificados y documentos PDF.

## 🛠️ Tecnologías Utilizadas

- **Frontend Core:** HTML5, CSS3, JavaScript Vanilla (ES6+).
- **Estructura CSS:** Arquitectura modular dividida en componentes (`home.css`, `navbar.css`, `skills.css`, `responsive.css`, `certificado.css`, etc.).
- **Herramientas de Desarrollo:** ESLint y Prettier configurados para mantener la calidad y el formato del código.
- **Librerías Adicionales:** Baffle.js para efectos de ofuscación de texto.

## 📂 Estructura del Proyecto

```text
├── certificados/     # Documentos, diplomas y CV (PDFs)
├── css/              # Hojas de estilo modulares
├── en/               # Punto de entrada y manifest para la versión en inglés
├── i18n/             # Archivos JSON con las traducciones (es.json, en.json)
├── imagenes/         # Recursos gráficos, iconos de tecnologías y logos
├── js/               # Scripts modulares (i18n, tema, animaciones, partículas, modales)
├── index.html        # Documento principal
├── sw.js             # Service Worker para funcionalidades Offline/PWA
├── manifest.json     # Manifiesto de la aplicación web
└── package.json      # Configuración de dependencias de entorno de desarrollo.
```

## 💻 Instalación y Uso Local
Al ser un proyecto desarrollado con tecnologías frontend puras (sin frameworks pesados), es muy sencillo de ejecutar:
Clonar el repositorio:
Bash
git clone [https://github.com/mario1322/mario1322.github.io.git](https://github.com/mario1322/mario1322.github.io.git)
Abrir el proyecto:
Para que funcionen correctamente las peticiones asíncronas (fetch) de los archivos de idioma locales (carpeta i18n/), se recomienda ejecutar el proyecto utilizando un servidor local.
Si usas Visual Studio Code, puedes instalar la extensión Live Server y abrir index.html con ella.
Alternativamente, puedes usar Node.js o Python:
Bash
##  Con Python 3
python -m http.server 8000
Luego accede a http://localhost:8000 en tu navegador.
## 📬 Contacto
Desarrollador: Mario De La Rosa García
Sitio web en vivo: https://mario1322.github.io/
