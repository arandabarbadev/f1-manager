# Feature Specification: Retransmisión en carrera

**Feature Branch**: `022-retransmision-en-carrera`

**Created**: 2026-11-01

**Status**: Draft

**Input**: User description: "Tras 019/020 la clasificación se lee como torre de tiempos, pero la carrera no cuenta una historia: empieza de golpe, no veo quién gana o pierde puestos y termina con una simple lista. Quiero tres detalles de retransmisión, solo presentación: (1) podio al terminar (con mis coches destacados y visibles sin buscar); (2) puestos ganados y perdidos en la clasificación en vivo (sin depender solo del color, sin quitar sitio a lo demás, también en móvil); (3) presentación del Gran Premio antes de las luces (nombre, vueltas y silueta; breve, saltable con un toque; mientras se muestra la carrera no ha empezado; no se pisa con la guía ni los avisos)."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Podio al terminar (Priority: P1)

Al acabar la carrera veo a los tres primeros como un podio: posición,
código, nombre y equipo (franja de color). Si uno de mis coches está,
destaca; y siempre veo en grande dónde acabaron LOS MÍOS sin buscarlos
en la lista. La lista completa, el dinero y las acciones de siempre
siguen ahí, y la acción principal se alcanza con el pulgar en móvil.
Con menos de tres clasificados (retiradas/bandera roja) el podio
muestra solo los que hay, sin huecos raros ni errores.

**Why this priority**: el final es el momento emotivo; hoy es una lista.

**Independent Test**: terminar carreras (normal, con mis coches en
top-3, con mis coches fuera, y con muchos DNF) y leer el resultado sin
scroll por la lista.

**Acceptance Scenarios**:

1. **Given** una carrera terminada con 20 clasificados, **When** miro
   el final, **Then** veo el podio P1/P2/P3 con código, nombre y color
   de equipo, y debajo mis dos coches con su P# en grande.
2. **Given** uno de mis coches en el podio, **When** miro, **Then** se
   distingue del resto (librea/realce del equipo).
3. **Given** solo 2 coches clasificados, **When** termina, **Then** el
   podio muestra 2 columnas sin romperse.

---

### User Story 2 - Puestos ganados y perdidos (Priority: P1)

En la torre en vivo, cada piloto muestra cuántos puestos ha ganado o
perdido desde la salida (▲3 / ▼2), distinguible de un vistazo SIN
depender del color (flecha + signo). Quien va donde salió no muestra
nada. Se actualiza con las posiciones y no roba sitio a posición,
código, diferencia ni goma — tampoco en móvil.

**Why this priority**: es LA historia de la carrera en directo.

**Independent Test**: en una captura de carrera, decir quién sube y
quién baja sin colores.

**Acceptance Scenarios**:

1. **Given** la salida recién dada, **When** miro la torre, **Then**
   nadie muestra delta (todos donde salieron).
2. **Given** adelantamientos, **When** se reordena, **Then** los deltas
   se actualizan: ▲ para quien sube, ▼ para quien baja, nada para
   quien mantiene.
3. **Given** el móvil a 390 px, **When** miro una fila, **Then** sigo
   viendo posición, código, diferencia y goma sin solaparse.

---

### User Story 3 - Presentación del Gran Premio (Priority: P2)

Antes de las luces, una tarjeta presenta el GP: nombre del circuito,
número de vueltas y su silueta. Dura poco (~2,5 s), se salta con un
toque, y mientras se muestra la carrera NO ha empezado (reloj parado,
coches quietos, luces sin arrancar). No se pisa con la guía de primera
vez ni con los avisos.

**Why this priority**: da contexto de retransmisión sin estorbar.

**Independent Test**: abrir un GP, ver la tarjeta, tocar y que la
secuencia de luces arranque igual que siempre.

**Acceptance Scenarios**:

1. **Given** un GP recién abierto, **When** entro, **Then** veo la
   tarjeta con nombre, vueltas y silueta y el reloj a 0.
2. **Given** la tarjeta visible, **When** toco, **Then** desaparece y
   arrancan las luces; sin tocar, arranca sola a los ~2,5 s.
3. **Given** la primera vez con guía pendiente, **When** termina la
   presentación, **Then** la guía aparece después (nunca superpuestas).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Al terminar, un podio con los tres primeros clasificados
  (posición, código, nombre, franja del equipo) SOLO con coches
  clasificados (menos de 3 si hace falta); los coches del jugador
  destacan si están, y un bloque propio muestra en grande la posición
  final de cada coche del jugador siempre; la lista, el dinero y las
  acciones de siempre se mantienen y la principal queda a pulgar.
- **FR-002**: Cada fila de la torre muestra el delta de puestos respecto
  a la salida (▲n arriba / ▼n abajo / nada si igual), con flecha y
  signo (no solo color), actualizado al cambiar posiciones, sin
  desplazar posición/código/diferencia/goma ni en móvil.
- **FR-003**: Presentación del GP antes de las luces: tarjeta con
  nombre, vueltas y silueta del circuito; ~2,5 s o salto con un toque;
  durante ella no corre el reloj, no se mueven coches ni arrancan las
  luces; la guía de primera vez y los avisos no se superponen (la guía
  se retrasa hasta el final de la presentación).
- **FR-004**: Nada de esto cambia el funcionamiento: mismas posiciones,
  paradas e incidentes con la misma aleatoriedad; texto en español; sin
  logotipos ni nombres propietarios.

## Success Criteria *(mandatory)*

- **SC-001**: Al terminar en móvil veo podio + mis coches y llego a la
  acción principal con el pulgar sin desplazarme media pantalla.
- **SC-002**: Con ≤3 clasificados el final se ve bien y no da error.
- **SC-003**: En una captura de la torre, quién sube y quién baja se
  lee sin color (flecha+signo).
- **SC-004**: Al abrir un GP aparece la tarjeta; un toque la salta y la
  carrera arranca normal; sin tocar arranca sola.
- **SC-005**: Harness sin regresiones (misma simulación).

## Assumptions

- "Clasificados" = coches con status racing al final (los DNF fuera del
  podio, como en la realidad).
- La silueta se dibuja del propio trazado del juego (canal pequeño).
- El delta se calcula contra la posición de SALIDA (parrilla), también
  tras reiniciar la carrera desde el botón.
