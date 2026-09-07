import type {
  FAQItem,
  VideoFeature,
  CloudProvider,
  EcosystemCard,
  EditionCard,
  StoryFeature,
  BentoCard,
} from '../types';


export const SITE_CONFIG = {
  name: "PulsarOS Bitten Fruit",
  edition: "Bitten Fruit Edition",
  brandTagline: "Power. Precision. Pure macOS on Linux.",
  description: "PulsarOS is a Linux distribution engineered to replicate commercial operating systems. Bitten Fruit is specifically crafted to reproduce the macOS interface, animation rhythm, and user experience.",
  githubUrl: "https://github.com/Inled-Pulsar-OS",
  releasesUrl: "https://github.com/Inled-Pulsar-OS/ISO/releases/latest",
  license: "GPL-3.0",
} as const;

export const FAQS: FAQItem[] = [
  {
    question: "What is PulsarOS Bitten Fruit?",
    answer: "PulsarOS is a Linux distribution designed to replicate commercial operating system interfaces. Bitten Fruit is the edition built specifically to reproduce the exact macOS visual design, animations, menu bar, dock, and workflow experience on Linux.",
  },
  {
    question: "Is PulsarOS free and open source?",
    answer: "Yes. PulsarOS is 100% free and open source under the GPL-3.0 license. Download the ISO, test it live, or install it without restriction.",
  },
  {
    question: "Can I run macOS, Windows, and Android applications?",
    answer: "Yes. PulsarOS Bitten Fruit includes MacBoat (OpenCore macOS integration), WinBoat (native Windows app virtualization), DroidTux (Android app integration), and GSConnect (universal device sync).",
  },
  {
    question: "Can I access the Arch User Repository (AUR)?",
    answer: "Yes. On the Arch Edition of PulsarOS Bitten Fruit, you have full access to pacman, the AUR, Flathub, and native package managers.",
  },
];

export const CLOUD_PROVIDERS: CloudProvider[] = [
  { name: "iCloud", logo: "/logos/providers/icloud.svg" },
  { name: "Google Drive", logo: "/logos/providers/googledrive.svg" },
  { name: "Dropbox", logo: "/logos/providers/dropbox.svg" },
  { name: "OneDrive", logo: "/logos/providers/onedrive.svg" },
  { name: "Nextcloud", logo: "/logos/providers/nextcloud.svg" },
  { name: "Proton Drive", logo: "/logos/providers/proton.svg" },
  { name: "Box", logo: "/logos/providers/box.svg" },
  { name: "Mega", logo: "/logos/providers/mega.svg" },
];

export const INTELLIGENCE_FEATURES: VideoFeature[] = [
  {
    title: "Session Restore",
    subtitle: "Continuity",
    description: "Reboot or power on, and every app, window, and document reopens on its own. Pick up right where you left off.",
    video: "/videos/session-restore.mp4",
    poster: "/assets/desktop.png",
    badge: "Continuity",
  },
  {
    title: "Sayri AI Assistant",
    subtitle: "Privacy First",
    description: "An intelligent assistant that runs local models of your choice. Completely private, fast, and secure on your hardware.",
    video: "/videos/sayri.mp4",
    poster: "/assets/spotlight.png",
    logo: "/logos/sayri.png",
    badge: "Local AI",
  },
];

export const STORY_FEATURES: StoryFeature[] = [
  {
    id: "session-restore",
    stepNumber: "01",
    category: "Continuity",
    title: "Session Restore",
    description: "Reboot or power on, and every application, window arrangement, and open document reopens instantly where you left off.",
    video: "/videos/session-restore.mp4",
    poster: "/assets/desktop.png",
  },
  {
    id: "sayri-ai",
    stepNumber: "02",
    category: "Private Intelligence",
    title: "Sayri AI Assistant",
    description: "An intelligent assistant powered by local LLMs running straight on your GPU. 100% private, no telemetry, no cloud lock-in.",
    video: "/videos/sayri.mp4",
    poster: "/assets/spotlight.png",
  },
  {
    id: "spotlight-search",
    stepNumber: "03",
    category: "Search & Action",
    title: "Spotlight Search",
    description: "Command center for your machine. Search files, launch applications, calculate math, check clipboard history, or trigger system scripts.",
    video: "/videos/spotlight.mp4",
    poster: "/assets/spotlight.png",
  },
  {
    id: "window-management",
    stepNumber: "04",
    category: "Workspaces",
    title: "Window Management",
    description: "Split view, Mission Control gestures, full screen on dynamic workspaces, and fluid window snapping built for power users.",
    video: "/videos/window-mode.mp4",
    poster: "/assets/desktop.png",
  },
];

export const BENTO_CARDS: BentoCard[] = [
  {
    id: "macboat",
    stepNumber: "01",
    category: "macOS Virtualization",
    title: "MacBoat Integration",
    description: "Run macOS in preconfigured OpenCore Virtual Machines directly using official Apple recovery servers with native GPU passthrough performance.",
    logo: "/logos/macboat.png",
    previewType: "image",
    previewSrc: "/assets/boot.png",
    previewAlt: "MacBoat OpenCore Boot Preview",
    tags: ["OpenCore Ready", "Native KVM"],
    layout: "full",
  },
  {
    id: "winboat",
    stepNumber: "02",
    category: "Windows Apps",
    title: "WinBoat Virtualizer",
    description: "Execute Windows software as native desktop windows with zero configuration or Wine headache.",
    logo: "/logos/winboat.svg",
    previewType: "window-preview",
    previewSrc: "/assets/wizard.png",
    previewAlt: "WinBoat Setup Preview",
    containerLabel: "WinBoat App Container",
    layout: "half",
  },
  {
    id: "droidtux",
    stepNumber: "03",
    category: "Android Ecosystem",
    title: "DroidTux Mobile Suite",
    description: "Run mobile Android apps side-by-side with full mouse, trackpad, and keyboard shortcuts.",
    logo: "/logos/droidtux.png",
    previewType: "window-preview",
    previewSrc: "/assets/quick-setting.png",
    previewAlt: "DroidTux Mobile Preview",
    containerLabel: "DroidTux Mobile Runtime",
    layout: "half",
  },
  {
    id: "input-visuals",
    stepNumber: "04",
    category: "Input & Visuals",
    title: "Dynamic Wallpapers & Key Remap",
    description: "Live moving wallpapers on lockscreen and desktop paired with native macOS command key bindings out of the box.",
    previewType: "video",
    previewSrc: "/videos/remap-live-wallpaper.mp4",
    tags: ["Cmd + C / Cmd + V Remapped", "60 FPS Motion"],
    layout: "dark-full",
  },
];

export const VIDEO_SHOWCASES: VideoFeature[] = [
  {
    title: "Spotlight Search",
    subtitle: "Command center for your system.",
    description: "Instantly launch applications, search documents, inspect clipboard history, or uninstall software from one search bar.",
    video: "/videos/spotlight.mp4",
    poster: "/assets/spotlight.png",
  },
  {
    title: "Window Management",
    subtitle: "Full macOS windowing experience.",
    description: "Split view, Mission Control, full screen on new workspaces, and seamless desktop space management.",
    video: "/videos/window-mode.mp4",
    poster: "/assets/desktop.png",
  },
  {
    title: "App Store",
    subtitle: "Thousands of apps, zero commands.",
    description: "Browse and install applications from Flathub, AUR, pacman, and apt with a unified store interface.",
    video: "/videos/app-store.mp4",
    poster: "/assets/finder.png",
  },
  {
    title: "Dynamic Live Wallpapers",
    subtitle: "Wallpapers that move with time.",
    description: "Animated wallpapers on your desktop and lock screen with macOS keyboard remapping built-in.",
    video: "/videos/remap-live-wallpaper.mp4",
    poster: "/assets/quick-setting.png",
  },
];

export const ECOSYSTEM: EcosystemCard[] = [
  {
    name: "MacBoat",
    headline: "Run macOS in OpenCore VMs",
    description: "Seamless integration using official Apple recovery servers. OpenCore preconfigured out of the box.",
    tag: "macOS Integration",
    logo: "/logos/macboat.png",
  },
  {
    name: "WinBoat",
    headline: "Windows software natively",
    description: "Execute Windows apps as native desktop windows with zero Wine setup or configuration hassle.",
    tag: "Windows Apps",
    logo: "/logos/winboat.svg",
  },
  {
    name: "DroidTux",
    headline: "Android apps on desktop",
    description: "Run mobile Android applications side-by-side with full keyboard, trackpad, and touch support.",
    tag: "Android Apps",
    logo: "/logos/droidtux.png",
  },
  {
    name: "GSConnect",
    headline: "Universal device sync",
    description: "Instant notification sync, shared clipboard, SMS integration, and trackpad remote between your phone and PC.",
    tag: "iOS & Android",
    logo: "/logos/gsconnect.png",
  },
];

export const EDITIONS: EditionCard[] = [
  {
    name: "Debian Edition",
    headline: "Rock-solid stability",
    description: "Built on Debian Stable for maximum reliability, enterprise-grade uptime, and low memory usage. Ships with GRUB and rEFInd.",
    badge: "Stable Core",
    highlights: ["Debian Stable base", "Ultra-low memory footprint", "GRUB & rEFInd bootloaders", "Long-term reliability"],
  },
  {
    name: "Arch Edition",
    headline: "Bleeding-edge performance",
    description: "Always updated with the newest Linux kernel, latest GPU drivers, rolling package updates, and complete access to the AUR.",
    badge: "Rolling Core",
    highlights: ["Arch Linux rolling core", "Latest Linux Kernel", "Full AUR access", "Pacman package manager"],
  },
];
