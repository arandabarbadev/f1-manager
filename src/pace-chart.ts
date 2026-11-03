import { PlayerLapEntry, TyreCompound } from './types';

// ============================================================
// PACE CHART (spec 028): pure lap-log -> SVG string for the post-race
// panel. X = lap, Y = lap time INVERTED (fast laps sit high, timing
// convention). The player's two cars SHARE the team color, so they
// differ by SHAPE (solid line + circles vs dashed line + squares) and
// by their broadcast code in the legend — never by color alone.
// Marked laps (the pit in-lap, laps under a flag) are drawn but the
// scale only takes CLEAN laps: marked points are clamped in, so an
// outlying in-lap never squashes the story. No DOM, no libraries —
// this module is testable straight from the harness.
// ============================================================

export interface PaceSeries {
  code: string;
  entries: PlayerLapEntry[];
  dnf?: boolean;
}

export interface ChartScale {
  minSec: number;
  maxSec: number;
}

const LETTER: Record<TyreCompound, string> = {
  soft: 'S',
  medium: 'M',
  hard: 'H',
  inter: 'I',
  wet: 'W',
};

const W = 320;
const H = 180;
const PAD_L = 46;
const PAD_R = 8;
const PAD_T = 10;
const PAD_B = 18;

// Y scale from clean laps only. Falls back to every lap when nothing
// is clean (a red flag can eat a whole race); empty input gives a
// harmless 0..1 scale the caller never draws.
export function chartScale(entriesList: PlayerLapEntry[][]): ChartScale {
  let pool = entriesList.flat().filter((e) => !e.pitted && !e.flag);
  if (pool.length === 0) pool = entriesList.flat();
  if (pool.length === 0) return { minSec: 0, maxSec: 1 };
  let minSec = Infinity;
  let maxSec = -Infinity;
  for (const e of pool) {
    if (e.lapTimeSec < minSec) minSec = e.lapTimeSec;
    if (e.lapTimeSec > maxSec) maxSec = e.lapTimeSec;
  }
  const pad = Math.max(0.6, (maxSec - minSec) * 0.15);
  return { minSec: minSec - pad, maxSec: maxSec + pad };
}

const fmtTick = (sec: number): string => {
  const m = Math.floor(sec / 60);
  const s = sec - m * 60;
  return `${m}:${s < 10 ? '0' : ''}${s.toFixed(1)}`;
};

export function buildPaceChart(series: PaceSeries[]): string {
  const living = series.filter((s) => s.entries.length > 0);
  if (living.length === 0) return '';
  const scale = chartScale(series.map((s) => s.entries));
  const span = scale.maxSec - scale.minSec || 1;
  const maxLap = Math.max(...living.flatMap((s) => s.entries.map((e) => e.lap)));
  const lapSpan = Math.max(1, maxLap - 1);
  const plotW = W - PAD_L - PAD_R;
  const plotH = H - PAD_T - PAD_B;
  const xOf = (lap: number): number => PAD_L + ((lap - 1) / lapSpan) * plotW;
  // Inverted Y + clamp: marked laps stay inside the clean-lap scale.
  const yOf = (sec: number): number => {
    const clamped = Math.min(scale.maxSec, Math.max(scale.minSec, sec));
    return PAD_T + ((clamped - scale.minSec) / span) * plotH;
  };

  const parts: string[] = [];
  // Grid + Y ticks (bottom, middle, top).
  for (let i = 0; i <= 2; i++) {
    const sec = scale.minSec + (span * i) / 2;
    const y = yOf(sec);
    parts.push(
      `<line class="pc-grid" x1="${PAD_L}" y1="${y.toFixed(1)}" x2="${W - PAD_R}" y2="${y.toFixed(1)}"/>`,
      `<text class="pc-tick" x="${PAD_L - 4}" y="${(y + 3).toFixed(1)}" text-anchor="end">${fmtTick(sec)}</text>`
    );
  }
  // X labels: at most ~6.
  const step = Math.max(1, Math.ceil(maxLap / 6));
  for (let lap = 1; lap <= maxLap; lap += step) {
    parts.push(
      `<text class="pc-tick" x="${xOf(lap).toFixed(1)}" y="${H - 6}" text-anchor="middle">${lap}</text>`
    );
  }

  living.forEach((s, idx) => {
    const cls = idx === 0 ? 'a' : 'b';
    const pts = s.entries.map((e) => `${xOf(e.lap).toFixed(1)},${yOf(e.lapTimeSec).toFixed(1)}`);
    if (pts.length >= 2) {
      parts.push(`<polyline class="pc-line ${cls}" points="${pts.join(' ')}"/>`);
    }
    s.entries.forEach((e, i) => {
      const x = xOf(e.lap);
      const y = yOf(e.lapTimeSec);
      const marked = e.pitted || e.flag;
      if (idx === 0) {
        parts.push(`<circle class="pc-dot ${cls}${marked ? ' marked' : ''}" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3"/>`);
      } else {
        parts.push(
          `<rect class="pc-dot ${cls}${marked ? ' marked' : ''}" x="${(x - 2.5).toFixed(1)}" y="${(y - 2.5).toFixed(1)}" width="5" height="5"/>`
        );
      }
      // The pit note: which rubber came NEXT — the reason for the stop.
      if (e.pitted) {
        const next = s.entries[i + 1];
        const label = next ? '→' + LETTER[next.compound] : '→box';
        parts.push(
          `<text class="pc-note" x="${x.toFixed(1)}" y="${(y - 6).toFixed(1)}" text-anchor="middle">${label}</text>`
        );
      }
    });
  });

  return `<svg class="pc-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Ritmo por vuelta">${parts.join('')}</svg>`;
}
