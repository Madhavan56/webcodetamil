import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Code, Check } from 'lucide-react';

export const About = () => {
  const values = [
    {
      title: 'Quality over quantity',
      description: 'We take on fewer projects to give each one the attention it deserves.',
    },
    {
      title: 'Honest communication',
      description: 'No jargon, no hidden costs. Clear timelines and transparent progress.',
    },
    {
      title: 'Modern stack, solid foundations',
      description: 'React, TypeScript, Tailwind — tools that scale with your business.',
    },
    {
      title: 'Performance matters',
      description: 'Fast loading, accessible, SEO-ready. Every single time.',
    },
    {
      title: 'Long-term partnership',
      description: 'We\'re here after launch — maintenance, updates, growth support.',
    },
  ];

  return (
    <section id="about" className="section bg-background" aria-labelledby="about-heading">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <ScrollReveal delay={0} direction="up">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-body-sm font-medium mb-4">
                About Us
              </span>
              <h2 id="about-heading" className="heading-lg text-text mb-6">
                Small studio.{' '}
                <span className="text-primary">Serious work.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={100} direction="up" stagger={150}>
              <div className="space-y-6 text-textMuted leading-relaxed">
                <p className="body-lg">
                  WEB CODE தமிழ் is an independent web studio focused on creating modern websites, digital experiences and creative solutions for businesses and creators.
                </p>
                <p className="body-lg">
                  From the first idea to the final launch, we focus on clean design, practical technology and experiences that are easy to use.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300} direction="up" stagger={100}>
              <ul className="grid sm:grid-cols-2 gap-4 mt-8">
                {values.map((value, index) => (
                  <motion.li
                    key={value.title}
                    className="flex items-start gap-3 p-4 rounded-xl bg-surface/50 border border-border/50 hover:border-primary/30 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 80, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    <span className="flex-shrink-0 p-2 rounded-lg bg-primary/10 text-primary">
                      <Check className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h4 className="text-body font-semibold text-text mb-1">{value.title}</h4>
                      <p className="body-sm text-textMuted">{value.description}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          <div className="relative">
            <ScrollReveal delay={200} direction="right">
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded-3xl blur-3xl" />
                <div className="relative aspect-square rounded-3xl bg-gradient-to-br from-surface to-surfaceHover border border-border/50 p-8 flex flex-col items-center justify-center">
                  <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6">
                    <Code className="h-12 w-12 text-background" aria-hidden="true" />
                  </div>
                  <h3 className="heading-md text-text text-center mb-3">What We Stand For</h3>
                  <p className="body text-textMuted text-center mb-8 max-w-xs">
                    Clean code, thoughtful design, and genuine care for every project we touch.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 text-body-sm">
                    <span className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-medium">React</span>
                    <span className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-medium">TypeScript</span>
                    <span className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-medium">Tailwind</span>
                    <span className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-medium">Vite</span>
                    <span className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-medium">Framer Motion</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400} direction="up">
              <div className="absolute -bottom-6 -right-6 lg:-bottom-10 lg:-right-10 w-64 h-64 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center justify-center">
                <span className="font-tamil text-primary text-4xl font-bold opacity-50">தமிழ்</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};