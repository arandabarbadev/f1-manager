# Checklist de requisitos 027

- [x] FR-001 — CSS: reduce desactiva fundidos de pantalla y animaciones de avisos (entrada y salida).
- [x] FR-002 — swapScreen instantáneo con reduce (sin clases de transición).
- [x] FR-003 — Carrera en vivo: sin tarjeta del GP (cabecera conserva nombre+vueltas) y sin capa de efectos (anillos/destellos/textos flotantes); MediaQueryList consultado, no cacheado.
- [x] FR-004 — Coches/reloj/luces/torre/resultados intactos; avisos con su ttl; sin reduce = como antes.
- [x] SC-001 — Con reduce emulado: sin screen-enter, aviso animation-name none, sin gp-intro, carrera corriendo.
- [x] SC-002 — Sin reduce: gp-intro aparece y avisos animan.
- [x] SC-003 — Alternar la preferencia en caliente no borra datos ni lanza errores.
- [x] SC-004 — Harness sin regresiones.
