# Data Model · 032-direccion-carbono

## Sin cambios de datos

Esta feature es un rediseño visual: NO añade, modifica ni migra
ninguna entidad persistida. Guardado (slot localStorage + Firebase),
migraciones y nube quedan intactos (FR-010).

## Entidades existentes que el hub lee (solo lectura, como hoy)

- **Roster** (`src/roster.ts`): equipo del jugador (nombre, color de
  librea, presupuesto-base), 2 pilotos (nombre, dorsal, atributos),
  9 desarrollos del coche con nivel 0-15, 9 equipos rivales.
- **CareerState** (`src/career.ts`): presupuesto vivo, dificultad,
  calendario y ronda actual, resultados de temporada, plantilla de
  sede, patrocinadores.
- **Estado de UI derivado** (no persistido): pestaña activa, apertura
  del menú Más — mismas variables locales de siempre.

## Reglas de validación vigentes que se conservan tal cual

- Dorsales 1-99 únicos en parrilla (`setDriverNumber` reverte).
- Coste del siguiente nivel de desarrollo: función creciente con
  descuento de ingenieros (`devCost`), compras bloqueadas sin fondos.
- Nombre de equipo/pilotos: máx. 24 caracteres.

## Implicación para la implementación

El rediseño solo cambia CÓMO se pinta y estructura el DOM del hub, no
QUÉ lee ni escribe: cualquier bug de datos sería una regresión fuera
de alcance (el harness de simulación debe seguir verde sin cambios).
