// ============================================================
// LIVERY (spec 033 R5): the player team's color is DATA, not
// chrome. applyTeamLivery writes --livery over :root for the few
// legitimate data consumers (the livery chip, the team dots, the
// pace-chart lines via the --livery-line mix, which pulls the
// color toward the theme ink so a near-black livery can never hide
// a chart line). No interface element ever reads the livery: the
// action color is the fixed volt (DESIGN.md, Ley del Volt).
// Called at boot (main.ts), when the team screen mounts (covers
// slot switching) and live when the color input changes.
// ============================================================

export function applyTeamLivery(color?: string): void {
  const root = document.documentElement;
  if (!color || !/^#[0-9a-fA-F]{6}$/.test(color)) {
    root.style.removeProperty('--livery');
    return;
  }
  root.style.setProperty('--livery', color.toLowerCase());
}
