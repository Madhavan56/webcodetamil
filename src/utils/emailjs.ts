import emailjs from '@emailjs/browser';
import type { ContactFormData } from './validation';

interface EmailJSConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

const getEmailJSConfig = (): EmailJSConfig => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS credentials not configured. Please check your .env file.');
  }

  return { serviceId, templateId, publicKey };
};

export const sendContactEmail = async (formData: ContactFormData): Promise<{ success: boolean; message: string }> => {
  try {
    const config = getEmailJSConfig();

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || 'Not provided',
      project_type: formData.projectType,
      message: formData.message,
      to_email: 'webcodetamil@gmail.com',
    };

    await emailjs.send(config.serviceId, config.templateId, templateParams, config.publicKey);

    return { success: true, message: 'Message sent successfully! We\'ll get back to you soon.' };
  } catch (error) {
    console.error('EmailJS Error:', error);
    return {
      success: false,
      message: 'Failed to send message. Please try again or contact us directly via WhatsApp/Email.',
    };
  }
};

export const initEmailJS = (): void => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  if (publicKey) {
    emailjs.init(publicKey);
  }
};