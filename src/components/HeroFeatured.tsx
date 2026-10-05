import React from 'react';
import { Article } from '../types';
import { useBlog } from '../context/BlogContext';
import { Bookmark, Sparkles, Clock } from 'lucide-react';

interface HeroFeaturedProps {
  article: Article;
}

export const HeroFeatured: React.FC<HeroFeaturedProps> = ({ article }) => {
  const { openArticle, openProfile, toggleBookmark, currentUser } = useBlog();
  const isBookmarked = currentUser?.bookmarkedArticleIds.includes(article.id);

  return (
    <section className="mb-14 border-b border-stone-200/80 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Visual Slot - 7 cols */}
        <div
          onClick={() => openArticle(article.id)}
          className="lg:col-span-7 group cursor-pointer overflow-hidden rounded-xl bg-stone-100 border border-stone-200/60 shadow-xs relative"
        >
          <div className="aspect-16/10 overflow-hidden relative">
            <img
              src={article.coverImage}
              alt={article.coverImageAlt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-102"
            />
            <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-colors" />
          </div>
          {article.coverCaption && (
            <p className="px-3 py-1.5 text-xs text-stone-500 italic bg-stone-50 border-t border-stone-200/50">
              {article.coverCaption}
            </p>
          )}
        </div>

        {/* Story Prose Slot - 5 cols */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
          {/* Metadata - Zero-pill clean unboxed text */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-500 font-sans">
            <span className="font-semibold text-stone-700">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>Featured Essay</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime} min read</span>
          </div>

          <h1
            onClick={() => openArticle(article.id)}
            className="font-serif text-3xl sm:text-4xl lg:text-[2.5rem] leading-[1.18] font-medium text-stone-900 hover:text-stone-700 transition-colors cursor-pointer text-balance"
          >
            {article.title}
          </h1>

          <p className="text-stone-600 text-base leading-relaxed line-clamp-3">
            {article.subtitle}
          </p>

          <div className="pt-2 flex items-center justify-between border-t border-stone-100">
            {/* Author */}
            <div
              onClick={() => openProfile(article.author.id)}
              className="flex items-center gap-3 group/author cursor-pointer"
            >
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-9 h-9 rounded-full border border-stone-200 object-cover bg-stone-100"
              />
              <div className="text-left">
                <p className="text-sm font-medium text-stone-900 group-hover/author:underline underline-offset-2">
                  {article.author.name}
                </p>
                <p className="text-xs text-stone-500">{article.author.role}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBookmark(article.id);
                }}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  isBookmarked
                    ? 'text-stone-900 bg-stone-200/70'
                    : 'text-stone-400 hover:text-stone-700 hover:bg-stone-100'
                }`}
                title={isBookmarked ? 'Remove from reading list' : 'Save for later'}
                aria-label="Save article"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={() => openArticle(article.id)}
                className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Read Story
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
