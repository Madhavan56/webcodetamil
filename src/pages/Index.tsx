import { lazy, Suspense } from 'react';
import { Hero } from '@/components/sections/Hero';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const Services = lazy(() => import('@/components/sections/Services').then(m => ({ default: m.Services })));
const Work = lazy(() => import('@/components/sections/Work').then(m => ({ default: m.Work })));
const About = lazy(() => import('@/components/sections/About').then(m => ({ default: m.About })));
const Process = lazy(() => import('@/components/sections/Process').then(m => ({ default: m.Process })));
const Contact = lazy(() => import('@/components/sections/Contact').then(m => ({ default: m.Contact })));
const BlogGrid = lazy(() => import('@/components/blog/BlogGrid').then(m => ({ default: m.BlogGrid })));

const SectionFallback = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="h-8 w-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

export const Index = () => {
  return (
    <>
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <Services />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Work />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Process />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Contact />
      </Suspense>

      <section id="blog" className="section bg-surface/30" aria-labelledby="blog-heading">
        <div className="container">
          <ScrollReveal delay={0} direction="up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-body-sm font-medium mb-4">
                Insights
              </span>
              <h2 id="blog-heading" className="heading-lg text-text mb-4">
                Latest <span className="text-primary">thoughts</span>
              </h2>
              <p className="body-lg text-textMuted">
                Articles, case studies, and tutorials from our studio.
              </p>
            </div>
          </ScrollReveal>

          <Suspense fallback={<SectionFallback />}>
            <BlogGrid featured limit={3} />
          </Suspense>

          <ScrollReveal delay={200} direction="up">
            <div className="text-center mt-12">
              <a href="/blog" className="btn-secondary inline-flex items-center gap-2">
                View All Articles
                <span className="hidden sm:inline">→</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};