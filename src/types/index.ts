export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface TimelineEntry {
  id: string;
  role: string;
  company: string;
  period: string;
  isCurrent: boolean;
  bullets: string[];
  icon?: string;
}

export interface EngagementCard {
  id: string;
  client: string;
  headline: string;
  body: string;
  tags: string[];
  /** Optional span for wide bento cards: 1 | 2 */
  span?: 1 | 2;
  metrics?: Array<{ value: string; label: string }>;
  icon?: any;
}

export interface CertCard {
  id: string;
  icon: string;
  iconColor: string;
  label: string;
  value: string;
  span?: 1 | 2;
  tags?: string[];
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  meta: string;
}

export interface ReelCard {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  link: string;
}

export interface SkillChip {
  id: string;
  label: string;
  isPulsing?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  highPriority: boolean;
}

export interface ContactFormStatus {
  state: 'idle' | 'submitting' | 'success' | 'error';
  message?: string;
}

export interface AboutBadge {
  id: string;
  icon: string;
  label: string;
}
