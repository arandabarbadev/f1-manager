# Implementation Plan: Dirección «Carbono» para el hub Mi Equipo

**Branch**: `032-direccion-carbono` | **Date**: 2026-11-09 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/032-direccion-carbono/spec.md`

## Summary

Rediseño visual del hub Mi Equipo con la dirección «Carbono» aprobada
(`bocetos/boceto-3.html`, contrato en `.impeccable/surfaces/
src-team-screen-ts.md`): carbono mate con rejilla de construcción
visible, datos siempre en blanco/mono, Inter en pesos extremos y UN
color de acción (volt) fijo y reservado a lo accionable. Cero cambios
de funcionalidad, datos, guardado o simulación. El mundo vive en su
propia capa (`team-screen.css` reescrito + tokens propios del hub) sin
tocar el `ui.css` compartido que visten las demás pantallas.

## Technical Context

**Language/Version**: TypeScript 5.9 + Vite 7, DOM vanilla (sin
framework de UI — se conserva el incumbente: es un restyle y añadir un
framework no aporta; constitución III: stack libre, dependencias
declaradas: NINGUNA nueva).

**Primary Dependencies**: las actuales (firebase 12 opcional para
nube; fuentes Inter ya auto-hospedadas en `src/fonts/`). Mono del hub:
pila de sistema (ui-monospace/Consolas), como el boceto.

**Storage**: N/A — no se toca guardado (slot localStorage + nube),
migraciones ni claves.

**Testing**: `npm run harness` (regresión de simulación/economía,
debe seguir verde por untouched-code) + `npm run build` (tsc) +
validación manual guiada (`quickstart.md`) con capturas como evidencia
(constitución IX).

**Target Platform**: web/PWA instalable, móvil primero, GitHub Pages
(estático). Escritorio ≥901 px y móvil ≤900 px, de 320 px en adelante.

**Performance Goals**: idénticos a hoy; la rejilla es CSS puro
(background-image con 4 hairline gradients tileados, coste trivial);
ningún asset nuevo que descargar.

**Constraints**: offline total (PWA), ambos temas (claro/oscuro),
`prefers-reduced-motion`, foco visible, objetivos ≥44 px, contraste AA.

**Scale/Scope**: 1 pantalla (hub) + su hoja de estilo; ninguna otra
pantalla, motor ni persistencia.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principio | Estado | Nota |
|---|---|---|
| I. Spec antes que código | ✅ | `specs/032-direccion-carbono/spec.md` leído y validado |
| II. Privacidad | ✅ | No se añaden datos ni salen del navegador |
| III. Stack libre, dependencias declaradas | ✅ | Se declara: DOM vanilla incumbente, CERO dependencias nuevas |
| IV. Móvil primero | ✅ | FR-008, SC-002; barra inferior solo-carrera con safe-area |
| V. Se entiende sin explicación | ✅ | SC-002 (<10 s: dinero, carrera, dónde invertir) |
| VI. El usuario no pierde datos | ✅ | Ningún cambio de guardado; Reiniciar sigue con confirmación |
| VII. Requisito comprobable usándolo | ✅ | FR→escenarios en spec + quickstart.md |
| VIII. Todo en mi carpeta | ✅ | Todo vive en el repo (bocetos, .impeccable, specs, src) |
| IX. Evidencias, no promesas | ✅ | Capturas de escritorio+móvil de ambos temas al terminar |
| X. Carpeta abierta en el Explorador | ✅ | Abierta al inicio de la tarea |
| XI. Recordar /compact | ✅ | Se recuerda al cerrar |
| L1 `[hidden]` siempre oculta | ✅ | Regla global de `ui.css` intacta y respetada |
| L2 HTML network-first | ✅ | Service worker sin tocar |

**Gates**: sin violaciones. (Re-check post-Phase 1: sin cambios.)

## Project Structure

### Documentation (this feature)

```text
specs/032-direccion-carbono/
├── plan.md              # Este archivo
├── research.md          # Phase 0: decisiones y alternativas
├── data-model.md        # Phase 1: entidades que lee el hub (sin cambios)
├── quickstart.md        # Phase 1: guía de validación
└── tasks.md             # Phase 2 (/speckit-tasks)
```

### Source Code (repository root)

```text
src/
├── team-screen.ts       # Estructura del hub rediseñada (misma lógica)
├── team-screen.css      # REESCRITO: el mundo Carbono (tokens --hub-*)
├── ui.css               # INTACTO: lo visten las demás pantallas
├── accent.ts            # INTACTO: sigue tiñendo las pantallas no rediseñadas
├── theme.ts             # INTACTO: data-theme light/dark sigue funcionando
└── fonts/               # INTACTO: Inter variable ya enviada
bocetos/boceto-3.html    # Referencia viva del mundo (no se toca)
```

**Structure Decision**: el mundo Carbono vive en su propia capa
(`team-screen.css` con tokens `--hub-*` en `:root` y
`:root[data-theme='light']`) y el hub deja de consumir `--accent`.
`ui.css` queda intacto para login/partidas/carrera/temporada/palmarés.
Así "sin cambios fuera del hub" es literal, no una esperanza.

## Complexity Tracking

> Sin violaciones de constitución que justificar. Vacío.
