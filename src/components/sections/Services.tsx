import { services } from '@/data/services';
import { Card, CardContent } from '@/components/ui/Card';
import { ScrollReveal, StaggerContainer } from '@/components/ui/ScrollReveal';

export const Services = () => {
  return (
    <section id="services" className="section bg-background" aria-labelledby="services-heading">
      <div className="container">
        <ScrollReveal delay={0} direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-body-sm font-medium mb-4">
              What We Do
            </span>
            <h2 id="services-heading" className="heading-lg text-text mb-4">
              Services tailored for{' '}
              <span className="text-primary">modern businesses</span>
            </h2>
            <p className="body-lg text-textMuted">
              From custom websites to high-converting thumbnails — we build digital experiences that deliver results.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer staggerDelay={100} direction="vertical" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ScrollReveal key={service.id} delay={index * 100} direction="up">
              <Card variant="glass" hover padding="lg" className="group h-full flex flex-col">
                <CardContent className="flex flex-col h-full">
                  <div className="relative w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    <span className="absolute inset-0 rounded-xl border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="heading-sm text-text mb-2">{service.title}</h3>
                  <p className="body-sm text-textMuted mb-6 flex-1">{service.description}</p>
                  <ul className="space-y-2" role="list">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-body-sm text-textMuted">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary/50 flex-shrink-0" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};