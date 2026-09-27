import React from 'react';
import {
  BookOpen,
  Volume2,
  Video,
  FileText,
  GraduationCap,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface LibrarySectionProps {
  onNavigate: (route: string) => void;
  counts: {
    books: number;
    articles: number;
    audios: number;
    videos: number;
    pamphlets: number;
    courses: number;
  };
}

export const LibrarySection: React.FC<LibrarySectionProps> = ({
  onNavigate,
  counts,
}) => {
  const libraries = [
    {
      id: 'books',
      title: 'বই লাইব্রেরি',
      arabic: 'المكتبة',
      description: 'সহিহ আকীদাহ, ফিকহ ও মৌলিক ইসলামিক বইসমূহের পিডিএফ সংকলন।',
      count: counts.books,
      icon: BookOpen,
      route: '#/books',
      color: 'amber',
    },
    {
      id: 'articles',
      title: 'প্রবন্ধসমূহ',
      arabic: 'المقالات',
      description: 'দৈনন্দিন জীবন ও বিশুদ্ধ আকীদাহ সংক্রান্ত গবেষণাধর্মী প্রামাণ্য প্রবন্ধ।',
      count: counts.articles,
      icon: FileText,
      route: '#/articles',
      color: 'teal',
    },
    {
      id: 'audios',
      title: 'অডিও লেকচার',
      arabic: 'الصوتيات',
      description: 'নির্ভরযোগ্য আলেমদের প্রামাণ্য অডিও বক্তব্য, দারস ও প্রশ্নোত্তর।',
      count: counts.audios,
      icon: Volume2,
      route: '#/audio',
      color: 'cyan',
    },
    {
      id: 'videos',
      title: 'ভিডিও লাইব্রেরি',
      arabic: 'المرئيات',
      description: 'কুরআন ও সুন্নাহর মৌলিক শিক্ষার উপর প্রাঞ্জল ভিডিও লেকচার ও আলোচনা।',
      count: counts.videos,
      icon: Video,
      route: '#/videos',
      color: 'amber',
    },
    {
      id: 'pamphlets',
      title: 'পাম্ফলেট ও লিফলেট',
      arabic: 'المطويات',
      description: 'দাওয়াহ ও দ্রুত শিক্ষার জন্য সহজ-সরল সংক্ষিপ্ত প্রিন্টযোগ্য লিফলেট।',
      count: counts.pamphlets,
      icon: Sparkles,
      route: '#/pamphlets',
      color: 'amber',
    },
    {
      id: 'courses',
      title: 'ধারাবাহিক কোর্স',
      arabic: 'الدورات',
      description: 'ইসলামের মৌলিক বিষয়সমূহের উপর কাঠামোবদ্ধ ধারাবাহিক শিক্ষাক্রম।',
      count: counts.courses,
      icon: GraduationCap,
      route: '#/courses',
      color: 'amber',
    },
  ];

  return (
    <section className="py-14 bg-gray-50/60 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-2xl">📚</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight font-bengali">
                ইসলামিক লাইব্রেরি
              </h2>
            </div>
            <p className="text-sm md:text-base text-gray-600">
              প্রামাণ্য দলীলভিত্তিক বই, অডিও, ভিডিও, পাম্ফলেট ও পাঠ্যসূচির সমৃদ্ধ ভাণ্ডার
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {libraries.map((lib) => {
            const Icon = lib.icon;
            return (
              <div
                key={lib.id}
                onClick={() => onNavigate(lib.route)}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:border-amber-600 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors duration-200 shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 font-semibold">
                      {lib.count} টি সংকলন
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-800 transition-colors mb-2 font-bengali">
                    {lib.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                    {lib.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-sm font-semibold text-gray-900 group-hover:text-amber-700">
                  <span>ব্রাউজ করুন</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
