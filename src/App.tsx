/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { Hero } from './components/Hero.tsx';
import { IslamLearnSection } from './components/IslamLearnSection.tsx';
import { LibrarySection } from './components/LibrarySection.tsx';
import { QnASection } from './components/QnASection.tsx';
import { SadqahJariyahSection } from './components/SadqahJariyahSection.tsx';

import { TopicPage } from './pages/TopicPage.tsx';
import { ContentDetailPage } from './pages/ContentDetailPage.tsx';
import { BooksPage } from './pages/BooksPage.tsx';
import { ArticlesPage } from './pages/ArticlesPage.tsx';
import { AudioPage } from './pages/AudioPage.tsx';
import { VideosPage } from './pages/VideosPage.tsx';
import { PamphletsPage } from './pages/PamphletsPage.tsx';
import { CoursesPage } from './pages/CoursesPage.tsx';
import { QnAPage } from './pages/QnAPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { SearchResultsPage } from './pages/SearchResultsPage.tsx';

import {
  SiteConfig,
  TopicItem
} from './types.ts';
import {
  getSiteConfig,
  getTopics,
  getBooks,
  getArticles,
  getPamphlets,
  getAudios,
  getVideos,
  getCourses
} from './services/dataService.ts';

export default function App() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [topics, setTopics] = useState<TopicItem[]>([]);
  const [counts, setCounts] = useState({
    books: 0,
    articles: 0,
    audios: 0,
    videos: 0,
    pamphlets: 0,
    courses: 0,
  });

  const [currentRoute, setCurrentRoute] = useState<string>(() => window.location.hash || '#/');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sync route on hashchange & popstate
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash || '#/';
      setCurrentRoute(hash);
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    handleLocationChange();

    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Initial data loading
  useEffect(() => {
    async function init() {
      try {
        const [config, topList, bList, aList, pList, auList, vList, cList] =
          await Promise.all([
            getSiteConfig(),
            getTopics(),
            getBooks(),
            getArticles(),
            getPamphlets(),
            getAudios(),
            getVideos(),
            getCourses(),
          ]);

        setSiteConfig(config);
        setTopics(topList);
        setCounts({
          books: bList.length,
          articles: aList.length,
          pamphlets: pList.length,
          audios: auList.length,
          videos: vList.length,
          courses: cList.length,
        });
      } catch (err) {
        console.error('Initialization error:', err);
      }
    }
    init();
  }, []);

  const navigateTo = (route: string) => {
    window.location.hash = route;
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    navigateTo(`#/search?q=${encodeURIComponent(query)}`);
  };

  // Route Parser
  const parseRoute = () => {
    let route = currentRoute;
    if (route.startsWith('#')) route = route.slice(1);
    if (!route || route === '/') return { page: 'home', params: {} as Record<string, string> };

    const [path, queryString] = route.split('?');
    const params: Record<string, string> = {};
    if (queryString) {
      const searchParams = new URLSearchParams(queryString);
      searchParams.forEach((val, key) => {
        params[key] = val;
      });
    }

    // Direct path match
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const parts = cleanPath.split('/');
    const page = parts[0] || 'home';

    if (parts[1]) {
      params.id = parts[1];
    }

    return { page, params };
  };

  const { page, params } = parseRoute();

  const renderContent = () => {
    switch (page) {
      case 'about':
        return <AboutPage onNavigate={navigateTo} />;

      case 'books':
        return <BooksPage onOpenContent={(id) => navigateTo(`#/content?id=${id}`)} initialTopic={params.topic || 'all'} />;

      case 'articles':
        return <ArticlesPage onOpenContent={(id) => navigateTo(`#/content?id=${id}`)} initialTopic={params.topic || 'all'} />;

      case 'audio':
        return <AudioPage onOpenContent={(id) => navigateTo(`#/content?id=${id}`)} initialTopic={params.topic || 'all'} />;

      case 'videos':
        return <VideosPage onOpenContent={(id) => navigateTo(`#/content?id=${id}`)} initialTopic={params.topic || 'all'} />;

      case 'pamphlets':
        return <PamphletsPage onOpenContent={(id) => navigateTo(`#/content?id=${id}`)} initialTopic={params.topic || 'all'} />;

      case 'courses':
        return <CoursesPage onOpenContent={(id) => navigateTo(`#/content?id=${id}`)} initialTopic={params.topic || 'all'} />;

      case 'qna':
        return <QnAPage onOpenContent={(id) => navigateTo(`#/content?id=${id}`)} initialQuery={params.q || ''} />;

      case 'contact':
        return <ContactPage siteConfig={siteConfig} />;

      case 'sadqah':
        return (
          <div className="py-8">
            <SadqahJariyahSection onNavigate={navigateTo} />
          </div>
        );

      case 'topic':
        return (
          <TopicPage
            topicId={params.id || 'tawheed'}
            onNavigate={navigateTo}
            onOpenContent={(id) => navigateTo(`#/content?id=${id}`)}
          />
        );

      case 'content':
        return (
          <ContentDetailPage
            contentId={params.id || 'book-001'}
            onNavigate={navigateTo}
          />
        );

      case 'search':
        return (
          <SearchResultsPage
            query={params.q || searchQuery}
            onOpenContent={(id) => navigateTo(`#/content?id=${id}`)}
            onSearchNew={handleSearch}
          />
        );

      case 'home':
      default:
        return (
          <main>
            {/* Section 25: Hero */}
            <Hero
              onLearnClick={() => {
                const topicsEl = document.getElementById('topics');
                if (topicsEl) {
                  topicsEl.scrollIntoView({ behavior: 'smooth' });
                } else {
                  navigateTo('#/topics');
                }
              }}
              onBooksClick={() => navigateTo('#/books')}
            />

            {/* Section 10: ইসলাম শিখুন (Topics) */}
            <IslamLearnSection
              topics={topics}
              onTopicClick={(topicId) => navigateTo(`#/topic?id=${topicId}`)}
            />

            {/* Section 20: ইসলামিক লাইব্রেরি */}
            <LibrarySection
              onNavigate={navigateTo}
              counts={counts}
            />

            {/* Section 22: প্রশ্নোত্তর */}
            <QnASection
              onNavigateToQnA={(q) => navigateTo(q ? `#/qna?q=${encodeURIComponent(q)}` : '#/qna')}
              onNavigateToContent={(id) => navigateTo(`#/content?id=${id}`)}
            />

            {/* Section 26: সদকায়ে জারিয়া */}
            <SadqahJariyahSection onNavigate={navigateTo} />
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-amber-200 selection:text-amber-950">
      {/* Header */}
      <Header
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        onSearch={handleSearch}
        searchQuery={searchQuery}
      />

      {/* Main Page Area */}
      <div className="flex-1">
        {renderContent()}
      </div>

      {/* Footer */}
      <Footer onNavigate={navigateTo} siteConfig={siteConfig} />
    </div>
  );
}
