# Checklist de requisitos 026

- [x] FR-001 — visibilitychange pausa la carrera en marcha; nunca se reanuda sola; aviso info solo cuando la pausa fue automática.
- [x] FR-002 — Wake lock pedido en luces fuera y al reanudar; liberado en pausa/fin/ocultar/salir; sin soporte: igual y sin errores ni avisos.
- [x] FR-003 — Al desmontar la pantalla el interval y el rAF de esa carrera mueren y se limpia el listener.
- [x] FR-004 — Sin cambios de simulación/economía/guardado; offline OK.
- [x] SC-001 — Ocultar 30 s y volver: mismo reloj y vuelta, "Seguir", aviso único.
- [x] SC-002 — Pausa manual + irse + volver: sigue pausada, sin aviso.
- [x] SC-003 — "Seguir" reanuda a la misma velocidad y pide el lock sin errores.
- [x] SC-004 — Consola sin errores en todo el flujo; harness sin regresiones.
