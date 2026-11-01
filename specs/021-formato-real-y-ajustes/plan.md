# Implementation Plan: Formato de fin de semana real y ajustes

**Branch**: `021-formato-real-y-ajustes` | **Date**: 2026-10-31 | **Spec**: [spec.md](spec.md)

## Summary

Tres ajustes puntuales sobre código existente: orden de eventos por
ronda en `weekend.ts` (sprints solo en 4 rondas reales), fórmula de
coste en `roster.ts` (subida +4 M€/nivel) y reestructuración de la
navegación del menú principal (barra inferior solo Carrera en móvil).

## Technical Context

TypeScript 5.9 + Vite 7, sin dependencias nuevas. Sin cambios de
persistencia (todo derivado). Verificación: harness (orden de eventos,
costes) + en vivo (barra móvil, precios, botón de acto pendiente).

## Constitution Check

- I ✔ (spec antes que código, QUÉ sin CÓMO) · II ✔ · III ✔ (cero
  dependencias) · IV ✔ (barras a pulgar) · V ✔ · VI ✔ (Reiniciar
  sigue en Más con confirmación) · VII ✔ (SC medibles) · VIII ✔ (todo
  en la carpeta, abierta en el Explorador) · IX ✔ (evidencias) · X ✔ ·
  XI (recordar /compact al cerrar).

## Cambios

1. `src/weekend.ts`: `SPRINT_ROUND_IDS = ['gp-miami','gp-spa',
   'gp-austin','gp-interlagos']` + `hasSprint(trackId)` +
   `eventOrderFor(trackId)` (QUALI_RACE / FULL). `pendingEvent` y
   `gridForEvent` usan el orden de ESA ronda (la parrilla encadena con
   el evento anterior DEL ORDEN DE LA RONDA). Saves viejos con sprints
   en rondas no-sprint: `pendingEvent` los ignora (todos los eventos
   del orden están hechos → siguiente); puntos ya ganados intactos.
2. `src/roster.ts`: `devCost(level) = 15 + 4×level` (antes
   15×(level+1)); comentario actualizado. Pilotos (019) sin cambios.
3. `src/team-screen.ts` + CSS: el botón Carrera pasa a una barra propia
   `.race-bar` (móvil: fija abajo, SOLO Carrera; escritorio: oculta, el
   botón sigue en el raíl lateral). `.nav-tabs` en móvil vuelve arriba
   como fila horizontal con scroll bajo el header. `updateRaceButton`
   actualiza TODOS los `.go-race-btn`.
4. `src/test-harness.ts`: "Formato check" — rondas sprint/normales
   (pendingEvent tras quali en Melbourne → race; en Miami → sprint1),
   costes 15/19/23, y gridForEvent encadena quali→race en ronda normal.
5. Verificación viva: barra móvil con un solo botón, pestañas arriba,
   precios 15→19, botón muestra "Carrera · R1: Melbourne" (sin sprints)
   y "Sprint 1" al llegar a Miami.

## Estructura

specs/021-formato-real-y-ajustes/ (docs) · src/weekend.ts ·
src/roster.ts · src/team-screen.ts · src/team-screen.css ·
src/test-harness.ts
