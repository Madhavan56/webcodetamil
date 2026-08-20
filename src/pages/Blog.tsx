import { useState } from 'react';
import { blogCategories, getPostsByCategory } from '@/data/blog';
import { BlogGrid, BlogCategories } from '@/components/blog/BlogGrid';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { cn } from '@/utils/cn';

export const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const posts = getPostsByCategory(activeCategory);

  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      <section className="section bg-background" aria-labelledby="blog-heading">
        <div className="container">
          <ScrollReveal delay={0} direction="up">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-body-sm font-medium mb-4">
                Insights
              </span>
              <h1 id="blog-heading" className="heading-xl text-text mb-4">
                Studio <span className="text-primary">Insights</span>
              </h1>
              <p className="body-lg text-textMuted">
                Thoughts on design, development, and building products that matter.
              </p>
            </div>
          </ScrollReveal>

          <BlogCategories activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

          <ScrollReveal delay={100} direction="up" stagger={100}>
            <div id="blog-panel-all" role="tabpanel" aria-labelledby={activeCategory === 'all' ? 'blog-tab-all' : undefined} className={cn(activeCategory === 'all' ? '' : 'hidden')}>
              {posts.length > 0 ? (
                <BlogGrid category={activeCategory} />
              ) : (
                <div className="text-center py-16">
                  <p className="body text-textMuted">No posts found in this category yet.</p>
                  <p className="body-sm text-textDim mt-2">Check back soon or explore other categories.</p>
                </div>
              )}
            </div>

            {blogCategories.filter(c => c.id !== 'all').map(category => (
              <div
                key={category.id}
                id={`blog-panel-${category.id}`}
                role="tabpanel"
                aria-labelledby={`blog-tab-${category.id}`}
                className={cn(activeCategory === category.id ? '' : 'hidden')}
              >
                {getPostsByCategory(category.id).length > 0 ? (
                  <BlogGrid category={category.id} />
                ) : (
                  <div className="text-center py-16">
                    <p className="body text-textMuted">No posts in this category yet.</p>
                  </div>
                )}
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};