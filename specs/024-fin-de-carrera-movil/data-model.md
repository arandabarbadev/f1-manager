# Data Model: 024 Fin de carrera a pulgar en móvil

## Sin cambios de datos

Ni `localStorage`, ni Firebase, ni tipos (`src/types.ts`), ni simulación.

## Cambios de DOM (race-screen.ts)

- Antes: `.track-wrap` contenía `canvas.track-canvas`,
  `.start-lights`, `.gp-intro`, `.flag-indicator`, `.results-overlay`.
- Después: `.gp-intro` y `.results-overlay` pasan a ser hijos directos
  de `.race-screen` (tras `.race-body`). `.start-lights` y
  `.flag-indicator` se quedan en `.track-wrap` (señalan el trazado).
- Todos los queries siguen siendo por clase desde `root` → sin cambios
  de selectores.

## Capas (z-index dentro de `.race-screen`, ahora `position: relative`)

| Capa | z | Motivo |
|---|---|---|
| HUD / trazado | — | Contenido base |
| `.results-overlay` | 30 | Encima de todo el contenido, debajo de avisos |
| `.gp-intro` | 35 | Nunca simultáneo con resultados |
| notices (017) | 40 | Los avisos siguen visibles sobre el dim |
| `.guide-card` (008) | 60 | Se retira al mostrar resultados (TS) |
