# Research 023

## Precisión a cualquier velocidad (aritmética del cruce)

El tick avanza `simTimeMultiplier` segundos y el bucle interno da pasos
de 1 segundo simulado con `paso = pace/90` de progreso. Sin interpolar,
el tiempo de vuelta sería múltiplo del multiplicador (20x → laps de
exactamente N×20 s). Solución: al paso que cruza la meta,
`needed = (1 − progreso)/paso` (fracción de ESE segundo hasta la
línea); tiempo de vuelta = `acumulador + needed`; el resto
(`1 − needed`) se acredita a la siguiente vuelta. El progreso total,
el desgaste y `currentLap` evolucionan EXACTAMENTE como antes (mismo
orden de operaciones en el mismo bucle).

## Validez

- Amarilla: el bucle corre con pace reducido — cada segundo con
  `flag !== 'green'` marca `lapInvalid` en el coche (solo afecta a la
  vuelta en curso; se limpia al registrar).
- Roja: el bucle no corre para nadie (congelado) — no acumula.
- Boxes: la parada se ejecuta EN el cruce de meta (`startPitStop`).
  La vuelta que termina parando se excluye comprobando
  `pendingPits.has(driverId)` al registrar (antes de ejecutarla). La
  vuelta siguiente a la parada es completa y válida (el coche sale de
  boxes en la línea y corre la vuelta entera en verde).
- Igualdad: reemplazo solo con `lapTime < actual.lapTimeSec` — el
  primero conserva.

## Dónde vive el dato

- `RaceState.fastestLap` (motor): `{driverId, lapTimeSec, lapNumber}`.
  Evento `fastestLap` en `raceEvents` del tick (el render no infiere).
- Render: línea junto a la torre (`VL COD · m:ss.mmm`), fila del
  portador con `.vl` (subrayado de acento en el código), aviso del hub
  017 (`info`, "Vuelta rápida") al mejorar, y `.results-fl` en el
  panel final. Los códigos son los de la torre (020).

## Harness determinista

`Math.random` apuntado a `() => 0.999` durante el check: sin
incidentes (prob. ~1e-4), sin cambio de clima (weatherCanChange
false), compuesto inicial determinista (`hard`), ritmo determinista.
Micro-carrera: 2 coches, 3 vueltas; el rápido (pace 95 vs 60) con
orden de boxes desde el tick 0 → su vuelta 1 (la más rápida, gomas
nuevas) es in-lap y DEBE quedar excluida → la VL es su vuelta 2 o 3.
Además `t×1000` no múltiplo de `multiplicador×1000`. Restaurar
`Math.random` en `finally`. La carrera completa del harness (20
coches) debe seguir produciendo su clasificación de siempre (la
contabilidad es aditiva).

## Formato

`formatLapTime(193.4562)` → `3:13.456` (`m:ss.mmm`, toFixed(3),
tabular).
