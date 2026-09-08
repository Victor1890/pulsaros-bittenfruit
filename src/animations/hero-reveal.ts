import { gsap } from '@/lib/gsap';

let ctx: gsap.Context | null = null;

export function initHeroReveal(root: HTMLElement): void {
  ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // 1. Entrance timeline
      const heroTl = gsap.timeline({ delay: 0.1 });

      heroTl
        .from('.gsap-reveal-hero', {
          y: 40,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power2.out',
        });

      // 2. Display Frame Scroll Pin & Zoom to fullscreen
      const trigger = root.querySelector('#hero-trigger');
      const display = root.querySelector<HTMLElement>('#display-container');
      if (trigger && display) {
        let coverScale = 1.5;
        let centerY = 0;

        const calcCover = () => {
          const r = display.getBoundingClientRect();
          coverScale = Math.max(window.innerWidth / r.width, window.innerHeight / r.height);
          // Distance from the display's center to the viewport center, so we
          // can center it as it scales up.
          centerY = window.innerHeight / 2 - (r.top + r.height / 2);
        };
        calcCover();

        const pinTl = gsap.timeline({
          scrollTrigger: {
            trigger: '#hero-trigger',
            start: 'top top',
            end: '+=1900',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefresh: calcCover,
          },
        });

        pinTl
          .to('#hero-text', {
            autoAlpha: 0,
            y: -80,
            scale: 0.94,
            duration: 0.25,
            ease: 'power1.in',
          }, 0)
          .to('#display-stand', {
            autoAlpha: 0,
            height: 0,
            duration: 0.2,
            ease: 'power1.in',
          }, 0)
          .to('#display-container', {
            scale: coverScale,
            y: centerY,
            transformOrigin: 'center center',
            duration: 0.55,
            ease: 'power1.inOut',
          }, 0)
          // Hold the centered fullscreen video for a beat before releasing,
          // so the next section doesn't steal the view too early.
          .to({}, { duration: 0.85 });
      }
    });
  }, root);
}

export function cleanupHeroReveal(): void {
  ctx?.revert();
  ctx = null;
}
