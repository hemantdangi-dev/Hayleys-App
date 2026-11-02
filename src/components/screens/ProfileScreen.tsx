import React, { useState } from 'react';
import {
  User,
  Globe,
  Users,
  MapPin,
  HelpCircle,
  Shield,
  Bell,
  RotateCcw,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Check,
  Sparkles,
} from 'lucide-react';
import { useLoyalty } from '../../context/LoyaltyContext';
import { Language } from '../../types';
import { translations } from '../../translations';

export const ProfileScreen: React.FC = () => {
  const {
    customer,
    wallet,
    language,
    setLanguage,
    setIsFamilyModalOpen,
    setIsStoreLocatorOpen,
    openSupportModal,
    supportTickets,
    resetDemoData,
    setIsLoggedIn,
    setIsGamificationOpen,
  } = useLoyalty();

  const t = translations[language];

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [resetConfirmToast, setResetConfirmToast] = useState(false);

  const languages: { code: Language; name: string; nativeName: string }[] = [
    { code: 'EN', name: 'English', nativeName: 'English' },
    { code: 'SI', name: 'Sinhala', nativeName: 'සිංහල' },
    { code: 'TA', name: 'Tamil', nativeName: 'தமிழ்' },
  ];

  const handleReset = () => {
    resetDemoData();
    setResetConfirmToast(true);
    setTimeout(() => setResetConfirmToast(false), 2500);
  };

  return (
    <div className="space-y-4 px-4 py-3 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          {t.nav.profile} & Account
        </h1>
        <p className="text-[11px] text-slate-500 font-medium">
          Hayleys Group loyalty membership, household & settings
        </p>
      </div>

      {/* Member Profile Card */}
      <div className="p-4 bg-white rounded-3xl border border-slate-200/90 shadow-2xs space-y-3">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-extrabold text-base shrink-0 shadow-xs">
            NP
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-sm text-slate-900 truncate">
                {customer.name}
              </h2>
              <span className="text-[10px] font-extrabold text-amber-950 bg-amber-300/90 px-2 py-0.5 rounded-full border border-amber-400">
                {customer.tier} Tier
              </span>
            </div>
            <div className="text-xs text-slate-500 font-mono mt-0.5">
              {customer.membershipId}
            </div>
            <div className="text-[11px] text-slate-400">
              +94 77 ••• •821 · Member since {customer.joinedYear}
            </div>
          </div>
        </div>

        {/* Tier Progress bar toward Platinum */}
        <div className="pt-2.5 border-t border-slate-100 space-y-1.5">
          <div className="flex justify-between text-xs text-slate-600">
            <span className="font-medium text-[11px]">Platinum Tier Progression</span>
            <span className="font-bold text-slate-900 text-[11px]">
              {wallet.availablePoints.toLocaleString()} / 5,000 pts
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.round((wallet.availablePoints / 5000) * 100))}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-slate-400 pt-0.5">
            <span>
              {Math.max(0, 5000 - wallet.availablePoints).toLocaleString()} points required to unlock Platinum VIP status
            </span>
            <button
              onClick={() => setIsGamificationOpen(true)}
              className="text-emerald-800 font-bold hover:underline"
            >
              Roadmap →
            </button>
          </div>
        </div>
      </div>

      {/* Language Selection Segmented Control */}
      <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
        <div className="flex items-center gap-2 text-slate-900">
          <Globe className="w-4 h-4 text-emerald-800" />
          <h3 className="font-bold text-xs">Application Language (භාෂාව / மொழி)</h3>
        </div>

        <div className="grid grid-cols-3 p-1 bg-slate-100 rounded-xl text-xs font-semibold text-center">
          {languages.map((l) => {
            const isSelected = language === l.code;
            return (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={`py-1.5 rounded-lg transition-all ${
                  isSelected
                    ? 'bg-white text-emerald-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{l.nativeName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Group Services Menu */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs divide-y divide-slate-100 overflow-hidden text-xs">
        {/* Family Pooling */}
        <button
          onClick={() => setIsFamilyModalOpen(true)}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block">Family & Household Pooling</span>
              <span className="text-[11px] text-slate-500">
                Shared family wallet ({customer.familyMembersCount} active members)
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        {/* Store & Outlet Locator */}
        <button
          onClick={() => setIsStoreLocatorOpen(true)}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-800 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block">Outlets & Service Desks</span>
              <span className="text-[11px] text-slate-500">
                Supermarkets, Kingsbury, Amaya Resorts, and Mobility hubs
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        {/* Support Desk */}
        <button
          onClick={() => openSupportModal('TRACK')}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 block">Member Support & Cases</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {supportTickets.length} Cases
                </span>
              </div>
              <span className="text-[11px] text-slate-500">
                Missing points claims, inquiries & resolution tracking
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Notifications Toggle */}
      <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2.5 text-xs">
        <div className="flex items-center gap-2 text-slate-900">
          <Bell className="w-4 h-4 text-emerald-800" />
          <h3 className="font-bold text-xs">Alerts & Communications</h3>
        </div>

        <div className="space-y-1.5 text-slate-700">
          <label className="flex items-center justify-between cursor-pointer py-1">
            <span className="text-[11px]">Points earning & expiry SMS alerts</span>
            <input
              type="checkbox"
              checked={smsAlerts}
              onChange={(e) => setSmsAlerts(e.target.checked)}
              className="accent-emerald-700 w-4 h-4 rounded cursor-pointer"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer py-1 border-t border-slate-100">
            <span className="text-[11px]">Exclusive Hayleys group partner privileges</span>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="accent-emerald-700 w-4 h-4 rounded cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Prototype Demo Controls */}
      <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-2">
        <span className="text-[10px] text-slate-400 font-medium block">
          Evaluation Prototype Actions
        </span>

        {resetConfirmToast && (
          <div className="p-2 bg-emerald-100 text-emerald-800 text-xs rounded-xl font-medium animate-fade-in flex items-center justify-center gap-1.5">
            <Check className="w-4 h-4" />
            <span>Prototype state reset to initial baseline!</span>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="flex-1 py-2 px-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Demo</span>
          </button>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="py-2 px-3 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-300 text-slate-600 hover:text-rose-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
