# Quickstart 020

1. `npm run build && npm run harness` — verde con los checks nuevos
   ("Códigos check", "Tracks check" actualizado: 21 rondas, Miami,
   fidelidad al trazado real) y los viejos (Weather, Pilotos).
2. `npm run maps` — ASCII de los 21 circuitos: Miami reconocible y los
   urbanos (Singapur, Mónaco) vuelven a sus solapes reales.
3. `./node_modules/.bin/vite preview --port 4173 --strictPort` y entrar
   en modo local. En 1 minuto:
   - Mi Equipo recibe con la tira del equipo: dinero grande, posición de
     campeonato ("Sin correr aún" al principio) y Carrera destacada;
     Reiniciar/Salir/Instalar tras "Más"; pestañas abajo (móvil).
   - Ir a carrera: torre con posición, franja de color, CÓDIGO, hueco y
     anillo de goma con letra; cabecera con vuelta grande y el selector
     único de pausa/velocidad aparte.
   - Cambiar un dorsal o regenerar rivales: los códigos siguen únicos.
   - Calendario: 21 rondas con Miami (ronda ~5) y Jerez.
4. Móvil: push → deploy → abrir con internet (cerrar del todo si no
   aparece). Probar en avión después: todo carga, fuentes incluidas.
