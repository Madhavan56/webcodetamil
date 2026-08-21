import { useScrollReveal } from '@/components/ui/ScrollReveal';
import { Code, Check } from 'lucide-react';

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

const ValueItem = ({ value }: { value: typeof values[number] }) => {
  const { ref, style } = useScrollReveal({ direction: 'left', delay: 0 });

  return (
    <li
      ref={ref}
      style={style}
      className="flex items-start gap-3 p-4 rounded-xl bg-surface/50 border border-border/50 hover:border-primary/30 transition-colors"
    >
      <span className="flex-shrink-0 p-2 rounded-lg bg-primary/10 text-primary">
        <Check className="h-5 w-5" aria-hidden="true" />
      </span>
      <div>
        <h4 className="text-body font-semibold text-text mb-1">{value.title}</h4>
        <p className="body-sm text-textMuted">{value.description}</p>
      </div>
    </li>
  );
};

export const About = () => {
  const { ref: headingRef, style: headingStyle } = useScrollReveal({ delay: 0, direction: 'up' });
  const { ref: textRef, style: textStyle } = useScrollReveal({ delay: 100, direction: 'up' });
  const { ref: cardRef, style: cardStyle } = useScrollReveal({ delay: 200, direction: 'right' });
  const { ref: badgeRef, style: badgeStyle } = useScrollReveal({ delay: 400, direction: 'up' });

  return (
    <section id="about" className="section bg-background" aria-labelledby="about-heading">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <div ref={headingRef} style={headingStyle}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-body-sm font-medium mb-4">
                About Us
              </span>
              <h2 id="about-heading" className="heading-lg text-text mb-6">
                Small studio.{' '}
                <span className="text-primary">Serious work.</span>
              </h2>
            </div>

            <div ref={textRef} style={textStyle}>
              <div className="space-y-6 text-textMuted leading-relaxed">
                <p className="body-lg">
                  WEB CODE தமிழ் is an independent web studio focused on creating modern websites, digital experiences and creative solutions for businesses and creators.
                </p>
                <p className="body-lg">
                  From the first idea to the final launch, we focus on clean design, practical technology and experiences that are easy to use.
                </p>
              </div>
            </div>

            <ul className="grid sm:grid-cols-2 gap-4 mt-8">
              {values.map((value) => (
                <ValueItem key={value.title} value={value} />
              ))}
            </ul>
          </div>

          <div className="relative">
            <div ref={cardRef} style={cardStyle} className="relative aspect-square max-w-lg mx-auto">
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

            <div ref={badgeRef} style={badgeStyle} className="absolute -bottom-6 -right-6 lg:-bottom-10 lg:-right-10 w-64 h-64 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 flex items-center justify-center">
              <span className="font-tamil text-primary text-4xl font-bold opacity-50">தமிழ்</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
