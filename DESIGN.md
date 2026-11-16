---
name: Motorsport Manager — «Carbono» (toda la app)
description: La mesa de ingeniería de una escudería de noche: rejilla de construcción siempre visible en cada pantalla, datos en mono tabular y un único volt reservado a la acción.
colors:
  carbon-ground: "#0E0F11"
  carbon-panel: "#141519"
  hairline: "#262932"
  hairline-soft: "#1C1E23"
  ink: "#F2F3F5"
  ink-dim: "#9BA0AA"
  grid-line: "rgba(235, 240, 255, 0.085)"
  grid-line-minor: "rgba(235, 240, 255, 0.035)"
  volt: "#D6FF3F"
  volt-ink: "#101114"
  paper-ground: "#EDEFE9"
  paper-panel: "#F7F8F4"
  paper-line: "#B9BFAE"
  paper-line-soft: "#DDE0D5"
  paper-ink: "#16181C"
  paper-ink-dim: "#5B6068"
  paper-volt: "#CDF630"
  volt-deep-line: "#7D9000"
  signal-green: "#2ea043 / #1a7f37 (claro)"
  signal-amber: "#d29922 / #9a6700 (claro)"
  signal-red: "#da3633 / #cf222e (claro)"
  track-asphalt: "#33353a / #d7d9dc (claro)"
  tyre-soft: "#ff2e1f"
  tyre-medium: "#ffd12e"
  tyre-hard: "#f2f3f4"
  tyre-inter: "#37c856"
  tyre-wet: "#2aa8e8"
typography:
  display:
    fontFamily: "Inter, system-ui, 'Segoe UI', sans-serif"
    fontSize: "clamp(44px, 7vw, 86px)"
    fontWeight: 900
    lineHeight: 0.98
    letterSpacing: "-0.025em"
  wordmark:
    fontFamily: "Inter, system-ui, 'Segoe UI', sans-serif"
    fontSize: "15px"
    fontWeight: 900
    letterSpacing: "-0.01em"
    transform: "uppercase"
  title:
    fontFamily: "Inter, system-ui, 'Segoe UI', sans-serif"
    fontSize: "13px"
    fontWeight: 800
    letterSpacing: "0.16em"
  label:
    fontFamily: "Inter, system-ui, 'Segoe UI', sans-serif"
    fontSize: "11-12px"
    fontWeight: 600
    letterSpacing: "0.1-0.14em"
  body:
    fontFamily: "Inter, system-ui, 'Segoe UI', sans-serif"
    fontSize: "13.5px"
    fontWeight: 600
    letterSpacing: "0.02em"
  data:
    fontFamily: "ui-monospace, 'Cascadia Mono', 'JetBrains Mono', Consolas, 'Roboto Mono', monospace"
    fontSize: "12-15px"
    fontVariation: "tabular-nums"
  data-broadcast:
    fontFamily: "same mono stack"
    fontSize: "22-24px"
    fontWeight: 700
    note: "vuelta del header, P# del podio y de mis resultados"
  data-micro:
    fontFamily: "same mono stack"
    fontSize: "8.5-11px"
    note: "SOLO dentro del viewBox del gráfico de ritmo (320→~420px: se renderiza ≥11px efectivos)"
rounded:
  none: "0px"
  exceptions: "punto-librea/tcolor (12px círculo), anillos de goma, gantry físico de luces (4px)"
spacing:
  grid-minor: "16px"
  grid-major: "80px"
  gap-xs: "8px"
  gap-sm: "10px"
  gap-md: "18px"
  gap-lg: "20px"
  touch-min: "44px"
  touch-exception: "tira compacta de velocidades 1x-20x (secundaria, documentada)"
shadows:
  floating: "4px 6px 18px rgba(0,0,0,0.35)"
  scope: "solo superficies que FLOTAN sobre la rejilla: menú Más, avisos (toasts), guía de primera vez, overlays de resultados/gomas/presentación, bandera"
components:
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "{spacing.touch-min}"
    typography: "{typography.label}"
  button-ghost-hover:
    textColor: "{colors.ink}"
  button-primary:
    backgroundColor: "{colors.volt}"
    textColor: "{colors.volt-ink}"
    rounded: "{rounded.none}"
    height: "{spacing.touch-min}"
    typography: "{typography.title}"
  nav-tab:
    backgroundColor: "transparent"
    textColor: "{colors.ink-dim}"
    rounded: "{rounded.none}"
    height: "{spacing.touch-min}"
    padding: "13px 18px"
    typography: "{typography.label}"
  nav-tab-active:
    textColor: "{colors.ink}"
  chip-budget:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "5px 10px"
    typography: "{typography.data}"
  chip-delta:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "1px 6px"
    typography: "{typography.data}"
  chip-livery:
    size: "11px"
  meter-ticks:
    height: "16px"
  mark-max:
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "6px 12px"
    typography: "{typography.data}"
  panel-module:
    backgroundColor: "{colors.carbon-panel}"
    rounded: "{rounded.none}"
  input-underline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "40px"
    typography: "{typography.data}"
  auth-card:
    note: "módulo enmarcado centrado sobre la rejilla; wordmark Inter 900"
  slot-module:
    note: "módulo enmarcado por slot; chip A/B/C cuadrado mono; la activa por MATERIA (relleno --hub-line-soft + borde fuerte); dificultad = selector con activo volt"
  season-rows:
    note: "filas de ronda sobre hairline suave; P#/premio en mono tinta; UN botón primario (Empezar temporada nueva)"
  palmares-totals:
    note: "tres baldosas hairline con cifra grande mono; temporada campeona GRABADA (borde 1.5px tinta + relleno tonal, lenguaje MÁX)"
  hud-tower:
    note: "panel sólido con hairline izquierda; títulos de sección 11px 800; posiciones mono; fila del jugador por MATERIA (relleno line-soft); VL = chip grabado"
  results-panel:
    note: "módulo enmarcado + sombra de flotante; podio P1/míos por materia; premios mono tinta; acciones sticky ≥44px"
  tyre-picker:
    note: "botones cuadrados 44px; el compuesto elegido lleva ANILLO volt (estado activo)"
  notice-toast:
    note: "panel enmarcado + sombra flotante; borde izquierdo semántico SOLO en alert/success"
---

# Design System: Motorsport Manager — «Carbono» (toda la app)

## Overview

**Creative North Star: "La mesa de ingeniería de una escudería de noche"**

El juego entero es el plano de trabajo de una fábrica de precisión: carbono mate sobre el que la rejilla de construcción (hairline de 16/80 px) nunca deja de verse, los datos siempre en tinta y monoespaciada tabular como en un plano técnico, y UN solo color de acción — el volt — que significa exactamente «aquí puedes actuar». La dirección rechaza expresamente el dashboard genérico oscuro+neón y las tarjetas iguales: la identidad es la rejilla y el bloque de título de plano técnico, no el adorno. La voz tipográfica viene de los pesos extremos de Inter (Black display, 600 labels) enfrentada a la cifra mono, no de cambiar de fuente.

El volt es fijo: nunca se liga a la librea del jugador (la librea es un dato con su propio canal) y nunca pinta datos, decoración ni estados informativos. Comprar deja huella: cada gasto muestra un chip delta junto al monedero durante 1600 ms. El movimiento existe solo a pasos (steps 90–140 ms) y todo él queda quieto con `prefers-reduced-motion`.

**Frontera de este sistema (spec 033):** el mundo gobierna TODA la app — acceso, partidas, Mi Equipo, carrera (su cromo; los coches, gomas, luces y banderas son contenido del deporte), resumen de temporada y palmarés, más las capas flotantes (resultados, elección de gomas, presentación del GP, avisos, guía). La capa de tokens `--hub-*` vive en `src/ui.css` (los nombres viejos `--bg/--panel/--border…` son alias del mundo) y cada pantalla pinta la rejilla en su shell. El hub la estrenó (032); nada del incumbente (radio, corte diagonal, acento dinámico de librea, Barlow Condensed) queda en producción.

**Procedencia de las capturas embarcadas:** `specs/032-direccion-carbono/evidence/*.png` (7 capturas del hub) y `specs/033-carbono-app-entera/evidence/*.png` (13 capturas: acceso/partidas/temporada/palmarés/carrera/gráfico en ambos temas, móvil 390, librea extrema y hub-regresión), con el método de producción documentado en la tabla «Evidencias a entregar» de cada quickstart.

**Key Characteristics:**
- Carbono mate (#0E0F11) con rejilla hairline 16/80 px visible en todo el shell; variante «papel» (#EDEFE9) en tema claro.
- Datos SIEMPRE en blanco/tinta y monoespaciada tabular; la librea es un dato (chip), nunca vestuario.
- Volt #D6FF3F reservado exclusivamente a acción/activo/foco; la única lámina volt del escritorio es la salida a carrera.
- Módulos enmarcados a 1 px sobre la rejilla, esquinas rectas (radius 0), sin sombras salvo el menú desplegable.
- Interacción firma: comprar = chip delta en el monedero (1600 ms) + un tick más; móvil ≤860 px con barra inferior solo-carrera y safe-area.

## Colors

Dos variantes del mismo plano: carbono (oscuro, normativa) y papel (claro). El volt de fondo sigue siendo luz en ambas; en claro, las líneas y el foco usan el volt oscurecido para no perder contraste.

### Primary
- **Volt** (#D6FF3F): el único acento. Fondo de los controles de acción (botón primario, pestaña activa en móvil, selección de texto) y borde/foco. Fijo, nunca derivado de la librea. En claro, el fondo pasa a #CDF630 (`paper-volt`) y las líneas/foco a **volt oscurecido** (#7D9000, `volt-deep-line`).
- **Tinta sobre volt** (#101114, `volt-ink`): texto sobre cualquier lámina volt.

### Neutral
- **Carbono mate** (#0E0F11, `carbon-ground`): suelo de todo el shell; la rejilla se traza sobre él.
- **Panel** (#141519, `carbon-panel`): módulos enmarcados (ficha, listas, menú, guía); apenas un paso más de luz que el suelo.
- **Hairline** (#262932) y **hairline suave** (#1C1E23): bordes de módulos, filas y regla; el suave separa filas dentro de un marco.
- **Tinta** (#F2F3F5, `ink`): todo texto y todo dato; también el color de los ticks llenos del medidor.
- **Tinta atenuada** (#9BA0AA, `ink-dim`): labels, claves de la ficha, pestañas inactivas, efectos y notas.
- **Líneas de rejilla** (rgba(235,240,255,0.085) mayor / 0.035 menor): la trama de construcción de 80/16 px.
- Variante papel: **suelo papel** (#EDEFE9), **panel papel** (#F7F8F4), **línea papel** (#B9BFAE) y suave (#DDE0D5), **tinta** (#16181C) y **atenuada** (#5B6068), rejilla rgba(22,24,28,0.1)/0.045.

### Named Rules
**La Ley del Volt.** El volt pinta únicamente acción, activo y foco. Jamás pinta datos, estados informativos ni decoración; jamás se liga a la librea. Si un elemento volt no responde al pulso, no es volt. La única lámina volt de gran tamaño del escritorio es el botón de salida a carrera: su rareza es el punto.

**El Dato es Tinta.** Toda cifra, nivel y medición va en tinta (#F2F3F5) sobre mono tabular. Los medidores son ticks de tinta; la fila del jugador en Campeonato y en la torre de la carrera se enfatiza con materia (`--hub-line-soft`), no con acción. Lo mismo rige para el P1 del podio, mis resultados, la vuelta rápida (chip grabado) y la temporada campeona del palmarés: énfasis grabado o tonal, jamás volt.

**La Semáfora.** Verde (éxito), ámbar (aviso) y rojo (peligro) existen SOLO como significado — avisos, desgaste, banderas, subidas y bajadas de posiciones — y siempre con redundancia de forma o signo (flecha+signo, letra de goma, borde). Nunca decoran, nunca accionan, nunca son el volt. Como TEXTO, el rojo usa su variante legible `--red-text` (#F85149 oscuro; ≥4.5:1 sobre panel y materia) igual que el verde usa `--green-text`; el crudo queda para rellenos (desgaste, bandera, borde de aviso). Los colores de compuesto (S roja, M amarilla, H blanca, I verde, W azul) y las banderas son CONTENIDO del deporte: códigos reales que el mundo no renegocia.

**La Librea es un Dato.** El color del equipo del jugador viaja por el canal `--livery` (crudo: chips, puntos, coches en pista) y `--livery-line` (mezcla al 55 % hacia la tinta del tema, para las líneas del gráfico de ritmo: una librea casi negra jamás esconde una línea). Ningún elemento de interfaz lee la librea; el viejo acento dinámico (`--accent`) está retirado de producción.

## Typography

**Display Font:** Inter (system-ui, Segoe UI, sans-serif)
**Body Font:** Inter (idem)
**Cifra/Dato Font:** ui-monospace, Cascadia Mono, JetBrains Mono, Consolas, Roboto Mono

**Character:** Inter en pesos extremos — Black 900 para el nombre del equipo y los wordmarks de cabecera, 800 en títulos de panel, 600 en labels — enfrentada a una monoespaciada tabular que posee todos los números. La tensión display-extremo vs. cifra-fría es la voz; nunca se cambia de familia para expresar algo. La Barlow Condensed del look anterior está RETIRADA (033): las posiciones de la torre, el contador de vueltas y los podios son cifras, y beben de la pila mono (`--font-display` reapuntado).

### Hierarchy
- **Display** (900, clamp(44px, 7vw, 86px), line-height 0.98, tracking −0.025em, mayúsculas): el nombre de la escudería, dueño del tablón, directamente sobre la rejilla. En móvil clamp(40px, 11.5vw, 58px).
- **Headline/Title** (800, 13px, tracking 0.16em, mayúsculas): títulos de sección con hairline inferior («IDENTIDAD», «DESARROLLO»).
- **Label** (600, 11–12px, tracking 0.1–0.14em, mayúsculas): claves de la ficha, campos de formulario, botones, pestañas del riel.
- **Body** (600, 13–14px): nombres de filas, ítems del menú Más.
- **Cifra/Dato** (mono, 12–15px, 400/700, tabular-nums): monedero, niveles, costes, deltas, efecto de sede, estadísticas de rivales y campeonato. La referencia de ronda del botón de carrera (`go-sub`) también es mono: es un dato, no parte del acto.

### Named Rules
**La Cifra es Mono.** Si es un número que el jugador compara o gasta, va en la pila mono con `font-variant-numeric: tabular-nums`. Inter nunca porta cifras del juego.

## Layout

Shell en columna: mástil de 56 px (marca Inter 900 — MM en mono a ≤860 px — monedero con delta, tema, Más) con hairline inferior y fondo casi opaco sobre la rejilla; cuerpo en flex: riel de texto de 200 px (pestañas verticales con borde izquierdo de 2 px, activo marcado en volt-línea; el botón CARRERA al fondo del riel como EL bloque volt) y zona de trabajo con scroll propio, padding 40 px clamp(20px, 4vw, 56px) 100 px. El contenido centra en 1020 px máx. La rejilla de fondo (80/80 px mayor, 16/16 px menor) es global al shell, no una textura de panel.

El héroe: nombre Inter Black sobre la rejilla, dataline mono atenuada debajo, regla graduada (ticks 80/16 px con borde inferior hairline) y, a 30 px, el bloque de título — ficha de plano de máximo 560 px, grid `auto 1fr`, clave label izquierda / valor mono derecha, filas separadas por hairline suave. La librea vive ahí como chip de 11 px con borde hairline. Atajos fantasma (borde 1 px, texto atenuado) tras la ficha. Filas de desarrollo en grid `minmax(140px,220px) 78px 1fr 150px` (nombre, nivel mono, 15 ticks de 3 px, acción/MÁX), filas de sede y listas con hairline suave.

Móvil (≤860 px): el pulgar manda — riel convertido en tira horizontal scrollable con la pestaña activa como bloque volt (target táctil), botón de carrera fuera del riel y barra inferior fija solo-carrera (padding inferior `env(safe-area-inset-bottom)`, botón de 54 px), héroe recortado, filas de desarrollo reordenadas en áreas (nombre/nivel, ticks, acción a ancho completo). Todo objetivo táctil ≥44 px.

**The Grid Stays On Rule.** La rejilla de construcción se ve en TODO el shell del hub, bajo cualquier tema. Ninguna superficie del mundo Carbono puede taparla con un fondo opaco salvo el mástil, la barra móvil y los menús desplegables (que flotan sobre él).

## Elevation & Depth

Plano, casi sin sombras. La profundidad es tonal y lineal: un solo paso de suelo a panel (#0E0F11 → #141519), módulos definidos por su marco de 1 px, y jerarquía por tipografía y hairlines. La única sombra del mundo es la del menú «Más» desplegado (`box-shadow: 4px 6px 18px rgba(0,0,0,0.35)`), un elemento que flota sobre el plano. El foco no eleva: es un outline de 2 px en volt-línea (offset 2 px), o el subrayado vivo de 2 px en inputs.

### Shadow Vocabulary
- **Caída de flotante** (`4px 6px 18px rgba(0,0,0,0.35)`): la ÚNICA sombra del mundo, para superficies que flotan sobre la rejilla — menú Más, avisos (toasts), guía de primera vez, overlays de resultados/elección de gomas/presentación del GP e indicador de bandera.

### Named Rules
**La Mesa Plana.** Nada se levanta del plano con sombra para pedir atención; la atención la da el volt. Si un elemento parece necesitar elevación, es que no debería competir con la acción. Las capas que FLOTAN (menús, avisos, overlays) sí llevan la caída: no piden atención, existen por encima del plano.

## Shapes

Esquinas rectas siempre: `border-radius: 0` en botones, chips, fichas, inputs, menús y filas — las únicas excepciones del mundo son los círculos-dato (punto de librea, anillos de goma) y el gantry físico de las luces de salida (4 px). El lenguaje de forma es el del plano técnico: marcos de 1 px (`--hub-line`), separadores internos más suaves (`--hub-line-soft`), la regla graduada bajo el héroe y la caja grabada MÁX (borde de 1.5 px de tinta). No hay gradientes ni blurs; la única textura es la propia rejilla — y el único glow permitido es el de las luces de salida encendidas (objeto físico del deporte, misma excepción que su radio).

## Components

### Buttons
- **Shape:** recta (radius 0); fantasmas de hairline con mínimo 44 px de alto.
- **Fantasma** (`.team-screen .btn`): transparente, borde 1 px hairline, tinta, Inter 600 12 px tracking 0.1em mayúsculas; hover sube el borde a atenuado (y a volt-línea en los atajos del héroe); disabled atenúa y tacha el coste en mono. Los botones de datos (comprar, firmar) usan mono 12–13 px sin mayúsculas: el coste es una cifra.
- **Primario / lámina volt** (`.btn.primary`): fondo y borde volt, tinta-sobre-volt, Inter 800; hover `brightness(1.06)`. Es la única lámina volt de la vista.
- **Foco:** outline 2 px volt-línea, offset 2 px.

### Botón de carrera (firma)
Dos capas dentro de la lámina volt: el acto en Inter 800 13 px mayúsculas («CLASIFICACIÓN», «SPRINT», «CARRERA») y debajo la referencia de ronda en mono («R9/21 · MONTREAL»), porque la ronda es un dato. En escritorio vive al fondo del riel (margin `auto 14px 12px`); en móvil es la barra inferior fija con safe-area, botón de 54 px y `go-act` a 15 px.

### Chips
- **Monedero** (`.budget-chip`): borde hairline, cifra en mono 15 px 700 tabular + «M€».
- **Delta** (`.budget-delta`): chip mono 12 px borde hairline, aparece junto al monedero con signo ± durante 1600 ms (`aria-live="polite"`) tras cada gasto o ingreso; sin color: el delta es un dato.
- **Librea** (`.livery-chip`): cuadrado de 11 px con borde hairline dentro de la ficha; el color del equipo como dato, nunca como tema.

### Módulos / fichas
- **Ficha de plano** (`.titleblock`): panel sobre marco 1 px, grid `auto 1fr`, clave label atenuada / valor mono derecha, presupuesto en 700 15 px.
- **Listas** (desarrollo, sede, rivales, patrocinadores, campeonato): sin caja; filas sobre hairline suave dentro de la sección, o en marco (patrocinadores: panel con scroll a 62 vh).

### Medidor de ticks (firma)
15 ticks de 3 px × 16 px de alto, separación 3 px; vacíos en hairline, llenos en tinta (`--hub-text`). Nunca volt: el nivel es un dato. El tick adicional tras comprar ES la interacción firma del mundo.

### Marca MÁX (firma)
Caja grabada (`.dev-max`): mono 700 12.5 px tracking 0.14em, borde 1.5 px de tinta, padding 6×12 px, alineada al final de la fila. Tratamiento unificado en Desarrollo, Pilotos y Sede; contundente sin color de acción. *Matiz conocido (revisión 032, SHIP):* el borde derecho de la caja no coincide en columna entre pestañas (en Pilotos alinea ~x1162 y en Sede/Desarrollo ~x1330 a 1440 px) — mismo tratamiento, geometría de columna distinta; pendiente de reconciliar cuando el mundo se extienda a otras pantallas.

### Inputs
Desnudos: sin fondo ni caja, solo subrayado hairline de 1 px; foco = subrayado vivo de 2 px en volt-línea (sin outline); cifra/valor en mono 14 px; mínimo 40 px. Labels encima en Inter 600 11 px mayúsculas atenuadas. Selector de color (librea): swatch de 64×40 px con borde hairline.

### Navigation
Riel de texto vertical (200 px): pestañas Inter 600 12 px tracking 0.12em mayúsculas en atenuado, borde izquierdo de 2 px transparente; hover aclara a tinta; activa marca el borde en volt-línea y tinta — la pestaña es un control, no un dato. En móvil (≤860 px): tira horizontal, y la activa pasa a bloque volt con tinta-sobre-volt (target táctil de 44 px). Menú «Más»: ítems fantasma de 44 px alineados a la izquierda (sin mayúsculas, 13 px), hover con relleno hairline-suave, en panel con la única sombra del mundo; Escape lo cierra y devuelve el foco al botón.

### Movimiento
El plano se traza a pasos: regla y ficha entran con `hub-draw` (scaleX 0.02→1, 140 ms, steps(3, end)), todo gated tras `@media (prefers-reduced-motion: no-preference)` — con la preferencia activa el mundo aparece quieto, ya trazado. El chip delta vive 1600 ms. Nada se desliza ni hace fade entre estados del hub.

## Do's and Don'ts

### Do:
- **Do** mantener la rejilla 16/80 px visible en todo el shell; los módulos se enmarcan a 1 px SOBRE ella, no la tapan.
- **Do** pintar toda cifra, nivel y referencia de ronda en mono tabular (`tabular-nums`), en tinta.
- **Do** dejar chip delta de 1600 ms en el monedero tras cada gasto o ingreso.
- **Do** usar los pesos extremos de Inter (900 display, 800 títulos, 600 labels) como voz; la fuente no cambia para expresar.
- **Do** mantener objetivos táctiles ≥44 px y, en móvil, la acción de carrera en barra inferior fija con `env(safe-area-inset-bottom)`.
- **Do** gatear todo movimiento tras `prefers-reduced-motion: no-preference` y hacerlo a pasos (90–140 ms), nunca como deslizamiento.
- **Do** en tema claro, oscurecer el volt de líneas y foco (#7D9000) manteniendo el volt de fondo como luz (#CDF630).

### Don't:
- **Don't** uses volt para datos, estados informativos, decoración o acentos ligados a la librea del jugador (La Ley del Volt).
- **Don't** redondees esquinas: `border-radius: 0` en todo el mundo (excepciones: círculos-dato — librea/tcolor/anillos de goma — y el gantry físico de luces).
- **Don't** añadas sombras para jerarquía; la única familia del mundo es la caída de lo que flota (menús, avisos, overlays).
- **Don't** pintes cifras del juego en Inter ni fills de medidor en volt; los ticks llenos son tinta.
- **Don't** reintroduzcas el acento dinámico de librea, la Barlow Condensed, radios o cortes diagonales del look anterior: retirados de producción (033).
- **Don't** uses la semáfora (verde/ámbar/rojo) sin significado ni sin redundancia de forma/signo (La Semáfora).
