# Implementation Plan: 024 Fin de carrera a pulgar en móvil

## Context

Bug reportado por el usuario: al terminar en móvil hay que girar el
teléfono para poder pulsar Continuar/Mi Equipo. Causa: overlay de
resultados dentro de `.track-wrap` (38 vh en ≤720 px) + acciones al
final del scroll + guía flotante encima. Detalle y evidencia en
`research.md`.

## Goals / Non-Goals

- **Goals**: botones finales SIEMPRE tocables en vertical; overlay a
  pantalla completa; guía fuera del final; cero cambios de datos.
- **Non-Goals**: rediseño del panel ni de sus contenidos (022 los fija),
  cambios en simulación/economía, resto de pantallas móviles.

## Implementation Steps

1. **HTML (race-screen.ts)**: sacar `.gp-intro` y `.results-overlay` de
   `.track-wrap` y colgarlos de `.race-screen` justo tras `.race-body`.
2. **CSS (race-screen.css)**:
   - `.race-screen { position: relative; }`
   - `.results-overlay { z-index: 30; }` (intro conserva su 35).
   - `.results-panel`: `max-height: min(92svh, 660px)` con fallback vh;
     `padding: 18px 20px 0`.
   - `.results-actions`: `position: sticky; bottom: 0; margin:
     14px -20px 0; padding: 12px 20px calc(12px +
     env(safe-area-inset-bottom)); background: var(--panel);
     border-top: 1px solid var(--border);` y sus `.btn` `flex: 1;
     min-height: 44px`.
3. **TS (race-screen.ts)**: en `awardPrizesAndShowResults`, antes de
   mostrar el overlay, retirar guías abiertas:
   `document.querySelectorAll('.guide-card').forEach((g) => g.remove());`
4. **Build + harness** sin regresiones.
5. **Verificación viva** (CDP, móviles 390×660 y 360×640): hit-test real
   sobre el botón principal, sticky visible con scroll forzado, guía
   ausente, escritorio intacto. Capturas.
6. Requisitos y tareas a [x], commit.

## Data-Model / API

Sin cambios (solo DOM/CSS). Ver `data-model.md`.

## Test Strategy

- Harness completo (simulación intacta).
- Guion CDP: repro del bug ANTES/DESPUÉS + hit-test + sticky + safe-area
  + escritorio.

## UI / UX

- Móvil vertical: dim a pantalla completa, panel centrado, acciones
  ancladas abajo a pulgar.
- Escritorio: igual que 022 con el panel ahora centrado en toda la
  pantalla de carrera.

## Milestones / Dependencies

1 commit, sin dependencias. Base: `4419675` (023).
