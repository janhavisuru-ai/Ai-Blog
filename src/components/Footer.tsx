import React from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';

export const Footer: React.FC = () => {
  const { openAuthModal, currentUser } = useBlog();

  return (
    <footer className="border-t border-stone-200/80 bg-[#FAF8F5] py-12 text-stone-600">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-baseline justify-between gap-6 pb-8 border-b border-stone-200/60">
          <div>
            <Link to="/" className="font-serif text-2xl font-semibold text-stone-900 tracking-tight hover:text-stone-700 transition-colors">
              Chronicle
            </Link>
            <p className="text-xs text-stone-500 mt-1 max-w-md">
              An open publishing platform for essays on plant-based living, feminism, and personal growth.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-stone-600 font-medium">
            <Link
              to="/"
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Latest Stories
            </Link>
            <Link
              to="/topics"
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Topics & Archives
            </Link>
            <Link
              to="/write"
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Write on Chronicle
            </Link>
            <Link
              to="/reading-list"
              className="hover:text-stone-900 transition-colors cursor-pointer"
            >
              Reading List
            </Link>
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
