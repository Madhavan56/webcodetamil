import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { navigationLinks } from '@/data/site';

export const Navigation = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (location.pathname !== '/') return;

    const sections = ['home', 'services', 'work', 'about', 'process', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 }
    );

    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  if (location.pathname !== '/') {
    return null;
  }

  const handleScrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="hidden lg:fixed right-8 top-1/2 -translate-y-1/2 z-30" aria-label="Section navigation">
      <div className="bg-surface/80 backdrop-blur-xl border border-border/50 rounded-full p-2 space-y-1 shadow-card">
        {navigationLinks.map((link, index) => {
          const sectionId = link.href.replace('#', '');
          const isActive = activeSection === sectionId;

          return (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className={cn(
                'relative flex items-center gap-3 px-3 py-2 rounded-full transition-all duration-300 group',
                isActive
                  ? 'bg-primary text-background font-semibold w-auto px-4 shadow-glow-sm'
                  : 'text-textMuted hover:text-text hover:bg-surfaceHover w-10'
              )}
              style={{ transitionDelay: `${index * 30}ms` }}
              aria-current={isActive ? 'location' : undefined}
              aria-label={link.label}
            >
              <span className={cn('h-2 w-2 rounded-full transition-all flex-shrink-0', isActive ? 'bg-background scale-125' : 'bg-primary/40 group-hover:bg-primary')} />
              <span className="text-body-sm font-medium whitespace-nowrap opacity-0 lg:opacity-100">{link.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};