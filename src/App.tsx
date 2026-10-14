import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { BlogProvider } from './context/BlogContext';
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
  const location = useLocation();
  const isEditor = location.pathname.startsWith('/write') || location.pathname.startsWith('/editor');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Top Bar following 3-zone contract */}
      <Header />

      {/* Main View Router */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<FeedView />} />
          <Route path="/stories" element={<FeedView />} />
          <Route path="/article/:slug" element={<ArticleView />} />
          <Route path="/topics" element={<TopicsView />} />
          <Route path="/topics/:categoryName" element={<TopicsView />} />
          <Route path="/reading-list" element={<ReadingListView />} />
          <Route path="/write" element={<ArticleEditor />} />
          <Route path="/editor/:articleId" element={<ArticleEditor />} />
          <Route path="/profile/:userId" element={<ProfileView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Institutional Footer (hidden in editor view for distraction-free writing) */}
      {!isEditor && <Footer />}

      {/* Global Modals */}
      <AuthModal />
      <ShareModal />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <BlogProvider>
        <AppContent />
      </BlogProvider>
    </BrowserRouter>
  );
}
