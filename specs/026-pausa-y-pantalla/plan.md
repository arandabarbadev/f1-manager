# Implementation Plan: 026 Pausa y pantalla

## Context

Al ocultar la app la carrera se arrastra (timers estrangulados, sin
pausa) y el móvil se apaga con la carrera corriendo. Además el interval
de una carrera abandonada seguía vivo (podía cobrar a ciegas).

## Goals / Non-Goals

- **Goals**: pausa automática al ocultar (sin reanudar sola, aviso solo
  si fue auto), wake lock de pantalla con soporte silencioso, muerte
  limpia del bucle al desmontar la pantalla.
- **Non-Goals**: notificaciones, jugar en segundo plano, guardar la
  carrera a medias, cambios de simulación.

## Implementation Steps

1. **race-screen.ts — estado y helpers**: `tickTimer` (const del
   `setInterval`), `autoPaused`, `wakeLockSentinel` +
   `acquireWakeLock()/releaseWakeLock()` (try/catch, chequeo de
   soporte y de visibilidad).
2. **Enganches**: luces fuera (`advanceLights`) → acquire; pauseBtn →
   toggle + (pausa? release : acquire) + limpiar `autoPaused` al
   reanudar; bandera a cuadros → release; `setup()` → release (rebuild).
3. **`onVisibility`**: desmontado (`!root.isConnected`) → clearInterval
   + removeEventListener + release; oculto → pausa auto + release;
   visible → aviso info solo si `autoPaused`.
4. **rAF**: `if (!root.isConnected) return;` al inicio del `render`.
5. **CSS**: nada nuevo (aviso por el hub 017 existente).
6. **Build + harness** (sin regresión de simulación).
7. **Verificación en vivo** (stub de `document.hidden` + dispatch):
   congelado de reloj/vuelta, "Seguir", aviso único, manual sin aviso,
   velocidad conservada, sin errores de consola; capturas.
8. Requisitos y tareas [x], commit.

## Test Strategy

- Harness completo (motor intacto).
- CDP: flujo real de ocultar/volver con el evento despachado y consola
  vigilada; wake lock pedido/liberado sin excepciones.

## Milestones / Dependencies

1 commit. Base: `2b7e7a3` (025).
