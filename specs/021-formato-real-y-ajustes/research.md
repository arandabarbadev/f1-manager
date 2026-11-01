# Research 021

## Sedes sprint reales presentes en el juego

Calendario sprint real (formato 2023-2025, 6 rondas): Shanghái, Miami,
Spa, Austin, Interlagos y Lusail. De ellas, el juego tiene 4: **Miami
(gp-miami), Spa (gp-spa), Austin (gp-austin), Interlagos (gp-interlagos)**.
Jerez y el resto no celebran sprint.

## Derivación actual del fin de semana (weekend.ts leído)

Todo se deriva de `career.seasonResults` del `trackId` actual:
`pendingEvent` = primer evento de `EVENT_ORDER` sin resultado;
`gridForEvent` usa la clasificación del evento ANTERIOR del orden. Con
orden por ronda basta sustituir `EVENT_ORDER` por `eventOrderFor(trackId)`
en ambas funciones — sin estado nuevo ni migración.

Casos límite comprobados:
- Save viejo con sprints registradas en ronda ahora normal: `done`
  contiene más eventos que el orden corto → `pendingEvent` devuelve
  null solo si ya está la carrera; tras la carrera avanza la ronda. Si
  estaba a medias (quali+sprints hechas, carrera no), el orden corto
  solo exige quali (hecha) → pendiente = Carrera. Correcto y sin
  pérdida de puntos.
- `eventShortLabel`/puntos/premios no cambian.

## Costes de desarrollo (roster.ts)

Hoy: `devCost(n) = 15×(n+1)` → 15, 30, 45… 225; completar una
categoría (15 niveles) = 1.200 M€. Nuevo: `15 + 4×n` → 15, 19, 23… 71;
categoría completa = 15×15 + 4×105 = 645 M€. Mantiene el descuento de
ingenieros y el tope DEV_MAX_LEVEL=15. Pilotos (019) se quedan con
15×(n+1) — el pedido es solo del coche.

## Navegación móvil (020 → 021)

En 020 la barra inferior tenía 6 pestañas + Carrera. Nuevo layout
móvil: header (dinero + tema + Más) → fila de pestañas con scroll →
panel; barra inferior fija SOLO con Carrera (`.race-bar`), botón
primario grande. Escritorio: raíl lateral como en 020 (pestañas +
Carrera abajo del raíl); `.race-bar` se oculta. `updateRaceButton`
escribe en todos los `.go-race-btn` (dos nodos, texto sincronizado).
