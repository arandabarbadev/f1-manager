# Implementation Plan: 030 Entrenar de 5 en 5

**Branch**: `030-entrenar-de-cinco-en-cinco` | **Date**: 2026-11-04 | **Spec**: [spec.md](spec.md)

## Summary

La mejora de pilotos pasa de compras de +1 a bloques de +5 con una
pulsación. Misma economía: el bloque cuesta la suma exacta de los 5
pasos individuales siguientes; al borde del tope 95 el bloque se
recorta (y se cobra) solo lo que falten. El desarrollo del coche no se
toca y no hay migración (el ledger por punto sigue contando igual).

## Technical Context

**Language/Version**: TypeScript 5.9 + Vite 7 (Canvas 2D, PWA).

**Primary Dependencies**: ninguna nueva (principio III).

**Storage**: localStorage por slot, sin cambios de formato.

**Testing**: `npm run harness` ("Pilotos check") + verificación CDP.

**Target Platform**: móvil (PWA) y escritorio.

**Constraints**: la UI es la de hoy (misma fila, mismo botón), solo
cambia la magnitud de la compra; sin dependencias; español.

**Scale/Scope**: 2 archivos de código + harness.

## Constitution Check

- I (spec antes que código): spec.md leída y validada ✓.
- III (sin dependencias): no añade ninguna ✓.
- IV (móvil primero): sigue siendo UN botón por fila (no caben dos:
  +1 y +5) ✓.
- VII (requisitos comprobables): escenarios con la app en la mano ✓.
- IX (evidencias): harness + CDP con capturas ✓.
- Resto de reglas: no aplica (no hay datos nuevos ni borrados).

## Goals / Non-Goals

- **Goals**: bloque +5 (recortado al borde del tope), precio = suma de
  los pasos, botón que anuncia bloque y precio, harness actualizado.
- **Non-Goals**: desarrollo del coche, rivales, precios nuevos, dos
  botones (+1 y +5 conviviendo).

## Implementation Steps

1. **roster.ts**: `PILOT_BLOCK_SIZE = 5`;
   `pilotBlockCost(levelsBought, steps)` = Σ pilotUpgradeCost(bought+i)
   para i en 0..steps-1; `applyPilotUpgrade(driver, attrId, budget,
   steps)` con steps recortado a lo que falte hasta 95, coste del
   bloque y ledger += steps (sigue contando por punto).
2. **team-screen.ts** (`renderPilotsTab`): steps = min(5, restante);
   botón `+${steps} · ${cost} M€` (MÁX en el tope, como hoy);
   deshabilitado si no llega el dinero del bloque entero.
3. **test-harness.ts**: "Pilotos check" — compra única sube +5;
   coste del bloque = 5 compras de 1 con el mismo estado de partida;
   borde del tope (93→95 cobra 2 pasos); tope→MÁX; ledger y val
   correctos; desarrollo del coche sigue +1 (15/19/23).
4. **Build + harness** + regresión intacta.
5. **Verificación en vivo** (CDP): partida con dinero, pestaña
   Pilotos, un click → atributo +5 y val movido, dinero cobrado el
   precio anunciado; borde del tope con save sembrado a 93; MÁX a 95;
   dev del coche sigue +1; consola limpia; capturas.
6. Requisitos y tareas [x], commit.

## Test Strategy

- Harness determinista (economía exacta, bordes).
- CDP en el preview local con save sembrado (piloto a 93/95).

## Milestones / Dependencies

1 commit. Base: `4bbbf63` (029). Sin dependencias nuevas.
