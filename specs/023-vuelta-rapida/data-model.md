# Data model 023

```ts
// types.ts
export interface RaceCarState {
  ...
  lapTimeAccumSec: number; // sim seconds accumulated in the CURRENT lap
  lapInvalid: boolean;     // yellow/red seen during the current lap
}
export interface FastestLap {
  driverId: string;
  lapTimeSec: number; // precise (interpolated), NOT a tick multiple
  lapNumber: number;
}
export interface RaceState {
  ...
  fastestLap: FastestLap | null;
}
export interface RaceEvent {
  type: 'overtake' | 'pitEntry' | 'incident' | 'fastestLap';
  ...
}
```

Inicialización (`race-builder.ts`): `lapTimeAccumSec: 0`,
`lapInvalid: false` por coche; `fastestLap: null` por carrera.

Regla de reemplazo: `lapTimeSec < actual.lapTimeSec` (estricto).
Válida: `!lapInvalid && state.flag === 'green' && !pendingPits.has(id)`.

Pantalla: `.fastest-lap` (chip junto a la torre), `.standing-row.vl`
(portador), `.results-fl` (panel final); aviso info por mejora.
