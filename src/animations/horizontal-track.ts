import { gsap } from '../lib/gsap';

let ctx: gsap.Context | null = null;

export function initHorizontalTrack(root: HTMLElement): void {
  ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const track = root.querySelector<HTMLElement>('#horizontal-track');
      const section = root.querySelector<HTMLElement>('#horizontal-section');

      if (track && section) {
        const scrollAmount = track.scrollWidth - window.innerWidth + 80;

        gsap.to(track, {
          x: -scrollAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${scrollAmount + 400}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      }
    });
  }, root);
}

export function cleanupHorizontalTrack(): void {
  ctx?.revert();
  ctx = null;
}
