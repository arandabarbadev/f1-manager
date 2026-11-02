# Quickstart: 027 Reducir movimiento

## Cómo verlo

1. `npm run build && npm run harness` (verde).
2. Preview 4173 + Chrome CDP 9222; guion `%TEMP%\mm-v027.js` (emula la
   preferencia con `Emulation.setEmulatedMediaFeatures`).
3. A mano: activa "Quitar animaciones"/"Reducir movimiento" en los
   ajustes de accesibilidad del sistema y recorre el juego.

## Qué mirar

- Con la preferencia: cambios de pantalla instantáneos, avisos sin
  deslizarse, sin tarjeta del GP (directo a goma/luces), sin anillos ni
  textos flotantes en el trazado; la carrera corre igual.
- Sin la preferencia: todo como siempre.
- Avisos legibles el mismo tiempo en ambos modos.
