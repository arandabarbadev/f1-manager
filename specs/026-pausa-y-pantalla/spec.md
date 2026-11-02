# Feature Specification: Pausa y pantalla

**Feature Branch**: `026-pausa-y-pantalla`

**Created**: 2026-11-02

**Status**: Draft

**Input**: User description: "Cuando juego en el móvil y bloqueo la pantalla o cambio de aplicación a mitad de una carrera, la carrera se arrastra, se congela o sigue sin que yo la vea. Y si no toco la pantalla un rato, el móvil se apaga mientras la carrera corre. — Si salgo del juego o bloqueo el dispositivo durante una carrera, la carrera se pausa sola y no avanza. Al volver veo que está en pausa y la reanudo cuando quiera, con la misma velocidad. Si ya la había pausado yo, vuelve en pausa: el juego no la reanuda por su cuenta. Mientras la carrera corre, la pantalla no se apaga sola; al pausar o terminar, el dispositivo vuelve a comportarse como siempre. Si el dispositivo no permite mantener la pantalla encendida, el juego funciona igual, sin errores ni avisos molestos. No cambia la simulación ni los resultados. Sigue funcionando sin conexión. Fuera de alcance: notificaciones, seguir jugando en segundo plano, guardar una carrera a medias."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Se pausa sola si me voy (Priority: P1)

Bloquear el móvil, cambiar de app o de pestaña con la carrera corriendo
la PAUSA (no se arrastra ni corre a ciegas). Al volver: en pausa, misma
vuelta, mismo reloj, misma velocidad; la reanudo yo. Si ya estaba
pausada por mí, sigue pausada. Y si salgo a "Mi Equipo" con la carrera
viva, tampoco avanza a escondidas.

**Why this priority**: hoy la carrera se arrastra o corre sin verse.

**Independent Test**: con la carrera a 1x, anotar reloj/vuelta, bloquear
o cambiar de app 30 s, volver: mismo reloj, misma vuelta, botón "Seguir".

**Acceptance Scenarios**:

1. **Given** carrera corriendo, **When** `document.hidden` (bloqueo,
   cambio de app/pestaña), **Then** pasa a pausa y el reloj se congela.
2. **Given** de vuelta, **When** miro, **Then** sigue en pausa (nunca se
   reanuda sola) y hay un aviso de que se pausó sola; "Seguir" arranca
   con la misma velocidad.
3. **Given** pausada por mí, **When** me voy y vuelvo, **Then** sigue
   pausada y sin avisos duplicados.
4. **Given** carrera viva y salgo a "Mi Equipo", **Then** el bucle de esa
   carrera se detiene del todo (ni avanza, ni cobra, ni graba).

### User Story 2 - La pantalla no se apaga (Priority: P1)

Mientras la carrera corre, la pantalla no se apaga sola (Screen Wake
Lock). Al pausar, terminar o salir, el móvil vuelve a su comportamiento
normal. Donde no se soporta, el juego funciona igual y sin avisos.

**Acceptance Scenarios**:

1. **Given** carrera corriendo y dispositivo con soporte, **Then** hay
   wake lock activo (se pide al apagarse las luces y al reanudar).
2. **Given** pausa/fin/salida/ocultar, **Then** el lock se libera.
3. **Given** dispositivo sin soporte (o permiso denegado), **Then** nada
   rompe, no hay errores en consola ni avisos al usuario.
4. **Given** sin conexión, **Then** todo lo anterior sigue funcionando.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: `visibilitychange` → si la carrera corre (tras las luces,
  sin terminar, sin pausa previa) se pausa sola; nunca se reanuda sola.
  Al volver se muestra UN aviso informativo ("Carrera en pausa") solo
  si la pausa fue automática; la manual no genera aviso.
- **FR-002**: Wake lock de pantalla: se pide al arrancar la carrera
  (luces fuera) y al reanudar; se libera al pausar (manual o auto), al
  terminar, al ocultar y al salir de la pantalla. Detección de soporte
  silenciosa: sin soporte, todo igual y sin errores ni avisos.
- **FR-003**: Al desmontar la pantalla (salir a Mi Equipo/resumen con la
  carrera viva) el interval de simulación y el render de ESA carrera se
  detienen y se limpia el listener (nada corre a escondidas).
- **FR-004**: Sin cambios en simulación, resultados, economía ni
  guardado; funciona offline (ninguna API nueva de red).

## Success Criteria *(mandatory)*

- **SC-001**: Con la carrera a 1x, ocultar 30 s y volver: mismo reloj,
  misma vuelta, botón "Seguir"; el aviso aparece una vez.
- **SC-002**: Pausa manual + ocultar + volver: sigue pausada, sin aviso.
- **SC-003**: "Seguir" reanuda con la misma velocidad y pide el lock sin
  errores; pausa/fin lo libera.
- **SC-004**: Sin errores en consola durante todo el flujo (con y sin
  soporte de wake lock); harness sin regresiones.

## Assumptions

- El aviso de pausa automática usa el hub de avisos existente (017),
  kind info, se autodescarta como los demás.
- Soporte real: Screen Wake Lock en Chrome/Android 84+ y Safari/iOS
  16.4+; en el resto, la detección silenciosa lo deja igual.
- "Guardar a medias" y "seguir en segundo plano" quedan fuera: al
  volver hay que reanudar, como pide el usuario.
