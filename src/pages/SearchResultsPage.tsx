import React, { useEffect, useState } from 'react';
import { SearchResults, TopicItem } from '../types.ts';
import { searchLocalData, getTopics } from '../services/dataService.ts';
import { ContentCard } from '../components/ContentCard.tsx';
import {
  Search,
  BookOpen,
  FileText,
  Volume2,
  Video,
  GraduationCap,
  Sparkles,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

interface SearchResultsPageProps {
  query: string;
  onOpenContent: (id: string) => void;
  onSearchNew: (newQuery: string) => void;
}

export const SearchResultsPage: React.FC<SearchResultsPageProps> = ({
  query,
  onOpenContent,
  onSearchNew,
}) => {
  const [results, setResults] = useState<SearchResults | null>(null);
  const [topics, setTopics] = useState<TopicItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(query);

  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  useEffect(() => {
    let isMounted = true;
    async function runSearch() {
      setLoading(true);
      try {
        const [res, topList] = await Promise.all([
          searchLocalData(query),
          getTopics(),
        ]);
        if (isMounted) {
          setResults(res);
          setTopics(topList);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    runSearch();
    return () => {
      isMounted = false;
    };
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchNew(searchInput.trim());
    }
  };

  const getTopicName = (topicId: string) => {
    return topics.find((t) => t.id === topicId)?.name || topicId;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Search Header Form */}
      <div className="max-w-2xl mx-auto text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 font-bengali">
          অনুসন্ধানের ফলাফল
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          মাকতাব আল হিদায়াহর সংরক্ষিত স্থানীয় তথ্যভাণ্ডারে অনুসন্ধানকৃত ফলাফল
        </p>

        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="অনুসন্ধান করুন..."
            className="w-full bg-white text-gray-900 text-sm sm:text-base rounded-full pl-11 pr-28 py-3 border border-gray-300 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-200 shadow-xs"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm px-4 py-2 rounded-full font-medium transition-colors"
          >
            পুনরায় খুঁজুন
          </button>
        </form>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="w-8 h-8 border-3 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">তথ্যভাণ্ডারে অনুসন্ধান চলছে...</p>
        </div>
      ) : !results || results.totalCount === 0 ? (
        <div className="max-w-xl mx-auto text-center py-16 px-6 bg-gray-50 rounded-2xl border border-gray-200">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-gray-900 mb-1 font-bengali">
            "{query}" এর জন্য কোনো তথ্য পাওয়া যায়নি
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            মাকতাব আল হিদায়াহ সংরক্ষিত ডেটার বাইরে ইন্টারনেট বা কৃত্রিম বুদ্ধিমত্তা ব্যবহার করে কোনো মনগড়া ফলাফল তৈরি করে না। অনুগ্রহ করে ভিন্ন কোনো শব্দ বা বিষয় লিখে চেষ্টা করুন।
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          {/* Summary Pills Bar */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm font-semibold text-amber-950">
              "{query}" সংক্রান্ত মোট <strong className="text-amber-800">{results.totalCount} টি</strong> ফলাফল পাওয়া গেছে:
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
              {results.books.length > 0 && (
                <span className="bg-white px-2.5 py-1 rounded-md border border-gray-200 text-gray-800">
                  বই ({results.books.length})
                </span>
              )}
              {results.articles.length > 0 && (
                <span className="bg-white px-2.5 py-1 rounded-md border border-gray-200 text-gray-800">
                  প্রবন্ধ ({results.articles.length})
                </span>
              )}
              {results.pamphlets.length > 0 && (
                <span className="bg-white px-2.5 py-1 rounded-md border border-gray-200 text-gray-800">
                  পাম্ফলেট ({results.pamphlets.length})
                </span>
              )}
              {results.audios.length > 0 && (
                <span className="bg-white px-2.5 py-1 rounded-md border border-gray-200 text-gray-800">
                  অডিও ({results.audios.length})
                </span>
              )}
              {results.videos.length > 0 && (
                <span className="bg-white px-2.5 py-1 rounded-md border border-gray-200 text-gray-800">
                  ভিডিও ({results.videos.length})
                </span>
              )}
              {results.courses.length > 0 && (
                <span className="bg-white px-2.5 py-1 rounded-md border border-gray-200 text-gray-800">
                  কোর্স ({results.courses.length})
                </span>
              )}
              {results.qnas.length > 0 && (
                <span className="bg-white px-2.5 py-1 rounded-md border border-gray-200 text-gray-800">
                  প্রশ্নোত্তর ({results.qnas.length})
                </span>
              )}
            </div>
          </div>

          {/* Grouped results: Books */}
          {results.books.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-bengali">
                <BookOpen className="w-5 h-5 text-amber-700" />
                <span>বই ({results.books.length})</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {results.books.map((b) => (
                  <ContentCard
                    key={b.id}
                    item={b}
                    onOpen={onOpenContent}
                    topicName={getTopicName(b.topic)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Grouped results: Articles */}
          {results.articles.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-bengali">
                <FileText className="w-5 h-5 text-teal-700" />
                <span>প্রবন্ধ ({results.articles.length})</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {results.articles.map((a) => (
                  <ContentCard
                    key={a.id}
                    item={a}
                    onOpen={onOpenContent}
                    topicName={getTopicName(a.topic)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Grouped results: Pamphlets */}
          {results.pamphlets.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-bengali">
                <Sparkles className="w-5 h-5 text-amber-700" />
                <span>পাম্ফলেট ({results.pamphlets.length})</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {results.pamphlets.map((p) => (
                  <ContentCard
                    key={p.id}
                    item={p}
                    onOpen={onOpenContent}
                    topicName={getTopicName(p.topic)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Grouped results: Audio */}
          {results.audios.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-bengali">
                <Volume2 className="w-5 h-5 text-cyan-700" />
                <span>অডিও বক্তব্য ({results.audios.length})</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {results.audios.map((au) => (
                  <ContentCard
                    key={au.id}
                    item={au}
                    onOpen={onOpenContent}
                    topicName={getTopicName(au.topic)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Grouped results: Video */}
          {results.videos.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-bengali">
                <Video className="w-5 h-5 text-rose-700" />
                <span>ভিডিও রিসোর্স ({results.videos.length})</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {results.videos.map((v) => (
                  <ContentCard
                    key={v.id}
                    item={v}
                    onOpen={onOpenContent}
                    topicName={getTopicName(v.topic)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Grouped results: Courses */}
          {results.courses.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-bengali">
                <GraduationCap className="w-5 h-5 text-indigo-700" />
                <span>কোর্স ({results.courses.length})</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {results.courses.map((c) => (
                  <ContentCard
                    key={c.id}
                    item={c}
                    onOpen={onOpenContent}
                    topicName={getTopicName(c.topic)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Grouped results: Q&A */}
          {results.qnas.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-bengali">
                <HelpCircle className="w-5 h-5 text-blue-700" />
                <span>প্রশ্নোত্তর ({results.qnas.length})</span>
              </h2>
              <div className="space-y-4">
                {results.qnas.map((q) => (
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
      )}
    </div>
  );
};
