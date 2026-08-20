import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, getThumbnailImages, getThumbnailCategories, type ProjectImage } from '@/data/projects';
import { Lightbox } from '@/components/ui/Lightbox';
import { ScrollReveal, StaggerContainer } from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import { ExternalLink, Image as ImageIcon, Grid, ArrowRight } from 'lucide-react';

export const Work = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxImages, setLightboxImages] = useState<{ src: string; alt: string }[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const thumbnailImages = useMemo(() => getThumbnailImages(), []);
  const categories = useMemo(() => getThumbnailCategories(), []);

  const filteredThumbnails = activeCategory === 'All'
    ? thumbnailImages
    : thumbnailImages.filter(img => img.category === activeCategory);

  const handleThumbnailClick = (index: number) => {
    const images = filteredThumbnails.map(img => ({ src: img.src, alt: img.alt }));
    setLightboxImages(images);
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const handleProjectImageClick = (projectImages: (string | ProjectImage)[], index: number, defaultAlt: string) => {
    const images = projectImages.map(img =>
      typeof img === 'string' ? { src: img, alt: defaultAlt } : { src: img.src, alt: img.alt }
    );
    setLightboxImages(images);
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const getFirstImageSrc = (images: (string | ProjectImage)[]): string => {
    if (!images || images.length === 0) return '';
    const first = images[0];
    return typeof first === 'string' ? first : first.src;
  };

  return (
    <section id="work" className="section bg-surface/30" aria-labelledby="work-heading">
      <div className="container">
        <ScrollReveal delay={0} direction="up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-body-sm font-medium mb-4">
              Our Work
            </span>
            <h2 id="work-heading" className="heading-lg text-text mb-4">
              Projects that{' '}
              <span className="text-primary">speak for themselves</span>
            </h2>
            <p className="body-lg text-textMuted">
              Real projects, real results. No fake metrics — just quality work delivered.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-20">
          {projects.map((project, projectIndex) => (
            <ScrollReveal key={project.id} delay={projectIndex * 150} direction="up">
              {project.id === 'shoe-laze' ? (
                /* ─── Shoe Laze Featured Project ─── */
                <article
                  className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center bg-surface/60 border border-border/60 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-xl shadow-card"
                >
                  <div className="lg:col-span-5 space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-body-sm font-semibold">
                        {project.category}
                      </span>
                      {project.featured && (
                        <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-body-sm font-semibold">
                          Client Project
                        </span>
                      )}
                    </div>
                    <h3 className="heading-md text-text text-2xl sm:text-3xl font-bold">{project.title}</h3>
                    <p className="body-lg text-textMuted leading-relaxed">{project.description}</p>

                    <div className="flex flex-wrap gap-2 pt-2" role="list" aria-label="Technologies used">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-lg bg-surface border border-border text-body-sm font-medium text-textMuted">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-4">
                      {project.link && project.link !== '#' && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary inline-flex items-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4" aria-hidden="true" />
                          View Project
                        </a>
                      )}
                      <Button
                        variant="secondary"
                        onClick={() => handleProjectImageClick(project.images, 0, project.title)}
                        className="inline-flex items-center gap-2"
                      >
                        <ImageIcon className="h-4 w-4 text-primary" aria-hidden="true" />
                        View Screenshots ({project.images.length})
                      </Button>
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <div
                      className="aspect-[16/10] rounded-2xl overflow-hidden bg-surface border border-border/80 relative group shadow-card cursor-pointer"
                      onClick={() => handleProjectImageClick(project.images, 0, project.title)}
                    >
                      <img
                        src={getFirstImageSrc(project.images)}
                        alt={`${project.title} - Storefront preview`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/60 backdrop-blur-xs">
                        <div className="p-3.5 rounded-full bg-primary text-background shadow-glow">
                          <ImageIcon className="h-6 w-6" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ) : (
                /* ─── Thumbnail Design Portfolio ─── */
                <article className="bg-surface/60 border border-border/60 rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-xl shadow-card space-y-8">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-body-sm font-semibold">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-body-sm font-semibold">
                        Design Portfolio
                      </span>
                    )}
                  </div>

                  <div className="grid lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-4 space-y-6">
                      <h3 className="heading-md text-text text-2xl sm:text-3xl font-bold">{project.title}</h3>
                      <p className="body-lg text-textMuted leading-relaxed">{project.description}</p>

                      <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="px-3 py-1.5 rounded-lg bg-surface border border-border text-body-sm font-medium text-textMuted">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="pt-2">
                        <Button
                          variant="secondary"
                          onClick={() => handleThumbnailClick(0)}
                          className="w-full inline-flex items-center justify-center gap-2"
                        >
                          <Grid className="h-4 w-4 text-primary" aria-hidden="true" />
                          Browse Full Lightbox Gallery
                        </Button>
                      </div>

                      {categories.length > 1 && (
                        <div className="pt-4 border-t border-border/50">
                          <label className="block text-body-sm font-medium text-textDim mb-3">Filter by Niche:</label>
                          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Thumbnail categories">
                            {categories.map((category) => (
                              <button
                                key={category}
                                role="tab"
                                aria-selected={activeCategory === category}
                                id={`tab-${category.toLowerCase()}`}
                                onClick={() => setActiveCategory(category)}
                                className={cn(
                                  'px-3.5 py-1.5 rounded-lg text-body-sm font-medium transition-all duration-200',
                                  activeCategory === category
                                    ? 'bg-primary text-background font-semibold shadow-glow-sm'
                                    : 'bg-surface border border-border text-textMuted hover:text-text hover:border-primary/50'
                                )}
                              >
                                {category}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="lg:col-span-8">
                      <StaggerContainer staggerDelay={60} direction="vertical" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {filteredThumbnails.map((image) => (
                          <motion.div
                            key={image.src}
                            className="group relative aspect-[16/9] rounded-xl overflow-hidden bg-surface border border-border/80 cursor-pointer shadow-card"
                            whileHover={{ y: -3 }}
                            onClick={() => handleThumbnailClick(
                              filteredThumbnails.findIndex(img => img.src === image.src)
                            )}
                          >
                            <img
                              src={image.src}
                              alt={image.alt}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                              <span className="text-body-sm font-semibold text-text">
                                {image.category}
                              </span>
                              <span className="text-caption px-2 py-1 rounded bg-primary/20 text-primary border border-primary/30 font-medium">
                                Click to Expand 🔍
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </StaggerContainer>
                    </div>
                  </div>
                </article>
              )}
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={200} direction="up">
          <div className="text-center mt-16 p-8 rounded-3xl bg-surface/40 border border-border/50 max-w-2xl mx-auto">
            <h3 className="heading-sm text-text mb-2">Have a project in mind?</h3>
            <p className="body text-textMuted mb-6">
              Let's build something clean, fast, and memorable together.
            </p>
            <a href="#contact" className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 shadow-glow">
              Start a Conversation
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </ScrollReveal>
      </div>

      <AnimatePresence>
        {isLightboxOpen && (
          <Lightbox
            isOpen={isLightboxOpen}
            onClose={() => setIsLightboxOpen(false)}
            images={lightboxImages}
            initialIndex={lightboxIndex}
            onIndexChange={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
