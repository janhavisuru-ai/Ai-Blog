export interface User {
  id: string;
  name: string;
  handle: string;
  email: string;
  avatar: string;
  bio: string;
  role: string;
  location?: string;
  website?: string;
  twitter?: string;
  joinedDate: string;
  followersCount: number;
  followingCount: number;
  followingUserIds: string[];
  bookmarkedArticleIds: string[];
}

export interface Comment {
  id: string;
  articleId: string;
  authorId: string;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
  likedBy: string[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  content: string;
  coverImage: string;
  coverImageAlt: string;
  coverCaption?: string;
  category: string;
  tags: string[];
  authorId: string;
  author: {
    id: string;
    name: string;
    handle: string;
    avatar: string;
    role: string;
    bio: string;
  };
  publishedAt: string;
  readTime: number;
  claps: number;
  clappedBy: Record<string, number>;
  views: number;
  isDraft: boolean;
  isFeatured?: boolean;
  commentsCount: number;
}

export type ViewMode = 'feed' | 'article' | 'editor' | 'profile' | 'reading-list' | 'topics';

export type FontPreference = 'serif' | 'sans';
export type FontSizePreference = 'sm' | 'base' | 'lg' | 'xl';
