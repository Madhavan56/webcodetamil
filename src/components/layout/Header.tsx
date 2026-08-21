import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Code } from 'lucide-react';
import { cn } from '@/utils/cn';
import { navigationLinks } from '@/data/site';
import { useMobileMenu } from '@/hooks/useMobileMenu';

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const { isOpen, close, toggle } = useMobileMenu();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    close();
  }, [location.pathname, close]);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    close();
    if (href.startsWith('#')) {
      const elementId = href.replace('#', '');
      if (location.pathname === '/') {
        // Already on home page — smooth scroll to section
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const element = document.getElementById(elementId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          });
        });
      } else {
        // On a different page (e.g. /blog) — navigate to home, then scroll
        navigate('/' + href);
      }
    }
  };

  const getTargetUrl = (href: string) => {
    if (href.startsWith('#')) {
      return location.pathname === '/' ? href : `/${href}`;
    }
    return href;
  };

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        scrolled && 'bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-card',
        hidden && '-translate-y-full'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <nav className="container" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link
            to="/"
            className="group flex items-center gap-2.5 text-text font-bold text-heading-sm font-tamil"
            aria-label="WEB CODE தமிழ் - Home"
          >
            <motion.span
              className="relative p-2 rounded-xl bg-gradient-to-br from-primary to-accent transition-transform duration-300 group-hover:scale-105"
              whileHover={{ rotate: 5 }}
            >
              <Code className="h-5 w-5 text-background" />
            </motion.span>
            <span className="tracking-tight">
              WEB CODE <span className="font-tamil text-primary group-hover:text-primary/90 transition-colors">தமிழ்</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={getTargetUrl(link.href)}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative text-body-sm font-medium text-textMuted hover:text-text transition-colors py-1 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={getTargetUrl('#contact')}
              onClick={(e) => handleNavClick(e, '#contact')}
              className="btn-secondary text-body-sm px-4 py-2"
            >
              Let's Work Together
            </a>
          </div>

          <button
            className="lg:hidden p-2.5 rounded-xl text-textMuted hover:text-text hover:bg-surface border border-transparent hover:border-border/50 transition-colors"
            onClick={toggle}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              className="lg:hidden overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-2xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="py-6 space-y-2">
                {navigationLinks.map((link) => (
                  <a
                    key={link.href}
                    href={getTargetUrl(link.href)}
                    className="block px-4 py-3 rounded-xl text-body font-medium text-textMuted hover:text-text hover:bg-surface/80 transition-colors"
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-4 border-t border-border/50 px-2">
                  <a
                    href={getTargetUrl('#contact')}
                    onClick={(e) => handleNavClick(e, '#contact')}
                    className="btn-primary w-full py-3 justify-center"
                  >
                    Let's Work Together
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};