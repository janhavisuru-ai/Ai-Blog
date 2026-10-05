import React from 'react';
import { BlogProvider, useBlog } from './context/BlogContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FeedView } from './components/FeedView';
import { ArticleView } from './components/ArticleView';
import { ArticleEditor } from './components/ArticleEditor';
import { ProfileView } from './components/ProfileView';
import { ReadingListView } from './components/ReadingListView';
import { TopicsView } from './components/TopicsView';
import { AuthModal } from './components/AuthModal';
import { ShareModal } from './components/ShareModal';

const AppContent: React.FC = () => {
  const { currentView } = useBlog();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Top Bar following 3-zone contract */}
      <Header />

      {/* Main View Router */}
      <div className="flex-1">
        {currentView === 'feed' && <FeedView />}
        {currentView === 'article' && <ArticleView />}
        {currentView === 'editor' && <ArticleEditor />}
        {currentView === 'profile' && <ProfileView />}
        {currentView === 'reading-list' && <ReadingListView />}
        {currentView === 'topics' && <TopicsView />}
      </div>

      {/* Institutional Footer (hidden in editor view for distraction-free writing) */}
      {currentView !== 'editor' && <Footer />}

      {/* Global Modals */}
      <AuthModal />
      <ShareModal />
    </div>
  );
};

export default function App() {
  return (
    <BlogProvider>
      <AppContent />
    </BlogProvider>
  );
}
