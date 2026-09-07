import { gsap, ScrollTrigger } from '@/lib/gsap';

let ctx: gsap.Context | null = null;

export function initInteractiveStory(root: HTMLElement): void {
  ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    const storyCards = root.querySelectorAll<HTMLElement>('.story-card');
    const cardsColumn = root.querySelector<HTMLElement>('#story-cards-column');
    const videoContainer = root.querySelector<HTMLElement>('#story-video-container');
    const activeVideo = root.querySelector<HTMLVideoElement>('#story-active-video');
    const videoLabel = root.querySelector<HTMLElement>('#story-video-label');

    if (storyCards.length === 0 || !cardsColumn || !videoContainer) return;

    const lastCard = storyCards[storyCards.length - 1];

    // 1. Sticky Pinning for Video Container (Desktop min-width: 1024px)
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      ScrollTrigger.create({
        trigger: cardsColumn,
        start: 'top 112px',
        endTrigger: lastCard,
        // Pin until the bottom of the last card reaches the bottom offset of the pinned video container
        end: () => `bottom ${videoContainer.offsetHeight + 112}px`,
        pin: videoContainer,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });
    });

    // 2. Dynamic Card Activation & Video Synchronization
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      function setActiveCard(index: number) {
        const card = storyCards[index];
        if (!card) return;

        const videoSrc = card.getAttribute('data-story-video');
        const cardTitle = card.querySelector('h3')?.textContent?.trim() || `Feature 0${index + 1}`;

        if (activeVideo && videoSrc && activeVideo.getAttribute('src') !== videoSrc) {
          activeVideo.style.opacity = '0';
          setTimeout(() => {
            activeVideo.src = videoSrc;
            activeVideo.play().catch(() => {});
            activeVideo.style.opacity = '1';
          }, 150);
        }

        if (videoLabel) {
          videoLabel.textContent = `Live Feature Preview: ${cardTitle}`;
        }

        storyCards.forEach((c, i) => {
          if (i === index) {
            c.classList.remove('border-[var(--color-neutral-100)]', 'opacity-60');
            c.classList.add('border-[var(--color-primary)]', 'opacity-100');
          } else {
            c.classList.remove('border-[var(--color-primary)]', 'opacity-100');
            c.classList.add('border-[var(--color-neutral-100)]', 'opacity-60');
          }
        });
      }

      // Guarantee initial card (Session Restore) is active on load
      setActiveCard(0);

      // Industry-standard ScrollTrigger index activation
      storyCards.forEach((card, index) => {
        card.addEventListener('click', () => setActiveCard(index));

        // For the last card, extend trigger range so it stays active while pinned next to last card
        const isLast = index === storyCards.length - 1;
        const isFirst = index === 0;

        ScrollTrigger.create({
          trigger: card,
          start: isFirst ? 'top 100%' : 'top 55%',
          end: isLast ? 'bottom top' : 'bottom 45%',
          onEnter: () => setActiveCard(index),
          onEnterBack: () => setActiveCard(index),
        });
      });
    });
  }, root);
}

export function cleanupInteractiveStory(): void {
  ctx?.revert();
  ctx = null;
}
