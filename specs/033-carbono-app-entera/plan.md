# Implementation Plan: «Carbono» en toda la app

**Branch**: `033-carbono-app-entera` | **Date**: 2026-11-11 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/033-carbono-app-entera/spec.md`

## Summary

Vestir TODA la app con el mundo «Carbono» (spec 032, hoy solo en el
hub): los tokens del mundo suben a la base global (`src/ui.css`) con
los nombres viejos remapeados como alias, la rejilla 16/80 se pinta
en el shell de cada pantalla, radio 0 y marcos hairline sustituyen a
 radios y cortes, la fuente condensada se retira (toda cifra → mono
tabular), y el acento dinámico ligado a la librea se sustituye por
un canal de datos de librea (`--livery`/`--livery-line`). Las 5
superficies restantes (acceso, partidas, carrera, resumen de
temporada, palmarés) y las capas flotantes (resultados, gomas,
presentación GP, avisos, guía) migran por pantalla. El contenido de
la carrera (coches, gomas, luces, banderas) queda intacto. La piel
de la PWA (theme-color, manifest, versión de caché) y los registros
del mundo (DESIGN.md + design.json) se actualizan al cierre, con
evidencias capturadas del juego real.

## Technical Context

**Language/Version**: TypeScript 5 + Vite (proyecto actual; sin cambios)

**Primary Dependencies**: NINGUNA nueva (constitución III: no se
añade nada; al contrario, se retira del bundle la fuente condensada
— R4). CSS propio por pantalla sobre la base `src/ui.css`.

**Storage**: intacto — localStorage por slot + Firebase opcional
(fuera de alcance).

**Testing**: `npm run harness` (regresión del motor, intocada) +
`npm run build` + validación manual por historia con capturas del
juego real (constitución IX), método de siembra documentado en
quickstart.md.

**Target Platform**: PWA web, móvil-first (PWA instalable, GitHub
Pages, offline total).

**Performance Goals**: bundle ≤ actual (Barlow fuera ≈ −60 KB de
fuentes); sin nuevos costes de runtime.

**Constraints**: motor de simulación/economía/guardado INTACTOS;
funcionalidad actual al 100 % (FR-007); los dos temas legibles;
`prefers-reduced-motion` respetado; [hidden] sigue ocultando (L1).

**Scale/Scope**: ~2.000 líneas de CSS en 6 archivos + toques
puntuales de TS (llamada de librea, sin churn de markup salvo lo
justificado).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principio | Estado | Nota |
| --- | --- | --- |
| I. Spec antes que código | ✅ | spec.md leída y aprobada en este flujo |
| II. Privacidad | ✅ | no se tocan datos personales ni guardado |
| III. Stack libre, dependencias declaradas | ✅ | cero dependencias nuevas; retiro de fuente declarado en R4 |
| IV. Móvil primero | ✅ | cada historia verifica 390/320 px y pulgar |
| V. Se entiende sin explicación | ✅ | estados vacíos y avisos conservados |
| VI. No perder datos sin enterarse | ✅ | sin operaciones de datos nuevas; borrados siguen confirmando |
| VII. Todo requisito comprobable | ✅ | SC-001..006 con la app en la mano |
| VIII. Todo en la carpeta | ✅ | specs + código en el proyecto local |
| IX. Evidencias, no promesas | ✅ | capturas por pantalla/tema + tabla de provenance |
| X. Carpeta a la vista | ✅ | proyecto abierto en VS Code |
| XI. Higiene de tokens | ⏳ | recordatorio /compact en el cierre de la feature |
| L1 `[hidden]` | ✅ | regla conservada en ui.css |
| L2 HTML network-first | ✅ | SW intacto + bump de CACHE (R9) |

Sin violaciones: no hay Complexity Tracking que justificar.

## Project Structure

### Documentation (this feature)

```text
specs/033-carbono-app-entera/
├── plan.md              # este archivo
├── research.md          # decisiones R1-R10
├── data-model.md        # contrato visual (tokens/canales), sin datos nuevos
├── quickstart.md        # validación de principio a fin + evidencias
└── tasks.md             # (/speckit-tasks)
```

### Source Code (repository root)

```text
src/
├── ui.css               # BASE GLOBAL: tokens del mundo + alias + primitivas
│                        #   (.btn, .notice, .guide-card, gomas, puntos)
│                        #   — retire de Barlow y del corte diagonal
├── livery.ts            # NUEVO (de accent.ts): canal de dato --livery/-line
├── accent.ts            # ELIMINADO (sustituido por livery.ts)
├── auth-screen.css      # mundo: rejilla + tarjeta enmarcada + inputs desnudos
├── slots-screen.css     # mundo: slots como módulos, dificultad con activo volt
├── season-screen.css    # mundo: filas hairline, cifras tinta, totales con peso
├── palmares-screen.css  # mundo: totales enmarcados, campeón grabado
├── race-screen.css      # mundo: cabecera/torre/HUD/overlays (R6 por bloque)
│                        #   posiciones→mono, jugador→materia, activo→volt
├── team-screen.css      # SOLO pierde el bloque de tokens (ya global)
├── team-screen.ts       # llamada applyTeamAccent → applyTeamLivery
├── main.ts              # llamada applyTeamAccent → applyTeamLivery
├── race-screen.ts       # solo si algo del chip de gomas/confirmación lo pide
└── pace-chart.ts        # intacto (el color llega por --livery-line en CSS)

index.html               # theme-color → carbón
public/manifest.webmanifest  # theme/background → carbón
public/sw.js             # CACHE → f1manager-v4
DESIGN.md + .impeccable/design.json  # frontera del mundo → toda la app (cierre)
```

**Structure Decision**: proyecto único `src/` (estructura existente);
esta feature NO crea módulos nuevos salvo `livery.ts` (reencarnación
de `accent.ts` con contrato de dato, no de cromo).

## Complexity Tracking

> Sin violaciones de constitución que justificar.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| — | — | — |
