# Data Model: 031 Palmarés histórico

## Entidades

- **SeasonPalmaresEntry** (una por temporada cerrada; vive en
  `CareerState.palmares: SeasonPalmaresEntry[]`, opcional → `[]` en
  saves viejos):
  - `season: number` — número de temporada cerrada.
  - `teamPosition: number` — puesto del equipo del jugador en la
    tabla de constructores de esa temporada (1-10; 0 = sin tabla
    disponible, se pinta "—").
  - `champion: string` — nombre del campeón de pilotos congelado al
    cierre ('' → "—").
  - `wins: number` — carreras ganadas por cualquiera de los dos
    coches del equipo.
  - `podiums: number` — coches del equipo en podio (hasta 2 por
    carrera; un doblete suma 2).
  - Invariantes: solo se crea con la temporada COMPLETA; máximo una
    entrada por `season`; sprints y quali no suman.

- **Totales de carrera** (derivados en pantalla, no se guardan):
  `palmaresTotals(entries)` → `{ titles: entries con teamPosition 1,
  wins: Σ wins, podiums: Σ podiums }`.

## Reglas

- Grabación: en "Empezar temporada nueva", antes de reiniciar
  `seasonResults`; idempotente (si ya existe entrada de `season`,
  no toca nada).
- No retroactivo: saves sin `palmares` empiezan en `[]`.
- Viaja con la partida: mismo `saveCareer` + `scheduleCloudSync` del
  cierre; cada slot acumula el suyo.
