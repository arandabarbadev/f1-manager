# Feature Specification: Dirección «Carbono» para el hub Mi Equipo

**Feature Branch**: `032-direccion-carbono`

**Created**: 2026-11-09

**Status**: Draft

**Input**: User description: "aplicar al juego real la dirección visual «Carbono» elegida en los bocetos (bocetos/boceto-3.html) — rediseño del hub Mi Equipo y su shell compartido (ui.css + team-screen) sin cambios de funcionalidad"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - El hub viste «Carbono» sin perder nada (Priority: P1)

Abro Mi Equipo y la pantalla principal del juego luce la identidad
elegida por Rafa entre los tres bocetos: la dirección «Carbono»
(referencia viva: `bocetos/boceto-3.html`; contrato de dirección:
`.impeccable/surfaces/src-team-screen-ts.md`). Todo lo que hoy sé hacer
sigue estando y funcionando exactamente igual: las 6 pestañas, el
presupuesto, el menú Más, la identidad del equipo, los 9 desarrollos
con sus costes y el botón de carrera.

**Why this priority**: es la petición entera — nuevo vestuario con
cero pérdida de función. Si algo dejara de funcionar, el rediseño
sería un retroceso.

**Independent Test**: recorrer el hub completo en escritorio y móvil
comprobando una a una las acciones actuales (cambiar pestañas, editar
nombre/pilotos/dorsales, comprar niveles, abrir Más, ir a carrera).

**Acceptance Scenarios**:

1. **Given** una partida en curso, **When** abro Mi Equipo, **Then**
   veo la dirección «Carbono» y TODOS los contenidos actuales: hero
   con nombre/puesto/presupuesto, accesos de sección, identidad
   (nombre, color de librea, 2 pilotos con dorsales) y los 9
   desarrollos con nivel, coste del siguiente nivel y botón de compra.
2. **Given** el menú Más abierto, **Then** siguen Palmarés, Partidas,
   Instalar app (si el navegador lo ofrece), Reiniciar y Salir (con
   sesión iniciada), y cada uno hace lo mismo que hoy.
3. **Given** el botón de carrera, **Then** conserva su contenido
   dinámico actual: próximo acto con ronda y circuito ("Carrera · R9:
   Montreal"), o "Ver temporada" al completarla.
4. **Given** compro un nivel de desarrollo, **Then** el nivel sube, el
   coste del siguiente se recalcula, el presupuesto baja y el botón se
   deshabilita si ya no alcanza — igual que hoy, con el nuevo
   vestuario.

### User Story 2 - La ley de la luz: un solo color para la acción (Priority: P1)

En el hub rediseñado hay UN único color de acción, reservado
exclusivamente a lo que puedo pulsar, a la pestaña activa y al foco de
teclado. Los datos (dinero, niveles, tiempos de la temporada) nunca lo
usan. Ese color es fijo: no cambia aunque cambie la librea de mi
equipo. Y cada gasto deja huella: al comprar un desarrollo, la cifra
del presupuesto muestra inmediatamente cuánto ha bajado, sin buscarlo.

**Why this priority**: es la seña de identidad de la dirección elegida
(«la luz significa aquí puedes actuar») y la corrección del problema
que la crítica encontró en el boceto: una librea oscura no puede apagar
los controles.

**Independent Test**: recorrer el hub: comprar, cambiar de pestaña,
navegar con teclado; en todo momento se distingue sin pensarlo qué es
dato y qué es botón, y cada compra enseña su variación de presupuesto.

**Acceptance Scenarios**:

1. **Given** el hub abierto, **When** recorro visualmente la pantalla,
   **Then** el color de acción aparece solo en elementos accionables,
   pestaña activa y foco; cifras, medidores y textos de datos no lo
   usan jamás.
2. **Given** presupuesto 52 M€, **When** compro un nivel de 43 M€,
   **Then** junto a la cifra del presupuesto aparece de inmediato la
   variación ("−43") y el nuevo total (9), visibles sin hacer scroll.
3. **Given** una categoría de desarrollo al máximo (15/15), **Then** su
   estado se distingue con contundencia sin usar el color de acción
   (los datos no se visten de acción).
4. **Given** cambio el color de librea a uno muy oscuro y a uno muy
   claro, **Then** los controles del hub siguen igual de visibles y
   localizables en ambos casos.

### User Story 3 - La librea es un dato, no el vestuario (Priority: P2)

Cambiar el color de librea de mi equipo ya no repinta el hub: la
librea pasa a mostrarse como un dato más de la ficha del equipo (su
color y su valor, visibles y actualizándose en vivo al elegirlo). Las
pantallas que aún no han heredado la dirección (carrera, temporada,
partidas, palmarés, acceso) conservan su comportamiento actual,
incluido que la librea las tiña, hasta sus fases posteriores.

**Why this priority**: desacoplar librea y acción es lo que hace a la
dirección viable en el juego real (el acento dinámico actual pintaría
controles con cualquier color de librea); pero el resto de pantallas
no puede quedar a medias tintadas de otro mundo.

**Independent Test**: cambiar la librea en Identidad y comprobar: el
chip/dato de la ficha se actualiza al instante, el hub no cambia de
color, y al entrar a Carrera el comportamiento actual se mantiene.

**Acceptance Scenarios**:

1. **Given** el hub abierto, **When** cambio el color de librea,
   **Then** la ficha del equipo muestra el nuevo color como dato
   (actualización en vivo) y ningún elemento de acción ni de dato del
   hub cambia de color por ello.
2. **Given** la partida guardada, **When** salgo y vuelvo a entrar,
   **Then** la librea sigue guardada como hoy (slot y nube, sin
   cambiosos de guardado).
3. **Given** entro a una pantalla no rediseñada (p. ej. Carrera),
   **Then** se ve y funciona exactamente como antes de este cambio.

### User Story 4 - Tema claro y tema oscuro, ambos en el mismo mundo (Priority: P2)

El juego tiene tema claro y oscuro conmutables; el hub rediseñado
funciona y se entiende en ambos. La dirección es un mundo de plano
técnico nocturno: su variante clara se resuelve con los materiales
claros del mismo mundo (papel de plano, tinta, y la misma ley del
color de acción), decidida con detalle en la fase de plan.

**Why this priority**: el tema es una función existente con
conmutador en la cabecera; romperlo o dejar un tema ilegible sería
pérdida de función.

**Independent Test**: conmutar el tema en el hub y verificar en ambos
la legibilidad de datos, la ley del color de acción y el contraste.

**Acceptance Scenarios**:

1. **Given** el hub en tema oscuro, **When** conmuto a claro,
   **Then** el hub cambia de materiales sin perder identidad ni
   ninguna función, y vuelve al oscuro sin recargar.
2. **Given** cualquier tema, **Then** los textos de datos y controles
   mantienen contraste suficiente para leerse en móvil a la luz del
   día y de noche.

### User Story 5 - Pulgar, teclado y calma (Priority: P3)

El hub se sigue usando a una mano: los objetivos táctiles son
generosos, la acción de carrera vive sola en la barra inferior
inferior del móvil respetando el margen del sistema, y nada se sale de
la pantalla en anchos estrechos. Con teclado: todo alcanzable con foco
siempre visible y el menú Más se cierra con Escape devolviendo el
foco. Con "reducir movimiento" activado, el hub aparece quieto: sin
trazos ni animaciones de entrada.

**Why this priority**: accesibilidad y hábitos ya conquistados por el
juego (móvil primero, reduced motion) que el rediseño debe conservar,
no renegociar.

**Independent Test**: navegar el hub solo con teclado en escritorio;
usarlo con una mano en un móvil estrecho; activar "reducir movimiento"
y recargar.

**Acceptance Scenarios**:

1. **Given** navegación por teclado (Tab), **Then** cada control
   muestra foco visible y la compra de un nivel no pierde el foco
   (sigue en la fila donde estaba).
2. **Given** el menú Más abierto, **When** pulso Escape, **Then** se
   cierra y el foco vuelve al botón Más.
3. **Given** un móvil de 360-390 px de ancho, **Then** no hay scroll
   horizontal, los objetivos miden ≥44 px y la barra inferior deja el
   botón de carrera al alcance del pulgar sin taparse por la barra del
   sistema.
4. **Given** "reducir movimiento" activado, **When** entro al hub,
   **Then** aparece sin animación de entrada alguna.

## Edge Cases

- Nombre de equipo de 24 caracteres: el titular monumental envuelve
  sin romper la composición ni salirse de la pantalla en móvil.
- Presupuesto inferior al coste más barato: los 9 botones quedan
  deshabilitados pero legibles (nombre, nivel y coste visibles).
- Partida sin haber corrido: la ficha no inventa posición (muestra
  "Sin correr aún" como hoy).
- Temporada completa: el botón de carrera pasa a "Ver temporada" con
  el mismo tratamiento del mundo.
- Dorsales inválidos (fuera de 1-99 o repetidos): se comportan como
  hoy (revertir), sin cambios de lógica.
- Anchos extremos (320 px) y nombres largos de circuito en el botón de
  carrera: nada se desborda.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El hub Mi Equipo MUST adoptar la identidad visual
  «Carbono» aprobada por Rafa (dirección pura, sin préstamos de las
  direcciones descartadas), tomando como referencia `bocetos/
  boceto-3.html` y el contrato de dirección de
  `.impeccable/surfaces/src-team-screen-ts.md`.
- **FR-002**: El rediseño MUST conservar la totalidad de funciones,
  contenidos y comportamientos actuales del hub: 6 pestañas,
  presupuesto en cabecera, menú Más completo, edición de identidad
  (nombre, color, pilotos, dorsales), 9 desarrollos con coste
  creciente/descuento de ingenieros y botón de carrera dinámico.
- **FR-003**: El hub MUST cumplir la ley del color de acción: un único
  color reservado a elementos accionables, pestaña activa y foco;
  estable ante cualquier librea; nunca aplicado a datos.
- **FR-004**: Cada compra de desarrollo MUST mostrar inmediatamente y
  sin scroll la variación del presupuesto junto a su cifra total,
  además del nuevo nivel y el coste siguiente.
- **FR-005**: El color de librea MUST mostrarse como dato en la ficha
  del equipo (color y valor, actualización en vivo) y MUST NOT
  modificar los colores del hub; el resto de pantallas no incluidas en
  esta fase MUST mantener su comportamiento visual actual.
- **FR-006**: El hub MUST funcionar y ser legible en tema claro y
  tema oscuro, con la misma estructura e identidad en ambos.
- **FR-007**: Todo control MUST ser alcanzable por teclado con foco
  visible; el menú Más MUST cerrarse con Escape devolviendo el foco a
  su botón; las recompras MUST conservar el foco en la fila actuada.
- **FR-008**: En móvil, los objetivos táctiles MUST medir ≥44 px, la
  barra inferior MUST contener solo la acción de carrera con el
  margen de seguridad del sistema, y el hub MUST caber sin scroll
  horizontal de 320 px en adelante.
- **FR-009**: Con "reducir movimiento" activado, el hub MUST aparecer
  sin animaciones de entrada ni trazos decorativos.
- **FR-010**: El cambio MUST NO alterar: simulación, economía,
  guardado (slot/nube), migraciones de partidas, PWA/offline ni
  ninguna pantalla fuera del hub.
- **FR-011**: Los estados al máximo (15/15) MUST distinguirse con
  contundencia visual sin usar el color de acción.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El 100 % de los controles del hub actuales sigue
  operativo tras el rediseño (lista de verificación: pestañas ×6,
  identidad ×6 campos, compras ×9, Más ×5 acciones, tema, carrera).
- **SC-002**: Una persona que no ha visto el rediseño localiza en
  menos de 10 segundos el presupuesto, la acción de carrera y dónde
  invertir — sin explicación (constitución V).
- **SC-003**: El 100 % de las compras muestra su variación de
  presupuesto visible en el primer viewport, en escritorio y móvil.
- **SC-004**: Ambos temas pasan una revisión de contraste legible
  (texto de datos y controles) en los anchos de móvil y escritorio.
- **SC-005**: El juego funciona igual instalado (PWA) y sin conexión;
  no se añaden dependencias ni servicios externos nuevos.

## Assumptions

- La dirección «Carbono» se aplica SOLO al hub (pestaña Mi Equipo y su
  shell compartido); las demás pantallas heredan el mundo en fases
  posteriores y conservan su aspecto actual, incluido el acento
  dinámico de librea fuera del hub.
- La variante clara del mundo (plano sobre papel) se decide en la fase
  de plan con la misma ley del color de acción.
- Se reutilizan las fuentes que el juego ya envía; nada nuevo que
  descargar. Decisión de Rafa: dirección pura, sin mezclas.
- Los textos y términos del hub se mantienen en español, tal cual
  están hoy.
