---
description: "Lista de tareas de la función Goma de salida"
---

# Tareas: Goma de salida

**Entrada**: documentos de `/specs/025-goma-de-salida/`

**Tests**: build + harness (Goma check + sin regresión) + verificación en vivo.

- [x] T001 `race-builder.ts`: `setStartCompound` (solo ese coche, goma nueva) (FR-002)
- [x] T002 `race-screen.ts`: overlay `.tyre-pick`, fase pickActive con congelado, endIntro→showPick (quali salta), endPick aplica y arranca, guía tras cerrar, reset en setup (FR-001, FR-002, FR-004, FR-005)
- [x] T003 `race-screen.css`: tarjeta cut, filas, grupo S/M/H ≥44 px con anillos tyre-ico y estado activo (FR-001)
- [x] T004 `test-harness.ts`: Goma check determinista (SC-003, SC-004)
- [x] T005 build + harness verdes
- [x] T006 Verificación en vivo (S/H en la torre, un paso sin tocar, quali sin tarjeta, reloj 0, móvil) + requisitos [x] + commit (SC-001, SC-002)

T001 → T002 → T003 → T004 → T005 → T006
