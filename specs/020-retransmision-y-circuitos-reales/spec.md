# Feature Specification: Retransmisión F1 y circuitos reales

**Feature Branch**: `020-retransmision-y-circuitos-reales`

**Created**: 2026-10-21

**Status**: Draft

**Input**: User description: "Da igual que se fusionen los trazados: quiero que los circuitos sean iguales a los reales, y creo que falta Miami, que has cambiado por Jerez: quiero que estén los 20 de Fórmula 1 más Jerez. Después del spec 019 el juego usa colores y tipografía de F1, pero sigue sin parecerse a un juego de F1: por estructura se ve como un panel de administración web. Quiero que lo que veo y cómo me muevo por el juego se parezca a F1 Manager y a los gráficos de una retransmisión de F1, sin cambiar cómo funciona nada: torre de tiempos con posición, color de equipo, código de 3 letras, diferencia y goma (códigos únicos entre los 20); en carrera lo importante (circuito, vuelta, clima, mis boxes) por encima de los controles; Mi Equipo como resumen (equipo, dinero, posición de campeonato) y no un formulario; acciones destructivas (Reiniciar, Salir, Instalar) por debajo de Carrera; goma reconocible por forma y letra (S, M, H, I, W); móvil con una mano; sin romper el offline."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - La clasificación se lee como una torre de tiempos (Priority: P1)

En carrera, miro la clasificación y de un vistazo sé el orden completo:
posición, de qué equipo es cada coche (por su color), quién es cada piloto
(por un código corto de 3 letras, no por su nombre largo generado),
a cuánto va del líder y qué goma lleva. Como en la tele.

**Why this priority**: es la pantalla que más tiempo miro en todo el juego;
si la lectura no es inmediata, nada de lo demás compensa.

**Independent Test**: entrar en cualquier carrera y leer la clasificación
sin tocar nada: cada fila muestra posición, color de equipo, código,
diferencia y goma; una persona que no conozca el juego la identifica como
"una torre de tiempos de F1" sin que se lo digan.

**Acceptance Scenarios**:

1. **Given** una carrera en marcha con 20 coches, **When** miro la
   clasificación, **Then** cada fila identifica posición, equipo, piloto
   (código de 3 letras), diferencia con el líder y goma, sin necesidad de
   leer nombres completos.
2. **Given** dos pilotos con apellidos que generarían el mismo código,
   **When** se genera o carga la parrilla, **Then** los dos tienen códigos
   distintos y estables (el mismo en cada carrera de esa partida).
3. **Given** una partida guardada antes de esta función, **When** la
   cargo, **Then** todos los pilotos tienen su código y ninguno se repite.

---

### User Story 2 - Circuitos iguales a los reales, con Miami (Priority: P1)

Quiero que cada circuito se dibuje con su forma real, aunque dos tramos
se toquen o se fusionen en pantalla: la silueta debe ser la del circuito
de verdad. Y falta Miami: el calendario debe tener los 20 circuitos del
mundial de F1 más Jerez (21 rondas), manteniendo el borde blanco que
delimita la pista.

**Why this priority**: Rafa lo pide explícitamente y la fidelidad de los
trazados es parte del reconocimiento inmediato ("esto es el circuito X").

**Independent Test**: abrir cualquier GP y reconocer el circuito por su
silueta real; comprobar en el calendario que Miami está y que hay 21
rondas; una partida guardada migra a 21 rondas sin perder presupuesto ni
avance.

**Acceptance Scenarios**:

1. **Given** un circuito con tramos paralelos muy próximos (p. ej.
   Singapur), **When** se dibuja, **Then** la forma coincide con el
   circuito real aunque los tramos se solapen visualmente.
2. **Given** una temporada, **When** la recorro, **Then** hay 21 rondas:
   los 20 circuitos del mundial actual (incluida Miami) más Jerez.
3. **Given** una partida guardada con el calendario de 20, **When** la
   cargo, **Then** pasa a 21 rondas conservando presupuesto, patrocinios
   y resultados ya obtenidos.

---

### User Story 3 - En carrera, la información manda sobre los controles (Priority: P2)

Circuito, vuelta, clima y Mis boxes se ven grandes y claros; pausa y
velocidad quedan como un único control secundario, agrupado y aparte,
que no compite visualmente con lo que importa.

**Why this priority**: en plena carrera, distraerse buscando el control
de velocidad o tapando la clasificación rompe la sensación de
retransmisión.

**Independent Test**: entrar en carrera y cambiar pausa y velocidad sin
buscarlos; comprobar que circuito/vuelta/clima/Mis boxes destacan por
encima de los controles.

**Acceptance Scenarios**:

1. **Given** una carrera en marcha, **When** quiero pausar o cambiar la
   velocidad, **Then** lo hago desde un único selector agrupado, sin que
   los botones ocupen el protagonismo de la información.
2. **Given** la cabecera de carrera, **When** la miro, **Then** circuito,
   vuelta y clima se distinguen antes que los controles.

---

### User Story 4 - Mi Equipo es el panel del equipo, no un formulario (Priority: P2)

Al entrar en Mi Equipo veo de golpe quién soy (equipo y librea), cuánto
dinero tengo y en qué posición del campeonato voy, con el acceso a
Carrera bien visible; las secciones (coche, pilotos, sede, rivales,
patrocinadores, campeonato) se alcanzan desde ahí. Reiniciar, Salir e
Instalar app dejan de estar al mismo nivel que Carrera.

**Why this priority**: es la puerta del juego entre carreras; hoy recibe
con un formulario de texto y botones destructivos a la par del principal.

**Independent Test**: entrar en Mi Equipo y responder sin navegar: ¿qué
equipo soy?, ¿cuánto dinero tengo?, ¿voy P cuántos?, ¿qué toca ahora?;
llegar a cada sección en un toque; comprobar que Reiniciar/Salir/Instalar
no compiten con Carrera.

**Acceptance Scenarios**:

1. **Given** la pantalla Mi Equipo recién abierta, **When** la miro,
   **Then** veo equipo (con su librea), dinero y posición de campeonato,
   y el botón Carrera.
2. **Given** esa misma pantalla, **When** busco Reiniciar, Salir o
   Instalar, **Then** están fuera del nivel visual de Carrera (agrupadas
   como acciones secundarias).
3. **Given** un móvil, **When** navego con el pulgar, **Then** llego a
   Carrera y a cambiar de sección sin estirar la mano.

---

### User Story 5 - La goma se reconoce por forma y letra (Priority: P3)

Cada compuesto se distingue aunque no se vea el color: un icono propio
(anillo) con su letra S, M, H, I o W en el centro, en la torre y donde
ya se mostraba la goma.

**Why this priority**: completa la lectura de la torre y sirve a
daltonismos; sin ella, la torre pierde su última pieza informativa.

**Independent Test**: identificar el compuesto de cualquier coche con la
información de color anulada (solo forma y letra).

**Acceptance Scenarios**:

1. **Given** un coche con goma blanda, **When** miro su celda de goma,
   **Then** veo un anillo con la letra S dentro y el color del
   compuesto; igual con M, H, I y W.
2. **Given** la elección de goma en Mis boxes, **When** la miro,
   **Then** cada opción se distingue por forma y letra, no solo por
   color.

### Edge Cases

- Apellidos generados que producen el mismo código de 3 letras: la regla
  de desempate debe ser determinista y estable dentro de una partida.
- Nombres de una sola palabra o con caracteres no alfabéticos: el código
  cae en un fallback predecible (p. ej. primeras letras disponibles).
- Partidas guardadas de calendarios anteriores: migración a 21 rondas
  descartando resultados de rondas retiradas (como ya se hizo al quitar
  circuitos), sin tocar presupuesto.
- Circuitos con tramos que se solapan: la línea blanca de borde sigue
  dibujándose; se asume la fusión visual (petición explícita).
- Modo sin conexión con la app instalada: nada de lo nuevo puede exigir
  recursos de red (fuentes incluidas).
- Sin datos de campeonato (inicio de temporada): el resumen del panel
  muestra la posición como "—" o equivalente, nunca en blanco (regla V).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: La clasificación de carrera MUST presentarse como una torre
  de tiempos: una fila por coche con posición, color del equipo, código
  de piloto de 3 letras, diferencia con el líder y goma actual.
- **FR-002**: El sistema MUST asignar a cada piloto un código de 3 letras
  derivado de su apellido, único entre los 20 pilotos de la parrilla, con
  desempate determinista; los códigos persisten en la partida y migran en
  partidas guardadas sin repetirse.
- **FR-003**: La pantalla de carrera MUST jerarquizar: circuito, vuelta,
  clima y Mis boxes destacan visualmente por encima de los controles;
  pausa y velocidad forman UN solo selector secundario.
- **FR-004**: Mi Equipo MUST recibir con un resumen: equipo con su
  librea, dinero y posición en el campeonato (o su vacío explícito),
  desde el que se llega a cada sección.
- **FR-005**: Las acciones Reiniciar, Salir e Instalar app MUST quedar
  fuera del nivel visual de la acción principal (Carrera).
- **FR-006**: La goma MUST distinguirse por forma y letra (S, M, H, I, W)
  además del color, en la torre y en Mis boxes.
- **FR-007**: Los circuitos MUST dibujarse con su forma real (solapes
  entre tramos aceptados por diseño), manteniendo la línea blanca de
  borde de la spec 018.
- **FR-008**: El calendario MUST tener 21 rondas: los 20 circuitos del
  mundial actual, incluida Miami con su trazado real, más Jerez; las
  partidas guardadas migran a 21 rondas conservando presupuesto,
  patrocinios y resultados válidos.
- **FR-009**: Todo lo nuevo MUST usarse con una mano en móvil: Carrera y
  el cambio de sección al alcance del pulgar.
- **FR-010**: Nada de lo nuevo MUST romper el modo sin conexión, y el
  juego MUST seguir sin usar logotipos ni nombres propietarios de F1.

### Key Entities *(include if feature involves data)*

- **Código de piloto**: 3 letras, derivado del apellido, único por
  parrilla, estable durante toda la partida; se muestra en la torre de
  tiempos en mayúsculas.
- **Ronda del calendario**: circuito con su trazado real; la temporada
  tiene 21 (mundial completo + Jerez).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Una persona que no ha visto el juego identifica la
  clasificación como "una torre de tiempos de F1" sin que se lo digan.
- **SC-002**: Cero códigos de piloto repetidos en la parrilla, en
  partidas nuevas y en guardadas migradas.
- **SC-003**: En móvil, Carrera y el cambio de sección son alcanzables
  con el pulgar (mitad inferior de la pantalla) sin estirar la mano.
- **SC-004**: Una carrera completa se juega igual que antes: mismos
  controles y mismos resultados con la misma semilla (nada del
  funcionamiento cambia; solo presentación y trazados).
- **SC-005**: El calendario muestra 21 rondas y Miami está entre ellas
  con su trazado real.
- **SC-006**: La app instalada funciona sin conexión tras la
  actualización (comprobado en modo avión).
- **SC-007**: No aparece ningún logotipo ni nombre propietario de F1
  (búsqueda inversa de marcas en los textos del juego).

## Assumptions

- El trazado real de Miami se obtiene de datos públicos de circuitos,
  igual que el resto (fuente ya usada en specs anteriores).
- Los códigos de 3 letras usan mayúsculas; es el único texto en
  mayúsculas junto a las letras de compuesto (decisión de la fase de
  plan).
- "Los 20 del mundial actual" = la selección de 20 circuitos ya presente
  en el juego + Miami (los ausentes del mundial real, como Baréin o
  China, siguen fuera: el juego mantiene su repertorio, solo corrige la
  ausencia reclamada de Miami y suma Jerez como extra).
- La posición de campeonato del resumen se calcula con el sistema de
  puntos ya existente; sin carreras disputadas se muestra el estado
  vacío explícito.
- La forma de los coches en pista y el resto de pantallas (partidas,
  resumen de temporada, login) solo cambian lo necesario para convivir
  con lo nuevo.
