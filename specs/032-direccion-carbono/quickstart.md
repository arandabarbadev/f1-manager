# Quickstart · 032-direccion-carbono

Guía de validación de la feature de principio a fin. Cada bloque
mapea a los requisitos del [spec](spec.md); la evidencia se recoge con
capturas (constitución IX).

## Prerrequisitos

- Partida jugable: arrancar `npm run dev`, entrar (modo local vale) y
  crear/abrir una partida con temporada en curso.
- Navegador con devtools para conmutar: ancho de viewport, tema
  claro/oscuro (conmutador de la cabecera) y emulación de
  `prefers-reduced-motion`.

## 0 · Regresión automática (intocada debe seguir verde)

```bash
npm run harness   # simulación/economía: sin cambios por esta feature
npm run build     # tsc + bundle: tipos y build limpios
```

**Esperado**: harness verde con los mismos resultados de siempre
(ningún archivo del motor se toca).

## 1 · Vestuario sin perder función (US-1, FR-001/002, SC-001)

Abrir Mi Equipo y verificar la lista completa de controles actuales:

1. Las 6 pestañas cambian y pintan su contenido (Pilotos con sus 4
   atributos +5, Sede con 3 categorías, Rivales, Patrocinadores,
   Campeonato).
2. Identidad: cambiar nombre del equipo (se guarda), color de librea,
   nombres y dorsales de los 2 pilotos; recargar: persiste.
3. Comprar un nivel de desarrollo: baja el presupuesto, sube el nivel,
   cambia el coste siguiente; agotar presupuesto: botones
   deshabilitados legibles.
4. Menú Más: Palmarés, Partidas, Instalar (si procede), Reiniciar
   (pide confirmación) y Salir (con sesión).
5. Botón de carrera: "Carrera · R#: <circuito>" (o Clasificación/
   Sprint según el acto pendiente) y "Ver temporada" con la
   temporada completa.

## 2 · Ley de la luz (US-2, FR-003/004/011, SC-003)

1. Recorrer la pantalla: el color de acción SOLO en accionables,
   pestaña activa y foco; ningún dato lo usa.
2. Comprar un desarrollo: la variación ("−43") aparece junto al
   presupuesto sin scroll y el total baja.
3. Categoría al máximo: distinción contundente SIN color de acción.
4. Cambiar la librea a #0A0A0A y a #FFFF00: los controles siguen
   igual de visibles en ambos extremos.

## 3 · Librea = dato (US-3, FR-005)

1. Cambiar la librea en Identidad: la ficha del equipo enseña el nuevo
   color (chip + valor) en vivo; NINGÚN color del hub cambia.
2. Guardar, salir y volver: la librea persiste como siempre.
3. Entrar a Carrera y a Palmarés: se ven y funcionan como antes de
   esta feature (mismo aspecto, librea tiñéndolas como hoy).

## 4 · Temas (US-4, FR-006, SC-004)

1. Conmutar claro/oscuro en el hub: mismo mundo, materiales claros
   legibles; el conmutador sigue en la cabecera.
2. En ambos temas: contrastes legibles de datos y controles (captura
   de cada tema en escritorio y móvil).

## 5 · Pulgar, teclado y calma (US-5, FR-007/008/009, SC-002)

1. Teclado (escritorio): Tab recorre TODO con foco visible; comprar
   con Enter no pierde el foco de la fila; Escape cierra Más y el
   foco vuelve a su botón.
2. Móvil (≈390 px y 320 px): sin scroll horizontal; objetivos ≥44 px;
   barra inferior solo con la acción de carrera y margen del sistema;
   el dinero, la carrera y dónde invertir se localizan en <10 s.
3. `prefers-reduced-motion: reduce`: el hub carga sin animación de
   entrada.

## 6 · PWA / offline (FR-010, SC-005)

1. `npm run build && npm run preview`: jugar con la pestaña offline
   (devtools): el hub rediseñado carga y funciona igual.

## Evidencias a entregar

Cinco capturas en `evidence/`, todas del juego real (`src/team-screen.ts`
vivo en el dev server de Vite, puerto 5199) montado por una página de
siembra temporal (`seed-hub.html`, borrada al cerrar la validación) con
datos controlados: Escudería Vega, librea #e10600, 27 Enzo Marchetti /
71 Kai Vidal, presupuesto 52 M€, temporada 2 · R9/21 Montreal,
aerodinámica 15/15 (MÁX) y seguridad 4/15. Método: Chrome headless
(`--headless=new --screenshot`), perfil limpio por captura,
`--virtual-time-budget` para esperar al render (1400 ms en la compra,
para pillar el chip delta que vive 1600 ms).

| Archivo | Verifica | Cómo se produjo |
| --- | --- | --- |
| `hub-dark-desktop.png` | §1 y §2 en oscuro: rejilla, nombre Black, bloque de título con chip de librea, atajos fantasma, volt solo en acción, botón de carrera a dos capas (acto + ronda en mono) | 1440×900, `?v=13` |
| `hub-light-desktop.png` | §4: variante papel del mismo mundo, volt oscurecido solo en acción, hairlines legibles (`--hub-line` #B9BFAE) | 1440×900, `?v=13&theme=light` |
| `hub-buy-delta.png` | §2.2: compra de seguridad L4 (−31 M€) con chip delta junto al monedero y total a 21 M€ en cabecera y ficha | 1440×900, `?v=13&shot=buy`, presupuesto virtual 1400 ms |
| `hub-dark-tall.png` | §1.3 y §2.3: las 9 filas de desarrollo con medidores de ticks blancos, MÁX grabado sin volt | 390×2400, `?v=13` |
| `hub-dark-mobile.png` | §5.2: móvil a 390 px — marca MM (la cabecera no desborda), pestaña activa en volt, barra inferior de carrera con safe-area | 390×844, `?v=13` |
| `hub-pilots-max.png` | §2.3: MÁX grabada unificada también en Pilotos (Ritmo 95/95 de Enzo Marchetti) tras el fix del revisor | 1440×1100, `?v=14&tab=pilots`, seed con `pace=95` |
| `hub-hq-max.png` | §2.3: MÁX grabada unificada en Sede (Mecánicos 10/10) | 1440×900, `?v=13&tab=hq`, seed con `staff.mechanics=10` |

Notas de validación manual que la captura no puede mostrar y se
verificaron en el navegador: foco restaurado a la fila tras comprar
(Tab/Enter), Escape cierra Más y devuelve el foco al botón, sin scroll
horizontal a 390/320 px, `prefers-reduced-motion` sin animación de
entrada, y extremos de librea #0A0A0A/#FFFF00 sin alterar el hub (la
librea solo cambia el chip-dato). Regresión automática: `npm run
harness` y `npm run build` en verde tras el cambio.
