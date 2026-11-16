# Data Model: «Carbono» en toda la app

**Sin datos nuevos del juego.** Motor, economía, guardado (slots/
nube), roster y tipos intactos. Este documento fija el contrato
VISUAL que la feature introduce: la capa de tokens global, los
canales de color con regla de uso y el mapeo de los nombres viejos.

## 1 · Tokens del mundo (capa global, `src/ui.css`)

Fuente de verdad: DESIGN.md (spec 032). Suben a `:root` y
`:root[data-theme='light']`.

| Token | Oscuro | Claro | Uso |
| --- | --- | --- | --- |
| `--hub-bg` | `#0E0F11` | `#EDEFE9` | suelo de TODA la app |
| `--hub-panel` | `#141519` | `#F7F8F4` | módulos enmarcados |
| `--hub-mast-bg` | rgba(14,15,17,.92) | rgba(237,239,233,.94) | mástil/cabeceras sobre la rejilla |
| `--hub-line` | `#262932` | `#B9BFAE` | marcos 1px, hairlines |
| `--hub-line-soft` | `#1C1E23` | `#DDE0D5` | separadores internos, materia del jugador |
| `--hub-text` | `#F2F3F5` | `#16181C` | toda tinta (texto y dato) |
| `--hub-dim` | `#9BA0AA` | `#5B6068` | labels, atenuados |
| `--hub-grid` / `--hub-grid-minor` | rgba(235,240,255,.085/.035) | rgba(22,24,28,.1/.045) | trama 16/80 del shell (`--hub-grid-image`/`--hub-grid-size`) |
| `--hub-action` | `#D6FF3F` | `#CDF630` | fondo de acción (LEY) |
| `--hub-action-ink` | `#101114` | `#101114` | tinta sobre volt |
| `--hub-action-line` | `#D6FF3F` | `#7D9000` | borde/foco de acción |
| `--hub-mono` | pila mono tabular (igual en claro) | | toda cifra (también `--font-display` reapuntado) |

Reglas de uso (leyes del mundo, DESIGN.md): Ley del Volt (acción/
activo/foco EXCLUSIVAMENTE), El Dato es Tinta + La Cifra es Mono,
The Grid Stays On, La Mesa Plana (sombra solo a lo que flota),
radio 0 (excepciones: círculos-dato y el gantry físico).

## 2 · Canales de color con regla

| Canal | Naturaleza | Escritor | Consumidores legítimos |
| --- | --- | --- | --- |
| `--hub-volt*` | ACCIÓN (fijo) | tokens | botones primarios, activo, foco |
| `--livery` | DATO crudo | `livery.ts` ← color del equipo | chips/puntos con borde (ya inline hoy) |
| `--livery-line` | DATO con guarda | `livery.ts` (mezcla hacia tinta si no contrasta) | líneas del gráfico de ritmo (`pc-line`/`pc-dot`) |
| `--green/--amber/--red` | SEMÁFORA (significado) | tokens | avisos, desgaste, banderas, deltas (siempre con forma/signo) |
| `--tyre-*`, `--track-*`, `--car-outline` | CONTENIDO del deporte | tokens | gomas, trazado, coches — intactos |

`--accent*` DESAPARECE del cromo: 0 consumidores al cerrar (grep de
verificación en tareas).

## 3 · Mapeo de nombres viejos (alias en ui.css)

| Viejo | Destino oscuro | Destino claro |
| --- | --- | --- |
| `--bg` | `--hub-ground` | `--hub-ground` |
| `--panel` | `--hub-panel` | `--hub-panel` |
| `--panel-2` | `--hub-ground` + hairline contextual | ídem |
| `--input-bg` | transparente | transparente |
| `--border` | `--hub-line` | `--hub-line` |
| `--border-2` | `--hub-line` (fortalecida a `--hub-text` solo donde era foco) | ídem |
| `--text` / `--dim` | `--hub-text` / `--hub-dim` | ídem |
| `--btn-bg` / `--btn-hover` | transparente / `--hub-line-soft` | ídem |
| `--radius-touch` / `--radius-data` | `0` | `0` |
| `--cut` | clase `.cut` inerte (sin clip-path) | ídem |
| `--font-display` | pila `--hub-mono` (Barlow retirada) | ídem |
| `--accent*` | ELIMINADO del cromo; dato por `--livery*` | ídem |

## 4 · Entidades de producto afectadas

Ninguna. Las pantallas conservan sus clases y su markup (los cambios
de TS son: llamada de librea en `main.ts`/`team-screen.ts` y, solo
si la validación lo pide, ajuste puntual en `race-screen.ts`).
