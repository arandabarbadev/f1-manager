# Feature Specification: Goma de salida

**Feature Branch**: `025-goma-de-salida`

**Created**: 2026-11-02

**Status**: Draft

**Input**: User description: "Antes de la salida, la goma de mis dos coches se sortea sola. En F1 esa es una de las decisiones clave de la estrategia, y quiero tomarla yo. (1) Antes de las luces, en carrera y en sprint, elijo con qué goma sale cada uno de mis dos coches (blanda, media o dura). (2) Cada coche viene con una goma preseleccionada: si no toco nada, la salida sigue en un solo paso y no me obliga a decidir. (3) La goma que elijo es con la que salgo, y se ve en la clasificación desde el primer segundo. (4) Los rivales siguen saliendo con la goma que les toque, como hasta ahora. (5) Con una mano en el móvil elijo y empiezo sin fricción extra. En la clasificación no hace falta elegir."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Elijo la goma de cada coche (Priority: P1)

Tras la presentación del GP y antes de las luces (solo carrera y
sprint), una tarjeta muestra mis dos coches: posición de salida,
código, nombre y tres gomas (S/M/H) por coche. Toco la goma de cada
uno y pulso Salida.

**Why this priority**: es LA decisión estratégica de la salida.

**Independent Test**: elegir blanda para uno y dura para el otro,
empezar, y leer esas gomas en la torre desde el primer segundo.

**Acceptance Scenarios**:

1. **Given** una carrera (o sprint) tras la presentación del GP,
   **When** termina la tarjeta del GP, **Then** veo la elección de
   goma de mis dos coches con una preseleccionada por coche.
2. **Given** la tarjeta de goma, **When** toco otra goma de un coche,
   **Then** la selección de ESE coche cambia y la del otro no.
3. **Given** elegida la goma, **When** pulso Salida, **Then** arranca
   la formación y la torre muestra la goma elegida desde el segundo 1.

### User Story 2 - Sin fricción si no decido (Priority: P1)

Si no toco nada, la goma preseleccionada (la que ya asignaba el
sistema) es con la que se sale: un solo paso (Salida), sin sorteos
nuevos ni decisiones obligatorias.

**Acceptance Scenarios**:

1. **Given** la tarjeta sin tocar, **When** pulso Salida, **Then** la
   carrera arranca con las gomas preseleccionadas.
2. **Given** un móvil en una mano, **When** elijo, **Then** botones
   ≥44 px y tarjeta a pulgar, sin desplazamientos laterales.

### User Story 3 - Rivales y quali intactos (Priority: P2)

Los rivales siguen con su sorteo de siempre; en calificación no
aparece la tarjeta; con la aleatoriedad fijada, solo cambian las gomas
de mis coches según mi elección.

**Acceptance Scenarios**:

1. **Given** una quali, **When** termina la presentación, **Then**
   pasan las luces directamente (sin tarjeta de goma).
2. **Given** la aleatoriedad fijada, **When** comparo antes/después,
   **Then** los rivales salen con las mismas gomas en ambos casos.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Tarjeta "Goma de salida" entre la presentación del GP y
  las luces, SOLO en carrera y sprints: por cada coche del jugador,
  posición de parrilla, código, nombre y selector S/M/H con la goma
  asignada por el sistema ya marcada.
- **FR-002**: "Salida" aplica lo marcado a MIS coches (goma nueva,
  desgaste 0, vueltas 0) y arranca la formación; sin tocar nada aplica
  la preselección (un solo paso, sin re-sorteo). Mientras la tarjeta
  está abierta la carrera está congelada (reloj 0, sin ticks).
- **FR-003**: La goma elegida se refleja en la torre desde el primer
  segundo y en "Mis boxes" como cualquier goma.
- **FR-004**: Rivales, quali, simulación, economía y guardado intactos;
  la guía de primera vez no se pisa con la tarjeta (va tras cerrarla).
- **FR-005**: "Nueva carrera" vuelve a mostrar presentación → tarjeta.

## Success Criteria *(mandatory)*

- **SC-001**: Blanda para un coche y dura para el otro se ven en la
  torre al arrancar la carrera.
- **SC-002**: Sin tocar nada: un solo paso y mismas gomas que la
  preselección.
- **SC-003**: En quali no hay tarjeta; con `Math.random` fijado los
  rivales conservan sus gomas.
- **SC-004**: Harness "Goma check" (solo cambia el coche elegido,
  desgaste 0) + resto sin regresiones.

## Assumptions

- La salida siempre es en seco (la lluvia solo llega en carrera), así
  que S/M/H cubren la elección; inter/lluvia siguen en boxes.
- "Un solo paso" = un toque en Salida, sin elegir nada obligatoriamente.
