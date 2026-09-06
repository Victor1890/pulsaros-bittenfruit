import { gsap } from '../lib/gsap';

let ctx: gsap.Context | null = null;

export function initHeroReveal(root: HTMLElement): void {
  ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Hero entrance reveal
      const heroTl = gsap.timeline({ delay: 0.1 });

      heroTl
        .from('.gsap-hero-title', {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        })
        .from(
          '.gsap-hero-subhead',
          {
            y: 24,
            opacity: 0,
            duration: 0.7,
            ease: 'power2.out',
          },
          '-=0.5'
        )
        .from(
          '.gsap-hero-cta',
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.4'
        )
        .from(
          '.gsap-hero-visual',
          {
            y: 40,
            opacity: 0,
            scale: 0.96,
            duration: 0.9,
            ease: 'power3.out',
          },
          '-=0.4'
        );
    });
  }, root);
}

export function cleanupHeroReveal(): void {
  ctx?.revert();
  ctx = null;
}
