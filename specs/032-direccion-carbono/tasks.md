---
description: "Task list for feature implementation"
---

# Tasks: Dirección «Carbono» para el hub Mi Equipo

**Input**: Design documents from `/specs/032-direccion-carbono/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Sin tareas de test automatizado nuevas: la regresión es el
harness existente (intacto) + la validación manual de quickstart.md.

**Organization**: Tasks grouped by user story (spec.md) para
implementación y verificación independientes.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1..US5)
- Include exact file paths in descriptions

## Path Conventions

Single project: `src/` at repository root (vestuario del hub:
`src/team-screen.ts` + `src/team-screen.css`; `src/ui.css` INTACTO).

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Partir de una base verde y con la referencia clavada.

- [X] T001 Base de regresión: ejecutar `npm run harness` y
  `npm run build` y anotar el resultado verde (nada de esto se toca)
- [X] T002 [P] Clavar la referencia visual: releer
  `bocetos/boceto-3.html` (tokens `--hub-*`, estructura, estados) y el
  contrato `.impeccable/surfaces/src-team-screen-ts.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: El sistema del mundo (tokens) y el shell nuevo; TODO lo
demás se pinta dentro.

- [X] T003 Sistema de tokens del mundo en `src/team-screen.css`:
  `--hub-*` (carbono #0E0F11, rejilla 16/80 px como background-image
  hairline, hairlines #262932/#1C1E23, texto #F2F3F5 y dim, pila mono
  de sistema, acción volt #D6FF3F) en `:root` + variante
  `:root[data-theme='light']` (papel #EDEFE9, rejilla en tinta 6-9 %,
  volt de línea/foco #8A9E00) según research.md R1-R3
- [X] T004 Shell del hub reestructurado en `src/team-screen.ts`:
  mast (wordmark, monedero mono, botón tema, menú Más), riel de texto
  con las 6 pestañas y el botón de carrera al fondo, zona de trabajo
  sobre la rejilla (regla graduada), barra inferior móvil
  solo-carrera — estructura del boceto-3 con el contenido y handlers
  actuales, sin tocar lógica

**Checkpoint**: el shell pinta el mundo (vacío) y todo navega.

---

## Phase 3: User Story 1 - El hub viste «Carbono» sin perder nada (Priority: P1) 🎯 MVP

**Goal**: Vestuario completo del hub con TODAS las funciones actuales.

**Independent Test**: quickstart.md §1 (los 6 grupos de controles).

- [X] T005 [US1] Hero sobre la rejilla en `src/team-screen.ts` +
  `src/team-screen.css`: nombre del equipo Inter Black
  `clamp(44px,7vw,86px)` con envoltura segura (24 car.), dataline
  mono (puesto constructores · temporada · ronda/circuito o «Sin
  correr aún»), regla graduada bajo el bloque
- [X] T006 [US1] Bloque de título (ficha del equipo) en
  `src/team-screen.ts` + CSS: filas Presupuesto / Piloto 1 / Piloto 2
  / Sede (MEC·ING·COM) / Mejor resultado, hairlines, claves 11 px y
  valores mono alineados a la derecha; el presupuesto del hero vive
  aquí (única cifra grande del club aparte del monedero)
- [X] T007 [US1] Atajos de sección (Pilotos/Sede/Rivales/
  Patrocinadores/Campeonato) como botones fantasma con borde 1 px,
  ≥44 px, hover con borde de acción en `src/team-screen.css`
  (reemplaza las hero-links actuales, mismos `data-tab`)
- [X] T008 [US1] Panel «Identidad» en `src/team-screen.ts` + CSS:
  módulo enmarcado, labels 11 px, inputs desnudos con subrayado
  hairline y foco de acción, swatch de librea; MISMOS binds
  (bindTextInput, setDriverNumber con su validación 1-99 vigente)
- [X] T009 [US1] Filas de desarrollo en `src/team-screen.ts` + CSS:
  nombre, nivel `L#/#` mono, medidor de 15 ticks (blanco=tinta,
  jamás volt), botón fantasma `+1 · N M€`, deshabilitado atenuado con
  coste tachado — coste y tope siguen saliendo de `devCost`/
  `DEV_MAX_LEVEL` sin cambios
- [X] T010 [US1] Menú Más y avisos (toast) restilizados al mundo en
  `src/team-screen.css`: mismos ítems (Palmarés/Partidas/Instalar/
  Reiniciar/Salir) y handlers, cierre por clic exterior
- [X] T011 [US1] Botón de carrera como EL bloque de acción (volt
  fijo) en riel y barra inferior: dos líneas (acto + «R#: circuito»
  con `eventLabel` vigente, o «Ver temporada»), texto en tinta sobre
  volt
- [X] T012 [US1] Superficies del navegador temadas al hub en
  `src/team-screen.css`: `::selection`, `scrollbar-color`, caret y
  focus-visible de acción (2 px)

**Checkpoint**: quickstart §1 completo — MVP desplegable.

---

## Phase 4: User Story 2 - La ley de la luz (Priority: P1)

**Goal**: Un solo color de acción, fijo, y cada gasto deja huella.

**Independent Test**: quickstart.md §2.

- [X] T013 [US2] Chip delta del monedero en `src/team-screen.ts`:
  al comprar, la variación «−N» aparece junto al total (aria-live,
  ~1,5 s) en ambos layouts (mast escritorio y móvil)
- [X] T014 [US2] Auditoría de la ley en `src/team-screen.css`: el
  volt aparece EXCLUSIVAMENTE en accionables, pestaña activa y foco;
  recorrer hover/active/focus/disabled de cada componente y corregir
  desvíos
- [X] T015 [US2] Estado MÁX (15/15) grabado: caja con borde de tinta
  y peso, sin color de acción, en `src/team-screen.css`
- [X] T016 [US2] Prueba de extremos con el hub operativo: librea
  #0A0A0A y #FFFF00 — controles igual de visibles; guardar captura

---

## Phase 5: User Story 3 - La librea es un dato (Priority: P2)

**Goal**: La librea se muestra como dato y no repinta el hub; las
demás pantallas sin cambiar.

**Independent Test**: quickstart.md §3.

- [X] T017 [US3] Fila «Librea» en la ficha del equipo
  (`src/team-screen.ts`): chip de color + valor hex, actualización en
  vivo desde el input de identidad
- [X] T018 [US3] Desacople verificado: ninguna regla del hub consume
  `--accent`; `applyTeamAccent` se SIGUE invocando al cargar/cambiar
  librea (las pantallas no rediseñadas mantienen su tinte actual) —
  ajustar `src/team-screen.css`/`src/team-screen.ts` donde haga falta

---

## Phase 6: User Story 4 - Tema claro y oscuro (Priority: P2)

**Goal**: El mundo funciona legible en ambos temas.

**Independent Test**: quickstart.md §4.

- [X] T019 [US4] Variante clara completa y revisión de contraste en
  `src/team-screen.css` (tokens del T003 aplicados a cada componente:
  papel, hairlines grises, volt pleno solo como fondo de acción,
  volt oscurecido en bordes/foco), verificando datos y controles
  legibles en ambos temas

---

## Phase 7: User Story 5 - Pulgar, teclado y calma (Priority: P3)

**Goal**: Accesibilidad y hábitos conservados.

**Independent Test**: quickstart.md §5.

- [X] T020 [US5] Móvil en `src/team-screen.css`: objetivos ≥44 px,
  barra inferior solo-carrera con `env(safe-area-inset-bottom)`, sin
  scroll horizontal desde 320 px, tabs activa en volt
- [X] T021 [US5] Teclado en `src/team-screen.ts`: Escape cierra Más
  devolviendo el foco a su botón; tras comprar, el foco se conserva
  en la fila actuada (o la siguiente válida)
- [X] T022 [US5] `prefers-reduced-motion`: sin trazo de entrada ni
  animación alguna en el hub (`src/team-screen.css`)

---

## Phase 8: Polish & Cross-Cutting Concerns

- [X] T023 Regresión final: `npm run harness` y `npm run build`
  verdes (motor intacto)
- [X] T024 Ejecutar `specs/032-direccion-carbono/quickstart.md`
  completo y guardar evidencias (capturas escritorio+móvil de ambos
  temas + delta visible + foco) en
  `specs/032-direccion-carbono/evidence/`
- [X] T025 Cierre Impeccable: `impeccable detect` limpio sobre los
  archivos tocados; revisión final de la skill (finish review) y
  registro del mundo en DESIGN.md al terminar

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: inmediato; T001 y T002 en paralelo.
- **Foundational (Phase 2)**: bloquea TODO (tokens + shell).
- **US1 (Phase 3)**: tras Phase 2; secuencial dentro de la fase
  (todos los toques comparten `src/team-screen.ts`/`.css`).
- **US2-US5 (Phases 4-7)**: tras US1 (pintan sobre el vestuario);
  entre sí independientes en verificación.
- **Polish (Phase 8)**: con todas las historias cerradas.

### User Story Dependencies

- **US1**: tras Phase 2 — sin dependencias de otras historias.
- **US2/US3**: tras US1 (auditán y extienden el vestuario).
- **US4**: tras US1 (los tokens ya existen del T003; aquí se aplican
  y revisan por componente).
- **US5**: tras US1.

### Parallel Opportunities

- T001 ∥ T002 (Phase 1).
- Dentro de US1 los toques comparten archivos: ejecución secuencial
  recomendada (T005→T012 en orden).
- US4 y US5 pueden alternarse con US2/US3 sin conflicto de verificación.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1 + 2 → shell con tokens del mundo.
2. Phase 3 (US1) → **parar y validar quickstart §1** (MVP: el hub
   rediseñado funcional al 100 %).
3. Fases 4-7 por prioridad, validando cada checkpoint.
4. Phase 8: regresión, evidencias y cierre.

---

## Notes

- Revisión de cierre Impeccable (tras T025): veredicto inicial «fix»
  con 4 correcciones materiales, todas aplicadas y verificadas
  (delta en entrenamientos de pilotos, hairline claro #B9BFAE, MÁX
  grabada unificada en Pilotos/Sede, botón de carrera a dos capas
  acto+ronda); pasada de veredicto: **ship**, sin regresiones. Dos
  capturas extra lo documentan: `evidence/hub-pilots-max.png` y
  `evidence/hub-hq-max.png`.
- [P] tasks = different files, no dependencies (aquí pocas: el
  vestuario vive en 2 archivos).
- Cada checkpoint = sección de quickstart.md verificable en la app.
- Commit sugerido al cerrar cada fase (histórico de la casa: 1 commit
  por feature al final).
- Evitar: tocar `src/ui.css`, `src/accent.ts`, motor, guardado o
  pantallas fuera del hub (FR-010).
