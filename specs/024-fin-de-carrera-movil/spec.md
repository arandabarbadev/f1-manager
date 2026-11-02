# Feature Specification: Fin de carrera a pulgar en móvil

**Feature Branch**: `024-fin-de-carrera-movil`

**Created**: 2026-11-02

**Status**: Draft

**Input**: User description: "Necesito que esté perfecto para móvil: al final de carrera hay que darle la vuelta al móvil para ir a la siguiente o salirme."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Terminar sin girar el móvil (Priority: P1)

Al terminar una carrera o un sprint en el móvil en vertical, veo el
panel de resultados y puedo pulsar Continuar / Ver resumen de temporada /
Mi Equipo SIN girar el teléfono: los botones están a la vista y
responden al toque, sean cuales sean el tamaño de pantalla, el tamaño de
fuente del sistema y la barra del navegador.

**Why this priority**: hoy el overlay vive dentro del recuadro del
trazado, que en móvil mide el 38 % de la pantalla; el panel desborda y
los botones quedan bajo el HUD o bajo la guía flotante — intocables en
vertical, y al girar (layout ancho) funciona. Por eso "hay que darle la
vuelta al móvil".

**Independent Test**: terminar un acto en un móvil en vertical (o
emulación 390×660) y pulsar el botón principal sin rotar.

**Acceptance Scenarios**:

1. **Given** una carrera terminada en móvil vertical, **When** miro el
   panel, **Then** los botones de acción se ven enteros y el toque en
   ellos llega al botón (no a otra capa).
2. **Given** un móvil bajito o con la fuente del sistema agrandada,
   **When** el contenido no cabe, **Then** el panel hace scroll interno
   y los botones siguen fijos y visibles al final.
3. **Given** una guía de primera vez abierta, **When** aparecen los
   resultados, **Then** la guía se retira (nunca tapa el final).
4. **Given** el escritorio o el móvil en horizontal, **When** termina la
   carrera, **Then** todo se ve como antes o mejor (overlay a pantalla
   completa, centrado).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El overlay de resultados cubre TODA la pantalla de
  carrera (no solo el recuadro del trazado), con el dim completo, y el
  panel centrado en la pantalla.
- **FR-002**: Las acciones del panel (Continuar / Ver resumen de
  temporada / Mi Equipo) quedan SIEMPRE visibles: ancladas al final del
  panel aunque el contenido haga scroll, con alto de objetivo táctil
  (≥44 px) y respeto del safe-area inferior.
- **FR-003**: La altura máxima del panel usa viewport dinámico (svh con
  fallback vh) para que la barra del navegador del móvil nunca se coma
  los botones.
- **FR-004**: Al mostrarse los resultados se retiran las guías de
  primera vez que estén abiertas; la presentación del GP (intro) también
  pasa a colgar de la pantalla completa para que su dim y centrado no
  dependan del recuadro del trazado.
- **FR-005**: Sin cambios de datos, simulación, economía ni textos de
  resultados; mismas clases y botones (Continuar/Mi Equipo/Resumen).

## Success Criteria *(mandatory)*

- **SC-001**: En emulación 390×660 y 360×640, el elemento bajo el dedo
  en el centro del botón principal ES el botón (hit-test real, no solo
  geometría).
- **SC-002**: Con contenido más alto que el panel (forzado), el scroll
  interno funciona y los botones permanecen en pantalla (rect dentro del
  viewport en todo momento).
- **SC-003**: La guía nunca queda sobre el panel de resultados.
- **SC-004**: Harness sin regresiones; escritorio igual que antes.

## Assumptions

- El síntoma "girar el móvil" venía del overlay encerrado en el
  track-wrap (38 vh en ≤720 px) con el panel desbordando bajo el HUD y
  la guía flotante (z-60) encima — confirmado con hit-test en emulación.
- "Perfecto para móvil" aquí = fin de carrera usable en vertical; el
  resto de la experiencia móvil no cambia en esta feature.
