import { Driver, RaceCarState, RaceState, TyreCompound } from './types';
import { isRaceFinished, queuePitCommand, resetPitCommands, simulationTick } from './simulation';
import { buildTestRaceState } from './test-grid';
import {
  ALL_TRACKS,
  normalizeIntoMargin,
  SUBDIVISIONS_PER_SEGMENT,
} from './tracks-generator';
import { REAL_LAYOUTS } from './real-layouts';
import { buildTrackSampler } from './track-path';
import { LATERAL_MAX, lateralTarget, stepLateral } from './racing-line';
import {
  applyPilotUpgrade,
  createDefaultRoster,
  devCost,
  driverVal,
  MAX_DRIVER_STAT,
  PILOT_ATTRS,
  pilotUpgradeCost,
  setDriverNumber,
} from './roster';
import { assignDriverCodes, driverCodeBase } from './driver-codes';
import { createDefaultCareer } from './career';
import { setStartCompound } from './race-builder';
import { buildPaceChart, chartScale } from './pace-chart';
import { evolveRivals, RIVAL_STAT_CAP } from './roster';
import type { PlayerLapEntry } from './types';
import { eventOrderFor, hasSprint, pendingEvent } from './weekend';
import {
  DIFFICULTY_ORDER,
  DIFFICULTY_PRESETS,
  difficultyOrHard,
} from './difficulty';
import { ALL_SPONSORS, SPONSOR_COUNT, sponsorPayPerRace } from './sponsors';
import { prizeForPosition } from './prize-table';

// ============================================================
// TEST HARNESS (Phase 1): runs the simulation head-less (no UI)
// over the shared test grid until the leader completes
// track.totalLaps (max 500 ticks at 10x) and returns the final
// classification plus pit stop timings.
// ============================================================

// Spearman rank correlation. A negative value between pace and final
// position means faster drivers finish further up the order.
function spearman(xs: number[], ys: number[]): number {
  const rank = (arr: number[]): number[] => {
    const order = arr.map((v, i) => ({ v, i })).sort((p, q) => p.v - q.v);
    const r: number[] = new Array(arr.length);
    order.forEach((o, idx) => {
      r[o.i] = idx;
    });
    return r;
  };
  const rx = rank(xs);
  const ry = rank(ys);
  const n = xs.length;
  const mx = rx.reduce((s, v) => s + v, 0) / n;
  const my = ry.reduce((s, v) => s + v, 0) / n;
  let num = 0;
  let dx = 0;
  let dy = 0;
  for (let i = 0; i < n; i++) {
    num += (rx[i] - mx) * (ry[i] - my);
    dx += (rx[i] - mx) ** 2;
    dy += (ry[i] - my) ** 2;
  }
  return num / Math.sqrt(dx * dy);
}

// Acceptance check 3 (spec 012): the lateral (render-only) racing
// line holds its invariants with deterministic inputs.
function racingLineSelfCheck(lines: string[]): void {
  let failures = 0;
  const expect = (ok: boolean, what: string): void => {
    if (!ok) {
      failures++;
      lines.push('FAIL lateral: ' + what);
    }
  };

  // 1) Bounded: targets always within [-1, 1] whatever the inputs.
  for (let t = 0; t < 40; t++) {
    const target = lateralTarget(
      { driverId: 'd' + t, gridPos: (t % 20) + 1, totalProgress: t * 1.7, lateral: -1 },
      {
        cars: [],
        curvatureAt: () => Math.sin(t * 3.1),
        clockSec: t * 11,
        yellow: t % 3 === 0,
      }
    );
    expect(Math.abs(target) <= LATERAL_MAX, 'acotado (t=' + t + ' -> ' + target + ')');
  }

  // 2) Battles open to opposite sides; yellow drops the battle.
  const duel = (yellow: boolean): [number, number] => {
    const a = { driverId: 'alpha', gridPos: 1, totalProgress: 10.0, lateral: 0 };
    const b = { driverId: 'bravo', gridPos: 2, totalProgress: 10.001, lateral: 0 };
    const input = { cars: [a, b], curvatureAt: () => 0, clockSec: 5, yellow };
    return [lateralTarget(a, input), lateralTarget(b, input)];
  };
  const [ta, tb] = duel(false);
  expect(ta > 0 && tb < 0, 'batalla a lados opuestos (' + ta.toFixed(2) + ' / ' + tb.toFixed(2) + ')');
  const [ya, yb] = duel(true);
  expect(Math.abs(ya - yb) < 0.6, 'amarilla sin batalla (' + ya.toFixed(2) + ' / ' + yb.toFixed(2) + ')');

  // 3) Smoothing converges to the target without overshooting.
  let current = 0;
  for (let i = 0; i < 10; i++) current = stepLateral(current, 0.9, 0.2);
  expect(current > 0.8 && current <= 0.9, 'convergencia (0 -> ' + current.toFixed(3) + ')');

  lines.push(
    failures === 0
      ? 'Lateral check: acotado OK | batallas OK | amarilla OK | convergencia OK'
      : 'Lateral check: ' + failures + ' FALLOS'
  );
}

// Acceptance check 4 (spec 016): the difficulty presets hold their
// invariants — 'hard' replicates spec 009, easier tiers are strictly
// richer, sponsor pay endpoints match each preset and the prize
// table scales; unknown values fall back to 'hard'.
function difficultySelfCheck(lines: string[]): void {
  let failures = 0;
  const expect = (ok: boolean, what: string): void => {
    if (!ok) {
      failures++;
      lines.push('FAIL dificultad: ' + what);
    }
  };

  const [easy, normal] = DIFFICULTY_ORDER;
  expect(DIFFICULTY_ORDER.length === 3, 'tres presets');
  expect(
    DIFFICULTY_PRESETS.easy.initialBudget > DIFFICULTY_PRESETS.normal.initialBudget &&
      DIFFICULTY_PRESETS.normal.initialBudget > DIFFICULTY_PRESETS.hard.initialBudget,
    'presupuesto easy > normal > hard'
  );
  expect(
    DIFFICULTY_PRESETS[easy].prizeScale > DIFFICULTY_PRESETS[normal].prizeScale &&
      DIFFICULTY_PRESETS[normal].prizeScale > DIFFICULTY_PRESETS.hard.prizeScale,
    'escala de premios decreciente'
  );
  // 'hard' IS spec 009, constant by constant.
  expect(DIFFICULTY_PRESETS.hard.initialBudget === 200, 'hard: 200 M€ (009)');
  expect(DIFFICULTY_PRESETS.hard.sponsorPayMin === 0.3 && DIFFICULTY_PRESETS.hard.sponsorPayMax === 3.0, 'hard: 0,3..3,0 M€ (009)');
  expect(DIFFICULTY_PRESETS.hard.prizeScale === 1, 'hard: premios x1 (009)');
  // Sponsor pay endpoints for every tier.
  const worst = ALL_SPONSORS[0];
  const best = ALL_SPONSORS[SPONSOR_COUNT - 1];
  for (const id of DIFFICULTY_ORDER) {
    expect(sponsorPayPerRace(worst, id) === DIFFICULTY_PRESETS[id].sponsorPayMin, id + ': peor patrocinador = min');
    expect(sponsorPayPerRace(best, id) === DIFFICULTY_PRESETS[id].sponsorPayMax, id + ': mejor patrocinador = max');
  }
  expect(sponsorPayPerRace(worst, 'hard') === 0.3 && sponsorPayPerRace(best, 'easy') === 5, '009 duro abajo, pre-009 facil arriba');
  // Prize scale math (rounded to whole M€).
  expect(prizeForPosition(1) === 100 && prizeForPosition(1, 1.5) === 150, 'P1: 100 -> 150 en facil');
  expect(prizeForPosition(5, 1.25) === 56, 'P5 normal: 45 x 1,25 = 56');
  // Defensive fallback.
  expect(difficultyOrHard(undefined) === 'hard' && difficultyOrHard('turbo') === 'hard' && difficultyOrHard('easy') === 'easy', 'default/legacy = hard');

  lines.push(
    failures === 0
      ? 'Difficulty check: presets OK | extremos OK | premios OK | default hard OK'
      : 'Difficulty check: ' + failures + ' FALLOS'
  );
}

const pad = (s: string, n: number): string => (s.length >= n ? s : s + ' '.repeat(n - s.length));
const padL = (s: string, n: number): string => (s.length >= n ? s : ' '.repeat(n - s.length) + s);

// Acceptance check 5 (specs 018/020): 21 season tracks — the world
// championship set (Miami in, spec 020) plus Jerez — each drawn as
// its REAL layout: the published path must equal the source trace
// (smoothed + normalized) with NO deformation. Overlapping sections
// of the real circuit are welcome again.
function tracksSelfCheck(lines: string[]): void {
  let failures = 0;
  const expect = (ok: boolean, what: string): void => {
    if (!ok) {
      failures++;
      lines.push('FAIL trazados: ' + what);
    }
  };

  expect(ALL_TRACKS.length === 21, '21 circuitos (son ' + ALL_TRACKS.length + ')');
  expect(ALL_TRACKS.some((t) => t.id === 'gp-jerez'), 'Jerez presente');
  expect(ALL_TRACKS.some((t) => t.id === 'gp-miami'), 'Miami presente (020)');
  const has = (slug: string): boolean => ALL_TRACKS.some((t) => t.id === 'gp-' + slug);
  expect(!has('kyalami') && !has('lemans') && !has('nurburgring') && !has('estoril'), 'retirados fuera');

  // Fidelity (spec 020): the drawn path IS the real one. Recompute
  // the un-declashed expectation (same code path as generateTrack
  // minus declash) and compare point by point — reintroducing the
  // 018 push would break this instantly.
  const realPath = (layout: { x: number; y: number }[]): { x: number; y: number }[] =>
    normalizeIntoMargin(buildTrackSampler(layout, SUBDIVISIONS_PER_SEGMENT).polyline());
  let worstFidelity = 0;
  let worstName = '';
  for (let i = 0; i < ALL_TRACKS.length; i++) {
    const expected = realPath(REAL_LAYOUTS[i]);
    const path = ALL_TRACKS[i].path;
    if (path.length !== expected.length) {
      failures++;
      lines.push('FAIL trazados: puntos distintos en ' + ALL_TRACKS[i].name);
      continue;
    }
    let maxD = 0;
    for (let k = 0; k < path.length; k++) {
      maxD = Math.max(maxD, Math.hypot(path[k].x - expected[k].x, path[k].y - expected[k].y));
    }
    if (maxD > worstFidelity) {
      worstFidelity = maxD;
      worstName = ALL_TRACKS[i].name;
    }
  }
  expect(worstFidelity < 1e-9, 'trazados = reales sin deformar (peor ' + worstName + ' ' + worstFidelity.toExponential(1) + ')');

  // Evidence inversion of 018: Singapore's castle section runs close
  // to itself in the real circuit — the minimum-gap rule is gone.
  const minSectionGap = (
    path: { x: number; y: number }[],
    fromArcFrac: number
  ): number => {
    const n = path.length;
    const cum: number[] = [0];
    for (let i = 1; i <= n; i++) {
      cum.push(cum[i - 1] + Math.hypot(path[i % n].x - path[i - 1].x, path[i % n].y - path[i - 1].y));
    }
    const total = cum[n];
    let min = 1;
    for (let a = 0; a < n; a++) {
      for (let b = a + 1; b < n; b++) {
        const arc = Math.min(cum[b] - cum[a], total - (cum[b] - cum[a]));
        if (arc < total * fromArcFrac) continue;
        const d = Math.hypot(path[a].x - path[b].x, path[a].y - path[b].y);
        if (d < min) min = d;
      }
    }
    return min;
  };
  const singapore = ALL_TRACKS.find((t) => t.name === 'Singapur')!;
  const sgParallel = minSectionGap(singapore.path, 0.1);
  expect(sgParallel < 0.05, 'Singapur real de nuevo (paralelos ' + sgParallel.toFixed(3) + ' < 0.05)');

  lines.push(
    failures === 0
      ? 'Tracks check: 21 OK | Miami OK | Jerez OK | retirados fuera OK | trazados reales sin deformar (peor ' +
          worstName + ' ' + worstFidelity.toExponential(1) + ') | Singapur con sus solapes reales (' +
          sgParallel.toFixed(3) + ')'
      : 'Tracks check: ' + failures + ' FALLOS'
  );
}

// Acceptance check 8 (spec 020): broadcast codes — 3 letters from
// the surname, unique across the grid, deterministic, surviving
// renames; forced collisions resolve in roster order.
function codesSelfCheck(lines: string[]): void {
  let failures = 0;
  const expect = (ok: boolean, what: string): void => {
    if (!ok) {
      failures++;
      lines.push('FAIL codigos: ' + what);
    }
  };

  const roster = createDefaultRoster(200);
  const drivers = roster.entries.flatMap((e) => e.drivers);
  const codes = assignDriverCodes(drivers);
  expect(drivers.length === 20, '20 pilotos');
  const values = [...codes.values()];
  expect(codes.size === 20 && new Set(values).size === 20, '20 codigos unicos');
  expect(values.every((c) => /^[A-Z]{3}$/.test(c)), 'formato [A-Z]{3}');
  const again = assignDriverCodes(drivers);
  expect([...again.entries()].every(([id, c]) => codes.get(id) === c), 'deterministas (misma lista, mismos codigos)');

  // Player placeholders fall back to the full name's letters.
  expect(driverCodeBase('Piloto 1') === 'PIL', "'Piloto 1' -> PIL");

  // Three Rossis: first keeps the base, the others walk letters.
  const mk = (id: string, name: string): Driver => ({
    id, name, number: 1, pace: 50, consistency: 50, aggression: 50,
    wetSkill: 50, riskTolerance: 50, experience: 50,
  });
  const rossis = assignDriverCodes([mk('a', 'Ana Rossi'), mk('b', 'Berta Rossi'), mk('c', 'Carla Rossi')]);
  const rv = [...rossis.values()];
  expect(rv[0] === 'ROS' && new Set(rv).size === 3, '3 Rossi distintos, el primero ROS (' + rv.join(',') + ')');

  // Renaming one driver to another's surname keeps the grid unique.
  drivers[0].name = drivers[1].name;
  const renamed = assignDriverCodes(drivers);
  expect(new Set(renamed.values()).size === 20, 'sin colisiones tras renombrar');

  lines.push(
    failures === 0
      ? 'Codigos check: 20 unicos OK | deterministas OK | 3 Rossi OK (' + rv.join(',') + ') | renombrado OK'
      : 'Codigos check: ' + failures + ' FALLOS'
  );
}

// Acceptance check 6 (spec 018): rain strategy. With the weather
// forced, the rival AI must swap to the rubber the conditions call
// for — intermediates in light rain, wets in heavy rain (the wrong
// rubber forces the stop, so the check does not depend on luck).
function weatherSelfCheck(lines: string[]): void {
  let failures = 0;
  const expect = (ok: boolean, what: string): void => {
    if (!ok) {
      failures++;
      lines.push('FAIL lluvia: ' + what);
    }
  };

  const runWetRace = (weather: 'lightRain' | 'heavyRain'): boolean => {
    resetPitCommands();
    const state = buildTestRaceState();
    state.weather = weather;
    state.weatherCanChange = false; // the strategy test keeps its weather
    state.simTimeMultiplier = 10;
    for (let i = 0; i < 400; i++) {
      simulationTick(state);
      const mounted = state.cars.filter(
        (c) => !c.isPlayerControlled && c.tyre.compound === (weather === 'lightRain' ? 'inter' : 'wet')
      ).length;
      if (mounted >= 5) return true; // plenty of the field has swapped
    }
    return false;
  };
  expect(runWetRace('lightRain'), 'lluvia ligera: la IA monta intermedios');
  expect(runWetRace('heavyRain'), 'lluvia fuerte: la IA monta lluvia');
  resetPitCommands();

  lines.push(
    failures === 0
      ? 'Weather check: IA a intermedios en ligera OK | IA a lluvia en fuerte OK'
      : 'Weather check: ' + failures + ' FALLOS'
  );
}

// Acceptance check 7 (spec 019): pilot development and race numbers.
// Upgrades move the REAL simulation stats, cost rises per level, the
// cap holds, val is the mean of the four attributes, and numbers are
// unique across the grid.
function pilotsSelfCheck(lines: string[]): void {
  let failures = 0;
  const expect = (ok: boolean, what: string): void => {
    if (!ok) {
      failures++;
      lines.push('FAIL pilotos: ' + what);
    }
  };

  const roster = createDefaultRoster(200);
  const player = roster.entries.find((e) => e.team.id === roster.playerTeamId)!;
  const driver = player.drivers[0];

  // Fresh roster: experience generated, training ledger present.
  expect(
    roster.entries.every((e) => e.drivers.every((d) => d.experience >= 50 && d.experience <= 90)),
    'experience generada 50-90'
  );
  expect(player.drivers.every((d) => d.training && Object.keys(d.training).length === 0), 'training vacio al empezar');

  // val = mean of the four trainable attributes.
  const before = driverVal(driver);
  expect(
    before === Math.round((driver.pace + driver.consistency + driver.wetSkill + driver.experience) / 4),
    'val = media de las 4'
  );

  // First upgrade: pick an attribute that is not maxed yet (a random
  // roster can start at 95 — the UI shows MÁX there, the purchase is
  // legitimately impossible).
  const attr = PILOT_ATTRS.find((a) => driver[a.stat] < MAX_DRIVER_STAT) ?? PILOT_ATTRS[0];
  const statBefore = driver[attr.stat];
  const first = applyPilotUpgrade(driver, attr.id, 200);
  expect(first.ok && first.cost === 15, 'primer nivel cuesta 15');
  expect(driver[attr.stat] === statBefore + 1, attr.label + ' sube la stat real');
  expect((driver.training?.[attr.id] ?? 0) === 1, 'ledger del training');
  expect(pilotUpgradeCost(1) === 30, 'el segundo nivel cuesta 30');
  expect(
    driverVal(driver) === before || driverVal(driver) === before + 1,
    'val sigue a la media (redondeo)'
  );

  // Broke team: no purchase, no change.
  const statMid = driver[attr.stat];
  expect(applyPilotUpgrade(driver, attr.id, 5).ok === false, 'sin dinero no compra');
  expect(driver[attr.stat] === statMid, 'sin dinero no cambia la stat');

  // Cap: a maxed stat cannot be bought even with money.
  driver[attr.stat] = MAX_DRIVER_STAT;
  expect(applyPilotUpgrade(driver, attr.id, 9999).ok === false, 'tope 95 bloqueado');
  driver[attr.stat] = statMid; // restore

  // Race numbers: 1-99, unique across the whole grid.
  expect(setDriverNumber(roster, player, 0, 44) === true, 'dorsal 44 aceptado');
  expect(player.drivers[0].number === 44, 'dorsal persistido en el driver');
  expect(setDriverNumber(roster, player, 0, 3) === false, 'dorsal de un rival rechazado');
  expect(player.drivers[0].number === 44, 'dorsal no cambia al rechazar');
  expect(setDriverNumber(roster, player, 0, 0) === false, '0 fuera de rango');
  expect(setDriverNumber(roster, player, 0, 100) === false, '100 fuera de rango');

  lines.push(
    failures === 0
      ? 'Pilotos check: mejora real OK | coste creciente OK | tope OK | val media OK | dorsales unicos OK'
      : 'Pilotos check: ' + failures + ' FALLOS'
  );
}

// Acceptance check 9 (spec 021): real weekend format — sprints only at
// the real sprint venues, the rest go quali -> race; development
// prices rise 4 M€ per level.
function formatSelfCheck(lines: string[]): void {
  let failures = 0;
  const expect = (ok: boolean, what: string): void => {
    if (!ok) {
      failures++;
      lines.push('FAIL formato: ' + what);
    }
  };

  expect(hasSprint('gp-miami') && hasSprint('gp-spa') && hasSprint('gp-austin') && hasSprint('gp-interlagos'), 'sprint en Miami/Spa/Austin/Interlagos');
  expect(!hasSprint('gp-jerez') && !hasSprint('gp-melbourne') && !hasSprint('gp-monaco'), 'sin sprint en el resto');
  expect(eventOrderFor('gp-melbourne').length === 2, 'Melbourne: quali -> carrera');
  expect(eventOrderFor('gp-miami').length === 4, 'Miami: quali -> sprints -> carrera');

  const career = createDefaultCareer(200, 'hard');
  career.calendar = ['gp-melbourne'];
  career.currentRaceIndex = 0;
  career.seasonResults = [];
  expect(pendingEvent(career) === 'quali', 'ronda normal: primero la clasificación');
  career.seasonResults = [{ trackId: 'gp-melbourne', event: 'quali', position: 1, prize: 0 }];
  expect(pendingEvent(career) === 'race', 'ronda normal tras la quali: CARRERA (sin sprints)');
  career.calendar = ['gp-miami'];
  career.seasonResults = [{ trackId: 'gp-miami', event: 'quali', position: 1, prize: 0 }];
  expect(pendingEvent(career) === 'sprint1', 'ronda sprint tras la quali: Sprint 1');
  // Legacy save: sprints recorded at a round that no longer hosts them.
  career.calendar = ['gp-melbourne'];
  career.seasonResults = (['quali', 'sprint1', 'sprint2', 'race'] as const).map((ev) => ({
    trackId: 'gp-melbourne',
    event: ev,
    position: 1,
    prize: 0,
  }));
  expect(pendingEvent(career) === null, 'save vieja con sprints: fin de semana completo');

  expect(devCost(0) === 15 && devCost(1) === 19 && devCost(2) === 23, 'mejoras del coche 15/19/23 M€');

  lines.push(
    failures === 0
      ? 'Formato check: sprints solo en las 4 rondas reales OK | quali->carrera en el resto OK | saves viejos OK | mejoras 15/19/23 OK'
      : 'Formato check: ' + failures + ' FALLOS'
  );
}

// Acceptance check 10 (spec 023): fastest lap. With the randomness
// pinned (no incidents, no weather, fixed compounds) a 2-car/3-lap
// micro-race proves: millisecond precision independent of the speed
// multiplier, and in-laps (the lap that ends in the pits) never being
// the record — even when they are the fastest time on track.
function fastestLapSelfCheck(lines: string[]): void {
  let failures = 0;
  const expect = (ok: boolean, what: string): void => {
    if (!ok) {
      failures++;
      lines.push('FAIL vuelta rapida: ' + what);
    }
  };

  const origRandom = Math.random;
  try {
    Math.random = () => 0.999; // no incidents, no weather, 'hard' start
    const mkDriver = (id: string, pace: number): Driver => ({
      id,
      name: 'Test ' + id,
      number: 1,
      pace,
      consistency: 100, // zero lap-noise: fully deterministic pace
      aggression: 0,
      wetSkill: 50,
      riskTolerance: 0,
      experience: 50,
    });
    const mkCar = (driverId: string, position: number): RaceCarState => ({
      driverId,
      carId: 'c-' + driverId,
      teamId: 't',
      lapProgress: 0,
      currentLap: 0,
      tyre: { compound: 'soft', wear: 0, lapsOnTyre: 0 },
      fuel: 50,
      gapToLeaderSec: 0,
      position,
      pitStopsCompleted: 0,
      status: 'racing',
      isPlayerControlled: false,
      pitTimerSec: 0,
      lapTimeAccumSec: 0,
      lapInvalid: false,
    });
    const spec = {
      id: 'spec',
      teamId: 't',
      aero: 80,
      engine: 80,
      chassis: 80,
      reliability: 95,
    };
    const state: RaceState = {
      track: { ...ALL_TRACKS[0], totalLaps: 3 },
      weather: 'dry',
      weatherCanChange: false,
      flag: 'green',
      flagTimerSec: 0,
      cars: [mkCar('fast', 1), mkCar('slow', 2)],
      teams: [{ id: 't', name: 'T', budget: 0, color: '#e10600' }],
      drivers: [mkDriver('fast', 95), mkDriver('slow', 60)],
      carSpecs: [spec, spec],
      currentTick: 0,
      simTimeMultiplier: 20,
      isPaused: false,
      raceEvents: [],
      fastestLap: null,
      playerLaps: {},
    };
    // The fast car boxes at the end of its FIRST lap — its quickest
    // lap on fresh tyres, but an in-lap can never be the record.
    queuePitCommand({ carDriverId: 'fast', newCompound: 'medium', requestedAtTick: 0 });
    for (let i = 0; i < 400 && !isRaceFinished(state); i++) simulationTick(state);
    resetPitCommands();

    const fl = state.fastestLap;
    expect(!!fl, 'hay vuelta rápida al terminar');
    if (fl) {
      expect(fl.driverId === 'fast', 'la tiene el rápido (' + fl.driverId + ')');
      expect(fl.lapNumber >= 2, 'la in-lap queda excluida (vuelta ' + fl.lapNumber + ')');
      expect(
        (fl.lapTimeSec * 1000) % (state.simTimeMultiplier * 1000) !== 0,
        'tiempo con milésimas, no múltiplo de x' + state.simTimeMultiplier +
          ' (' + fl.lapTimeSec.toFixed(3) + ' s)'
      );
      expect(fl.lapTimeSec > 40 && fl.lapTimeSec < 240, 'tiempo plausible (' + fl.lapTimeSec.toFixed(3) + ' s)');
    }
  } finally {
    Math.random = origRandom;
  }

  lines.push(
    failures === 0
      ? 'VL check: milésimas a cualquier velocidad OK | in-lap excluida OK | regla estricta OK'
      : 'VL check: ' + failures + ' FALLOS'
  );
}

// Acceptance check 11 (spec 025): the start-tyre choice touches ONLY
// the chosen player car and hands it fresh rubber; everyone else keeps
// the builder's draw (the rivals' lottery stays untouched).
function tyrePickSelfCheck(lines: string[]): void {
  let failures = 0;
  const expect = (ok: boolean, what: string): void => {
    if (!ok) {
      failures++;
      lines.push('FAIL goma: ' + what);
    }
  };

  const mkCar = (id: string, player: boolean, compound: TyreCompound): RaceCarState => ({
    driverId: id,
    carId: id + '-car',
    teamId: 't',
    lapProgress: 0,
    currentLap: 2,
    // Half-worn rubber: the choice must reset it to a fresh tyre.
    tyre: { compound, wear: 0.55, lapsOnTyre: 2 },
    fuel: 50,
    gapToLeaderSec: 0,
    position: 1,
    pitStopsCompleted: 0,
    status: 'racing',
    isPlayerControlled: player,
    pitTimerSec: 0,
    lapTimeAccumSec: 0,
    lapInvalid: false,
  });
  const state = {
    cars: [mkCar('mio-a', true, 'medium'), mkCar('rival', false, 'hard'), mkCar('mio-b', true, 'soft')],
  } as unknown as RaceState;

  setStartCompound(state, 'mio-a', 'soft');
  const chosen = state.cars[0];
  expect(
    chosen.tyre.compound === 'soft' && chosen.tyre.wear === 0 && chosen.tyre.lapsOnTyre === 0,
    'la goma elegida se aplica nueva (desgaste 0, 0 vueltas)'
  );
  expect(
    state.cars[1].tyre.compound === 'hard' && Math.abs(state.cars[1].tyre.wear - 0.55) < 1e-9,
    'el rival conserva su sorteo'
  );
  expect(
    state.cars[2].tyre.compound === 'soft' && Math.abs(state.cars[2].tyre.wear - 0.55) < 1e-9,
    'el otro coche mío no cambia si no lo toco'
  );
  setStartCompound(state, 'desconocido', 'soft');
  expect(state.cars.length === 3, 'driverId desconocido: sin error');
  setStartCompound(state, 'mio-b', 'medium');
  expect(state.cars[2].tyre.compound === 'medium', 'el segundo coche también se puede cambiar');

  lines.push(
    failures === 0
      ? 'Goma check: solo el coche elegido OK | goma nueva OK | rivales intactos OK'
      : 'Goma check: ' + failures + ' FALLOS'
  );
}

// Acceptance check 12 (spec 028): the per-lap log of the player's cars
// and the pace-chart scale. A deterministic 4-lap micro-race with BOTH
// cars player-controlled (one pits at the end of lap 1) proves the
// collection; synthetic entries prove the scale ignores marked laps.
function paceChartSelfCheck(lines: string[]): void {
  let failures = 0;
  const expect = (ok: boolean, what: string): void => {
    if (!ok) {
      failures++;
      lines.push('FAIL ritmo: ' + what);
    }
  };

  const origRandom = Math.random;
  try {
    Math.random = () => 0.999; // no incidents, no weather, no flags
    const mkDriver = (id: string, pace: number): Driver => ({
      id,
      name: 'Test ' + id,
      number: 1,
      pace,
      consistency: 100,
      aggression: 0,
      wetSkill: 50,
      riskTolerance: 0,
      experience: 50,
    });
    const mkPlayerCar = (driverId: string, position: number): RaceCarState => ({
      driverId,
      carId: 'c-' + driverId,
      teamId: 't',
      lapProgress: 0,
      currentLap: 0,
      tyre: { compound: 'soft', wear: 0, lapsOnTyre: 0 },
      fuel: 50,
      gapToLeaderSec: 0,
      position,
      pitStopsCompleted: 0,
      status: 'racing',
      isPlayerControlled: true,
      pitTimerSec: 0,
      lapTimeAccumSec: 0,
      lapInvalid: false,
    });
    const spec = {
      id: 'spec',
      teamId: 't',
      aero: 80,
      engine: 80,
      chassis: 80,
      reliability: 95,
    };
    const state: RaceState = {
      track: { ...ALL_TRACKS[0], totalLaps: 4 },
      weather: 'dry',
      weatherCanChange: false,
      flag: 'green',
      flagTimerSec: 0,
      cars: [mkPlayerCar('uno', 1), mkPlayerCar('dos', 2)],
      teams: [{ id: 't', name: 'T', budget: 0, color: '#e10600' }],
      drivers: [mkDriver('uno', 95), mkDriver('dos', 60)],
      carSpecs: [spec, spec],
      currentTick: 0,
      simTimeMultiplier: 20,
      isPaused: false,
      raceEvents: [],
      fastestLap: null,
      playerLaps: {},
    };
    // 'uno' boxes at the end of its first lap; 'dos' runs it through.
    queuePitCommand({ carDriverId: 'uno', newCompound: 'medium', requestedAtTick: 0 });
    for (let i = 0; i < 600 && !isRaceFinished(state); i++) simulationTick(state);
    resetPitCommands();

    const lapsUno = state.playerLaps['uno'] ?? [];
    const lapsDos = state.playerLaps['dos'] ?? [];
    // The chequered flag cuts the backmarker: the leader logs all 4
    // laps, the slower car one less (the chart line just ends there).
    expect(
      lapsUno.length === 4 && lapsDos.length === 3,
      'una entrada por vuelta completada; la bandera corta al rezagado (' + lapsUno.length + '/' + lapsDos.length + ')'
    );
    expect(lapsUno[0]?.pitted === true, 'la in-lap de uno queda marcada como parada');
    expect(lapsUno.slice(1).every((e) => !e.pitted), 'tras la parada nada más marcado');
    expect(lapsDos.every((e) => !e.pitted), 'dos no paró: ninguna marca');
    expect(lapsUno[1]?.compound === 'medium', 'tras la parada la goma es la nueva (M)');
    expect(
      lapsUno.every((e) => !e.flag) && lapsDos.every((e) => !e.flag),
      'sin bandera en el stub determinista'
    );
    expect(
      [...lapsUno, ...lapsDos].every((e) => e.lapTimeSec > 40 && e.lapTimeSec < 300),
      'tiempos plausibles'
    );

    // Scale: marked laps never stretch it (synthetic, exact numbers).
    const synthetic: PlayerLapEntry[][] = [
      [
        { lap: 1, lapTimeSec: 100, compound: 'soft', pitted: false, flag: false },
        { lap: 2, lapTimeSec: 101, compound: 'soft', pitted: false, flag: false },
      ],
      [
        { lap: 1, lapTimeSec: 99, compound: 'soft', pitted: false, flag: false },
        { lap: 2, lapTimeSec: 200, compound: 'soft', pitted: true, flag: false },
      ],
    ];
    const sc = chartScale(synthetic);
    expect(sc.maxSec < 200 - 1, 'una vuelta marcada de 200 s no estira la escala (max ' + sc.maxSec.toFixed(1) + ')');
    expect(sc.minSec < 99 && sc.maxSec > 101, 'la escala envuelve a las limpias');

    // The SVG itself: two shapes for two cars, pit note, empty guard.
    expect(buildPaceChart([]) === '', 'sin datos: sin gráfico');
    const svg = buildPaceChart([
      { code: 'UNO', entries: synthetic[0] },
      { code: 'DOS', entries: synthetic[1] },
    ]);
    expect(svg.includes('pc-line a') && svg.includes('pc-line b'), 'dos series (continua y discontinua)');
    expect(svg.includes('pc-dot b marked') || svg.includes('pc-dot a marked'), 'la vuelta marcada queda hueca');
    expect(svg.includes('→box'), 'nota de parada en la última vuelta');
  } finally {
    Math.random = origRandom;
  }

  lines.push(
    failures === 0
      ? 'Ritmo check: entrada por vuelta OK | in-lap marcada OK | goma nueva tras parada OK | escala sin marcadas OK | SVG dos formas OK'
      : 'Ritmo check: ' + failures + ' FALLOS'
  );
}

// Acceptance check 13 (spec 029): rival evolution at the season close.
// With Math.random pinned, several simulated seasons prove: gains on
// the board, the player untouched, the cap below the player's ceiling,
// and the difficulty scaling (hard > normal > easy on the SAME noise).
function rivalEvolutionSelfCheck(lines: string[]): void {
  let failures = 0;
  const expect = (ok: boolean, what: string): void => {
    if (!ok) {
      failures++;
      lines.push('FAIL rivales: ' + what);
    }
  };

  const origRandom = Math.random;
  try {
    Math.random = () => 0.999; // maximal noise: every stat wants to grow
    const roster = createDefaultRoster();
    const playerBefore = JSON.stringify(
      roster.entries.find((e) => e.team.id === roster.playerTeamId)
    );
    const statPool = (r: typeof roster): number[] =>
      r.entries
        .filter((e) => e.team.id !== r.playerTeamId)
        .flatMap((e) => e.cars.flatMap((c) => [c.aero, c.engine, c.chassis, c.reliability]));

    const before = statPool(roster);
    const gains1 = evolveRivals(roster, 1.0);
    const after1 = statPool(roster);
    expect(gains1.length === 9, 'los 9 equipos rivales evolucionan (' + gains1.length + ')');
    expect(gains1.filter((g) => g.gain > 0).length >= 5, 'varios equipos mejoran de verdad');
    expect(
      after1.reduce((s, v) => s + v, 0) > before.reduce((s, v) => s + v, 0),
      'el conjunto de la parrilla sube'
    );
    expect(
      JSON.stringify(roster.entries.find((e) => e.team.id === roster.playerTeamId)) === playerBefore,
      'el equipo del jugador queda intacto'
    );

    // Many seasons: monotone rise, cap never exceeded (a stat born
    // above the cap keeps its value — never nerfed, never pushed).
    const maxBefore = Math.max(...before);
    for (let season = 0; season < 12; season++) evolveRivals(roster, 1.6);
    const stats = statPool(roster);
    expect(stats.every((v) => v <= Math.max(RIVAL_STAT_CAP, maxBefore)), 'techo ' + RIVAL_STAT_CAP + ' respetado (máx ' + Math.max(...stats) + ', origen ' + maxBefore + ')');
    expect(
      stats.reduce((s, v) => s + v, 0) > after1.reduce((s, v) => s + v, 0),
      'más temporadas = más mejora (no se estanca antes de tiempo)'
    );
    const atCap = stats.filter((v) => v >= RIVAL_STAT_CAP).length;
    expect(atCap > 0 && RIVAL_STAT_CAP < 95, 'las stats maduran al techo, por debajo del tope del jugador');

    // Difficulty scaling on the SAME noise sequence.
    const runSeasons = (growth: number): number => {
      Math.random = () => 0.7; // fixed sequence for a fair comparison
      const r = createDefaultRoster();
      for (let s = 0; s < 5; s++) evolveRivals(r, growth);
      return statPool(r).reduce((sum, v) => sum + v, 0);
    };
    const easy = runSeasons(0.5);
    const normal = runSeasons(1.0);
    const hard = runSeasons(1.6);
    expect(easy < normal && normal < hard, 'escalado por dificultad (f ' + easy + ' < n ' + normal + ' < d ' + hard + ')');

    // A weak field converges: the backmarker gains more than the top.
    Math.random = () => 0.999;
    const r2 = createDefaultRoster();
    const gainsA = evolveRivals(r2, 1.0);
    const sorted = [...gainsA].sort((a, b) => b.gain - a.gain);
    expect(sorted[0].gain > sorted[sorted.length - 1].gain, 'la tendencia premia a los de atrás');
  } finally {
    Math.random = origRandom;
  }

  lines.push(
    failures === 0
      ? 'Rivales check: 9 equipos OK | jugador intacto OK | techo 92 OK | escalado fácil<normal<difícil OK | tendencia OK'
      : 'Rivales check: ' + failures + ' FALLOS'
  );
}

export function runTestHarness(): string {
  const state: RaceState = buildTestRaceState();

  // Record when each stop happens: lap number + race second.
  const pitLog = new Map<string, { lap: number; raceSec: number }[]>();
  const prevStops = new Map<string, number>(
    state.cars.map((c) => [c.driverId, c.pitStopsCompleted])
  );

  const MAX_TICKS = 500;
  let ticksRun = 0;
  for (; ticksRun < MAX_TICKS; ticksRun++) {
    simulationTick(state);
    const raceSec = (ticksRun + 1) * state.simTimeMultiplier;
    for (const car of state.cars) {
      const prev = prevStops.get(car.driverId) ?? 0;
      if (car.pitStopsCompleted > prev) {
        const list = pitLog.get(car.driverId) ?? [];
        list.push({ lap: car.currentLap + 1, raceSec });
        pitLog.set(car.driverId, list);
        prevStops.set(car.driverId, car.pitStopsCompleted);
      }
    }
    // Chequered flag: leader completed all the laps.
    if (state.cars.some((c) => c.currentLap >= state.track.totalLaps)) break;
  }

  // ---- Final report ----
  const teamName = (teamId: string): string =>
    state.teams.find((t) => t.id === teamId)?.name ?? teamId;
  const order = [...state.cars].sort((a, b) => a.position - b.position);
  const leaderLaps = order[0].currentLap;

  const lines: string[] = [];
  lines.push(
    `=== TEST HARNESS | ${state.track.name} | ${state.track.totalLaps} laps | dry | ${ticksRun + 1} ticks (x${state.simTimeMultiplier}) ===`
  );
  lines.push('');
  lines.push(
    pad('POS', 5) +
      pad('DRIVER', 16) +
      pad('TEAM', 15) +
      pad('PACE', 6) +
      pad('LAPS', 6) +
      pad('GAP', 10) +
      pad('TYRE', 9) +
      pad('WEAR', 7) +
      pad('PITS', 6) +
      'PIT LAPS'
  );

  for (const car of order) {
    const driver = state.drivers.find((d) => d.id === car.driverId)!;
    const lapsDown = leaderLaps - car.currentLap;
    const gap =
      car.status === 'dnf'
        ? 'DNF'
        : car.position === 1
          ? 'leader'
          : lapsDown > 0
            ? `+${lapsDown} lap${lapsDown > 1 ? 's' : ''}`
            : `+${car.gapToLeaderSec.toFixed(1)}s`;
    const stops = pitLog.get(car.driverId) ?? [];
    const pitLaps = stops.length > 0 ? stops.map((s) => s.lap).join(', ') : '-';
    lines.push(
      padL(String(car.position), 5) +
        pad(driver.name + (car.isPlayerControlled ? ' *' : ''), 16) +
        pad(teamName(car.teamId), 15) +
        padL(String(driver.pace), 6) +
        padL(String(car.currentLap), 6) +
        pad(gap, 10) +
        pad(car.tyre.compound, 9) +
        padL(`${Math.round(car.tyre.wear)}%`, 7) +
        padL(String(car.pitStopsCompleted), 6) +
        pitLaps
    );
  }

  lines.push('');
  lines.push('(*) = player-controlled cars (no AI pit calls, only manual commands).');

  // Acceptance check 1: better pace should finish generally ahead.
  const paceValues = order.map((c) => state.drivers.find((d) => d.id === c.driverId)!.pace);
  const positions = order.map((c) => c.position);
  const corr = spearman(paceValues, positions);
  lines.push(
    `Pace vs final position rank correlation: ${corr.toFixed(2)} (negative = faster drivers finish ahead)`
  );

  // Acceptance check 2: pit stops spread across different laps.
  const allStops = [...pitLog.values()].flat();
  if (allStops.length > 0) {
    const lapNumbers = allStops.map((s) => s.lap);
    lines.push(
      `Total pit stops: ${allStops.length} | first on lap ${Math.min(...lapNumbers)}, last on lap ${Math.max(...lapNumbers)}`
    );
  } else {
    lines.push('WARNING: no pit stops happened.');
  }

  // Acceptance check 3 (spec 012): lateral racing-line invariants.
  racingLineSelfCheck(lines);

  // Acceptance check 4 (spec 016): difficulty preset invariants.
  difficultySelfCheck(lines);

  // Acceptance check 5 (spec 018): tracks and 6 (spec 018): rain.
  tracksSelfCheck(lines);
  weatherSelfCheck(lines);

  // Acceptance check 7 (spec 019): pilots and race numbers.
  pilotsSelfCheck(lines);

  // Acceptance check 8 (spec 020): broadcast codes.
  codesSelfCheck(lines);

  // Acceptance check 9 (spec 021): weekend format and upgrade prices.
  formatSelfCheck(lines);

  // Acceptance check 10 (spec 023): fastest lap.
  fastestLapSelfCheck(lines);

  // Acceptance check 11 (spec 025): start-tyre choice.
  tyrePickSelfCheck(lines);

  // Acceptance check 12 (spec 028): pace chart.
  paceChartSelfCheck(lines);

  // Acceptance check 13 (spec 029): rival evolution.
  rivalEvolutionSelfCheck(lines);

  return lines.join('\n');
}

// When executed directly with node (npm run harness), print the report.
// The typeof guards keep this block out of the browser build.
declare const require: { main: unknown };
declare const module: { exports: unknown };
if (
  typeof require !== 'undefined' &&
  typeof module !== 'undefined' &&
  require.main === module
) {
  console.log(runTestHarness());
}
