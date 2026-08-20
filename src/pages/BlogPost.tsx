import { useParams } from 'react-router-dom';
import { BlogPostContent } from '@/components/blog/BlogPost';

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      <BlogPostContent slug={slug || ''} />
    </div>
  );
};