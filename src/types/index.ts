export interface SiteConfig {
  name: string;
  edition: string;
  brandTagline: string;
  description: string;
  githubUrl: string;
  releasesUrl: string;
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
  highlights: string[];
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
  stepNumber: string;
  category: string;
  title: string;
  description: string;
  logo?: string;
  previewType: 'image' | 'window-preview' | 'video';
  previewSrc: string;
  previewAlt?: string;
  containerLabel?: string;
  tags?: string[];
  layout: 'full' | 'half' | 'dark-full';
}
