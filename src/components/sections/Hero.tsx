import { motion } from 'framer-motion';
import { ArrowRight, MousePointerClick } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { CodeBackground } from '@/components/background/CodeBackground';

export const Hero = () => {
  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-20 lg:pt-24">
      <CodeBackground />

      <div className="container relative z-10 py-12 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-body-sm font-medium mb-6 backdrop-blur"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <span className="relative flex h-2 w-2">
                <motion.span
                  className="absolute inset-0 rounded-full bg-primary animate-pulse"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="relative h-2 w-2 rounded-full bg-primary" />
              </span>
              Independent Creative Web Studio
            </motion.div>

            <motion.h1
              className="heading-xl text-text mb-6 font-tamil tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
              WEB CODE{' '}
              <span className="relative inline-block">
                <span className="text-primary bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  தமிழ்
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                />
              </span>
            </motion.h1>

            <motion.h2
              className="heading-lg text-text mb-6 max-w-3xl mx-auto font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {siteConfig.tagline}
            </motion.h2>

            <motion.p
              className="body-lg text-textMuted mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {siteConfig.description}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <a
                href="#work"
                onClick={(e) => handleScrollTo(e, 'work')}
                className="btn-primary w-full sm:w-auto text-body font-semibold px-8 py-3.5 shadow-glow"
              >
                View Our Work
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, 'contact')}
                className="btn-secondary w-full sm:w-auto text-body font-semibold px-8 py-3.5"
              >
                Start a Project
              </a>
            </motion.div>

            <motion.div
              className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-body-sm text-textDim"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <motion.span
                    className="absolute inset-0 rounded-full bg-primary animate-pulse"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  />
                  <span className="relative h-2 w-2 rounded-full bg-primary" />
                </span>
                Available for new projects
              </span>
              <span className="hidden sm:inline-flex items-center gap-2">
                <MousePointerClick className="h-4 w-4" aria-hidden="true" />
                Scroll to explore
              </span>
            </motion.div>
          </motion.div>

        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <a
            href="#services"
            onClick={(e) => handleScrollTo(e, 'services')}
            aria-label="Scroll down to services"
            className="text-primary/50 hover:text-primary transition-colors block"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
