import { blogPosts, blogCategories, getPostsByCategory } from '@/data/blog';
import { BlogCard } from './BlogCard';
import { cn } from '@/utils/cn';

interface BlogGridProps {
  featured?: boolean;
  limit?: number;
  category?: string;
}

export const BlogGrid = ({ featured = false, limit, category = 'all' }: BlogGridProps) => {
  const posts = featured
    ? blogPosts.filter(p => p.featured).slice(0, limit || 3)
    : getPostsByCategory(category).slice(0, limit);

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="body text-textMuted">No posts found in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} variant="default" />
      ))}
    </div>
  );
};

export const BlogCategories = ({ activeCategory, onCategoryChange }: { activeCategory: string; onCategoryChange: (category: string) => void }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-10" role="tablist" aria-label="Blog categories">
      {blogCategories.map(category => (
        <button
          key={category.id}
          role="tab"
          aria-selected={activeCategory === category.id}
          aria-controls={`blog-panel-${category.id}`}
          id={`blog-tab-${category.id}`}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            'px-4 py-2 rounded-full text-body-sm font-medium transition-all duration-300',
            activeCategory === category.id
              ? 'bg-primary text-background shadow-glow'
              : 'bg-surface border border-border text-textMuted hover:text-text hover:border-primary/50'
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};
