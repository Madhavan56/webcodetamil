export interface ProjectImage {
  src: string;
  alt: string;
  category?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  images: string[] | ProjectImage[];
  category: 'Website' | 'Design';
  link?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'shoe-laze',
    title: 'Shoe Laze',
    description: "A modern business website designed to showcase products, collections and the brand's physical store online.",
    technologies: ['React', 'TypeScript', 'Responsive Design', 'Razorpay'],
    images: [
      { src: '/assets/projects/shoe-laze/hero.svg', alt: 'Shoe Laze - Official Storefront Hero & Drop Showcase' },
      { src: '/assets/projects/shoe-laze/gallery.svg', alt: 'Shoe Laze - Footwear Catalog & Filter Experience' },
      { src: '/assets/projects/shoe-laze/checkout.svg', alt: 'Shoe Laze - Razorpay Secure Checkout Integration' },
    ],
    category: 'Website',
    link: '#',
    featured: true,
  },
  {
    id: 'thumbnails',
    title: 'YouTube Thumbnail Design',
    description: 'High-converting thumbnail designs across gaming, horror, challenge, and entertainment categories.',
    technologies: ['Photoshop', 'Figma', 'Visual Strategy'],
    images: [
      { src: '/assets/projects/thumbnails/gaming-1.svg', alt: 'Gaming Thumbnail - Rank #1 Radiant Valorant', category: 'Gaming' },
      { src: '/assets/projects/thumbnails/gaming-2.svg', alt: 'Gaming Thumbnail - Mythic Secret Item Unlock', category: 'Gaming' },
      { src: '/assets/projects/thumbnails/horror-1.svg', alt: 'Horror Thumbnail - 3:00 AM Abandoned Asylum', category: 'Horror' },
      { src: '/assets/projects/thumbnails/horror-2.svg', alt: 'Horror Thumbnail - The Cursed House Paranormal', category: 'Horror' },
      { src: '/assets/projects/thumbnails/challenge-1.svg', alt: 'Challenge Thumbnail - ₹100 vs ₹1,00,000 Survival', category: 'Challenge' },
      { src: '/assets/projects/thumbnails/challenge-2.svg', alt: 'Challenge Thumbnail - 100 Lost Mystery Boxes', category: 'Challenge' },
      { src: '/assets/projects/thumbnails/entertainment-1.svg', alt: 'Entertainment Thumbnail - Cinema Talks Blockbuster Review', category: 'Entertainment' },
      { src: '/assets/projects/thumbnails/entertainment-2.svg', alt: 'Entertainment Thumbnail - Exclusive Podcast Interview', category: 'Entertainment' },
    ],
    category: 'Design',
    featured: true,
  },
] as const;

export const getThumbnailImages = (): ProjectImage[] => {
  const thumbnailProject = projects.find(p => p.id === 'thumbnails');
  if (!thumbnailProject) return [];
  return thumbnailProject.images as ProjectImage[];
};

export const getThumbnailCategories = (): string[] => {
  const images = getThumbnailImages();
  const categories = new Set(images.map(img => img.category).filter(Boolean) as string[]);
  return ['All', ...Array.from(categories)];
};