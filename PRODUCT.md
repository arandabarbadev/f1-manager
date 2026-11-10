# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Confirmado por el autor: el propio autor (jugador principal, criterio de calidad último), amigos y conocidos, y público hispanohablante que llega por GitHub Pages: aficionados a la Fórmula 1 y a juegos de gestión que buscan algo gratis, directo en el navegador y en español. El juego se juega sobre todo en el móvil (PWA instalable), también en escritorio.

## Product Purpose

«Motorsport Manager» es un juego de gestión de un equipo de Fórmula 1 ficticio: diriges tu escudería durante temporadas completas — desarrollas el coche (aerodinámica, motor, chasis, fiabilidad), entrenas pilotos, amplías la sede (mecánicos, ingenieros, comerciales), firmas patrocinadores, administras el presupuesto y corres los fines de semana (clasificación → sprint → carrera) viendo la carrera en vivo sobre el trazado real del circuito, con paradas, gomas, incidentes y campeonato de pilotos y constructores. El éxito es que una temporada entera se pueda jugar de principio a fin en el móvil, con economía tensa y carreras emocionantes, y que el progreso nunca se pierda.

## Positioning

Un manager de F1 completo en una PWA gratuita y offline: estructura real de fin de semana y campeonato sobre circuitos reales, pero mundo 100% ficticio (patrocinadores inventados, pilotos inventados, cero licencias), en español. Todo el código (simulación, trazados, UI) es propio, sin frameworks de interfaz ni dependencias externas en tiempo de ejecución salvo Firebase (opcional).

## Operating Context

- Flujo real: entrada (login Firebase o modo local) → 3 slots de partida → hub «Mi Equipo» (pestañas Mi Equipo, Pilotos, Sede, Rivales, Patrocinadores, Campeonato; cabecera con presupuesto, tema, menú «Más») → botón «Ir a la carrera» → pantalla de carrera en vivo → resumen de temporada → nueva temporada. Pantalla de palmarés con el historial congelado de temporadas cerradas.
- Temporada de 21 carreras con circuitos reales por nombre (Melbourne, Mónaco, Spa, Monza…; Miami y Jerez se sumaron en la spec 020), formato de fin de semana encadenado (la clasificación siembra la parrilla del sprint, etc.).
- Economía con dificultad elegible (fácil/normal/difícil): presupuesto inicial, costes de desarrollo, premios, ingresos por patrocinio; los 9 equipos rivales evolucionan al cerrar cada temporada.
- Guardado por slot en localStorage, sincronización opcional con la nube (Firebase) y migración automática de partidas antiguas.

## Capabilities and Constraints

- Stack libre desde la enmienda del constitution (2026-11-08): framework y librerías a elección del agente, declarados en el plan; fuentes externas y servicios de terceros siguen siendo excepción justificada. La implementación debe verse bien en ordenador y móvil y funcionar en GitHub Pages (hosting estático).
- Los bocetos de dirección (`bocetos/`) son HTML/CSS/JS propios y autocontenidos, por petición expresa de Rafa en esa tarea.
- Firebase es opcional: sin configuración el juego va en modo local completo.
- PWA instalable con service worker propio (offline total en producción), temas claro/oscuro, acento de la UI dinámico según el color de la escudería del jugador.
- Simulación propia por laps con ritmo, desgaste, clima/lluvia, paradas y seguridad; gráfico de ritmo por vuelta tras cada carrera.
- Restrictions de licencia: nada de logo, nombre ni marca oficial de la F1/FOM; los circuitos usan nombres de ciudad reales pero el resto del mundo es ficticio.

## Brand Commitments

- Nombre definitivo: «Motorsport Manager» (título e icono actuales).
- Idioma: español.
- Estética inspirada en la Fórmula 1 (colores intensos, tipografía fuerte, sensación de velocidad) sin usar marca oficial alguna — regla explícita del autor para el rediseño.
- Dirección visual elegida (2026-11-08): «Carbono» (referencia viva: `bocetos/boceto-3.html`), en «dirección pura»: sin préstamos de las direcciones descartadas. Contrato completo en `.impeccable/surfaces/src-team-screen-ts.md`.

## Evidence on Hand

- Código fuente completo en `src/` (6 pantallas + motor de simulación + economía + nube) y 31 especificaciones detalladas en `specs/` que documentan cada feature con su porqué.
- Datos reales: 20 trazados de circuitos (`src/real-layouts.ts`), 100 patrocinadores ficticios, banca de nombres de pilotos ficticios.
- No existen assets de marca oficial ni deben fabricarse nunca.

## Product Principles

1. Jugable ya, en cualquier sitio: gratis en el navegador, instalable, offline; sin fricción para empezar una temporada.
2. Ficción con esqueleto real: reglas y ritmo de un fin de semana de F1 real, mundo inventado sin licencias.
3. El pulgar manda: móvil primero; la acción principal siempre al alcance del pulgar.
4. Los números son el juego: tiempos, presupuestos y clasificaciones siempre legibles y precisos (cifras tabulares).
5. El progreso es sagrado: guardado local migrable hacia adelante y sincronización opcional; nada se pierde por actualizar.

## Accessibility & Inclusion

- Temas claro/oscuro conmutable; `prefers-reduced-motion` respetado en todo el juego (fundidos y avisos se desactivan; la carrera en sí es contenido y sigue viva).
- Identificación de gomas independiente del color (anillo + letra S/M/H/I/W); contraste del acento calculado por luminancia.
- Objetivos táctiles generosos (botones ≥36 px de alto).
