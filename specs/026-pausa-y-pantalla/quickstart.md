# Quickstart: 026 Pausa y pantalla

## Cómo verlo

1. `npm run build && npm run harness` (verde).
2. Preview 4173 + Chrome CDP 9222; guion `%TEMP%\mm-v026.js`.
3. A mano (móvil real): carrera a 1x → bloquea el móvil 30 s → vuelve:
   misma vuelta y reloj, botón "Seguir", aviso "Carrera en pausa".
   Deja el móvil sin tocar: la pantalla no se apaga mientras corre.

## Qué mirar

- Ocultar congela el reloj (ni siquiera a 20x avanza).
- Nunca se reanuda sola; el aviso sale una vez (solo pausa automática).
- Pausa manual + ocultar + volver: pausada, sin aviso.
- "Seguir" conserva la velocidad (p. ej. 20x).
- Consola limpia (wake lock con y sin soporte).
