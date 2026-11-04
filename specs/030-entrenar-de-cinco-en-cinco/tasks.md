---
description: "Lista de tareas de la función Entrenar de 5 en 5"
---

# Tareas: Entrenar de 5 en 5

**Entrada**: documentos de `/specs/030-entrenar-de-cinco-en-cinco/`

**Tests**: build + harness ("Pilotos check" de bloques + regresión) + verificación en vivo con save sembrado.

- [x] T001 `roster.ts`: `PILOT_BLOCK_SIZE`, `pilotBlockCost(bought, steps)` y `applyPilotUpgrade(..., steps)` con recorte al tope y ledger por punto (FR-001, FR-002, FR-003)
- [x] T002 `team-screen.ts`: botón `+N · coste M€` del bloque, MÁX en el tope, deshabilitado sin dinero (FR-001, FR-003, FR-004)
- [x] T003 `test-harness.ts`: "Pilotos check" de bloques (economía idéntica a 5×+1, borde 93→95, MÁX, dev del coche sigue +1) (SC-001, SC-002, SC-004)
- [x] T004 build + harness verdes con cero regresiones
- [x] T005 Verificación en vivo (click +5, borde del tope, MÁX, dev del coche +1, consola limpia) + requisitos [x] + commit (SC-003)

T001 → T002 → T003 → T004 → T005
