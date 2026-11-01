# Data model 021

Sin cambios de esquema persistido. Nuevas funciones puras:

```ts
// weekend.ts
export const SPRINT_ROUND_IDS: readonly string[]; // gp-miami, gp-spa, gp-austin, gp-interlagos
export function hasSprint(trackId: string): boolean;
export function eventOrderFor(trackId: string): readonly WeekendEvent[];
// ['quali','sprint1','sprint2','race'] si hasSprint, si no ['quali','race']
// pendingEvent y gridForEvent usan eventOrderFor(trackId)
```

```ts
// roster.ts
export function devCost(currentLevel: number): number; // 15 + 4×level (antes 15×(level+1))
```

Contrato UI (team-screen): `.race-bar` con `.go-race-btn.bar-race-btn`
(móvil fija abajo, solo Carrera); `.nav-tabs .go-race-btn` solo
escritorio; en móvil `.nav-tabs` es fila horizontal arriba bajo el
header.
