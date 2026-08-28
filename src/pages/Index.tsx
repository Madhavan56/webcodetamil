import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { Work } from '@/components/sections/Work';
import { About } from '@/components/sections/About';
import { Process } from '@/components/sections/Process';
import { Contact } from '@/components/sections/Contact';

export const Index = () => {
  return (
    <>
      <Hero />
      <Services />
      <Work />
      <About />
      <Process />
      <Contact />
    </>
  );
};
