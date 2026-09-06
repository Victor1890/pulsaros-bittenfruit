import { gsap, ScrollTrigger } from '../lib/gsap';

let ctx: gsap.Context | null = null;

export function initInteractiveStory(root: HTMLElement): void {
  ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const storyCards = root.querySelectorAll<HTMLElement>('.story-card');
      const activeVideo = root.querySelector<HTMLVideoElement>('#story-active-video');
      const videoLabel = root.querySelector<HTMLElement>('#story-video-label');

      const titles = [
        'Session Restore',
        'Sayri AI Assistant',
        'Spotlight Search',
        'Window Management',
      ];

      storyCards.forEach((card, index) => {
        const videoSrc = card.getAttribute('data-story-video');

        function updateVideo() {
          if (activeVideo && videoSrc && activeVideo.getAttribute('src') !== videoSrc) {
            activeVideo.style.opacity = '0';
            setTimeout(() => {
              activeVideo.src = videoSrc;
              activeVideo.play().catch(() => {});
              activeVideo.style.opacity = '1';
            }, 150);
          }
          if (videoLabel) {
            videoLabel.textContent = `Live Feature Preview: ${titles[index] || ''}`;
          }
          storyCards.forEach((c) => {
            c.classList.remove('border-[var(--color-primary)]', 'opacity-100');
            c.classList.add('border-[var(--color-neutral-100)]', 'opacity-60');
          });
          card.classList.remove('border-[var(--color-neutral-100)]', 'opacity-60');
          card.classList.add('border-[var(--color-primary)]', 'opacity-100');
        }

        card.addEventListener('click', updateVideo);

        ScrollTrigger.create({
          trigger: card,
          start: index === storyCards.length - 1 ? 'top 85%' : 'top 60%',
          end: 'bottom 40%',
          onEnter: updateVideo,
          onEnterBack: updateVideo,
        });
      });
    });
  }, root);
}

export function cleanupInteractiveStory(): void {
  ctx?.revert();
  ctx = null;
}
