import React from 'react';
import { useBlog } from '../context/BlogContext';
import { ArticleCard } from './ArticleCard';
import { Bookmark, Compass } from 'lucide-react';

export const ReadingListView: React.FC = () => {
  const { currentUser, articles, setCurrentView, openAuthModal } = useBlog();

  if (!currentUser) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4 text-stone-500">
          <Bookmark className="w-6 h-6" />
        </div>
        <h2 className="font-serif text-2xl font-medium text-stone-900 mb-2">
          Your Curated Reading List
        </h2>
        <p className="text-sm text-stone-600 mb-6">
          Sign in or create an account to save thoughtful essays and read them at your own leisure.
        </p>
        <button
          onClick={openAuthModal}
          className="px-5 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
        >
          Sign In to Access Saved Stories
        </button>
      </div>
    );
  }

  const bookmarkedArticles = articles.filter((a) =>
    currentUser.bookmarkedArticleIds.includes(a.id)
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="border-b border-stone-200/80 pb-6 mb-8 flex items-end justify-between">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block">
            Personal Archive
          </span>
          <h1 className="font-serif text-3xl font-medium text-stone-900 mt-1">
            Reading List ({bookmarkedArticles.length})
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Stories you have saved for undisturbed contemplation.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('feed')}
          className="text-xs font-medium text-stone-600 hover:text-stone-900 flex items-center gap-1.5 cursor-pointer"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Explore More Stories</span>
        </button>
      </div>

      {bookmarkedArticles.length === 0 ? (
        <div className="text-center py-20 rounded-2xl bg-white/60 border border-dashed border-stone-300">
          <Bookmark className="w-8 h-8 text-stone-300 mx-auto mb-3" />
          <h3 className="font-serif text-xl font-medium text-stone-800 mb-1">
            Your reading list is empty
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto mb-5">
            Click the bookmark icon on any article card or reading view to save stories here.
          </p>
          <button
            onClick={() => setCurrentView('feed')}
            className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 cursor-pointer"
          >
            Browse Today's Stories
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarkedArticles.map((article) => (
            <ArticleCard key={article.id} article={article} variant="horizontal" />
          ))}
        </div>
      )}
    </div>
  );
};
