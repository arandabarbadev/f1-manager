# Data model 022

Sin cambios de datos persistentes ni del motor. Solo presentación:

```ts
// race-screen.ts (estado local de la pantalla)
interface IntroPhase { active: boolean; until: number; guided: boolean }
const gridStartPos: Map<string, number>; // driverId -> posición de salida
```

DOM nuevo:
- `.gp-intro > .gp-intro-card.cut`: nombre, vueltas, `.gp-intro-map`
  (canvas 240×150), "Toca para empezar".
- `.standing-row .delta` (▲n/▼n/vacío) entre código y hueco.
- `.results-panel`: `.podium` (3 `.podium-slot` P2-P1-P3) +
  `.my-results` (`.my-result` por coche del jugador) antes de
  `.results-list`.

Contratos:
- Durante `intro.active`: ningún `simulationTick`, `clockSec` a 0, luces
  sin arrancar, `advanceLights` bloqueado.
- Delta = posición de salida − posición actual (positivo = sube);
  se recalcula en cada refresco del HUD; DNF sin delta.
- Podio solo con `status === 'racing'`; 1-3 columnas según clasificados.
