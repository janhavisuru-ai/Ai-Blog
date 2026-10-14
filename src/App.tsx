import React, { Component, ErrorInfo, ReactNode } from 'react';
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

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Chronicle:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.clear();
    } catch {
      // ignore
    }
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] text-stone-900 p-6">
          <div className="max-w-md w-full text-center space-y-4 p-8 bg-white rounded-2xl border border-stone-200 shadow-sm">
            <h1 className="font-serif text-2xl font-semibold text-stone-900">
              Chronicle
            </h1>
            <p className="text-sm text-stone-600">
              An unexpected display issue occurred. Refreshing will restore the reading interface.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
              >
                Reload Page
              </button>
              <button
                onClick={this.handleReset}
                className="px-4 py-2 text-xs font-medium text-stone-700 bg-stone-100 rounded-lg hover:bg-stone-200 transition-colors"
              >
                Reset Stored Cache
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

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
    <ErrorBoundary>
      <BrowserRouter>
        <BlogProvider>
          <AppContent />
        </BlogProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
