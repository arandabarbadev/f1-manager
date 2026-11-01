# Research 022

## Cómo congela hoy la carrera (leído en race-screen.ts)

- Simulación: `window.setInterval(..., TICK_MS=200)`; si `lights.active`
  → `snapshotShadow(); lastTickAt = now; return` (sin tick, reloj
  quieto). Pausa y fin usan la misma puerta.
- Render: `advanceLights(now)` en cada frame; las luces arrancan en
  `setup()` → `startLights()` (`nextAt = now + 600`, 5 luces a 650 ms).
- La presentación del GP puede reutilizar EXACTAMENTE esa puerta:
  `intro.active` antes de `lights.active`, y `startLights()` pasa a
  llamarse al terminar la presentación. Cero cambios en el motor.

## Guía de primera vez (guide.ts)

`showGuideOnce('race', ...)` se llama al final de `setup()`. Con la
presentación activa quedaría superpuesta (guía z-index 60, arriba del
todo). Solución: retrasar la llamada al fin de la presentación
(`endIntro()`); como solo se muestra una vez por navegador, no hay
acumulación. Los avisos (notices, z-40 dentro de track-wrap) viven
sobre la marcha; la presentación ocurre antes del primer tick, así que
no compiten (a lo sumo un aviso de lluvia llegaría 2,5 s después).

## Torre: espacio para el delta

Columna actual (020): `1.9em 4px 3.2ch 1fr 20px 3.4em 2.6em`. Nueva:
insertar `2.4em` entre código y hueco y dejar el 1fr del hueco como
colchón: `1.9em 4px 3.2ch 2.4em 1fr 20px 3.4em 2.6em`. El hueco
("+1.4s"/"+1L") cabe en menos de 1fr a 13 px; en móvil (11 px) la
columna delta baja a `2em`. Flechas ▲/▼ + número: legibles sin color.

## Podio y "mis coches"

- Clasificados: `getFinalClassification(state)` ordena por posición,
  DNF incluidos al final (su posición quedó congelada al morir); el
  podio usa solo `status === 'racing'`.
- Códigos: `assignDriverCodes(state.drivers)` (020) — mismo código que
  en la torre, la historia se lee igual.
- Realce del jugador: borde/franja con `--accent` + "★" junto al
  código; bloque propio `.my-results` con `P#` grande SIEMPRE (top-3 o
  no, incluso DNF: "Abandono" si status dnf).
- Móvil: overlay `.results-panel` centrado; con la lista completa el
  panel puede superar la pantalla → `max-height: min(92vh, 640px);
  overflow-y: auto` y las acciones quedan al final del scroll (pulgar).

## Silueta de la tarjeta

`state.track.path` (0..1 normalizado) → escala a 240×150 con margen
12 px, línea blanca de 2,5 px con el mismo halo del trazado grande
(`--track-halo` como sombra). Canvas propio del overlay; se dibuja una
vez por `startIntro()` (el path no cambia durante la carrera).
