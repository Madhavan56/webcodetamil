import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MessageSquare, Send, Loader2, CheckCircle } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { contactFormSchema, ContactFormData, projectTypeOptions } from '@/utils/validation';
import { sendContactEmail } from '@/utils/emailjs';
import { siteConfig } from '@/data/site';
import { useToast } from '@/hooks/useToast';

export const Contact = () => {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const { success: showSuccess, error: showError } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      projectType: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('submitting');
    try {
      const result = await sendContactEmail(data);
      if (result.success) {
        setSubmitStatus('success');
        showSuccess(result.message);
        reset();
      } else {
        setSubmitStatus('error');
        showError(result.message);
      }
    } catch {
      setSubmitStatus('error');
      showError('Something went wrong. Please try again.');
    } finally {
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  return (
    <section id="contact" className="section bg-background" aria-labelledby="contact-heading">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <ScrollReveal delay={0} direction="up">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-body-sm font-medium mb-4">
                Get In Touch
              </span>
              <h2 id="contact-heading" className="heading-lg text-text mb-4">
                Have a project{' '}
                <span className="text-primary">in mind?</span>
              </h2>
              <p className="body-lg text-textMuted mb-10">
                Let's turn your idea into something people can actually use.
              </p>

              <div className="space-y-6" role="list">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-surface/50 border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex-shrink-0 p-3 rounded-xl bg-primary/10 text-primary">
                    <Mail className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-body font-semibold text-text mb-1">Email Us</h3>
                    <a href={`mailto:${siteConfig.contact.email}`} className="text-body-sm text-textMuted hover:text-text transition-colors">
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-surface/50 border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex-shrink-0 p-3 rounded-xl bg-primary/10 text-primary">
                    <Phone className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-body font-semibold text-text mb-1">Call Us</h3>
                    <a href={`tel:${siteConfig.contact.phone}`} className="text-body-sm text-textMuted hover:text-text transition-colors">
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-surface/50 border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex-shrink-0 p-3 rounded-xl bg-primary/10 text-primary">
                    <MessageSquare className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-body font-semibold text-text mb-1">WhatsApp</h3>
                    <a href={siteConfig.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="text-body-sm text-textMuted hover:text-text transition-colors">
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>

              <ScrollReveal delay={200} direction="up">
                <div className="mt-10 pt-8 border-t border-border/50">
                  <h3 className="text-body font-semibold text-text mb-4">Quick Actions</h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={siteConfig.contact.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary flex-1 justify-center items-center gap-2"
                    >
                      <MessageSquare className="h-5 w-5" aria-hidden="true" />
                      WhatsApp
                    </a>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="btn-secondary flex-1 justify-center items-center gap-2"
                    >
                      <Mail className="h-5 w-5" aria-hidden="true" />
                      Email
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </ScrollReveal>
          </div>

          <div>
            <ScrollReveal delay={100} direction="up">
              <form onSubmit={handleSubmit(onSubmit)} className="bg-surface/50 border border-border/50 rounded-3xl p-6 lg:p-8" noValidate>
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <Input
                    label="Name"
                    placeholder="Your name"
                    error={errors.name?.message}
                    {...register('name')}
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    error={errors.email?.message}
                    {...register('email')}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <Input
                    label="Phone (Optional)"
                    type="tel"
                    placeholder="+91 9025614371"
                    error={errors.phone?.message}
                    {...register('phone')}
                  />
                  <Select
                    label="Project Type"
                    placeholder="Select a project type"
                    options={projectTypeOptions}
                    error={errors.projectType?.message}
                    {...register('projectType')}
                  />
                </div>

                <Textarea
                  label="Message"
                  placeholder="Tell us about your project, goals, timeline, and anything else we should know..."
                  rows={5}
                  error={errors.message?.message}
                  {...register('message')}
                />

                <AnimatePresence mode="wait">
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-6 p-4 rounded-xl bg-success/10 border border-success/30 flex items-center gap-3 text-success"
                      role="alert"
                    >
                      <CheckCircle className="h-5 w-5 flex-shrink-0" />
                      <span className="text-body-sm font-medium">Message sent successfully! We'll get back to you soon.</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  loading={submitStatus === 'submitting'}
                  disabled={submitStatus === 'submitting'}
                >
                  {submitStatus === 'submitting' ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="h-5 w-5" aria-hidden="true" />
                    </>
                  )}
                </Button>

                <p className="text-center text-body-sm text-textDim mt-4">
                  By submitting, you agree to our privacy policy. We'll never spam you.
                </p>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};