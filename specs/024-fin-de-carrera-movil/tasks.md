---
description: "Lista de tareas de la función Fin de carrera a pulgar en móvil"
---

# Tareas: Fin de carrera a pulgar en móvil

**Entrada**: documentos de `/specs/024-fin-de-carrera-movil/`

**Tests**: build + harness (sin regresión) + verificación en vivo con hit-test.

- [x] T001 `race-screen.ts`: mover `.gp-intro` y `.results-overlay` al raíz de `.race-screen`; retirar guías al mostrar resultados (FR-001, FR-004)
- [x] T002 `race-screen.css`: `.race-screen` relative, overlay z-30, panel svh + padding, acciones sticky ≥44 px con safe-area (FR-002, FR-003)
- [x] T003 build + harness verdes (FR-005, SC-004)
- [x] T004 Verificación en vivo (hit-test 390×660 y 360×640, sticky, guía, escritorio) + requisitos [x] + commit (SC-001..SC-003)

T001 → T002 → T003 → T004
