import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Heart,
  MessageSquare,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Edit3,
  Trash2,
  Type,
  Check,
  Sparkles,
} from 'lucide-react';

export const ArticleView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const {
    articles,
    selectedArticleId,
    comments,
    currentUser,
    fontPreference,
    fontSizePreference,
    setFontPreference,
    setFontSizePreference,
    setCurrentView,
    openProfile,
    openEditor,
    openShareModal,
    toggleBookmark,
    addClap,
    addComment,
    likeComment,
    toggleFollow,
    deleteArticle,
  } = useBlog();

  const article = articles.find(
    (a) => a.slug === slug || a.id === slug || (selectedArticleId && a.id === selectedArticleId)
  );

  useEffect(() => {
    if (article) {
      document.title = `${article.title} — Chronicle`;
    }
  }, [article]);

  // Scroll Progress
  const [scrollProgress, setScrollProgress] = useState(0);

  // Audio Speech Synthesis
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Comments Input
  const [commentText, setCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [clapBurst, setClapBurst] = useState<{ id: number; count: number } | null>(null);

  // Typography controls toggle
  const [showTypeControls, setShowTypeControls] = useState(false);

  // Check bookmark and author status
  const isBookmarked = currentUser?.bookmarkedArticleIds.includes(article?.id || '');
  const isAuthor = currentUser?.id === article?.authorId;
  const isFollowingAuthor = currentUser?.followingUserIds.includes(article?.author.id || '');

  // Calculate user claps for this article
  const userClaps = currentUser && article?.clappedBy ? article.clappedBy[currentUser.id] || 0 : 0;

  // Track reading scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cleanup audio speech on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-stone-600">The requested article could not be found.</p>
        <Link
          to="/"
          className="inline-block mt-4 px-4 py-2 text-sm font-medium text-stone-900 bg-stone-100 rounded-lg hover:bg-stone-200"
        >
          Return to Feed
        </Link>
      </div>
    );
  }

  // Audio player handler
  const toggleSpeechNarration = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      // Clean content for spoken text (strip markdown symbols)
      const cleanContent = `${article.title}. By ${article.author.name}. ${article.subtitle}. ${article.content.replace(/[#*`>_]/g, '')}`;
      const utterance = new SpeechSynthesisUtterance(cleanContent);
      utterance.rate = speechRate;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleClap = () => {
    const newCount = addClap(article.id);
    if (newCount > 0) {
      setClapBurst({ id: Date.now(), count: newCount });
      setTimeout(() => setClapBurst(null), 1200);
    }
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setIsSubmittingComment(true);
    addComment(article.id, commentText.trim());
    setCommentText('');
    setIsSubmittingComment(false);
  };

  const articleComments = comments.filter((c) => c.articleId === article.id);

  // Render markdown content paragraphs & headings cleanly
  const renderFormattedBody = (raw: string) => {
    const lines = raw.split('\n\n');
    let hasDropCap = true;

    return lines.map((block, idx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // H3
      if (trimmed.startsWith('### ')) {
        return (
          <h3
            key={idx}
            className="font-serif text-2xl font-medium text-stone-900 mt-10 mb-4 tracking-tight"
          >
            {trimmed.replace('### ', '')}
          </h3>
        );
      }

      // H2
      if (trimmed.startsWith('## ')) {
        return (
          <h2
            key={idx}
            className="font-serif text-3xl font-medium text-stone-900 mt-12 mb-5 tracking-tight border-b border-stone-100 pb-2"
          >
            {trimmed.replace('## ', '')}
          </h2>
        );
      }

      // Blockquote
      if (trimmed.startsWith('> ')) {
        return (
          <blockquote
            key={idx}
            className="my-8 border-l-2 border-stone-800 pl-6 py-2 italic font-serif text-xl sm:text-2xl text-stone-800 leading-relaxed"
          >
            {trimmed.replace(/^>\s*/, '').replace(/^"|"$/g, '')}
          </blockquote>
        );
      }

      // Code block
      if (trimmed.startsWith('```')) {
        const codeContent = trimmed.replace(/^```[a-z]*\n?/, '').replace(/```$/, '');
        return (
          <div key={idx} className="my-6 rounded-lg bg-stone-900 p-4 text-stone-100 font-mono text-xs overflow-x-auto leading-relaxed">
            <pre>{codeContent}</pre>
          </div>
        );
      }

      // Numbered List
      if (/^\d+\.\s/.test(trimmed)) {
        const items = trimmed.split('\n').filter(Boolean);
        return (
          <ol key={idx} className="my-6 space-y-3 list-decimal list-inside text-stone-700 leading-relaxed pl-2">
            {items.map((item, itemIdx) => {
              const text = item.replace(/^\d+\.\s*/, '');
              // Bold label check
              const match = text.match(/^\*\*(.*?)\*\*:(.*)$/);
              if (match) {
                return (
                  <li key={itemIdx} className="leading-relaxed">
                    <strong className="text-stone-900 font-semibold">{match[1]}:</strong>
                    <span>{match[2]}</span>
                  </li>
                );
              }
              return <li key={itemIdx}>{text}</li>;
            })}
          </ol>
        );
      }

      // Markdown Image Figure
      const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (imgMatch) {
        return (
          <figure key={idx} className="my-10 overflow-hidden rounded-xl bg-stone-100 border border-stone-200/70 shadow-xs">
            <img
              src={imgMatch[2]}
              alt={imgMatch[1]}
              referrerPolicy="no-referrer"
              className="w-full aspect-16/9 object-cover"
            />
            {imgMatch[1] && (
              <figcaption className="px-4 py-2.5 text-xs font-serif text-stone-500 italic bg-stone-50/80 border-t border-stone-200/50">
                {imgMatch[1]}
              </figcaption>
            )}
          </figure>
        );
      }

      // Regular Paragraph with optional initial drop cap on first paragraph
      const isFirstParagraph = hasDropCap;
      if (isFirstParagraph) hasDropCap = false;

      // Simple inline bold and italics parser
      const formattedText = trimmed
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');

      return (
        <p
          key={idx}
          className={`text-stone-800 leading-[1.8] my-6 ${
            isFirstParagraph
              ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-medium first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-stone-900'
              : ''
          }`}
          dangerouslySetInnerHTML={{ __html: formattedText }}
        />
      );
    });
  };

  const fontSizeClass =
    fontSizePreference === 'sm'
      ? 'text-base'
      : fontSizePreference === 'base'
      ? 'text-lg'
      : fontSizePreference === 'lg'
      ? 'text-xl'
      : 'text-2xl';

  return (
    <article className="min-h-screen pb-24">
      {/* Sticky Reading Depth Indicator Bar */}
      <div
        className="fixed top-16 left-0 h-0.5 bg-stone-900 z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={scrollProgress}
      />

      {/* Floating Reading Utility Header */}
      <div className="sticky top-16 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/60 py-2.5 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Stories</span>
          </Link>

          <div className="flex items-center gap-3">
            {/* Audio Reader */}
            <button
              onClick={toggleSpeechNarration}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-md transition-colors cursor-pointer ${
                isPlayingAudio
                  ? 'bg-amber-100 text-amber-900 font-semibold'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
              title={isPlayingAudio ? 'Pause Narration' : 'Listen to Article (Audio Narration)'}
            >
              {isPlayingAudio ? (
                <>
                  <Pause className="w-3.5 h-3.5 animate-pulse" />
                  <span>Narrating...</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Listen</span>
                </>
              )}
            </button>

            {/* Typography Controls Trigger */}
            <div className="relative">
              <button
                onClick={() => setShowTypeControls((prev) => !prev)}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  showTypeControls ? 'bg-stone-200 text-stone-900' : 'text-stone-600 hover:bg-stone-100'
                }`}
                title="Typography & Reading preferences"
              >
                <Type className="w-4 h-4" />
              </button>

              {showTypeControls && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white border border-stone-200 shadow-xl p-3 text-xs z-50 space-y-3">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block mb-1.5">
                      Typeface
                    </label>
                    <div className="grid grid-cols-2 gap-1.5 bg-stone-100 p-1 rounded-lg">
                      <button
                        onClick={() => setFontPreference('serif')}
                        className={`py-1 text-xs rounded font-serif ${
                          fontPreference === 'serif' ? 'bg-white shadow-xs font-semibold text-stone-900' : 'text-stone-600'
                        }`}
                      >
                        Serif
                      </button>
                      <button
                        onClick={() => setFontPreference('sans')}
                        className={`py-1 text-xs rounded font-sans ${
                          fontPreference === 'sans' ? 'bg-white shadow-xs font-semibold text-stone-900' : 'text-stone-600'
                        }`}
                      >
                        Sans
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block mb-1.5">
                      Text Size
                    </label>
                    <div className="grid grid-cols-4 gap-1 bg-stone-100 p-1 rounded-lg text-center">
                      {(['sm', 'base', 'lg', 'xl'] as const).map((size) => (
                        <button
                          key={size}
                          onClick={() => setFontSizePreference(size)}
                          className={`py-1 text-xs rounded ${
                            fontSizePreference === size
                              ? 'bg-white shadow-xs font-semibold text-stone-900'
                              : 'text-stone-600'
                          }`}
                        >
                          {size === 'sm' ? 'S' : size === 'base' ? 'M' : size === 'lg' ? 'L' : 'XL'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => toggleBookmark(article.id)}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                isBookmarked ? 'text-stone-900 bg-stone-200' : 'text-stone-600 hover:bg-stone-100'
              }`}
              title={isBookmarked ? 'Saved to Reading List' : 'Save for later'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Share Modal Trigger */}
            <button
              onClick={() => openShareModal(article)}
              className="flex items-center gap-1 px-2.5 py-1 text-xs text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>

            {/* Author Controls */}
            {isAuthor && (
              <div className="flex items-center gap-1 pl-2 border-l border-stone-200">
                <Link
                  to={`/editor/${article.id}`}
                  className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-md cursor-pointer"
                  title="Edit this story"
                >
                  <Edit3 className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this article?')) {
                      deleteArticle(article.id);
                      navigate('/');
                    }
                  }}
                  className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-md cursor-pointer"
                  title="Delete story"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Reading Container */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-10">
        {/* Unboxed Metadata Header */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-500 font-sans mb-4">
          <span className="font-semibold text-stone-700">{article.category}</span>
          <span aria-hidden="true">·</span>
          <span>{article.publishedAt}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readTime} min read</span>
        </div>

        {/* Title & Deck */}
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-900 leading-[1.15] text-balance mb-5">
          {article.title}
        </h1>

        <p className="text-lg sm:text-xl text-stone-600 leading-relaxed font-serif italic mb-8">
          {article.subtitle}
        </p>

        {/* Author Byline Ribbon */}
        <div className="flex items-center justify-between border-y border-stone-200/80 py-4 mb-8">
          <Link
            to={`/profile/${article.author.id}`}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-11 h-11 rounded-full border border-stone-200 object-cover bg-stone-100"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-stone-900 group-hover:underline text-sm">
                  {article.author.name}
                </span>
                <span className="text-xs text-stone-500">{article.author.handle}</span>
              </div>
              <p className="text-xs text-stone-500">{article.author.role}</p>
            </div>
          </Link>

          {!isAuthor && (
            <button
              onClick={() => toggleFollow(article.author.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                isFollowingAuthor
                  ? 'border border-stone-300 text-stone-700 hover:bg-stone-100'
                  : 'bg-stone-900 text-white hover:bg-stone-800'
              }`}
            >
              {isFollowingAuthor ? 'Following' : 'Follow'}
            </button>
          )}
        </div>

        {/* Cover Image Presentation */}
        <figure className="mb-10 overflow-hidden rounded-xl bg-stone-100 border border-stone-200/70">
          <img
            src={article.coverImage}
            alt={article.coverImageAlt}
            referrerPolicy="no-referrer"
            className="w-full aspect-16/9 object-cover"
          />
          {article.coverCaption && (
            <figcaption className="px-4 py-2 text-xs font-serif text-stone-500 italic bg-stone-50/80 border-t border-stone-200/50">
              {article.coverCaption}
            </figcaption>
          )}
        </figure>

        {/* Article Body Content */}
        <div
          className={`max-w-2xl mx-auto ${
            fontPreference === 'serif' ? 'font-serif' : 'font-sans'
          } ${fontSizeClass}`}
        >
          {renderFormattedBody(article.content)}
        </div>

        {/* Article Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="max-w-2xl mx-auto mt-12 pt-6 border-t border-stone-200 flex flex-wrap gap-2 text-xs text-stone-500">
            <span className="font-medium text-stone-700 self-center mr-1">Filed under:</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-stone-100 text-stone-700 rounded-md hover:bg-stone-200 cursor-pointer transition-colors"
                onClick={() => setCurrentView('topics')}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Interactive Bottom Clapping & Interaction Bar */}
        <div className="max-w-2xl mx-auto my-12 p-6 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Clapper */}
            <div className="relative">
              <button
                onClick={handleClap}
                className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-50 hover:bg-amber-50 hover:text-amber-900 border border-stone-200/80 text-stone-800 transition-all cursor-pointer active:scale-95"
              >
                <Heart
                  className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                    userClaps > 0 ? 'text-amber-600 fill-current' : 'text-stone-600'
                  }`}
                />
                <span className="font-semibold text-sm tabular-nums">{article.claps}</span>
                <span className="text-xs text-stone-500">claps</span>
              </button>

              {/* Floating celebration counter */}
              {clapBurst && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md animate-bounce">
                  +{clapBurst.count}
                </div>
              )}
            </div>

            {/* Comment Counter Jump */}
            <a
              href="#discussion"
              className="flex items-center gap-2 text-stone-600 hover:text-stone-900 text-sm transition-colors"
            >
              <MessageSquare className="w-5 h-5 text-stone-500" />
              <span className="tabular-nums font-medium">{articleComments.length}</span>
              <span className="text-xs text-stone-500 hidden sm:inline">responses</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleBookmark(article.id)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isBookmarked ? 'bg-stone-200 text-stone-900' : 'text-stone-500 hover:bg-stone-100'
              }`}
              title={isBookmarked ? 'Saved' : 'Save for later'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => openShareModal(article)}
              className="p-2 rounded-lg text-stone-500 hover:bg-stone-100 hover:text-stone-900 transition-colors cursor-pointer"
              title="Share Story"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Author Bio Card */}
        <div className="max-w-2xl mx-auto mb-16 p-6 rounded-2xl bg-stone-100/70 border border-stone-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link
              to={`/profile/${article.author.id}`}
              className="flex items-center gap-4 cursor-pointer group"
            >
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-14 h-14 rounded-full border border-stone-200 object-cover bg-stone-100"
              />
              <div>
                <p className="font-serif text-lg font-semibold text-stone-900 group-hover:underline">
                  Written by {article.author.name}
                </p>
                <p className="text-xs text-stone-600">{article.author.role}</p>
                <p className="text-xs text-stone-500 mt-1 line-clamp-2">{article.author.bio}</p>
              </div>
            </Link>

            {!isAuthor && (
              <button
                onClick={() => toggleFollow(article.author.id)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg shrink-0 transition-colors cursor-pointer ${
                  isFollowingAuthor
                    ? 'border border-stone-300 text-stone-800 bg-white hover:bg-stone-50'
                    : 'bg-stone-900 text-white hover:bg-stone-800'
                }`}
              >
                {isFollowingAuthor ? 'Following Author' : 'Follow Author'}
              </button>
            )}
          </div>
        </div>

        {/* Discussion / Responses Section */}
        <section id="discussion" className="max-w-2xl mx-auto pt-8 border-t border-stone-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-medium text-stone-900">
              Responses ({articleComments.length})
            </h2>
          </div>

          {/* New Comment Form */}
          <form onSubmit={handlePostComment} className="mb-8">
            <div className="rounded-xl border border-stone-300/80 bg-white p-3 focus-within:border-stone-500 focus-within:ring-1 focus-within:ring-stone-500 transition-all">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={currentUser ? `Respond as ${currentUser.name}...` : 'Sign in to join the conversation...'}
                rows={3}
                className="w-full resize-none border-none p-1 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
              />
              <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                <span className="text-xs text-stone-400">Keep thoughts constructive and respectful.</span>
                <button
                  type="submit"
                  disabled={!commentText.trim() || isSubmittingComment}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Respond
                </button>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {articleComments.length === 0 ? (
              <p className="text-sm text-stone-500 italic text-center py-6">
                Be the first to share your thoughts on this story.
              </p>
            ) : (
              articleComments.map((comment) => {
                const isLiked = currentUser ? comment.likedBy.includes(currentUser.id) : false;
                return (
                  <div key={comment.id} className="p-4 rounded-xl bg-white/70 border border-stone-200/70 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={comment.authorAvatar}
                          alt={comment.authorName}
                          className="w-7 h-7 rounded-full border border-stone-200 bg-stone-100 object-cover"
                        />
                        <div>
                          <span className="text-xs font-semibold text-stone-900">
                            {comment.authorName}
                          </span>
                          <span className="text-xs text-stone-400 ml-2">{comment.createdAt}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => likeComment(comment.id)}
                        className={`flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors cursor-pointer ${
                          isLiked ? 'text-amber-800 bg-amber-50 font-medium' : 'text-stone-500 hover:text-stone-800'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current text-amber-600' : ''}`} />
                        <span className="tabular-nums">{comment.likes}</span>
                      </button>
                    </div>

                    <p className="text-sm text-stone-700 leading-relaxed font-sans">{comment.content}</p>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </article>
  );
};
