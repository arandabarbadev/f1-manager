# Feature Specification: Palmarés histórico

**Feature Branch**: `031-palmares-historico`

**Created**: 2026-11-04

**Status**: Draft

**Input**: User description: "Hoy, al empezar una temporada nueva, todo lo de la anterior se pierde. Quiero un palmarés histórico: al cerrar cada temporada queda guardado un resumen esencial —mi puesto de constructores, el campeón de pilotos de esa temporada, y mis victorias y podios— y una pantalla de palmarés (accesible desde el menú Más) lo enseña por temporada con los totales de la carrera arriba (campeonatos ganados, victorias y podios acumulados). Las partidas existentes no pierden nada; el historial empieza a acumularse desde el primer cierre con este cambio, sin retroactividad. Viaja con la partida (slot y nube). Si aún no hay temporadas cerradas, la pantalla explica qué aparecerá. Decisión de Rafa: contenido esencial con totales (sin puntos ni dinero por temporada)."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Nada se pierde al cerrar (Priority: P1)

Al pulsar "Empezar temporada nueva" con la temporada completada, esa
temporada queda congelada en el historial: mi puesto de constructores,
el campeón de pilotos de ese año (nombre, tal como se llamaba al
cerrar), y las victorias y podios de MIS coches en carreras.

**Why this priority**: es el corazón de la petición; hoy el cierre
borra la memoria del juego.

**Independent Test**: cerrar una temporada y abrir Palmarés: la fila
de esa temporada existe con sus cuatro datos.

**Acceptance Scenarios**:

1. **Given** la temporada 1 completada, **When** pulso "Empezar
   temporada nueva", **Then** Palmarés muestra la fila de la
   temporada 1 con mi puesto de constructores (P#), el campeón de
   pilotos, mis victorias y mis podios.
2. **Given** una carrera de esa temporada que gané con P1 y mi otro
   coche acabó P3, **Then** esa carrera cuenta 1 victoria y 2 podios
   para el equipo (un doblete en podio suma 2 podios).
3. **Given** el campeón de pilotos, **Then** se guarda con su nombre
   del momento del cierre (si luego renombro pilotos, las filas viejas
   no cambian).
4. **Given** dos temporadas cerradas, **Then** hay dos filas y ningún
   dato de la primera cambió al cerrar la segunda.

### User Story 2 - La pantalla del palmarés (Priority: P1)

Desde el menú Más entra una pantalla "Palmarés": arriba los totales de
la carrera (campeonatos de constructores ganados, victorias y podios
acumulados) y debajo una fila por temporada cerrada, la más reciente
primero. Entiende sin explicación y se usa a pulgar.

**Acceptance Scenarios**:

1. **Given** la temporada 1 cerrada con 8 victorias y 21 podios,
   **When** abro Palmarés, **Then** los totales dicen 0 campeonatos (o
   1 si fui campeón), 8 victorias y 21 podios.
2. **Given** fui campeón de constructores (P1), **Then** el total de
   campeonatos suma 1 y la fila lo destaca.
3. **Given** una partida sin temporadas cerradas, **When** abro
   Palmarés, **Then** la pantalla explica qué aparecerá al cerrar la
   primera temporada (nunca vacía y muda).

### User Story 3 - Mi partida de siempre (Priority: P2)

Las partidas existentes cargan intactas (sin historial reconstruido:
las temporadas anteriores a este cambio no se inventan); el historial
viaja con la partida en su slot y por la nube como el resto.

**Acceptance Scenarios**:

1. **Given** una partida creada antes de este cambio, **When** la
   abro, **Then** todo está igual y su Palmarés está vacío con su
   mensaje hasta su próximo cierre.
2. **Given** la misma cuenta en otro dispositivo, **When** sincronizo,
   **Then** veo el mismo palmarés (viaja con la partida).
3. **Given** tres slots distintos, **Then** cada uno acumula su
   propio palmarés.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Al cerrar una temporada completada ("Empezar temporada
  nueva"), se guarda UNA entrada de palmarés de esa temporada: número
  de temporada, puesto de constructores del equipo del jugador,
  nombre del campeón de pilotos, victorias del equipo (carreras
  ganadas por cualquiera de sus dos coches) y podios del equipo
  (coches en el podio, hasta 2 por carrera).
- **FR-002**: El registro es idempotente por temporada (cerrar no
  duplica; reabrir el resumen no toca el historial) y no retroactivo:
  las temporadas cerradas antes de este cambio no se reconstruyen.
- **FR-003**: Pantalla "Palmarés" desde el menú Más: totales de la
  carrera arriba (campeonatos, victorias, podios) y una fila por
  temporada cerrada, la más reciente primero.
- **FR-004**: Sin temporadas cerradas, la pantalla explica qué
  aparecerá al cerrar la primera (nunca vacía y muda).
- **FR-005**: El historial vive en la partida (slot y nube como el
  resto); las partidas existentes cargan sin perder nada.
- **FR-006**: Cuentan las CARRERAS (los sprints y la clasificación no
  suman victorias ni podios); el puesto y el campeón salen de las
  tablas de la temporada completa.

## Key Entities

- **Entrada de palmarés** (por temporada cerrada): temporada, puesto
  de constructores, campeón de pilotos (nombre), victorias, podios.
- **Totales de la carrera** (derivados, no se guardan): campeonatos
  (puestos P1), victorias y podios sumados de todas las entradas.

## Success Criteria *(mandatory)*

- **SC-001**: Cerrar la temporada N crea exactamente una fila con los
  cuatro datos; el resto del cierre funciona igual que hoy (rivales
  evolucionan, temporada nueva limpia).
- **SC-002**: Los totales arriba cuadran con la suma de las filas; un
  campeonato ganado se cuenta y se destaca.
- **SC-003**: Partida vieja: nada se pierde, palmarés vacío con
  mensaje; el historial viaja con slot y nube.
- **SC-004**: Harness "Palmarés check" (cierre simulado: puesto,
  campeón, victorias/podios solo de carreras, idempotencia, totales)
  + verificación en vivo.

## Assumptions

- "Campeonatos" en los totales = campeonatos de CONSTRUCTORES del
  equipo del jugador (el campeonato de pilotos se lee en cada fila
  como dato histórico, sea o no mío).
- El nombre del campeón se congela al cierre (los renombrados
  posteriores no reescriben la historia).
- Fuera de alcance: detalle GP a GP, puntos y dinero por temporada
  (opción "con números" descartada por Rafa), palmarés de rivales.
