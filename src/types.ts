export interface ContentReference {
  title: string;
  source: string;
  url?: string;
}

export interface Lesson {
  lessonNumber: number;
  title: string;
  duration?: string;
  description?: string;
  youtubeUrl?: string;
}

export type ContentType = 'book' | 'article' | 'pamphlet' | 'audio' | 'video' | 'course' | 'qna';

export interface BaseContentItem {
  id: string;
  title: string;
  englishTitle?: string;
  type: ContentType;
  topic: string;
  subtopic?: string;
  description: string;
  keywords: string[];
  tags?: string[];
  relatedTopics?: string[];
  references?: ContentReference[];
  isDemo?: boolean;
}

export interface BookItem extends BaseContentItem {
  type: 'book';
  author: string;
  translator?: string;
  editor?: string;
  publisher?: string;
  pages?: number;
  language?: string;
  thumbnail?: string;
  file?: string;
  url?: string;
  arabicTitle?: string;
  tableOfContents?: { page: number | string; title: string }[];
  chaptersSummary?: string;
}

export interface ArticleItem extends BaseContentItem {
  type: 'article';
  author: string;
  date: string;
  readTime?: string;
  content: string;
}

export interface PamphletItem extends BaseContentItem {
  type: 'pamphlet';
  author?: string;
  pages?: number;
  file?: string;
  url?: string;
}

export interface AudioItem extends BaseContentItem {
  type: 'audio';
  speaker: string;
  editor?: string;
  duration?: string;
  audioUrl: string;
}

export interface VideoItem extends BaseContentItem {
  type: 'video';
  speaker?: string;
  duration?: string;
  youtubeUrl: string;
}

export interface CourseItem extends BaseContentItem {
  type: 'course';
  instructor: string;
  duration?: string;
  level?: string;
  youtubeUrl?: string;
  lessons: Lesson[];
}

export interface QnAItem {
  id: string;
  question: string;
  answer: string;
  topic: string;
  subtopic?: string;
  keywords: string[];
  relatedKeywords?: string[];
  references?: ContentReference[];
  relatedContentIds?: string[];
  isDemo?: boolean;
}

export type AllContentItem = BookItem | ArticleItem | PamphletItem | AudioItem | VideoItem | CourseItem;

export interface TopicItem {
  id: string;
  name: string;
  arabic?: string;
  english?: string;
  icon?: string;
  description: string;
  color?: string;
  order: number;
}

export interface SiteConfig {
  siteName: string;
  siteNameEnglish: string;
  siteNameArabic?: string;
  tagline: string;
  motto: string;
  description: string;
  logo?: string;
  logoFull?: string;
  contact: {
    email: string;
    phone: string;
    location: string;
    facebook: string;
    youtube: string;
    telegram?: string;
  };
  navLinks: Array<{ id: string; label: string; path: string }>;
  footer: {
    aboutText: string;
    copyright: string;
  };
}

export interface SearchResults {
  query: string;
  books: BookItem[];
  articles: ArticleItem[];
  pamphlets: PamphletItem[];
  audios: AudioItem[];
  videos: VideoItem[];
  courses: CourseItem[];
  qnas: QnAItem[];
  topics: TopicItem[];
  totalCount: number;
}
