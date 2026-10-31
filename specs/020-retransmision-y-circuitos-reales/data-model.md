# Data model 020

## Sin cambios de esquema persistido

Nada nuevo que guardar: los códigos se derivan al vuelo y Miami es un
circuito más del calendario (la migración de `loadCareer` ya reconstruye
el calendario desde ALL_TRACKS, filtra resultados de rondas retiradas y
reordena — funciona igual con 21).

## Nueva función pura: `src/driver-codes.ts`

```ts
// Código de 3 letras del apellido (A-Z, sin acentos); colisiones
// resueltas en orden de roster: última letra A-Z, luego la media.
export function driverCodeBase(name: string): string;          // base sin desempate
export function assignDriverCodes(roster: Roster): Map<string, string>;
```

Reglas:
- Palabras del nombre de derecha a izquierda buscando la primera con
  letras ASCII; base = sus 3 primeras letras en mayúsculas (rellenando
  con las letras siguientes del nombre completo si faltan).
- Desempate determinista en orden de roster (jugador primero, rivales
  por índice): candidatos = base con última letra recorrida A-Z y luego
  letra media A-Z; se toma el primero no usado.
- Entrada: el roster completo (20 pilotos) → códigos únicos garantizados
  por construcción, también tras renombrar o regenerar rivales.

## Calendario: 21 rondas

- `data/f1-circuits/us-2022.geojson` NUEVO: geometría de "Miami
  International Autodrome" extraída de `f1-circuits.geojson` del repo
  fuente (verificado que existe).
- `tools/convert-layouts.js` CALENDAR: + `['us-2022', 'Miami']` en
  posición de calendario real (tras Yeda, antes de Bakú).
- `src/tracks-generator.ts` TRACK_PROFILES: entrada de Miami ALINEADA
  POR ÍNDICE con CALENDAR (mismo cuidado que en 018): 57 vueltas,
  degradación media-alta (trazado lento y hormigón), pits ~20 s.
- `src/slots.ts`: rounds del resumen 20 → 21.
- `career.loadCareer`: sin cambios (ya re-mapea y reordena).

## Trazados reales

- `generateTrack`: `const path = normalizeIntoMargin(smooth);` (fuera
  `declash`). La función `declash` se mantiene exportada (la usa el
  harness de 018 como referencia) pero deja de llamarse.
- `src/real-layouts.ts`: regenerado con Miami (21 bloques).

## Contrato UI (DOM) de la torre

```
li.standing-row[.player|.no-tyre|.dnf]  (title = "Nombre completo · dorsal")
  ├─ span.pos          "3"            (Barlow Condensed 700)
  ├─ span.stripe       franja color equipo (style.background)
  ├─ span.code         "VER"          (3 letras mayúsculas, 700)
  ├─ span.gap          "+1.4s | +1L | líder | DNF"
  ├─ span.tyre-ico◯    anillo + letra (solo jugador; rivales oculto)
  ├─ span.wear > .wear-fill            (solo jugador)
  └─ span.pitflag      "BOX 5s"
```

## Contrato UI del icono de goma

`span.tyre-ico.<compound>`: círculo con `border-color: var(--tyre-*)` y
la letra del compuesto dentro. En Mis boxes: mismo icono + % + barra.
Botones de compuesto: icono + nada más.

## Contrato UI de Mi Equipo

- `div.team-hero`: franja librea (`--accent`), nombre, dinero grande
  (Barlow 700 tabular), "P4 constructores" | "Sin correr aún", botón
  Carrera (el del header sigue; el hero añade uno grande).
- `.nav-tabs`: barra inferior fija ≤860px; raíl lateral >860px.
- `.more-menu`: despliega Reiniciar / Salir / Instalar / Partidas.

## Reglas de validación

- Códigos: 3 letras A-Z, únicos entre los 20, deterministas por roster.
- Calendario: 21 ids únicos, Miami presente (`gp-miami`), Jerez presente.
- Fidelidad: path publicado a < 0,01 de distancia media del layout real
  normalizado (sin deformación).
