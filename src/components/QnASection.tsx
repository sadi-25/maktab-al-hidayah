import React, { useState } from 'react';
import { Search, HelpCircle, BookOpen, AlertCircle, ArrowRight } from 'lucide-react';
import { QnAItem } from '../types.ts';
import { searchGroundedQnA } from '../services/dataService.ts';

interface QnASectionProps {
  onNavigateToQnA: (query?: string) => void;
  onNavigateToContent: (contentId: string) => void;
}

export const QnASection: React.FC<QnASectionProps> = ({
  onNavigateToQnA,
  onNavigateToContent,
}) => {
  const [questionInput, setQuestionInput] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [searching, setSearching] = useState(false);
  const [matchedQnAs, setMatchedQnAs] = useState<QnAItem[]>([]);
  const [noDataFound, setNoDataFound] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionInput.trim()) return;

    setSearching(true);
    setHasSearched(true);

    try {
      const result = await searchGroundedQnA(questionInput.trim());
      if (result.exactMatches.length > 0) {
        setMatchedQnAs(result.exactMatches);
        setNoDataFound(false);
      } else {
        setMatchedQnAs([]);
        setNoDataFound(true);
      }
    } catch {
      setMatchedQnAs([]);
      setNoDataFound(true);
    } finally {
      setSearching(false);
    }
  };

  return (
    <section id="qna" className="py-14 bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">❓</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight font-bengali">
              প্রশ্নোত্তর
            </h2>
          </div>
          <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto">
            কুরআন ও সহিহ সুন্নাহর আলোকে সংরক্ষিত নির্ভরযোগ্য ফাতাওয়া ও প্রামাণ্য উত্তর অনুসন্ধান
          </p>
          <div className="mt-2 text-xs text-gray-900 bg-gray-100 inline-block px-3 py-1 rounded-full border border-gray-200 font-medium">
            🔒 প্রামাণ্য দলীলভিত্তিক: সংরক্ষিত তথ্যভাণ্ডার ব্যতিরেকে কোনো কৃত্রিম মনগড়া মতামত প্রদান করা হয় না।
          </div>
        </div>

        {/* Search input for questions */}
        <form onSubmit={handleAsk} className="relative max-w-2xl mx-auto mb-3">
          <div className="relative">
            <input
              type="text"
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
              placeholder="আপনার প্রশ্ন লিখুন (যেমন: আল্লাহ কোথায়?, তাওহীদ কয় প্রকার?, আমল কবুলের শর্ত কি?)..."
              className="w-full bg-gray-50 text-gray-900 text-sm md:text-base rounded-xl pl-11 pr-28 py-3.5 border border-gray-200 focus:outline-none focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-200 transition-all placeholder:text-gray-400"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              disabled={searching}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-amber-600 hover:bg-amber-700 text-white text-xs md:text-sm px-4 py-2 rounded-lg font-medium transition-colors shadow-xs"
            >
              {searching ? 'খোঁজা হচ্ছে...' : 'উত্তর খুঁজুন'}
            </button>
          </div>
        </form>

        {/* Quick Question Pills */}
        <div className="max-w-2xl mx-auto mb-8 flex flex-wrap items-center justify-center gap-1.5 text-xs">
          <span className="text-gray-400 text-[11px] font-medium mr-1">উদাহরণ:</span>
          {[
            'আল্লাহ কোথায়?',
            'তাওহীদ কয় প্রকার?',
            'আমল কবুলের শর্ত কি?',
            'ঈমানের রুকন কয়টি?',
            'লা ইলাহা ইল্লাল্লাহর শর্তসমূহ',
            'শিরক কত প্রকার ও কি কি?'
          ].map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={async () => {
                setQuestionInput(q);
                setSearching(true);
                setHasSearched(true);
                try {
                  const res = await searchGroundedQnA(q);
                  if (res.exactMatches.length > 0) {
                    setMatchedQnAs(res.exactMatches);
                    setNoDataFound(false);
                  } else {
                    setMatchedQnAs([]);
                    setNoDataFound(true);
                  }
                } catch {
                  setMatchedQnAs([]);
                  setNoDataFound(true);
                } finally {
                  setSearching(false);
                }
              }}
              className="bg-gray-100 hover:bg-amber-50 text-gray-700 hover:text-amber-800 px-2.5 py-1 rounded-md border border-gray-200 hover:border-amber-300 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Results Box */}
        {hasSearched && (
          <div className="max-w-2xl mx-auto mb-6">
            {noDataFound ? (
              <div className="p-5 bg-amber-50/80 rounded-xl border border-amber-200/80 flex items-start gap-3.5 text-amber-900">
                <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold mb-1">
                    এই প্রশ্নের উত্তর দেওয়ার জন্য মাকতাব আল হিদায়াহর সংরক্ষিত তথ্যভাণ্ডারে পর্যাপ্ত তথ্য পাওয়া যায়নি।
                  </p>
                  <p className="text-xs text-amber-800/90 leading-relaxed">
                    মাকতাব আল হিদায়াহ কেবল বিশ্বস্ত দলীল এবং সংরক্ষিত প্রামাণ্য উৎস থেকেই তথ্য পরিবেশন করে। মনগড়া বা অনুমাননির্ভর কোনো উত্তর তৈরি করা হয় না।
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {matchedQnAs.map((qna) => (
                  <div
                    key={qna.id}
                    className="p-5 bg-gray-50 rounded-xl border border-gray-200"
                  >
                    <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-amber-800 uppercase tracking-wider">
                      <HelpCircle className="w-4 h-4 text-amber-700" />
                      <span>সংরক্ষিত প্রশ্নোত্তর</span>
                      {qna.subtopic && (
                        <span className="bg-amber-100/70 text-amber-900 px-2 py-0.5 rounded text-[11px]">
                          {qna.subtopic}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-gray-900 mb-2 font-bengali">
                      {qna.question}
                    </h3>
                    <p className="text-sm text-gray-800 leading-relaxed mb-4">
                      {qna.answer}
                    </p>

                    {/* Authentic References */}
                    {qna.references && qna.references.length > 0 && (
                      <div className="pt-3 border-t border-gray-200 text-xs">
                        <span className="font-semibold text-gray-700 mr-2">দালিলিক সূত্র:</span>
                        <div className="mt-1 space-y-1">
                          {qna.references.map((ref, idx) => (
                            <div key={idx} className="text-gray-600 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block" />
                              <span className="font-medium text-amber-900">{ref.title}</span>
                              <span className="text-gray-400">({ref.source})</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Related Content Links */}
                    {qna.relatedContentIds && qna.relatedContentIds.length > 0 && (
                      <div className="mt-3 pt-2 text-xs flex flex-wrap items-center gap-2">
                        <span className="text-gray-500 font-medium">সম্পর্কিত রিসোর্স:</span>
                        {qna.relatedContentIds.map((cid) => (
                          <button
                            key={cid}
                            onClick={() => onNavigateToContent(cid)}
                            className="inline-flex items-center gap-1 text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200 hover:bg-amber-100 font-medium transition-colors"
                          >
                            <BookOpen className="w-3 h-3 text-amber-700" />
                            <span>রিসোর্স {cid} দেখুন</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="text-center">
          <button
            onClick={() => onNavigateToQnA(questionInput)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-amber-700"
          >
            <span>সকল প্রশ্নোত্তর লাইব্রেরি দেখুন</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
