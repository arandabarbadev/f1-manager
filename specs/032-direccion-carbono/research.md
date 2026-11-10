# Research · 032-direccion-carbono (Phase 0)

Decisiones ya investigadas durante los bocetos y la crítica Impeccable
(dos evaluadores aislados + detector; instantáneas en
`.impeccable/critique/`). Se documentan aquí con su porqué y las
alternativas descartadas.

## R1 · El color de acción es FIJO; la librea es un dato

- **Decision**: el hub usa un token de acción propio (`--hub-action`,
  volt #D6FF3F en oscuro) que NUNCA se reescribe desde la librea. La
  librea se muestra en la ficha del equipo como dato (chip de color +
  valor hexadecimal, actualización en vivo). `accent.ts` sigue
  funcionando para las pantallas no rediseñadas.
- **Rationale**: la crítica del boceto 3 marcó P1 la colisión
  estructural: con el mecanismo real del juego (spec 019: la librea
  tiñe `--accent`), una librea oscura apaga botón de carrera, foco,
  hover y tab activa sobre carbono — exactamente donde más importa.
  El propio juego ya resuelve texto-sobre-acento por luminancia; aquí
  el problema no es el texto sino la AFFORDANCE.
- **Alternativas descartadas**:
  - Clamp de luminancia de la librea al pintar la acción (deja de ser
    el color del jugador; semántica confusa).
  - Doble acento (librea para "identidad", volt para acción) sobre los
    MISMOS elementos: dos dueños en una página; el contrato de
    dirección exige un solo dueño («dirección pura» de Rafa).

## R2 · El mundo vive en su propia capa; `ui.css` intacto

- **Decision**: `team-screen.css` se reescribe como el mundo Carbono
  con tokens `--hub-*` (fondo, rejilla, hairlines, texto, mono,
  acción) definidos en `:root` y `:root[data-theme='light']`. El hub
  deja de consumir `--accent` y los componentes compartidos (`.btn`,
  `.notice`, guía). La rejilla se pinta en la raíz del hub (no en
  `body`) para no filtrarse a otras pantallas.
- **Rationale**: el spec exige que las demás pantallas no cambien NI UN
  píxel; `ui.css` las viste a todas. Tocarlo aquí sería alcance no
  autorizado y riesgo de regresión en 5 pantallas.
- **Alternativas descartadas**:
  - Extender `ui.css` con variantes hub (los componentes compartidos
    cambiarían o se bifurcarían con selectores frágiles).
  - Rediseñar `ui.css` entero ahora (fase futura: cuando las demás
    pantallas hereden el mundo).

## R3 · Tema claro = plano sobre papel

- **Decision**: variante clara del MISMO mundo: papel de plano
  (#EDEFE9), tinta oscura para texto, hairlines grises, rejilla en
  tinta al 6-9 %, y el volt oscurecido en sus usos de línea/texto
  (borde/foco ~#8A9E00) manteniendo el volt pleno como FONDO del
  botón de acción con texto en tinta (contraste ≈ 12:1).
- **Rationale**: el tema es función existente con conmutador; el
  mundo es nocturno pero su material (plano técnico) existe en claro
  de forma canónica. La ley del color de acción se conserva idéntica.
- **Alternativas descartadas**: invertir carbono→blanco puro (mata la
  identidad de papel de plano); oscuro fijo (pérdida de función).

## R4 · Movimiento: pasos, y nada con reduced-motion

- **Decision**: una sola animación de llegada (la regla/bloques "se
  trazan" en 140 ms a `steps(3)`), sin easings suaves; todo lo demás
  son cambios de estado instantáneos. Con `prefers-reduced-motion:
  reduce` no hay animación alguna (regla del juego, spec 027).
- **Rationale**: gramática del mundo (ingeniería: el plano se traza);
  consistente con la preferencia del dispositivo que el juego ya
  respeta.

## R5 · Datos ilegibles jamás: blanco tabular + medidores de ticks

- **Decision**: cifras en monoespaciada tabular del sistema
  (ui-monospace/Consolas), datos SIEMPRE en blanco/tinta (nunca volt),
  medidores de 15 ticks, MÁX como caja grabada (borde tinta), costes
  no asequibles tachados y atenuados. Feedback de gasto: chip delta
  junto al presupuesto (cifra + signo), 1,5 s.
- **Rationale**: hereda los aciertos verificados del boceto (crítica:
  "mejor presentación de datos de los tres") y corrige su P1 de compra
  silenciosa.

## R6 · Sin dependencias nuevas

- **Decision**: DOM vanilla incumbente, Inter ya enviada, mono de
  sistema, rejilla en CSS puro. Cero assets nuevos.
- **Rationale**: constitución III (declarado en el plan); rendimiento
  y offline intactos; el tamaño del cambio queda en 1 hoja + 1
  módulo TS de estructura.
