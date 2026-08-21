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
      // Small delay to let the page render first
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const element = document.getElementById(elementId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
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
