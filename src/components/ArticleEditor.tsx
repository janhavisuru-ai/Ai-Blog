import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { CATEGORIES } from '../data/seedData';
import {
  ArrowLeft,
  Eye,
  Columns,
  Edit2,
  Image as ImageIcon,
  Check,
  Send,
  Save,
  Bold,
  Italic,
  Heading2,
  Heading3,
  Quote,
  List,
  Code,
  Sparkles,
} from 'lucide-react';

const COVER_PRESETS = [
  {
    title: 'Architectural Light',
    url: '/src/assets/images/hero_editorial_spaces_1791176660658.jpg',
  },
  {
    title: 'Neural Networks & Nature',
    url: '/src/assets/images/cover_neural_nature_1791176673263.jpg',
  },
  {
    title: 'Rain & Solitude (Kyoto)',
    url: '/src/assets/images/cover_kyoto_solitude_1791176687903.jpg',
  },
  {
    title: 'Letterpress & Type',
    url: '/src/assets/images/cover_typography_ink_1791176701904.jpg',
  },
  {
    title: 'Philosophical Reflection',
    url: '/src/assets/images/cover_philosophy_memory_1791961016425.jpg',
  },
  {
    title: 'The Nocturnal City',
    url: '/src/assets/images/cover_nocturnal_urbanism_1791961017486.jpg',
  },
];

export const ArticleEditor: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const navigate = useNavigate();

  const {
    currentUser,
    articles,
    editingArticle,
    saveArticle,
  } = useBlog();

  const currentEditTarget =
    (articleId ? articles.find((a) => a.id === articleId || a.slug === articleId) : null) ||
    editingArticle;

  const [title, setTitle] = useState(currentEditTarget?.title || '');
  const [subtitle, setSubtitle] = useState(currentEditTarget?.subtitle || '');
  const [content, setContent] = useState(currentEditTarget?.content || '');
  const [category, setCategory] = useState(
    currentEditTarget?.category || CATEGORIES[1] || 'Architecture & Design'
  );
  const [tagsInput, setTagsInput] = useState(currentEditTarget?.tags.join(', ') || '');
  const [coverImage, setCoverImage] = useState(
    currentEditTarget?.coverImage || COVER_PRESETS[0].url
  );
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [viewMode, setViewMode] = useState<'edit' | 'split' | 'preview'>('edit');
  const [isSaving, setIsSaving] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Sync if currentEditTarget changes
  useEffect(() => {
    if (currentEditTarget) {
      setTitle(currentEditTarget.title);
      setSubtitle(currentEditTarget.subtitle);
      setContent(currentEditTarget.content);
      setCategory(currentEditTarget.category);
      setTagsInput(currentEditTarget.tags.join(', '));
      setCoverImage(currentEditTarget.coverImage);
    }
  }, [currentEditTarget]);

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const estimatedReadTime = Math.max(1, Math.ceil(wordCount / 200));

  const insertMarkdown = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('article-content-area') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selection = content.substring(start, end);
    const replacement = prefix + (selection || 'text') + suffix;

    const nextContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(nextContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selection.length || 4));
    }, 10);
  };

  const handleSave = (isDraft: boolean) => {
    if (!title.trim()) {
      alert('Please provide a title for your article.');
      return;
    }

    if (!content.trim()) {
      alert('Please write some content before publishing.');
      return;
    }

    setIsSaving(true);
    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    try {
      const saved = saveArticle({
        id: currentEditTarget?.id,
        title: title.trim(),
        subtitle: subtitle.trim() || 'A thoughtful exploration on Chronicle.',
        content: content.trim(),
        coverImage,
        coverImageAlt: title,
        category,
        tags: parsedTags.length > 0 ? parsedTags : ['General'],
        isDraft,
      });

      setFeedbackMessage(isDraft ? 'Draft saved successfully!' : 'Article published!');
      setTimeout(() => {
        setIsSaving(false);
        if (!isDraft) {
          navigate(`/article/${encodeURIComponent(saved.slug || saved.id)}`);
        } else {
          navigate(currentUser ? `/profile/${currentUser.id}` : '/');
        }
      }, 700);
    } catch (e) {
      console.error(e);
      setIsSaving(false);
      alert('Could not save article. Please ensure you are logged in.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* Top Editor Bar */}
      <header className="sticky top-16 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/70 px-4 sm:px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Cancel</span>
          </Link>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 p-1 bg-stone-200/60 rounded-lg">
            <button
              onClick={() => setViewMode('edit')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'edit'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Edit2 className="w-3 h-3" />
              <span>Write</span>
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`hidden md:flex px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer items-center gap-1.5 ${
                viewMode === 'split'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Columns className="w-3 h-3" />
              <span>Split</span>
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'preview'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>Preview</span>
            </button>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSave(true)}
              disabled={isSaving}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Draft</span>
            </button>

            <button
              onClick={() => handleSave(false)}
              disabled={isSaving}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{editingArticle ? 'Update Story' : 'Publish Story'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Notification Toast */}
      {feedbackMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-sm px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Editor Body */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        <div
          className={`grid gap-8 ${
            viewMode === 'split' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
          }`}
        >
          {/* Write Pane */}
          {viewMode !== 'preview' && (
            <div className="space-y-6">
              {/* Cover Image Picker Trigger */}
              <div className="relative">
                <div className="aspect-16/7 w-full overflow-hidden rounded-xl bg-stone-100 border border-stone-200/80 relative group">
                  <img
                    src={coverImage}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-stone-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setShowImagePicker((prev) => !prev)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-stone-900 bg-white/95 rounded-lg shadow-sm hover:bg-white transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Change Cover Image</span>
                    </button>
                  </div>
                </div>

                {/* Cover Selector Drawer */}
                {showImagePicker && (
                  <div className="mt-3 p-4 bg-white rounded-xl border border-stone-200 shadow-md space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                      Select Curated Editorial Artwork
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {COVER_PRESETS.map((preset) => (
                        <div
                          key={preset.url}
                          onClick={() => {
                            setCoverImage(preset.url);
                            setShowImagePicker(false);
                          }}
                          className={`group cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                            coverImage === preset.url
                              ? 'border-stone-900 ring-2 ring-stone-900/20'
                              : 'border-transparent hover:border-stone-300'
                          }`}
                        >
                          <img
                            src={preset.url}
                            alt={preset.title}
                            className="aspect-16/10 object-cover w-full group-hover:scale-105 transition-transform"
                          />
                          <p className="text-[10px] p-1 font-medium text-stone-700 bg-stone-50 truncate">
                            {preset.title}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-stone-100 flex items-center gap-2">
                      <input
                        type="url"
                        placeholder="Or paste custom image URL..."
                        value={customImageUrl}
                        onChange={(e) => setCustomImageUrl(e.target.value)}
                        className="flex-1 text-xs px-3 py-1.5 border border-stone-200 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-500"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (customImageUrl.trim()) {
                            setCoverImage(customImageUrl.trim());
                            setShowImagePicker(false);
                          }
                        }}
                        className="px-3 py-1.5 text-xs bg-stone-800 text-white rounded-md hover:bg-stone-700 cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Title & Subtitle Inputs */}
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Title of your story..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-900 placeholder:text-stone-300 bg-transparent border-none focus:outline-none tracking-tight"
                />

                <input
                  type="text"
                  placeholder="Subtitle or brief premise (e.g. Why deep reading matters in our distracted era)..."
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full font-serif italic text-lg sm:text-xl text-stone-600 placeholder:text-stone-300 bg-transparent border-none focus:outline-none"
                />
              </div>

              {/* Metadata Settings: Category & Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 border-y border-stone-200/70 text-xs">
                <div>
                  <label className="block text-stone-500 font-semibold uppercase tracking-wider mb-1">
                    Category Topic
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-md px-2.5 py-1.5 text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-400"
                  >
                    {CATEGORIES.filter((c) => c !== 'All Topics').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-stone-500 font-semibold uppercase tracking-wider mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Architecture, Solitude, Books"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    className="w-full bg-white border border-stone-200 rounded-md px-2.5 py-1.5 text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400"
                  />
                </div>
              </div>

              {/* Markdown Toolbar */}
              <div className="flex flex-wrap items-center gap-1 p-1 bg-stone-100 rounded-lg border border-stone-200/80">
                <button
                  type="button"
                  onClick={() => insertMarkdown('**', '**')}
                  className="p-1.5 rounded hover:bg-white text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
                  title="Bold (**text**)"
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown('*', '*')}
                  className="p-1.5 rounded hover:bg-white text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
                  title="Italic (*text*)"
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <span className="w-px h-4 bg-stone-300 mx-1" />
                <button
                  type="button"
                  onClick={() => insertMarkdown('## ')}
                  className="p-1.5 rounded hover:bg-white text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
                  title="Heading 2 (## Heading)"
                >
                  <Heading2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown('### ')}
                  className="p-1.5 rounded hover:bg-white text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
                  title="Heading 3 (### Heading)"
                >
                  <Heading3 className="w-3.5 h-3.5" />
                </button>
                <span className="w-px h-4 bg-stone-300 mx-1" />
                <button
                  type="button"
                  onClick={() => insertMarkdown('> ')}
                  className="p-1.5 rounded hover:bg-white text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
                  title="Blockquote (> Quote)"
                >
                  <Quote className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown('1. ')}
                  className="p-1.5 rounded hover:bg-white text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
                  title="Numbered List"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertMarkdown('```\n', '\n```')}
                  className="p-1.5 rounded hover:bg-white text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
                  title="Code block"
                >
                  <Code className="w-3.5 h-3.5" />
                </button>

                <div className="ml-auto text-xs text-stone-500 font-mono pr-2">
                  <span className="tabular-nums">{wordCount}</span> words ·{' '}
                  <span className="tabular-nums">{estimatedReadTime}</span> min read
                </div>
              </div>

              {/* Main Content Area */}
              <div className="relative">
                <textarea
                  id="article-content-area"
                  rows={18}
                  placeholder="Tell your story. Write with depth, cadence, and care..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full font-serif text-lg leading-relaxed text-stone-800 placeholder:text-stone-300 bg-white border border-stone-200/90 rounded-xl p-5 focus:outline-none focus:ring-1 focus:ring-stone-400 resize-y shadow-xs"
                />
              </div>
            </div>
          )}

          {/* Preview Pane (Split or Full Preview) */}
          {(viewMode === 'preview' || viewMode === 'split') && (
            <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-xs">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 border-b border-stone-100 pb-2 mb-6">
                Reader Preview
              </div>

              {/* Cover */}
              <div className="aspect-16/9 rounded-lg overflow-hidden mb-6 bg-stone-100 border border-stone-200">
                <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
              </div>

              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-500 font-sans mb-3">
                <span className="font-semibold text-stone-700">{category}</span>
                <span aria-hidden="true">·</span>
                <span>{estimatedReadTime} min read</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-medium text-stone-900 leading-tight mb-4">
                {title || 'Untitled Essay'}
              </h1>

              {subtitle && (
                <p className="font-serif italic text-lg text-stone-600 mb-6 leading-relaxed">
                  {subtitle}
                </p>
              )}

              {/* Author ribbon */}
              {currentUser && (
                <div className="flex items-center gap-3 py-3 border-y border-stone-100 mb-6">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-9 h-9 rounded-full border border-stone-200 object-cover"
                  />
                  <div>
                    <p className="text-xs font-semibold text-stone-900">{currentUser.name}</p>
                    <p className="text-[11px] text-stone-500">{currentUser.role}</p>
                  </div>
                </div>
              )}

              {/* Rendered content */}
              <div className="font-serif text-base sm:text-lg text-stone-800 leading-relaxed space-y-4">
                {content ? (
                  content.split('\n\n').map((paragraph, idx) => {
                    const trimmed = paragraph.trim();
                    if (!trimmed) return null;
                    if (trimmed.startsWith('## ')) {
                      return (
                        <h2 key={idx} className="text-2xl font-serif font-medium text-stone-900 mt-6 mb-2">
                          {trimmed.replace('## ', '')}
                        </h2>
                      );
                    }
                    if (trimmed.startsWith('### ')) {
                      return (
                        <h3 key={idx} className="text-xl font-serif font-medium text-stone-900 mt-4 mb-1">
                          {trimmed.replace('### ', '')}
                        </h3>
                      );
                    }
                    if (trimmed.startsWith('> ')) {
                      return (
                        <blockquote
                          key={idx}
                          className="border-l-2 border-stone-800 pl-4 py-1 italic font-serif text-stone-700 my-4"
                        >
                          {trimmed.replace(/^>\s*/, '')}
                        </blockquote>
                      );
                    }
                    return <p key={idx}>{trimmed}</p>;
                  })
                ) : (
                  <p className="text-stone-400 italic">No content written yet.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
