---
description: "Lista de tareas de la función Reducir movimiento"
---

# Tareas: Reducir movimiento

**Entrada**: documentos de `/specs/027-reducir-movimiento/`

**Tests**: build + harness (sin regresión) + verificación en vivo con media emulada.

- [x] T001 `ui.css`: bloque prefers-reduced-motion (fundidos y avisos) (FR-001)
- [x] T002 `screen-transition.ts`: swap instantáneo con reduce (FR-002)
- [x] T003 `race-screen.ts`: reducedMotion() en vivo, saltar la tarjeta del GP (afterIntro compartido) y drawEffects sin efectos (FR-003)
- [x] T004 build + harness verdes (FR-004, SC-004)
- [x] T005 Verificación en vivo (reduce ON/OFF, alternar, carrera corriendo) + requisitos [x] + commit (SC-001..SC-003)

T001 → T002 → T003 → T004 → T005
