import React, { useEffect, useState } from 'react';
import {
  AllContentItem,
  BookItem,
  ArticleItem,
  PamphletItem,
  AudioItem,
  VideoItem,
  CourseItem,
  TopicItem
} from '../types.ts';
import {
  getContentById,
  getTopicById,
  extractYouTubeId,
  getContentByTopic,
  resolveAssetUrl
} from '../services/dataService.ts';
import { typeConfig } from '../components/ContentCard.tsx';
import {
  ArrowLeft,
  BookOpen,
  Download,
  Share2,
  Calendar,
  User,
  Clock,
  Layers,
  FileText,
  Volume2,
  Video,
  CheckCircle,
  ExternalLink,
  ShieldAlert,
  GraduationCap
} from 'lucide-react';

interface ContentDetailPageProps {
  contentId: string;
  onNavigate: (route: string) => void;
}

export const ContentDetailPage: React.FC<ContentDetailPageProps> = ({
  contentId,
  onNavigate,
}) => {
  const [content, setContent] = useState<AllContentItem | null>(null);
  const [topic, setTopic] = useState<TopicItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedItems, setRelatedItems] = useState<AllContentItem[]>([]);
  const [copied, setCopied] = useState(false);
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    async function load() {
      try {
        const item = await getContentById(contentId);
        if (!isMounted) return;
        setContent(item);

        if (item) {
          const t = await getTopicById(item.topic);
          if (isMounted) setTopic(t || null);

          // Load related items
          const topicContent = await getContentByTopic(item.topic);
          const allRelated: AllContentItem[] = [
            ...topicContent.books,
            ...topicContent.articles,
            ...topicContent.pamphlets,
            ...topicContent.audios,
            ...topicContent.videos,
            ...topicContent.courses,
          ].filter((c) => c.id !== item.id);

          if (isMounted) setRelatedItems(allRelated.slice(0, 3));
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, [contentId]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: content?.title || 'মাকতাব আল হিদায়াহ',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-8 h-8 border-3 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 text-sm">কনটেন্ট লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200">
          <ShieldAlert className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-gray-800 mb-2 font-bengali">
            এই মুহূর্তে কোনো কনটেন্ট পাওয়া যায়নি।
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            অনুরোধকৃত কনটেন্ট আইডি ({contentId}) সঠিক নয় অথবা ডেটাবেজ থেকে সরানো হয়েছে।
          </p>
          <button
            onClick={() => onNavigate('#/')}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-lg text-sm font-medium transition-colors shadow-xs"
          >
            হোমে ফিরে যান
          </button>
        </div>
      </div>
    );
  }

  const conf = typeConfig[content.type] || typeConfig.book;
  const Icon = conf.icon;
  const youtubeId =
    content.type === 'video'
      ? extractYouTubeId((content as VideoItem).youtubeUrl)
      : content.type === 'course'
      ? extractYouTubeId(
          (content as CourseItem).lessons?.[activeLessonIndex]?.youtubeUrl ||
            (content as CourseItem).youtubeUrl ||
            ''
        )
      : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Back button and Topic Breadcrumb */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-600 hover:text-amber-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>পেছনে ফিরে যান</span>
        </button>

        <div className="flex items-center gap-2">
          {topic && (
            <button
              onClick={() => onNavigate(`#/topic?id=${topic.id}`)}
              className="text-xs bg-amber-50 text-amber-900 hover:bg-amber-100 font-semibold px-2.5 py-1 rounded-full border border-amber-200 transition-colors"
            >
              বিষয়: {topic.name}
            </button>
          )}
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-amber-800 bg-gray-100 px-2.5 py-1 rounded-full transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'কপি হয়েছে!' : 'শেয়ার'}</span>
          </button>
        </div>
      </div>

      {/* Main Content Box */}
      <article className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
        {/* Header Info */}
        <div className="p-6 sm:p-8 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${conf.bg} ${conf.color}`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{conf.label}</span>
            </span>

            {content.subtopic && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded font-medium">
                {content.subtopic}
              </span>
            )}

            {content.isDemo && (
              <span className="text-[11px] bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded font-medium ml-auto">
                ডেমো কনটেন্ট
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 font-bengali tracking-tight leading-snug">
            {content.title}
          </h1>

          {'arabicTitle' in content && (content as BookItem).arabicTitle && (
            <p className="font-arabic text-gray-900 text-lg sm:text-xl mb-4 font-semibold" dir="rtl">
              {(content as BookItem).arabicTitle}
            </p>
          )}

          {/* Metadata bar */}
          <div className="flex flex-wrap items-center gap-y-2.5 gap-x-5 text-xs sm:text-sm text-gray-600">
            {'author' in content && content.author && (
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-gray-400" />
                <span>লেখক: <strong className="font-medium text-gray-900">{content.author}</strong></span>
              </div>
            )}
            {'translator' in content && (content as BookItem).translator && (
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-gray-400" />
                <span>অনুবাদ: <strong className="font-medium text-gray-900">{(content as BookItem).translator}</strong></span>
              </div>
            )}
            {'editor' in content && (content as { editor?: string }).editor && (
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-gray-400" />
                <span>সম্পাদনা: <strong className="font-medium text-gray-900">{(content as { editor?: string }).editor}</strong></span>
              </div>
            )}
            {'publisher' in content && (content as BookItem).publisher && (
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-gray-400" />
                <span>প্রকাশক: <strong className="font-medium text-gray-900">{(content as BookItem).publisher}</strong></span>
              </div>
            )}
            {'speaker' in content && content.speaker && (
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-gray-400" />
                <span>আলোচক: <strong className="text-gray-900">{content.speaker}</strong></span>
              </div>
            )}
            {'instructor' in content && content.instructor && (
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-gray-400" />
                <span>প্রশিক্ষক: <strong className="text-gray-900">{content.instructor}</strong></span>
              </div>
            )}
            {'date' in content && content.date && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>{content.date}</span>
              </div>
            )}
            {'pages' in content && content.pages && (
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-gray-400" />
                <span>{content.pages} পৃষ্ঠা</span>
              </div>
            )}
            {'duration' in content && content.duration && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>সময়কাল: {content.duration}</span>
              </div>
            )}
          </div>
        </div>

        {/* Media / Player / Action Area */}
        <div className="p-6 sm:p-8 bg-gray-50/50 border-b border-gray-100">
          {/* VIDEO PLAYER (FOR VIDEO & COURSE) */}
          {(content.type === 'video' || content.type === 'course') && youtubeId && (
            <div className="mb-6">
              {content.type === 'course' && (content as CourseItem).lessons?.[activeLessonIndex] && (
                <div className="flex items-center justify-between mb-2 text-xs font-semibold text-amber-950 bg-amber-50 px-3.5 py-2 rounded-lg border border-amber-200">
                  <span className="flex items-center gap-1.5">
                    <Video className="w-4 h-4 text-amber-700 animate-pulse" />
                    <span>চলমান ভিডিও: {(content as CourseItem).lessons[activeLessonIndex].title}</span>
                  </span>
                  <span className="text-amber-800 font-mono text-[11px] bg-white px-2 py-0.5 rounded border border-amber-200">
                    পর্ব {activeLessonIndex + 1} / {(content as CourseItem).lessons.length}
                  </span>
                </div>
              )}
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-black shadow-inner">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=0`}
                  title={content.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          )}

          {/* AUDIO PLAYER */}
          {content.type === 'audio' && (
            <div className="mb-6 p-5 bg-white rounded-xl border border-gray-200 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 font-bengali">{content.title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      আলোচক: <strong className="text-gray-800 font-medium">{(content as AudioItem).speaker}</strong>
                      {(content as AudioItem).editor && (
                        <span> • সম্পাদনা: <strong className="text-gray-800 font-medium">{(content as AudioItem).editor}</strong></span>
                      )}
                    </p>
                  </div>
                </div>

                {(content as AudioItem).audioUrl && (
                  <a
                    href={resolveAssetUrl((content as AudioItem).audioUrl)}
                    download
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3.5 py-2 rounded-lg transition-colors shrink-0"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-700" />
                    <span>অডিও ডাউনলোড (MP3)</span>
                  </a>
                )}
              </div>
              <audio
                controls
                className="w-full h-11 accent-amber-600 focus:outline-none rounded-lg"
                preload="metadata"
              >
                <source src={resolveAssetUrl((content as AudioItem).audioUrl)} type="audio/mpeg" />
                আপনার ব্রাউজার অডিও প্লেয়ার সাপোর্ট করে না।
              </audio>
            </div>
          )}

          {/* BOOK / PAMPHLET ACTION BUTTONS */}
          {(content.type === 'book' || content.type === 'pamphlet') && (
            <div className="flex flex-wrap items-center gap-3">
              {(content as BookItem | PamphletItem).file ? (
                <a
                  href={resolveAssetUrl((content as BookItem | PamphletItem).file)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-sm font-semibold shadow-xs transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-amber-200" />
                  <span>অনলাইনে পড়ুন (PDF)</span>
                </a>
              ) : null}

              {(content as BookItem | PamphletItem).file ? (
                <a
                  href={resolveAssetUrl((content as BookItem | PamphletItem).file)}
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 text-sm font-semibold transition-colors"
                >
                  <Download className="w-4 h-4 text-amber-700" />
                  <span>ডাউনলোড করুন</span>
                </a>
              ) : null}
            </div>
          )}

          {/* COURSE LESSONS */}
          {content.type === 'course' && (content as CourseItem).lessons && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-gray-900 flex items-center gap-2 font-bengali">
                  <Layers className="w-4 h-4 text-amber-700" />
                  <span>কোর্সের পাঠ্যসূচি ({(content as CourseItem).lessons.length}টি পাঠ)</span>
                </h3>
                <span className="text-xs text-gray-500">পর্বে ক্লিক করে ভিডিও প্লে করুন</span>
              </div>
              <div className="space-y-2.5">
                {(content as CourseItem).lessons.map((lesson, idx) => {
                  const isActive = idx === activeLessonIndex;
                  return (
                    <div
                      key={lesson.lessonNumber}
                      onClick={() => setActiveLessonIndex(idx)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isActive
                          ? 'bg-amber-50/70 border-amber-500 shadow-2xs'
                          : 'bg-white hover:bg-gray-50 border-gray-200'
                      }`}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                            isActive
                              ? 'bg-amber-600 text-white'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {lesson.lessonNumber}
                        </div>
                        <div className="min-w-0">
                          <h4
                            className={`text-sm font-bold leading-snug font-bengali truncate ${
                              isActive ? 'text-amber-950 font-bold' : 'text-gray-900'
                            }`}
                          >
                            {lesson.title}
                          </h4>
                          {lesson.description && (
                            <p className="text-xs text-gray-600 mt-0.5 line-clamp-1">
                              {lesson.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        {lesson.duration && (
                          <span className="text-xs text-gray-400 font-mono hidden sm:inline">
                            {lesson.duration}
                          </span>
                        )}
                        {isActive ? (
                          <span className="text-[11px] bg-amber-600 text-white font-semibold px-2 py-0.5 rounded-md">
                            চলছে
                          </span>
                        ) : (
                          <span className="text-xs text-amber-800 font-medium hover:underline flex items-center gap-1">
                            ভিডিও দেখুন
                          </span>
                        )}
                        {lesson.youtubeUrl && (
                          <a
                            href={lesson.youtubeUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-gray-400 hover:text-red-600 p-1 transition-colors"
                            title="ইউটিউবে সরাসরি দেখুন"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Content Body / Description */}
        <div className="p-6 sm:p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3 font-bengali">
            বিস্তারিত বিবরণ
          </h2>
          <div className="text-sm sm:text-base text-gray-700 leading-relaxed space-y-4 whitespace-pre-line">
            {content.description}
          </div>

          {/* Table of Contents if available for Books */}
          {'tableOfContents' in content && (content as BookItem).tableOfContents && (content as BookItem).tableOfContents!.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-base font-bold text-gray-900 mb-3.5 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-700" />
                <span>পুস্তিকার সূচিপত্র (Table of Contents)</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(content as BookItem).tableOfContents!.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-gray-50 hover:bg-amber-50/60 rounded-xl border border-gray-200/80 flex items-center justify-between transition-colors text-xs sm:text-sm"
                  >
                    <span className="font-medium text-gray-900">{item.title}</span>
                    <span className="text-amber-900 font-semibold bg-amber-100/80 px-2 py-0.5 rounded text-xs shrink-0 ml-2">
                      পৃ. {item.page}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chapters Summary if available */}
          {'chaptersSummary' in content && (content as BookItem).chaptersSummary && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span>মূল বিষয়বস্তু ও সারসংক্ষেপ</span>
              </h3>
              <div className="p-5 bg-amber-50/40 rounded-xl border border-amber-200 text-xs sm:text-sm text-gray-800 leading-relaxed whitespace-pre-line font-bengali">
                {(content as BookItem).chaptersSummary}
              </div>
            </div>
          )}

          {/* Full article content if available */}
          {'content' in content && (content as ArticleItem).content && (
            <div className="mt-6 pt-6 border-t border-gray-100 text-sm sm:text-base text-gray-800 leading-relaxed space-y-4 whitespace-pre-line font-bengali">
              {(content as ArticleItem).content}
            </div>
          )}

          {/* Authentic references list */}
          {content.references && content.references.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-amber-700" />
                <span>প্রামাণ্য তথ্যসূত্র ও গ্রন্থপঞ্জি</span>
              </h3>
              <div className="space-y-2">
                {content.references.map((ref, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-amber-50/40 rounded-lg border border-amber-200 text-xs sm:text-sm text-gray-700 flex items-center justify-between"
                  >
                    <div>
                      <strong className="text-amber-950 font-semibold">{ref.title}</strong>
                      <span className="text-gray-500 ml-2">[{ref.source}]</span>
                    </div>
                    {ref.url && (
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-amber-800 hover:text-amber-950 inline-flex items-center gap-1 text-xs font-semibold"
                      >
                        <span>উৎস দেখুন</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Keywords / Tags */}
          {content.keywords && content.keywords.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-400 font-semibold mr-1">ট্যাগসমূহ:</span>
              {content.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded-md transition-colors"
                >
                  #{kw}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>

      {/* Related Content Section */}
      {relatedItems.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-bold text-gray-900 mb-4 font-bengali">
            সম্পর্কিত আরও রিসোর্স
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigate(`#/content?id=${item.id}`)}
                className="p-4 bg-white rounded-xl border border-gray-200 hover:border-amber-600 transition-all cursor-pointer group"
              >
                <span className="text-[11px] font-semibold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {typeConfig[item.type]?.label || item.type}
                </span>
                <h4 className="text-sm font-bold text-gray-900 group-hover:text-amber-800 mt-2 mb-1 line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
