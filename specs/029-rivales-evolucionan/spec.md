# Feature Specification: Rivales evolucionan

**Feature Branch**: `029-rivales-evolucionan`

**Created**: 2026-11-03

**Status**: Draft

**Input**: User description: "Mis rivales no evolucionan nunca: sus coches se quedan como se generaron mientras el mío mejora con mi dinero. Tras unas pocas temporadas los supero a todos y la carrera pierde tensión. Quiero que la competencia siga mi ritmo. — Al cerrar cada temporada, los coches de los equipos rivales mejoran un poco. Nunca se disparan ni salen del rango en el que juega el resto de la parrilla. Cuánto mejoran depende de la dificultad de mi partida: en fácil mejoran poco, en difícil me siguen de cerca. Ningún rival llega a ser tan bueno como lo máximo que puede alcanzar mi coche, para que seguir invirtiendo merezca la pena. Al empezar la temporada nueva veo qué equipos han mejorado más, para entender por qué el juego se ha puesto más difícil. No toca mi coche ni mis pilotos, y no cambia nada dentro de una carrera. Mis partidas guardadas siguen funcionando con todo lo que tienen. La evolución empieza en el siguiente cierre de temporada, no se aplica con efecto retroactivo. Cada partida evoluciona por separado, y si juego con la misma cuenta en otro dispositivo veo los mismos coches rivales. Hecho cuando: juego dos temporadas seguidas y varios rivales tienen mejores coches que al empezar; comparando una partida en fácil y otra en difícil, la mejora de los rivales es distinta; al empezar la segunda temporada veo qué equipos han progresado más; cargo una partida creada antes de este cambio y no pierdo dinero, resultados ni progreso; con el mismo estado de los coches, una carrera se comporta igual que antes, con la aleatoriedad fijada para pruebas. Fuera de alcance: edad y progresión de pilotos, fichajes, cambios en el motor, nuevos tipos de mejora."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - La parrilla no se queda quieta (Priority: P1)

Al cerrar cada temporada, los 9 equipos rivales mejoran un poco sus
coches (aero/motor/chasis/fiabilidad de sus dos monoplazas). El
incremento es pequeño, con tendencia: quien va más atrás empuja un poco
más (la parrilla converge, como el campeonato real), y el conjunto
escala con la dificultad (fácil poco, normal, difícil al acecho).

**Why this priority**: sin esto, dos temporadas y adiós tensión.

**Independent Test**: jugar/cerrar dos temporadas y mirar Rivales:
varios equipos con mejores stats que al principio.

**Acceptance Scenarios**:

1. **Given** la temporada N completada, **When** abro su resumen,
   **Then** los rivales evolucionan UNA sola vez y el resumen me enseña
   qué equipos han progresado más.
2. **Given** fácil vs difícil, **When** comparo varias temporadas,
   **Then** en difícil los rivales mejoran claramente más.
3. **Given** muchas temporadas, **Then** ningún stat rival pasa del
   techo (92, por debajo del tope de desarrollo del jugador, 95) —
   invertir siempre merece la pena.
4. **Given** mi equipo, **Then** MI coche y MIS pilotos no cambian un
   ápice por esta función (ni dentro de una carrera cambia nada).

### User Story 2 - Saves, nube y día uno (Priority: P1)

Las partidas guardadas siguen funcionando (dinero, resultados,
progreso intactos); la evolución se aplica en el SIGUIENTE cierre, sin
retroactividad; cada slot evoluciona por separado y el roster viaja a
la nube tal cual (misma cuenta, mismos rivales).

**Acceptance Scenarios**:

1. **Given** una partida creada antes de este cambio, **When** la
   abro, **Then** todo está y funciona (roster migrado a v2).
2. **Given** el roster en la nube, **When** juego en otro dispositivo,
   **Then** veo los mismos rivales (el roster ya viaja entero).
3. **Given** el mismo estado de coches, **When** corro una carrera con
   la aleatoriedad fijada, **Then** se comporta igual que antes.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: `evolveRivals(roster, growth)`: por equipo RIVAL, +pequeño
  incremento en aero/motor/chasis/fiabilidad de sus coches, con
  tendencia (más atrás → empuja más) y variación aleatoria; techo 92
  (nunca el tope del jugador, 95); el equipo del jugador intacto.
- **FR-002**: Aplicación en el CIERRE de temporada (resumen con la
  temporada completada), idempotente por temporada (marcador
  `rivalEvolvedThroughSeason`); nunca retroactiva.
- **FR-003**: Escalado por dificultad: `rivalGrowth` en los presets de
  difficulty.ts (fácil 0,5 · normal 1,0 · difícil 1,6).
- **FR-004**: El resumen de temporada muestra los equipos que más han
  mejorado (top 3 con su +total) — entender por qué cuesta más.
- **FR-005**: Roster versionado a v2 con migración transparente de v1
  (sin tocar nada más); guardado y nube como siempre; cada slot por
  separado.

## Success Criteria *(mandatory)*

- **SC-001**: Dos cierres seguidos: varios rivales mejoran; mi equipo
  idéntico; nunca por encima de 92.
- **SC-002**: Con la misma secuencia aleatoria, total ganado en
  difícil > normal > fácil.
- **SC-003**: El resumen muestra el top 3 de progresión tras evolucionar.
- **SC-004**: Partida v1 migrada: carga sin perder nada y evoluciona en
  su siguiente cierre.
- **SC-005**: Harness "Rivales check" (varias temporadas simuladas,
  techo, escalado, jugador intacto) + verificación en vivo.

## Assumptions

- "Mejorar los coches" = las 4 stats de los chasis rivales; los
  pilotos rivales no cambian (fuera de alcance la progresión de
  pilotos).
- La comparación fácil/difícil es sobre el MISMO fondo aleatorio (el
  harness fija `Math.random`).
