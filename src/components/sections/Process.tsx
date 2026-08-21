import { processSteps } from '@/data/process';
import { useScrollReveal } from '@/components/ui/ScrollReveal';
import { cn } from '@/utils/cn';
import { Search, Palette, Code, Rocket } from 'lucide-react';

const stepIcons: Record<string, typeof Search> = {
  search: Search,
  palette: Palette,
  code: Code,
  rocket: Rocket,
};

const ProcessStep = ({ step, index }: { step: typeof processSteps[number]; index: number }) => {
  const { ref, style } = useScrollReveal({
    delay: index * 150,
    direction: index % 2 === 0 ? 'left' : 'right',
  });

  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        'relative flex gap-8',
        index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
      )}
    >
      <div className={cn(
        'flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center border-2',
        index % 2 === 0 ? 'lg:ml-auto' : 'lg:mr-auto'
      )}>
        <div className="relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          {(() => { const Icon = stepIcons[step.icon]; return Icon ? <Icon className="h-6 w-6 text-background" aria-hidden="true" /> : null; })()}
        </div>
        <span className="absolute inset-0 rounded-2xl border-2 border-primary/30 -translate-x-1/2 -translate-y-1/2 animate-pulse opacity-30" aria-hidden="true" />
        <span className="absolute -top-2 -right-2 lg:-top-2 lg:-left-2 text-caption font-bold text-primary/50">{step.number}</span>
      </div>

      <div className={cn(
        'flex-1 max-w-md p-6 rounded-2xl bg-surface border border-border glass card-hover',
        index % 2 === 0 ? 'lg:text-right' : ''
      )}>
        <h3 className="heading-sm text-text mb-2">{step.title}</h3>
        <p className="body text-textMuted">{step.description}</p>
      </div>
    </div>
  );
};

export const Process = () => {
  const { ref: headerRef, style: headerStyle } = useScrollReveal({ delay: 0, direction: 'up' });
  const { ref: ctaRef, style: ctaStyle } = useScrollReveal({ delay: 600, direction: 'up' });

  return (
    <section id="process" className="section bg-surface/30" aria-labelledby="process-heading">
      <div className="container">
        <div ref={headerRef} style={headerStyle} className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-body-sm font-medium mb-4">
            Our Process
          </span>
          <h2 id="process-heading" className="heading-lg text-text mb-4">
            How we bring{' '}
            <span className="text-primary">ideas to life</span>
          </h2>
          <p className="body-lg text-textMuted">
            A transparent, collaborative journey from concept to launch.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 via-transparent to-primary/30 -translate-x-1/2" aria-hidden="true" />

          <div className="space-y-12 lg:space-y-16 relative">
            {processSteps.map((step, index) => (
              <ProcessStep key={step.number} step={step} index={index} />
            ))}
          </div>

          <div ref={ctaRef} style={ctaStyle} className="text-center mt-16 lg:mt-24">
            <p className="body text-textMuted mb-6">
              Ready to start your project? Let's talk about your vision.
            </p>
            <a href="#contact" className="btn-primary inline-flex items-center gap-2">
              Start a Conversation
              <Rocket className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
