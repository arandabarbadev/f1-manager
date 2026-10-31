# Implementation Plan: Retransmisión F1 y circuitos reales

**Branch**: `020-retransmision-y-circuitos-reales` | **Date**: 2026-10-21 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/020-retransmision-y-circuitos-reales/spec.md` + directivas visuales de Rafa (clip-path diagonal, composición de la fila de torre, icono de goma anillo+letra, cabecera con selector único, dashboard con tira de librea, navegación inferior móvil / raíl lateral escritorio, pesos de Barlow solo si el diseño los usa, mayúsculas solo en códigos y letras de compuesto).

## Summary

Dos frentes: (A) circuitos con su forma REAL (sin la descolisión de 018)
y Miami nuevo (21 rondas = mundial + Jerez); (B) el juego se lee como una
retransmisión: torre de tiempos con códigos de 3 letras únicos, cabecera
de carrera con la información por encima de un único selector de
pausa/velocidad, Mi Equipo como panel del equipo (librea, dinero grande,
posición) con navegación inferior en móvil, y goma reconocible por anillo
+ letra. Sin cambiar una línea del motor: la geometría no alimenta la
simulación (el progreso por vuelta es por ritmo, no por distancia
recorrida en el path), así que los resultados no cambian.

## Technical Context

**Language/Version**: TypeScript 5.9 + Vite 7 (Canvas 2D, PWA, sin frameworks).

**Primary Dependencies**: ninguna nueva. Fuentes propias ya empaquetadas
(Inter variable + Barlow Condensed 600/700 en `src/fonts/`, spec 019);
pesos extra de Barlow SOLO si el diseño final los usa, descargados al
bundle igual que en 019 (excepción al principio III ya aprobada).

**Storage**: localStorage por ranura (roster/career {a|b|c}) + Firebase
nube. Los códigos de piloto NO se persisten: se derivan del roster con
una función pura (mismo roster → mismos códigos).

**Testing**: `npm run build` + `npm run harness` (checks nuevos: códigos
únicos, 21 rondas, fidelidad de trazados) + `npm run maps` (ASCII de los
21) + verificación en vivo por CDP (preview propio + Chrome headless).

**Target Platform**: PWA móvil-first (Chrome/Android + iOS), escritorio secundario.

**Project Type**: web app de gestión deportiva, un solo proyecto en `src/`.

**Performance Goals**: carrera a 60 fps con 20 coches (como hoy); sin
regresión del render del trazado (quitar declash es MENOS trabajo).

**Constraints**: offline completo (nada nuevo de red), una mano en móvil,
sin logotipos ni marcas propietarias, cifras tabulares ya globales (019).

**Scale/Scope**: 6 hojas de estilo + 4 pantallas + generador de trazados
+ pipeline de circuitos; sin cambios en el motor de simulación.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Spec antes que código** ✔ — spec 020 aprobada antes de este plan;
  este plan separa el CÓMO de las directivas visuales de Rafa.
- **II. Privacidad** ✔ — sin datos personales; nada nuevo viaja a la nube
  más allá del roster/career ya sincronizado.
- **III. Sin dependencias por defecto** ✔ — cero librerías nuevas;
  esquinas cortadas con `clip-path` (CSS estándar), icono de goma con
  CSS (anillo + letra), códigos con función pura. Fuentes: ya empaquetadas
  en 019; si el diseño pide un peso extra de Barlow Condensed, se
  descarga al bundle (`src/fonts/`), nunca del CDN en runtime.
- **IV. Móvil primero** ✔ — navegación como barra inferior fija en móvil
  (pulgar), raíl lateral en escritorio; controles de carrera agrupados y
  compactos.
- **V. Se entiende sin explicación** ✔ — el dashboard llega con datos o
  con su vacío explícito ("Sin correr aún"); la torre se lee sin tutorial.
- **VI. El usuario no pierde datos** ✔ — Reiniciar mantiene su
  confirmación; solo se agrupa en el menú secundario, no se elimina.
- **VII. Todo requisito se comprueba usándolo** ✔ — SC-001..SC-007 con
  verificación en vivo y harness.
- **VIII. Todo en mi carpeta** ✔ — specs, plan, research, código y fuentes
  en `C:\Users\Usuario\motorsport_manager\`; carpeta abierta en el
  Explorador (regla X cumplida este turno).
- **IX. Evidencias** ✔ — harness + guion CDP con aserciones por DOM
  (códigos únicos, estructura de la fila, solapes reales) y capturas.
- **X. Carpeta abierta** ✔.
- **XI. /compact** — recordatorio en el cierre.
- **L1 `[hidden]` oculta siempre** — se añade la regla a `ui.css` (lección
  de constitución, una línea).
- **L2 HTML a la red primero** ✔ — el SW ya es network-first en
  navegación; no se toca.

## Project Structure

### Documentation (this feature)

```text
specs/020-retransmision-y-circuitos-reales/
├── plan.md              # este archivo
├── research.md          # decisiones (fase 0)
├── data-model.md        # entidades y cambios de datos (fase 1)
├── quickstart.md        # guía de verificación (fase 1)
├── checklists/
│   └── requirements.md  # checklist de calidad de la spec (ya existe)
└── tasks.md             # tareas (fase 2)
```

### Source Code (repository root)

```text
src/
├── driver-codes.ts        # NUEVO: código de 3 letras derivado del apellido + desempate determinista
├── tracks-generator.ts    # quitar declash del path; TRACK_PROFILES a 21 (+Miami)
├── real-layouts.ts        # regenerado con Miami
├── roster.ts              # (sin cambios de datos; códigos derivados aparte)
├── career.ts              # calendario 21 (la migración existente re-mapea sola)
├── slots.ts               # rounds 20 → 21 en el resumen
├── race-screen.ts         # torre (fila nueva), cabecera (info vs selector único), iconos de goma
├── race-screen.css        # torre, cabecera, .tyre-ico, esquinas cortadas
├── team-screen.ts         # dashboard (hero + accesos + menú secundario), navegación
├── team-screen.css        # hero, barra inferior móvil / raíl escritorio, menú "más"
├── ui.css                 # [hidden] (L1), token --cut, utilidades .cut
├── slots-screen.css / season-screen.css / auth-screen.css  # esquinas cortadas
├── test-harness.ts        # checks: códigos únicos, 21 rondas + Miami, fidelidad de trazados
tools/
├── convert-layouts.js     # CALENDAR + Miami
└── assemble-osm.js        # NUEVO: ensamblador OSM generalizado (Jerez → cualquier circuito)
data/f1-circuits/
└── miami.geojson          # NUEVO: vuelta real de Miami (OSM)
```

**Structure Decision**: proyecto único ya existente; se añade un módulo
puro (`driver-codes.ts`), un tool de datos y un geojson. Sin `contracts/`
(app interna sin interfaces externas: el único contrato es el guardado
localStorage/nube, ya cubierto por data-model).

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Ninguna | — | — |
