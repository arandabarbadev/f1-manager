# Data Model: 027 Reducir movimiento

## Sin cambios de datos

Solo presentación. Nada de localStorage, Firebase, tipos ni motor.

## Cambios de código

- **ui.css**: bloque `@media (prefers-reduced-motion: reduce)`:
  `.screen-leave`, `.screen-enter`, `.notice` → `animation: none`;
  `.notice.leaving` → `transition: none; opacity: 1; transform: none`.
- **screen-transition.ts**: `prefersReducedMotion()` (matchMedia) y
  camino directo en `swapScreen` (sin clases de transición).
- **race-screen.ts**: MediaQueryList a nivel de módulo de la pantalla +
  `reducedMotion()`; `afterIntro()` (goma o luces) compartida por
  `endIntro` y por `setup()` cuando se salta la presentación;
  `drawEffects` ignora efectos con reduce.

##Qué NO cambia

Coches en el trazado, reloj, secuencia de luces de salida, torre,
resultados, ttl de avisos (7 s), elección de goma (025), pausa y wake
lock (026).
