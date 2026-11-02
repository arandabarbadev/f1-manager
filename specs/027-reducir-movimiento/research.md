# Research: 027 Reducir movimiento

## Inventario de movimiento (relevado 2026-11-02)

| Elemento | Dónde | Tipo | Decisión |
|---|---|---|---|
| Fundido de cambio de pantalla | `ui.css` `.screen-leave/out` 150 ms, `.screen-enter/in` 200 ms + `screen-transition.ts` añade las clases | CSS+JS | OFF con reduce (CSS y JS) |
| Aviso: entrada deslizante | `ui.css` `.notice` `notice-in` 180 ms | CSS | OFF |
| Aviso: salida fundida | `ui.css` `.notice.leaving` transition 300 ms | CSS | OFF (desaparece directo) |
| Anillos de adelantamiento | `race-screen.ts drawEffects` (canvas, 900 ms) | JS/canvas | OFF |
| Destello de incidente | `drawEffects` (anillo rojo 1400 ms) | JS/canvas | OFF |
| Textos flotantes ("¡A boxes!"…) | `floatingTexts` en canvas (suben) | JS/canvas | OFF |
| Tarjeta de presentación del GP | `startIntro` (022, 2,6 s temporizada) | JS/DOM | Se salta: directo a goma/luces; nombre+vueltas ya viven en la cabecera |
| Luces de salida, coches, reloj | contenido del juego | — | INTACTOS (el usuario los excluye) |
| Contadores que suben | no existen (dinero directo) | — | n/a |

## APIs

- CSS: `@media (prefers-reduced-motion: reduce)` — soporte universal
  moderno (Chrome 74+, Safari 10.1+, Firefox 63+).
- JS: `window.matchMedia('(prefers-reduced-motion: reduce)')` → se
  guarda el MediaQueryList UNA vez y se lee `.matches` en cada uso:
  sin listener y sin re-crear por frame; los cambios del sistema se
  reflejan al instante (FR-003 "en vivo").
- `swapScreen` lee la preferencia EN EL MOMENTO del cambio → el swap es
  instantáneo y no deja clases huérfanas (con reduce nunca se añaden
  `.screen-enter/leave`, así su `animationend` no queda colgado).

## Detalles

- Con reduce, `drawEffects` hace return inmediato: los coches se siguen
  dibujando (drawCars va aparte) y el feed/avisos informan igual.
- La salida de avisos con reduce: sin transición → `opacity:1;
  transform:none` y el hub los retira al ttl (7 s): "siguen visibles el
  tiempo suficiente" se conserva.
- La tarjeta del GP con reduce NO se muestra: la elección de goma
  (025) sigue apareciendo (es interacción, no decoración) y la quali va
  directa a las luces.
- Emulación para verificar: CDP `Emulation.setEmulatedMediaFeatures`
  con `prefers-reduced-motion: reduce` / reset con lista vacía.
