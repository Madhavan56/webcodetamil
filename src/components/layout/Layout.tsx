import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

export const Layout = () => {
  const location = useLocation();

  // When navigating to /#section, scroll to that section after render
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace('#', '');
      // Retry scrolling in case DOM hasn't rendered yet
      let attempts = 0;
      const tryScroll = () => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else if (attempts < 10) {
          attempts++;
          setTimeout(tryScroll, 100);
        }
      };
      // Start after a short delay to let the page render
      setTimeout(tryScroll, 50);
    } else {
      // No hash — scroll to top (e.g. navigating to /blog)
      window.scrollTo({ top: 0 });
    }
  }, [location]);

  return (
    <>
      <Header />
      <Navigation />
      <main id="main-content" className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
