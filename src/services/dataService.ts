import {
  SiteConfig,
  TopicItem,
  BookItem,
  ArticleItem,
  PamphletItem,
  AudioItem,
  VideoItem,
  CourseItem,
  QnAItem,
  AllContentItem,
  SearchResults
} from '../types.ts';

// In-memory cache
interface DataCache {
  siteConfig: SiteConfig | null;
  topics: TopicItem[] | null;
  books: BookItem[] | null;
  articles: ArticleItem[] | null;
  pamphlets: PamphletItem[] | null;
  audios: AudioItem[] | null;
  videos: VideoItem[] | null;
  courses: CourseItem[] | null;
  qnas: QnAItem[] | null;
}

const cache: DataCache = {
  siteConfig: null,
  topics: null,
  books: null,
  articles: null,
  pamphlets: null,
  audios: null,
  videos: null,
  courses: null,
  qnas: null,
};

async function fetchJson<T>(filename: string): Promise<T> {
  const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/?$/, '/');
  const paths = [
    `${baseUrl}data/${filename}`,
    `/data/${filename}`,
    `./data/${filename}`,
    `data/${filename}`
  ];

  let lastError: Error | null = null;
  for (const path of paths) {
    try {
      const response = await fetch(path);
      if (response.ok) {
        const data = await response.json();
        return data as T;
      }
    } catch (err) {
      lastError = err as Error;
    }
  }

  console.warn(`Could not fetch ${filename} from local paths:`, lastError);
  throw new Error(`Failed to load ${filename}`);
}

export async function getSiteConfig(): Promise<SiteConfig> {
  if (cache.siteConfig) return cache.siteConfig;
  try {
    const data = await fetchJson<SiteConfig>('site.json');
    cache.siteConfig = data;
    return data;
  } catch {
    // Sensible fallback
    const fallback: SiteConfig = {
      siteName: "মাকতাব আল হিদায়াহ",
      siteNameEnglish: "Maktab Al Hidayah",
      siteNameArabic: "مَكْتَبُ الْهِدَايَةِ",
      tagline: "কুরআন ও সহিহ সুন্নাহর আলোকে ইসলামের শিক্ষা",
      motto: "আমাদের কথা নয়—দলীলের কথা",
      description: "কুরআন ও সহিহ সুন্নাহর আলোকে ইসলামের নির্ভরযোগ্য জ্ঞান ও রিসোর্স লাইব্রেরি।",
      contact: {
        email: "contact@maktabalhidayah.org",
        phone: "+880 1XXXXXXXXX",
        location: "ঢাকা, বাংলাদেশ",
        facebook: "https://facebook.com",
        youtube: "https://youtube.com"
      },
      navLinks: [
        { id: "home", label: "হোম", path: "#/" },
        { id: "about", label: "আমাদের সম্পর্কে", path: "#/about" },
        { id: "books", label: "বই", path: "#/books" },
        { id: "articles", label: "প্রবন্ধ", path: "#/articles" },
        { id: "audio", label: "অডিও", path: "#/audio" },
        { id: "videos", label: "ভিডিও", path: "#/videos" },
        { id: "pamphlets", label: "পাম্ফলেট", path: "#/pamphlets" },
        { id: "courses", label: "কোর্স", path: "#/courses" },
        { id: "qna", label: "প্রশ্নোত্তর", path: "#/qna" },
        { id: "sadqah", label: "সদকায়ে জারিয়া", path: "#/sadqah" },
        { id: "contact", label: "যোগাযোগ", path: "#/contact" }
      ],
      footer: {
        aboutText: "মাকতাব আল হিদায়াহ একটি দ্বীনি শিক্ষা ও দাওয়াহ উদ্যোগ।",
        copyright: "© Maktab Al Hidayah. সর্বস্বত্ব সংরক্ষিত।"
      }
    };
    cache.siteConfig = fallback;
    return fallback;
  }
}

export async function getTopics(): Promise<TopicItem[]> {
  if (cache.topics) return cache.topics;
  try {
    const data = await fetchJson<TopicItem[]>('topics.json');
    cache.topics = data;
    return data;
  } catch {
    return [];
  }
}

export async function getTopicById(id: string): Promise<TopicItem | undefined> {
  const topics = await getTopics();
  const normalized = id.toLowerCase().trim();

  // Direct ID match
  const found = topics.find((t) => t.id.toLowerCase() === normalized);
  if (found) return found;

  // Alias / legacy ID fallback mapping
  const aliases: Record<string, string> = {
    tawheed: 'aqeedah',
    salah: 'fiqh',
    prayer: 'fiqh',
    tafsir: 'quran',
    tafseer: 'quran',
    akhlaq: 'adab',
    dua: 'dua-dhikr',
    dhikr: 'dua-dhikr',
    zikr: 'dua-dhikr',
    misc: 'miscellaneous',
    general: 'miscellaneous',
  };

  if (aliases[normalized]) {
    const aliasMatch = topics.find((t) => t.id.toLowerCase() === aliases[normalized]);
    if (aliasMatch) return aliasMatch;
  }

  // Name match (Bengali or English)
  return topics.find(
    (t) =>
      t.name.toLowerCase() === normalized ||
      t.english?.toLowerCase() === normalized ||
      t.name.replace(/\s+/g, '') === normalized.replace(/\s+/g, '')
  );
}

export async function getBooks(): Promise<BookItem[]> {
  if (cache.books) return cache.books;
  try {
    const data = await fetchJson<BookItem[]>('books.json');
    cache.books = data;
    return data;
  } catch {
    return [];
  }
}

export async function getArticles(): Promise<ArticleItem[]> {
  if (cache.articles) return cache.articles;
  try {
    const data = await fetchJson<ArticleItem[]>('articles.json');
    cache.articles = data;
    return data;
  } catch {
    return [];
  }
}

export async function getPamphlets(): Promise<PamphletItem[]> {
  if (cache.pamphlets) return cache.pamphlets;
  try {
    const data = await fetchJson<PamphletItem[]>('pamphlets.json');
    cache.pamphlets = data;
    return data;
  } catch {
    return [];
  }
}

export async function getAudios(): Promise<AudioItem[]> {
  if (cache.audios) return cache.audios;
  try {
    const data = await fetchJson<AudioItem[]>('audios.json');
    cache.audios = data;
    return data;
  } catch {
    return [];
  }
}

export async function getVideos(): Promise<VideoItem[]> {
  if (cache.videos) return cache.videos;
  try {
    const data = await fetchJson<VideoItem[]>('videos.json');
    cache.videos = data;
    return data;
  } catch {
    return [];
  }
}

export async function getCourses(): Promise<CourseItem[]> {
  if (cache.courses) return cache.courses;
  try {
    const data = await fetchJson<CourseItem[]>('courses.json');
    cache.courses = data;
    return data;
  } catch {
    return [];
  }
}

export async function getQnAs(): Promise<QnAItem[]> {
  if (cache.qnas) return cache.qnas;
  try {
    const data = await fetchJson<QnAItem[]>('qna.json');
    cache.qnas = data;
    return data;
  } catch {
    return [];
  }
}

export async function getAllContent(): Promise<AllContentItem[]> {
  const [books, articles, pamphlets, audios, videos, courses] = await Promise.all([
    getBooks(),
    getArticles(),
    getPamphlets(),
    getAudios(),
    getVideos(),
    getCourses()
  ]);
  return [...books, ...articles, ...pamphlets, ...audios, ...videos, ...courses];
}

export async function getContentById(id: string): Promise<AllContentItem | null> {
  const all = await getAllContent();
  return all.find((item) => item.id.toLowerCase() === id.toLowerCase()) || null;
}

export async function getContentByTopic(topicId: string) {
  const normalized = topicId.toLowerCase().trim();
  const topicObj = await getTopicById(normalized);
  const canonicalId = topicObj?.id.toLowerCase() || normalized;

  const [books, articles, pamphlets, audios, videos, courses, qnas] = await Promise.all([
    getBooks(),
    getArticles(),
    getPamphlets(),
    getAudios(),
    getVideos(),
    getCourses(),
    getQnAs()
  ]);

  const targetIds = new Set([normalized, canonicalId]);
  if (canonicalId === 'aqeedah') targetIds.add('tawheed');
  if (canonicalId === 'fiqh') {
    targetIds.add('salah');
    targetIds.add('prayer');
  }

  const matchesTopic = (item: { topic: string; relatedTopics?: string[] }) => {
    const itemTopic = item.topic.toLowerCase();
    if (targetIds.has(itemTopic)) return true;
    if (item.relatedTopics?.some((rt) => targetIds.has(rt.toLowerCase()))) return true;
    return false;
  };

  return {
    books: books.filter(matchesTopic),
    articles: articles.filter(matchesTopic),
    pamphlets: pamphlets.filter(matchesTopic),
    audios: audios.filter(matchesTopic),
    videos: videos.filter(matchesTopic),
    courses: courses.filter(matchesTopic),
    qnas: qnas.filter(matchesTopic),
  };
}

/**
 * Normalizes Bengali and Unicode characters, removes punctuation and virama/hasanta
 * to allow fuzzy and resilient matching between different spelling variants.
 */
export function normalizeBengaliText(text: string): string {
  if (!text) return '';
  let str = text.toLowerCase();
  // Normalize Bengali characters
  str = str.replace(/\u09df/g, '\u09af\u09bc'); // য়
  str = str.replace(/\u09dc/g, '\u09a1\u09bc'); // ড়
  str = str.replace(/\u09dd/g, '\u09a2\u09bc'); // ঢ়
  // Normalize quotes and punctuation
  str = str.replace(/[‘'’`"“”—–\-()[\]{}«»]/g, ' ');
  str = str.replace(/[?!.,;:/\\]/g, ' ');
  str = str.replace(/[।]/g, ' '); // Dari
  // Remove virama / hasanta (\u09cd) so আল্লাহ্ matches আল্লাহ, কোন্্টি matches কোনটি
  str = str.replace(/\u09cd/g, '');
  return str.replace(/\s+/g, ' ').trim();
}

const BENGALI_STOPWORDS = new Set([
  'কি', 'কী', 'কয়টি', 'কয়টি', 'কত', 'কোনটি', 'কোন্্টি', 'কেমন', 'কেন',
  'কোথায়', 'কোথায়', 'কে', 'কাকে', 'বলে', 'সম্পর্কে', 'বলা', 'হয়', 'হয়',
  'আছে', 'নাকি', 'এর', 'এবং', 'বা', 'হচ্ছে', 'হলে', 'থেকে', 'দ্বারা',
  'কিভাবে', 'কীভাবে', 'একটি', 'করে', 'করা', 'যায়', 'যায়', 'হবে', 'পারে',
  'না', 'নয়', 'নয়', 'ও', 'উপর', 'জন্য', 'তা', 'কীসের', 'কিসের'
]);

/**
 * Pure local search strictly matching stored fields.
 * Does NOT access internet or invent AI answers.
 */
export async function searchLocalData(query: string): Promise<SearchResults> {
  const cleanQuery = query.trim();
  if (!cleanQuery) {
    return {
      query: '',
      books: [],
      articles: [],
      pamphlets: [],
      audios: [],
      videos: [],
      courses: [],
      qnas: [],
      topics: [],
      totalCount: 0
    };
  }

  const normQuery = normalizeBengaliText(cleanQuery);
  const queryTerms = normQuery.split(/\s+/).filter(Boolean);

  const itemMatches = (item: any): boolean => {
    const fieldsToSearch: string[] = [
      item.title || '',
      item.englishTitle || '',
      item.description || '',
      item.topic || '',
      item.subtopic || '',
      item.author || '',
      item.speaker || '',
      item.instructor || '',
      ...(Array.isArray(item.keywords) ? item.keywords : []),
      ...(Array.isArray(item.relatedKeywords) ? item.relatedKeywords : []),
      ...(Array.isArray(item.tags) ? item.tags : []),
      ...(Array.isArray(item.relatedTopics) ? item.relatedTopics : []),
      ...(Array.isArray(item.references) ? item.references.map((r: any) => `${r.title} ${r.source}`) : [])
    ];

    const combinedText = normalizeBengaliText(fieldsToSearch.join(' '));
    return queryTerms.every((term) => combinedText.includes(term));
  };

  const [books, articles, pamphlets, audios, videos, courses, qnas, topics] = await Promise.all([
    getBooks(),
    getArticles(),
    getPamphlets(),
    getAudios(),
    getVideos(),
    getCourses(),
    getQnAs(),
    getTopics()
  ]);

  const matchedBooks = books.filter(itemMatches);
  const matchedArticles = articles.filter(itemMatches);
  const matchedPamphlets = pamphlets.filter(itemMatches);
  const matchedAudios = audios.filter(itemMatches);
  const matchedVideos = videos.filter(itemMatches);
  const matchedCourses = courses.filter(itemMatches);
  
  // Use smart grounded scoring for QnAs in general search
  const qnaSearchRes = await searchGroundedQnA(cleanQuery);
  const matchedQnAs = qnaSearchRes.exactMatches;

  const matchedTopics = topics.filter((t) => {
    const text = normalizeBengaliText(`${t.name} ${t.arabic || ''} ${t.english || ''} ${t.description}`);
    return queryTerms.every((term) => text.includes(term));
  });

  const totalCount =
    matchedBooks.length +
    matchedArticles.length +
    matchedPamphlets.length +
    matchedAudios.length +
    matchedVideos.length +
    matchedCourses.length +
    matchedQnAs.length +
    matchedTopics.length;

  return {
    query,
    books: matchedBooks,
    articles: matchedArticles,
    pamphlets: matchedPamphlets,
    audios: matchedAudios,
    videos: matchedVideos,
    courses: matchedCourses,
    qnas: matchedQnAs,
    topics: matchedTopics,
    totalCount
  };
}

/**
 * Data-Grounded Q&A Search
 * Strictly searches stored authentic qna.json and content data.
 * Features Bengali-aware normalization, stopword filtering, and ranking.
 * NEVER invents or synthesizes religious rulings.
 */
export async function searchGroundedQnA(query: string): Promise<{
  exactMatches: QnAItem[];
  relatedContent: AllContentItem[];
  hasResults: boolean;
  topScore?: number;
}> {
  const cleanQuery = query.trim();
  if (!cleanQuery) {
    return { exactMatches: [], relatedContent: [], hasResults: false };
  }

  const normQuery = normalizeBengaliText(cleanQuery);
  const allTokens = normQuery.split(/\s+/).filter(Boolean);
  const contentTokens = allTokens.filter((t) => !BENGALI_STOPWORDS.has(t));
  const activeTokens = contentTokens.length > 0 ? contentTokens : allTokens;

  const qnas = await getQnAs();
  const scoredItems: { score: number; item: QnAItem }[] = [];

  for (const q of qnas) {
    let score = 0;
    const normQuestion = normalizeBengaliText(q.question);
    const normAnswer = normalizeBengaliText(q.answer);
    const normSubtopic = normalizeBengaliText(q.subtopic || '');
    const normKeywords = normalizeBengaliText(
      [...(q.keywords || []), ...(q.relatedKeywords || [])].join(' ')
    );

    // Exact query or phrase match in question title
    if (normQuestion.includes(normQuery)) {
      score += 120;
    }

    // Match each content token
    for (const token of activeTokens) {
      if (normQuestion.includes(token)) {
        score += 45;
      } else if (normKeywords.includes(token)) {
        score += 25;
      } else if (normSubtopic.includes(token)) {
        score += 15;
      } else if (normAnswer.includes(token)) {
        score += 8;
      }
    }

    // Proportion of question tokens present in query
    const qWords = normQuestion.split(/\s+/).filter((w) => !BENGALI_STOPWORDS.has(w));
    if (qWords.length > 0) {
      const matchCount = qWords.filter((w) => allTokens.includes(w)).length;
      score += (matchCount / qWords.length) * 35;
    }

    // Only include if meaningful keywords matched
    if (score >= 15) {
      scoredItems.push({ score, item: q });
    }
  }

  // Sort by highest score first
  scoredItems.sort((a, b) => b.score - a.score);
  const exactMatches = scoredItems.map((s) => s.item);
  const topScore = scoredItems.length > 0 ? scoredItems[0].score : 0;

  // If exact or keyword matched in Q&A, find any related content items referenced
  let relatedContent: AllContentItem[] = [];
  if (exactMatches.length > 0) {
    const relatedIds = exactMatches.flatMap((m) => m.relatedContentIds || []);
    if (relatedIds.length > 0) {
      const allContent = await getAllContent();
      const uniqueIds = Array.from(new Set(relatedIds));
      relatedContent = allContent.filter((c) => uniqueIds.includes(c.id));
    }
  } else {
    // If no direct Q&A, see if there is stored content strictly matching the topic/keywords
    const allContent = await getAllContent();
    relatedContent = allContent.filter((item) => {
      const text = normalizeBengaliText([
        item.title,
        item.topic,
        item.subtopic || '',
        ...(item.keywords || [])
      ].join(' '));
      return activeTokens.every((term) => text.includes(term));
    });
  }

  const hasResults = exactMatches.length > 0 || relatedContent.length > 0;
  return {
    exactMatches,
    relatedContent,
    hasResults,
    topScore
  };
}

export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  return match ? match[1] : null;
}
