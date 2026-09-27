import React, { useEffect, useState } from 'react';
import { AudioItem, TopicItem } from '../types.ts';
import { getAudios, getTopics } from '../services/dataService.ts';
import { ContentCard } from '../components/ContentCard.tsx';
import { Search, Volume2, Filter } from 'lucide-react';

interface AudioPageProps {
  onOpenContent: (id: string) => void;
  initialTopic?: string;
}

export const AudioPage: React.FC<AudioPageProps> = ({
  onOpenContent,
  initialTopic = 'all',
}) => {
  const [audios, setAudios] = useState<AudioItem[]>([]);
  const [topics, setTopics] = useState<TopicItem[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>(initialTopic);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      try {
        const [loadedAudios, loadedTopics] = await Promise.all([
          getAudios(),
          getTopics(),
        ]);
        if (isMounted) {
          setAudios(loadedAudios);
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

  const filtered = audios.filter((item) => {
    if (selectedTopic !== 'all') {
      const matchTopic =
        item.topic.toLowerCase() === selectedTopic.toLowerCase() ||
        item.relatedTopics?.some((rt) => rt.toLowerCase() === selectedTopic.toLowerCase());
      if (!matchTopic) return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        item.title.toLowerCase().includes(q) ||
        (item.speaker && item.speaker.toLowerCase().includes(q)) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        item.keywords.some((k) => k.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 text-xs font-semibold mb-3 border border-cyan-200">
          <Volume2 className="w-3.5 h-3.5" />
          <span>ইসলামিক অডিও অডিও আর্কাইভ</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3 font-bengali">
          অডিও লাইব্রেরি
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          কুরআন ও সুন্নাহর বিশুদ্ধ ব্যাখ্যা ও নির্ভরযোগ্য আলেমদের গুরুত্বপূর্ণ অডিও বক্তব্য ও দারস
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 mb-8 shadow-xs">
        <div className="relative mb-5 max-w-xl mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="অডিওর শিরোনাম, বক্তা অথবা বিষয় দিয়ে খুঁজুন..."
            className="w-full bg-gray-50 text-gray-900 text-sm rounded-xl pl-10 pr-4 py-2.5 border border-gray-200 focus:outline-none focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-200 transition-all"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5">
            <Filter className="w-3.5 h-3.5" />
            <span>বিষয় নির্বাচন করুন:</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedTopic('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedTopic === 'all'
                  ? 'bg-cyan-800 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              সব অডিও ({audios.length})
            </button>
            {topics.map((t) => {
              const count = audios.filter(
                (a) =>
                  a.topic.toLowerCase() === t.id.toLowerCase() ||
                  a.relatedTopics?.some((rt) => rt.toLowerCase() === t.id.toLowerCase())
              ).length;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTopic(t.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    selectedTopic === t.id
                      ? 'bg-cyan-800 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {t.name} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="w-8 h-8 border-3 border-cyan-800 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">অডিওসমূহ লোড হচ্ছে...</p>
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const topicObj = topics.find((t) => t.id === item.topic);
            return (
              <ContentCard
                key={item.id}
                item={item}
                onOpen={onOpenContent}
                topicName={topicObj?.name}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-200">
          <Volume2 className="w-10 h-10 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-700 font-semibold mb-1">কোনো অডিও বক্তব্য পাওয়া যায়নি।</p>
        </div>
      )}
    </div>
  );
};
