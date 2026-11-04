# Research: 030 Entrenar de 5 en 5

**Decision**: sustituir la compra de +1 por un bloque de +5 en el
mismo botón, cobrando la suma de los 5 pasos siguientes
(`pilotBlockCost = Σ 15×(bought+i)`), con el bloque recortado al
restante hasta 95 cerca del tope.

**Rationale**: Rafa pide "de 5 en 5"; mantener el precio por punto
idéntico (suma de la curva) evita reinterpretar la economía y
respeta FR-002 sin tocar precios. Recortar al borde permite terminar
una progresión sin pasarse ni cobrar de más. El ledger
(`driver.training[attrId]`) sigue contando PUNTOS comprados, así que
los saves actuales continúan la curva donde la dejaron, sin migración.

**Alternatives considered**:

- Dos botones (+1 y +5) por fila: rechazado — en móvil la fila ya está
  llena (nombre, nivel, botón) y dobla la superficie de error.
- Precio plano 5×el siguiente paso: rechazado — abarata los puntos
  caros del final y cambia la economía total (FR-002 la exige intacta).
- Bloque de 5 "a ciegas" sin recorte en el tope: rechazado — cobraría
  puntos que no se pueden aplicar.
