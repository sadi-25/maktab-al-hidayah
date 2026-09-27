import React from 'react';
import { TopicItem } from '../types.ts';
import {
  Sun,
  BookOpen,
  ScrollText,
  ShieldCheck,
  Compass,
  HeartHandshake,
  Clock,
  Sparkles,
  ArrowRight,
  Bookmark,
  Scale,
  Layers
} from 'lucide-react';

interface IslamLearnSectionProps {
  topics: TopicItem[];
  onTopicClick: (topicId: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  Sun,
  BookOpen,
  ScrollText,
  ShieldCheck,
  Compass,
  HeartHandshake,
  Clock,
  Sparkles,
  Scale,
  Layers,
};

export const IslamLearnSection: React.FC<IslamLearnSectionProps> = ({
  topics,
  onTopicClick,
}) => {
  return (
    <section id="topics" className="py-14 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">📚</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight font-bengali">
              ইসলাম শিখুন
            </h2>
          </div>
          <p className="text-base text-gray-600 max-w-xl mx-auto">
            কুরআন ও সহিহ সুন্নাহর আলোকে বিভিন্ন বিষয়ে শিক্ষা
          </p>
        </div>

        {/* Dynamic Topic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {topics.map((topic) => {
            const IconComponent = (topic.icon && iconMap[topic.icon]) || Bookmark;
            return (
              <div
                key={topic.id}
                onClick={() => onTopicClick(topic.id)}
                className="group cursor-pointer bg-white rounded-xl p-5 border border-gray-200 hover:border-amber-600 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                role="button"
                tabIndex={0}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors duration-200 shadow-2xs">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    {topic.arabic && (
                      <span className="font-arabic text-sm text-amber-700/60 font-medium">
                        {topic.arabic}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-800 transition-colors mb-1.5 font-bengali">
                    {topic.name}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                    {topic.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-medium text-gray-900 group-hover:text-amber-700">
                  <span>রিসোর্সসমূহ দেখুন</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
