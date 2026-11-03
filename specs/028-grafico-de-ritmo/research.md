# Research: 028 Gráfico de ritmo

## El dato ya existe (spec 023)

En `simulation.ts`, cada coche acumula `lapTimeAccumSec` y al cruzar
meta `recordLapTime()` lee el tiempo (con la interpolación de 023,
milésimas exactas). Lo que falta: RETENERLO por vuelta para los dos
coches del jugador. El motor cambia solo para OBSERVAR:

- Punto de enganche: `recordLapTime(state, car, events)` — se llama
  una vez por vuelta completada por cada coche. Ahí, si
  `car.isPlayerControlled`, se apunta en `state.playerLaps[driverId]`:
  `{ lap, lapTimeSec, compound, pitted, flag }`.
  - `pitted` = la vuelta acaba en boxes: `pendingPits.has(driverId)`
    (mismo criterio de invalidez de la VL 023).
  - `flag` = `car.lapInvalid` (bandera ≠ verde en algún momento de la
    vuelta).
  - `compound` = `car.tyre.compound` en el cruce (la goma con la que
    corrió esa vuelta).
- `RaceState.playerLaps: Record<string, PlayerLapEntry[]>` + init
  `{}` en `race-builder.ts`. RaceState nunca se persiste → "no se
  guarda en la partida" es gratis.
- Defensivo `state.playerLaps ??= {}` para estados construidos a mano
  (harness/micro-carreras).

## El gráfico

- **SVG generado como string** en un módulo puro nuevo
  (`src/pace-chart.ts`): testable en harness SIN DOM y renderizable
  con innerHTML. Sin librerías (principio III).
- `chartScale(entriesList)`: min/max SOLO de vueltas limpias
  (`!pitted && !flag`), con colchón del 3 % del rango (o 1 s si todo
  igual). Los puntos marcados se dibujan ACOTADOS a la escala
  (clamp) — nunca la estiran.
- `buildPaceChart(series)`: devuelve el SVG. Ejes: X = vuelta,
  Y = tiempo INVERTIDO (rápido arriba, convención de cronometraje).
  3 líneas de rejilla con etiquetas `m:ss.t`; etiquetas X cada 5
  vueltas (o todas si hay pocas).
- Dos series, MISMO color (acento del equipo): A = línea continua +
  marcadores ○; B = línea discontinua (`stroke-dasharray`) +
  marcadores ■. La leyenda lo explica con los códigos (020) — nunca
  por color. Puntos marcados: huecos (fill panel) + la goma siguiente
  anotada (`→S`) sobre el punto de parada.
- `viewBox="0 0 320 180"` + `width: 100%`: se adapta al panel
  (móvil 390 px sin scroll lateral).

## Ubicación en el panel final

Botón `.chart-toggle` tras la línea de vuelta rápida (023); al pulsar,
el SVG entra entre esa línea y la lista de resultados. Se construye
BAJO DEMANDA (no en el award): "mostrar el gráfico no retrasa los
resultados". Solo carrera/sprint (quali sin botón — la spec lo dice).

## Verificación con paradas reales

Los coches del jugador no hacen paradas por IA (solo órdenes manuales):
en la verificación viva se ordenan dos paradas desde "Mis boxes"
(botones `.pit-box .pit-btn`) en un sprint de Miami sembrado, para
tener parada + goma distinta por piloto en ~1 minuto real a 20x.
