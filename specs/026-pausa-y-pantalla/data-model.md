# Data Model: 026 Pausa y pantalla

## Sin cambios de datos

Ni localStorage, ni Firebase, ni tipos, ni motor (`simulationTick`
intacto). Todo vive en la pantalla de carrera.

## Estado nuevo en race-screen.ts

| Campo | Tipo | Uso |
|---|---|---|
| `tickTimer` | number | handle del interval; se limpia al desmontar |
| `autoPaused` | boolean | la pausa la provocó el ocultado (para el aviso) |
| `wakeLockSentinel` | WakeLockSentinel \| null | lock de pantalla activo |

## Ciclo de vida

| Momento | Acción |
|---|---|
| Luces fuera | pedir wake lock |
| Pausa manual | liberar |
| "Seguir" | limpiar `autoPaused` y pedir |
| Ocultar (visibilitychange) | pausa auto + liberar |
| Volver a ver | aviso info SOLO si fue auto |
| Bandera a cuadros / setup() | liberar |
| Pantalla desmontada | clearInterval + removeEventListener + liberar |

## APIs del navegador

- `document.visibilitychange` / `document.hidden` (pausa).
- `navigator.wakeLock.request('screen')` con detección `'wakeLock' in
  navigator`; tipos ya en lib.dom (TS 5.9).
