---
description: "Lista de tareas de la función Retransmisión en carrera"
---

# Tareas: Retransmisión en carrera

**Entrada**: documentos de `/specs/022-retransmision-en-carrera/`

**Tests**: build + harness (sin regresión) + verificación en vivo.

- [x] T001 Presentación del GP: `.gp-intro` + silueta en canvas + puerta `intro.active` antes de luces + guía retrasada (FR-003)
- [x] T002 Deltas en la torre: `gridStartPos` + `span.delta` + updateHud + grid CSS (FR-002)
- [x] T003 Podio y mis coches en el overlay de resultados + panel con scroll y acciones a pulgar (FR-001)
- [x] T004 CSS (gp-intro, delta, podium, my-results, results-panel móvil)
- [x] T005 build + harness verdes (SC-005)
- [x] T006 Verificación en vivo (tarjeta saltable, deltas, podio con top-3/DFN/móvil) + requisitos [x] + commit

T001 → T002 → T003 → T004 → T005 → T006
