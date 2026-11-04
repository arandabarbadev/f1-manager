# Quickstart: 030 Entrenar de 5 en 5

## Validación con la app en la mano

1. `npm run build && npm run harness` → verde, con el "Pilotos check"
   actualizado (bloque +5, economía = 5 compras de +1, borde del tope).
2. Preview local + Chrome (CDP), con una partida con dinero:
   - Pestaña **Pilotos**: cada fila muestra `+5 · N M€`.
   - Un click: atributo +5, `val` recalculado, dinero −N.
   - Save sembrado con un atributo a 93 → botón `+2 · …`, click → 95
     y MÁX después.
   - Pestaña **Coche**: los botones siguen `+1 · …` intactos.
   - Consola sin errores. Capturas.
3. En el móvil (deploy): subir de 50 a 90 son 8 toques, no 40.
