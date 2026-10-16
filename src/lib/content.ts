export interface Project {
  file: string;
  title: string;
  description: string;
  image: string;
  gallery: string[];
  tags: string[];
  links: {
    code: string;
    preview?: string;
  };
}

export interface Experience {
  role: string;
  className: string;
  extendsClass: string;
  company: string;
  period: string;
  location: string;
  current: boolean;
  tasks: string[];
  tags: string[];
  achievement?: string;
}

export const PORTFOLIO_CONTENT = {
  profile: {
    name: "Eduardo Mar",
    user: "eduardo",
    host: "dev",
    path: "~/portafolio",
    title: "Ingeniero de Software Full Stack · Backend, QA & AI-Assisted Dev",
    bio: "Ingeniero de software Full Stack con más de 3 años de trayectoria en la industria IT. Especializado en arquitectura backend con PHP, colas de mensajería asíncronas con RabbitMQ y automatización con Puppeteer, complementado con frontend moderno (React, JS, Tailwind) y un sólido background en Quality Assurance (Cypress, SQL). Impulso mi productividad mediante ingeniería asistida por Inteligencia Artificial y entornos agénticos como Antigravity, garantizando entregas de software ágiles, de alta calidad, robustas y escalables.",
    location: "Altamira / Tampico, México",
    company: "BITAM® de México",
    email: "eduardomar987@gmail.com",
    phone: "+52 833 466 7206",
    cvUrl: "/Eduardo_Mar_CV.pdf",
    portrait: "/retrato.jpg",
    status: "Disponible para trabajar / Open to work",
    socials: {
      github: "https://github.com/EduMC14",
      linkedin: "https://www.linkedin.com/in/eduardo-mar-cruz-14091999emc/",
      email: "mailto:eduardomar987@gmail.com",
    },
    stats: [
      { label: "Experiencia IT", value: "+3 Años", desc: "Desarrollo Full Stack & QA" },
      { label: "Backend & Queues", value: "PHP + RabbitMQ", desc: "Procesamiento asíncrono y datos" },
      { label: "Automatización QA", value: "-30% Bugs", desc: "Reducción de errores en producción" },
      { label: "AI-Assisted Dev", value: "Antigravity + LLMs", desc: "Pair programming y flujos agénticos" },
    ],
  },

  experience: [
    {
      role: "Ingeniero de Desarrollo de Software Jr (Full Stack · Backend Focus)",
      className: "SoftwareEngineerFullStack",
      extendsClass: "BitamDeMexico",
      company: "BITAM® de México",
      period: "Septiembre 2025 - Actualidad",
      location: "Tampico / Remoto",
      current: true,
      tasks: [
        "Arquitectura Backend en PHP: Desarrollo y mantenimiento de lógica de servidor, servicios REST y sincronización de grandes volúmenes de datos entre múltiples repositorios y bases de datos.",
        "Colas de Mensajería con RabbitMQ: Implementación de arquitecturas asíncronas para el encolado y procesamiento en segundo plano de tareas complejas, asegurando alta disponibilidad y desacoplamiento de servicios.",
        "Desarrollo Acelerado con IA (Antigravity & Modelos LLM): Incorporación de herramientas de programación agéntica como Antigravity para refactorización de código, generación de pruebas automatizadas, optimización de algoritmos y pair programming avanzado.",
        "Automatización y Scraping con Puppeteer: Creación de robots automatizados para la extracción masiva de datos estructurados (JSON) y su canalización hacia loaders internos.",
        "Automatización de Documentación Fiscal: Flujos automatizados para la descarga y validación de documentos oficiales (opiniones de cumplimiento del SAT y reportes fiscales).",
        "Desarrollo Full Stack y Formularios Dinámicos: Creación de interfaces web y formularios interactivos para clientes finales que generan dinámicamente archivos PDF estructurados a partir de la información capturada.",
        "Optimización de Flujos y Workflows: Configuración y mejora continua de flujos operativos en Ebavel para la aplicación BFiskur, acelerando procesos de negocio con enfoque ágil.",
      ],
      tags: ["PHP", "RabbitMQ", "AI-Assisted Dev", "Antigravity", "Backend Architecture", "Full Stack", "Puppeteer (Robots)", "MySQL / SQL", "Loaders", "PDF Engine", "JavaScript", "BFiskur"],
    },
    {
      role: "Ingeniero de Investigación y Desarrollo (QA)",
      className: "QAEngineer",
      extendsClass: "BitamDeMexico",
      company: "BITAM® de México",
      period: "Noviembre 2022 - Septiembre 2025",
      location: "Tampico / Remoto",
      current: false,
      achievement: "Implementación del framework de pruebas automatizadas con Cypress, logrando una reducción del ~30% en errores detectados en producción.",
      tasks: [
        "Automatización Web E2E con Cypress: Diseño y despliegue de suites completas de pruebas automatizadas integradas a los ciclos de validación continua del producto.",
        "Logro de impacto comprobado: Reducción del ~30% en incidencias en producción gracias a la detección temprana de regresiones y fallos funcionales.",
        "Estrategia de Pruebas Integrales: Planificación y ejecución rigurosa de pruebas funcionales, de integración, end-to-end, humo y regresión en aplicaciones web empresariales a la medida.",
        "Pruebas de Backend y Validación SQL: Auditoría y comprobación de integridad de datos mediante consultas avanzadas en SQL / MySQL.",
        "Documentación y Gestión de Calidad: Redacción de especificaciones técnicas, planes de pruebas y seguimiento integral del ciclo de vida de bugs mediante Jira.",
      ],
      tags: ["Cypress (E2E)", "QA Automation", "SQL / MySQL", "Backend Testing", "Reducción de Bugs (-30%)", "Postman", "Jira", "Scrum"],
    },
  ] as Experience[],

  skills: {
    dependencies: {
      "php": "^8.2.0",
      "rabbitmq": "^3.12.0 (AMQP)",
      "antigravity-ai": "^2.0.0 (Agentic Coding)",
      "puppeteer": "^22.0.0",
      "sql-mysql": "^8.0.0",
      "javascript": "ESNext",
      "typescript": "^5.0.0",
      "react": "^18.2.0",
      "node.js": "^20.0.0",
      "cypress": "^13.0.0",
      "prompt-engineering": "Advanced",
      "tailwindcss": "^3.4.0",
      "postman-insomnia": "latest",
      "git-github": "latest"
    },
    categories: [
      {
        name: "Backend & Mensajería Asíncrona",
        items: ["PHP", "RabbitMQ (Colas / Workers)", "Node.js", "Express.js", "MySQL / SQL", "APIs RESTful", "Loaders & Sincronización", "Arquitectura Asíncrona"],
      },
      {
        name: "Inteligencia Artificial & Entornos Agénticos",
        items: ["Antigravity (Pair Programming Agéntico)", "Ingeniería de Prompts Técnicos", "Asistentes LLM de Código", "Refactorización & Debugging con IA", "Generación Automatizada de Tests con IA"],
      },
      {
        name: "Automatización & Extracción de Datos",
        items: ["Puppeteer (Robots)", "Descarga Automatizada PDF", "Generación Dinámica de PDFs", "Extracción JSON", "Workflows Ebavel / BFiskur"],
      },
      {
        name: "Frontend & Enfoque Full Stack",
        items: ["React", "JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3 / Tailwind CSS", "Astro", "Bootstrap", "Formularios Dinámicos"],
      },
      {
        name: "QA, Testing & Metodologías",
        items: ["Cypress (E2E)", "Validación SQL", "Pruebas de Integración y Regresión", "Postman", "Insomnia", "Git / GitHub", "Jira / Scrum"],
      },
    ],
  },

  projects: [
    {
      file: "series-tmdb.tsx",
      title: "Series TMDB",
      description: "Aplicación web que consume la API de The Movie Database (TMDB) para explorar series populares y mejores puntuadas, con filtrado ágil y diseño responsive.",
      image: "/mv.webp",
      gallery: ["/mv.webp", "/mv2.webp", "/mv3.webp"],
      tags: ["React", "React Router", "Redux Toolkit", "Bootstrap", "REST API", "Vite"],
      links: {
        code: "https://github.com/EduMC14/seriesTMDB?tab=readme-ov-file",
        preview: "https://seriestmdb.netlify.app/",
      },
    },
    {
      file: "pokedex.js",
      title: "Pokedex Clone",
      description: "Clon interactivo de una Pokédex conectado en tiempo real a PokeAPI. Incluye buscador instantáneo por ID o nombre y ficha técnica completa de habilidades y estadísticas.",
      image: "/pk1.webp",
      gallery: ["/pk1.webp", "/pk2.webp", "/pk3.webp"],
      tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "PokeAPI", "Node.js"],
      links: {
        code: "https://github.com/EduMC14/PokedexEMC",
        preview: "https://edumc14.github.io/PokedexEMC/",
      },
    },
    {
      file: "gestion-tareas.tsx",
      title: "Gestión de Tareas Bitam",
      description: "Sistema interno de seguimiento y control de tareas y requerimientos para el equipo de BITAM®. Permite categorizar tareas, verificar estados y gestionar prioridades.",
      image: "/gs1.webp",
      gallery: ["/gs1.webp", "/gs2.webp", "/gs3.png", "/gs4.png"],
      tags: ["React", "Node.js", "Express", "MySQL", "Styled Components", "Vite"],
      links: {
        code: "https://github.com/EduMC14/gestion_tareas",
        preview: "https://github.com/EduMC14/",
      },
    },
  ] as Project[],

  about: {
    markdownLines: [
      "# Sobre Mí — Eduardo Mar",
      "",
      "> Ingeniero de Desarrollo de Software Full Stack · Especialidad Backend, QA & AI-Assisted Dev.",
      "",
      "Profesional de la tecnología con más de 3 años de experiencia en desarrollo de",
      "software y Quality Assurance en BITAM® de México.",
      "",
      "Mi perfil es Full Stack con fuerte especialización en el ecosistema Backend y productividad asistida por IA:",
      "- Desarrollo de procesos robustos en PHP y sincronización de datos entre repositorios.",
      "- Implementación de arquitecturas desacopladas con colas de mensajería RabbitMQ.",
      "- Programación asistida por IA con Antigravity y flujos agénticos para máxima velocidad y código limpio.",
      "- Creación de bots de automatización con Puppeteer para extracción JSON y gestión de PDFs.",
      "- Construcción de interfaces reactivas y formularios dinámicos con React y Tailwind.",
      "",
      "Mi trayectoria previa en QA (Cypress, SQL, E2E) me aporta una mentalidad de ingeniería",
      "enfocada en la prevención de fallos, resiliencia y estabilidad de cada línea de código.",
      "",
      "Formación Académica:",
      "- Ingeniero Industrial — Universidad del Atlántico (2020 – 2023)",
      "- Professional in Coding — DEV.F (2021 – 2022)",
    ],
    detailsJson: {
      "desarrollador": "Eduardo Mar",
      "rol": "Ingeniero de Desarrollo de Software Full Stack",
      "enfoquePrincipal": "Backend (PHP & RabbitMQ) + AI-Assisted Dev (Antigravity)",
      "flujoDeTrabajoIA": [
        "Antigravity (Entorno Agéntico)",
        "Prompt Engineering Técnico",
        "Pair Programming Inteligente",
        "Generación Asistida de Tests & Refactors"
      ],
      "competenciasFrontend": ["React", "JavaScript", "TypeScript", "Tailwind CSS"],
      "backgroundQA": ["Cypress E2E", "Validación SQL", "Pruebas de Integración (-30% errores)"],
      "empresa": "BITAM® de México",
      "ubicacion": "Altamira / Tampico, Tamps, México",
      "educacion": [
        "Ingeniero Industrial — Universidad del Atlántico",
        "Professional in Coding — DEV.F"
      ],
      "idiomas": {
        "espanol": "Nativo",
        "ingles": "Intermedio"
      },
      "telefono": "+52 833 466 7206",
      "email": "eduardomar987@gmail.com",
      "disponibilidad": "Inmediata / Abierto a propuestas"
    },
  },
};
