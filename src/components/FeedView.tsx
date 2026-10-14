import React from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { HeroFeatured } from './HeroFeatured';
import { ArticleCard } from './ArticleCard';
import { CATEGORIES } from '../data/seedData';
import { Search, PenLine, Sparkles, X, TrendingUp } from 'lucide-react';

export const FeedView: React.FC = () => {
  const {
    articles,
    users,
    currentUser,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    toggleFollow,
  } = useBlog();

  // Published articles only
  const publishedArticles = articles.filter((a) => !a.isDraft);

  // Featured lead story
  const featuredArticle =
    publishedArticles.find((a) => a.isFeatured) || publishedArticles[0];

  // Search and category filter
  const filteredArticles = publishedArticles.filter((article) => {
    const matchesCategory =
      selectedCategory === 'All Topics' || article.category === selectedCategory;

    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesCategory;

    const matchesSearch =
      article.title.toLowerCase().includes(query) ||
      article.subtitle.toLowerCase().includes(query) ||
      article.content.toLowerCase().includes(query) ||
      article.author.name.toLowerCase().includes(query) ||
      article.tags.some((t) => t.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  // Secondary stories (excluding featured if in unfiltered view)
  const isFiltering = selectedCategory !== 'All Topics' || searchQuery.trim().length > 0;
  const secondaryStories = isFiltering
    ? filteredArticles
    : filteredArticles.filter((a) => a.id !== featuredArticle?.id);

  // Suggested authors to follow (exclude current user)
  const suggestedAuthors = users
    .filter((u) => u.id !== currentUser?.id)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Search & Topic Segmented Filter Strip */}
      <div className="mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-stone-200/70 pb-6">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.slice(0, 5).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100/90 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px] md:w-64">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search stories, topics, authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-7 py-1.5 text-xs bg-white border border-stone-200 rounded-lg text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-0.5 cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* When no filters active, show 3-Tier Curatorial Layout */}
      {!isFiltering && featuredArticle && (
        <HeroFeatured article={featuredArticle} />
      )}

      {/* Main Grid: Stories + Editorial Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Column: Stories Stream (8 cols) */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between border-b border-stone-200/80 pb-3 mb-6">
            <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900">
              {isFiltering
                ? `Results for "${searchQuery || selectedCategory}" (${filteredArticles.length})`
                : 'Recent Dispatches'}
            </h2>
            <span className="text-xs text-stone-500 font-sans">
              {secondaryStories.length} {secondaryStories.length === 1 ? 'story' : 'stories'}
            </span>
          </div>

          {secondaryStories.length === 0 ? (
            <div className="text-center py-16 bg-white/60 rounded-xl border border-dashed border-stone-300">
              <p className="text-stone-500 text-sm">No stories match your criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All Topics');
                  setSearchQuery('');
                }}
                className="mt-3 text-xs font-semibold text-stone-900 underline cursor-pointer"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {secondaryStories.map((article) => (
                <ArticleCard key={article.id} article={article} variant="horizontal" />
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Editorial Rail (4 cols) */}
        <div className="lg:col-span-4 space-y-8">
          {/* Write Prompt Banner */}
          <div className="p-5 rounded-2xl bg-stone-900 text-white shadow-xs space-y-3">
            <div className="flex items-center gap-1.5 text-xs text-amber-300 uppercase tracking-wider font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Open Publication</span>
            </div>
            <h3 className="font-serif text-xl font-medium text-stone-100 leading-snug">
              Share your insights with curious minds around the globe.
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              Chronicle gives you a distraction-free space to write, publish, and build a dedicated readership.
            </p>
            <Link
              to="/write"
              className="w-full py-2 text-xs font-semibold text-stone-900 bg-white hover:bg-stone-100 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <PenLine className="w-3.5 h-3.5" />
              <span>Write an Article</span>
            </Link>
          </div>

          {/* Curated Compact Stories */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200/80">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500 mb-4 pb-2 border-b border-stone-100">
              <TrendingUp className="w-3.5 h-3.5 text-stone-700" />
              <span>Curated Highlights</span>
            </div>
            <div>
              {publishedArticles.slice(0, 4).map((art) => (
                <ArticleCard key={art.id} article={art} variant="compact" />
              ))}
            </div>
          </div>

          {/* Suggested Writers */}
          <div className="p-5 rounded-2xl bg-white border border-stone-200/80 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 pb-2 border-b border-stone-100">
              Writers to Follow
            </div>

            <div className="space-y-3.5">
              {suggestedAuthors.map((author) => {
                const isFollowing = currentUser?.followingUserIds.includes(author.id);
                return (
                  <div key={author.id} className="flex items-center justify-between gap-3">
                    <Link
                      to={`/profile/${author.id}`}
                      className="flex items-center gap-2.5 cursor-pointer group min-w-0"
                    >
                      <img
                        src={author.avatar}
                        alt={author.name}
                        className="w-8 h-8 rounded-full border border-stone-200 object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-stone-900 group-hover:underline truncate">
                          {author.name}
                        </p>
                        <p className="text-[10px] text-stone-500 truncate">{author.role}</p>
                      </div>
                    </Link>

                    <button
                      onClick={() => toggleFollow(author.id)}
                      className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors cursor-pointer shrink-0 ${
                        isFollowing
                          ? 'border border-stone-300 text-stone-600 hover:bg-stone-50'
                          : 'bg-stone-100 text-stone-800 hover:bg-stone-200'
                      }`}
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
