import { gsap } from '@/lib/gsap';

let ctx: gsap.Context | null = null;

export function initScrollReveal(root: HTMLElement): void {
  ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Scroll-triggered reveals for section intros
      const sections = root.querySelectorAll<HTMLElement>('.gsap-section-reveal');
      sections.forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      });

      // Card grid staggers
      const cardGrids = root.querySelectorAll<HTMLElement>('.gsap-card-grid');
      cardGrids.forEach((grid) => {
        const cards = grid.querySelectorAll<HTMLElement>('.gsap-card-item');
        if (cards.length > 0) {
          gsap.from(cards, {
            scrollTrigger: {
              trigger: grid,
              start: 'top 75%',
            },
            y: 30,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out',
          });
        }
      });
    });
  }, root);
}

export function cleanupScrollReveal(): void {
  ctx?.revert();
  ctx = null;
}
