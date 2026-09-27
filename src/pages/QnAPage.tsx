import React, { useEffect, useState, useMemo } from 'react';
import { QnAItem, TopicItem } from '../types.ts';
import { getQnAs, getTopics, searchGroundedQnA } from '../services/dataService.ts';
import { Search, HelpCircle, AlertCircle, CheckCircle, BookOpen, Filter, Sparkles, ArrowRight } from 'lucide-react';

interface QnAPageProps {
  onOpenContent: (id: string) => void;
  initialQuery?: string;
}

const POPULAR_QUESTIONS = [
  'আল্লাহ কোথায়?',
  'তাওহীদ কয় প্রকার?',
  'আমল কবুলের শর্ত কি?',
  'ঈমানের রুকন কয়টি?',
  'লা ইলাহা ইল্লাল্লাহর শর্তসমূহ',
  'শিরক কত প্রকার ও কি কি?',
  'ইসলাম বিনষ্টকারী কারণসমূহ',
  'মৃত ব্যক্তি কি শোনে?',
  'জাদু শেখার বিধান কি?'
];

export const QnAPage: React.FC<QnAPageProps> = ({
  onOpenContent,
  initialQuery = '',
}) => {
  const [qnas, setQnas] = useState<QnAItem[]>([]);
  const [topics, setTopics] = useState<TopicItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [activeQuery, setActiveQuery] = useState<string>(initialQuery);
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [matchedResults, setMatchedResults] = useState<QnAItem[]>([]);
  const [searching, setSearching] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      try {
        const [loadedQnAs, loadedTopics] = await Promise.all([
          getQnAs(),
          getTopics(),
        ]);
        if (isMounted) {
          setQnas(loadedQnAs);
          setTopics(loadedTopics);
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
  }, []);

  // Run semantic search when activeQuery changes
  useEffect(() => {
    let isMounted = true;
    async function runSearch() {
      if (!activeQuery.trim()) {
        setMatchedResults([]);
        return;
      }
      setSearching(true);
      try {
        const res = await searchGroundedQnA(activeQuery.trim());
        if (isMounted) {
          setMatchedResults(res.exactMatches);
        }
      } catch (e) {
        console.error(e);
        if (isMounted) setMatchedResults([]);
      } finally {
        if (isMounted) setSearching(false);
      }
    }
    runSearch();
    return () => {
      isMounted = false;
    };
  }, [activeQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveQuery(searchQuery.trim());
  };

  const handleQuickQuestion = (q: string) => {
    setSearchQuery(q);
    setActiveQuery(q);
    setSelectedTopic('all');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Filtered list when browsing by topic or viewing all
  const displayedBrowseQnAs = useMemo(() => {
    if (selectedTopic === 'all') return qnas;
    return qnas.filter((item) => item.topic.toLowerCase() === selectedTopic.toLowerCase());
  }, [qnas, selectedTopic]);

  const isSearchMode = activeQuery.trim().length > 0;
  const directAnswer = isSearchMode && matchedResults.length > 0 ? matchedResults[0] : null;
  const otherMatches = isSearchMode && matchedResults.length > 1 ? matchedResults.slice(1) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Page Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-semibold mb-3 border border-amber-200 shadow-2xs">
          <HelpCircle className="w-4 h-4 text-amber-700" />
          <span>প্রামাণ্য ইসলামী প্রশ্নোত্তর</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3 font-bengali">
          প্রশ্নোত্তর আর্কাইভ
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
          কুরআন, সহিহ সুন্নাহ ও চার ইমামের বিশুদ্ধ আক্বীদা অবলম্বনে ৯০টি মৌলিক প্রশ্নোত্তর
        </p>
        <div className="mt-3 text-xs text-amber-950 bg-amber-50/80 inline-block px-3.5 py-1.5 rounded-full border border-amber-200/80 font-medium">
          🔒 কঠোর নিরাপত্তা ও দলীল নীতি: এই সিস্টেম কেবল সংরক্ষিত প্রামাণ্য তথ্যভাণ্ডার অনুসন্ধান করে। মনগড়া বা অনুমাননির্ভর কোনো উত্তর তৈরি করে না।
        </div>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearchSubmit} className="relative mb-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="আপনার প্রশ্ন লিখুন (যেমন: আল্লাহ কোথায়?, তাওহীদ কয় প্রকার?, আমল কবুলের শর্ত কি?)..."
          className="w-full bg-white text-gray-900 text-sm sm:text-base rounded-2xl pl-11 pr-28 py-3.5 border border-gray-300 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-200 shadow-xs transition-all"
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm px-4 py-2 rounded-xl font-medium transition-colors shadow-xs"
        >
          {searching ? 'খোঁজা হচ্ছে...' : 'উত্তর খুঁজুন'}
        </button>
      </form>

      {/* Popular Question Suggestion Chips */}
      <div className="mb-6">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>জনপ্রিয় কয়েকটি প্রশ্ন (ক্লিক করে উত্তর দেখুন):</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {POPULAR_QUESTIONS.map((pq, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickQuestion(pq)}
              className="text-xs bg-gray-50 hover:bg-amber-50 text-gray-700 hover:text-amber-800 px-2.5 py-1 rounded-lg border border-gray-200 hover:border-amber-300 transition-colors"
            >
              {pq}
            </button>
          ))}
        </div>
      </div>

      {/* If in Search Mode, show Results and/or Fallback */}
      {isSearchMode && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200">
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              অনুসন্ধানের ফলাফল: <span className="text-amber-800 font-normal">"{activeQuery}"</span>
            </h2>
            <button
              onClick={() => {
                setActiveQuery('');
                setSearchQuery('');
              }}
              className="text-xs text-amber-800 hover:text-amber-950 font-medium underline"
            >
              সব প্রশ্ন দেখুন
            </button>
          </div>

          {searching ? (
            <div className="text-center py-12">
              <div className="w-7 h-7 border-3 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-xs text-gray-500">প্রামাণ্য তথ্যভাণ্ডার অনুসন্ধান করা হচ্ছে...</p>
            </div>
          ) : matchedResults.length === 0 ? (
            /* No data found fallback */
            <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200 mb-6 flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-bold text-amber-950 mb-1">
                  এই প্রশ্নের উত্তর দেওয়ার জন্য মাকতাব আল হিদায়াহর সংরক্ষিত তথ্যভাণ্ডারে পর্যাপ্ত তথ্য পাওয়া যায়নি।
                </h3>
                <p className="text-xs sm:text-sm text-amber-900 leading-relaxed mb-3">
                  মাকতাব আল হিদায়াহ শুধুমাত্র নির্ভরযোগ্য আলেম ও প্রামাণ্য কিতাবাদি থেকে যাচাইকৃত উত্তর সংরক্ষণ করে। মনগড়া বা অনুমাননির্ভর কোনো ব্যাখ্যা প্রদান করা হয় না।
                </p>
                <div className="pt-2 border-t border-amber-200/80">
                  <span className="text-xs font-semibold text-amber-900 block mb-1.5">
                    আপনি নিচের সংরক্ষিত প্রশ্নগুলোর উত্তর দেখতে পারেন:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {POPULAR_QUESTIONS.slice(0, 5).map((pq, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickQuestion(pq)}
                        className="text-xs bg-white text-amber-900 hover:bg-amber-100 px-2 py-0.5 rounded border border-amber-300 transition-colors"
                      >
                        {pq}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Highlighted Direct Answer Card for the Top Match */}
              {directAnswer && (
                <div className="bg-amber-50/50 rounded-2xl border-2 border-amber-500 p-6 sm:p-7 shadow-xs">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-amber-600 px-3 py-1 rounded-full shadow-2xs">
                      <CheckCircle className="w-4 h-4 text-amber-200" />
                      <span>সরাসরি প্রামাণ্য উত্তর</span>
                    </span>
                    {directAnswer.subtopic && (
                      <span className="text-xs text-amber-950 bg-amber-100 px-2.5 py-0.5 rounded-md font-medium">
                        {directAnswer.subtopic}
                      </span>
                    )}
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 font-bengali">
                    {directAnswer.question}
                  </h2>

                  <div className="text-sm sm:text-base text-gray-900 leading-relaxed mb-5 whitespace-pre-line bg-white p-4 sm:p-5 rounded-xl border border-gray-200">
                    {directAnswer.answer}
                  </div>

                  {/* References */}
                  {directAnswer.references && directAnswer.references.length > 0 && (
                    <div className="pt-3 border-t border-gray-200 text-xs">
                      <span className="font-semibold text-amber-950 flex items-center gap-1 mb-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-amber-700" />
                        <span>প্রামাণ্য দলীল ও তথ্যসূত্র:</span>
                      </span>
                      <div className="space-y-1">
                        {directAnswer.references.map((ref, idx) => (
                          <div key={idx} className="text-gray-700 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                            <span className="font-semibold text-amber-950">{ref.title}</span>
                            <span className="text-gray-500">({ref.source})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Related Resources */}
                  {directAnswer.relatedContentIds && directAnswer.relatedContentIds.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-gray-200 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-amber-950 font-semibold">সম্পর্কিত রিসোর্স:</span>
                      {directAnswer.relatedContentIds.map((cid) => (
                        <button
                          key={cid}
                          onClick={() => onOpenContent(cid)}
                          className="inline-flex items-center gap-1 text-xs text-amber-900 bg-white px-3 py-1.5 rounded-lg border border-amber-200 hover:bg-amber-50 font-medium transition-colors shadow-2xs"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                          <span>
                            {cid === 'book-sohoj-tawheed-qna'
                              ? 'প্রশ্নোত্তরে সহজ তাওহীদ শিক্ষা বইটি পড়ুন'
                              : cid === 'book-kalimatut-tawheed'
                              ? 'তাওহীদের কালেমা বইটি পড়ুন'
                              : `রিসোর্স ${cid} দেখুন`}
                          </span>
                          <ArrowRight className="w-3 h-3 text-amber-700" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Other Related Questions if any */}
              {otherMatches.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-3">
                    সম্পর্কিত অন্যান্য প্রশ্নোত্তর ({otherMatches.length})
                  </h3>
                  <div className="space-y-4">
                    {otherMatches.map((q) => (
                      <div
                        key={q.id}
                        className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs hover:border-amber-600 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-amber-900 bg-amber-50 px-2 py-0.5 rounded font-medium border border-amber-200">
                            {q.subtopic || 'প্রশ্নোত্তর'}
                          </span>
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 font-bengali">
                          {q.question}
                        </h4>
                        <div className="text-xs sm:text-sm text-gray-800 leading-relaxed mb-3 whitespace-pre-line">
                          {q.answer}
                        </div>
                        {q.references && q.references.length > 0 && (
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <span className="font-medium text-amber-900">সূত্র:</span>
                            <span>{q.references[0].title} ({q.references[0].source})</span>
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
      )}

      {/* Topic Filter Pills (shown in Browse Mode) */}
      {!isSearchMode && (
        <div className="mb-8">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            <Filter className="w-3.5 h-3.5" />
            <span>বিষয়ভিত্তিক দেখুন:</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedTopic('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedTopic === 'all'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-xs font-semibold'
                  : 'bg-gray-100 hover:bg-amber-50 text-gray-700 hover:text-amber-900'
              }`}
            >
              সকল প্রশ্ন ({qnas.length})
            </button>
            {topics.map((t) => {
              const count = qnas.filter((q) => q.topic.toLowerCase() === t.id.toLowerCase()).length;
              if (count === 0) return null;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTopic(t.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedTopic === t.id
                      ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-xs font-semibold'
                      : 'bg-gray-100 hover:bg-amber-50 text-gray-700 hover:text-amber-900'
                  }`}
                >
                  {t.name} ({count})
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Full Browse Items List (when not in search mode) */}
      {!isSearchMode && (
        loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-3 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-gray-500">প্রশ্নোত্তর লোড হচ্ছে...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {displayedBrowseQnAs.map((q) => (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs hover:border-amber-600 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                    <span>প্রশ্নোত্তর</span>
                  </span>
                  {q.subtopic && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded font-medium">
                      {q.subtopic}
                    </span>
                  )}
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 font-bengali">
                  {q.question}
                </h2>

                <div className="text-sm sm:text-base text-gray-800 leading-relaxed mb-4 whitespace-pre-line">
                  {q.answer}
                </div>

                {/* References */}
                {q.references && q.references.length > 0 && (
                  <div className="pt-4 border-t border-gray-100 text-xs">
                    <span className="font-semibold text-gray-700 flex items-center gap-1 mb-2">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-700" />
                      <span>প্রামাণ্য দলীল ও তথ্যসূত্র:</span>
                    </span>
                    <div className="space-y-1">
                      {q.references.map((ref, idx) => (
                        <div key={idx} className="text-gray-600 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                          <span className="font-medium text-amber-950">{ref.title}</span>
                          <span className="text-gray-400">({ref.source})</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Related content */}
                {q.relatedContentIds && q.relatedContentIds.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-gray-500 font-medium">সম্পর্কিত রিসোর্স:</span>
                    {q.relatedContentIds.map((cid) => (
                      <button
                        key={cid}
                        onClick={() => onOpenContent(cid)}
                        className="inline-flex items-center gap-1 text-xs text-amber-900 bg-amber-50 px-2.5 py-1 rounded border border-amber-200 hover:bg-amber-100 font-medium transition-colors"
                      >
                        <BookOpen className="w-3 h-3 text-amber-700" />
                        <span>
                          {cid === 'book-sohoj-tawheed-qna'
                            ? 'প্রশ্নোত্তরে সহজ তাওহীদ শিক্ষা বই'
                            : cid === 'book-kalimatut-tawheed'
                            ? 'তাওহীদের কালেমা বই'
                            : `রিসোর্স ${cid} দেখুন`}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};
