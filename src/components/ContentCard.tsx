import React from 'react';
import {
  BookOpen,
  FileText,
  Volume2,
  Video,
  GraduationCap,
  Sparkles,
  ArrowRight,
  User,
  Clock,
  Download
} from 'lucide-react';
import { AllContentItem, ContentType } from '../types.ts';

interface ContentCardProps {
  item: AllContentItem;
  onOpen: (id: string) => void;
  topicName?: string;
}

export const typeConfig: Record<
  ContentType,
  { label: string; icon: React.ElementType; color: string; bg: string; action: string }
> = {
  book: {
    label: 'বই',
    icon: BookOpen,
    color: 'text-amber-800',
    bg: 'bg-amber-50 border-amber-200',
    action: 'বইটি দেখুন',
  },
  article: {
    label: 'প্রবন্ধ',
    icon: FileText,
    color: 'text-teal-800',
    bg: 'bg-teal-50 border-teal-200',
    action: 'প্রবন্ধটি পড়ুন',
  },
  pamphlet: {
    label: 'পাম্ফলেট',
    icon: Sparkles,
    color: 'text-amber-800',
    bg: 'bg-amber-50 border-amber-200',
    action: 'পাম্ফলেট দেখুন',
  },
  audio: {
    label: 'অডিও',
    icon: Volume2,
    color: 'text-cyan-800',
    bg: 'bg-cyan-50 border-cyan-200',
    action: 'অডিও শুনুন',
  },
  video: {
    label: 'ভিডিও',
    icon: Video,
    color: 'text-rose-800',
    bg: 'bg-rose-50 border-rose-200',
    action: 'ভিডিও দেখুন',
  },
  course: {
    label: 'কোর্স',
    icon: GraduationCap,
    color: 'text-indigo-800',
    bg: 'bg-indigo-50 border-indigo-200',
    action: 'কোর্সটি দেখুন',
  },
  qna: {
    label: 'প্রশ্নোত্তর',
    icon: BookOpen,
    color: 'text-blue-800',
    bg: 'bg-blue-50 border-blue-200',
    action: 'উত্তর দেখুন',
  },
};

export const ContentCard: React.FC<ContentCardProps> = ({
  item,
  onOpen,
  topicName,
}) => {
  const conf = typeConfig[item.type] || typeConfig.book;
  const Icon = conf.icon;

  // Author / speaker extraction
  const person =
    ('author' in item && item.author) ||
    ('speaker' in item && item.speaker) ||
    ('instructor' in item && item.instructor) ||
    '';

  const durationOrPages =
    ('duration' in item && item.duration) ||
    ('pages' in item && `${item.pages} পৃষ্ঠা`) ||
    ('readTime' in item && item.readTime) ||
    '';

  return (
    <div
      onClick={() => onOpen(item.id)}
      className="bg-white rounded-xl border border-gray-200 hover:border-amber-600 hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between cursor-pointer group"
      role="button"
      tabIndex={0}
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${conf.bg} ${conf.color}`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{conf.label}</span>
          </span>

          {item.isDemo && (
            <span className="text-[10px] bg-gray-100 text-gray-500 font-medium px-2 py-0.5 rounded">
              ডেমো কনটেন্ট
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-amber-800 transition-colors mb-2 line-clamp-2 font-bengali">
          {item.title}
        </h3>

        {/* Metadata info */}
        <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-gray-500 mb-3">
          {topicName && (
            <span className="font-medium text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
              বিষয়: {topicName}
            </span>
          )}
          {person && (
            <span className="flex items-center gap-1">
              <User className="w-3 h-3 text-gray-400" />
              <span>{item.type === 'book' ? `লেখক: ${person}` : person}</span>
            </span>
          )}
          {'editor' in item && item.editor && (
            <span className="flex items-center gap-1">
              <span>সম্পাদনা: {item.editor}</span>
            </span>
          )}
          {'publisher' in item && item.publisher && (
            <span className="flex items-center gap-1">
              <span>প্রকাশক: {item.publisher}</span>
            </span>
          )}
          {durationOrPages && (
            <span className="flex items-center gap-1 text-gray-400">
              <Clock className="w-3 h-3" />
              <span>{durationOrPages}</span>
            </span>
          )}
        </div>

        {/* Short description */}
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed mb-4">
          {item.description}
        </p>
      </div>

      {/* Action footer */}
      <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-900 group-hover:text-amber-700">
        <span className="flex items-center gap-1">
          {conf.action}
        </span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};
