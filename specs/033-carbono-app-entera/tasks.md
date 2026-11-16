---
description: "Task list for feature implementation"
---

# Tasks: «Carbono» en toda la app

**Input**: Design documents from `/specs/033-carbono-app-entera/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Sin tests automatizados nuevos: la regresión es el
harness existente (motor intacto) + la validación manual de
quickstart.md con capturas (constitución IX).

**Organization**: Tasks grouped by user story (spec.md); cada fase
verificable de forma independiente.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1..US5)
- Include exact file paths in descriptions

## Path Conventions

Single project: `src/` at repository root. Vestuario en CSS por
pantalla + base global `src/ui.css`; motor/guardado intactos.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Base verde y referencias clavadas.

- [X] T001 Base de regresión: `npm run harness` y `npm run build`
  verdes y anotados (nada del motor se toca en esta feature)
- [X] T002 [P] Clavar referencias: releer `DESIGN.md` (leyes y
  tokens), el bloque de tokens al inicio de `src/team-screen.css`
  (fuente de los `--hub-*`) y `bocetos/boceto-3.html` (mundo vivo)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: El mundo baja a la capa global: tokens, primitivas y
canales. TODO lo demás se pinta encima.

- [X] T003 Tokens globales en `src/ui.css`: mover el bloque `--hub-*`
  (oscuro + claro) desde `src/team-screen.css` a `:root` /
  `:root[data-theme='light']` y remapear los nombres viejos como
  alias del mundo según data-model.md §3 (`--bg`→suelo, `--panel`,
  `--border`, `--text`, `--dim`, `--btn-*`); `--radius-*` a 0; `.cut`
  sin `clip-path`; conservar `[hidden]` (L1), semáfora y vars de
  contenido (`--tyre-*`, `--track-*`, `--car-outline`)
- [X] T004 Primitivas del mundo en `src/ui.css`: `.btn` fantasma
  hairline (≥44 px) + `.btn.primary` lámina volt + `.btn.active`
  estado activo; `.notice` y `.guide-card` como paneles enmarcados
  con sombra solo por flotar y borde semántico únicamente en
  alert/success; `::selection`/scrollbar/caret del mundo; gomas
  (`.tyre-ico`) y punto de equipo (`.tcolor`) intactos
- [X] T005 Retiro de Barlow Condensed en `src/ui.css`: eliminar los 4
  `@font-face`, reapuntar `--font-display` a la pila mono del mundo;
  verificar en `npm run build` que las woff2 salen del bundle
- [X] T006 Canal de librea-dato: crear `src/livery.ts`
  (`applyTeamLivery(color)` escribe `--livery` crudo y
  `--livery-line` con guarda de luminancia hacia la tinta), borrar
  `src/accent.ts`, actualizar llamadas en `src/main.ts` y
  `src/team-screen.ts`; `grep var(--accent` en `src/*.css` = 0
  consumidores de cromo (los usos legítimos pasan a volt/materia/
  tinta/`--livery-line` según R5)
- [X] T007 Hub compartiendo base: quitar el bloque de tokens
  duplicado de `src/team-screen.css` (ya global) y verificar con
  captura que el hub luce EXACTAMENTE igual que en 032
- [X] T008 [P] Piel de la PWA: `index.html` (`theme-color`
  #0E0F11), `public/manifest.webmanifest` (`theme_color`/
  `background_color` #0E0F11) y `public/sw.js` (`CACHE` →
  `f1manager-v4`)

**Checkpoint**: base global lista — las pantallas aterrizan en el
mundo por los alias; el hub no ha cambiado; build verde.

---

## Phase 3: User Story 1 - Un solo mundo de puerta a puerta (Priority: P1) 🎯 MVP

**Goal**: Acceso y partidas vestidos del mundo, con toda su función.

**Independent Test**: quickstart.md §1 (recorrido cerrar sesión →
entrar → slots → crear/borrar partida con confirmación).

- [X] T009 [US1] Acceso en el mundo: `src/auth-screen.css` — rejilla
  16/80 en el shell, tarjeta enmarcada hairline con título Inter
  Black, campos desnudos con subrayado vivo (mismo contrato de input
  que el hub), botones fantasma + Entrar como lámina volt, error en
  rojo semántico, nota atenuada; los 4 caminos de entrada intactos
- [X] T010 [US1] Partidas en el mundo: `src/slots-screen.css` —
  shell con rejilla, cabecera hairline, cada slot módulo enmarcado
  (nombre editable subrayado, meta en mono, la activa destacada por
  MATERIA no por color), dificultad como grupo selector con activo
  volt, crear/jugar/borrar fantasma y sin pérdida de confirmación

**Checkpoint**: quickstart §1 completo — la puerta de entrada es
del mundo (MVP desplegable).

---

## Phase 4: User Story 2 - El cierre y la historia, en el mundo (Priority: P1)

**Goal**: Resumen de temporada y palmarés hablando el idioma del hub.

**Independent Test**: quickstart.md §2 (cierre de temporada con
partida sembrada + palmarés con y sin historial).

- [X] T011 [US2] Resumen de temporada en el mundo:
  `src/season-screen.css` — shell con rejilla, módulo enmarcado,
  filas por ronda sobre hairline suave (posición y premio en tinta
  mono), totales con peso, progresión de rivales con su ganancia en
  mono, y «Empezar temporada nueva» como EL bloque de acción (volt)
- [X] T012 [US2] Palmarés en el mundo: `src/palmares-screen.css` —
  shell con rejilla, totales arriba como módulo con cifras grandes
  mono, una fila por temporada sobre hairline, temporada campeona
  GRABADA (borde de tinta 1.5 px, lenguaje MÁX), estado vacío
  explicando qué aparecerá

**Checkpoint**: quickstart §2 completo.

---

## Phase 5: User Story 3 - La carrera sobre el carbón (Priority: P1)

**Goal**: El fin de semana entero en el mundo, con la carrera viva e
intacta.

**Independent Test**: quickstart.md §3 (fin de semana completo con
paradas, velocidades, resultados y gráfico).

- [X] T013 [US3] Carrera — cabecera y trazado:
  `src/race-screen.css` — rejilla en el shell (el canvas es
  transparente: la trama se ve alrededor del asfalto), hairlines,
  circuito en Inter, VUELTA/clima/reloj en mono tinta/atenuada,
  grupo de velocidades y pausa con activo en volt, recorte de
  nombre largo intacto
- [X] T014 [US3] Carrera — torre y HUD: `src/race-screen.css` —
  panel sobre carbón con hairline izquierda, filas con la del
  jugador destacada por MATERIA, posiciones en mono (vía
  `--font-display` ya mono), vuelta rápida como chip grabado,
  deltas flecha/signo con semáfora asistiendo, desgaste con sus
  tres estados intactos, feed con puntos semánticos, cajas de boxes
  enmarcadas con gomas anillo+letra intactas
- [X] T015 [US3] Carrera — capas: `src/race-screen.css` — panel de
  resultados enmarcado con sombra de flotante, podio con P1/míos por
  materia y premios en tinta mono, elección de gomas con activo en
  volt, presentación del GP del mundo, luces de salida como objeto
  físico (excepción documentada), banderas semánticas intactas, y
  `pc-line`/`pc-dot` bebiendo de `var(--livery-line)`
- [X] T016 [US3] Ajuste de contenido sobre el suelo nuevo: revisar
  `--track-asphalt`/`--track-halo` en ambos temas (vars de
  contenido en `src/ui.css`) para que el trazado siga separándose
  del carbón y del papel; SIN tocar el motor de dibujo

**Checkpoint**: quickstart §3 completo — fin de semana jugado de
principio a fin.

---

## Phase 6: User Story 4 - La ley del color, audito en toda la app (Priority: P2)

**Goal**: Un solo color de acción en todas partes; la librea es
dato en todas partes.

**Independent Test**: quickstart.md §4 (auditoría por pantalla +
extremos de librea).

- [X] T017 [US4] Auditoría de la ley y de la librea: recorrer cada
  pantalla buscando volt fuera de accionable/activo/foco y
  corregir en el CSS que toque; librea #0A0A0A y #FFFF00 sin cambio
  de cromo en NINGUNA pantalla; gráfico de ritmo visible con la
  librea oscura (guarda `--livery-line`)
- [X] T018 [US4] Énfasis por materia: verificar MÁX/vuelta rápida/
  campeón/P1 del podio/fila del jugador grabados o en materia —
  nunca en volt; captura del hub intacto como regression (R10)

**Checkpoint**: quickstart §4 completo.

---

## Phase 7: User Story 5 - Luz y calma en todas las pantallas (Priority: P2)

**Goal**: Tema claro legible en cada pantalla y calma respetada.

**Independent Test**: quickstart.md §5.

- [X] T019 [US5] Tema claro pantalla a pantalla: conmutar en las 6
  pantallas y capas, corrigiendo contraste (líneas papel, goma
  blanca con borde, gantry, avisos) sin tocar el oscuro
- [X] T020 [US5] Calma y móvil: `prefers-reduced-motion` sin
  deslizamientos (la carrera viva), 390/320 px sin scroll
  horizontal, objetivos táctiles del mundo (excepciones compactas
  documentadas)

**Checkpoint**: quickstart §5 completo.

---

## Phase 8: Polish & Cross-Cutting Concerns

- [X] T021 Regresión final: `npm run harness` y `npm run build`
  verdes (motor intacto, bundle sin Barlow)
- [X] T022 Ejecutar `specs/033-carbono-app-entera/quickstart.md`
  completo y guardar evidencias en
  `specs/033-carbono-app-entera/evidence/` con su tabla de método
  (provenance) como en 032
- [X] T023 Cierre Impeccable: detector limpio sobre los tocados,
  actualización de `DESIGN.md` + `.impeccable/design.json`
  (frontera: toda la app; semáfora y excepciones documentadas) y
  finish review con veredicto
- [X] T024 Commit de la feature (1 commit, histórico de la casa)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: inmediato; T001 ∥ T002.
- **Foundational (Phase 2)**: bloquea TODO (tokens, primitivas,
  librea, PWA). T008 es [P] (archivos sueltos).
- **US1-US5 (Phases 3-7)**: tras Phase 2, en orden de prioridad;
  cada pestaña/pantalla vive en su propio CSS (paralelizables entre
  fases salvo verificación).
- **Polish (Phase 8)**: con todas las historias cerradas.

### User Story Dependencies

- **US1/US2**: tras Phase 2, independientes entre sí.
- **US3**: tras Phase 2 (T015 depende del canal de T006).
- **US4/US5**: auditan y calibran sobre US1-US3 terminadas.

### Parallel Opportunities

- T001 ∥ T002; T008 suelto dentro de Phase 2.
- auth/slots/season/palmarés/race css = archivos distintos.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1 + 2 → base global + hub intacto (checkpoint con captura).
2. Phase 3 (US1) → parar y validar quickstart §1.
3. Phases 4-7 por prioridad, validando cada checkpoint.
4. Phase 8: regresión, evidencias, cierre Impeccable y commit.

---

## Notes

- Revisión de cierre Impeccable (tras T023): veredicto inicial «fix»
  con 5 correcciones materiales — acciones de cabecera de carrera al
  piso de 44 px en móvil (la excepción documentada queda solo para
  la tira de velocidades), variante `--red-text` (#F85149) para el
  rojo como TEXTO (≥4.5:1 sobre panel y materia; el crudo queda para
  rellenos) en los 4 sitios, dos labels al mínimo de 11 px
  (hud-title móvil y pt-label), capturas claro de slots y palmarés
  (SC-001 completo), e higiene del look retirado (12 tokens `cut`
  muertos en TS y un comentario caduco). Todo aplicado y verificado
  en dos pasadas; veredicto final: **ship**, sin regresiones. El
  detector de URL añadió una excepción acotada y razonada: el glow
  de las luces de salida (objeto físico del deporte, familia del
  radio de 4 px del gantry), documentada en DESIGN.md.
- Evidencias: 15 capturas del juego real con su tabla de método en
  quickstart.md (§ Evidencias). Limitación documentada con honradez
  (constitución IX): el panel de resultados y el chip de VL no son
  capturables en headless (el reloj virtual no avanza el rAF de la
  simulación) — verificados por código y pendientes de confirmar en
  la primera carrera real.
- [P] tasks = different files, no dependencies (aquí pocas: el
  vestuario vive en la base + una hoja por pantalla).
- Evitar (cumplido): motor, economía, guardado y markup intactos
  salvo clases muertas retiradas; el hub NO se rediseñó — comparte
  base y luce como en 032 (evidencia hub-unchanged.png).
- Commit único al cerrar la feature (histórico de la casa).
