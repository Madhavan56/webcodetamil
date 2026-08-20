import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const codeSnippets = [
  `const createWebsite = (vision) => {\n  return buildWithCare(vision);\n};`,
  `function launchProject(idea) {\n  const design = craftExperience(idea);\n  const code = writeCleanCode(design);\n  return deploy(code);\n}`,
  `class WebStudio {\n  constructor() {\n    this.philosophy = 'Small studio. Serious work.';\n  }\n  \n  async build(project) {\n    return await this.craft(project);\n  }\n}`,
  `const stack = [\n  'React', 'TypeScript',\n  'Node.js', 'Tailwind',\n  'Vite', 'Framer Motion'\n];\n\nstack.forEach(tech => master(tech));`,
  `interface Project {\n  vision: string;\n  quality: 'premium';\n  timeline: 'realistic';\n  communication: 'transparent';\n}`,
  `async function deliver(value) {\n  const result = await craft(value);\n  return refine(result);\n}\n\ndeliver('excellence');`,
  `const principles = {\n  design: 'user-centered',\n  code: 'clean & scalable',\n  performance: 'optimized',\n  accessibility: 'inclusive'\n};`,
  `export default function Studio() {\n  return (\n    <Passion>\n      <Creativity />\n      <TechnicalExcellence />\n      <ClientSuccess />\n    </Passion>\n  );\n}`,
];

export const CodeBackground = React.memo(() => {
  const [snippets, setSnippets] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const shuffled = [...codeSnippets].sort(() => Math.random() - 0.5);
    setSnippets(shuffled.slice(0, 4));

    let isActive = true;
    const interval = 6000;

    const cycleSnippets = () => {
      if (!isActive || !containerRef.current) return;

      setSnippets(prev => {
        const newSnippets = [...prev];
        newSnippets[indexRef.current] = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        indexRef.current = (indexRef.current + 1) % newSnippets.length;
        return newSnippets;
      });
    };

    const intervalId = window.setInterval(cycleSnippets, interval);

    return () => {
      isActive = false;
      clearInterval(intervalId);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Cpath d=%22M50 0L50 100M0 50L100 50%22 stroke=%22%2300d4ff%22 stroke-width=%220.3%22 opacity=%220.03%22/%3E%3C/svg%3E')] opacity-50" />

      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
          {snippets.map((snippet, index) => (
            <motion.div
              key={index}
              className="font-mono text-caption text-primary/10 leading-relaxed whitespace-pre rounded-xl p-6 bg-surface/30 backdrop-blur border border-border/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.3, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                transform: `translate3d(${(index % 2) * 2 - 1}px, ${Math.floor(index / 2) * 2 - 1}px, 0)`,
              }}
            >
              {snippet.split('\n').map((line, lineIndex) => (
                <span key={lineIndex} className="block">
                  {line}
                  <br />
                </span>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-primary/20 font-mono text-caption">
        <span>//</span>
        <motion.span
          className="relative"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Building with care
        </motion.span>
        <span>{'//'}</span>
      </div>
    </div>
  );
});
