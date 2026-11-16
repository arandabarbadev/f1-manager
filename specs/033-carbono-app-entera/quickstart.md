# Quickstart · 033-carbono-app-entera

Guía de validación de la feature de principio a fin. Cada bloque
mapea a las historias del [spec](spec.md); la evidencia se recoge
con capturas del juego real (constitución IX).

## Prerrequisitos

- `npm run dev` arrancado; devtools para viewport, tema
  claro/oscuro (conmutador de la app) y `prefers-reduced-motion`.
- Para la carrera: una partida con fin de semana pendiente (vale una
  sembrada; el método de siembra se documenta con las evidencias).

## 0 · Regresión automática (motor intacto)

```bash
npm run harness   # mismos resultados de siempre
npm run build     # tipos y build limpios (y menor: Barlow fuera)
```

## 1 · Un mundo de puerta a puerta (US-1)

1. Sesión cerrada: la pantalla de acceso viste el mundo (rejilla,
   tarjeta enmarcada, inputs desnudos) y los 4 caminos de entrada
   siguen (entrar, registrarse, Google, sin cuenta). Sin Firebase
   configurado: el aviso sigue, legible.
2. Modo local → partidas: los 3 slots con su contenido (nombre,
   temporada/ronda, dificultad, activa), crear con dificultad,
   jugar, borrar CON confirmación, salir/sesión.
3. Instalada (o pestaña offline tras cargar): abre y funciona igual.

## 2 · Cierre e historia en el mundo (US-2)

1. Cerrar una temporada: el resumen viste el mundo — rondas con
   posición y premio como cifra técnica, totales con peso,
   progresión de rivales, y «Empezar temporada nueva» como bloque de
   acción.
2. Palmarés: totales arriba (campeonatos/victorias/podios), una fila
   por temporada (reciente primero), campeona grabada; con partida
   sin historial: explica qué aparecerá.
3. Conmutar tema en ambas: mundo papel legible.

## 3 · La carrera sobre el carbón (US-3)

1. Jugar un fin de semana completo (clasificación → sprint →
   carrera): cabecera con circuito/VUELTA/clima/reloj en mono, torre
   y mandos del mundo, MI fila por materia.
2. Parar con ambos coches (anillo+letra de goma intactos), cambiar
   velocidades (activo = acción), presentación GP y elección de
   gomas del mundo con el confirmar accionable.
3. Resultados: podio (P1 por materia), posiciones y premios como
   cifras, desglose y gráfico de ritmo (dos formas, color de equipo
   visible), acciones al pie.
4. Tema claro DURANTE la carrera: trazado/coches/banderas legibles
   (goma blanca con borde), datos legibles.

## 4 · Ley del color y librea-dato (US-4)

1. Recorrido de auditoría pantalla a pantalla: el color de acción
   SOLO en accionables/activo/foco; MÁX/vuelta rápida/campeón/P1/mi
   fila grabados o en materia, nunca en acción.
2. Librea a #0A0A0A y a #FFFF00: NINGÚN cambio de interfaz en
   ninguna pantalla; coches, puntos de equipo y líneas del gráfico
   sí (y el gráfico sigue visible con la librea oscura).

## 5 · Luz y calma (US-5)

1. Conmutar tema en TODAS las pantallas: mundo entero, legible.
2. `prefers-reduced-motion: reduce`: sin deslizamientos ni fundidos;
   la carrera viva igual.
3. 390 y 320 px: sin scroll horizontal; objetivos táctiles ≥44 px
   (los selectores compactos de velocidad pueden ser menores, como
   hoy: documentar la excepción si se mantiene).

## 6 · PWA / offline (FR-011)

1. `npm run build && npm run preview`: pestaña offline → la app
   completa carga y funciona con el mundo nuevo.

## Evidencias a entregar

Capturas en `evidence/` del juego real (`src/` vivo en el dev server
de Vite, puerto 5199) montado por una página de siembra temporal
(`seed-app.html` + `seed-app.ts`, borradas al cerrar la validación)
con datos controlados: Escudería Vega, presupuesto 52 M€, partida
normal; para el resumen, 21 rondas completas con un sprint extra y
340 M€; para el palmarés, 2 temporadas cerradas (la 1ª campeona).
Método: Chrome headless (`--headless=new --screenshot`), perfil
limpio por captura (ruta Windows absoluta para Chrome y para el
`--user-data-dir`, con `cygpath`), `--virtual-time-budget` para
esperar al render (2,5-3 s en gestión, 6-9 s en carrera para que el
autopiloto del seeder pase presentación y elección de goma), y
tutorial de primera vez marcado como visto para capturas limpias.

| Archivo | Verifica | Cómo se produjo |
| --- | --- | --- |
| `auth-dark.png` / `auth-light.png` | §1: acceso en el mundo (rejilla, tarjeta enmarcada, inputs desnudos, Entrar en volt), ambos temas | 1440×900, `?screen=auth`, `&theme=light` en la clara |
| `slots-dark.png` / `slots-light.png` | §1: los 3 slots en el mundo — mono en la meta, dificultad con activo volt, Jugar/Crear volt, la activa por materia | 1440×900, `?screen=slots&seed=slots`, `&theme=light` en la clara |
| `season-dark.png` / `season-light.png` | §2: resumen de cierre — filas hairline, posiciones/premios en mono tinta, UN botón primario | 1440×1000, `?screen=season&seed=season` |
| `palmares-dark.png` / `palmares-light.png` | §2: totales con cifras grandes mono y temporada campeona GRABADA (borde de tinta + relleno tonal) | 1440×1000, `?screen=palmares&seed=palmares`, `&theme=light` en la clara |
| `race-dark.png` | §3: carrera sobre carbón — rejilla alrededor del asfalto, vuelta en mono, torre con mis filas (P14/P15) en materia, boxes con anillos | 1440×900, `?screen=race&seed=race`, 6 s de presupuesto |
| `race-light.png` | §4/§5: carrera en papel — asfalto separado del suelo (#D7D9DC calibrado), goma blanca con borde, activo 1x en volt oscurecido | 1440×900, `&theme=light` |
| `race-mobile.png` | §5.3: 390 px sin scroll horizontal; acciones de cabecera al piso de 44 px (envuelven en 2 filas) y columna de diferencia ensanchada (4 em) tras la revisión | 390×844, 9 s |
| `pace-chart-dark-livery.png` | §4.2: gráfico de ritmo con librea #0A0A0A — la guarda `--livery-line` lo mantiene visible (líneas plateadas, formas sólida/discontinua) | 520×400, `?screen=chart&seed=race&livery=%230A0A0A` |
| `pace-chart-light.png` | §4/§5: el mismo gráfico en papel, con la vuelta de parada marcada | 520×400, `&theme=light` |
| `livery-extreme.png` | §4.1-2: librea #FFFF00 — amarillo SOLO en chips de dato; cero tinte en la interfaz; volt distinto de la librea | 1440×900, `?screen=hub&seed=hub&livery=%23FFFF00` |
| `hub-unchanged.png` | §1/R10: el hub comparte la base global y luce como en 032 (regresión: rejilla, mast, riel, botón a dos capas) | 1440×900, `?screen=hub&seed=hub` |

Notas de validación:
- El panel de resultados y el chip de vuelta rápida no son
  capturables en headless (la simulación corre sobre rAF y el tiempo
  virtual de Chrome no la avanza): sus reglas están verificadas por
  revisión de código sobre el mismo vocabulario capturado (módulo
  enmarcado + sombra de flotante, cifras mono, podio/míos por
  materia) y quedan por confirmar en vivo en la primera carrera real
  (constitución IX: dicho qué falta y cómo se comprobará).
- El speed-group compacto (1x-20x) es la excepción táctil
  documentada (tira secundaria); todo objetivo principal ≥44 px.
- La primera captura del gráfico con librea casi negra es la prueba
  del canal de dato R5: sin la guarda, esas líneas serían invisibles.
- Regresión automática: `npm run harness` y `npm run build` en verde
  tras el cambio (Barlow fuera del bundle: solo 2 woff2 de Inter).
