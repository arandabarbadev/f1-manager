# Implementation Plan: 028 Gráfico de ritmo

## Context

El motor ya mide cada vuelta (023) pero solo conserva la vuelta rápida
global. Hay que retener el tiempo por vuelta de los dos coches del
jugador y pintarlo como gráfico legible en el móvil al terminar.

## Goals / Non-Goals

- **Goals**: registro por vuelta (observacional), SVG propio con dos
  series distinguibles sin color, marcas de parada/bandera sin romper
  la escala, sin persistencia.
- **Non-Goals**: rivales, historial, guardar datos, cambiar simulación.

## Implementation Steps

1. **types.ts**: `PlayerLapEntry { lap, lapTimeSec, compound, pitted,
   flag }`; `RaceState.playerLaps: Record<string, PlayerLapEntry[]>`.
2. **race-builder.ts**: init `playerLaps: {}`.
3. **simulation.ts**: en `recordLapTime`, apuntar la entrada para
   coches del jugador (antes del `if (!valid) return`).
4. **pace-chart.ts (nuevo, puro)**: `chartScale()` (min/max de vueltas
   limpias + colchón), `buildPaceChart(series)` → string SVG (ejes,
   rejilla, 2 series continua+○ / discontinua+■, marcados huecos con
   `→GOMA`, leyenda con códigos, clamp de marcados).
5. **race-screen.ts**: botón `.chart-toggle` (solo carrera/sprint,
   bajo demanda) + contenedor `.pace-chart`; toggle abre/cierra.
6. **race-screen.css**: `.pace-chart svg { width: 100%; height: auto; }`
   + leyenda + colores de marcados.
7. **test-harness.ts**: "Ritmo check" — micro-carrera determinista con
   los DOS coches del jugador: nº de entradas = vueltas completadas,
   tiempos plausibles, in-lap marcada como pitted, flag false, y
   `chartScale` ignora las marcadas; carrera de regresión intacta.
8. **Build + harness** verdes.
9. **Verificación en vivo**: sprint de Miami sembrado, dos paradas
   manuales (M y H), gráfico al terminar (2 series, formas distintas,
   marcas con goma, sin scroll lateral en 390, dinero intacto al
   abrir); quali sin botón; consola limpia; capturas.
10. Requisitos y tareas [x], commit.

## Test Strategy

- Harness determinista (Math.random stub) — datos y escala pura.
- CDP: flujo real con paradas ordenadas a mano.

## Milestones / Dependencies

1 commit. Base: `04121cb` (027). Depende de 023 (tiempos por vuelta)
y 024 (panel con acciones sticky).
