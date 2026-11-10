import './palmares-screen.css';
import { getOrCreateCareer, palmaresTotals, SeasonPalmaresEntry } from './career';
import { themeButtonLabel, toggleTheme } from './theme';

// ============================================================
// PALMARÉS SCREEN (spec 031): the career's frozen history. Totals
// on top (titles, wins, podiums), one row per closed season, most
// recent first. With nothing closed yet it explains what will
// appear here (constitution V: never an empty, mute screen).
// ============================================================

const ORDINAL: string[] = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10'];

export function createPalmaresScreen(container: HTMLElement, onBack: () => void): void {
  container.innerHTML = '';
  const career = getOrCreateCareer();
  const entries = [...(career.palmares ?? [])].sort((a, b) => b.season - a.season);
  const totals = palmaresTotals(entries);

  const root = document.createElement('div');
  root.className = 'palmares-screen';
  root.innerHTML = `
    <header class="palmares-header">
      <h1>Palmarés</h1>
      <div class="palmares-header-actions">
        <button type="button" class="btn theme-btn"></button>
        <button type="button" class="btn palmares-back-btn">Mi Equipo</button>
      </div>
    </header>
    <main class="palmares-main"></main>`;
  container.appendChild(root);

  const themeBtn = root.querySelector<HTMLButtonElement>('.theme-btn')!;
  themeBtn.textContent = themeButtonLabel();
  themeBtn.addEventListener('click', () => {
    toggleTheme();
    themeBtn.textContent = themeButtonLabel();
  });
  root.querySelector<HTMLButtonElement>('.palmares-back-btn')!.addEventListener('click', onBack);

  const main = root.querySelector<HTMLElement>('.palmares-main')!;

  // Career totals — the headline numbers.
  const totalsCard = document.createElement('section');
  totalsCard.className = 'card cut palmares-totals';
  totalsCard.innerHTML = `
    <h2>Tu carrera</h2>
    <div class="pt-grid">
      <div class="pt-tile"><span class="pt-num"></span><span class="pt-label">Campeonatos</span></div>
      <div class="pt-tile"><span class="pt-num"></span><span class="pt-label">Victorias</span></div>
      <div class="pt-tile"><span class="pt-num"></span><span class="pt-label">Podios</span></div>
    </div>`;
  const nums = totalsCard.querySelectorAll<HTMLElement>('.pt-num');
  [totals.titles, totals.wins, totals.podiums].forEach((v, i) => {
    nums[i].textContent = String(v);
  });
  main.appendChild(totalsCard);

  if (entries.length === 0) {
    // Constitution V: say what will appear, never stay mute.
    const empty = document.createElement('section');
    empty.className = 'card cut palmares-empty';
    empty.innerHTML = `
      <h2>Aún no hay temporadas cerradas</h2>
      <p>Cuando termines todas las rondas de una temporada y pulses
      «Empezar temporada nueva», aquí quedará su recuerdo para
      siempre: tu puesto de constructores, el campeón de pilotos de
      ese año y las victorias y podios de tus coches.</p>`;
    main.appendChild(empty);
    return;
  }

  const listCard = document.createElement('section');
  listCard.className = 'card cut palmares-list';
  for (const entry of entries) {
    listCard.appendChild(palmaresRow(entry));
  }
  main.appendChild(listCard);
}

function palmaresRow(entry: SeasonPalmaresEntry): HTMLElement {
  const row = document.createElement('div');
  row.className = 'palmares-row' + (entry.teamPosition === 1 ? ' champ' : '');
  const pos = entry.teamPosition >= 1 && entry.teamPosition <= ORDINAL.length
    ? ORDINAL[entry.teamPosition - 1]
    : '—';
  const champion = entry.champion || '—';
  row.innerHTML = `
    <div class="pr-head">
      <span class="pr-season"></span>
      <span class="pr-pos"></span>
    </div>
    <div class="pr-body">
      <span class="pr-champ"></span>
      <span class="pr-counts"></span>
    </div>`;
  row.querySelector<HTMLElement>('.pr-season')!.textContent = `Temporada ${entry.season}`;
  row.querySelector<HTMLElement>('.pr-pos')!.textContent = pos;
  row.querySelector<HTMLElement>('.pr-champ')!.textContent = `Campeón: ${champion}`;
  row.querySelector<HTMLElement>('.pr-counts')!.textContent =
    `${entry.wins} ${entry.wins === 1 ? 'victoria' : 'victorias'} · ` +
    `${entry.podiums} ${entry.podiums === 1 ? 'podio' : 'podios'}`;
  return row;
}
