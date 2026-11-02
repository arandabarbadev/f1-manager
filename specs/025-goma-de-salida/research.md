# Research: 025 Goma de salida

## Dónde nace la goma hoy

`race-builder.ts` (~línea 101): para TODOS los coches,
`tyre: { compound: startCompounds[Math.floor(Math.random()*3)], wear: 0, lapsOnTyre: 0 }`.
El sorteo del builder NO se toca: es la preselección que verá el
jugador, y los rivales la conservan tal cual.

## Diseño elegido

- Fase nueva en la pantalla de carrera: `intro (022) → PICK (esta
  spec) → luces (012) → carrera`. La tarjeta cuelga del raíz de la
  pantalla (lección de 024: nunca dentro de `.track-wrap`), z-38 —
  por encima de la intro (35) y por debajo de los avisos (40).
- Congelado idéntico al de intro/luces: puerta `pickActive` en el
  `setInterval` de simulación (snapshotShadow + ancla del reloj), así
  el reloj sigue a 0 y no hay ticks.
- La guía de primera vez (022 la movió a endIntro) se retrasa un paso
  más: se muestra al CERRAR la tarjeta (arrancan las luces), para que
  nunca haya dos overlays.
- Aplicar la elección: `setStartCompound(state, driverId, compound)` en
  race-builder.ts — solo el coche indicado; `wear: 0, lapsOnTyre: 0`
  (goma nueva, como al construir). El motor no cambia: la torre ya
  pinta `car.tyre.compound` (020) y "Mis boxes" lee lo mismo.
- Quali: `event === 'quali'` salta la tarjeta (endIntro → luces
  directo, como hoy).
- "Nueva carrera" llama `setup()` → `startIntro()` → la cadena vuelve
  a pasar por la tarjeta con NUEVA preselección (nuevo sorteo del
  builder, como ya pasaba al reconstruir).

## Alternativas descartadas

- **Selector en el build (roster)**: la goma es por evento, no de la
  partida; además liar el guardado para algo perishable.
- **Selector no bloqueante durante la formación**: en móvil la
  formación dura ~4 s; imposible elegir con calma y "sin fricción".
- **Re-sorteo al abrir la tarjeta**: rompería "sin sorteos" y el
  determinismo de rivales.

## Visual

- Anillos `.tyre-ico` existentes (S rojo / M amarillo / H blanco,
  019/020) dentro de botones `.tp-btn` de 44 px; el activo lleva realce
  del acento. Fila: [P#][código+nombre][S M H]. Botón primario "Salida"
  a lo ancho abajo. Tarjeta `cut` como el resto.
