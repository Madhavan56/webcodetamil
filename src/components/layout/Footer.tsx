import { Code, MessageSquare, Mail, Phone } from 'lucide-react';
import { cn } from '@/utils/cn';
import { siteConfig, navigationLinks } from '@/data/site';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-surface/50 backdrop-blur" role="contentinfo">
      <div className="container py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="lg:col-span-1">
            <a href="/#home" className="flex items-center gap-2 text-text font-bold text-heading-sm font-tamil mb-4" aria-label="WEB CODE தமிழ் - Home">
              <span className="relative p-1.5 rounded-lg bg-gradient-to-br from-primary to-accent">
                <Code className="h-5 w-5 text-background" />
              </span>
              <span>WEB CODE <span className="font-tamil text-primary">தமிழ்</span></span>
            </a>
            <p className="text-body-sm text-textMuted mb-6 max-w-xs leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Twitter"
                className={cn('p-2 rounded-lg bg-surface border border-border text-textMuted hover:text-primary hover:border-primary/50 transition-all')}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on LinkedIn"
                className={cn('p-2 rounded-lg bg-surface border border-border text-textMuted hover:text-primary hover:border-primary/50 transition-all')}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on GitHub"
                className={cn('p-2 rounded-lg bg-surface border border-border text-textMuted hover:text-primary hover:border-primary/50 transition-all')}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className={cn('p-2 rounded-lg bg-surface border border-border text-textMuted hover:text-primary hover:border-primary/50 transition-all')}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="text-heading-sm font-semibold text-text mb-4">Navigation</h3>
            <ul className="space-y-3">
              {navigationLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const id = link.href.replace('#', '');
                      const element = document.getElementById(id);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-body-sm text-textMuted hover:text-text transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-heading-sm font-semibold text-text mb-4">Services</h3>
            <ul className="space-y-3">
              <li><a href="#services" className="text-body-sm text-textMuted hover:text-text transition-colors">Website Development</a></li>
              <li><a href="#services" className="text-body-sm text-textMuted hover:text-text transition-colors">Responsive Web Design</a></li>
              <li><a href="#services" className="text-body-sm text-textMuted hover:text-text transition-colors">E-commerce Websites</a></li>
              <li><a href="#services" className="text-body-sm text-textMuted hover:text-text transition-colors">Payment Gateway Integration</a></li>
              <li><a href="#services" className="text-body-sm text-textMuted hover:text-text transition-colors">UI/UX Design</a></li>
              <li><a href="#services" className="text-body-sm text-textMuted hover:text-text transition-colors">YouTube Thumbnail Design</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-heading-sm font-semibold text-text mb-4">Direct Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-body-sm text-textMuted">
                <Mail className="h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-text transition-colors">{siteConfig.contact.email}</a>
              </li>
              <li className="flex items-center gap-3 text-body-sm text-textMuted">
                <Phone className="h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-text transition-colors">{siteConfig.contact.phone}</a>
              </li>
              <li className="flex items-center gap-3 text-body-sm text-textMuted">
                <MessageSquare className="h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
                <a href={siteConfig.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-text transition-colors">WhatsApp Chat</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-body-sm text-textDim">
            © {currentYear} WEB CODE தமிழ். All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-body-sm text-textDim">
            <span>Small studio. Serious work.</span>
            <a href="#contact" className="text-primary hover:underline transition-colors">Start a Project →</a>
          </div>
        </div>
      </div>
    </footer>
  );
};