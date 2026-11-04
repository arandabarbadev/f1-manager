---
description: "Lista de tareas de la función Rivales evolucionan"
---

# Tareas: Rivales evolucionan

**Entrada**: documentos de `/specs/029-rivales-evolucionan/`

**Tests**: build + harness (Rivales check multi-temporada + regresión) + verificación en vivo con saves sembrados.

- [x] T001 `difficulty.ts`: rivalGrowth en presets (FR-003)
- [x] T002 `roster.ts`: RIVAL_STAT_CAP + evolveRivals (tendencia/ruido/techo, jugador intacto) (FR-001)
- [x] T003 `roster.ts`: versión 2 + marcador + migración v1 (FR-002, FR-005)
- [x] T004 `season-screen.ts`: aplicar al cierre + bloque top 3 + contador respetando reduced-motion (FR-002, FR-004)
- [x] T005 `test-harness.ts`: Rivales check + regresión (SC-001, SC-002, SC-005)
- [x] T006 build + harness verdes (calibrar constantes si hace falta)
- [x] T007 Verificación en vivo (resumen con top 3, roster v2, jugador intacto, v1 migrada, temporada nueva) + requisitos [x] + commit (SC-003, SC-004)

T001 → T002 → T003 → T004 → T005 → T006 → T007
