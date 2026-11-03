# Feature Specification: Gráfico de ritmo

**Feature Branch**: `028-grafico-de-ritmo`

**Created**: 2026-11-02

**Status**: Draft

**Input**: User description: "Al acabar una carrera solo veo posiciones y dinero, pero no entiendo por qué mis coches fueron rápidos o lentos. Quiero ver el ritmo de mis dos pilotos a lo largo de la carrera para aprender de mi estrategia. — Al acabar una carrera o un sprint puedo ver un gráfico con el tiempo de cada vuelta de mis dos pilotos. Se distinguen sin depender del color (comparten el del equipo): por su código y por la forma de la línea. Se ve cuándo paró cada uno y con qué goma siguió, y las vueltas de parada o de bandera no estiran la escala hasta aplastar el resto. Se ve el ritmo caer cuando las gomas se gastan y recuperarse tras la parada. Si un piloto se retira, su línea acaba en su última vuelta completa. Se lee en el móvil sin desplazarme de lado. Solo está disponible justo al terminar esa carrera: no se guarda en la partida. Hecho cuando: termino una carrera con al menos una parada y veo la caída de ritmo y la mejora después de parar; mis dos pilotos se distinguen aunque tengan el mismo color; con un piloto retirado su línea se corta donde debe, sin error; una carrera sin paradas o con bandera roja temprana muestra lo que haya, sin romperse; mostrar el gráfico no retrasa los resultados ni cambia dinero ni posiciones; una carrera completa produce las mismas posiciones, paradas e incidentes que antes, con la aleatoriedad fijada. Fuera de alcance: gráficos de los rivales, historial de carreras anteriores, guardar datos en la partida."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - El ritmo de la carrera, legible (Priority: P1)

Al terminar una carrera o sprint, un botón en el panel final despliega
un gráfico con el tiempo de cada vuelta de mis dos pilotos: eje X
vueltas, eje Y tiempo (rápido arriba), dos líneas con mi código de
cada piloto en la leyenda y formas distintas (continua+● vs
discontinua+■) para no depender del color.

**Why this priority**: es la petición: entender POR QUÉ fui rápido o
lento.

**Independent Test**: terminar una carrera con parada, abrir el
gráfico y leer la caída por desgaste y la mejora tras parar.

**Acceptance Scenarios**:

1. **Given** carrera terminada, **When** pulso "Ver ritmo por vuelta",
   **Then** aparece el gráfico con las dos líneas y la leyenda de
   códigos; el panel sigue igual (mismo dinero, mismas posiciones).
2. **Given** ambos pilotos con el color del equipo, **When** miro,
   **Then** se distinguen por código y forma (continua/discontinua,
   ●/■), no por color.
3. **Given** el móvil en vertical, **When** abro el gráfico, **Then**
   se lee entero sin desplazamiento lateral.
4. **Given** una quali, **When** termina, **Then** no hay botón de
   gráfico (es cosa de carrera/sprint).

### User Story 2 - Paradas y banderas sin estropear la escala (Priority: P1)

La vuelta de parada (in-lap) y las vueltas con bandera se marcan pero
NO computan para el mínimo/máximo del eje Y (no aplastan el resto). En
cada parada se ve con qué goma siguió (etiqueta S/M/H/I/W).

**Acceptance Scenarios**:

1. **Given** una parada, **When** miro el gráfico, **Then** el punto
   de esa vuelta está marcado y anotado con la goma siguiente, y el
   tramo posterior cambia de ritmo (mejora con goma nueva).
2. **Given** vueltas bajo bandera, **Then** marcadas y fuera de la
   escala; las vueltas normales conservan su proporción real.
3. **Given** carrera sin paradas (o bandera temprana), **Then** el
   gráfico muestra lo que haya, sin romperse ni quedar vacío en blanco
   si no hay nada.

### User Story 3 - Retiradas y pureza (Priority: P2)

Si un piloto se retira su línea acaba en su última vuelta completa.
Mostrar el gráfico no retrasa resultados ni toca dinero/posiciones; una
carrera con la aleatoriedad fijada produce exactamente las mismas
posiciones, paradas e incidentes que antes (el motor solo RECOGE
datos, no los cambia).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El motor registra por coche del JUGADOR cada vuelta
  completada: número, tiempo, compuesto, si acabó en boxes (in-lap) y
  si corrió con bandera ≠ verde. Sin cambiar simulación, posiciones,
  paradas ni incidentes (solo observación).
- **FR-002**: Botón "Ver ritmo por vuelta" en el panel final SOLO en
  carrera/sprints (quali sin botón); construido bajo demanda (no
  retrasa los resultados); toggle para cerrar.
- **FR-003**: Gráfico SVG propio (sin librerías): X vueltas, Y tiempo
  invertido (rápido arriba), dos series distinguibles por código en
  leyenda + forma (continua+● / discontinua+■), puntos marcados para
  in-lap (con la goma siguiente anotada) y bandera; escala min/max
  SOLO con vueltas limpias; ancho 100 % del panel (sin scroll
  horizontal).
- **FR-004**: Línea de un retirado acaba en su última vuelta; datos no
  persistidos (RaceState vive en memoria; nada nuevo al guardado ni a
  la nube).

## Success Criteria *(mandatory)*

- **SC-001**: Carrera con parada: el gráfico muestra la marca de la
  parada con la goma que siguió y la mejora posterior.
- **SC-002**: Dos pilotos distinguibles sin color (leyenda + formas).
- **SC-003**: La vuelta de parada marcada pero FUERA del cálculo de
  escala (función pura comprobada en harness).
- **SC-004**: Sin paradas / retirada: el gráfico muestra lo que hay
  sin error; dinero y posiciones intactos al abrirlo.
- **SC-005**: Harness "Ritmo check" (datos por vuelta correctos con
  aleatoriedad fijada + carrera de regresión idéntica) + verificación
  en vivo.

## Assumptions

- La vuelta "con qué goma siguió" se anota con la letra del compuesto
  (S/M/H/I/W) sobre el punto de parada — igual que en boxes y torre.
- Un sprint corto (1 vuelta) puede dar gráficos mínimos: se muestran
  sin romperse.
