# Feature Specification: Entrenar de 5 en 5

**Feature Branch**: `030-entrenar-de-cinco-en-cinco`

**Created**: 2026-11-04

**Status**: Draft

**Input**: User description: "La mejora de los pilotos sube de 1 en 1 y quiero que suba de 5 en 5. Cada compra suma 5 puntos al atributo (ritmo, habilidad, reflejos, experiencia) y cuesta exactamente lo que cuestan los 5 pasos individuales siguientes: misma economía, menos pulsaciones. Cerca del tope de 95 solo se compran (y se cobran) los puntos que falten. El desarrollo del coche no cambia."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Un toque, cinco puntos (Priority: P1)

En la pestaña Pilotos, cada atributo (ritmo, habilidad, reflejos,
experiencia) mejora de golpe en bloques de 5 puntos con una sola
pulsación. Subir un atributo de 50 a 90 pasa de 40 pulsaciones a 8.

**Why this priority**: es la petición; hoy entrenar es un martilleo de
botones que desanima.

**Independent Test**: entrar en Pilotos, pulsar una vez una mejora y
ver el atributo +5 y el val moviéndose; el botón anuncia "+5" y su
precio.

**Acceptance Scenarios**:

1. **Given** un piloto con ritmo 60, **When** pulso su mejora,
   **Then** el ritmo pasa a 65 y se me cobra exactamente lo que
   costaban las 5 subidas individuales siguientes seguidas.
2. **Given** el mismo estado y dinero, **When** entreno con este cambio
   y comparo con comprar 5 veces de 1 en 1 como antes, **Then** el
   dinero gastado y el resultado final son idénticos: nadie paga más
   por ir rápido.
3. **Given** un atributo a 93 (tope 95), **When** pulso la mejora,
   **Then** sube solo a 95 y se me cobran solo los 2 puntos que
   faltaban; el botón dice "+2".
4. **Given** un atributo a 95, **Then** el botón muestra MÁX y no se
   puede pulsar (como hoy).

### User Story 2 - Lo demás como está (Priority: P2)

El desarrollo del COCHE sigue igual (+1 por compra con su precio
actual), los rivales no cambian, y las partidas guardadas siguen
funcionando sin migración: el historial de entrenamientos ya comprados
mantiene el precio de la siguiente mejora donde lo dejó.

**Acceptance Scenarios**:

1. **Given** un piloto con 3 entrenamientos ya comprados en reflejos,
   **When** abro Pilotos, **Then** el precio del bloque refleja esos 3
   pasos previos (sigue la misma curva, sin reinicios ni saltos).
2. **Given** la pestaña de desarrollo del coche, **When** miro los
   botones, **Then** siguen siendo +1 con su precio de siempre.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Cada mejora de piloto compra un bloque de 5 puntos del
  atributo elegido en una sola pulsación; el botón anuncia el tamaño
  del bloque y su precio total antes de pulsar.
- **FR-002**: Precio del bloque = suma exacta de los precios de los
  pasos individuales que lo componen (la economía por punto no cambia;
  los descuentos de ingenieros siguen sin aplicarse, como hoy).
- **FR-003**: Cerca del tope (95), el bloque se recorta a los puntos
  que falten (+4, +3, +2 o +1) y solo se cobran esos pasos; en el tope
  el botón queda en MÁX y deshabilitado.
- **FR-004**: Si el dinero no llega para el bloque completo, el botón
  queda deshabilitado (no hay compras parciales por falta de dinero).
- **FR-005**: El desarrollo del coche, los rivales y el resto del
  juego no cambian; las partidas guardadas cargan tal cual, sin
  migración ni pérdidas.

## Success Criteria *(mandatory)*

- **SC-001**: Una pulsación sube el atributo exactamente +5 (o lo que
  falte hasta 95) y el val se recalcula.
- **SC-002**: El precio del bloque de 5 es exactamente la suma de los
  5 pasos siguientes; comprar al borde del tope cobra solo lo que
  sobra.
- **SC-003**: Partida existente: el precio continúa la curva anterior
  donde la dejó cada piloto.
- **SC-004**: Harness "Pilotos check" actualizado (bloques +5, borde
  del tope, economía idéntica a 5 compras de 1) + verificación en vivo
  en la pestaña Pilotos.

## Assumptions

- "De 5 en 5" sustituye al +1 (no conviven dos botones); si se quiere
  afinar un punto suelto, el propio bloque recortado del borde lo
  permite al final de la progresión.
- La valoración (val) sigue siendo la media de los cuatro atributos.
- Fuera de alcance: cambiar precios, el desarrollo del coche, o la
  progresión de pilotos rivales.
