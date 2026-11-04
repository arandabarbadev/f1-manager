# Implementation Plan: 029 Rivales evolucionan

## Context

Los rivales nacen con stats fijas y el jugador los supera en unas
temporadas. Evolución pequeña al cierre de cada temporada, escalada
por dificultad, con techo bajo el tope del jugador y visible en el
resumen.

## Goals / Non-Goals

- **Goals**: `evolveRivals` puro + aplicación idempotente en el
  resumen + top 3 visible + roster v2 migrado + escalado por preset.
- **Non-Goals**: pilotos rivales, fichajes, motor, nuevas mejoras.

## Implementation Steps

1. **difficulty.ts**: `rivalGrowth` en el preset (0,5/1,0/1,6).
2. **roster.ts**: `RIVAL_STAT_CAP=92`, `RivalGain`, `evolveRivals(
   roster, growth)` (tendencia por ranking + ruido + techo; jugador
   intacto); `Roster.version: 2` + `rivalEvolvedThroughSeason`;
   migración v1→v2 en `loadRoster`; creación en v2.
3. **season-screen.ts**: al abrir con la temporada completa, si el
   marcador < seasonNumber → evolucionar + guardar + sincronizar;
   bloque "Los rivales no se duermen" con el top 3 (+total). De paso
   (027): el contador de premios pinta el final directo con
   reduced-motion.
4. **test-harness.ts**: "Rivales check" — con `Math.random` fijado:
   varias temporadas simuladas (ganancias > 0 en varios equipos,
   jugador intacto, techo 92 respetado, monotonía), escalado
   fácil < normal < difícil con la misma secuencia, y
   `rivalEvolvedThroughSeason` actualizado.
5. **Build + harness** (calibrar constantes si hace falta) + carrera
   de regresión intacta.
6. **Verificación en vivo**: seed de temporada completa → resumen con
   top 3 → roster v2 con marcador y stats subidas (jugador intacto) →
   "Empezar temporada nueva" → equipo normal; partida v1 migrada
   (downgrade manual del save) sigue cargando; consola limpia;
   capturas.
7. Requisitos y tareas [x], commit.

## Test Strategy

- Harness determinista multi-temporada + regresión de carrera.
- CDP con localStorage sembrado (v1 y completa).

## Milestones / Dependencies

1 commit. Base: `56c0f65` (028). Depende de 016 (presets) y 013
(slots/nube).
