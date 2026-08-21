import type { ContactFormData } from './validation';

interface Web3FormsResponse {
  success: boolean;
  message: string;
}

export const sendContactEmail = async (formData: ContactFormData): Promise<Web3FormsResponse> => {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    return {
      success: false,
      message: 'Contact form not configured. Please try WhatsApp or email us directly.',
    };
  }

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'Not provided',
        project_type: formData.projectType,
        message: formData.message,
        subject: `New contact from ${formData.name} — ${formData.projectType}`,
        from_name: 'WEB CODE தமிழ் Website',
        to: 'webcodetamil@gmail.com',
      }),
    });

    const result = await response.json();

    if (result.success) {
      return { success: true, message: 'Message sent successfully! We\'ll get back to you soon.' };
    } else {
      console.error('Web3Forms Error:', result);
      return { success: false, message: result.message || 'Failed to send message. Please try again.' };
    }
  } catch (error) {
    console.error('Web3Forms Error:', error);
    return {
      success: false,
      message: 'Failed to send message. Please try again or contact us directly via WhatsApp/Email.',
    };
  }
};
