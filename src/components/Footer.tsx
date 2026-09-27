import React from 'react';
import { Logo } from './Logo.tsx';
import { Mail, Phone, MapPin, Youtube, Facebook, Send } from 'lucide-react';
import { SiteConfig } from '../types.ts';

interface FooterProps {
  onNavigate: (route: string) => void;
  siteConfig: SiteConfig | null;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, siteConfig }) => {
  const links = [
    { label: 'হোম', route: '#/' },
    { label: 'আমাদের সম্পর্কে', route: '#/about' },
    { label: 'বই', route: '#/books' },
    { label: 'প্রবন্ধ', route: '#/articles' },
    { label: 'অডিও', route: '#/audio' },
    { label: 'ভিডিও', route: '#/videos' },
    { label: 'পাম্ফলেট', route: '#/pamphlets' },
    { label: 'কোর্স', route: '#/courses' },
    { label: 'প্রশ্নোত্তর', route: '#/qna' },
    { label: 'সদকায়ে জারিয়া', route: '#/sadqah' },
    { label: 'যোগাযোগ', route: '#/contact' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-gray-900 font-semibold text-sm mb-2 font-bengali">
              কুরআন ও সহিহ সুন্নাহর আলোকে ইসলামের শিক্ষা
            </p>
            <p className="text-xs text-gray-600 max-w-md leading-relaxed mb-4">
              {siteConfig?.footer?.aboutText ||
                'মাকতাব আল হিদায়াহ একটি দ্বীনি শিক্ষা ও দাওয়াহ প্ল্যাটফর্ম। আমাদের উদ্দেশ্য বিশুদ্ধ আকীদাহ ও নির্ভরযোগ্য দলীলভিত্তিক জ্ঞান প্রচার ও সংরক্ষণ করা।'}
            </p>
            <div className="inline-block px-3 py-1 rounded bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold">
              আমাদের কথা নয়—দলীলের কথা
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-l-2 border-amber-600 pl-2">
              গুরুত্বপূর্ণ লিংকসমূহ
            </h4>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs font-medium">
              {links.map((link) => (
                <li key={link.route}>
                  <button
                    onClick={() => onNavigate(link.route)}
                    className="text-gray-600 hover:text-amber-700 transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info from site.json */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-l-2 border-amber-600 pl-2">
              যোগাযোগ
            </h4>
            <div className="space-y-2.5 text-xs text-gray-600">
              {siteConfig?.contact?.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{siteConfig.contact.email}</span>
                </div>
              )}
              {siteConfig?.contact?.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{siteConfig.contact.phone}</span>
                </div>
              )}
              {siteConfig?.contact?.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{siteConfig.contact.location}</span>
                </div>
              )}

              {/* Social Channels */}
              <div className="flex items-center gap-3 pt-2">
                {siteConfig?.contact?.youtube && (
                  <a
                    href={siteConfig.contact.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-full bg-amber-50 text-amber-800 hover:bg-amber-600 hover:text-white transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                )}
                {siteConfig?.contact?.facebook && (
                  <a
                    href={siteConfig.contact.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-full bg-amber-50 text-amber-800 hover:bg-amber-600 hover:text-white transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}
                {siteConfig?.contact?.telegram && (
                  <a
                    href={siteConfig.contact.telegram}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1.5 rounded-full bg-amber-50 text-amber-800 hover:bg-amber-600 hover:text-white transition-colors"
                    aria-label="Telegram"
                  >
                    <Send className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <p>© Maktab Al Hidayah. সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="font-arabic text-amber-800 font-medium text-sm">
            وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ۚ عَلَيْهِ تَوَكَّلْتُ وَإِلَيْهِ أُنِيبُ
          </p>
        </div>
      </div>
    </footer>
  );
};
