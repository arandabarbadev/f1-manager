---
version: 1
slug: "src-team-screen-ts"
primary_target: "src/team-screen.ts"
related_targets: ["src/ui.css","src/team-screen.css"]
---

# Surface brief · Hub «Mi Equipo» (src/team-screen.ts)

## Scope & mode
Rediseño visual del hub de gestión (pantalla Mi Equipo y su shell compartido). Modo: Operate. No cambia funcionalidad, datos ni flujos del juego.

## Audience / job
Quien juega a Motorsport Manager gestionando su escudería entre carreras: gastar presupuesto, desarrollar el coche, entrenar pilotos, firmar patrocinadores y saltar a la carrera.

## Direction contract
THESIS: El hub es la mesa de ingeniería de una escudería de noche: carbono mate con la rejilla de construcción siempre visible y UN acento eléctrico que significa exactamente «aquí puedes actuar». Rechaza el dashboard genérico oscuro+neón y las tarjetas iguales: la rejilla y el bloque de título de plano técnico son la identidad.

OWN-WORLD: Carbono #0E0F11 con rejilla hairline 16/80 px visible en todo el shell; los datos SIEMPRE en blanco (#F2F3F5) y monoespaciada tabular; Inter en pesos extremos (Black display, 500 labels); volt #D6FF3F reservado exclusivamente a acción/activo/foco y FIJO (nunca ligado a la librea: la librea es un dato con chip, como en un plano); hairlines #262932; módulos enmarcados 1 px sobre la rejilla; movimiento a pasos (steps 90-140 ms) y quieto con prefers-reduced-motion.

STORY: El jugador dirige una fábrica de precisión: el equipo se presenta en un bloque de título de plano (presupuesto, pilotos, sede, librea, mejor resultado), cada gasta deja chip delta visible, y la única luz encendida de la pantalla es la salida a carrera.

FIRST VIEWPORT: Escritorio: mast con hairline (wordmark Inter 900 + monedero mono con delta + Más), riel de texto con pestaña activa marcada en volt y el botón CARRERA como EL bloque volt al fondo del riel; zona de trabajo: nombre del equipo Inter Black clamp(44-86 px) directamente sobre la rejilla, dataline mono, regla graduada, bloque de título, atajos fantasma con borde 1 px, módulos enmarcados Identidad y Desarrollo (9 filas con medidores de ticks blancos, botones fantasma, MÁX grabado en caja). Móvil: héroe recortado, tabs con activo volt, barra inferior solo-carrera con safe-area. Interacción firma: comprar = chip delta en el monedero + un tick más; el volt jamás pinta datos.

FORM: Candidato propio nº 4 de mi lista ordenada (carbono nocturno de carrera), elegido por Rafa el 2026-11-08 entre las tres direcciones presentadas, expresamente en «dirección pura» (sin préstamos de Gran Premio ni de Muro de Boxes) y contra el candidato asignado por el dado (nº 3, póster). seed:c55ebb976d25b5a3

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Unresolved
MÁX hereda la caja grabada del boceto (púrpura/ámbar del Muro descartados por dirección pura). Orden o agrupación de las 9 filas de desarrollo: se queda como está hoy en el juego. El resto de pantallas (login, partidas, carrera, temporada, palmarés) heredarán este mundo en fases posteriores.
