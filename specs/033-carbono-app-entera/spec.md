# Feature Specification: «Carbono» en toda la app

**Feature Branch**: `033-carbono-app-entera`

**Created**: 2026-11-10

**Status**: Draft

**Input**: User description: "añade carbono a la app entera ya que no sale — hoy solo el hub Mi Equipo viste la dirección «Carbono» elegida en la spec 032 y el resto de pantallas siguen con el look viejo, así que el mundo no se ve fuera del hub"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Un solo mundo de puerta a puerta (Priority: P1)

Abro el juego desde cero (sesión cerrada) y todo lo que veo — el
acceso, la elección de partida, y cada pantalla después — viste el
mismo mundo «Carbono» que ya luce Mi Equipo: el suelo carbón con su
rejilla de construcción siempre visible, las palabras en la voz
tipográfica del mundo, las cifras en su cifra técnica, los módulos
enmarcados de esquinas rectas y el plano sin adornos. Ninguna
pantalla se queda con el look anterior: la app se siente como UN
objeto diseñado, no como cinco pantallas cosidas.

**Why this priority**: es la petición entera («que salga en toda la
app»): mientras la puerta de entrada y las partidas luzcan otro
mundo, el rediseño no existe para quien abre el juego.

**Independent Test**: cerrar sesión y recorrer acceso y partidas en
escritorio y móvil: entrar (modo local vale), crear una partida con
dificultad, jugarla y borrarla — todo funciona y todo luce el mundo.

**Acceptance Scenarios**:

1. **Given** sesión cerrada, **When** abro el juego, **Then** la
   pantalla de acceso viste el mundo: rejilla visible, tarjeta de
   acceso enmarcada, botones del mundo, y todos los caminos de
   entrada siguen ahí (entrar, registrarse, Google, sin cuenta).
2. **Given** el acceso, **When** entro en modo local, **Then** la
   pantalla de partidas muestra los 3 slots con su contenido actual
   (nombre, temporada, ronda, dificultad, la activa) en el mundo, y
   crear/jugar/borrar/salir funcionan igual, incluida la
   confirmación antes de borrar.
3. **Given** Firebase sin configurar, **Then** el aviso que lo
   explica sigue apareciendo, legible, en el mundo.
4. **Given** el juego instalado, **When** lo abro sin conexión,
   **Then** carga con el nuevo mundo y funciona igual.

---

### User Story 2 - El cierre y la historia, en el mundo (Priority: P1)

Al terminar la temporada, el resumen y el palmarés — las pantallas
donde vive la memoria de la carrera — hablan el mismo idioma que el
hub: las filas del resumen por ronda con sus posiciones y premios
como cifras técnicas, los totales con peso, el palmarés con sus
cifras de carrera arriba y una fila por temporada. Lo mío se
distingue por materia (marco, fondo tonal, peso de trazo), no por
color de acción; el campeón se subraya grabado, como el «MÁX» del
hub.

**Why this priority**: son las pantallas de datos por excelencia; si
el mundo no funciona ahí, no funciona. Y son las que más se ven al
cerrar temporada, el momento de mayor orgullo del juego.

**Independent Test**: cerrar una temporada y recorrer el resumen
completo y el palmarés (con y sin temporadas cerradas): todas las
cifras legibles, totales cuadrando, fila del campeón destacada, y
«Empezar temporada nueva» / volver al hub operativos.

**Acceptance Scenarios**:

1. **Given** la temporada completada, **When** termino la última
   carrera, **Then** el resumen luce el mundo: lista de rondas con
   posición y premio, totales, progresión de rivales, y las acciones
   (seguir/volver/crear nueva) al alcance.
2. **Given** un palmarés con temporadas cerradas, **Then** los
   totales (campeonatos, victorias, podios) encabezan con cifras de
   peso y cada temporada es una fila con su puesto, campeón y
   cuentas; la temporada campeona se distingue grabada.
3. **Given** una partida sin temporadas cerradas, **Then** el
   palmarés explica qué aparecerá, en el mundo, nunca vacío y mudo.
4. **Given** cambio de tema en cualquiera de las dos pantallas,
   **Then** el mundo claro legible (suelo papel, líneas visibles).

---

### User Story 3 - La carrera sobre el carbón (Priority: P1)

Llega el fin de semana y la carrera también vive en el mundo: la
cabecera con circuito, vuelta, clima y reloj como datos técnicos; la
torre de tiempos y los mandos de boxes enmarcados sobre el carbón;
las capas que aparecen (resultados, podio, elección de gomas,
presentación del GP, avisos y guía de primera vez) todas del mismo
mundo. La CARRERA sigue siendo contenido vivo e intacto: los coches
con sus colores de equipo, las gomas con su letra y color de
compuesto, las luces de salida, las banderas, el desgaste. El color
de acción solo señala lo que puedo hacer (elegir goma, confirmar
salida, velocidades) — nunca un dato ni un resultado.

**Why this priority**: la carrera es el corazón del juego y la
pantalla más compleja: si el mundo la respeta sin apagarla, el
rediseño está hecho; si la estropea, es un retroceso.

**Independent Test**: jugar un fin de semana completo (clasificación
→ sprint → carrera) en escritorio y móvil: parar con ambos coches,
cambiar velocidades, ver resultados y gráfico de ritmo, volver al
hub — todo funciona y todo (menos los coches y sus marcas) es
carbón.

**Acceptance Scenarios**:

1. **Given** una carrera en marcha, **When** la miro, **Then** la
   cabecera, la torre y los mandos visten el mundo; la vuelta, el
   reloj y las diferencias son cifras técnicas; mi coche/fila se
   distingue por materia, no por color de acción.
2. **Given** los mandos de boxes y velocidades, **When** actúo,
   **Then** lo accionable se distingue por el color de acción y la
   goma elegida se confirma igual que hoy; las gomas siguen
   identificándose por anillo + letra aunque no se vea color.
3. **Given** el final de la carrera, **Then** el panel de resultados
   (podio, posiciones, premios, desglose, gráfico de ritmo) luce el
   mundo; el P1 del podio y mis resultados se destacan con materia;
   los premios son cifras.
4. **Given** la elección de goma inicial o una parada, **Then** el
   acto de confirmar lleva el color de acción; la presentación del
   GP y los avisos (toasts) también visten el mundo.
5. **Given** tema claro durante la carrera, **Then** el trazado, los
   coches y las banderas siguen legibles (la goma blanca mantiene su
   borde) y los datos del mundo claro son legibles.

---

### User Story 4 - La ley del color, audito en toda la app (Priority: P2)

La ley que gobierna el hub gobierna la app: UN color de acción,
solo en lo accionable, lo activo y el foco; fijo, jamás ligado a la
librea. La librea del jugador pasa a ser un dato en TODAS las
pantallas (chips, puntos, color de los coches): cambiarla ya no
retinta nada de la interfaz en ningún sitio, y ningún look de librea
(oscura o clara) puede apagar un control. Los colores con
significado (verde éxito, ámbar aviso, rojo peligro) se quedan donde
significan algo — avisos, desgaste, banderas, subidas y bajadas con
su forma y su signo — y no aparecen como decoración.

**Why this priority**: es lo que hace al mundo coherente y a la
marca honesta; sin esta auditoría, cada pantalla interpretaría la
ley a su manera y volveríamos al arcoíris.

**Independent Test**: cambiar la librea a casi negro y a amarillo
puro y recorrer todas las pantallas: nada cambia salvo los coches y
fichas de dato; recorrer cada pantalla buscando el color de acción
fuera de lo accionable: no aparece.

**Acceptance Scenarios**:

1. **Given** cualquier pantalla o capa flotante, **When** busco el
   color de acción, **Then** solo aparece en accionables, estado
   activo y foco — ni datos, ni énfasis, ni decoración.
2. **Given** cambio la librea a un extremo, **When** recorro toda la
   app, **Then** ningún control, línea o fondo de la interfaz cambia
   de color; los coches y el dato de librea sí.
3. **Given** un aviso de éxito y uno de peligro, **Then** se
   distinguen por su color de significado con la calma del mundo,
   sin dejar de ser legibles en ambos temas.
4. **Given** subidas y bajadas de posiciones en la torre, **Then** la
   forma (flecha/signo) basta para entenderlas; el color solo ayuda.

---

### User Story 5 - Luz y calma en todas las pantallas (Priority: P2)

El mundo claro (papel) y la calma existen en toda la app, no solo en
el hub: cada pantalla legible en ambos temas desde el mismo
conmutador; el movimiento decorativo desactivado cuando el sistema
pide menos movimiento (la carrera es contenido y sigue viva); los
objetivos táctiles generosos y sin scroll horizontal en el móvil,
con las acciones principales al alcance del pulgar.

**Why this priority**: es la base de calidad del mundo (constitución IV):
si hay que elegir entre expresividad y poder jugar una temporada
entera con una mano, gana la mano.

**Independent Test**: recorrer todas las pantallas conmutando tema,
emulando `prefers-reduced-motion` y probando 390/320 px de ancho:
todo legible, todo operativo, nada desborda.

**Acceptance Scenarios**:

1. **Given** cualquier pantalla, **When** conmuto el tema, **Then**
   el mundo cambia entero (suelo, líneas, cifras) y sigue legible,
   con el color de acción adaptado al claro como en el hub.
2. **Given** `prefers-reduced-motion` activo, **When** navego entre
   pantallas y aparece un aviso, **Then** nada se desliza ni hace
   fade; la carrera en sí (coches, reloj, luces) sigue viva.
3. **Given** 390 y 320 px de ancho, **Then** ninguna pantalla tiene
   scroll horizontal y los controles usables a pulgar miden lo
   suficiente.

### Edge Cases

- La goma dura (blanca) sobre tema claro: conserva su borde para no
  desaparecer (hoy ya lo hace; debe seguir así sobre el papel nuevo).
- El trazado de la carrera sobre el suelo carbón y sobre el papel:
  asfalto y halo deben seguir separándose del suelo en ambos temas.
- Nombres de circuito largos en la cabecera de carrera (móvil): se
  recortan con elegancia, sin desbordar la barra.
- El aviso «Firebase sin configurar» y el aviso de borrar partida:
  textos largos dentro del mundo, legibles en móvil.
- Estados vacíos (palmarés sin temporadas, slot vacío): explican qué
  habrá, en el mundo, nunca mudos.
- La guía de primera vez flotando sobre la carrera: legible sobre el
  carbón y el papel, cerrable con un toque.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: TODAS las pantallas del juego (acceso, partidas, Mi
  Equipo, carrera, resumen de temporada, palmarés) y TODAS sus capas
  flotantes (resultados, elección de gomas, presentación del GP,
  avisos/toasts, guía de primera vez, menús) presentan el mundo
  «Carbono» definido en la spec 032: suelo con rejilla de
  construcción siempre visible, palabras y cifras con la voz
  tipográfica del mundo, módulos enmarcados de esquinas rectas, plano
  sin sombras salvo lo que flota. Ninguna superficie conserva el look
  anterior.
- **FR-002**: En toda la app hay UN único color de acción, reservado
  exclusivamente a elementos accionables, estado activo y foco; jamás
  a datos, énfasis, decoración o información. Es fijo: no depende del
  tema claro/oscuro en su papel de acción (se adapta para mantener
  contraste, como ya hace el hub) ni de la librea del jugador.
- **FR-003**: La librea del jugador no tiñe la interfaz en
  ninguna pantalla: se muestra como dato (chips de color, puntos de
  equipo, color de los coches en pista). Ningún control, línea o
  fondo de la interfaz cambia al cambiar la librea.
- **FR-004**: Toda cifra del juego (posiciones, vueltas, tiempos,
  diferencias, premios, presupuesto, contadores, totales) se pinta
  con la cifra técnica del mundo (monoespaciada, tabular). La fuente
  condensada del look anterior se retira: las posiciones y contadores
  de la carrera son datos, no titulares.
- **FR-005**: Los colores de significado (verde éxito, ámbar aviso,
  rojo peligro) aparecen solo donde significan algo (avisos,
  desgaste, banderas, subidas/bajadas) y siempre con redundancia de
  forma o signo; nunca como decoración, relleno ni acción.
- **FR-006**: El contenido de la carrera queda intacto: colores de
  equipo de los coches, identificación de gomas por anillo y letra,
  luces de salida, banderas, desgaste con sus estados, reloj y ritmo.
  El trazado se mantiene legible sobre el suelo nuevo en ambos temas.
- **FR-007**: Ninguna función se pierde: entrar/registrarse/Google/sin
  cuenta, crear-jugar-borrar partida (con confirmación y dificultad),
  el fin de semana completo con paradas y velocidades, gráfico de
  ritmo, cierre de temporada con progresión de rivales, palmarés,
  menús, tema e instalación funcionan exactamente igual que hoy.
- **FR-008**: Los énfasis de datos (mi fila/coche en tablas y torre,
  el P1 del podio, la temporada campeona, la vuelta rápida) se marcan
  con materia (marco, fondo tonal, peso de trazo, grabado) — nunca
  con el color de acción.
- **FR-009**: Los dos temas funcionan en cada pantalla y capa con
  legibilidad verificable, conmutados desde el mismo control de hoy.
- **FR-010**: La preferencia de menos movimiento se respeta en toda
  la app (la carrera como contenido sigue viva); los objetivos
  táctiles mantienen el mínimo del mundo y ninguna pantalla desborda
  en horizontal en el móvil.
- **FR-011**: La app instalada (offline) carga y funciona con el
  mundo nuevo sin pasos adicionales.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Recorrido completo de la app (acceso → partidas → Mi
  Equipo → fin de semana completo → resumen → palmarés) en oscuro y
  claro: 0 pantallas o capas con restos del look anterior; evidencia
  en capturas de cada pantalla en ambos temas.
- **SC-002**: Auditoría de la ley del color pantalla a pantalla: el
  color de acción aparece exclusivamente en accionables/activo/foco;
  0 desvíos documentados.
- **SC-003**: Librea al casi-negro y al amarillo puro: 0 cambios de
  interfaz en cualquier pantalla; coches y fichas de dato sí cambian.
- **SC-004**: Regresión automática del motor en verde y un fin de
  semana jugado de principio a fin con los mismos controles y
  resultados que hoy.
- **SC-005**: Móvil a 390 y 320 px: 0 scroll horizontal, objetivos
  táctiles dentro del mínimo, ambos temas legibles.
- **SC-006**: Con la pestaña offline (app instalada): la app carga y
  funciona con el mundo nuevo.

## Assumptions

- El nombre, icono y textos de la app no cambian; es un vestuario,
  no un cambio de producto.
- El hub (spec 032) ya está en el mundo: solo se ajusta lo mínimo
  para compartir la base global (p. ej. convivir bajo la misma capa
  de mundo), sin rediseñarlo de nuevo.
- Motor de simulación, economía y guardado quedan fuera de alcance:
  intactos.
- No hay pantallas nuevas ni contenidos nuevos: el mismo contenido,
  en el mundo.
- Los colores de compuesto de goma y de bandera son contenido del
  deporte (códigos F1 reales) y no se renegocian con el mundo.
