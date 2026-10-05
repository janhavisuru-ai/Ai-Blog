import React from 'react';
import { useBlog } from '../context/BlogContext';

export const Footer: React.FC = () => {
  const { setCurrentView, openEditor, openAuthModal, currentUser } = useBlog();

  return (
    <footer className="border-t border-stone-200/80 bg-[#FAF8F5] py-12 text-stone-600">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-baseline justify-between gap-6 pb-8 border-b border-stone-200/60">
          <div>
            <span className="font-serif text-2xl font-semibold text-stone-900 tracking-tight">
              Chronicle
            </span>
            <p className="text-xs text-stone-500 mt-1 max-w-md">
              An open publishing platform for long-form essays, thoughtful criticism, and timeless crafts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-stone-600 font-medium">
            <button
              onClick={() => setCurrentView('feed')}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Latest Stories
            </button>
            <button
              onClick={() => setCurrentView('topics')}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Topics & Archives
            </button>
            <button
              onClick={() => openEditor(null)}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Write on Chronicle
            </button>
            <button
              onClick={() => setCurrentView('reading-list')}
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Reading List
            </button>
            {!currentUser && (
              <button
                onClick={openAuthModal}
                className="hover:text-stone-900 transition-colors cursor-pointer"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} Chronicle Publishing. Crafted for deep reading.</p>
          <div className="flex items-center gap-4">
            <span>Archival Typography</span>
            <span>·</span>
            <span>Zero Algorithmic Agitation</span>
            <span>·</span>
            <span>Independent Creators</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
