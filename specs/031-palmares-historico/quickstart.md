# Quickstart: 031 Palmarés histórico

## Validación con la app en la mano

1. `npm run build && npm run harness` → verde, con el "Palmarés
   check" (puesto, campeón, victorias/podios solo de carreras,
   idempotencia, totales, migración de saves).
2. Preview local + Chrome (CDP):
   - Save sembrado con la temporada completa (10 victorias y 20
     podios de mis coches; mi piloto campeón) → "Ir a la carrera"
     abre el resumen → "Empezar temporada nueva" → Más → Palmarés:
     totales (1 campeonato · 10 victorias · 20 podios) y la fila de
     la temporada 1 con P1, campeón y números.
   - La temporada 2 arranca limpia; reabrir Palmarés no duplica.
   - Partida recién creada → Palmarés con el mensaje de estado vacío.
   - Consola sin errores. Capturas.
3. En el móvil (deploy): tras cerrar tu primera temporada, el
   palmarés queda en el menú Más para siempre.
