# Instrucciones para generar el portafolio con Astro + Tailwind + Flowbite + Toastify

Este documento adapta el diseño **Terminal / IDE (Tech-Brutalist)** del portafolio
de Eduardo Mar a su **stack real**: **Astro.js**, **Tailwind CSS**, **Flowbite** y
**Toastify-js**. Es autocontenido: comandos de instalación, configuración, tokens,
estructura de componentes, los scripts que en Vanilla JS ya funcionaban (ola del
nombre, nav activa, revelado, formulario) y un prompt listo para copiar.

> Referencia de diseño: `index.html` (prototipo terminado) e
> `instrucciones-terminal-ide.md` (brief del estilo). Este archivo solo cambia
> **cómo se construye** (framework/herramientas), no el look.

---

## 1. Stack objetivo

| Pieza | Paquete | Rol |
|---|---|---|
| Framework | `astro` | Sitio estático, componentes `.astro`, islas |
| CSS | `tailwindcss` (v4) | Utilidades + tokens del tema |
| UI kit | `flowbite` | Nav móvil (collapse), tooltips, acordeón, componentes |
| Avisos | `toastify-js` | Toasts de éxito/error del formulario |
| Fuente | `@fontsource/jetbrains-mono` | Tipografía monoespaciada (sin CDN) |

Versiones de referencia (2026): `astro@5`, `tailwindcss@4`, `flowbite@3`,
`toastify-js@1`. Si tu `tailwind.config` es v3, al final del apartado 4 está la
variante.

---

## 2. Creación del proyecto

```bash
# 1) Proyecto Astro (elección: TypeScript estricto, sin git si ya lo tienes)
npm create astro@latest portafolio-eduardo
cd portafolio-eduardo

# 2) Tailwind + integración de Astro
npx astro add tailwind

# 3) UI kit y toasts
npm install flowbite toastify-js

# 4) Tipografía local
npm install @fontsource/jetbrains-mono
```

`npx astro add tailwind` deja `astro.config.mjs` con el plugin de Vite; para que
Flowbite escanee sus clases hay que añadir un `@source` (apartado 4).

---

## 3. Estructura de carpetas

```
portafolio-eduardo/
├─ astro.config.mjs
├─ src/
│  ├─ styles/
│  │  └─ global.css          # Tailwind + tokens + keyframes + clases terminal
│  ├─ layouts/
│  │  └─ Base.astro          # <html>, <head>, fuentes, flowbite, statusbar opcional
│  ├─ lib/
│  │  └─ content.ts          # contenido editable (experiencia, proyectos, stack)
│  ├─ components/
│  │  ├─ Nav.astro           # barra de pestañas + menú móvil (Flowbite collapse)
│  │  ├─ Progress.astro      # barra de progreso de scroll
│  │  ├─ Window.astro        # marco de ventana reutilizable (slot)
│  │  ├─ CodeBlock.astro     # bloque de código con números de línea (slot)
│  │  ├─ Hero.astro          # sesión de terminal + nombre con ola
│  │  ├─ Experience.astro    # experiencia.md
│  │  ├─ Skills.astro        # package.json
│  │  ├─ Projects.astro      # tarjetas-archivo
│  │  ├─ About.astro         # sobre-mi.md
│  │  ├─ Contact.astro       # enviar-mensaje.sh + Toastify
│  │  └─ StatusBar.astro     # barra inferior tipo VS Code
│  └─ pages/
│     └─ index.astro         # compone todas las secciones
└─ public/
   └─ retrato.jpg            # foto real (pendiente)
```

Regla: **una sección = un componente**; los datos viven en `src/lib/content.ts`
para que editar el portafolio no obligue a tocar el marcado.

---

## 4. Configuración de Tailwind y tokens del tema

### `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://tudominio.com',
  vite: { plugins: [tailwindcss()] },
});
```

### `src/styles/global.css` (Tailwind v4)

```css
@import "tailwindcss";
@import "@fontsource/jetbrains-mono/400.css";
@import "@fontsource/jetbrains-mono/500.css";
@import "@fontsource/jetbrains-mono/700.css";

@plugin "flowbite/plugin";
@source "../node_modules/flowbite";

/* --- Tokens del tema (paleta IDE) --- */
@theme {
  --color-bg:        #0b0f14;
  --color-panel:     #11161d;
  --color-panel-2:   #0e131a;
  --color-panel-3:   #161c24;
  --color-line:      #232a34;   /* borde 1px */
  --color-line-2:    #39414c;   /* borde de énfasis */
  --color-ink:       #c9d1d9;   /* texto principal */
  --color-muted:     #7d8590;
  --color-comment:   #6e7681;
  --color-blue:      #58a6ff;
  --color-cyan:      #39d0d8;   /* acento de marca */
  --color-green:     #7ee787;
  --color-amber:     #ffa657;
  --color-magenta:   #ff79c6;
  --color-red:       #ff7b72;
  --color-purple:    #d2a8ff;

  --font-mono: "JetBrains Mono", "Fira Code", "Roboto Mono", ui-monospace,
               SFMono-Regular, Menlo, Consolas, monospace;

  --radius-none: 0;             /* brutalismo: sin esquinas redondeadas */
  --animate-wave:  wave 2.8s cubic-bezier(.2,.7,.3,1) infinite;
  --animate-blink: blink 1.1s steps(1, end) infinite;
  --animate-pulse-soft: pulse 2.2s cubic-bezier(.2,.7,.3,1) infinite;
}
```

Con esto ya tienes utilidades como `bg-bg`, `bg-panel`, `border-line`,
`text-ink`, `text-cyan`, `font-mono`, `animate-blink`, etc.

### Variante Tailwind v3

Si tu portafolio usa `tailwind.config.mjs` + `@astrojs/tailwind`:

```js
// tailwind.config.mjs
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md}',
            './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      colors: {
        bg: '#0b0f14', panel: '#11161d', 'panel-2': '#0e131a',
        'panel-3': '#161c24', line: '#232a34', 'line-2': '#39414c',
        ink: '#c9d1d9', muted: '#7d8590', comment: '#6e7681',
        blue: '#58a6ff', cyan: '#39d0d8', green: '#7ee787',
        amber: '#ffa657', magenta: '#ff79c6', red: '#ff7b72', purple: '#d2a8ff',
      },
      fontFamily: { mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace'] },
      borderRadius: { none: '0' },
    },
  },
  plugins: [require('flowbite/plugin')],
};
```

---

## 5. Clases del "chrome" de terminal

El diseño tiene piezas muy específicas (ventana, bloque de código, colores de
sintaxis, ola, cursor). Se mantienen como **clases de componente** en
`global.css` bajo `@layer components`, y el resto se compone con utilidades
Tailwind. Así el look queda fiel y sigue siendo editable.

```css
@layer components {
  /* Marco de ventana */
  .win      { @apply border border-line bg-panel; box-shadow: 0 24px 60px -40px rgba(0,0,0,.9); }
  .win-bar  { @apply flex items-center gap-2.5 border-b border-line bg-panel-2 px-3 py-2 text-xs text-muted; }
  .win-dot  { @apply block h-2.5 w-2.5 rounded-full; }   /* r/g/a vía utilidades */
  .win-body { @apply p-[18px]; }

  /* Bloque de código con números de línea */
  .code      { @apply text-[13px] leading-[1.85]; }
  .code-row  { @apply grid grid-cols-[42px_minmax(0,1fr)]; }
  .code-ln   { @apply select-none border-r border-line pr-3 text-right text-comment; }
  .code-txt  { @apply pl-[15px] whitespace-pre-wrap break-words; }

  /* Colores de sintaxis */
  .s-prompt { @apply text-green; }   .s-cmd { @apply text-blue; }
  .s-str    { @apply text-green; }   .s-const { @apply text-amber; }
  .s-kw     { @apply text-magenta; } .s-fn { @apply text-purple; }
  .s-var    { @apply text-cyan; }    .s-comment { @apply text-comment; }
  .s-key    { @apply text-blue; }    .s-type { @apply text-amber; }
  .s-bool   { @apply text-magenta; }
}

/* Firma: ola del nombre "Eduardo Mar" */
.wave-name { @apply inline-flex font-bold; font-size: clamp(1.7rem, 4.4vw, 2.7rem); }
.wave-name .ch {
  display: inline-block; white-space: pre;
  background: linear-gradient(180deg, #e6edf3 0%, #39d0d8 55%, #7ee787 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  animation: wave 2.8s cubic-bezier(.2,.7,.3,1) infinite;
  animation-delay: calc(var(--i) * .07s);
}
@keyframes wave  { 0%,100%{ transform:translateY(0); } 28%{ transform:translateY(-11px); } 56%{ transform:translateY(3px); } }
@keyframes blink { 0%,49%{ opacity:1; } 50%,100%{ opacity:0; } }
@keyframes pulse { 0%,100%{ opacity:1; } 50%{ opacity:.35; } }

@media (prefers-reduced-motion: reduce) {
  .wave-name .ch, .animate-blink, .animate-pulse-soft { animation: none !important; }
}
```

También incluye la capa de primitivas de layout (`@layer od-layout` con
`.od-stack`, `.od-row`, `.od-media`, `.od-icon`, `.od-truncate`, …) como
**primera regla** del archivo, y compón las filas/medios con ellas.

---

## 6. Layout base — `src/layouts/Base.astro`

```astro
---
import '../styles/global.css';
import 'flowbite';
import Nav from '../components/Nav.astro';
import Progress from '../components/Progress.astro';
import StatusBar from '../components/StatusBar.astro';
const { title = 'Eduardo Mar · Desarrollador Web' } = Astro.props;
---
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Portafolio de Eduardo Mar, desarrollador web y QA Tester." />
    <title>{title}</title>
  </head>
  <body class="font-mono text-[15px] leading-[1.65] text-ink bg-bg
               [background-image:linear-gradient(rgba(255,255,255,.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.018)_1px,transparent_1px)]
               [background-size:32px_32px] overflow-x-hidden">
    <a href="#home" class="skip sr-only focus:not-sr-only ...">Saltar al contenido</a>
    <Progress />
    <Nav />
    <main><slot /></main>
    <StatusBar />
  </body>
</html>
```

> `import 'flowbite'` activa los componentes declarativos de Flowbite
> (collapse, dropdown, tooltip, modal) mediante atributos `data-*`.

---

## 7. Componentes: mapa sección → `.astro`

| Sección (en `index.html`) | Componente | Notas de port |
|---|---|---|
| Nav de pestañas | `Nav.astro` | Usa **Flowbite Collapse** para el menú móvil |
| Barra de progreso | `Progress.astro` | `<script>` con el mismo código de scroll |
| Hero (`about.ts`) | `Hero.astro` | Incluye el `<script>` de la ola |
| Experiencia (`experiencia.md`) | `Experience.astro` | Envuelve en `<Window>` |
| Tech Skills (`package.json`) | `Skills.astro` | `<CodeBlock>` |
| Proyectos | `Projects.astro` | Bucle `content.proyectos.map(...)` |
| Sobre mí (`sobre-mi.md`) | `About.astro` | `<CodeBlock>` |
| Contacto (`enviar-mensaje.sh`) | `Contact.astro` | Validación + **Toastify** |
| Barra de estado | `StatusBar.astro` | Footer fijo |

**`index.astro`:**

```astro
---
import Base from '../layouts/Base.astro';
import Hero from '../components/Hero.astro';
import Experience from '../components/Experience.astro';
import Skills from '../components/Skills.astro';
import Projects from '../components/Projects.astro';
import About from '../components/About.astro';
import Contact from '../components/Contact.astro';
---
<Base>
  <Hero />
  <Experience />
  <Skills />
  <Projects />
  <About />
  <Contact />
</Base>
```

**`Window.astro` (marco reutilizable):**

```astro
---
const { file = 'window', badge = '' } = Astro.props;
---
<section class="win">
  <div class="win-bar">
    <span class="win-dots">
      <i class="win-dot bg-red"></i><i class="win-dot bg-amber"></i><i class="win-dot bg-green"></i>
    </span>
    <span class="win-title"><b>{file}</b></span>
    {badge && <span class="ml-auto text-comment">{badge}</span>}
  </div>
  <div class="win-body"><slot /></div>
</section>
```

**`CodeBlock.astro` (líneas numeradas desde un array):**

```astro
---
const { lines = [] } = Astro.props;      // array de strings con HTML de sintaxis
---
<pre class="code">{lines.map((html, i) => (
  `<div class="code-row"><span class="code-ln">${i + 1}</span><span class="code-txt">${html}</span></div>`
)).join('')}</pre>
```

**`Hero.astro` — ola del nombre (script de Astro):**

```astro
<h1 class="wave-name" id="waveName">Eduardo Mar</h1><span class="cursor" aria-hidden="true"></span>

<script>
  const wave = document.getElementById('waveName');
  if (wave) {
    const raw = wave.textContent ?? '';
    wave.textContent = '';
    [...raw].forEach((ch, i) => {
      const s = document.createElement('span');
      s.className = 'ch';
      s.style.setProperty('--i', String(i));
      s.textContent = ch;
      wave.appendChild(s);
    });
  }
</script>
```

**`Nav.astro` — pestañas + menú móvil con Flowbite:**

```astro
<header class="fixed inset-x-0 top-0 z-50 h-[58px] bg-panel-2 border-b border-line">
  <div class="mx-auto flex h-full max-w-[1180px] items-center gap-4 px-5">
    <a href="#home" class="brand text-[13.5px] font-bold">eduardo@dev<span class="text-muted">:~/portafolio</span><span class="text-green animate-blink">$</span></a>

    <button data-collapse-toggle="nav-links" aria-controls="nav-links"
            class="ml-auto md:hidden border border-line bg-panel p-2" aria-label="Abrir menú">≡</button>

    <nav id="nav-links" class="hidden w-full md:flex md:ml-auto md:h-full md:w-auto"
         aria-label="Navegación principal">
      <a class="tab" href="#home">1 Home</a>
      <a class="tab" href="#experiencia">2 Experiencia</a>
      <a class="tab" href="#proyectos">3 Proyectos</a>
      <a class="tab" href="#sobre-mi">4 Sobre mí</a>
      <a class="tab" href="#contacto">5 Contáctame</a>
    </nav>
  </div>
</header>

<script>
  // Scroll-spy: marca aria-current en la pestaña visible (mismo código que en index.html)
  const tabs = [...document.querySelectorAll<HTMLAnchorElement>('.tab[href^="#"]')];
  const sections = tabs.map(a => document.querySelector(a.getAttribute('href')!)).filter(Boolean) as Element[];
  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      for (const en of entries) if (en.isIntersecting) {
        tabs.forEach(a => a.setAttribute('aria-current', a.getAttribute('href') === '#' + en.target.id ? 'true' : 'false'));
      }
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(s => spy.observe(s));
  }
</script>
```

> Flowbite gestiona el mostrar/ocultar del menú con `data-collapse-toggle`.
> El *scroll-spy* se mantiene en un `<script>` propio de Astro.

**`Contact.astro` — validación + Toastify:**

```astro
---
---
<form id="contactForm" novalidate class="win reveal">
  <!-- campos nombre, apellido, correo, mensaje; cada uno con <label> visible
       y <p id="err-…" class="text-red text-xs" aria-live="polite"></p> -->
  <button id="submitBtn" type="submit" class="btn btn--primary">$ enviar</button>
</form>

<script>
  import Toastify from 'toastify-js';
  import 'toastify-js/src/toastify.css';

  const form = document.getElementById('contactForm') as HTMLFormElement | null;
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const fields = [
    { id: 'nombre',   msg: 'Escribe tu nombre.' },
    { id: 'apellido', msg: 'Escribe tu apellido.' },
    { id: 'correo',   msg: 'Ingresa un correo válido.', validate: (v: string) => emailRe.test(v) },
    { id: 'mensaje',  msg: 'Cuéntame qué necesitas (mínimo 10 caracteres).', validate: (v: string) => v.length >= 10 },
  ];

  const toast = (text: string, ok: boolean) => Toastify({
    text, duration: 3200, gravity: 'bottom', position: 'right',
    close: true, stopOnFocus: true,
    style: {
      background: '#11161d', color: ok ? '#7ee787' : '#ff7b72',
      border: `1px solid ${ok ? '#7ee787' : '#ff7b72'}`,
      borderRadius: '0', fontFamily: 'JetBrains Mono, monospace',
      fontSize: '13px', boxShadow: '0 24px 60px -40px rgba(0,0,0,.9)',
    },
  }).showToast();

  // Blur + submit validation igual que en index.html;
  // en éxito: toast(`// ok: mensaje enviado`, true) y form.reset();
  // en error: toast(`// error: revisa los campos marcados`, false) + foco al primer campo.
</script>
```

---

## 8. Movimiento, accesibilidad y responsive

- **Flowbite** para componentes con comportamiento (collapse, dropdown, tooltip,
  modal); **Toastify** solo para avisos del formulario.
- Motion: micro-interacciones 180ms (`cubic-bezier(.2,.7,.3,1)`), revelado 320ms,
  ola 2.8s, cursor 1.1s. Solo `transform`/`opacity`. Todo respeta
  `prefers-reduced-motion`.
- Reveal al scroll: `IntersectionObserver` que agrega `.is-in` (mismo script).
- Accesibilidad: skip link, `:focus-visible` con `outline: 2px solid var(--cyan)`,
  `aria-current` en pestaña activa, `aria-invalid` + error junto al campo,
  `aria-live` en el aviso. Contraste AA (`#c9d1d9` sobre `#0b0f14`).
- Breakpoints Tailwind `sm/md/lg` cubriendo 375→1440; sin scroll horizontal; la
  nav fija reserva su alto con `scroll-padding-top`.

---

## 9. Contenido

Todo el texto editable se define en `src/lib/content.ts` y se recorre con `.map()`:

- **Hero**: Desarrollador Web, perfil accesible/rápido, experiencia como QA.
- **Experiencia**: QA Tester · BITAMAP, Medellín, jul 2023 – actualidad
  (diseño de pruebas, Cypress, SQL, documentación).
- **Stack**: react, node.js, javascript, mongodb, cypress, sql (HTML5/CSS3).
- **Proyectos**: Series TMDB (React, Redux Toolkit, Bootstrap, REST API),
  Pokedex (HTML, CSS, JS, Bootstrap, Node.js),
  Gestión de Tareas · Bitam (React, Redux Toolkit, Bootstrap, Node.js, MySQL).
- **Contacto**: `eduardomr857@gmail.com`.

---

## 10. Pendientes / assets

- Coloca la foto real como `public/retrato.jpg` (el componente muestra un
  marcador ASCII `[falta archivo]` mientras no exista).
- Reemplaza los enlaces genéricos de `Código`/`Preview` y redes por URLs reales.
- Confirma la ubicación ("Medellín, Colombia").
- Añade `@astrojs/sitemap` y `site` en `astro.config.mjs` si publicas con SEO.

---

## 11. Prompt listo para copiar

> Genera un portafolio en **Astro.js** con **Tailwind CSS**, **Flowbite** y
> **Toastify-js**, con el estilo **Terminal / IDE (Tech-Brutalist)**: fondo
> `#0b0f14`, todo en **JetBrains Mono** (vía `@fontsource`), bordes de 1px sin
> radios, y colores de sintaxis (azul `#58a6ff`, cian `#39d0d8` —acento de
> marca—, verde `#7ee787`, ámbar `#ffa657`, magenta `#ff79c6`, rojo `#ff7b72`)
> sobre texto `#c9d1d9`. Usa Tailwind v4 con los tokens en `@theme`, Flowbite para
> el menú móvil (collapse) y componentes, y Toastify para los avisos del
> formulario. Estructura en `src/components` (Nav, Hero, Experience, Skills,
> Projects, About, Contact, StatusBar, Window, CodeBlock) y `src/pages/index.astro`;
> datos en `src/lib/content.ts`. Presenta cada sección como una ventana de editor
> con semáforo y pestañas (`about.ts`, `experiencia.md`, `package.json`,
> `sobre-mi.md`, `enviar-mensaje.sh`) e incluye el **nombre "Eduardo Mar" con
> animación de ola por letra** (script en el componente Hero) y cursor
> parpadeante. Secciones: Home, Experiencia (QA Tester · BITAMAP), Proyectos
> (Series TMDB, Pokedex, Gestión de Tareas), Sobre mí y Contáctame (formulario
> validado en blur + submit, feedback con Toastify). Responsive 375→1440, foco de
> teclado, contraste AA y `prefers-reduced-motion`. Contenido en español.
