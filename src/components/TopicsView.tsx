import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { CATEGORIES } from '../data/seedData';
import { ArticleCard } from './ArticleCard';
import { Tag, Compass } from 'lucide-react';

export const TopicsView: React.FC = () => {
  const { articles, selectedCategory, setSelectedCategory, setCurrentView } = useBlog();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = Array.from(
    new Set(articles.flatMap((a) => a.tags || []))
  );

  const filteredArticles = articles.filter((a) => {
    if (a.isDraft) return false;
    const matchesCategory =
      selectedCategory === 'All Topics' || a.category === selectedCategory;
    const matchesTag = !activeTag || a.tags.includes(activeTag);
    return matchesCategory && matchesTag;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="border-b border-stone-200/80 pb-6 mb-8">
        <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block">
          Editorial Index
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-stone-900 mt-1">
          Explore Topics & Disciplines
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Discover essays catalogued by intellectual field, craft, and philosophy.
        </p>

        {/* Categories Tab Strip */}
        <div className="flex items-center gap-2 overflow-x-auto py-4 mt-4 scrollbar-none">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setActiveTag(null);
              }}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tags sub-rail */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
          <span className="text-stone-400 flex items-center gap-1">
            <Tag className="w-3 h-3" />
            <span>Tags:</span>
          </span>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`px-2 py-0.5 rounded text-xs transition-colors cursor-pointer ${
                activeTag === tag
                  ? 'bg-amber-100 text-amber-900 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              #{tag}
            </button>
          ))}
          {activeTag && (
            <button
              onClick={() => setActiveTag(null)}
              className="text-[11px] text-stone-400 underline hover:text-stone-700 cursor-pointer ml-1"
            >
              clear tag
            </button>
          )}
        </div>
      </div>

      {/* Grid of Results */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-20 bg-white/50 rounded-2xl border border-dashed border-stone-300">
          <p className="text-stone-500 text-sm">No published stories found under this filter.</p>
          <button
            onClick={() => {
              setSelectedCategory('All Topics');
              setActiveTag(null);
            }}
            className="mt-3 text-xs font-semibold text-stone-900 underline cursor-pointer"
          >
            Reset all topic filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} variant="card" />
          ))}
        </div>
      )}
    </div>
  );
};
