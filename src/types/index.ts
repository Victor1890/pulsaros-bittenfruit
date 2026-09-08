export interface SiteConfig {
  name: string;
  edition: string;
  brandTagline: string;
  description: string;
  githubUrl: string;
  releasesUrl: string;
  downloadsUrl: string;
  license: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface VideoFeature {
  title: string;
  subtitle: string;
  description: string;
  video: string;
  poster?: string;
  logo?: string;
  badge?: string;
  /** Restrict playback to a segment of the source video. `head` plays from 0 up
   *  to `offsetFromEnd` seconds before the end; `tail` loops only the final
   *  `offsetFromEnd` seconds. */
  videoRange?: { mode: 'head' | 'tail'; offsetFromEnd: number };
}

export interface CloudProvider {
  name: string;
  logo: string;
}

export interface EcosystemCard {
  name: string;
  headline: string;
  description: string;
  tag: string;
  logo: string;
}

export interface EditionCard {
  name: string;
  headline: string;
  description: string;
  badge: string;
  bootVariants: string[];
}

export interface StoryFeature {
  id: string;
  stepNumber: string;
  category: string;
  title: string;
  description: string;
  video: string;
  poster?: string;
}

export interface BentoCard {
  id: string;
  title: string;
  description: string;
  logo?: string;
}
