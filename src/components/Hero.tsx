import React from 'react';
import { BookOpen, Compass, ArrowRight } from 'lucide-react';

interface HeroProps {
  onLearnClick: () => void;
  onBooksClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onLearnClick, onBooksClick }) => {
  return (
    <section className="relative bg-gradient-to-b from-amber-50/50 via-white to-white border-b border-gray-100 py-16 md:py-24 text-center px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Arabic Calligraphy header */}
        <div className="inline-block px-4 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/80 mb-6 shadow-2xs">
          <span className="font-arabic text-xl md:text-2xl font-bold tracking-wider">
            مَكْتَبُ الْهِدَايَةِ
          </span>
        </div>

        {/* Bengali Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 font-bengali">
          মাকতাব আল হিদায়াহ
        </h1>

        {/* Tagline */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-900 font-semibold max-w-2xl mx-auto mb-6">
          কুরআন ও সহিহ সুন্নাহর আলোকে ইসলামের শিক্ষা
        </p>

        {/* Scholarly principle */}
        <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto mb-10 leading-relaxed">
          বিশুদ্ধ আকীদাহ, সহিহ হাদীস ও সালাফে সালেহীনের বুঝের আলোকে ইসলামী জ্ঞানচর্চা, বই, অডিও, ভিডিও ও প্রামাণ্য দলীলভিত্তিক রিসোর্স ভাণ্ডার।
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onLearnClick}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-medium text-base shadow-sm hover:shadow transition-all duration-150"
          >
            <Compass className="w-5 h-5 text-amber-200" />
            <span>শিখুন</span>
            <ArrowRight className="w-4 h-4 ml-0.5" />
          </button>
          <button
            onClick={onBooksClick}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white hover:bg-amber-50/50 text-gray-800 font-medium text-base border border-gray-300 shadow-2xs hover:border-amber-600 hover:text-amber-900 transition-all duration-150"
          >
            <BookOpen className="w-5 h-5 text-amber-700" />
            <span>বইসমূহ</span>
          </button>
        </div>
      </div>
    </section>
  );
};
