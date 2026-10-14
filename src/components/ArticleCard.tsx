import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';
import { useBlog } from '../context/BlogContext';
import { Bookmark, Heart, MessageSquare } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  variant?: 'card' | 'compact' | 'horizontal';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, variant = 'card' }) => {
  const { toggleBookmark, currentUser } = useBlog();
  const isBookmarked = currentUser?.bookmarkedArticleIds.includes(article.id);
  const articleUrl = `/article/${article.slug || article.id}`;

  if (variant === 'compact') {
    return (
      <article className="group py-4 border-b border-stone-200/60 last:border-b-0 flex items-baseline justify-between gap-4">
        <Link to={articleUrl} className="space-y-1 min-w-0 flex-1 block">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-sans">
            <span className="font-medium text-stone-700">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime} min read</span>
          </div>
          <h3 className="font-serif text-lg font-medium text-stone-900 group-hover:text-stone-700 transition-colors line-clamp-1">
            {article.title}
          </h3>
          <p className="text-xs text-stone-500 truncate">By {article.author.name}</p>
        </Link>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleBookmark(article.id);
          }}
          className={`p-1.5 rounded hover:bg-stone-100 transition-colors cursor-pointer shrink-0 ${
            isBookmarked ? 'text-stone-900' : 'text-stone-400 hover:text-stone-700'
          }`}
          aria-label="Bookmark"
        >
          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <article className="group py-6 border-b border-stone-200/70 last:border-b-0 grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 items-center">
        <div className="sm:col-span-8 space-y-2 order-2 sm:order-1">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-sans">
            <Link
              to={`/profile/${article.author.id}`}
              onClick={(e) => e.stopPropagation()}
              className="font-medium text-stone-800 hover:underline"
            >
              {article.author.name}
            </Link>
            <span aria-hidden="true">·</span>
            <Link to={`/topics/${encodeURIComponent(article.category)}`} className="hover:underline">
              {article.category}
            </Link>
            <span aria-hidden="true">·</span>
            <span>{article.readTime} min read</span>
          </div>

          <Link to={articleUrl} className="block group">
            <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 group-hover:text-stone-700 transition-colors text-balance line-clamp-2">
              {article.title}
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed line-clamp-2 mt-1">
              {article.subtitle}
            </p>
          </Link>

          <div className="pt-2 flex items-center justify-between text-xs text-stone-500">
            <div className="flex items-center gap-4">
              <span>{article.publishedAt}</span>
              <span className="flex items-center gap-1 text-stone-600">
                <Heart className="w-3.5 h-3.5" />
                <span className="tabular-nums">{article.claps}</span>
              </span>
              <span className="flex items-center gap-1 text-stone-600">
                <MessageSquare className="w-3.5 h-3.5" />
                <span className="tabular-nums">{article.commentsCount}</span>
              </span>
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleBookmark(article.id);
              }}
              className={`p-1.5 rounded hover:bg-stone-100 transition-colors cursor-pointer ${
                isBookmarked ? 'text-stone-900' : 'text-stone-400 hover:text-stone-700'
              }`}
              title={isBookmarked ? 'Saved' : 'Save story'}
              aria-label="Save story"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Image */}
        <Link
          to={articleUrl}
          className="sm:col-span-4 order-1 sm:order-2 overflow-hidden rounded-lg bg-stone-100 border border-stone-200/60 aspect-16/10 block"
        >
          <img
            src={article.coverImage}
            alt={article.coverImageAlt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
          />
        </Link>
      </article>
    );
  }

  // Default Card variant
  return (
    <article className="group flex flex-col justify-between border border-stone-200/70 rounded-xl bg-white/70 hover:bg-white p-5 transition-all duration-200 hover:shadow-xs hover:border-stone-300">
      <Link to={articleUrl} className="space-y-4 block">
        {/* Cover */}
        <div className="aspect-16/10 overflow-hidden rounded-lg bg-stone-100 border border-stone-100 relative">
          <img
            src={article.coverImage}
            alt={article.coverImageAlt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
          />
        </div>

        {/* Metadata - Zero-pill text */}
        <div className="flex items-center gap-2 text-xs text-stone-500 font-sans">
          <span className="font-semibold text-stone-700">{article.category}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readTime} min read</span>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1.5">
          <h2 className="font-serif text-xl font-medium text-stone-900 group-hover:text-stone-700 transition-colors line-clamp-2">
            {article.title}
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed line-clamp-2">
            {article.subtitle}
          </p>
        </div>
      </Link>

      {/* Footer */}
      <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
        <Link
          to={`/profile/${article.author.id}`}
          className="flex items-center gap-2.5 group/author cursor-pointer"
        >
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-7 h-7 rounded-full border border-stone-200 bg-stone-100 object-cover"
          />
          <span className="text-xs font-medium text-stone-800 group-hover/author:underline">
            {article.author.name}
          </span>
        </Link>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleBookmark(article.id);
          }}
          className={`p-1.5 rounded hover:bg-stone-100 transition-colors cursor-pointer ${
            isBookmarked ? 'text-stone-900' : 'text-stone-400 hover:text-stone-700'
          }`}
          title={isBookmarked ? 'Saved' : 'Save for later'}
          aria-label="Bookmark article"
        >
          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>
    </article>
  );
};
