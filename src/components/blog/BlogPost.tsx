import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPostBySlug } from '@/data/blog';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface BlogPostContentProps {
  slug: string;
}

export const BlogPostContent = ({ slug }: BlogPostContentProps) => {
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="container py-20 text-center">
        <h1 className="heading-lg text-text mb-4">Post Not Found</h1>
        <p className="body text-textMuted mb-8">The blog post you're looking for doesn't exist.</p>
        <Link to="/blog" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft className="h-5 w-5" />
          Back to Blog
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article className="py-16 lg:py-24">
      <div className="container max-w-3xl">
        <ScrollReveal delay={0} direction="up">
          <Link to="/blog" className="inline-flex items-center gap-2 text-body-sm text-textMuted hover:text-text transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-6">
            {post.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-body-sm font-medium">
                {tag}
              </span>
            ))}
          </div>

          <motion.h1
            className="heading-xl text-text mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {post.title}
          </motion.h1>

          <div className="flex flex-wrap items-center gap-6 text-body-sm text-textMuted mb-8">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {post.readTime}
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100} direction="up">
          <div className="aspect-video rounded-2xl overflow-hidden mb-10">
            <img
              src={post.coverImage}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200} direction="up">
          <div className="prose prose-invert max-w-none">
            <div className="body-lg text-textMuted mb-10 p-6 rounded-xl bg-surface/50 border border-border/50">
              {post.excerpt}
            </div>

            <div className="space-y-6 text-text" dangerouslySetInnerHTML={{ __html: post.content || `
              <p class="body mb-6">This is a placeholder for the blog post content. Replace this with actual MDX or HTML content.</p>
              <h2 class="heading-md mb-4">Getting Started</h2>
              <p class="body mb-6">When you're ready to write real blog posts, you can add them to the <code class="px-1.5 py-0.5 rounded bg-surface border border-border font-mono text-body-sm">src/data/blog.ts</code> file.</p>
              <h2 class="heading-md mb-4">Content Structure</h2>
              <p class="body mb-6">Each blog post should include:</p>
              <ul class="list-disc list-inside body mb-6 space-y-2">
                <li>A unique slug for the URL</li>
                <li>A compelling title</li>
                <li>An excerpt for previews</li>
                <li>A cover image</li>
                <li>Publication date and read time</li>
                <li>Relevant tags</li>
                <li>Full content (HTML or MDX)</li>
              </ul>
              <h2 class="heading-md mb-4">Next Steps</h2>
              <p class="body mb-6">Consider integrating an MDX parser like <code class="px-1.5 py-0.5 rounded bg-surface border border-border font-mono text-body-sm">next-mdx-remote</code> or <code class="px-1.5 py-0.5 rounded bg-surface border border-border font-mono text-body-sm">mdx-bundler</code> for richer content with components, syntax highlighting, and more.</p>
            `}} />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300} direction="up">
          <div className="mt-16 pt-8 border-t border-border/50">
            <Link to="/blog" className="btn-secondary inline-flex items-center gap-2">
              <ArrowLeft className="h-5 w-5" />
              Back to Blog
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </article>
  );
};