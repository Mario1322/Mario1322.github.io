/* Barra de navegación */

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Scroll a la sección seleccionada
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    let fromTop = window.scrollY;

    sections.forEach(sec => {
        let sectionId = sec.getAttribute('id');
        let navLink = document.querySelector('header nav a[href="#' + sectionId + '"]');
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;

        if (fromTop >= offset && fromTop < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            navLink.classList.add('active');
        }
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};


/* Cambio de tema */
let toggle = document.getElementById('toggle');
toggle.addEventListener('change', (event) => {
    let checked = event.target.checked;
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
    document.body.classList.toggle('cambiocolor');
    menuIcon.classList.remove('bx-x');
    if (checked) {
        label_toggle.innerHTML = "<i class='bx bx-moon' ></i>";
        logo_color.innerHTML = '<img class="logo" src="imagenes/gverdesinfondo.png" alt="logo">';
        imgyo.innerHTML = '<img class="imgyo" src="imagenes/fotoverde.png" alt="guapo">';

    } else {
        label_toggle.innerHTML = "<i class='bx bx-sun' ></i>"
        logo_color.innerHTML = '<img class="logo" src="imagenes/gblancosinfondo.png" alt="logo">';
        imgyo.innerHTML = '<img class="imgyo" src="imagenes/foto.png" alt="guapo">';
    }

});


/* Cambio de idioma */

let toggle_idioma = document.getElementById('toggle_idioma');
toggle_idioma.addEventListener('change', (event) => {
    let checked_idioma = event.target.checked;
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
    if (checked_idioma) {
        casa.innerHTML = 'About me';
        formation.innerHTML = 'Education';
        formation1.innerHTML = 'Education';
        formation2.innerHTML = 'Education';
        contact.innerHTML = 'Contact';
        contact1.innerHTML = 'Contact';
        idioma_toggle.innerHTML = "ES<i class='bx bx-chevron-down'></i>"
        curriculum.innerHTML = 'Download CV';
        contactarme.innerHTML = 'Contact me';
        contactarme1.innerHTML = 'Contact me';
        loquesoy.innerHTML = 'Software</br>Developer';
        textosobremi.innerHTML = "I am a young person with many interests, eager to learn and showcase my knowledge. I am constantly learning new technologies and tools to improve my skills.";
        conocermas.innerHTML = 'Know more';
        herramientastexto.innerHTML = 'Tools';
        redes.innerHTML = 'Networks';
        anio1.innerHTML = '2023-Present';
        curso1.innerHTML = 'Cybersecurity course';
        texto1.innerHTML = "Majoring in cybersecurity and studying how to prevent, detect and solve threats and problems.";
        curso2.innerHTML = "Degree in DAM";
        texto2.innerHTML = "Learning to create applications from backend to frontend, improving the user experience.";
        curso3.innerHTML = "Robotic course";
        texto3.innerHTML = "Developing programming knowledge, demonstrating my ability to work in a team and organize projects.";
        proyectos.innerHTML = 'Proyects';
        proyect1.innerHTML = "<i class='bx bxl-github'></i> Guitar store";
        proyecttext1.innerHTML = "E-commerce project using HTML, CSS, JS, PHP and SQL presented as TFG of the DAM course";
        proyect2.innerHTML = "<i class='bx bxl-github'></i> Odoo replica";
        proyecttext2.innerHTML = "Proyect of an application closely resembling the ERP Odoo and some of its modules developed in VBA.";
        proyect3.innerHTML = "<i class='bx bxl-github'></i> Hospital database";
        proyecttext3.innerHTML = "Application to manage the database of a hospital developed in Intelliji with Java, Hibernate and SQL.";
        misdatos.innerHTML = 'My info';
        locationtext.innerHTML = 'Madrid, Spain';
        formulario.innerHTML = '<input type="text" name="name" id="nomretexto" class="inputdatos" placeholder="Name"><input type="email" name="email" class="inputdatos" placeholder="Email"><textarea name="message" placeholder="Message" class="textdatos" cols="30" rows="10"></textarea>'
        send.innerHTML = 'Send';
        gracias.innerHTML = 'Thank you for visiting my website!';


    } else {
        casa.innerHTML = 'Sobre mi';
        formation.innerHTML = 'Formación';
        formation1.innerHTML = 'Formación';
        formation2.innerHTML = 'Formación';
        contact.innerHTML = 'Contacto';
        contact1.innerHTML = 'Contacto';
        idioma_toggle.innerHTML = "EN<i class='bx bx-chevron-down'></i>"
        curriculum.innerHTML = 'Descargar CV';
        contactarme.innerHTML = 'Contactarme';
        contactarme1.innerHTML = 'Contactarme';
        loquesoy.innerHTML = 'Desarrollador</br>de software';
        textosobremi.innerHTML = "Soy un joven apasionado con un constante anhelo de aprender y expresar mi sabiduría. Mi sed de conocimiento me impulsa a explorar continuamente nuevas tecnologías y herramientas, buscando mejorar y perfeccionar mis habilidades en cada paso del camino.";
        conocermas.innerHTML = 'Conocer más';
        herramientastexto.innerHTML = 'Herramientas';
        redes.innerHTML = 'Redes';
        anio1.innerHTML = '2023-Actualidad';
        curso1.innerHTML = 'CIBERSEGURIDAD EN ENTORNOS DE LAS TECNOLOGÍAS Y LA INFORMACIÓN';
        texto1.innerHTML = "Especializandome en ciberseguridad y estudiando a prevenir, detectar y solucionar amenazas y problemas.";
        texto2.innerHTML = "Asignaturas: Análisis Forense Informatico · Incidentes de Ciberseguridad · Haking Etico · Bastionado de Redes Y Sistemas · Normativas de Ciberseguridad · Puesta En Producción Segura"
        curso2.innerHTML = "Desarrollo de Aplicaciones Multiplataforma Dual";
        texto3.innerHTML = "Aprendiendo a crear aplicaciones desde backend hasta frontend mejorando la experiencia de usuario.";
        curso3.innerHTML = "Cursos de Accenture Primavera";
        texto4.innerHTML = "Desarrollando conocimientos de programación, demostrando mi capacidad de trabajar en equipo y organizar proyectos.";
        curso4.innerHTML = "Curso Propio de Salesforce"
        texto5.innerHTML = "Desarrollando conocimientos de programación, demostrando mi capacidad de trabajar en equipo y organizar proyectos."
        curso5.innerHTML = "Titulo Propio de Esp. En Ciberseguridad,Ciberinteligencia, análisis de datos y tecnologías disruptivas."
        texto6.innerHTML = "Desarrollando conocimientos de programación, demostrando mi capacidad de trabajar en equipo y organizar proyectos."
        curso6.innerHTML = "Titulo en Formación para el Liderazgo humano y profesional"
        texto7.innerHTML = "Desarrollando conocimientos, demostrando mi capacidad de trabajar en equipo y organizar proyectos."
        proyectos.innerHTML = 'Proyectos';
        proyect1.innerHTML = "<i class='bx bxl-github'></i> Tienda de Guitarras";
        proyecttext1.innerHTML = "Proyecto de e-commerce utilizando HTML, CSS, JS, PHP y SQL presentado como TFG del curso de DAM";
        proyect2.innerHTML = "<i class='bx bxl-github'></i> Replica Odoo";
        proyecttext2.innerHTML = "Trabajo sobre una aplicación lo mas parecida al ERP Odoo y alguno de sus modulos desarrollado en VBA.";
        proyect3.innerHTML = "<i class='bx bxl-github'></i> BBDD Hospital";
        proyecttext3.innerHTML = "Aplicación para gestionar la BBDD de un hospital desarrollada en Intelliji con Java, Hibernate y SQL.";
        misdatos.innerHTML = 'Mis datos';
        locationtext.innerHTML = 'Madrid, España';
        formulario.innerHTML = '<input type="text" name="name" id="nomretexto" class="inputdatos" placeholder="Nombre"><input type="email" name="email" class="inputdatos" placeholder="Correo electronico"><textarea name="message" placeholder="Mensaje" class="textdatos" cols="30" rows="10"></textarea>'
        send.innerHTML = 'Enviar';
        gracias.innerHTML = '¡Gracias por visitar mi sitio Web!';
    }

});


