import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import type { BlogPost } from '@/data/blog';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured';
}

export const BlogCard = ({ post, variant = 'default' }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (variant === 'featured') {
    return (
      <motion.article
        className="relative group h-[400px] lg:h-[500px] rounded-3xl overflow-hidden bg-surface border border-border"
        whileHover={{ y: -4, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.4)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to={`/blog/${post.slug}`} className="block h-full" aria-label={`Read ${post.title}`}>
          <div className="absolute inset-0 z-0">
            <img
              src={post.coverImage}
              alt=""
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
          </div>

          <div className="relative z-10 h-full flex flex-col justify-end p-6 lg:p-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="px-2 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-caption font-medium">
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="px-2 py-1 rounded-full bg-surface/80 border border-border text-textDim text-caption font-medium">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>

            <h2 className="heading-lg text-text mb-3 line-clamp-2">{post.title}</h2>
            <p className="body text-textMuted mb-4 line-clamp-2 max-w-xl">{post.excerpt}</p>

            <div className="flex flex-wrap items-center gap-4 text-body-sm text-textMuted">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {post.readTime}
              </span>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card variant="glass" hover padding="lg" className="h-full flex flex-col">
        <Link to={`/blog/${post.slug}`} className="block" aria-label={`Read ${post.title}`}>
          <div className="aspect-video rounded-xl overflow-hidden mb-5 relative">
            <img
              src={post.coverImage}
              alt=""
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </Link>
        <CardContent className="flex flex-col flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {post.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="px-2 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-caption font-medium">
                {tag}
              </span>
            ))}
            {post.tags.length > 2 && (
              <span className="px-2 py-1 rounded-full bg-surface/80 border border-border text-textDim text-caption font-medium">
                +{post.tags.length - 2}
              </span>
            )}
          </div>

          <Link to={`/blog/${post.slug}`} className="block" aria-label={`Read ${post.title}`}>
            <h3 className="heading-sm text-text mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {post.title}
            </h3>
          </Link>

          <p className="body-sm text-textMuted mb-4 line-clamp-3 flex-1">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-3 text-caption text-textDim pt-4 border-t border-border/50">
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {post.readTime}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.article>
  );
};