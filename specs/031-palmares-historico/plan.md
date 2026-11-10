# Implementation Plan: 031 Palmarés histórico

**Branch**: `031-palmares-historico` | **Date**: 2026-11-04 | **Spec**: [spec.md](spec.md)

## Summary

Al cerrar una temporada completada se congela una entrada de palmarés
(puesto de constructores, campeón de pilotos por nombre, victorias y
podios de carrera del equipo) en la propia partida; una pantalla
"Palmarés" (menú Más) enseña totales arriba y una fila por temporada,
la reciente primero. Sin retroactividad, con estado vacío explicado.

## Technical Context

**Language/Version**: TypeScript 5.9 + Vite 7. PWA offline.

**Primary Dependencies**: ninguna nueva (principio III).

**Storage**: la entrada vive en `CareerState.palmares` (opcional →
merge a `[]` en saves viejos); slot + nube como el resto de la
partida.

**Testing**: `npm run harness` ("Palmarés check") + CDP con save
sembrado.

**Target Platform**: móvil (PWA) y escritorio.

**Constraints**: mismo lenguaje visual de la casa (tarjetas `cut`,
tabular-nums, acento del equipo); nada de librerías; español.

## Constitution Check

- I: spec leída antes de este plan ✓.
- III: sin dependencias nuevas ✓.
- IV: pantalla a pulgar, item en el menú Más existente ✓.
- V: estado vacío que explica qué aparecerá ✓ (FR-004).
- VI: nada se borra; el cierre conserva más que antes ✓.
- VII: escenarios verificables con la app en la mano ✓.
- IX: harness + verificación viva con capturas ✓.

## Goals / Non-Goals

- **Goals**: `SeasonPalmaresEntry` + `recordPalmares` + `palmaresTotals`
  (career.ts), grabación idempotente en el cierre (season-screen),
  pantalla `palmares-screen` + item "Palmarés" en Más (team-screen +
  main.ts), harness "Palmarés check".
- **Non-Goals**: puntos/dinero por temporada (opción descartada),
  detalle GP a GP, palmarés de rivales, retroactividad.

## Implementation Steps

1. **career.ts**: `SeasonPalmaresEntry {season, teamPosition,
   champion, wins, podiums}`; `CareerState.palmares?` (merge a `[]`);
   `recordPalmares(career, roster)` — solo si `isSeasonComplete` y no
   hay entrada de esa temporada: puesto y campeón vía
   `computeChampionship` (sobre TODO seasonResults), victorias/podios
   SOLO de resultados `event === 'race'` con sus `standings` en orden
   final (índice 0 = P1, ≤2 = podio; por coche: un 1-2 son 2 podios y
   1 victoria); `palmaresTotals(entries)` = {titles, wins, podiums}.
2. **season-screen.ts**: en "Empezar temporada nueva", ANTES de
   reiniciar: `recordPalmares(career, roster)` (la pantalla ya carga
   el roster para 029; si faltara, `loadRoster()`). `saveCareer` ya
   existe en ese handler → la entrada viaja al slot y a la nube.
3. **src/palmares-screen.ts + css**: `createPalmaresScreen(container,
   onBack)` al estilo slots-screen (header con tema + "Mi Equipo");
   tarjeta de totales (Campeonatos · Victorias · Podios) y filas por
   temporada (desc), la P1 destacada con el acento; vacío → mensaje
   que explica qué aparecerá (FR-004).
4. **team-screen.ts + main.ts**: item "Palmarés" en el menú Más
   (callback `onGoPalmares`) y `showPalmaresScreen` con `swapScreen`.
5. **test-harness.ts**: "Palmarés check" — calendario de 2 rondas con
   standings sintéticos (P1+P3 en carrera 1, P5+P6 en carrera 2, una
   sprint con P1 que NO cuenta): puesto, campeón, 1 victoria/2 podios,
   idempotencia (segunda llamada no duplica), totales correctos, y
   saves sin `palmares` migran a `[]`.
6. **Build + harness** + regresión.
7. **Verificación en vivo**: save con temporada completa sembrada
   (10 victorias/20 podios de mis coches, mi piloto campeón) →
   resumen → "Empezar temporada nueva" → Más → Palmarés con totales y
   fila; partida nueva → Palmarés con estado vacío; consola limpia;
   capturas.
8. Requisitos y tareas [x], commit.

## Test Strategy

- Harness determinista con standings sintéticos (sprint excluido,
  idempotencia, totales).
- CDP con save sembrado (temporada completa) y partida limpia.

## Milestones / Dependencies

1 commit. Base: `3da29b5` (030). Depende de 005/013 (temporada/slots)
y 029 (cierre en season-screen).
