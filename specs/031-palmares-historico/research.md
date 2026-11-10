# Research: 031 Palmarés histórico

**Decision**: la entrada se calcula y congela EN EL CIERRE
("Empezar temporada nueva"), no al vuelo: puesto y campeón salen de
`computeChampionship` sobre los `seasonResults` completos; las
victorias/podios se cuentan solo en resultados de `race` usando sus
`standings` (guardados en orden de clasificación final). El nombre del
campeón se resuelve contra el roster en ese momento y se guarda como
texto. La pantalla es un módulo propio al estilo slots-screen, con
entrada por el menú Más y estado vacío explicado.

**Rationale**: los `seasonResults` se borran al reiniciar la
temporada, así que lo único durable es lo congelado; las standings de
carrera ya existen por coche (fase 7), son la fuente exacta de
victorias/podios (un P1+P3 del mismo equipo = 1 victoria y 2 podios);
el nombre-texto evita re-resolver ids contra un roster que puede
renombrarse (la historia no se reescribe). Idempotencia por número de
temporada = mismo patrón que `rivalEvolvedThroughSeason` (029), pero
aquí basta mirar la propia lista.

**Alternatives considered**:

- Reconstruir al vuelo desde seasonResults: imposible — se borran en
  el cierre (es justo lo que hoy se pierde).
- Guardar también puntos/dinero por temporada: descartado por Rafa
  (opción "esencial"); los totales de la cabecera derivan de las
  entradas.
- Grabar al ABRIR el resumen (como 029): descartado — el resumen se
  puede reabrir sin cerrar; "Empezar temporada nueva" es el único
  momento en que la temporada acaba de verdad (y es idempotente por
  diseño).
- Derivar totales guardándolos: innecesario — se calculan de la lista
  (una sola fuente de verdad).
