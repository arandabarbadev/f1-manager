# Implementation Plan: 027 Reducir movimiento

## Context

Respetar la preferencia del sistema "reducir movimiento": fuera lo
decorativo (fundidos, avisos que se deslizan, anillos/destellos/textos
flotantes, tarjeta del GP), intacto el contenido (coches, reloj,
luces). Sin contadores animados en el código actual.

## Goals / Non-Goals

- **Goals**: preferencia respetada en CSS y JS, en vivo, sin perder
  información ni datos.
- **Non-Goals**: ajuste propio en el juego, tamaño de texto, contraste,
  tocar la simulación.

## Implementation Steps

1. **ui.css**: bloque `@media (prefers-reduced-motion: reduce)` con
   `animation: none` para `.screen-leave/.screen-enter/.notice` y
   `transition: none; opacity: 1; transform: none` para
   `.notice.leaving`.
2. **screen-transition.ts**: helper `prefersReducedMotion()`; con la
   preferencia activada, `swapScreen` ejecuta `build()` directo (sin
   clases de transición).
3. **race-screen.ts**: MediaQueryList único + `reducedMotion()`;
   `afterIntro()` como continuación compartida de `endIntro`; en
   `setup()`, con reduce se salta `startIntro()` (directo a
   goma/luces); `drawEffects` retorna si reduce.
4. **Build + harness** (regresión).
5. **Verificación en vivo** con `Emulation.setEmulatedMediaFeatures`:
   con reduce (sin screen-enter, aviso sin animación, sin gp-intro,
   carrera corriendo) y sin reduce (todo como antes); alternar sin
   romper; capturas.
6. Requisitos y tareas [x], commit.

## Test Strategy

- Harness completo (motor intacto).
- CDP con emulación de media feature y consola vigilada.

## Milestones / Dependencies

1 commit. Base: `222afb1` (026).
