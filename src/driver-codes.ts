import { Driver } from './types';

// ============================================================
// DRIVER CODES (spec 020): the timing tower identifies each driver
// with a 3-letter uppercase code derived from the surname, F1
// broadcast style. Generated names reuse a pool of 24 surnames, so
// collisions are the NORM (birthday paradox over 20 drivers) — the
// deterministic rule below resolves them in stable roster order:
// the first driver keeps the base code, the next ones walk the last
// letter A-Z and then the middle letter A-Z.
//
// Pure function: nothing is persisted. Same driver list => same
// codes, in new saves, loaded saves and after renames.
// ============================================================

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// ASCII letters of a string, uppercase, accents stripped ("Núñez" -> NUNEZ).
function asciiLetters(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toUpperCase()
    .replace(/[^A-Z]/g, '');
}

// Base code (no de-duplication): first 3 letters of the SURNAME; a
// short surname ("Li") is completed with the rest of the name's
// letters, and a name without letters at all ("Piloto 1" -> "Piloto")
// falls back to the full name. Always returns 3 letters (padded X).
export function driverCodeBase(name: string): string {
  const words = name.trim().split(/\s+/);
  for (let i = words.length - 1; i >= 0; i--) {
    const w = asciiLetters(words[i]);
    if (w.length >= 3) return w.slice(0, 3);
    if (w.length > 0) {
      const rest = asciiLetters(words.slice(0, i).concat(words.slice(i + 1)).join(''));
      return (w + rest + 'XXX').slice(0, 3);
    }
  }
  return (asciiLetters(words.join('')) + 'XXX').slice(0, 3);
}

// Unique code per driver for a whole grid (20), in list order.
export function assignDriverCodes(drivers: Driver[]): Map<string, string> {
  const used = new Set<string>();
  const codes = new Map<string, string>();
  for (const d of drivers) {
    const base = driverCodeBase(d.name);
    let code = base;
    if (used.has(code)) {
      code = '';
      for (const last of LETTERS) {
        const c = base.slice(0, 2) + last;
        if (!used.has(c)) { code = c; break; }
      }
      if (!code) {
        for (const mid of LETTERS) {
          const c = base.slice(0, 1) + mid + base.slice(2);
          if (!used.has(c)) { code = c; break; }
        }
      }
    }
    used.add(code);
    codes.set(d.id, code);
  }
  return codes;
}
