import React from 'react';
import { BookOpen, CheckCircle, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Arabic Badge & Title */}
      <div className="text-center mb-10">
        <div className="inline-block px-4 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 mb-4 shadow-2xs">
          <span className="font-arabic text-xl font-bold">مَكْتَبُ الْهِدَايَةِ</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4 font-bengali">
          আমাদের সম্পর্কে
        </h1>
        <p className="text-lg text-gray-900 font-semibold max-w-xl mx-auto">
          কুরআন ও সহিহ সুন্নাহর আলোকে বিশুদ্ধ দ্বীনি জ্ঞান সংরক্ষণ ও প্রচারের উদ্যোগ
        </p>
      </div>

      {/* Main Principle Callout */}
      <div className="bg-gradient-to-r from-amber-800 via-amber-900 to-amber-950 text-white p-8 rounded-2xl text-center mb-12 shadow-sm border border-amber-700/50">
        <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold block mb-2">
          আমাদের মৌলিক নীতি
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-bengali tracking-wide mb-3">
          "আমাদের কথা নয়—দলীলের কথা"
        </h2>
        <p className="text-sm sm:text-base text-amber-100 max-w-2xl mx-auto leading-relaxed">
          দ্বীনের প্রতিটি বিষয়ে ব্যক্তিগত অভিমত বা অনুমানের পরিবর্তে পবিত্র কুরআন ও সহিহ সুন্নাহর দ্ব্যর্থহীন দলীল উপস্থাপন করাই আমাদের একমাত্র নীতি।
        </p>
      </div>

      {/* Narrative Section */}
      <div className="space-y-8 text-gray-700 leading-relaxed text-base">
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-2xs">
          <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2 font-bengali">
            <BookOpen className="w-5 h-5 text-amber-700" />
            <span>মাকতাব আল হিদায়াহ কী?</span>
          </h3>
          <p className="text-sm sm:text-base leading-relaxed mb-4">
            <strong>মাকতাব আল হিদায়াহ (Maktab Al Hidayah)</strong> একটি অলাভজনক ইসলামী শিক্ষামূলক রিসোর্স প্ল্যাটফর্ম। বর্তমান ডিজিটাল যুগে ইন্টারনেটে ছড়িয়ে থাকা অসংখ্য তথ্যের ভিড়ে একজন সাধারণ মুসলিমের জন্য বিশুদ্ধ ও প্রামাণ্য ইসলামিক জ্ঞান খুঁজে পাওয়া অত্যন্ত জরুরি।
          </p>
          <p className="text-sm sm:text-base leading-relaxed">
            এই প্ল্যাটফর্মের লক্ষ্য হলো—কুরআন, সহিহ হাদীস এবং সালাফে সালেহীনের বিশুদ্ধ বুঝ অনুসারে নির্ভরযোগ্য আলেম ও গবেষকদের রচিত বই, প্রবন্ধ, অডিও বক্তব্য, ভিডিও এবং সংক্ষিপ্ত দাওয়াহ পাম্ফলেটসমূহকে বিষয়ভিত্তিক ও আধুনিক ডেটা-ড্রাইভেন কাঠামোয় একত্রিত ও বিন্যস্ত করা।
          </p>
        </section>

        {/* Core Sources */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-2xs">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-bengali">
            <ShieldCheck className="w-5 h-5 text-amber-700" />
            <span>আমাদের নির্ভরযোগ্য আকর উৎসসমূহ</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80">
              <strong className="text-gray-900 block mb-1">১. আল-কুরআনুল কারীম (Al-Qur'an)</strong>
              <p className="text-xs text-gray-600">আল্লাহ তাআলার অবিকৃত কিতাব ও সামগ্রিক জীবনবিধান।</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80">
              <strong className="text-gray-900 block mb-1">২. আস-সুন্নাহ আস-সহীহাহ (Sahih Sunnah)</strong>
              <p className="text-xs text-gray-600">রাসূলুল্লাহ ﷺ-এর প্রমাণিত সহিহ হাদীস ও তাঁর সুন্নাহর পূর্ণাঙ্গ অনুসরণ।</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80">
              <strong className="text-gray-900 block mb-1">৩. সালাফে সালেহীনের বুঝ (Fahm as-Salaf)</strong>
              <p className="text-xs text-gray-600">সাহাবায়ে কেরাম, তাবেঈন ও তাবে-তাবেঈনগণের বিশুদ্ধ বুঝ ও ব্যাখ্যা।</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200/80">
              <strong className="text-gray-900 block mb-1">৪. আহলুস সুন্নাহর বিশ্বস্ত উলামায়ে কেরাম</strong>
              <p className="text-xs text-gray-600">আহলুস সুন্নাহ ওয়াল জামাআতের প্রামাণ্য নির্ভরযোগ্য আলেমদের গবেষণা ও ফতোয়া।</p>
            </div>
          </div>
        </section>

        {/* Commitment to safety & attribution */}
        <section className="bg-gray-50 p-6 sm:p-8 rounded-2xl border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2 font-bengali">
            <CheckCircle className="w-5 h-5 text-amber-700" />
            <span>দায়িত্বশীল উপস্থাপনা ও মূল তথ্যসূত্র সংরক্ষণ</span>
          </h3>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3">
            মাকতাব আল হিদায়াহ কোনো নতুন ধর্মীয় বিধান বা মনগড়া ফতোয়া আবিষ্কার করে না। আমাদের কাজ কেবল সংরক্ষিত বিশুদ্ধ উপাদানসমূহকে স্বচ্ছ ও নিরপেক্ষভাবে উপস্থাপন করা। প্রতিটি রিসোর্সের সাথে মূল লেখক, বক্তা, কিতাব এবং দলীল উল্লেখ করা হয়।
          </p>
          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            আমাদের প্রশ্নোত্তর বা সার্চ ব্যবস্থায় কোনো কৃত্রিম বুদ্ধিমত্তা (AI) দ্বারা ধর্মীয় হুকুম তৈরি করা হয় না; বরং সংরক্ষিত গবেষণামূলক ডেটা থেকেই শুধুমাত্র ফলাফল প্রদর্শিত হয়।
          </p>
        </section>
      </div>

      {/* Call to action */}
      <div className="mt-12 text-center">
        <button
          onClick={() => onNavigate('#/books')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold shadow-sm transition-all"
        >
          <span>আমাদের লাইব্রেরি অন্বেষণ করুন</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
