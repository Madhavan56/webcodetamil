import { Link } from 'react-router-dom';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Work } from '@/components/sections/Work';
import { About } from '@/components/sections/About';
import { Process } from '@/components/sections/Process';
import { Contact } from '@/components/sections/Contact';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const Index = () => {
  return (
    <>
      <Hero />
      <Services />
      <Work />
      <About />
      <Process />
      <Contact />

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

          <BlogGrid featured limit={3} />

          <ScrollReveal delay={200} direction="up">
            <div className="text-center mt-12">
              <Link to="/blog" className="btn-secondary inline-flex items-center gap-2">
                View All Articles
                <span className="hidden sm:inline">→</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};
