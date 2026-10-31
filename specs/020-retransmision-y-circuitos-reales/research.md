# Research 020 — decisiones con evidencia

## Dónde están los datos de Miami (verificado 2026-10-21)

El repo fuente `bacinger/f1-circuits` tiene un `f1-circuits.geojson`
global: **40 features** con propiedades `{id, Location, Name, opened,
firstgp, length, altitude}`, y entre ellas está **"Miami International
Autodrome"** (descargado a `%TEMP%\mm-f1-all.geojson`, 116 KB). Plan:
extraer su geometría a `data/f1-circuits/us-2022.geojson` (Miami debutó
en 2022; convención país-año del resto de archivos) y añadirla al
CALENDAR de `tools/convert-layouts.js`. Alternativa descartada: ensamblar
desde OSM como Jerez (funciona, pero si la vuelta ya está trazada y
publicada, mejor usarla). Fallback si la geometría viniera rota:
ensamblador OSM (`tools/assemble-osm.js`, generalización del de Jerez).

Perfíl real para TRACK_PROFILES: 5,412 km · 57 vueltas · 19 curvas.

## Quitar la descolisión (018) sin tocar el motor

`tracks-generator.ts:187` hoy:
`const path = normalizeIntoMargin(declash(normalizeIntoMargin(smooth)));`
→ pasa a ser `const path = normalizeIntoMargin(smooth);`.

**Por qué no cambia ninguna carrera**: el progreso por vuelta es
`lapProgress += pace / REFERENCE_LAP_SEC` (ritmo, no distancia del path);
la geometría solo alimenta el RENDER (posición x,y del coche y la línea
de carrera lateral). Quitar declash es literalmente menos trabajo por
carga. La aserción de separación del harness de 018 se INVIERTEN: ahora
se exige FIDELIDAD al layout fuente (distancia media path↔layout < 0,01
tras normalizar ambos) y se acepta que Singapur vuelva a tener tramos
pegados (min gap < 0,05 como evidencia del regreso a lo real).

## Códigos de 3 letras: colisiones garantizadas, regla determinista

Los nombres se generan de 24 apellidos ASCII (`names-data.ts`, sin
acentos) para 20 pilotos: por cumpleaños, P(colisión de apellido) ≈ 89 %
— el desempate no es un caso raro, es lo normal.

- **Base**: última palabra alfabética del nombre → 3 primeras letras
  A-Z en mayúsculas. Si el apellido no llega a 3 letras (p. ej. "Kai"),
  se rellena con las letras del nombre anterior ("KAI" ya vale; "Li" →
  "LI" + inicial del nombre → "LLEO"? no: se rellena con letras del
  nombre completo en orden). Nombres del jugador "Piloto 1" → sin letras
  en la última palabra → primeras 3 letras del nombre completo → "PIL".
- **Desempate determinista** (orden estable = orden del roster: equipo
  del jugador primero, rivales por índice): el primero conserva la base;
  los siguientes prueban en orden: última letra A-Z, luego letra media
  A-Z. Siempre termina en ≤ 26×26 intentos.
- **No se persiste**: función pura `assignDriverCodes(roster)` →
  Map<driverId, código>. Mismo roster → mismos códigos; renombrar un
  piloto recalcula (los códigos siguen siendo únicos por construcción).
  Migración de partidas guardadas: gratis, no hay nada que migrar.
- Módulo nuevo `src/driver-codes.ts` (puro, sin DOM) para harness.

## Torre de tiempos (fila nueva)

Grid actual de `.standing-row` (8 columnas: pos, num, tcolor, dname,
gap, tyre, wear, pitflag) → nueva fila según el brief de Rafa:

```
[pos Barlow 700] [franja 4px color equipo] [CÓDIGO 3ch 700] [gap] [◯letra goma] [wear] [BOX]
```

- El dorsal (`.num`) SALE de la torre (el código lo sustituye como
  identificador; el dorsal sigue en el círculo del coche en el canvas y
  en el `title` de la fila). El nombre completo va en el `title` de la
  fila — sin pérdida de información.
- La franja del equipo sustituye al dot de color (mismo dato, más F1).
- Fila del jugador resaltada con el acento del equipo (como hoy).
- El HUD "Clasificación" pasa a ser la torre: mismo `<ol>`, nueva fila.

## Icono de goma: anillo + letra (CSS puro)

`.tyre-ico`: círculo 18px, `border: 2.5px solid var(--tyre-*)`, letra
S/M/H/I/W centrada (10px, 700) en color de texto. Reconocible sin color
por forma+letra (los 5 tienen letra distinta). Se usa en la torre, en la
línea de goma de Mis boxes y junto a los botones de compuesto (botón =
icono + nada más: la letra YA es el label actual). Mayúsculas permitidas
aquí y en códigos; en nada más.

## Cabecera de carrera: información arriba, UN selector abajo

- Barra de información: nombre del acto+circuito, VUELTA n/N (Barlow,
  grande), clima con riesgo, reloj — texto mayor, es la jerarquía visual.
- Controles agrupados y secundarios: `[⏸/▶] [1x|5x|10x|20x]` como un
  único selector segmentado compacto (`.speed-group`), + "Nueva carrera"
  y "Mi Equipo" discretos. El botón de tema se queda en el grupo.
- Mis boxes ya vive en el HUD; no se toca su lugar.

## Dashboard de Mi Equipo + navegación

- **Hero** arriba del panel: franja de librea (color del equipo), nombre
  del equipo, dinero en cifra GRANDE (Barlow 700, tabular), posición de
  campeonato (P# de constructores con `computeChampionship`; "Sin correr
  aún" si no hay resultados — regla V) y el botón CARRERA destacado.
- Debajo: accesos a las secciones (botones que cambian de pestaña) y, más
  abajo, el contenido actual de la pestaña (identidad + desarrollo del
  coche). El formulario deja de ser lo primero que se ve.
- **Acciones secundarias**: Reiniciar, Salir, Instalar app y Partidas se
  agrupan tras un botón "Más" (menú desplegable). Reiniciar mantiene su
  confirmación (regla VI).
- **Navegación**: en móvil, las pestañas pasan a barra inferior fija
  (alcanzable con el pulgar); en escritorio (≥861px), raíl lateral
  izquierdo. Solo CSS sobre el DOM actual de `.nav-tabs`.

## Esquinas cortadas (lenguaje F1) — CSS estándar

- Token `--cut: 10px` + utilidad `.cut`:
  `clip-path: polygon(0 0, calc(100% - var(--cut)) 0, 100% var(--cut), 100% 100%, 0 100%)`
  (corte diagonal arriba-derecha). Aplicado a paneles de DATOS
  principales: contenedor de la torre, `.pit-box`, hero y `.card` del
  panel, panel de resultados, tarjeta de temporada, tarjeta de partidas,
  tarjeta de login.
- `filter: drop-shadow` respeta el clip (a diferencia de box-shadow) →
  sombra opcional en el hero y resultados.
- Botones e inputs: mantienen su radio 8px (019): radio = se toca,
  corte = dato. Semáforo de salida: sigue 4px (objeto físico).
- Avisos (notice), guía y filas: sin corte (son texto temporal/densa).

## Fuentes: pesos extra solo si se usan

Diseño final usa Barlow Condensed 700 (posición torre, cifras del hero)
y 600 (vuelta grande). Ya están empaquetados (019). Si al maquetar hace
falta 400/500, se descargan igual que en 019 (Google Fonts CSS2 API →
`src/fonts/`, bundle, offline). No se añade nada "por si acaso"
(principio III). Inter variable ya cubre 400-700.

## L1 de la constitución

`ui.css` no tiene la regla `[hidden] { display:none !important }` (solo
la clase `.hidden`). Se añade en 020 (una línea, lección técnica
obligatoria).

## Qué NO cambia

Motor de simulación, economía, fin de semana, clima/gomas (018), acento
dinámico (019), borde blanco del trazado (018), ranuras/nube, service
worker. "Mismos resultados con la misma semilla" queda cubierto porque
no se toca nada del cálculo.
