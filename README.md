# Mario De La Rosa - Portfolio

Portfolio personal bilingue (ES/EN) construido con HTML, CSS y JavaScript vanilla.

## Demo

- Sitio en vivo: [https://mario1322.github.io/](https://mario1322.github.io/)
- Espanol: `index.html`
- English: toggle desde el selector de idioma en la web (JS/i18n)

## Caracteristicas

- Diseno responsive para desktop y mobile
- Version en espanol e ingles
- Efecto de maquina de escribir y animaciones visuales
- Visor de certificados PDF con navegacion y descarga
- Formulario de contacto con Formspree
- Modo claro/oscuro con persistencia en `localStorage`

## Stack

- HTML5
- CSS3
- JavaScript (modular)
- Librerias por CDN: `particles.js`, `pdf.js`, `boxicons`, `baffle.js`

## Estructura del proyecto

```
.
|-- index.html
|-- css/
|-- js/
|-- imagenes/
`-- certificados/
```

## Desarrollo local

Como usa modulos ES, `fetch` para i18n y service worker, conviene servirlo con un servidor local:

```bash
npm run dev
```

Luego abre `http://localhost:4173`.
