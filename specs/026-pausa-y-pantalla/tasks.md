---
description: "Lista de tareas de la función Pausa y pantalla"
---

# Tareas: Pausa y pantalla

**Entrada**: documentos de `/specs/026-pausa-y-pantalla/`

**Tests**: build + harness (sin regresión) + verificación en vivo con consola vigilada.

- [x] T001 `race-screen.ts`: wakeLock (acquire/release con soporte silencioso) enganchado a luces fuera, pausa/Seguir, bandera y setup (FR-002)
- [x] T002 `race-screen.ts`: `onVisibility` (pausa auto + aviso único al volver, distinción auto/manual) y limpieza total al desmontar (`tickTimer`, listener, rAF) (FR-001, FR-003)
- [x] T003 build + harness verdes (FR-004)
- [x] T004 Verificación en vivo (reloj/vuelta congelados, Seguir, aviso único, manual sin aviso, velocidad, consola limpia) + requisitos [x] + commit (SC-001..SC-004)

T001 → T002 → T003 → T004
