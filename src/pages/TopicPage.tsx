import React, { useEffect, useState } from 'react';
import {
  TopicItem,
  BookItem,
  ArticleItem,
  PamphletItem,
  AudioItem,
  VideoItem,
  CourseItem,
  QnAItem,
  ContentType
} from '../types.ts';
import { getTopicById, getContentByTopic } from '../services/dataService.ts';
import { ContentCard } from '../components/ContentCard.tsx';
import {
  ArrowLeft,
  BookOpen,
  FileText,
  Volume2,
  Video,
  GraduationCap,
  Sparkles,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

interface TopicPageProps {
  topicId: string;
  onNavigate: (route: string) => void;
  onOpenContent: (id: string) => void;
}

export const TopicPage: React.FC<TopicPageProps> = ({
  topicId,
  onNavigate,
  onOpenContent,
}) => {
  const [topic, setTopic] = useState<TopicItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | ContentType>('all');

  const [books, setBooks] = useState<BookItem[]>([]);
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [pamphlets, setPamphlets] = useState<PamphletItem[]>([]);
  const [audios, setAudios] = useState<AudioItem[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [qnas, setQnas] = useState<QnAItem[]>([]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    async function load() {
      try {
        const t = await getTopicById(topicId);
        if (!isMounted) return;
        setTopic(t || null);

        const data = await getContentByTopic(topicId);
        if (!isMounted) return;
        setBooks(data.books);
        setArticles(data.articles);
        setPamphlets(data.pamphlets);
        setAudios(data.audios);
        setVideos(data.videos);
        setCourses(data.courses);
        setQnas(data.qnas);
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
  }, [topicId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-8 h-8 border-3 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 text-sm">বিষয়ভিত্তিক রিসোর্স প্রস্তুত হচ্ছে...</p>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-gray-800 mb-2 font-bengali">
            বিষয়টি খুঁজে পাওয়া যায়নি
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            অনুরোধকৃত বিষয় ({topicId}) ডেটাবেজে তালিকাভুক্ত নেই।
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

  const totalContentCount =
    books.length +
    articles.length +
    pamphlets.length +
    audios.length +
    videos.length +
    courses.length +
    qnas.length;

  const filterTabs = [
    { id: 'all', label: 'সব', count: totalContentCount, icon: null },
    { id: 'book', label: 'বই', count: books.length, icon: BookOpen },
    { id: 'article', label: 'প্রবন্ধ', count: articles.length, icon: FileText },
    { id: 'pamphlet', label: 'পাম্ফলেট', count: pamphlets.length, icon: Sparkles },
    { id: 'audio', label: 'অডিও', count: audios.length, icon: Volume2 },
    { id: 'video', label: 'ভিডিও', count: videos.length, icon: Video },
    { id: 'course', label: 'কোর্স', count: courses.length, icon: GraduationCap },
    { id: 'qna', label: 'প্রশ্নোত্তর', count: qnas.length, icon: HelpCircle },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Back button */}
      <button
        onClick={() => onNavigate('#/')}
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-600 hover:text-amber-800 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>হোমপেজে ফিরে যান</span>
      </button>

      {/* Topic Header Banner */}
      <div className="bg-gradient-to-r from-amber-800 via-amber-900 to-amber-950 text-white rounded-2xl p-6 sm:p-10 mb-8 shadow-sm border border-amber-700/50">
        <div className="max-w-3xl">
          {topic.arabic && (
            <span className="font-arabic text-xl sm:text-2xl text-amber-300 font-bold block mb-2">
              {topic.arabic}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3 font-bengali">
            {topic.name}
          </h1>
          <p className="text-sm sm:text-base text-amber-100 leading-relaxed mb-4">
            {topic.description}
          </p>
          <div className="inline-flex items-center gap-2 bg-amber-950/60 border border-amber-500/40 px-3 py-1 rounded-full text-xs text-amber-200">
            <span>মোট রিসোর্স:</span>
            <strong className="text-white">{totalContentCount} টি</strong>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
        {filterTabs.map((tab) => {
          const active = filter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                active
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-xs font-semibold'
                  : 'bg-gray-100 hover:bg-amber-50 text-gray-700 hover:text-amber-900'
              }`}
            >
              {tab.icon && <tab.icon className="w-3.5 h-3.5" />}
              <span>{tab.label}</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                  active ? 'bg-amber-800 text-amber-100' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Empty State */}
      {totalContentCount === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200">
          <p className="text-gray-600 text-sm">
            এই বিষয়ে এখনও কোনো রিসোর্স যুক্ত করা হয়নি। অতি শীঘ্রই ইনশাআল্লাহ নতুন কনটেন্ট যুক্ত করা হবে।
          </p>
        </div>
      )}

      {/* Content Sections */}
      <div className="space-y-12">
        {/* BOOKS SECTION */}
        {(filter === 'all' || filter === 'book') && books.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-bengali">
              <span className="text-amber-700">📖</span>
              <span>বইসমূহ ({books.length})</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {books.map((b) => (
                <ContentCard
                  key={b.id}
                  item={b}
                  onOpen={onOpenContent}
                  topicName={topic.name}
                />
              ))}
            </div>
          </div>
        )}

        {/* ARTICLES SECTION */}
        {(filter === 'all' || filter === 'article') && articles.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-bengali">
              <span className="text-teal-700">📝</span>
              <span>প্রবন্ধসমূহ ({articles.length})</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {articles.map((a) => (
                <ContentCard
                  key={a.id}
                  item={a}
                  onOpen={onOpenContent}
                  topicName={topic.name}
                />
              ))}
            </div>
          </div>
        )}

        {/* PAMPHLETS SECTION */}
        {(filter === 'all' || filter === 'pamphlet') && pamphlets.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-bengali">
              <span className="text-amber-700">📄</span>
              <span>পাম্ফলেট ও লিফলেট ({pamphlets.length})</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {pamphlets.map((p) => (
                <ContentCard
                  key={p.id}
                  item={p}
                  onOpen={onOpenContent}
                  topicName={topic.name}
                />
              ))}
            </div>
          </div>
        )}

        {/* AUDIO SECTION */}
        {(filter === 'all' || filter === 'audio') && audios.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-bengali">
              <span className="text-cyan-700">🎧</span>
              <span>অডিও লেকচার ({audios.length})</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {audios.map((au) => (
                <ContentCard
                  key={au.id}
                  item={au}
                  onOpen={onOpenContent}
                  topicName={topic.name}
                />
              ))}
            </div>
          </div>
        )}

        {/* VIDEO SECTION */}
        {(filter === 'all' || filter === 'video') && videos.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-bengali">
              <span className="text-rose-700">🎥</span>
              <span>ভিডিও রিসোর্স ({videos.length})</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {videos.map((v) => (
                <ContentCard
                  key={v.id}
                  item={v}
                  onOpen={onOpenContent}
                  topicName={topic.name}
                />
              ))}
            </div>
          </div>
        )}

        {/* COURSE SECTION */}
        {(filter === 'all' || filter === 'course') && courses.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-bengali">
              <span className="text-indigo-700">🎓</span>
              <span>ধারাবাহিক কোর্স ({courses.length})</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {courses.map((c) => (
                <ContentCard
                  key={c.id}
                  item={c}
                  onOpen={onOpenContent}
                  topicName={topic.name}
                />
              ))}
            </div>
          </div>
        )}

        {/* Q&A SECTION */}
        {(filter === 'all' || filter === 'qna') && qnas.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-bengali">
              <span className="text-blue-700">❓</span>
              <span>প্রশ্নোত্তর ({qnas.length})</span>
            </h2>
            <div className="space-y-4">
              {qnas.map((q) => (
                <div
                  key={q.id}
                  className="p-5 bg-white rounded-xl border border-gray-200 hover:border-amber-600 transition-colors"
                >
                  <h3 className="text-base font-bold text-gray-900 mb-2 font-bengali">
                    {q.question}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-3">
                    {q.answer}
                  </p>
                  {q.references && q.references.length > 0 && (
                    <div className="text-xs text-gray-500 flex flex-wrap gap-2">
                      <span className="font-semibold text-gray-600">দলীল:</span>
                      {q.references.map((r, i) => (
                        <span key={i} className="bg-gray-100 px-2 py-0.5 rounded">
                          {r.title} ({r.source})
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
