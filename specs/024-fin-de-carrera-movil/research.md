# Research: 024 Fin de carrera a pulgar en móvil

## El bug, reproducido (2026-11-02, preview 4173 + CDP)

Emulación 390×660 (móvil vertical con barra del navegador):

```
trackWrap/overlay: 105..356   (media ≤720px: .track-wrap { height: 38vh })
hud:              356..660
panel:             -4..464    (max-height min(92vh,660px) = 466 → desborda)
botón Mi Equipo:  y≈427 (bajo el overlay)
elementFromPoint(276,427) → DIV.guide-card   ← el botón NO recibe el toque
```

Dos causas sumadas:

1. **Estructural**: `.results-overlay` es hijo de `.track-wrap`, que en
   móvil mide 38vh. El panel (max-height 92vh) desborda hacia abajo
   sobre el `<aside class="hud">`. El orden de pintura salva el visionado
   (el overlay es positioned), pero el panel cuelga fuera de su capa y
   cualquier capa posterior con z (notices z-40, guía z-60) le pisa.
2. **Guía flotante**: `.guide-card` es `position: fixed; top: 14px;
   z-index: 60` sobre `document.body` (guide.ts, spec 008). En 390 px la
   tarjeta es alta y en el repro cubría y=427: el toque caía en ella.

Por qué "girar el móvil" lo arregla: en horizontal el width supera los
720 px → layout de escritorio → `.track-wrap` vuelve a flex:1 (grande) →
el panel cabe dentro → los botones responden.

Por qué no lo vimos en 022: la verificación midió rects
(`getBoundingClientRect`), que no ven apilamiento ni hit-testing.
Lección (regla IX): para clicabilidad, `document.elementFromPoint`.

## Opciones consideradas

- **A. z-index alto al overlay** (seguiría dentro del track-wrap): tapa
  el HUD pero el dim seguiría cubriendo solo el 38 % de la pantalla y el
  panel seguiría colgando mal centrado. Descartada.
- **B. Mover los overlays (intro, resultados) al raíz de `.race-screen`
  con `position: relative`** (elegida): dim y centrado a pantalla
  completa en móvil y escritorio, cero cambios de lógica, el HTML solo
  cambia de padre. Los queries por clase no cambian.
- **C. Panel modal a `<dialog>`/body**: más intrusivo, pierde el estilo
  cut y el contexto de pantalla. Descartada.

## Detalles de la solución

- Apilamiento resultante en `.race-screen`: resultados z-30 < intro z-35
  < notices z-40 < guía z-60 (y la guía se retira al mostrar resultados,
  así que nunca compiten). `start-lights` y `flag-indicator` se quedan
  en el track-wrap: señalan el trazado.
- **Acciones sticky**: `.results-panel` pierde el padding inferior; la
  fila de acciones gana `position: sticky; bottom: 0` con sangrado
  lateral negativo (-20 px) para sangrar a los bordes del panel, fondo
  del panel y borde superior; `env(safe-area-inset-bottom)` en el padding
  inferior. Botones `flex: 1; min-height: 44 px`.
- **Viewport dinámico**: `max-height: min(92vh, 660px)` como fallback y
  `min(92svh, 660px)` como valor real (svh = viewport MENOR: garantiza
  visibilidad con la barra del navegador a la vista). Soporte svh:
  Chrome 108+, Safari 15.4+ (2022-23) — el fallback cubre el resto.
- `showGuideOnce` marca "vista" ANTES de pintar (guide.ts), así que
  retirar la tarjeta al mostrar resultados no la re-muestra después.

## Riesgos

- Mover el HTML del overlay no afecta a los queries (todas por clase
  desde `root`), pero el orden de pintura con el HUD cambia: cubierto
  con z-index explícito y verificación viva.
- `clip-path` (esquinas cortadas del panel) recorta también al hijo
  sticky — el sangrado lateral negativo no se sale del panel.
