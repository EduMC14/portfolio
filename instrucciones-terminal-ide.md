# Instrucciones para generar el portafolio · Estilo Terminal / IDE (Tech-Brutalist)

Este documento es un **brief reutilizable**: contiene todo lo necesario para
volver a generar (o pedir a una IA que genere) el portafolio de Eduardo Mar con
el estilo Terminal / IDE. Es autocontenido: tokens, estructura, componentes,
reglas y un prompt listo para copiar.

---

## 1. Objetivo

Crear un **portafolio personal de desarrollador web** de una sola página, que se
vea como una **terminal / editor de código en modo oscuro** (Tech-Brutalist).
Debe abrir, funcionar y ser editable desde un único `index.html` (CSS y JS
incluidos). El objetivo de negocio es conseguir trabajo: jerarquía clara,
credibilidad técnica y carga rápida.

## 2. Dirección visual

**"Editor abierto en modo oscuro"**: fondo muy oscuro, tipografía monoespaciada
en todo, bordes rectos de 1px (cero esquinas redondeadas), resaltado de sintaxis
como sistema de color y una estética de ventana de IDE (barra de pestañas,
semáforo, cursor parpadeante, barra de estado).

## 3. Paleta (tema oscuro de IDE)

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#0b0f14` | Fondo de página |
| `--panel` | `#11161d` | Superficie de ventana |
| `--panel-2` | `#0e131a` | Barras (nav, título de ventana) |
| `--panel-3` | `#161c24` | Superficies elevadas |
| `--border` | `#232a34` | Bordes de 1px |
| `--border-strong` | `#39414c` | Bordes de énfasis |
| `--text` | `#c9d1d9` | Texto principal |
| `--muted` | `#7d8590` | Texto secundario |
| `--comment` | `#6e7681` | Comentarios / etiquetas |
| `--blue` | `#58a6ff` | Funciones / claves / comandos |
| `--cyan` | `#39d0d8` | Acento principal (marca, foco, enlaces) |
| `--green` | `#7ee787` | Strings / éxito / prompt |
| `--amber` | `#ffa657` | Constantes / números / tipos |
| `--magenta` | `#ff79c6` | Keywords / tags |
| `--red` | `#ff7b72` | Errores |

**Regla de contención:** máximo 2–3 acentos por vista; el cian es el acento de
marca, el resto son colores de sintaxis con significado. Fondo decorativo:
retícula sutil con `linear-gradient` de `rgba(255,255,255,.018)` cada 32px.

## 4. Tipografía

- Una sola familia: **JetBrains Mono** (respaldo: Fira Code / Roboto Mono /
  `ui-monospace`). Pesos 400, 500, 700.
- Cuerpo ≥ 15px, `line-height` 1.65 (legibilidad en mono).
- Escala: título de sección `clamp(1.4rem, 3.2vw, 2rem)`; nombre hero
  `clamp(1.7rem, 4.4vw, 2.7rem)`; código 13px (12px en móvil).

## 5. Estructura (una página)

1. **Nav fija** como barra de pestañas: marca `eduardo@dev:~/portafolio$` +
   pestañas `1 Home · 2 Experiencia · 3 Proyectos · 4 Sobre mí · 5 Contáctame`.
   Pestaña activa con fondo de panel y subrayado cian (`inset 0 -2px 0`).
2. **Hero** = sesión de terminal (`about.ts`): `$ whoami`, `$ cat perfil.txt`,
   `$ ls stack/`, con el **nombre animado "Eduardo Mar"** y cursor parpadeante.
   Al lado, ventana `retrato.jpg` y ventana `neofetch` (rol, ubicación, estado).
   Debajo, franja de estadísticas (`+2 años`, `3 proyectos`, `QA`, `100%`).
3. **Experiencia** (`experiencia.md`): rol como clase de código
   (`class QATester extends Profesional {`), checklist `[x]` y tags.
4. **Tech Skills** (`package.json`): dependencias con sintaxis coloreada
   (clave azul, versión verde).
5. **Proyectos**: 3 tarjetas-archivo (`series-tmdb.tsx`, `pokedex.js`,
   `gestion-tareas.tsx`) con maqueta tipo navegador, tags y botones
   `[ Codigo ]` / `[ Preview ]`.
6. **Sobre mí** (`sobre-mi.md`) con números de línea + `datos.json` al lado.
7. **Contacto** (`enviar-mensaje.sh`): formulario validado estilo prompt.
8. **Barra de estado** inferior (estilo VS Code): rama `main`, `UTF-8`, `LF`,
   fuente, copyright y redes.

## 6. Componentes clave

- **Ventana** `.win`: borde 1px, barra superior con 3 puntos de semáforo
  (rojo/ámbar/verde) y título de archivo.
- **Bloque de código** `.code`: rejilla `42px | 1fr` con números de línea en
  columna derecha-borde y texto con `white-space: pre-wrap`.
- **Colores de sintaxis**: clases `.s-prompt .s-cmd .s-str .s-const .s-kw .s-fn
  .s-var .s-comment .s-key .s-type .s-bool`.
- **Botón** `.btn`: rectángulo 1px, sin radio; `.btn--primary` relleno cian
  (texto `#07131a`); prefijo `$` en `.btn__sym`.
- **Tag** `.tag`: chip 1px con `#` antepuesto.
- **Foco visible**: `outline: 2px solid var(--cyan)`.

## 7. Elemento firma (obligatorio)

El **efecto de ola** en el nombre "Eduardo Mar": el JS divide el texto en
`<span class="ch">` con índice `--i`; animación `wave` (translateY) con retardo
escalonado `calc(var(--i) * .07s)`, degradado `#e6edf3 → #39d0d8 → #7ee787`
recortado al texto (`background-clip: text`). Se anula con
`prefers-reduced-motion`.

## 8. Movimiento

- Micro-interacciones y hover: 180ms, `cubic-bezier(.2,.7,.3,1)`.
- Revelado al scroll: 320ms.
- Ola del nombre: 2.8s en bucle.
- Cursor parpadeante: 1.1s `steps(1)`.
- Solo se animan `transform` y `opacity`. Todo respeta `prefers-reduced-motion`.

## 9. Accesibilidad y responsive

- Contraste AA (texto `#c9d1d9` sobre `#0b0f14`).
- Skip link, foco de teclado visible, `aria-current` en la pestaña activa,
  `aria-invalid` + mensajes de error junto al campo, `role="status"` en el
  resultado del formulario.
- Breakpoints: 1024 / 820 / 620 px (cubre 375 px). Sin scroll horizontal.
  Menú hamburguesa en móvil; la nav fija reserva su alto con `scroll-padding`.
- Zoom nunca deshabilitado.

## 10. Contenido (editable)

- **Hero**: Desarrollador Web, perfil accesible/rápido, experiencia como QA.
- **Experiencia**: QA Tester · BITAMAP, Medellín, jul 2023 – actualidad
  (diseño de pruebas, Cypress, SQL, documentación).
- **Stack**: react, node.js, javascript, mongodb, cypress, sql (HTML5/CSS3).
- **Proyectos**: Series TMDB (React, Redux Toolkit, Bootstrap, REST API),
  Pokedex (HTML, CSS, JS, Bootstrap, Node.js),
  Gestión de Tareas · Bitam (React, Redux Toolkit, Bootstrap, Node.js, MySQL).
- **Contacto**: `eduardomr857@gmail.com`.

## 11. Pendientes / assets

- Foto real como `retrato.jpg` (si falta, mostrar marcador ASCII `[falta archivo]`).
- Reemplazar enlaces genéricos de `Codigo`/`Preview` y redes por URLs reales.
- Confirmar/ajustar la ubicación.

---

## 12. Prompt listo para copiar

> Genera un portafolio de desarrollador web en un único `index.html`, con estilo
> **Terminal / IDE (Tech-Brutalist)**: fondo muy oscuro (`#0b0f14`), todo en
> **JetBrains Mono**, bordes rectos de 1px (sin radios), y colores de resaltado
> de sintaxis (azul `#58a6ff`, cian `#39d0d8`, verde `#7ee787`, ámbar `#ffa657`,
> magenta `#ff79c6`, rojo `#ff7b72`) sobre texto `#c9d1d9`. Presenta cada sección
> como una ventana de editor con barra de semáforo y pestañas (`about.ts`,
> `experiencia.md`, `package.json`, `sobre-mi.md`, `enviar-mensaje.sh`), una nav
> fija de pestañas, una barra de estado tipo VS Code y un hero tipo sesión de
> terminal (`$ whoami`, `$ cat perfil.txt`). Incluye el **nombre "Eduardo Mar"
> con animación de ola por letra** y un cursor parpadeante. Secciones: Home,
> Experiencia (QA Tester · BITAMAP), Proyectos (Series TMDB, Pokedex, Gestión de
> Tareas), Sobre mí y Contáctame (formulario validado). Responsive 375→1440,
> foco de teclado, contraste AA y `prefers-reduced-motion`. Contenido en español.
