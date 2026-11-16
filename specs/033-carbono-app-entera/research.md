# Research: «Carbono» en toda la app

Decisiones técnicas (fase 0) para extender el mundo de la spec 032
del hub a TODA la app. Cada una con su porqué y su alternativa
descartada.

## R1 · Los tokens del mundo suben a la capa global (ui.css)

**Decisión**: mover el bloque de tokens `--hub-*` (oscuro + variante
clara) de `src/team-screen.css` a `src/ui.css` (`:root` +
`:root[data-theme='light']`), y remapear los nombres viejos de
ui.css como ALIAS de los valores del mundo:

- `--bg` → suelo carbón `#0E0F11` / papel `#EDEFE9`
- `--panel` → panel `#141519` / `#F7F8F4`; `--panel-2` → suelo con
  hairline suave (o panel); `--input-bg` → transparente/suelo
- `--border` → hairline `#262932` / `#B9BFAE`; `--border-2` →
  hairline suave/fortalecido según uso de foco
- `--text` → tinta `#F2F3F5` / `#16181C`; `--dim` → tinta atenuada
- `--btn-bg/--btn-hover` → fantasma (transparente / relleno
  hairline-suave)
- `--track-*`, `--tyre-*`, `--car-outline`, `--green/--amber/--red`:
  contenido y semáfora, se conservan (R6/R7)

`src/team-screen.css` pierde su bloque de tokens y consume los
globales: el hub NO se rediseña de nuevo, solo comparte base.

**Por qué**: ~1.600 líneas de CSS de pantallas leen los nombres
viejos (`--panel`, `--border`, `--dim`…); el alias hace que TODO
aterrice en el mundo de golpe y la migración por pantalla queda para
el detalle (volt, mono, materia), no para el 80 % basal.

**Alternativa descartada**: renombrar variable a variable en las 5
pantallas — mismo destino con mucho más diff y riesgo de fugas del
look viejo.

## R2 · La rejilla, global a cada shell

**Decisión**: la trama 16/80 px (hairline mayor/menor como
`background-image`) se aplica al elemento raíz de cada pantalla
(`.auth-screen`, `.slots-screen`, `.race-screen`, `.season-screen`,
`.palmares-screen`; el hub ya la tiene). El canvas de la carrera es
TRANSPARENTE (`clearRect` en `race-screen.ts:966` y capa de trazado
`791`): dibuja halo + asfalto como trazos, así que la rejilla se ve
alrededor del ribbon sin tocar el motor de dibujo.

**Por qué**: «The Grid Stays On» extendido: la identidad es la
rejilla; ninguna pantalla puede ser «otra cosa».

**Alternativa descartada**: rejilla solo en pantallas de gestión y
carrera limpia — rompería la regla y la continuidad.

## R3 · Radio 0 y retiro del corte diagonal

**Decisión**: `--radius-touch` y `--radius-data` pasan a `0` (las
variables siguen existiendo; todo `border-radius` del incumbente
colapsa solo). `.cut` pierde su `clip-path` (queda clase inerte, sin
toque de TS: se usa en `auth-card`, `gp-intro-card`, `tyre-pick-card`
y `results-panel`) y los módulos pasan a marcos hairline de 1 px.
Excepciones documentadas: el gantry de luces de salida (objeto
físico) y los círculos-dato (punto de librea, gomas).

**Por qué**: esquinas rectas es ley del mundo; el corte diagonal era
el gesto 020 del look anterior.

**Alternativa descartada**: mantener el corte como firma — pertenece
al mundo descartado («dirección pura», decisión de Rafa en 032).

## R4 · Barlow Condensed se retira; la cifra manda

**Decisión**: se eliminan los 4 `@font-face` de Barlow Condensed de
ui.css y `--font-display` se reapunta a la pila mono del mundo
(`--hub-mono`). Los 5 usos (`race-lap`, `podium-pos`, `my-pos`,
`standing-row .pos`, `tp-pos`) se convierten en cifra técnica sin
tocar sus reglas. Los woff2 quedan en `src/fonts/` pero sin
referencia `url()` → fuera del bundle (menos peso).

**Por qué**: en el mundo, posiciones, vueltas y contadores SON datos
→ mono tabular; y el detector tiene la regla `design-system-font`
para Barlow fuera de los bocetos: mantenerla en producción sería una
excepción sin sentido.

**Alternativa descartada**: conservar Barlow solo en la torre — dos
voces tipográficas en una pantalla, contra «La Cifra es Mono».

## R5 · Acento dinámico → librea como dato (canal de datos explícito)

**Decisión**: `src/accent.ts` se transforma en `src/livery.ts`:
`applyTeamLivery(color)` escribe SOLO `--livery` (color crudo, para
chips/puntos con borde) y `--livery-line` (variante con guarda de
luminancia: si la librea no contrasta con el suelo, se mezcla hacia
la tinta — para las líneas del gráfico de ritmo, que hoy usan
`var(--accent)` en `pc-line`/`pc-dot`). TODOS los usos de cromo de
`--accent*` se sustituyen: acción/activo → volt; énfasis → materia;
dato → tinta. El cromo del hub ya está desacoplado (032 T018);
llamadas en `main.ts` y `team-screen.ts` se actualizan. Al cerrar:
`grep var(--accent` en cromo = 0.

**Por qué**: la Ley del Volt exige acción fija; la librea ES dato
 legitimate (gráfico de ritmo: spec 028, «los dos coches comparten
 el color del equipo») pero necesita canal propio y guarda de
 visibilidad — una librea #0A0A0A haría hoy el gráfico invisible.

**Alternativa descartada**: borrar el color del gráfico y usar solo
tinta — perdería la identidad de equipo que la spec 028 quiso.

## R6 · La carrera: contenido vivo, cromo del mundo

**Decisión** por bloque de `race-screen.css`:

- Cabecera: hairline, nombre de circuito Inter 600, VUELTA/reloj/
  clima en mono (tinta/atenuada); velocidades y pausa = grupo
  selector con activo en volt.
- Torre y HUD: panel sobre carbón con hairline izquierda; fila del
  jugador = materia (relleno `--hub-line-soft`); posiciones mono
  (R4); vuelta rápida = chip grabado (borde tinta 1.5 px, como MÁX);
  deltas con flecha/signo (semáfora asiste); desgaste con sus tres
  estados.
- Paradas: gomas por anillo+letra (contenido, intacto); el botón de
  confirmar = acción (volt solo al confirmar/activo).
- Resultados: panel enmarcado + sombra de superficie flotante;
  podio P1 y mis resultados = materia; premios en tinta mono.
- Presentación GP, elección de gomas (activo = volt), avisos y guía
  de primera vez: paneles del mundo, sombra solo por flotar.
- Luces de salida: objeto físico — se conserva su pequeño radio y su
  rojo real (excepción documentada); banderas: semántica del
  deporte, intactas.
- Canvas: asfalto/halo conservados (vars de contenido); verificado
  en ambos temas sobre suelo carbón/papel.

## R7 · La semáfora queda documentada en el mundo

**Decisión**: verde/ámbar/rojo existen SOLO como significado
(avisos éxito/peligro, aviso de desgaste, banderas, deltas con
forma+signo). Nunca acción, nunca decoración. Se añade al DESIGN.md
en el cierre (extensión del mundo a toda la app) porque el hub no
tenía estados que la necesitaran.

## R8 · Avisos y guía de primera vez

**Decisión**: `.notice` y `.guide-card` en ui.css se visten del
mundo: panel enmarcado hairline, título Inter 800, cuerpo tinta
atenuada, y la ÚNICA familia de sombras del mundo (superficies que
flotan sobre la rejilla, como el menú Más del hub). El borde
izquierdo semántico se conserva solo en alert/success.

## R9 · Piel de la PWA

**Decisión**: `index.html` `theme-color` → `#0E0F11`;
`public/manifest.webmanifest` `theme_color`/`background_color` →
`#0E0F11`; `public/sw.js` `CACHE` → `f1manager-v4` (cambio de piel
completo; L2 ya garantiza HTML network-first).

## R10 · El hub no se rediseña; se comparte

**Decisión**: `team-screen.css` solo pierde el bloque de tokens (ya
globales) y `team-screen.ts` cambia `applyTeamAccent` por el canal
de librea-dato si lo necesita el chip (hoy el chip es inline: no lo
necesita). Regresión visual del hub con captura para demostrar que
no cambió nada.

## Riesgos y mitigaciones

- **Regresión visual masiva por el alias de tokens**: mitigada con
  captura por pantalla antes/después y el checkpoint por historia.
- **Contraste del asfalto sobre carbón/papel**: verificado en las
  capturas de ambos temas (R6); vars de contenido ajustables sin
  tocar motor.
- **Gráfico de ritmo con librea extrema**: guarda de luminancia en
  `--livery-line` (R5).
- **Caché vieja de la PWA**: bump de CACHE (R9).
