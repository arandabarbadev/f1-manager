---
description: "Lista de tareas de la función Palmarés histórico"
---

# Tareas: Palmarés histórico

**Entrada**: documentos de `/specs/031-palmares-historico/`

**Tests**: build + harness ("Palmarés check" + regresión) + verificación en vivo con temporada sembrada y partida limpia.

- [X] T001 `career.ts`: `SeasonPalmaresEntry`, `CareerState.palmares` (merge a []), `recordPalmares(career, roster)` idempotente y `palmaresTotals` (FR-001, FR-002, FR-006)
- [X] T002 `season-screen.ts`: grabar en "Empezar temporada nueva" antes de reiniciar (FR-001)
- [X] T003 `src/palmares-screen.ts` + css: totales arriba, filas por temporada (reciente primero), P1 destacada, estado vacío (FR-003, FR-004)
- [X] T004 `team-screen.ts` + `main.ts`: item "Palmarés" en el menú Más y navegación (FR-003)
- [X] T005 `test-harness.ts`: "Palmarés check" (sprint excluido, idempotencia, totales, migración) (SC-001, SC-002, SC-004)
- [X] T006 build + harness verdes con cero regresiones
- [X] T007 Verificación en vivo (cierre con temporada sembrada → fila y totales; sin duplicar; estado vacío; consola limpia) + requisitos [x] + commit (SC-003)

T001 → T002 → T003 → T004 → T005 → T006 → T007
