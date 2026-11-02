# Quickstart: 024 Fin de carrera a pulgar en móvil

## Cómo verlo

1. `npm run build && npm run harness` (verde).
2. `./node_modules/.bin/vite preview --port 4173 --strictPort` + Chrome
   CDP 9222.
3. Guion `%TEMP%\mm-v024.js`: corre una quali a 20x y al overlay mide
   hit-test del botón principal en 390×660 y 360×640, sticky con scroll
   forzado (fuente agrandada), guía retirada y escritorio intacto.

## A mano (móvil real)

1. Entra en cualquier acto y termínalo (20x).
2. Sin girar el móvil: pulsa "Continuar" (quali/sprint) o "Mi Equipo"
   (carrera). Responde a la primera.
3. Agrandando la fuente del sistema, el panel hace scroll pero los
   botones siguen fijos abajo.
