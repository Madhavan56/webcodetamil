export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
  };
  social: {
    twitter: string;
    linkedin: string;
    github: string;
    instagram: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    ogImage: string;
    twitterHandle: string;
  };
}

export const siteConfig: SiteConfig = {
  name: 'WEB CODE தமிழ்',
  tagline: 'Websites that make businesses stand out.',
  description: 'We design and build modern websites, digital experiences and creative solutions for businesses and creators.',
  contact: {
    email: 'webcodetamil@gmail.com',
    phone: '+91 9025614371',
    whatsapp: 'https://wa.me/919025614371',
  },
  social: {
    twitter: 'https://twitter.com/webcodetamil',
    linkedin: 'https://linkedin.com/company/webcodetamil',
    github: 'https://github.com/webcodetamil',
    instagram: 'https://instagram.com/webcodetamil',
  },
  seo: {
    defaultTitle: 'WEB CODE தமிழ் — Web Design & Development Studio',
    defaultDescription: 'WEB CODE தமிழ் creates modern websites, e-commerce experiences and digital solutions for businesses and creators.',
    ogImage: '/og-image.svg',
    twitterHandle: '@webcodetamil',
  },
} as const;

export const navigationLinks = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#process', label: 'Process' },
  { href: '/blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
] as const;