---
description: "Lista de tareas de la función Vuelta rápida"
---

# Tareas: Vuelta rápida

**Entrada**: documentos de `/specs/023-vuelta-rapida/`

**Tests**: build + harness (VL check determinista + sin regresión) + verificación en vivo.

- [x] T001 `types.ts` + `race-builder.ts`: lapTimeAccumSec/lapInvalid/fastestLap/evento (FR-001)
- [x] T002 `simulation.ts`: interpolación del cruce + recordLapTime con reglas de validez (FR-001, FR-003)
- [x] T003 `race-screen.ts/css`: línea VL, fila marcada, aviso y feed, dato en resultados (FR-002, FR-004)
- [x] T004 `test-harness.ts`: VL check con aleatoriedad fijada + carrera de regresión intacta (SC-001, SC-002, SC-005)
- [x] T005 build + harness verdes
- [x] T006 Verificación en vivo (aviso, línea, resultados) + requisitos [x] + commit

T001 → T002 → T003 → T004 → T005 → T006
