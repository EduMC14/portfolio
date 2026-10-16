const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generateCV(outputPath) {
  // Dimensiones carta estándar: 612 x 792 pt
  // Márgenes amplios y equilibrados para que respire visualmente
  const doc = new PDFDocument({
    size: 'LETTER',
    margins: { top: 38, bottom: 36, left: 42, right: 42 },
    info: {
      Title: 'CV - Eduardo Mar | Ingeniero de Software Full Stack',
      Author: 'Eduardo Mar',
      Subject: 'Curriculum Vitae',
      Keywords: 'Full Stack, Backend, PHP, RabbitMQ, Antigravity, AI, Open Design, QA, Cypress, SQL',
    }
  });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  const left = 42;
  const right = 612 - 42;
  const contentWidth = right - left; // 528 pt

  // Paleta limpia, moderna y de alto contraste
  const cTitle = '#0f172a';       // Slate 900
  const cSubtitle = '#0369a1';    // Sky 700
  const cCompany = '#0284c7';     // Sky 600
  const cText = '#334155';        // Slate 700
  const cLight = '#64748b';       // Slate 500
  const cBorder = '#e2e8f0';      // Slate 200
  const cRule = '#94a3b8';        // Slate 400
  const cGreenBg = '#f0fdf4';     // Green 50
  const cGreenBorder = '#22c55e'; // Green 500
  const cGreenText = '#15803d';   // Green 700

  // ==========================================
  // 1. ENCABEZADO (Limpio y centrado)
  // ==========================================
  doc.font('Helvetica-Bold').fontSize(21).fillColor(cTitle);
  doc.text('EDUARDO MAR', left, doc.y, { align: 'center', characterSpacing: 0.8 });
  doc.y += 2;

  doc.font('Helvetica-Bold').fontSize(10.5).fillColor(cSubtitle);
  doc.text('Ingeniero de Software Full Stack · Backend & AI-Assisted Dev', { align: 'center' });
  doc.y += 5;

  doc.font('Helvetica').fontSize(8.6).fillColor(cLight);
  const contactText = '(52) 833-466-72-06  ·  eduardomar987@gmail.com  ·  eduardomc.onrender.com  ·  LinkedIn  ·  GitHub  ·  México';
  doc.text(contactText, { align: 'center' });
  doc.y += 8;

  // Línea divisoria elegante
  doc.strokeColor(cBorder).lineWidth(1).moveTo(left, doc.y).lineTo(right, doc.y).stroke();
  doc.y += 10;

  // Helper de títulos de sección con buen espaciado
  function drawSectionTitle(title) {
    const y = doc.y;
    doc.font('Helvetica-Bold').fontSize(10.5).fillColor(cTitle);
    doc.text(title.toUpperCase(), left, y, { characterSpacing: 0.8 });
    const lineY = doc.y + 2;
    doc.strokeColor(cBorder).lineWidth(1).moveTo(left, lineY).lineTo(right, lineY).stroke();
    doc.y = lineY + 6;
  }

  // Helper de viñetas claras con sangría
  function drawBullet(lead, body) {
    const startY = doc.y;
    // Icono viñeta
    doc.font('Helvetica-Bold').fontSize(8.8).fillColor(cCompany);
    doc.text('•', left + 4, startY);

    // Título en negrita
    doc.font('Helvetica-Bold').fontSize(8.8).fillColor(cTitle);
    doc.text(lead + ' ', left + 15, startY, { continued: true });

    // Texto descriptivo con interlineado holgado
    doc.font('Helvetica').fontSize(8.8).fillColor(cText).lineGap(1.6);
    doc.text(body, { width: contentWidth - 15, align: 'justify' });
    doc.y += 4;
  }

  // ==========================================
  // 2. PERFIL PROFESIONAL (Directo y claro)
  // ==========================================
  drawSectionTitle('Perfil Profesional');
  doc.font('Helvetica').fontSize(9).fillColor(cText).lineGap(2.2);
  const summary = 
    'Ingeniero de Software Full Stack con más de 3 años de experiencia en la industria tecnológica. Me especializo en desarrollo backend con PHP y colas RabbitMQ para procesamiento asíncrono, automatización de tareas con Puppeteer y construcción de interfaces web responsivas. Integro activamente herramientas de Inteligencia Artificial (Antigravity) y patrones de Open Design para acelerar el desarrollo y entregar software modular, seguro y de alta disponibilidad, respaldado por una sólida trayectoria en QA Automation (Cypress, SQL) para garantizar código libre de errores.';
  doc.text(summary, left, doc.y, { width: contentWidth, align: 'justify' });
  doc.y += 10;

  // ==========================================
  // 3. EXPERIENCIA LABORAL
  // ==========================================
  drawSectionTitle('Experiencia Laboral');

  // Puesto 1: Software Engineer Jr
  const yJob1 = doc.y;
  doc.font('Helvetica-Bold').fontSize(9.8).fillColor(cTitle);
  doc.text('Ingeniero de Desarrollo de Software Jr (Full Stack)', left, yJob1, { continued: true });
  doc.font('Helvetica-Bold').fillColor(cCompany).text(' — BITAM de México');

  doc.font('Helvetica-Bold').fontSize(8.8).fillColor(cLight);
  doc.text('Sep 2025 – Actualidad', left, yJob1, { align: 'right', width: contentWidth });
  doc.y += 5;

  drawBullet('Backend & Colas RabbitMQ:', 'Desarrollo de servicios en PHP y arquitectura asíncrona con colas RabbitMQ para procesar tareas pesadas en segundo plano y sincronizar datos entre múltiples repositorios sin bloquear la interfaz.');
  drawBullet('Desarrollo Acelerado con IA (Antigravity & Open Design):', 'Uso de herramientas agénticas de IA como Antigravity y metodologías de Open Design para acelerar el desarrollo de funciones, refactorizar código de forma segura y diseñar componentes modulares.');
  drawBullet('Automatización con Puppeteer:', 'Creación de robots para extracción estructurada de datos (JSON) y descarga automatizada de reportes fiscales y opiniones de cumplimiento del SAT.');
  drawBullet('Full Stack & Formularios Dinámicos:', 'Desarrollo de interfaces interactivas para clientes finales con generación automática de documentos PDF a partir de datos capturados.');

  doc.y += 6;

  // Puesto 2: QA Engineer
  const yJob2 = doc.y;
  doc.font('Helvetica-Bold').fontSize(9.8).fillColor(cTitle);
  doc.text('Ingeniero de Calidad y Pruebas (QA)', left, yJob2, { continued: true });
  doc.font('Helvetica-Bold').fillColor(cCompany).text(' — BITAM de México');

  doc.font('Helvetica-Bold').fontSize(8.8).fillColor(cLight);
  doc.text('Nov 2022 – Sep 2025', left, yJob2, { align: 'right', width: contentWidth });
  doc.y += 5;

  drawBullet('Logro Destacado (-30% de Errores):', 'Diseño e implementación de pruebas automatizadas con Cypress, logrando una reducción del 30% en los errores detectados en producción.');
  drawBullet('Automatización E2E con Cypress:', 'Integración de suites continuas de pruebas automatizadas para validar flujos críticos y estabilidad en plataformas web.');
  drawBullet('Pruebas Backend & Validación SQL:', 'Auditoría de integridad, lógica de negocio y consistencia de datos mediante consultas avanzadas en bases de datos relacionales (SQL / MySQL).');
  drawBullet('Estrategia de Calidad & Jira:', 'Ejecución de pruebas de integración, funcionales y de regresión, gestionando el ciclo de vida de incidencias en Jira junto al equipo de desarrollo.');

  doc.y += 8;

  // ==========================================
  // 4. HABILIDADES TÉCNICAS (Claras y directas)
  // ==========================================
  drawSectionTitle('Habilidades Técnicas');

  function drawSkillRow(cat, items) {
    const rowY = doc.y;
    doc.font('Helvetica-Bold').fontSize(8.7).fillColor(cTitle);
    doc.text(cat, left, rowY, { width: 140 });

    doc.font('Helvetica').fontSize(8.7).fillColor(cText).lineGap(1.5);
    doc.text(items, left + 140, rowY, { width: contentWidth - 140 });
    doc.y += 3;
  }

  drawSkillRow('Backend & Mensajería:', 'PHP, RabbitMQ (Colas Asíncronas / Workers), Node.js, Express, MySQL / SQL, APIs REST.');
  drawSkillRow('IA & Metodologías:', 'Antigravity (IA Agéntica), Open Design (Sistemas Modulares y Seguros), Pair Programming con LLMs.');
  drawSkillRow('Automatización & Scraping:', 'Puppeteer (Robots), Generación Automatizada de PDFs, Extracción JSON.');
  drawSkillRow('Frontend & Full Stack:', 'JavaScript (ES6+), TypeScript, React, HTML5, CSS3, Tailwind CSS, Bootstrap.');
  drawSkillRow('QA & Herramientas:', 'Cypress (E2E Automation), Validación SQL, Postman, Git, GitHub, Jira, Scrum.');

  doc.y += 8;

  // ==========================================
  // 5. EDUCACIÓN E IDIOMAS (Limpio y equilibrado)
  // ==========================================
  const footerY = doc.y;
  const colW = (contentWidth - 20) / 2;

  // Columna Izquierda: Educación
  doc.y = footerY;
  drawSectionTitle('Educación');
  doc.font('Helvetica-Bold').fontSize(8.7).fillColor(cTitle);
  doc.text('Ingeniero Industrial', left, doc.y, { continued: true });
  doc.font('Helvetica').fillColor(cLight).text(' — Universidad del Atlántico (2020 – 2023)');
  doc.y += 2;
  doc.font('Helvetica-Bold').fontSize(8.7).fillColor(cTitle);
  doc.text('Professional in Coding', left, doc.y, { continued: true });
  doc.font('Helvetica').fillColor(cLight).text(' — DEV.F (2021 – 2022)');

  // Columna Derecha: Idiomas
  doc.y = footerY;
  const rightLeft = left + colW + 20;

  const titleY = doc.y;
  doc.font('Helvetica-Bold').fontSize(10.5).fillColor(cTitle);
  doc.text('IDIOMAS', rightLeft, titleY, { characterSpacing: 0.8 });
  const lineY = doc.y + 2;
  doc.strokeColor(cBorder).lineWidth(1).moveTo(rightLeft, lineY).lineTo(right, lineY).stroke();
  doc.y = lineY + 6;

  doc.font('Helvetica-Bold').fontSize(8.7).fillColor(cTitle);
  doc.text('Español: ', rightLeft, doc.y, { continued: true });
  doc.font('Helvetica').fillColor(cText).text('Nativo');
  doc.y += 2;
  doc.font('Helvetica-Bold').fontSize(8.7).fillColor(cTitle);
  doc.text('Inglés: ', rightLeft, doc.y, { continued: true });
  doc.font('Helvetica').fillColor(cText).text('Intermedio (Técnico / Comunicación Profesional)');

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
    console.log('PDF simplificado y espaciado generado exitosamente.');
  })
  .catch((err) => {
    console.error('Error al generar PDF:', err);
    process.exit(1);
  });
