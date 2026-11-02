# Research: 026 Pausa y pantalla

## Por qué la carrera "se arrastra" hoy

- La pantalla de carrera corre un `setInterval` (TICK_MS=200) que llama
  a `simulationTick` y al reloj DOM. Al ocultar la pestaña/app, Chrome
  estrangula los timers (≈1/s o menos) y congela el rAF: la carrera ni
  se pausa ni corre bien — "se arrastra, se congela o sigue sin que yo
  la vea", exactamente lo reportado.
- Además, `swapScreen` solo reemplaza el DOM: el interval de una carrera
  abandonada (salir a Mi Equipo) seguía vivo sobre el estado huérfano y
  podía terminar la carrera, cobrar y grabar resultados A CIEGAS. Esta
  spec lo corta (FR-003): si `root.isConnected` es false, el interval y
  el render se detienen y se limpia todo.

## APIs

- **`document.visibilitychange` + `document.hidden`**: se dispara al
  bloquear el móvil, cambiar de app o de pestaña (iOS Safari 13+,
  Chrome Android, escritorio). Es EL mecanismo estándar; no hay API
  fiable de "pantalla bloqueada" separada.
- **Screen Wake Lock** (`navigator.wakeLock.request('screen')`):
  Chrome/Edge 84+, Android; Safari 16.4+ (marzo 2023), también en
  PWA instalada de iOS. El sistema lo LIBERA solo al ocultar el
  documento — por eso hay que volver a pedirlo al reanudar si la
  carrera corre. Requiere página visible y (en algunos navegadores)
  contexto seguro; https del deploy ✓.
- Tipos: `WakeLockSentinel`/`Navigator.wakeLock` ya están en el
  lib.dom del TS 5.9 del proyecto (verificado en node_modules).
- Sin soporte: `'wakeLock' in navigator` false → ni se intenta, ni
  avisa, ni rompe (FR-002). El `request` va en try/catch por si el
  navegador lo deniega.

## Diseño

- Pausa automática SOLO si la carrera corre: `!finished &&
  !lights.active && !intro.active && !pickActive && !state.isPaused`.
  Las fases de apertura ya se congelan solas.
- Distinción auto/manual en `autoPaused`: al volver, si fue auto se
  muestra el aviso info UNA vez; la manual no. Nunca reanuda sola.
- Ciclo del wake lock: pedir en luces-fuera y en "Seguir"; liberar en
  pausar (manual/auto), bandera a cuadros, ocultar y desmontaje. El
  `release()` del propio sistema pone el sentinel a null (listener
  'release').
- Limpieza por desmontaje: el interval se guarda en `tickTimer`; en
  cada tick, `root.isConnected` false → clearInterval + quitar el
  visibilitychange + liberar lock. El rAF hace return sin re-programarse.
  (El interval fantasma preexistente queda muerto con esto.)

## Verificación

- Headless CDP no cambia `document.hidden` solo: se stubbea
  `Object.defineProperty(document,'hidden',...)` + se despacha el
  evento — la lógica del juego es idéntica a la real.
- Wake lock en headless Chrome: `navigator.wakeLock` existe; se comprueba
  que pedir/liberar no lanza errores (Runtime.consoleAPICalled +
  exceptionThrown capturados como evidencia de "sin errores").
