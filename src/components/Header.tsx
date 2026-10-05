import React, { useState, useRef, useEffect } from 'react';
import { useBlog } from '../context/BlogContext';
import { PenLine, Bookmark, Compass, User, LogOut, ChevronDown, Check } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentUser,
    currentView,
    setCurrentView,
    openEditor,
    openProfile,
    openAuthModal,
    logout,
    users,
    login,
  } = useBlog();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [accountSwitchOpen, setAccountSwitchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
        setAccountSwitchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-[#FAF8F5]/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => setCurrentView('feed')}
          className="group text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 rounded"
        >
          <span className="font-serif text-2xl font-semibold tracking-tight text-stone-900 group-hover:text-stone-700 transition-colors">
            Chronicle
          </span>
        </button>

        {/* Zone 2: Clean 4-6 text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => setCurrentView('feed')}
            className={`cursor-pointer transition-colors hover:text-stone-950 ${
              currentView === 'feed'
                ? 'text-stone-950 font-semibold underline underline-offset-8 decoration-stone-400'
                : 'text-stone-600'
            }`}
          >
            Stories
          </button>
          <button
            onClick={() => setCurrentView('topics')}
            className={`cursor-pointer transition-colors hover:text-stone-950 ${
              currentView === 'topics'
                ? 'text-stone-950 font-semibold underline underline-offset-8 decoration-stone-400'
                : 'text-stone-600'
            }`}
          >
            Topics
          </button>
          <button
            onClick={() => setCurrentView('reading-list')}
            className={`cursor-pointer transition-colors hover:text-stone-950 flex items-center gap-1.5 ${
              currentView === 'reading-list'
                ? 'text-stone-950 font-semibold underline underline-offset-8 decoration-stone-400'
                : 'text-stone-600'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Reading List</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => openEditor(null)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
          >
            <PenLine className="w-3.5 h-3.5 text-stone-600" />
            <span>Write</span>
          </button>

          {currentUser ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-stone-200 transition-all cursor-pointer focus:outline-none"
                aria-label="User menu"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full border border-stone-200 bg-stone-100 object-cover"
                />
                <ChevronDown className="w-3 h-3 text-stone-500 hidden sm:block" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white border border-stone-200/90 shadow-lg py-2 text-sm z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-4 py-2 border-b border-stone-100">
                    <p className="font-semibold text-stone-900 truncate">{currentUser.name}</p>
                    <p className="text-xs text-stone-500 truncate">{currentUser.handle}</p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        openProfile(currentUser.id);
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-stone-700 hover:bg-stone-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <User className="w-4 h-4 text-stone-400" />
                      <span>My Profile & Articles</span>
                    </button>
                    <button
                      onClick={() => {
                        setCurrentView('reading-list');
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-stone-700 hover:bg-stone-50 flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <Bookmark className="w-4 h-4 text-stone-400" />
                      <span>Saved Stories ({currentUser.bookmarkedArticleIds.length})</span>
                    </button>
                  </div>

                  <div className="border-t border-stone-100 pt-1">
                    <button
                      onClick={() => setAccountSwitchOpen((prev) => !prev)}
                      className="w-full text-left px-4 py-2 text-xs text-stone-600 hover:bg-stone-50 flex items-center justify-between cursor-pointer"
                    >
                      <span>Switch Author Persona</span>
                      <ChevronDown
                        className={`w-3 h-3 transition-transform ${accountSwitchOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {accountSwitchOpen && (
                      <div className="bg-stone-50 px-2 py-1 space-y-0.5 border-y border-stone-100">
                        {users.map((u) => (
                          <button
                            key={u.id}
                            onClick={() => {
                              login(u.id);
                              setDropdownOpen(false);
                            }}
                            className="w-full flex items-center justify-between px-2 py-1.5 text-xs rounded hover:bg-stone-200/60 transition-colors text-left cursor-pointer"
                          >
                            <span className="truncate text-stone-800">{u.name}</span>
                            {u.id === currentUser.id && (
                              <Check className="w-3.5 h-3.5 text-stone-700 shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}

                    <button
                      onClick={() => {
                        logout();
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-stone-600 hover:bg-rose-50 hover:text-rose-700 flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={openAuthModal}
              className="px-4 py-1.5 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap cursor-pointer"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
