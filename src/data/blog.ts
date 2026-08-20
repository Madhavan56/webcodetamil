export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
  featured?: boolean;
}

export interface BlogCategory {
  id: string;
  label: string;
}

export const blogCategories: BlogCategory[] = [
  { id: 'all', label: 'All' },
  { id: 'case-studies', label: 'Case Studies' },
  { id: 'design', label: 'Design' },
  { id: 'development', label: 'Development' },
  { id: 'tutorials', label: 'Tutorials' },
] as const;

export const blogPosts: BlogPost[] = [
  {
    slug: 'building-shoe-laze',
    title: 'Building Shoe Laze: A Modern Storefront Experience',
    excerpt: 'How we engineered a fast, responsive React + TypeScript e-commerce storefront with Razorpay payment integration.',
    coverImage: '/assets/blog/shoe-laze-case-study.svg',
    date: '2026-02-10',
    readTime: '6 min read',
    tags: ['Case Studies', 'Development', 'E-commerce'],
    content: `
      <p class="body mb-6">When designing the web presence for <strong>Shoe Laze</strong>, our goal was clear: bridge the gap between physical retail browsing and a lightning-fast digital storefront without sacrificing brand aesthetics.</p>
      
      <h2 class="heading-md text-text mb-4">1. The Challenge</h2>
      <p class="body mb-6">Footwear shoppers demand high-clarity product photography, smooth category filtering (by sport, style, size), and zero friction during checkout. High bounce rates often occur when checkout flows are clumsy or payment options feel unreliable.</p>

      <h2 class="heading-md text-text mb-4">2. The Technical Stack</h2>
      <p class="body mb-6">We chose <strong>React</strong> and <strong>TypeScript</strong> for type safety and component reusability, bundled with <strong>Vite</strong> for ultra-fast asset compilation. For styling, <strong>Tailwind CSS</strong> allowed us to maintain a consistent dark-aesthetic design token system.</p>

      <h2 class="heading-md text-text mb-4">3. Razorpay Payment Integration</h2>
      <p class="body mb-6">For Indian e-commerce, offering UPI (Google Pay, PhonePe, Paytm, CRED) alongside credit/debit cards and netbanking is critical. We implemented the Razorpay gateway with immediate webhook reconciliation to handle instant order confirmation without cart abandonment.</p>

      <h2 class="heading-md text-text mb-4">4. Key Outcomes</h2>
      <ul class="list-disc list-inside body mb-6 space-y-2">
        <li>Sub-second page navigation and responsive layout across mobile, tablet, and desktop.</li>
        <li>Clean, accessible interactive product gallery with zoom previews.</li>
        <li>Zero payment failure friction on UPI and Card transactions.</li>
      </ul>
    `,
    featured: true,
  },
  {
    slug: 'high-ctr-thumbnail-design',
    title: 'Designing High-CTR YouTube Thumbnails: What Actually Works',
    excerpt: 'Key visual hierarchy principles, color contrast strategies, and typography techniques that drive genuine clicks on YouTube.',
    coverImage: '/assets/blog/thumbnail-design-guide.svg',
    date: '2026-02-01',
    readTime: '5 min read',
    tags: ['Design', 'Tutorials'],
    content: `
      <p class="body mb-6">A YouTube thumbnail has less than <strong>1.5 seconds</strong> to catch a viewer's eye in the feed. In saturated niches like Gaming, Horror, and Entertainment, subtle designs get lost.</p>

      <h2 class="heading-md text-text mb-4">1. Rule of the Single Focal Point</h2>
      <p class="body mb-6">Never crowd a thumbnail with 5 competing elements. Pick ONE central hero element — whether it is a high-contrast character expression, a mystery object, or an action scene — and support it with maximum 3-4 bold words.</p>

      <h2 class="heading-md text-text mb-4">2. Color Contrast & Complementary Lighting</h2>
      <p class="body mb-6">Use opposing color pairs (e.g. Electric Cyan vs Deep Purple, Fiery Orange vs Charcoal) to create visual depth. Adding subtle outer rim lighting separates characters from dense backgrounds.</p>

      <h2 class="heading-md text-text mb-4">3. Typography That Survives Mobile Feeds</h2>
      <p class="body mb-6">Over 70% of YouTube views originate from mobile devices. Text must be rendered in ultra-bold sans-serif fonts with black drop shadows or outline strokes so it remains readable at 120px display width.</p>
    `,
    featured: true,
  },
] as const;

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getPostsByCategory = (categoryId: string): BlogPost[] => {
  if (categoryId === 'all') return blogPosts;
  return blogPosts.filter(post => post.tags.some(tag =>
    tag.toLowerCase().replace(/\s+/g, '-') === categoryId
  ));
};

export const getFeaturedPosts = (limit = 3): BlogPost[] => {
  return blogPosts.filter(post => post.featured).slice(0, limit);
};

export const getAllTags = (): string[] => {
  const tags = new Set<string>();
  blogPosts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags).sort();
};