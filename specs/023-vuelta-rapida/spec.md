# Feature Specification: Vuelta rápida

**Feature Branch**: `023-vuelta-rapida`

**Created**: 2026-11-01

**Status**: Draft

**Input**: User description: "Quiero ver la vuelta rápida de la carrera, como en la tele: quién la tiene y con qué tiempo en cada momento, y que se me avise cuando alguien la mejora. Cada vuelta completada queda registrada con milésimas; el portador va marcado en la clasificación en vivo y veo su tiempo; al mejorarla llega un aviso; los resultados finales dicen quién la hizo y con qué tiempo; no cuentan vueltas con parada en boxes ni vueltas con bandera amarilla o roja; a igual tiempo la conserva quien la marcó antes."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - La vuelta rápida, visible en directo (Priority: P1)

Durante la carrera sé en todo momento quién tiene la vuelta rápida y
con qué tiempo (línea propia junto a la clasificación + el portador
marcado en su fila), y cuando alguien la mejora me entero al momento
por el sistema de avisos.

**Why this priority**: es el dato en vivo que falta de la retransmisión.

**Independent Test**: correr una carrera y ver la línea "Vuelta rápida"
cambiar de piloto/tiempo, con aviso en cada mejora.

**Acceptance Scenarios**:

1. **Given** la primera vuelta válida completada, **When** se registra,
   **Then** aparece la línea de vuelta rápida (código y tiempo con
   milésimas) y la fila de su autor queda marcada.
2. **Given** una vuelta rápida vigente, **When** otro la mejora, **Then**
   el aviso llega en ese momento, la línea se actualiza y la marca de
   la fila cambia de autor.

---

### User Story 2 - Reglas de validez y precisión (Priority: P1)

Los tiempos se registran con milésimas e IGUAL de precisos a 1x que a
20x (nunca redondeados a múltiplos de la velocidad). No cuentan las
vueltas con parada en boxes ni las corridas con bandera amarilla o
roja; a tiempo igual, la conserva quien la marcó antes.

**Why this priority**: sin reglas claras el dato miente.

**Independent Test**: harness determinista con aleatoriedad fijada.

**Acceptance Scenarios**:

1. **Given** una vuelta que termina en boxes, **When** se completa,
   **Then** no puede ser vuelta rápida (aunque sea la más rápida).
2. **Given** bandera amarilla durante una vuelta, **When** se completa,
   **Then** queda excluida.
3. **Given** dos vueltas con el mismo tiempo, **Then** sigue el primero
   que la marcó (solo se reemplaza con estrictamente menor).

---

### User Story 3 - La vuelta rápida en el resultado final (Priority: P2)

Al terminar, el panel de resultados dice quién hizo la vuelta rápida y
con qué tiempo.

**Why this priority**: cierra la historia de la carrera.

**Independent Test**: terminar una carrera y leer "Vuelta rápida: código
· tiempo" en el panel.

**Acceptance Scenarios**:

1. **Given** carrera terminada con al menos una vuelta válida,
   **When** miro los resultados, **Then** veo vuelta rápida con piloto
   (código) y tiempo con milésimas.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Cada vuelta completada registra su tiempo con precisión
  de milésimas, independiente del multiplicador de velocidad (el cruce
  de meta se interpola dentro del segundo simulado).
- **FR-002**: El portador de la vuelta rápida queda marcado en la
  clasificación en vivo y su tiempo (código + m:ss.mmm) visible en una
  línea propia; cada mejora dispara un aviso inmediato (hub de avisos)
  con autor y tiempo.
- **FR-003**: Vueltas válidas: solo bandera verde, sin parada en boxes
  en esa vuelta (la vuelta que termina en boxes queda excluida); a
  igualdad, conserva la primera (reemplazo solo estrictamente menor).
- **FR-004**: El panel de resultados final muestra la vuelta rápida
  (código y tiempo).
- **FR-005**: Nada de esto altera posiciones, paradas ni incidentes
  (la progresión de la simulación es idéntica; solo se AÑADE
  contabilidad). Puntos y premios no cambian.

## Success Criteria *(mandatory)*

- **SC-001**: El tiempo de vuelta no es múltiplo del multiplicador de
  simulación (harness a 10x/20x).
- **SC-002**: Una vuelta con parada en boxes nunca es la vuelta rápida
  (harness determinista: la in-lap más rápida queda excluida y la VL es
  una vuelta posterior).
- **SC-003**: El aviso de mejora llega en el momento (verificación en
  vivo).
- **SC-004**: Los resultados muestran vuelta rápida con piloto y
  tiempo (verificación en vivo).
- **SC-005**: Harness sin regresiones: misma clasificación/pit stops
  que antes con la aleatoriedad fijada.

## Assumptions

- "Vuelta con parada en boxes" = la vuelta cuyo cruce de meta ejecuta
  la parada (la in-lap); la vuelta siguiente a la parada es válida si
  se corre en verde.
- La marca del portador usa el acento del equipo + subrayado en el
  código (no solo color: posición de la línea + texto).
- Sin vueltas válidas (carrera caótica), la línea y el dato final
  simplemente no aparecen.
