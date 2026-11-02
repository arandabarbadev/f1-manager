# Implementation Plan: 025 Goma de salida

## Context

El jugador quiere decidir la goma de salida de sus dos coches. Hoy la
asigna aleatoriamente el builder para toda la parrilla (race-builder.ts
~101). Feature pura de UI + un setter mínimo; motor, economía y
guardado intactos.

## Goals / Non-Goals

- **Goals**: tarjeta S/M/H por coche del jugador entre presentación y
  luces (carrera/sprint); preselección sin fricción; torre coherente
  desde el segundo 1.
- **Non-Goals**: IA de gomas de rivales, salir con la goma de la quali,
  planificar paradas, persistir la elección.

## Implementation Steps

1. **race-builder.ts**: `setStartCompound(state, driverId, compound)` —
   solo ese coche, goma nueva (wear 0, lapsOnTyre 0).
2. **race-screen.ts**:
   - HTML: `.tyre-pick` (overlay z-38) tras `.gp-intro`, con `.tp-rows`
     y botón primario `.tp-go` ("Salida").
   - Estado `pickActive`; puerta en el interval de simulación (igual
     que intro/luces).
   - `endIntro()` → si `event !== 'quali'`, `showPick()`; si no,
     `startRacePhases()` (luces + guía).
   - `showPick()`: por coche del jugador, fila [P#][código+nombre]
     [S/M/H] con `.active` en la goma del builder; tap conmuta.
   - `endPick()`: aplica `.tp-btn.active` con `setStartCompound`,
     refresca HUD (anillos de la torre) y `startRacePhases()`.
   - `setup()`: reset de la tarjeta (hidden, pickActive false).
3. **race-screen.css**: overlay `.tyre-pick` (z-38, dim), tarjeta `cut`
   min(92vw, 380px), filas con código+nombre y grupo de 3 `.tp-btn`
   (≥44 px, anillo `.tyre-ico` 24 px, `.active` con acento), "Salida" a
   lo ancho; móvil apilado y a pulgar.
4. **test-harness.ts**: "Goma check" — `setStartCompound` cambia solo el
   coche indicado (compuesto + wear 0 + lapsOnTyre 0) y con
   `Math.random` fijado los rivales conservan su goma del builder.
5. **Build + harness** verdes.
6. **Verificación en vivo**: elegir S/H distintos, ver torre al arrancar;
   flujo sin tocar (un paso); quali sin tarjeta; congelado (reloj 0);
   guía tras cerrar; móvil 390 (botones 44 px, hit-test). Capturas.
7. Requisitos y tareas [x], commit.

## Test Strategy

- Harness determinista (Math.random stub) + carrera de regresión.
- CDP: interacción real con la tarjeta y lectura de la torre.

## Milestones / Dependencies

1 commit. Base: `ef8eb2e` (024). Depende de 022 (intro) y 024 (raíz
de overlays).
