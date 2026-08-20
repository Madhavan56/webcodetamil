import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { useEffect } from 'react';
import { initEmailJS } from '@/utils/emailjs';

export const Layout = () => {
  useEffect(() => {
    initEmailJS();
  }, []);

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
