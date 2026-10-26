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
} from 'lucide-react';
import { useLoyalty } from '../../context/LoyaltyContext';
import { Language } from '../../types';
import { translations } from '../../translations';

export const ProfileScreen: React.FC = () => {
  const {
    customer,
    language,
    setLanguage,
    setIsFamilyModalOpen,
    setIsStoreLocatorOpen,
    setIsSupportModalOpen,
    resetDemoData,
    setIsLoggedIn,
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
        <h1 className="text-lg font-extrabold text-slate-900 tracking-tight">
          {t.nav.profile} & Preferences
        </h1>
        <p className="text-xs text-slate-500 font-medium">
          Manage your Hayleys Group loyalty account, language, and household
        </p>
      </div>

      {/* Member Profile Card */}
      <div className="p-4 bg-white rounded-3xl border border-slate-200 shadow-xs flex items-center gap-3.5">
        <div className="w-13 h-13 rounded-2xl bg-emerald-800 text-white flex items-center justify-center font-extrabold text-lg shrink-0">
          NP
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="font-extrabold text-sm text-slate-900 truncate">
              {customer.name}
            </h2>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {customer.tier}
            </span>
          </div>
          <div className="text-xs text-slate-500 font-mono mt-0.5">
            {customer.membershipId}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            +94 77 ••• •821 · Member since {customer.joinedYear}
          </div>
        </div>
      </div>

      {/* Language Switcher Section */}
      <div className="p-4 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-2.5">
        <div className="flex items-center gap-2 text-slate-900">
          <Globe className="w-4 h-4 text-emerald-700" />
          <h3 className="font-bold text-xs">App Language (භාෂාව / மொழி)</h3>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {languages.map((l) => {
            const isSelected = language === l.code;
            return (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={`py-2 px-1 rounded-xl text-xs flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-emerald-700 text-white font-bold shadow-xs'
                    : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 font-medium'
                }`}
              >
                <span className="text-xs">{l.nativeName}</span>
                <span className={`text-[10px] ${isSelected ? 'text-emerald-200' : 'text-slate-400'}`}>
                  {l.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Group Services & Support Menu */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden text-xs">
        {/* Family & Household Account */}
        <button
          onClick={() => setIsFamilyModalOpen(true)}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block">Family & Household Pooling</span>
              <span className="text-[11px] text-slate-500">
                Governed point-sharing rules ({customer.familyMembersCount} active members)
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
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block">Outlets & Service Desks</span>
              <span className="text-[11px] text-slate-500">
                Retail supermarkets, Kingsbury/Amaya, Travels, and Mobility hubs
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>

        {/* Help & Support */}
        <button
          onClick={() => setIsSupportModalOpen(true)}
          className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 block">Help & Missing Points</span>
              <span className="text-[11px] text-slate-500">
                FAQs, missing point receipt claims, and concierge desk
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
      </div>

      {/* Notification Preferences */}
      <div className="p-4 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3 text-xs">
        <div className="flex items-center gap-2 text-slate-900">
          <Bell className="w-4 h-4 text-emerald-700" />
          <h3 className="font-bold text-xs">Notifications & Privacy</h3>
        </div>

        <div className="space-y-2 text-slate-700">
          <label className="flex items-center justify-between cursor-pointer py-1">
            <span>Points Earning & Expiry SMS Alerts</span>
            <input
              type="checkbox"
              checked={smsAlerts}
              onChange={(e) => setSmsAlerts(e.target.checked)}
              className="accent-emerald-700 w-4 h-4 rounded cursor-pointer"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer py-1 border-t border-slate-100">
            <span>Exclusive Group Offers & Privileges</span>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="accent-emerald-700 w-4 h-4 rounded cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Reset Demo State Section */}
      <div className="p-4 bg-slate-50 rounded-3xl border border-slate-200 text-center space-y-2">
        <span className="text-[11px] text-slate-500 block">
          Client Evaluation Prototype Controls
        </span>

        {resetConfirmToast && (
          <div className="p-2 bg-emerald-100 text-emerald-800 text-xs rounded-xl font-medium animate-fade-in flex items-center justify-center gap-1.5">
            <Check className="w-4 h-4" />
            <span>Demo state restored to initial RFP baseline!</span>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="flex-1 py-2.5 px-3 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Demo Data</span>
          </button>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="py-2.5 px-3 bg-white hover:bg-rose-50 border border-slate-300 hover:border-rose-300 text-slate-600 hover:text-rose-700 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
