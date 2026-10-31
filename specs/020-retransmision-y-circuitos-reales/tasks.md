---
description: "Lista de tareas de la función Retransmisión F1 y circuitos reales"
---

# Tareas: Retransmisión F1 y circuitos reales

**Entrada**: documentos de `/specs/020-retransmision-y-circuitos-reales/`

**Requisitos previos**: spec.md ✔, plan.md ✔, research.md ✔, data-model.md ✔, quickstart.md ✔

**Tests**: build + harness (checks nuevos) + maps + verificación en vivo por CDP (`mm-v020.js`).

## Convención de rutas: src/, tools/ y data/

---

## Fase 1: Circuitos reales + Miami

- [x] T001 `data/f1-circuits/us-2022.geojson` (Miami del geojson fuente) + `tools/convert-layouts.js` CALENDAR 21 + regenerar `src/real-layouts.ts` + `src/tracks-generator.ts` TRACK_PROFILES 21 + `src/slots.ts` rounds 21 (FR-007, FR-008)
- [x] T002 `src/tracks-generator.ts` generateTrack SIN declash: path = normalize(smooth) — forma real, solapes aceptados (FR-007)

## Fase 2: Códigos de piloto

- [x] T003 `src/driver-codes.ts`: base del apellido + desempate determinista (última letra A-Z, luego media); puro y testeable (FR-002)

## Fase 3: Torre y cabecera de carrera

- [x] T004 `race-screen.ts/css`: fila de torre [pos Barlow][franja equipo][código 3 letras][gap][anillo goma][wear][BOX], title con nombre completo y dorsal (FR-001)
- [x] T005 `.tyre-ico` anillo+letra en torre, línea de goma de Mis boxes y botones de compuesto (FR-006)
- [x] T006 Cabecera: barra de información (circuito, vuelta grande, clima, reloj) + controles agrupados con selector ÚNICO de pausa/velocidad (FR-003)

## Fase 4: Mi Equipo como panel del equipo

- [x] T007 Hero: librea, dinero en grande, posición de campeonato (vacío explícito) + accesos a secciones; identidad y coche debajo (FR-004)
- [x] T008 Menú "Más" con Reiniciar/Salir/Instalar/Partidas fuera del nivel de Carrera; confirmación de Reiniciar intacta (FR-005)
- [x] T009 Navegación: barra inferior fija en móvil, raíl lateral en escritorio (FR-009)

## Fase 5: Lenguaje gráfico F1

- [x] T010 `ui.css`: `--cut` + utilidad `.cut` + regla `[hidden]` (L1); esquinas cortadas en paneles de datos de todas las pantallas (directiva de Rafa)

## Fase 6: Verificación y cierre

- [x] T011 `test-harness.ts`: "Códigos check" (único/determinista/renombrados) + Tracks check actualizado (21, Miami, fidelidad < 0,01, solapes reales de vuelta); `npm run build` + `npm run harness` + `npm run maps` verdes (SC-002, SC-005)
- [x] T012 Verificación en vivo `mm-v020.js`: torre por DOM, códigos únicos en parrilla nueva y guardada, jerarquía de cabecera, hero con datos, menú Más, Miami ronda 5, menú de una mano, fuentes offline; capturas (SC-001..SC-007)
- [x] T013 Requisitos [x], commit, push, deploy verificado (bundle con constantes nuevas), memoria, recordar /compact

---

## Dependencias y orden

T001 → T002 → T003 → T004 → T005 → T006 → T007 → T008 → T009 → T010 → T011 → T012 → T013

(Fase 2 es independiente de la 1: si hace falta, T003 puede adelantarse.)

## Estrategia

Primero los DATOS (Miami y forma real: son la petición más sentida y
benefician a todo), luego la torre (el corazón visual), después el panel
del equipo y el lenguaje de cortes, y al final la verificación con
evidencias DOM/píxeles — la "persona que la identifica como torre de
tiempos" se apoya en estructura medible: posición+franja+código+gap+goma
por fila, sin leer nombres.
