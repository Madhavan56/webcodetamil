import type React from 'react';
import { Code, Layout, ShoppingCart, CreditCard, Palette, Image } from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
}

export const services: Service[] = [
  {
    id: 'web-dev',
    title: 'Website Development',
    description: 'Custom websites built with modern frameworks — fast, secure, and scalable.',
    icon: Code,
    features: ['React / Next.js', 'TypeScript', 'Performance optimized', 'SEO ready'],
  },
  {
    id: 'responsive',
    title: 'Responsive Web Design',
    description: 'Fluid layouts that work beautifully on any device — mobile, tablet, or desktop.',
    icon: Layout,
    features: ['Mobile-first approach', 'Cross-browser tested', 'Touch-friendly', 'Accessible'],
  },
  {
    id: 'ecommerce',
    title: 'E-commerce Websites',
    description: 'Complete online stores with cart, checkout, inventory, and order management.',
    icon: ShoppingCart,
    features: ['Product catalog', 'Secure checkout', 'Inventory management', 'Order tracking'],
  },
  {
    id: 'payments',
    title: 'Payment Gateway Integration',
    description: 'Secure payment integration with Razorpay, Stripe, and other providers.',
    icon: CreditCard,
    features: ['Razorpay / Stripe', 'UPI / Cards / Netbanking', 'Webhook handling', 'Refund support'],
  },
  {
    id: 'uiux',
    title: 'UI/UX Design',
    description: 'User-centered design from wireframes to high-fidelity prototypes.',
    icon: Palette,
    features: ['User research', 'Wireframing', 'Prototyping', 'Design systems'],
  },
  {
    id: 'thumbnails',
    title: 'YouTube Thumbnail Design',
    description: 'High-CTR thumbnails for gaming, horror, challenge, and entertainment channels.',
    icon: Image,
    features: ['Custom illustrations', 'A/B test ready', 'Brand consistency', 'Fast turnaround'],
  },
] as const;