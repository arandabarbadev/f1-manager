---
description: "Lista de tareas de la función Gráfico de ritmo"
---

# Tareas: Gráfico de ritmo

**Entrada**: documentos de `/specs/028-grafico-de-ritmo/`

**Tests**: build + harness (Ritmo check + regresión) + verificación en vivo con paradas manuales.

- [x] T001 `types.ts` + `race-builder.ts` + `simulation.ts`: PlayerLapEntry y playerLaps, registro en recordLapTime (FR-001, FR-004)
- [x] T002 `pace-chart.ts`: chartScale + buildPaceChart puros (FR-003, SC-003)
- [x] T003 `race-screen.ts/css`: botón toggle solo carrera/sprint y render del SVG (FR-002)
- [x] T004 `test-harness.ts`: Ritmo check determinista + regresión (SC-005)
- [x] T005 build + harness verdes
- [x] T006 Verificación en vivo (2 series, paradas con goma, escala, móvil, dinero intacto, quali sin botón) + requisitos [x] + commit (SC-001, SC-002, SC-004)

T001 → T002 → T003 → T004 → T005 → T006
