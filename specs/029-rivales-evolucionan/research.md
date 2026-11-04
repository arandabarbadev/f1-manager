# Research: 029 Rivales evolucionan

## Dónde viven las stats rivales

`Roster.entries[i].cars[]` (aero/engine/chassis/reliability, 55-95 al
generarse en `generateRivalEntry`). El builder de carrera las usa tal
cual (`race-builder.ts`: solo el equipo del jugador recibe bonuses) →
mejorar el roster mejora al rival en la temporada siguiente SIN tocar
el motor. "No cambia nada dentro de una carrera" ✓ gratis.

## Punto de aplicación: el resumen de temporada

`season-screen.ts` se abre con la temporada completa
(`isSeasonComplete`); su botón "Empezar temporada nueva" hace el
rollo (seasonNumber+1, resultados a 0). La evolución se aplica AL
ABRIR el resumen (una vez por temporada, marcador en el roster) y el
resumen muestra el top 3 de progresión — el usuario VE por qué la
próxima temporada cuesta más antes de arrancarla.

## Idempotencia y versionado

- `Roster.version: 1` → `2` + `rivalEvolvedThroughSeason: number`
  (última temporada cuyo cierre ya evolucionó). v1 se migra en
  `loadRoster` (marcador a 0: su PRÓXIMO cierre evoluciona — nada
  retroactivo) sin tocar nada más. `saveRoster` escribe v2.
- El marcador se compara con `career.seasonNumber`: idempotente aunque
  el usuario reabra el resumen o recargue.
- Nube: `cloud.ts` sincroniza el roster por slot COMO CADENA — v2
  viaja sin cambios; cada slot evoluciona por separado. ✓

## Constantes (calibradas en el harness)

- `RIVAL_STAT_CAP = 92` — por debajo del tope de desarrollo del
  jugador (95): invertir siempre puede más.
- Base por stat: 1,6 puntos-bruto × `rivalGrowth` × tendencia
  (0,3 el más fuerte … 1,0 el más atrás, ranking por rating medio) ×
  ruido 0,75-1,25; redondeo y techo. En normal un equipo gana ~+4-6
  totales por temporada (2 coches × 4 stats); en difícil ~+7-10; en
  fácil ~+2-3.
- `rivalGrowth` en DIFFICULTY_PRESETS: fácil 0,5 · normal 1,0 ·
  difícil 1,6.

## Motor y economía intactos

`buildRaceStateFromRoster` y `simulationTick` sin cambios: con el
mismo roster, misma carrera (lo exige el spec y lo cubre la carrera de
regresión del harness). El precio de que los rivales crezcan es que el
JUGADOR también puede (sus dev llegan a 95 > 92).

## De paso (deuda de 027)

El resumen de temporada tiene el ÚNICO contador animado del juego
(`.count-total`, rAF 1,6 s). 027 documentó "no hay contadores" — mal.
Se corrige aquí: con `prefers-reduced-motion` pinta el valor final
directo.
