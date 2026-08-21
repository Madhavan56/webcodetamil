import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

export const Layout = () => {
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
