import React, { useState } from 'react';
import { BookOpen, FileText, Volume2, Video, Share2, Check, Copy } from 'lucide-react';

interface SadqahJariyahSectionProps {
  onNavigate: (route: string) => void;
}

export const SadqahJariyahSection: React.FC<SadqahJariyahSectionProps> = ({
  onNavigate,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'মাকতাব আল হিদায়াহ | Maktab Al Hidayah',
        text: 'কুরআন ও সহিহ সুন্নাহর আলোকে ইসলামের বিশুদ্ধ শিক্ষা ও রিসোর্স লাইব্রেরি',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareCards = [
    {
      id: 'books',
      title: 'ইসলামিক বই প্রচার',
      label: '📖 বইসমূহ',
      description: 'বিশুদ্ধ আকীদাহ ও আমলের পিডিএফ বই পরিবার ও বন্ধুদের সাথে শেয়ার করুন।',
      route: '#/books',
    },
    {
      id: 'pamphlets',
      title: 'দাওয়াহ পাম্ফলেট বিতরণ',
      label: '📄 পাম্ফলেট',
      description: 'সংক্ষিপ্ত প্রিন্টযোগ্য দাওয়াহ লিফলেট ও পাম্ফলেট ডাউনলোড করে বিতরণ করুন।',
      route: '#/pamphlets',
    },
    {
      id: 'audio',
      title: 'উপকারী অডিও শেয়ার',
      label: '🎧 অডিও বক্তব্য',
      description: 'সহিহ ইলমের অডিও দারস ও বক্তব্য অন্যদের শোনার সুযোগ করে দিন।',
      route: '#/audio',
    },
    {
      id: 'video',
      title: 'দ্বীনি ভিডিও পৌঁছে দিন',
      label: '🎥 ভিডিও রিসোর্স',
      description: 'ইসলামের মৌলিক শিক্ষার গঠনমূলক প্রামাণ্য ভিডিও সামাজিক মাধ্যমে প্রচার করুন।',
      route: '#/videos',
    },
  ];

  return (
    <section id="sadqah" className="py-14 bg-gradient-to-b from-amber-950 via-stone-950 to-neutral-950 text-white border-t border-amber-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="text-2xl">🌱</span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-bengali text-amber-300">
            সদকায়ে জারিয়া
          </h2>
        </div>

        <p className="text-base sm:text-lg text-amber-100 max-w-2xl mx-auto mb-2">
          "মানুষ যখন মৃত্যুবরণ করে তখন তার যাবতীয় আমল বন্ধ হয়ে যায়, তিনটি ব্যতীত—সদকায়ে জারিয়া, এমন ইলম যা দ্বারা মানুষ উপকৃত হয়..."
        </p>
        <span className="text-xs text-amber-400 mb-8 inline-block font-mono">[সহিহ মুসলিম: ১৬৩১]</span>

        <p className="text-sm text-gray-300 max-w-xl mx-auto mb-8">
          মাকতাব আল হিদায়াহর প্রামাণ্য বই, পাম্ফলেট ও শিক্ষামূলক রিসোর্সগুলো আপনার পরিচিতজনদের সাথে শেয়ার করে ইলম প্রচারের এই কল্যাণময় কাজে অংশীদার হোন।
        </p>

        {/* Share Resource Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left mb-8">
          {shareCards.map((card) => (
            <div
              key={card.id}
              onClick={() => onNavigate(card.route)}
              className="bg-amber-950/40 border border-amber-900/60 hover:border-amber-400/80 rounded-xl p-4.5 cursor-pointer hover:bg-amber-900/40 transition-all duration-200 group backdrop-blur-xs"
            >
              <div className="text-base font-bold text-amber-300 mb-1 group-hover:text-amber-200">
                {card.label}
              </div>
              <p className="text-xs text-gray-300 leading-relaxed mb-3">
                {card.description}
              </p>
              <span className="text-xs font-semibold text-amber-300 group-hover:text-white flex items-center gap-1">
                শেয়ারযোগ্য রিসোর্স দেখুন →
              </span>
            </div>
          ))}
        </div>

        {/* Quick Share Website Link */}
        <div className="inline-flex items-center gap-3">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-amber-950 font-bold text-sm shadow-md transition-all duration-150"
          >
            {copied ? <Check className="w-4 h-4 text-amber-950" /> : <Share2 className="w-4 h-4 text-amber-950" />}
            <span>{copied ? 'ওয়েবসাইট লিংক কপি হয়েছে!' : 'ওয়েবসাইট লিংক শেয়ার করুন'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
