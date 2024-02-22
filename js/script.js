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
        idiomas.innerHTML = 'Lenguajes';
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

        curso1.innerHTML = 'CYBERSECURITY IN INFORMATION TECHNOLOGY ENVIRONMENTS';
        texto1.innerHTML = "Specializing in cybersecurity and studying how to prevent, detect, and solve threats and issues.";
        texto2.innerHTML = "Subjects: Computer Forensic Analysis · Cybersecurity Incidents · Ethical Hacking · Network and System Hardening · Cybersecurity Regulations · Secure Production Deployment";
        curso2.innerHTML = "Dual Multiplatform Application Development";
        texto3.innerHTML = "Learning to create applications from backend to frontend, improving user experience.";
        curso3.innerHTML = "Accenture Spring Courses";
        texto4.innerHTML = "Developing programming skills, demonstrating my ability to work in teams and organize projects.";
        curso4.innerHTML = "Salesforce Own Course";
        texto5.innerHTML = "Developing programming skills, demonstrating my ability to work in teams and organize projects.";
        curso5.innerHTML = "Own Title in Cybersecurity, Cyberintelligence, Data Analysis, and Disruptive Technologies";
        texto6.innerHTML = "Developing programming skills, demonstrating my ability to work in teams and organize projects.";
        curso6.innerHTML = "Title in Human and Professional Leadership Training";
        texto7.innerHTML = "Developing skills, demonstrating my ability to work in teams and organize projects.";
        proyectos.innerHTML = 'Proyects';
        proyect1.innerHTML = "Arkanoid";
        proyecttext1.innerHTML = "Project to develop the Arkanoid game in Java, with good ball bounce, brick disappearance, and smooth cursor movement.";
        proyect2.innerHTML = "Basic Exercises";
        proyecttext2.innerHTML = "These are some initial exercises for understanding programming. It's an exercise involving squirrels that move if they meet certain objectives.";
        proyect3.innerHTML = "Calculator";
        proyecttext3.innerHTML = "This project aims to create a calculator similar to the one found on Apple devices, developed in Java.";
        proyect4.innerHTML = "Telefónica";
        proyecttext4.innerHTML = "Collection of different projects completed during the visit to 42Madrid.";
        proyect5.innerHTML = "Hangman";
        proyecttext5.innerHTML = "A replica of the Hangman game developed in Java.";
        proyect6.innerHTML = "iSounds";
        proyecttext6.innerHTML = "An application created in Java that generates buttons from a list of sounds and videos. When pressed, the buttons play the corresponding sound or video.";
        proyect7.innerHTML = "Pokedex";
        proyecttext7.innerHTML = "An application created in C that replicates the iconic Pokedex, providing varied information about Pokémon.";
        proyect8.innerHTML = "Interface Development";
        proyecttext8.innerHTML = "Folder containing all the projects for the Interface Development subject in the DAM degree.";
        proyect9.innerHTML = "Veterinary Clinic";
        proyecttext9.innerHTML = "An application created in C for a real-world veterinary store. It includes a database, user and employee registration and login with encrypted passwords, and a section for pets in case the user has more than one, etc.";
        idiomas.innerHTML = "Languajes"
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
        idiomas.innerHTML = 'Idiomas';
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
        proyect1.innerHTML = "Arkanoid";
        proyecttext1.innerHTML = "Proyecto para generar el juego de Arkanoid en Java, con un buen rebote de la pelota , la desaparición de los ladrillos y buen movimiento del cursor.";
        proyect2.innerHTML = "Ejercicios Basicos";
        proyecttext2.innerHTML = "Se trata de unos primeros ejercicios, para la comprension de la programación. Se trata de un ejercicio sobre Ardillas, las cuales se mueven si cumplen con unos objetivos.";
        proyect3.innerHTML = "Calculadora";
        proyecttext3.innerHTML = "Se trata de general una calculadora calcada a la que tiene los dispositivos de Apple , desarrollado en Java.";
        proyect4.innerHTML = "Telefonica"
        proyecttext4.innerHTML = "Se trata de los diferentes proyectos realizados en la visita a 42Madrid."
        proyect5.innerHTML = "Ahorcado"
        proyecttext5.innerHTML = "Se trata de la replica del juego del Ahorado realizado en Java."
        proyect6.innerHTML = "iSonidos"
        proyecttext6.innerHTML = "Se trata de una aplicacion creada en Java que genera botones a  partir de una lista de sonidos y videos y cuando se pulsan se reproducen . En el caso de tocar un boton de un video se genera una reproducción del mismo."
        proyect7.innerHTML = "Pokedex"
        proyecttext7.innerHTML = "Se trata de una aplicacion creada en C , que reproduce la mitica Pokedex, con informacion muy variada de los pokemon ."
        proyect8.innerHTML = "Desarrollo de Interfaces"
        proyecttext8.innerHTML = "Se trata de la carpeta donde guardaba todos los trabajos de la asignatura de desarrollo de interfaces en el grado de DAM."
        proyect9.innerHTML = "Veterinario"
        proyecttext9.innerHTML = "Se trata de una aplicacion creada en C, que funcionaria para una tienda de verdad, tiene su base de datos, registro y login para usuarios y empleados, con contraseñas encriptadas, incluye un apartado de mascotas, por si el usuario tiene mas de una, etc."
        idiomas.innerHTML = "Idiomas"

        misdatos.innerHTML = 'Mis datos';
        locationtext.innerHTML = 'Madrid, España';
        formulario.innerHTML = '<input type="text" name="name" id="nomretexto" class="inputdatos" placeholder="Nombre"><input type="email" name="email" class="inputdatos" placeholder="Correo electronico"><textarea name="message" placeholder="Mensaje" class="textdatos" cols="30" rows="10"></textarea>'
        send.innerHTML = 'Enviar';
        gracias.innerHTML = '¡Gracias por visitar mi sitio Web!';
    }

});


