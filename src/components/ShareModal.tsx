import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import {
  X,
  Copy,
  Check,
  Share2,
  Twitter,
  Linkedin,
  Mail,
  MessageCircle,
} from 'lucide-react';

export const ShareModal: React.FC = () => {
  const { shareModalArticle, closeShareModal } = useBlog();
  const [copied, setCopied] = useState(false);

  if (!shareModalArticle) return null;

  // Use current window location or fallback
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://chronicle.journal';
  const articleUrl = `${origin}/article/${shareModalArticle.slug || shareModalArticle.id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareModalArticle.title,
          text: shareModalArticle.subtitle,
          url: articleUrl,
        });
      } catch {
        // user cancelled
      }
    } else {
      handleCopy();
    }
  };

  const tweetIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `"${shareModalArticle.title}" by ${shareModalArticle.author.name} on @ChronicleJournal`
  )}&url=${encodeURIComponent(articleUrl)}`;

  const linkedInIntentUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    articleUrl
  )}`;

  const emailIntentUrl = `mailto:?subject=${encodeURIComponent(
    shareModalArticle.title
  )}&body=${encodeURIComponent(
    `I thought you would appreciate reading this essay on Chronicle:\n\n${shareModalArticle.title}\n${shareModalArticle.subtitle}\n\nRead here: ${articleUrl}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-stone-200 shadow-2xl p-6 relative animate-in fade-in zoom-in-95">
        <button
          onClick={closeShareModal}
          className="absolute top-5 right-5 p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
            Publish & Distribute
          </span>
          <h2 className="font-serif text-2xl font-medium text-stone-900">
            Share this Story with the World
          </h2>
        </div>

        {/* Social Card Preview */}
        <div className="mb-6 rounded-xl border border-stone-200 bg-stone-50/60 p-3.5 overflow-hidden">
          <div className="aspect-16/8 rounded-lg overflow-hidden mb-3 bg-stone-200">
            <img
              src={shareModalArticle.coverImage}
              alt={shareModalArticle.title}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-[11px] uppercase tracking-wider font-semibold text-stone-500">
            chronicle.journal · {shareModalArticle.category}
          </p>
          <h3 className="font-serif text-base font-semibold text-stone-900 line-clamp-1 mt-0.5">
            {shareModalArticle.title}
          </h3>
          <p className="text-xs text-stone-600 line-clamp-2 mt-1">
            {shareModalArticle.subtitle}
          </p>
        </div>

        {/* Copyable Link */}
        <div className="mb-6 space-y-1.5">
          <label className="text-xs font-semibold text-stone-700 block">Permanent Story Link</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={articleUrl}
              className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-700 select-all font-mono"
            />
            <button
              onClick={handleCopy}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-stone-900 hover:bg-stone-800 text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Social Intent Direct Channels */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-stone-700 block">Broadcast to Platforms</span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <a
              href={tweetIntentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-50 hover:text-stone-900 text-xs font-medium transition-colors"
            >
              <Twitter className="w-3.5 h-3.5 text-sky-500" />
              <span>X (Twitter)</span>
            </a>

            <a
              href={linkedInIntentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-50 hover:text-stone-900 text-xs font-medium transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-blue-600" />
              <span>LinkedIn</span>
            </a>

            <a
              href={emailIntentUrl}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-50 hover:text-stone-900 text-xs font-medium transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-stone-500" />
              <span>Email</span>
            </a>

            <button
              onClick={handleNativeShare}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-50 hover:text-stone-900 text-xs font-medium transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-stone-600" />
              <span>System Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
