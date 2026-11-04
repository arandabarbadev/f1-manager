# Data Model: 030 Entrenar de 5 en 5

Sin cambios de persistencia: el roster (`Driver.training` por slot y
nube) sigue guardando PUNTOS comprados por atributo. Lo nuevo es una
magnitud de compra calculada al vuelo.

## Entidades

- **Bloque de entrenamiento** (derivado, no se guarda):
  - `steps`: puntos del bloque = min(5, 95 − valor actual del
    atributo). 0 en el tope (botón MÁX).
  - `cost`: Σ 15×(bought+i) para i en 0..steps-1, donde `bought` es el
    ledger del atributo (`Driver.training[attrId]`).
  - Validación: se aplica entero o no se aplica (sin compras parciales
    por falta de dinero); el ledger sube `steps`; el atributo queda
    ≤ 95 siempre.

## Reglas

- Economía por punto intacta: el bloque cuesta exactamente lo mismo
  que sus pasos comprados de uno en uno.
- Sin descuento de ingenieros (staff, no piezas) — como hoy.
- Saves existentes: el ledger existente fija el precio del primer
  bloque nuevo; sin migración.
