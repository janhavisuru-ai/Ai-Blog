import React, { useState } from 'react';
import { useBlog } from '../context/BlogContext';
import { ArticleCard } from './ArticleCard';
import {
  MapPin,
  Globe,
  Calendar,
  PenLine,
  Settings,
  Heart,
  BookOpen,
  Users,
  Check,
  X,
  FileText,
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const {
    users,
    currentUser,
    selectedProfileUserId,
    articles,
    toggleFollow,
    updateProfile,
    openEditor,
  } = useBlog();

  const author = users.find((u) => u.id === selectedProfileUserId) || currentUser || users[0];
  const isOwnProfile = currentUser?.id === author.id;
  const isFollowing = currentUser?.followingUserIds.includes(author.id);

  const [activeTab, setActiveTab] = useState<'published' | 'drafts' | 'about'>('published');
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);

  // Profile Edit Form State
  const [editName, setEditName] = useState(author.name);
  const [editBio, setEditBio] = useState(author.bio);
  const [editRole, setEditRole] = useState(author.role);
  const [editLocation, setEditLocation] = useState(author.location || '');
  const [editWebsite, setEditWebsite] = useState(author.website || '');

  // Filter articles
  const authorPublishedArticles = articles.filter(
    (a) => a.authorId === author.id && !a.isDraft
  );
  const authorDraftArticles = articles.filter(
    (a) => a.authorId === author.id && a.isDraft
  );

  const totalClapsReceived = authorPublishedArticles.reduce((acc, a) => acc + a.claps, 0);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName.trim() || author.name,
      bio: editBio.trim() || author.bio,
      role: editRole.trim() || author.role,
      location: editLocation.trim(),
      website: editWebsite.trim(),
    });
    setIsEditingModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Profile Header */}
      <div className="border-b border-stone-200/80 pb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-stone-200 object-cover bg-stone-100 shadow-xs"
            />
            <div className="space-y-1">
              <h1 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900">
                {author.name}
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 font-mono">{author.handle}</p>
              <p className="text-xs sm:text-sm font-medium text-stone-700">{author.role}</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {isOwnProfile ? (
              <>
                <button
                  onClick={() => setIsEditingModalOpen(true)}
                  className="px-3.5 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>
                <button
                  onClick={() => openEditor(null)}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <PenLine className="w-3.5 h-3.5" />
                  <span>New Story</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => toggleFollow(author.id)}
                className={`px-5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  isFollowing
                    ? 'border border-stone-300 text-stone-700 hover:bg-stone-100'
                    : 'bg-stone-900 text-white hover:bg-stone-800 shadow-xs'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow Author'}
              </button>
            )}
          </div>
        </div>

        {/* Bio prose */}
        <p className="mt-5 text-stone-700 text-sm sm:text-base leading-relaxed max-w-2xl">
          {author.bio}
        </p>

        {/* Operational / Trust Strip */}
        <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-stone-500">
          {author.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              <span>{author.location}</span>
            </span>
          )}
          {author.website && (
            <a
              href={author.website}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-stone-900 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-stone-400" />
              <span className="truncate max-w-[200px]">{author.website.replace(/^https?:\/\//, '')}</span>
            </a>
          )}
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-stone-400" />
            <span>Member since {author.joinedDate}</span>
          </span>
        </div>

        {/* Quantitative Rigor Stats Strip */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-white border border-stone-200/80">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block">
              Published
            </span>
            <span className="font-serif text-xl sm:text-2xl font-medium text-stone-900 tabular-nums">
              {authorPublishedArticles.length}
            </span>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block">
              Claps Received
            </span>
            <span className="font-serif text-xl sm:text-2xl font-medium text-stone-900 tabular-nums">
              {totalClapsReceived}
            </span>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block">
              Followers
            </span>
            <span className="font-serif text-xl sm:text-2xl font-medium text-stone-900 tabular-nums">
              {author.followersCount}
            </span>
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block">
              Following
            </span>
            <span className="font-serif text-xl sm:text-2xl font-medium text-stone-900 tabular-nums">
              {author.followingCount}
            </span>
          </div>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="mt-8">
        <div className="flex items-center gap-6 border-b border-stone-200 text-sm">
          <button
            onClick={() => setActiveTab('published')}
            className={`pb-3 font-medium transition-colors cursor-pointer ${
              activeTab === 'published'
                ? 'border-b-2 border-stone-900 text-stone-900 font-semibold'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Stories ({authorPublishedArticles.length})
          </button>

          {isOwnProfile && (
            <button
              onClick={() => setActiveTab('drafts')}
              className={`pb-3 font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'drafts'
                  ? 'border-b-2 border-stone-900 text-stone-900 font-semibold'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Drafts ({authorDraftArticles.length})</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('about')}
            className={`pb-3 font-medium transition-colors cursor-pointer ${
              activeTab === 'about'
                ? 'border-b-2 border-stone-900 text-stone-900 font-semibold'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            About
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'published' && (
            <div className="space-y-4">
              {authorPublishedArticles.length === 0 ? (
                <div className="text-center py-16 bg-white/60 rounded-xl border border-dashed border-stone-300">
                  <p className="text-stone-500 text-sm">No stories published yet.</p>
                  {isOwnProfile && (
                    <button
                      onClick={() => openEditor(null)}
                      className="mt-3 px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 cursor-pointer"
                    >
                      Write your first story
                    </button>
                  )}
                </div>
              ) : (
                authorPublishedArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} variant="horizontal" />
                ))
              )}
            </div>
          )}

          {activeTab === 'drafts' && isOwnProfile && (
            <div className="space-y-4">
              {authorDraftArticles.length === 0 ? (
                <div className="text-center py-16 bg-white/60 rounded-xl border border-dashed border-stone-300">
                  <p className="text-stone-500 text-sm">You have no unpublished drafts.</p>
                  <button
                    onClick={() => openEditor(null)}
                    className="mt-3 px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 cursor-pointer"
                  >
                    Start a new draft
                  </button>
                </div>
              ) : (
                authorDraftArticles.map((draft) => (
                  <div
                    key={draft.id}
                    className="p-5 rounded-xl bg-white border border-stone-200 flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-xs text-amber-700 font-medium mb-1">
                        <span>Unpublished Draft</span>
                        <span aria-hidden="true">·</span>
                        <span>{draft.category}</span>
                      </div>
                      <h3 className="font-serif text-lg font-medium text-stone-900 truncate">
                        {draft.title || 'Untitled Draft'}
                      </h3>
                      <p className="text-xs text-stone-500 truncate mt-0.5">
                        {draft.subtitle || 'No subtitle provided'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => openEditor(draft)}
                        className="px-3.5 py-1.5 text-xs font-medium text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                      >
                        Continue Editing
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-4">
              <h3 className="font-serif text-lg font-medium text-stone-900">
                About {author.name}
              </h3>
              <p className="text-sm text-stone-700 leading-relaxed">{author.bio}</p>
              <div className="pt-4 border-t border-stone-100 space-y-2 text-xs text-stone-600">
                <p>
                  <strong className="text-stone-900">Contact:</strong> {author.email}
                </p>
                <p>
                  <strong className="text-stone-900">Role:</strong> {author.role}
                </p>
                {author.location && (
                  <p>
                    <strong className="text-stone-900">Location:</strong> {author.location}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditingModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-stone-200 shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h2 className="font-serif text-xl font-medium text-stone-900">Edit Author Profile</h2>
              <button
                onClick={() => setIsEditingModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-600 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-500"
                  required
                />
              </div>

              <div>
                <label className="block text-stone-600 font-semibold mb-1">Professional Title / Role</label>
                <input
                  type="text"
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-500"
                />
              </div>

              <div>
                <label className="block text-stone-600 font-semibold mb-1">Author Bio</label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-500"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-semibold mb-1">Website URL</label>
                  <input
                    type="url"
                    value={editWebsite}
                    onChange={(e) => setEditWebsite(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsEditingModalOpen(false)}
                  className="px-4 py-2 font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
