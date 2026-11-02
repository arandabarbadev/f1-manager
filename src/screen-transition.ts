// ============================================================
// SCREEN TRANSITION (Phase 7): ONE reusable wrapper for every
// screen swap (login, team, race, season) — quick fade out of the
// current screen, fade in of the next one. Same animation for all.
// ============================================================

// Spec 027: with the system's reduced-motion preference the swap is
// instant — no transition classes at all (and no animationend to wait
// for). Read at swap time so a live preference change is honored.
const prefersReducedMotion = (): boolean =>
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function swapScreen(container: HTMLElement, build: () => void): void {
  const current = container.firstElementChild as HTMLElement | null;

  if (prefersReducedMotion()) {
    build(); // instant: fade in/out is decorative
    return;
  }

  const run = (): void => {
    build();
    const next = container.firstElementChild as HTMLElement | null;
    if (next) {
      next.classList.add('screen-enter');
      next.addEventListener(
        'animationend',
        () => next.classList.remove('screen-enter'),
        { once: true }
      );
    }
  };

  if (current) {
    current.classList.add('screen-leave');
    window.setTimeout(run, 150);
  } else {
    run();
  }
}
