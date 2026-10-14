import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Article, User, Comment, ViewMode, FontPreference, FontSizePreference } from '../types';
import { SEED_USERS, SEED_ARTICLES, SEED_COMMENTS, RETIRED_SEED_IDS } from '../data/seedData';
import {
  heroEditorialSpaces,
  coverNeuralNature,
  coverKyotoSolitude,
  coverTypographyInk,
  coverPhilosophyMemory,
  coverNocturnalUrbanism,
} from '../assets/images';

interface BlogContextType {
  currentUser: User | null;
  users: User[];
  articles: Article[];
  comments: Comment[];
  currentView: ViewMode;
  selectedArticleId: string | null;
  selectedProfileUserId: string | null;
  selectedCategory: string;
  searchQuery: string;
  fontPreference: FontPreference;
  fontSizePreference: FontSizePreference;
  isAuthModalOpen: boolean;
  shareModalArticle: Article | null;
  editingArticle: Article | null;
  
  // Navigation
  setCurrentView: (view: ViewMode) => void;
  openArticle: (articleId: string) => void;
  openProfile: (userId: string) => void;
  openEditor: (articleToEdit?: Article | null) => void;
  openShareModal: (article: Article) => void;
  closeShareModal: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  
  // User Actions
  login: (userId: string) => void;
  registerUser: (userData: { name: string; handle: string; email: string; bio?: string; role?: string; avatar?: string }) => User;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
  toggleFollow: (targetUserId: string) => void;
  toggleBookmark: (articleId: string) => void;
  
  // Article Actions
  addClap: (articleId: string) => number;
  addComment: (articleId: string, content: string) => void;
  likeComment: (commentId: string) => void;
  saveArticle: (articleData: {
    id?: string;
    title: string;
    subtitle: string;
    content: string;
    coverImage: string;
    coverImageAlt?: string;
    coverCaption?: string;
    category: string;
    tags: string[];
    isDraft: boolean;
  }) => Article;
  deleteArticle: (articleId: string) => void;
  
  // Reader Settings
  setFontPreference: (font: FontPreference) => void;
  setFontSizePreference: (size: FontSizePreference) => void;
  setSelectedCategory: (cat: string) => void;
  setSearchQuery: (query: string) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USERS: 'chronicle_users_v1',
  ARTICLES: 'chronicle_articles_v1',
  COMMENTS: 'chronicle_comments_v1',
  CURRENT_USER_ID: 'chronicle_current_user_id_v1',
  FONT_PREF: 'chronicle_font_pref_v1',
  FONT_SIZE: 'chronicle_font_size_v1',
};

const resolveCoverImage = (url: string | undefined): string => {
  if (!url) return heroEditorialSpaces;
  if (url.includes('hero_editorial_spaces')) return heroEditorialSpaces;
  if (url.includes('cover_neural_nature')) return coverNeuralNature;
  if (url.includes('cover_kyoto_solitude')) return coverKyotoSolitude;
  if (url.includes('cover_typography_ink')) return coverTypographyInk;
  if (url.includes('cover_philosophy_memory')) return coverPhilosophyMemory;
  if (url.includes('cover_nocturnal_urbanism')) return coverNocturnalUrbanism;
  return url;
};

const sanitizeUser = (u: any): User => ({
  id: String(u?.id || `user-${Date.now()}`),
  name: String(u?.name || 'Anonymous'),
  handle: String(u?.handle || '@anonymous'),
  email: String(u?.email || 'user@chronicle.journal'),
  avatar: String(u?.avatar || 'https://api.dicebear.com/7.x/notionists/svg?seed=Reader'),
  bio: String(u?.bio || ''),
  role: String(u?.role || 'Reader'),
  location: u?.location ? String(u.location) : undefined,
  website: u?.website ? String(u.website) : undefined,
  twitter: u?.twitter ? String(u.twitter) : undefined,
  joinedDate: String(u?.joinedDate || 'Recently'),
  followersCount: Number.isFinite(u?.followersCount) ? u.followersCount : 0,
  followingCount: Number.isFinite(u?.followingCount) ? u.followingCount : 0,
  followingUserIds: Array.isArray(u?.followingUserIds) ? u.followingUserIds : [],
  bookmarkedArticleIds: Array.isArray(u?.bookmarkedArticleIds) ? u.bookmarkedArticleIds : [],
});

const sanitizeArticle = (a: any): Article => ({
  id: String(a?.id || `art-${Date.now()}`),
  slug: String(a?.slug || `story-${Date.now()}`),
  title: String(a?.title || 'Untitled Story'),
  titleHighlights: Array.isArray(a?.titleHighlights) ? a.titleHighlights.map(String) : undefined,
  subtitle: String(a?.subtitle || ''),
  subtitleHighlights: Array.isArray(a?.subtitleHighlights) ? a.subtitleHighlights.map(String) : undefined,
  content: String(a?.content || ''),
  coverImage: resolveCoverImage(a?.coverImage),
  coverImageAlt: String(a?.coverImageAlt || a?.title || 'Article cover'),
  coverCaption: a?.coverCaption ? String(a.coverCaption) : undefined,
  category: String(a?.category || 'General'),
  tags: Array.isArray(a?.tags) ? a.tags.map(String) : [],
  authorId: String(a?.authorId || 'user-1'),
  author: {
    id: String(a?.author?.id || 'user-1'),
    name: String(a?.author?.name || 'Elena Rostova'),
    handle: String(a?.author?.handle || '@elenarostova'),
    avatar: String(a?.author?.avatar || 'https://api.dicebear.com/7.x/notionists/svg?seed=Elena'),
    role: String(a?.author?.role || 'Contributing Author'),
    bio: String(a?.author?.bio || ''),
  },
  publishedAt: String(a?.publishedAt || 'Recently'),
  readTime: Number.isFinite(a?.readTime) && a.readTime > 0 ? a.readTime : 4,
  claps: Number.isFinite(a?.claps) ? a.claps : 0,
  clappedBy: a?.clappedBy && typeof a.clappedBy === 'object' ? a.clappedBy : {},
  views: Number.isFinite(a?.views) ? a.views : 0,
  isDraft: Boolean(a?.isDraft),
  isFeatured: Boolean(a?.isFeatured),
  commentsCount: Number.isFinite(a?.commentsCount) ? a.commentsCount : 0,
});

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Hydrate Users
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USERS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(sanitizeUser);
        }
      }
      return SEED_USERS.map(sanitizeUser);
    } catch {
      return SEED_USERS.map(sanitizeUser);
    }
  });

  // Current Logged-in User (defaults to Elena Rostova so full capabilities are ready immediately)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const storedId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
      const list = users.length ? users : SEED_USERS;
      const found = list.find((u) => u.id === (storedId || 'user-1'));
      return found ? sanitizeUser(found) : sanitizeUser(list[0]);
    } catch {
      return sanitizeUser(SEED_USERS[0]);
    }
  });

  // Hydrate Articles with latest seed imagery and articles
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ARTICLES);
      if (!stored) return SEED_ARTICLES.map(sanitizeArticle);
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) return SEED_ARTICLES.map(sanitizeArticle);

      // Merge: preserve user-written articles while updating seed articles with latest content and figures
      const userCreated = parsed
        .filter((a) => !SEED_ARTICLES.some((s) => s.id === a?.id) && !RETIRED_SEED_IDS.includes(a?.id))
        .map(sanitizeArticle);

      const updatedSeeds = SEED_ARTICLES.map((seed) => {
        const existing = parsed.find((p) => p?.id === seed.id);
        const existingClaps = Number.isFinite(existing?.claps) ? existing.claps : 0;
        const existingViews = Number.isFinite(existing?.views) ? existing.views : 0;
        const existingClappedBy =
          existing?.clappedBy && typeof existing.clappedBy === 'object'
            ? existing.clappedBy
            : {};

        return sanitizeArticle({
          ...seed,
          claps: Math.max(seed.claps, existingClaps),
          views: Math.max(seed.views, existingViews),
          clappedBy: { ...seed.clappedBy, ...existingClappedBy },
        });
      });

      return [...updatedSeeds, ...userCreated];
    } catch {
      return SEED_ARTICLES.map(sanitizeArticle);
    }
  });

  // Hydrate Comments with latest seed comments
  const [comments, setComments] = useState<Comment[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.COMMENTS);
      if (!stored) return SEED_COMMENTS;
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) return SEED_COMMENTS;
      const userComments = parsed.filter(
        (c) => !SEED_COMMENTS.some((s) => s.id === c?.id) && !RETIRED_SEED_IDS.includes(c?.id)
      );
      return [...SEED_COMMENTS, ...userComments];
    } catch {
      return SEED_COMMENTS;
    }
  });

  const navigate = useNavigate();

  // Navigation State
  const [currentView, setCurrentViewState] = useState<ViewMode>('feed');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedProfileUserId, setSelectedProfileUserId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Topics');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [shareModalArticle, setShareModalArticle] = useState<Article | null>(null);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  // Reader Settings
  const [fontPreference, setFontPreference] = useState<FontPreference>(() => {
    try {
      return (localStorage.getItem(STORAGE_KEYS.FONT_PREF) as FontPreference) || 'serif';
    } catch {
      return 'serif';
    }
  });

  const [fontSizePreference, setFontSizePreference] = useState<FontSizePreference>(() => {
    try {
      return (localStorage.getItem(STORAGE_KEYS.FONT_SIZE) as FontSizePreference) || 'base';
    } catch {
      return 'base';
    }
  });

  // Persistence Effects
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    } catch (e) {
      console.warn('LocalStorage error on users write', e);
    }
  }, [users]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
    } catch (e) {
      console.warn('LocalStorage error on articles write', e);
    }
  }, [articles]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
    } catch (e) {
      console.warn('LocalStorage error on comments write', e);
    }
  }, [comments]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, currentUser.id);
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FONT_PREF, fontPreference);
  }, [fontPreference]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FONT_SIZE, fontSizePreference);
  }, [fontSizePreference]);

  // Actions
  const setCurrentView = (view: ViewMode) => {
    setCurrentViewState(view);
    if (view === 'feed') navigate('/');
    else if (view === 'topics') navigate('/topics');
    else if (view === 'reading-list') navigate('/reading-list');
    else if (view === 'editor') navigate('/write');
  };

  const openArticle = (slugOrId: string) => {
    const target = articles.find((a) => a.id === slugOrId || a.slug === slugOrId);
    const id = target?.id || slugOrId;
    const slug = target?.slug || slugOrId;
    setSelectedArticleId(id);
    setCurrentViewState('article');
    // Increment view count gently
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? { ...a, views: a.views + 1 } : a))
    );
    navigate(`/article/${encodeURIComponent(slug)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openProfile = (userId: string) => {
    setSelectedProfileUserId(userId);
    setCurrentViewState('profile');
    navigate(`/profile/${encodeURIComponent(userId)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openEditor = (articleToEdit?: Article | null) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    setEditingArticle(articleToEdit || null);
    setCurrentViewState('editor');
    if (articleToEdit?.id) {
      navigate(`/editor/${encodeURIComponent(articleToEdit.id)}`);
    } else {
      navigate('/write');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openShareModal = (article: Article) => {
    setShareModalArticle(article);
  };

  const closeShareModal = () => {
    setShareModalArticle(null);
  };

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
      setIsAuthModalOpen(false);
    }
  };

  const registerUser = ({
    name,
    handle,
    email,
    bio,
    role,
    avatar,
  }: {
    name: string;
    handle: string;
    email: string;
    bio?: string;
    role?: string;
    avatar?: string;
  }): User => {
    const cleanHandle = handle.startsWith('@') ? handle : `@${handle}`;
    const newUserId = `user-${Date.now()}`;
    const newUser: User = {
      id: newUserId,
      name,
      handle: cleanHandle,
      email,
      avatar:
        avatar ||
        `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(
          name
        )}&backgroundColor=e8ecef`,
      bio: bio || 'Independent writer & reader on Chronicle.',
      role: role || 'Writer',
      joinedDate: 'Just now',
      followersCount: 0,
      followingCount: 0,
      followingUserIds: [],
      bookmarkedArticleIds: [],
    };

    setUsers((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedData };
    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updated : u)));
    // Also update author snapshot in articles authored by user
    setArticles((prev) =>
      prev.map((art) => {
        if (art.authorId === currentUser.id) {
          return {
            ...art,
            author: {
              ...art.author,
              name: updated.name,
              handle: updated.handle,
              avatar: updated.avatar,
              role: updated.role,
              bio: updated.bio,
            },
          };
        }
        return art;
      })
    );
  };

  const toggleFollow = (targetUserId: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    if (currentUser.id === targetUserId) return;

    const isFollowing = currentUser.followingUserIds.includes(targetUserId);
    const updatedFollowing = isFollowing
      ? currentUser.followingUserIds.filter((id) => id !== targetUserId)
      : [...currentUser.followingUserIds, targetUserId];

    const updatedCurrent = {
      ...currentUser,
      followingUserIds: updatedFollowing,
      followingCount: isFollowing
        ? Math.max(0, currentUser.followingCount - 1)
        : currentUser.followingCount + 1,
    };

    setCurrentUser(updatedCurrent);
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === currentUser.id) return updatedCurrent;
        if (u.id === targetUserId) {
          return {
            ...u,
            followersCount: isFollowing
              ? Math.max(0, u.followersCount - 1)
              : u.followersCount + 1,
          };
        }
        return u;
      })
    );
  };

  const toggleBookmark = (articleId: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    const isBookmarked = currentUser.bookmarkedArticleIds.includes(articleId);
    const updatedBookmarks = isBookmarked
      ? currentUser.bookmarkedArticleIds.filter((id) => id !== articleId)
      : [...currentUser.bookmarkedArticleIds, articleId];

    const updatedUser = {
      ...currentUser,
      bookmarkedArticleIds: updatedBookmarks,
    };

    setCurrentUser(updatedUser);
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updatedUser : u)));
  };

  const addClap = (articleId: string): number => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return 0;
    }

    let clappedCount = 0;
    setArticles((prev) =>
      prev.map((art) => {
        if (art.id === articleId) {
          const userClaps = art.clappedBy?.[currentUser.id] || 0;
          if (userClaps >= 50) return art; // Maximum 50 claps per user
          const nextUserClaps = userClaps + 1;
          clappedCount = nextUserClaps;
          return {
            ...art,
            claps: art.claps + 1,
            clappedBy: {
              ...art.clappedBy,
              [currentUser.id]: nextUserClaps,
            },
          };
        }
        return art;
      })
    );
    return clappedCount;
  };

  const addComment = (articleId: string, content: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    const newComment: Comment = {
      id: `comm-${Date.now()}`,
      articleId,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorHandle: currentUser.handle,
      authorAvatar: currentUser.avatar,
      content,
      createdAt: 'Just now',
      likes: 0,
      likedBy: [],
    };

    setComments((prev) => [newComment, ...prev]);
    setArticles((prev) =>
      prev.map((a) => (a.id === articleId ? { ...a, commentsCount: a.commentsCount + 1 } : a))
    );
  };

  const likeComment = (commentId: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    setComments((prev) =>
      prev.map((comm) => {
        if (comm.id === commentId) {
          const isLiked = comm.likedBy.includes(currentUser.id);
          return {
            ...comm,
            likes: isLiked ? Math.max(0, comm.likes - 1) : comm.likes + 1,
            likedBy: isLiked
              ? comm.likedBy.filter((id) => id !== currentUser.id)
              : [...comm.likedBy, currentUser.id],
          };
        }
        return comm;
      })
    );
  };

  const saveArticle = ({
    id,
    title,
    subtitle,
    content,
    coverImage,
    coverImageAlt,
    coverCaption,
    category,
    tags,
    isDraft,
  }: {
    id?: string;
    title: string;
    subtitle: string;
    content: string;
    coverImage: string;
    coverImageAlt?: string;
    coverCaption?: string;
    category: string;
    tags: string[];
    isDraft: boolean;
  }): Article => {
    if (!currentUser) {
      throw new Error('Must be logged in to create an article');
    }

    const wordCount = content.trim().split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    if (id) {
      // Update existing
      let updatedArticle: Article | null = null;
      setArticles((prev) =>
        prev.map((art) => {
          if (art.id === id) {
            updatedArticle = {
              ...art,
              title,
              subtitle,
              content,
              coverImage,
              coverImageAlt: coverImageAlt || title,
              coverCaption,
              category,
              tags,
              readTime,
              isDraft,
            };
            return updatedArticle;
          }
          return art;
        })
      );
      if (updatedArticle) return updatedArticle;
    }

    // Create new
    const newArticleId = `art-${Date.now()}`;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newArticle: Article = {
      id: newArticleId,
      slug: slug || `story-${Date.now()}`,
      title,
      subtitle,
      content,
      coverImage,
      coverImageAlt: coverImageAlt || title,
      coverCaption,
      category,
      tags: tags.length ? tags : ['General'],
      authorId: currentUser.id,
      author: {
        id: currentUser.id,
        name: currentUser.name,
        handle: currentUser.handle,
        avatar: currentUser.avatar,
        role: currentUser.role,
        bio: currentUser.bio,
      },
      publishedAt: 'Today',
      readTime,
      claps: 0,
      clappedBy: {},
      views: 1,
      isDraft,
      commentsCount: 0,
    };

    setArticles((prev) => [newArticle, ...prev]);
    return newArticle;
  };

  const deleteArticle = (articleId: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== articleId));
    setComments((prev) => prev.filter((c) => c.articleId !== articleId));
    if (selectedArticleId === articleId) {
      setSelectedArticleId(null);
      setCurrentView('feed');
    }
  };

  return (
    <BlogContext.Provider
      value={{
        currentUser,
        users,
        articles,
        comments,
        currentView,
        selectedArticleId,
        selectedProfileUserId,
        selectedCategory,
        searchQuery,
        fontPreference,
        fontSizePreference,
        isAuthModalOpen,
        shareModalArticle,
        editingArticle,
        setCurrentView,
        openArticle,
        openProfile,
        openEditor,
        openShareModal,
        closeShareModal,
        openAuthModal,
        closeAuthModal,
        login,
        registerUser,
        logout,
        updateProfile,
        toggleFollow,
        toggleBookmark,
        addClap,
        addComment,
        likeComment,
        saveArticle,
        deleteArticle,
        setFontPreference,
        setFontSizePreference,
        setSelectedCategory,
        setSearchQuery,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
