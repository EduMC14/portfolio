const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generateCV(outputPath) {
  // Dimensiones carta estándar en puntos: 612 x 792
  const doc = new PDFDocument({
    size: 'LETTER',
    margins: { top: 32, bottom: 30, left: 36, right: 36 },
    info: {
      Title: 'CV - Eduardo Mar | Full Stack Software Engineer',
      Author: 'Eduardo Mar',
      Subject: 'Curriculum Vitae',
      Keywords: 'Full Stack, Backend, PHP, RabbitMQ, Antigravity, AI, Open Design, QA, Cypress, SQL',
    }
  });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  const left = 36;
  const right = 612 - 36;
  const contentWidth = right - left; // 540 pt

  // Paleta de colores profesional y sobria (ATS-friendly)
  const cTitle = '#0f172a';      // Slate 900
  const cAccent = '#0284c7';     // Sky 600
  const cCompany = '#0369a1';    // Sky 700
  const cText = '#334155';       // Slate 700
  const cLight = '#64748b';      // Slate 500
  const cBorder = '#cbd5e1';     // Slate 300
  const cGreenBg = '#f0fdf4';    // Green 50
  const cGreenBorder = '#16a34a';// Green 600
  const cGreenText = '#15803d';  // Green 700

  // ==========================================
  // 1. ENCABEZADO
  // ==========================================
  doc.font('Helvetica-Bold').fontSize(19).fillColor(cTitle);
  doc.text('EDUARDO MAR', left, doc.y, { align: 'center', characterSpacing: 0.5 });
  doc.moveDown(0.2);

  doc.font('Helvetica-Bold').fontSize(9.5).fillColor(cAccent);
  doc.text('Ingeniero de Desarrollo de Software Full Stack · Backend & AI-Assisted Dev', { align: 'center' });
  doc.moveDown(0.25);

  doc.font('Helvetica').fontSize(8.2).fillColor(cLight);
  const contactText = '(52) 833-466-72-06   |   eduardomar987@gmail.com   |   eduardomc.onrender.com   |   linkedin.com/in/eduardo-mar-cruz-14091999emc   |   github.com/EduMC14';
  doc.text(contactText, { align: 'center' });
  doc.moveDown(0.5);

  // Línea separadora encabezado
  doc.strokeColor(cTitle).lineWidth(1.2).moveTo(left, doc.y).lineTo(right, doc.y).stroke();
  doc.moveDown(0.5);

  // Helper para títulos de sección
  function drawSectionTitle(title) {
    const y = doc.y;
    doc.font('Helvetica-Bold').fontSize(9.8).fillColor(cTitle);
    doc.text(title.toUpperCase(), left, y, { characterSpacing: 0.6 });
    const lineY = doc.y + 1.5;
    doc.strokeColor(cBorder).lineWidth(0.8).moveTo(left, lineY).lineTo(right, lineY).stroke();
    doc.y = lineY + 3.5;
  }

  // ==========================================
  // 2. PROFILE SUMMARY
  // ==========================================
  drawSectionTitle('Profile Summary');
  doc.font('Helvetica').fontSize(8.5).fillColor(cText).lineGap(1.2);
  const summary = 
    'Profesional de la industria IT con más de 3 años de experiencia en desarrollo de software y Quality Assurance. Especializado en arquitectura backend con PHP, colas de mensajería con RabbitMQ y automatización de procesos, complementado con frontend moderno (React, JavaScript, Tailwind) y un enfoque pionero en desarrollo acelerado con Inteligencia Artificial utilizando herramientas agénticas como Antigravity y principios de Open Design para construir sistemas ágiles, modulares y altamente seguros. Mi trayectoria previa en QA me permite aportar una visión orientada a la calidad, pruebas automatizadas E2E y reducción de errores en producción, colaborando activamente con equipos multidisciplinarios para entregar soluciones de alto impacto.';
  doc.text(summary, left, doc.y, { width: contentWidth, align: 'justify' });
  doc.moveDown(0.5);

  // ==========================================
  // 3. EXPERIENCE
  // ==========================================
  drawSectionTitle('Experience');

  // Helper para bullets
  function drawBullet(lead, body) {
    const startY = doc.y;
    doc.font('Helvetica').fontSize(8.3).fillColor(cAccent);
    doc.text('•', left + 3, startY);

    doc.font('Helvetica-Bold').fontSize(8.3).fillColor(cTitle);
    const leadWidth = doc.widthOfString(lead + ' ');
    doc.text(lead + ' ', left + 13, startY, { continued: true });

    doc.font('Helvetica').fontSize(8.3).fillColor(cText).lineGap(1);
    doc.text(body, { width: contentWidth - 13, align: 'justify' });
    doc.y += 1.5;
  }

  // Puesto 1: Software Engineer Jr
  const yJob1 = doc.y;
  doc.font('Helvetica-Bold').fontSize(9.2).fillColor(cTitle);
  doc.text('Ingeniero de Desarrollo de Software Jr (Full Stack · Backend Focus)', left, yJob1, { continued: true });
  doc.font('Helvetica-Bold').fillColor(cCompany).text(' — BITAM DE MÉXICO');
  
  doc.font('Helvetica-Bold').fontSize(8.2).fillColor(cLight);
  doc.text('Septiembre 2025 – Actualidad', left, yJob1, { align: 'right', width: contentWidth });
  doc.y += 2;

  drawBullet('Arquitectura Backend en PHP:', 'Desarrollo y mantenimiento de procesos internos y servicios REST en PHP, gestionando la sincronización, migración y validación íntegra de registros entre múltiples repositorios y bases de datos.');
  drawBullet('Colas de Mensajería con RabbitMQ:', 'Implementación de arquitecturas asíncronas para el encolado y procesamiento desacoplado en segundo plano de tareas pesadas y flujos masivos de datos, asegurando alta concurrencia y tolerancia a fallos.');
  drawBullet('Desarrollo Acelerado con IA (Antigravity & Open Design):', 'Integración de flujos de trabajo agénticos con Antigravity y patrones de Open Design para acelerar el ciclo de desarrollo, refactorización segura de código, pair programming asistido por IA y arquitectura modular.');
  drawBullet('Automatización y Scraping con Puppeteer:', 'Diseño y despliegue de robots automatizados para la extracción masiva de datos estructurados en formato JSON y su canalización eficiente hacia loaders internos.');
  drawBullet('Automatización de Documentación Fiscal:', 'Flujos automatizados para la descarga y validación de opiniones de cumplimiento ante el SAT y reportes fiscales oficiales.');
  drawBullet('Desarrollo Full Stack y Formularios Dinámicos:', 'Construcción de interfaces reactivas para clientes finales con generación dinámica de documentos PDF a partir de datos capturados.');
  drawBullet('Optimización de Workflows (Ebavel / BFiskur):', 'Mantenimiento y optimización de flujos operativos en la aplicación BFiskur, reduciendo tiempos de procesamiento con metodologías ágiles.');

  doc.y += 3;

  // Puesto 2: QA Engineer
  const yJob2 = doc.y;
  doc.font('Helvetica-Bold').fontSize(9.2).fillColor(cTitle);
  doc.text('Ingeniero de Investigación y Desarrollo (QA)', left, yJob2, { continued: true });
  doc.font('Helvetica-Bold').fillColor(cCompany).text(' — BITAM DE MÉXICO');

  doc.font('Helvetica-Bold').fontSize(8.2).fillColor(cLight);
  doc.text('Noviembre 2022 – Septiembre 2025', left, yJob2, { align: 'right', width: contentWidth });
  doc.y += 2;

  // Logro clave destacado en recuadro suave
  const boxY = doc.y;
  const boxHeight = 15;
  doc.rect(left, boxY, contentWidth, boxHeight).fill(cGreenBg);
  doc.rect(left, boxY, 2.5, boxHeight).fill(cGreenBorder);
  doc.font('Helvetica-Bold').fontSize(8.1).fillColor(cGreenText);
  doc.text('★ Logro Clave:', left + 8, boxY + 3.5, { continued: true });
  doc.font('Helvetica').text(' Implementé el framework de pruebas automatizadas con Cypress, logrando una reducción aproximada del 30% en los errores detectados en producción.');
  doc.y = boxY + boxHeight + 3.5;

  drawBullet('Automatización Web E2E con Cypress:', 'Planificación, diseño e integración de suites completas de pruebas automatizadas en los flujos de validación continua y entrega del producto.');
  drawBullet('Estrategia de Pruebas Integrales:', 'Planificación y ejecución rigurosa de pruebas funcionales, de integración, end-to-end, humo y regresión en aplicaciones web corporativas.');
  drawBullet('Pruebas de Backend y Validación SQL:', 'Auditoría de integridad y consistencia de datos mediante consultas avanzadas en bases de datos relacionales (SQL / MySQL).');
  drawBullet('Documentación Técnica y Calidad:', 'Elaboración de planes de prueba detallados, especificaciones funcionales y seguimiento del ciclo de vida de incidencias en Jira junto a desarrolladores y líderes técnicos.');

  doc.y += 4;

  // ==========================================
  // 4. TECHNICAL SKILLS
  // ==========================================
  drawSectionTitle('Technical Skills');

  function drawSkillRow(category, items) {
    const curY = doc.y;
    doc.font('Helvetica-Bold').fontSize(8.2).fillColor(cTitle);
    doc.text(category, left, curY, { width: 140 });

    doc.font('Helvetica').fontSize(8.2).fillColor(cText).lineGap(1);
    doc.text(items, left + 142, curY, { width: contentWidth - 142 });
    doc.y += 1.5;
  }

  drawSkillRow('Backend & Mensajería:', 'PHP, RabbitMQ (Colas Asíncronas / AMQP), Node.js, Express, MySQL / SQL, APIs RESTful, Loaders.');
  drawSkillRow('IA & Flujos Agénticos:', 'Antigravity (Google Agentic Dev), Open Design (Sistemas Modulares y Seguros), Pair Programming con LLMs, Prompt Engineering Técnico, Refactorización Acelerada.');
  drawSkillRow('Automatización & Scraping:', 'Puppeteer (Robots), Generación y Descarga Automatizada de PDFs, Extracción JSON, Workflows Ebavel / BFiskur.');
  drawSkillRow('Frontend & Full Stack:', 'JavaScript (ES6+), TypeScript, React, HTML5, CSS3, Tailwind CSS, Bootstrap, Formularios Dinámicos.');
  drawSkillRow('QA & Herramientas:', 'Cypress (E2E), Validación SQL, Postman, Insomnia, Git, GitHub, Jira, Scrum, Vite, Linux / Bash.');

  doc.y += 4;

  // ==========================================
  // 5. EDUCATION & LANGUAGES (2 Columnas)
  // ==========================================
  const colY = doc.y;
  const colWidth = (contentWidth - 20) / 2;

  // Columna Izquierda: Educación
  doc.y = colY;
  drawSectionTitle('Education');
  doc.font('Helvetica-Bold').fontSize(8.4).fillColor(cTitle);
  doc.text('Ingeniero Industrial', left, doc.y, { continued: true });
  doc.font('Helvetica').fillColor(cLight).text(' — Universidad del Atlántico (2020 – 2023)');
  doc.y += 1;
  doc.font('Helvetica-Bold').fontSize(8.4).fillColor(cTitle);
  doc.text('Professional in Coding', left, doc.y, { continued: true });
  doc.font('Helvetica').fillColor(cLight).text(' — DEV.F (2021 – 2022)');

  // Columna Derecha: Idiomas
  doc.y = colY;
  const rightColLeft = left + colWidth + 20;
  
  // Título columna derecha
  const titleY = doc.y;
  doc.font('Helvetica-Bold').fontSize(9.8).fillColor(cTitle);
  doc.text('LANGUAGES', rightColLeft, titleY, { characterSpacing: 0.6 });
  const rightLineY = doc.y + 1.5;
  doc.strokeColor(cBorder).lineWidth(0.8).moveTo(rightColLeft, rightLineY).lineTo(right, rightLineY).stroke();
  doc.y = rightLineY + 3.5;

  doc.font('Helvetica-Bold').fontSize(8.4).fillColor(cTitle);
  doc.text('Español: ', rightColLeft, doc.y, { continued: true });
  doc.font('Helvetica').fillColor(cText).text('Nativo');
  doc.y += 1;
  doc.font('Helvetica-Bold').fontSize(8.4).fillColor(cTitle);
  doc.text('Inglés: ', rightColLeft, doc.y, { continued: true });
  doc.font('Helvetica').fillColor(cText).text('Intermedio (Técnico / Lectura y Comunicación Profesional)');

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on('finish', () => resolve(outputPath));
    stream.on('error', reject);
  });
}

const targetPath = path.resolve(__dirname, 'public', 'Eduardo_Mar_CV.pdf');
const staticPath = path.resolve(__dirname, 'static', 'Eduardo_Mar_CV.pdf');

generateCV(targetPath)
  .then(() => {
    fs.copyFileSync(targetPath, staticPath);
    console.log('PDF generado exitosamente en public/ y static/');
  })
  .catch((err) => {
    console.error('Error al generar PDF:', err);
    process.exit(1);
  });
