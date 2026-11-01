# Implementation Plan: Retransmisión en carrera

**Branch**: `022-retransmision-en-carrera` | **Date**: 2026-11-01 | **Spec**: [spec.md](spec.md)

## Summary

Solo presentación sobre `race-screen`: (1) podio + bloque "mis coches"
en el overlay de resultados; (2) columna delta en la torre con flecha y
signo; (3) tarjeta de presentación del GP que retrasa luces/reloj/tick
con el mismo mecanismo que ya congela la carrera en "Formación".

## Constitution Check

I ✔ (spec sin CÓMO) · II ✔ · III ✔ (cero dependencias, canvas y CSS
puros) · IV ✔ (acciones a pulgar, fila sin solapes a 390 px) · V ✔ ·
VI ✔ · VII ✔ (SC verificables jugando) · VIII ✔ · IX ✔ (evidencias
DOM/píxeles) · X ✔ · XI (recordatorio al cerrar).

## Diseño

1. **Presentación** (`race-screen.ts`): estado `intro {active, until}`;
   `setup()` llama a `startIntro()` (antes `startLights()`). El
   `setInterval` de simulación ya congela con `lights.active` — se añade
   `intro.active` ANTES (ancla shadow + `lastTickAt`, reloj a 0).
   `advanceLights` solo corre sin intro. La guía de primera vez se
   muestra al TERMINAR la presentación (antes, al final de `setup`).
   Overlay `.gp-intro` centrado sobre el trazado con `.gp-intro-card
   .cut`: nombre, `${totalLaps} vueltas`, canvas 240×150 con la
   silueta (línea blanca del `state.track.path` escalado) y "Toca para
   empezar". Click en cualquier lado del overlay → `endIntro()` →
   luces. Timeout 2600 ms (el propio interval lo cierra).
2. **Delta** (`race-screen.ts/css`): `gridStartPos: Map<driverId,
   posición de salida>` capturado en `buildStandings` (la posición
   inicial ES la parrilla); `span.delta` en la fila entre código y
   hueco; en `updateHud`: `d = salida − actual` → `▲n` (verde) / `▼n`
   (rojo) / ''. Grid: la columna delta (2.4em) come espacio del 1fr
   del hueco; móvil a 11 px sin sacrificar columnas. DNF sin delta.
3. **Podio** (`race-screen.ts/css`): en `awardPrizesAndShowResults`,
   clasificación final → `classified = getFinalClassification(state)
   .filter(c => c.status === 'racing')`; podio = primeros 3 (P2-P1-P3
   de izq a der, P1 más alto): posición, código (driver-codes),
   nombre, franja equipo; coche del jugador → realce con acento y
   "★". Bloque `.my-results`: siempre, cada coche mío con su P# (y
   DNF si aplica) en grande. Panel de resultados: `max-height: 92vh;
   overflow-y: auto` con acciones al final (pulgar en móvil).
4. Harness: sin cambios de motor → todas las corridas existentes deben
   seguir idénticas (regresión cubierta por los checks ya presentes);
   verificación viva nueva.

## Riesgos

- El interval de simulación corre desde la creación: la puerta
  `intro.active` va PRIMERA (antes que `lights.active`) y ancla
  `lastTickAt` para que el render no interpolace.
- `getFinalClassification` incluye DNF al final: filtrar por status.
- Reinicio ("Nueva carrera") repasa `setup()` → la presentación vuelve
  a salir (2,5 s, saltable): aceptado por diseño.
