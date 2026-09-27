import React, { useState } from 'react';
import { Mail, Phone, MapPin, Youtube, Facebook, Send, Check } from 'lucide-react';
import { SiteConfig } from '../types.ts';

interface ContactPageProps {
  siteConfig: SiteConfig | null;
}

export const ContactPage: React.FC<ContactPageProps> = ({ siteConfig }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const contact = siteConfig?.contact;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3 font-bengali">
          যোগাযোগ
        </h1>
        <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
          যেকোনো গঠনমূলক পরামর্শ, রিসোর্স সংশোধন বা সহযোগিতার জন্য আমাদের সাথে যোগাযোগ করতে পারেন
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Contact Info Box */}
        <div className="bg-gradient-to-br from-amber-800 via-amber-900 to-amber-950 text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-amber-700/50">
          <h2 className="text-xl font-bold mb-2 font-bengali text-amber-300">
            মাকতাব আল হিদায়াহ
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 leading-relaxed mb-6">
            কুরআন ও সহিহ সুন্নাহর ভিত্তিতে বিশুদ্ধ দ্বীনি জ্ঞান প্রচার ও প্রসারের একটি স্বাধীন অলাভজনক প্ল্যাটফর্ম।
          </p>

          <div className="space-y-4 text-sm">
            {contact?.email && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-900/40 border border-amber-800/40 flex items-center justify-center text-amber-300 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-amber-300 block">ইমেইল:</span>
                  <a href={`mailto:${contact.email}`} className="font-medium hover:underline">
                    {contact.email}
                  </a>
                </div>
              </div>
            )}

            {contact?.phone && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-900/40 border border-amber-800/40 flex items-center justify-center text-amber-300 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-amber-300 block">ফোন / হোয়াটসঅ্যাপ:</span>
                  <span className="font-medium">{contact.phone}</span>
                </div>
              </div>
            )}

            {contact?.location && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-amber-900/40 border border-amber-800/40 flex items-center justify-center text-amber-300 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-amber-300 block">ঠিকানা:</span>
                  <span className="font-medium">{contact.location}</span>
                </div>
              </div>
            )}
          </div>

          {/* Social media links */}
          <div className="mt-8 pt-6 border-t border-amber-900/50">
            <span className="text-xs text-gray-400 block mb-3 font-semibold uppercase tracking-wider">
              সোশ্যাল মিডিয়া চ্যানেলসমূহ:
            </span>
            <div className="flex items-center gap-3">
              {contact?.youtube && (
                <a
                  href={contact.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-amber-950/70 hover:bg-amber-900 border border-amber-600/40 text-xs font-semibold flex items-center gap-2 transition-colors text-amber-100"
                >
                  <Youtube className="w-4 h-4 text-red-400" />
                  <span>YouTube</span>
                </a>
              )}
              {contact?.facebook && (
                <a
                  href={contact.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-amber-950/70 hover:bg-amber-900 border border-amber-600/40 text-xs font-semibold flex items-center gap-2 transition-colors text-amber-100"
                >
                  <Facebook className="w-4 h-4 text-blue-400" />
                  <span>Facebook</span>
                </a>
              )}
              {contact?.telegram && (
                <a
                  href={contact.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-amber-950/70 hover:bg-amber-900 border border-amber-600/40 text-xs font-semibold flex items-center gap-2 transition-colors text-amber-100"
                >
                  <Send className="w-4 h-4 text-sky-400" />
                  <span>Telegram</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Message form */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg font-bold text-gray-900 mb-4 font-bengali">
            আমাদের বার্তা পাঠান
          </h2>

          {submitted ? (
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 text-sm flex items-center gap-3">
              <Check className="w-5 h-5 text-amber-700" />
              <span>আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে। জাযাকুমুল্লাহু খাইরান।</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  আপনার নাম *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="আপনার পূর্ণ নাম"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-200 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  ইমেইল ঠিকানা
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-200 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  বিষয়
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="বার্তার বিষয়বস্তু"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-200 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  আপনার বার্তা *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="আপনার বার্তা বা প্রস্তাবনা বিস্তারিত লিখুন..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-200 transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold py-2.5 rounded-lg text-sm transition-all shadow-xs"
              >
                বার্তা পাঠান
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
