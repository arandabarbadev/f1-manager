---
description: "Lista de tareas de la función Formato real y ajustes"
---

# Tareas: Formato real y ajustes

**Entrada**: documentos de `/specs/021-formato-real-y-ajustes/`

**Tests**: build + harness (Formato check) + verificación en vivo.

## Fase 1: Formato de fin de semana

- [x] T001 `weekend.ts`: SPRINT_ROUND_IDS + hasSprint + eventOrderFor; pendingEvent y gridForEvent por ronda (FR-001)
- [x] T002 `test-harness.ts`: Formato check (pendientes y costes); build + harness verdes (SC-001, SC-002)

## Fase 2: Economía y navegación

- [x] T003 `roster.ts`: devCost = 15 + 4×nivel (FR-002)
- [x] T004 `team-screen.ts/css`: .race-bar solo Carrera en móvil, pestañas arriba, raíl escritorio intacto (FR-003)

## Fase 3: Cierre

- [x] T005 Verificación en vivo (barra 390px, precios, actos pendientes) + requisitos [x] + commit

T001 → T002 → T003 → T004 → T005
