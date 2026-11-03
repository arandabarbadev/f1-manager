# Data Model: 028 Gráfico de ritmo

## types.ts (nuevo)

```ts
export interface PlayerLapEntry {
  lap: number;            // vuelta recién completada (1-based)
  lapTimeSec: number;     // tiempo con milésimas (interpolación 023)
  compound: TyreCompound; // goma con la que corrió esa vuelta
  pitted: boolean;        // la vuelta acabó en boxes (in-lap)
  flag: boolean;          // corrió (en parte) con bandera ≠ verde
}
```

## RaceState

`playerLaps: Record<string, PlayerLapEntry[]>` — clave `driverId`,
solo coches `isPlayerControlled`. Init `{}` en race-builder.ts.
**No se persiste** (RaceState vive en memoria; nada nuevo en
localStorage/Firebase).

## Escritura

`simulation.ts recordLapTime()`: una entrada por vuelta completada,
ANTES del filtro de validez (el gráfico muestra la realidad; la VL
sigue usando solo las limpias).

## Lectura

`pace-chart.ts` (módulo puro, sin DOM):
- `chartScale(entriesList: PlayerLapEntry[][])` → `{min, max}` con
  SOLO vueltas `!pitted && !flag` (colchón 3 % del rango o 1 s).
- `buildPaceChart(series: { code: string; entries: PlayerLapEntry[];
  dnf: boolean }[])` → string SVG (marcados con clamp a la escala).
