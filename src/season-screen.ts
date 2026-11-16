import './season-screen.css';
import { getOrCreateCareer, isSeasonComplete, recordPalmares, saveCareer } from './career';
import { eventShortLabel } from './weekend';
import { getTrackById } from './tracks-generator';
import { themeButtonLabel, toggleTheme } from './theme';
import { scheduleCloudSync } from './cloud';
import { evolveRivals, loadRoster, saveRoster, RivalGain } from './roster';
import { DIFFICULTY_PRESETS } from './difficulty';

// ============================================================
// SEASON SCREEN (Phase 6): end-of-season summary. Lists every
// race of the season (track, best player position, prize) with
// the total earned, and the "start next season" button that
// resets the calendar and results but KEEPS budget and car
// upgrades.
// ============================================================

export function createSeasonScreen(container: HTMLElement, onExit: () => void): void {
  container.innerHTML = '';
  const career = getOrCreateCareer();

  // Spec 029: the season close is when the rival teams' cars improve a
  // little — once per season (idempotent marker on the roster), scaled
  // by this save's difficulty. The gains are shown below so the next
  // season's difficulty is understood, not just felt. Existing saves
  // (roster v1, marker absent) evolve at their NEXT close.
  let rivalGains: RivalGain[] = [];
  const roster = loadRoster();
  if (
    roster &&
    isSeasonComplete(career) &&
    (roster.rivalEvolvedThroughSeason ?? 0) < career.seasonNumber
  ) {
    rivalGains = evolveRivals(roster, DIFFICULTY_PRESETS[career.difficulty].rivalGrowth);
    roster.rivalEvolvedThroughSeason = career.seasonNumber;
    saveRoster(roster);
    scheduleCloudSync();
  }

  const root = document.createElement('div');
  root.className = 'season-screen';

  const header = document.createElement('header');
  header.className = 'season-header';
  header.innerHTML = `<h1>Temporada ${career.seasonNumber} ${
    isSeasonComplete(career) ? 'completada' : '— resumen parcial'
  }</h1>`;
  const themeBtn = document.createElement('button');
  themeBtn.type = 'button';
  themeBtn.className = 'btn';
  themeBtn.textContent = themeButtonLabel();
  themeBtn.addEventListener('click', () => {
    toggleTheme();
    themeBtn.textContent = themeButtonLabel();
  });
  header.appendChild(themeBtn);
  root.appendChild(header);

  const main = document.createElement('main');
  main.className = 'season-main';

  const card = document.createElement('section');
  card.className = 'card'; // spec 020

  const list = document.createElement('div');
  list.className = 'season-list';
  let total = 0;
  career.seasonResults.forEach((result, i) => {
    total += result.prize;
    const row = document.createElement('div');
    row.className = 'season-row';
    const trackName = getTrackById(result.trackId)?.name ?? result.trackId;
    // Spec 011: rows are labelled round + weekend act; the race keeps
    // the plain round number (it is "the" result of the weekend).
    const round = career.calendar.indexOf(result.trackId) + 1 || i + 1;
    row.innerHTML = `
      <span class="round">R${String(round).padStart(2, '0')}${eventShortLabel(result.event ?? 'race')}</span>
      <span class="track"></span>
      <span class="pos">P${result.position}</span>
      <span class="prize">+${result.prize} M€</span>`;
    (row.querySelector<HTMLElement>('.track')!).textContent = trackName;
    list.appendChild(row);
  });
  if (career.seasonResults.length === 0) {
    list.innerHTML = '<div class="empty">Todavía no hay resultados esta temporada.</div>';
  }
  card.appendChild(list);

  const totals = document.createElement('div');
  totals.className = 'season-totals';
  totals.innerHTML = `
    <div>Total ganado en premios: <strong class="count-total">0</strong> M€</div>
    <div>Presupuesto del equipo: <strong>${career.budget} M€</strong></div>`;
  card.appendChild(totals);

  // Phase 7 celebration: count-up of the money won (plain rAF, no libs).
  // Spec 027: with reduced motion the final value lands directly.
  const countEl = card.querySelector<HTMLElement>('.count-total')!;
  const reducedMotion =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    countEl.textContent = String(total);
  } else {
    const startAt = performance.now();
    const DURATION_MS = 1600;
    const step = (t: number): void => {
      const p = Math.min(1, (t - startAt) / DURATION_MS);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      countEl.textContent = String(Math.round(total * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // Spec 029: who got better while you were winning — the top 3.
  let rivalsCard: HTMLElement | null = null;
  if (rivalGains.length > 0) {
    rivalsCard = document.createElement('section');
    rivalsCard.className = 'card rival-growth';
    const top = [...rivalGains].sort((a, b) => b.gain - a.gain).slice(0, 3);
    rivalsCard.innerHTML = `
      <h2>Los rivales no se duermen</h2>
      <p class="rival-growth-hint">Al cerrar la temporada sus coches mejoran (dificultad ${
        DIFFICULTY_PRESETS[career.difficulty].label.toLowerCase()
      }). Estos son los que más han progresado:</p>
      <div class="rival-growth-list"></div>`;
    const growthList = rivalsCard.querySelector<HTMLElement>('.rival-growth-list')!;
    for (const g of top) {
      const row = document.createElement('div');
      row.className = 'rival-growth-row';
      row.innerHTML = '<span class="team"></span><span class="gain"></span>';
      row.querySelector<HTMLElement>('.team')!.textContent = g.teamName;
      row.querySelector<HTMLElement>('.gain')!.textContent = `+${g.gain}`;
      growthList.appendChild(row);
    }
  }
  const actions = document.createElement('div');
  actions.className = 'season-actions';
  const newSeasonBtn = document.createElement('button');
  newSeasonBtn.type = 'button';
  newSeasonBtn.className = 'btn primary';
  newSeasonBtn.textContent = 'Empezar temporada nueva';
  newSeasonBtn.addEventListener('click', () => {
    // Spec 031: freeze this season into the palmarés BEFORE its
    // results are wiped (idempotent: one entry per season).
    recordPalmares(career, roster);
    // Next season: index and results reset; budget and car upgrades
    // stay untouched.
    career.seasonNumber += 1;
    career.seasonResults = [];
    career.currentRaceIndex = 0;
    saveCareer(career);
    scheduleCloudSync();
    onExit();
  });
  const backBtn = document.createElement('button');
  backBtn.type = 'button';
  backBtn.className = 'btn';
  backBtn.textContent = 'Mi Equipo';
  backBtn.addEventListener('click', () => onExit());
  actions.append(newSeasonBtn, backBtn);
  card.appendChild(actions);

  main.appendChild(card);
  if (rivalsCard) main.appendChild(rivalsCard); // under the summary
  root.appendChild(main);
  container.appendChild(root);
}
