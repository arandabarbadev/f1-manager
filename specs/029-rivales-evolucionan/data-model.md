# Data Model: 029 Rivales evolucionan

## Roster v2

```ts
export interface Roster {
  version: 2;                       // era 1
  playerTeamId: string;
  entries: TeamEntry[];
  rivalEvolvedThroughSeason?: number; // último cierre ya evolucionado
}
```

- Creación nueva: `version: 2, rivalEvolvedThroughSeason: 0`.
- `loadRoster`: acepta v1 y v2; v1 → v2 con marcador 0 (su siguiente
  cierre evoluciona — nunca retroactivo). Nada más cambia.
- Nube: el roster viaja por slot como cadena JSON — v2 transparente.

## Evolución (roster.ts)

```ts
RIVAL_STAT_CAP = 92                 // < tope de desarrollo (95)
interface RivalGain { teamId: string; teamName: string; gain: number; }
evolveRivals(roster, growth): RivalGain[]
```

Por equipo RIVAL, por coche, por stat (aero/engine/chassis/
reliability): `+round(base × growth × tendencia × ruido)` con techo
92. Tendencia por ranking de rating medio: 0,3 (el más fuerte) … 1,0
(el último). El equipo del jugador no se toca. Devuelve las ganancias
para el resumen.

## career / motor

Sin cambios. `career.seasonNumber` solo se LEE (marcador); el motor y
la economía intactos.
