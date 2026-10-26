import React from 'react';
import { Home, ReceiptText, Tag, Gift, User } from 'lucide-react';
import { useLoyalty } from '../../context/LoyaltyContext';
import { translations } from '../../translations';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, language } = useLoyalty();
  const t = translations[language].nav;

  const tabs = [
    {
      id: 'home' as const,
      label: t.home,
      icon: Home,
    },
    {
      id: 'activity' as const,
      label: t.activity,
      icon: ReceiptText,
    },
    {
      id: 'offers' as const,
      label: t.offers,
      icon: Tag,
    },
    {
      id: 'rewards' as const,
      label: t.rewards,
      icon: Gift,
    },
    {
      id: 'profile' as const,
      label: t.profile,
      icon: User,
    },
  ];

  return (
    <nav
      aria-label="Primary mobile navigation"
      className="sticky bottom-0 z-30 w-full bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-lg"
    >
      <div className="grid grid-cols-5 h-16 max-w-lg mx-auto px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id || (tab.id === 'home' && activeTab === 'wallet');

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center min-h-[48px] py-1 transition-all relative ${
                isActive ? 'text-emerald-800 font-semibold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {isActive && (
                <span className="absolute top-0 w-8 h-0.5 bg-emerald-700 rounded-full" />
              )}
              <Icon
                className={`w-5 h-5 transition-transform duration-200 ${
                  isActive ? 'scale-110 stroke-[2.4] text-emerald-700' : 'stroke-[1.75]'
                }`}
              />
              <span
                className={`text-[10px] mt-1 tracking-tight truncate max-w-[64px] ${
                  isActive ? 'font-bold text-emerald-800' : 'font-medium'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
