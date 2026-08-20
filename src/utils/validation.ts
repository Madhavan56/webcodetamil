import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional().refine(val => !val || /^[\d\s\-\+\(\)]{10,}$/.test(val), {
    message: 'Please enter a valid phone number',
  }),
  projectType: z.string().min(1, 'Please select a project type'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message is too long'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const projectTypeOptions = [
  { value: 'website', label: 'Website Development' },
  { value: 'ecommerce', label: 'E-commerce Website' },
  { value: 'uiux', label: 'UI/UX Design' },
  { value: 'thumbnails', label: 'YouTube Thumbnails' },
  { value: 'maintenance', label: 'Maintenance & Updates' },
  { value: 'other', label: 'Other' },
] as const;