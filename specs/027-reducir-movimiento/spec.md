# Feature Specification: Reducir movimiento

**Feature Branch**: `027-reducir-movimiento`

**Created**: 2026-11-02

**Status**: Draft

**Input**: User description: "Algunas personas se marean o se molestan con las animaciones. Quiero que el juego respete la preferencia del dispositivo de reducir el movimiento. — Si mi dispositivo la tiene activada, el juego quita el movimiento decorativo: cambios entre pantallas, contadores que suben, destellos, avisos que se deslizan, la tarjeta de presentación del GP y los resaltados al adelantar. La información es la misma: nada desaparece ni se vuelve ilegible (un contador muestra directamente su valor final, un aviso aparece sin deslizarse). La carrera sigue moviéndose con normalidad: los coches en el circuito y el reloj no se detienen, porque son contenido del juego, no decoración. Si no la tengo activada, todo se ve como antes. Si cambio la preferencia en el dispositivo, el juego la sigue sin borrar datos. Hecho cuando: activo la preferencia y recorro Mi Equipo, una carrera y los resultados: los cambios son instantáneos y no hay contadores animados ni avisos que se deslicen; con la preferencia activada la carrera se juega y se entiende igual; con la preferencia desactivada todo se ve como antes; los avisos siguen visibles el tiempo suficiente para leerlos. Fuera de alcance: ajustes propios dentro del juego, tamaño de texto y contraste."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Sin movimiento decorativo (Priority: P1)

Con "reducir movimiento" activado en el sistema, todo cambio de pantalla
es instantáneo, los avisos aparecen sin deslizarse (ni entrando ni
saliendo), no hay anillos de adelantamiento ni destellos de incidente ni
textos flotantes sobre el trazado, y no hay tarjeta de presentación del
GP: se va directo a la elección de goma o a las luces.

**Why this priority**: es la petición (mareo/molestia).

**Independent Test**: activar la preferencia y recorrer Mi Equipo →
carrera → resultados: nada se anima salvo los coches y el reloj.

**Acceptance Scenarios**:

1. **Given** la preferencia activada, **When** cambio de pantalla,
   **Then** el cambio es instantáneo (sin fundidos).
2. **Given** la preferencia activada, **When** aparece un aviso,
   **Then** se muestra en su sitio sin deslizarse y dura lo mismo.
3. **Given** la preferencia activada, **When** abro un GP, **Then** sin
   tarjeta de presentación: directa a la goma (carrera/sprint) o a las
   luces (quali). El nombre del GP y las vueltas siguen en la cabecera.
4. **Given** la preferencia activada, **When** hay adelantamientos e
   incidentes, **Then** sin anillos ni destellos ni textos flotantes en
   el trazado (el feed y los avisos siguen informando igual).

### User Story 2 - La carrera es contenido (Priority: P1)

Con la preferencia activada la carrera se juega y se entiende igual:
los coches se mueven por el circuito, el reloj corre, las luces de
salida hacen su secuencia, el desgaste y la torre funcionan.

**Acceptance Scenarios**:

1. **Given** la preferencia activada, **When** corre la carrera,
   **Then** coches, reloj, luces y torre se comportan como siempre.
2. **Given** la preferencia desactivada, **When** juego, **Then** todo
   se ve exactamente como antes (fundidos, avisos, tarjeta, resaltes).
3. **Given** cambio la preferencia con el juego abierto, **When**
   sigo jugando, **Then** el juego la sigue sin borrar nada (los avisos
   ya visibles no se recortan).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: `@media (prefers-reduced-motion: reduce)` desactiva las
  animaciones decorativas de CSS: fundidos de cambio de pantalla
  (`screen-enter/leave`), entrada deslizante de avisos (`notice-in`) y
  su salida fundida (`notice.leaving`).
- **FR-002**: `swapScreen` consulta `matchMedia('(prefers-reduced-
  motion: reduce)')`: con la preferencia activada no añade clases de
  transición (cambio instantáneo).
- **FR-003**: La pantalla de carrera respeta la preferencia EN VIVO
  (MediaQueryList consultado, no cacheado al cargar): sin tarjeta de
  presentación (directo a goma/luces, el nombre y las vueltas siguen en
  la cabecera) y sin capa de efectos (anillos de adelantamiento,
  destellos de incidente, textos flotantes).
- **FR-004**: Coches, reloj, luces de salida, torre, resultados y datos
  intactos; los avisos conservan su ttl (leíbles); preferencia
  desactivada = pixel-perfect con el comportamiento anterior.

## Success Criteria *(mandatory)*

- **SC-001**: Con `reduce` emulado: navegación sin `.screen-enter`,
  aviso con `animation-name: none`, sin `.gp-intro` visible al abrir un
  GP, y la carrera corre (reloj avanza).
- **SC-002**: Sin `reduce`: `.gp-intro` aparece, los avisos animan y
  las transiciones existen (como antes).
- **SC-003**: Alternar la preferencia con la app abierta no borra
  datos ni rompe nada (consola limpia).
- **SC-004**: Harness sin regresiones.

## Assumptions

- No existen contadores que suben (el dinero se pinta directo): si
  alguno apareciera, también deberá respetar la preferencia.
- Las luces de salida y el movimiento de los coches son contenido del
  juego (el usuario las excluye expresamente).
