# Data Model: 025 Goma de salida

## Sin cambios persistidos

Ni localStorage, ni Firebase, ni tipos nuevos. La elección vive solo
en la pantalla de carrera (DOM) y se aplica al `RaceState` en memoria.

## Cambios de código

- **race-builder.ts**: nueva export `setStartCompound(state, driverId,
  compound)` → `car.tyre = { compound, wear: 0, lapsOnTyre: 0 }` para
  ese `driverId` (no-op si no existe). El sorteo inicial NO cambia.
- **race-screen.ts**: fase `pickActive: boolean` entre intro y luces;
  overlay `.tyre-pick` con una fila por coche `isPlayerControlled`
  (posición, código de `assignDriverCodes`, nombre, S/M/H).

## Fases de la pantalla de carrera

| Fase | Desde | Hasta | Reloj |
|---|---|---|---|
| Presentación GP (022) | entrar | 2,6 s o toque | 0 (congelado) |
| **Goma de salida (025)** | fin de presentación | toque en Salida | 0 (congelado) |
| Luces (012) | Salida | luces fuera | 0 (congelado) |
| Carrera | luces fuera | bandera a cuadros | corre |

Solo carrera y sprints pasan por "Goma de salida"; la quali salta de
la presentación a las luces.
