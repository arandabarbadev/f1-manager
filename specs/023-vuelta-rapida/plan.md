# Implementation Plan: Vuelta rápida

**Branch**: `023-vuelta-rapida` | **Date**: 2026-11-01 | **Spec**: [spec.md](spec.md)

## Summary

Contabilidad de tiempos por vuelta en el MOTOR (aditiva, sin tocar la
progresión): interpolación del cruce de meta dentro del segundo
simulado → milisegundos a cualquier velocidad; acumulador por coche +
bandera de invalidez (amarilla/roja o parada); `RaceState.fastestLap`.
La pantalla lo enseña: línea junto a la torre, marca en la fila del
portador, aviso al mejorar y dato en el panel final.

## Constitution Check

I ✔ · II ✔ · III ✔ (sin dependencias) · IV ✔ (texto/tiempos legibles a
390 px) · V ✔ · VI ✔ · VII ✔ (SC jugables) · VIII ✔ · IX ✔ (harness
determinista + en vivo) · X ✔ · XI (recordatorio al cerrar).

## Diseño

1. `types.ts`: `RaceCarState.lapTimeAccumSec: number` y
   `lapInvalid: boolean`; `RaceState.fastestLap: { driverId,
   lapTimeSec: number, lapNumber: number } | null`;
   `RaceEvent.type` += `'fastestLap'`. Inicializados en
   `race-builder.ts` (0 en cada coche, null en la carrera).
2. `simulation.ts` (bucle por segundos): la progresión NO cambia —
   el paso por segundo es el mismo arithmetic; cuando el paso cruza
   la meta se calcula la fracción `needed = (1 − progreso)/paso`,
   se registra `lapTime = acumulador + needed`, el resto
   (`1 − needed`) arranca la vuelta siguiente. Marca `lapInvalid`
   cuando `state.flag !== 'green'` durante la vuelta. `recordLapTime`:
   válida si `!lapInvalid && flag verde && !pendingPits.has(driver)`;
   reemplaza solo si `lapTime < fastestLap.lapTimeSec` (igualdad
   conserva al primero) y emite evento `fastestLap`.
3. `race-screen.ts`: `towerCodes` (mapa de `buildStandings`); línea
   `.fastest-lap` bajo el título "Clasificación" (`VL VER · 1:32.456`,
   actualizada en `updateHud`); la fila del portador lleva `.vl`
   (código con subrayado de acento); `consumeRaceEvents` atiende
   `fastestLap` → aviso info "Vuelta rápida" (código+nombre+tiempo) y
   feed; el panel de resultados añade `.results-fl` con el dato final.
   `formatLapTime(s)` = `m:ss.mmm`.
4. `test-harness.ts`: "VL check" con `Math.random` apuntado a un valor
   fijo (sin incidentes/clima, gomas deterministas): micro-carrera de
   2 coches y 3 vueltas — el coche rápido para en boxes al final de la
   vuelta 1 (la más rápida en tiempo): la VL debe ser vuelta ≥2 de ese
   coche; y el tiempo no es múltiplo del multiplicador. Después se
   restaura `Math.random`. La carrera grande del harness debe dar la
   misma salida que siempre (regresión).
5. CSS: `.fastest-lap` (chip con acento junto a la torre),
   `.standing-row.vl .code` subrayado, `.results-fl`.

## Riesgos

- No tocar NADA del orden de `Math.random` en el motor (la
  interpolación es aritmética pura).
- `startPitStop` ya no se llama distinto: el registro va ANTES, con la
  comprobación de `pendingPits`.
