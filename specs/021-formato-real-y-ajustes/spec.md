# Feature Specification: Formato de fin de semana real y ajustes

**Feature Branch**: `021-formato-real-y-ajustes`

**Created**: 2026-10-31

**Status**: Draft

**Input**: User description: "Que la sprint no sea en todas las carreras, que sea en las que en la vida real hay. Que las mejoras del coche no suban tanto el precio, que suban 3 o 4 millones. Que en el menú principal abajo solo salga la carrera."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Sprints solo donde hay sprints (Priority: P1)

El fin de semana es quali → carrera en casi todas las rondas; las dos
sprints solo existen en las rondas que en el mundo real las celebran.
El botón de carrera refleja siempre el acto que toca y el campeonato
suma puntos como siempre (las sprints puntúan donde se corren).

**Why this priority**: pedido directo; cambia el ritmo del juego entero.

**Independent Test**: recorrer el calendario: solo en las rondas sprint
aparecen "Sprint 1/2" como actos pendientes; el resto va de
Clasificación a Carrera. Partidas guardadas siguen funcionando.

**Acceptance Scenarios**:

1. **Given** una ronda SIN sprint, **When** termino la clasificación,
   **Then** el acto pendiente es la Carrera (no hay sprints).
2. **Given** una ronda CON sprint, **When** termino la clasificación,
   **Then** siguen Sprint 1 y Sprint 2 antes de la Carrera.
3. **Given** una partida guardada, **When** la cargo, **Then** el
   avance y los puntos ya ganados se conservan.

---

### User Story 2 - Mejorar el coche cuesta menos escalar (Priority: P2)

Cada nivel de desarrollo del coche sube el precio solo 3-4 M€ respecto
al anterior (hoy sube 15 M€ por nivel y llega a 225 M€ el último).

**Why this priority**: economía de 009 demasiado punitiva en mejoras.

**Independent Test**: comprar niveles consecutivos y ver el precio
subir 4 M€ cada vez (15, 19, 23…).

**Acceptance Scenarios**:

1. **Given** una categoría a nivel 0, **When** miro el botón, **Then**
   cuesta 15 M€; tras comprarla, la siguiente cuesta 19 M€.

---

### User Story 3 - Abajo, solo la carrera (Priority: P2)

En el móvil, la barra inferior fija del menú principal muestra SOLO el
botón de Carrera (la acción principal, a pulgar). Las secciones se
cambian arriba (pestañas horizontales) y desde el resumen del equipo.

**Why this priority**: la barra compartía protagonismo entre 6 pestañas
y Carrera; Rafa quiere abajo solo lo principal.

**Independent Test**: en móvil, abajo solo Carrera; arriba puedo
cambiar de sección; en escritorio el raíl lateral no cambia.

**Acceptance Scenarios**:

1. **Given** el menú principal en móvil, **When** miro la barra inferior
   fija, **Then** solo contiene el botón de Carrera.
2. **Given** el mismo menú, **When** quiero ir a Pilotos, **Then** lo
   toco en las pestañas de arriba o en el resumen.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Solo las rondas que en la realidad celebran sprint (de
  las presentes en el juego: Miami, Spa, Austin e Interlagos) tienen
  Sprint 1 y Sprint 2 en su fin de semana; el resto pasa de
  clasificación a carrera. El acto pendiente, la parrilla encadenada y
  los puntos se derivan como siempre.
- **FR-002**: El coste del siguiente nivel de desarrollo sube 4 M€ por
  nivel (15, 19, 23… M€); el descuento de ingenieros se sigue aplicando.
- **FR-003**: En móvil, la barra inferior fija del menú principal
  contiene únicamente la acción de Carrera; las pestañas de sección van
  arriba (fila horizontal) y el raíl lateral de escritorio no cambia.

## Success Criteria *(mandatory)*

- **SC-001**: En una vuelta completa al calendario, solo las 4 rondas
  sprint piden sprints (verificable por harness y en vivo).
- **SC-002**: Nivel 1 de un desarrollo = 15 M€, nivel 2 = 19 M€, nivel
  3 = 23 M€ (harness).
- **SC-003**: En móvil a 390 px, la barra inferior contiene un solo
  botón (Carrera) y las pestañas quedan arriba (verificación viva).

## Assumptions

- "Las que en la vida real hay" = las sedes de sprint del calendario
  real presentes en el juego: Miami, Spa, Austin e Interlagos (las
  otras dos sedes reales, Shanghái y Lusail, no están en el juego).
- Resultados de sprint ya guardados en rondas que dejan de ser sprint
  se conservan (puntos ya ganados, como en migraciones anteriores).
- Las mejoras de PILOTOS (019) no cambian: el pedido es del coche.
