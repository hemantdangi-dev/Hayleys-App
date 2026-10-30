import React, { useState } from 'react';
import { Bell, Wallet, MapPin, X, Check, ScanLine } from 'lucide-react';
import { HayleysLogo } from './HayleysLogo';
import { useLoyalty } from '../../context/LoyaltyContext';
import { translations } from '../../translations';

interface HeaderProps {
  onOpenStoreLocator?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenStoreLocator }) => {
  const { wallet, language, setActiveTab, setIsStoreLocatorOpen, setIsScanQROpen } = useLoyalty();
  const t = translations[language];

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 'N-1',
      title: 'Double Points Weekend at Retail',
      time: '2 hours ago',
      unread: true,
      desc: 'Earn 2x reward points across all supermarket grocery lines this Saturday and Sunday.',
    },
    {
      id: 'N-2',
      title: 'Kingsbury Dining Privilege Ready',
      time: '1 day ago',
      unread: true,
      desc: 'Your Silver tier unlocks 15% off food bills at The Ocean & The Grill.',
    },
    {
      id: 'N-3',
      title: 'Points Expiry Notice',
      time: '3 days ago',
      unread: false,
      desc: '200 points will expire on 30 Nov 2026. Redeem them across Leisure or Retail today.',
    },
  ]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-2.5 flex items-center justify-between">
        {/* Left: Hayleys Brand */}
        <div className="flex items-center gap-2">
          <HayleysLogo size="sm" showSubtitle={true} />
        </div>

        {/* Right: Quick actions */}
        <div className="flex items-center gap-1.5">
          {/* Store locator icon */}
          <button
            onClick={() => setIsStoreLocatorOpen(true)}
            aria-label="Find stores and outlets"
            className="w-10 h-10 flex items-center justify-center rounded-full text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
            title="Locate Hayleys Retail, Hotels & Desks"
          >
            <MapPin className="w-4.5 h-4.5" />
          </button>

          {/* Scan Store QR icon */}
          <button
            onClick={() => setIsScanQROpen(true)}
            aria-label="Scan Store Checkout QR"
            className="w-10 h-10 flex items-center justify-center rounded-full text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
            title="Scan Store QR to Earn Points"
          >
            <ScanLine className="w-4.5 h-4.5" />
          </button>

          {/* Notifications bell */}
          <button
            onClick={() => setIsNotificationsOpen(true)}
            aria-label="Notifications"
            className="w-10 h-10 flex items-center justify-center rounded-full text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 relative transition-colors"
          >
            <Bell className="w-4.5 h-4.5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-white"></span>
            )}
          </button>

          {/* Quick Points Pill - Navigates to Screen 4 Dedicated Wallet */}
          <button
            onClick={() => setActiveTab('wallet')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-900 border border-emerald-200/60 rounded-full text-xs font-semibold tracking-tight transition-colors cursor-pointer"
            title="Open Dedicated Group Wallet"
          >
            <Wallet className="w-3.5 h-3.5 text-emerald-700" />
            <span className="tabular-nums font-bold text-emerald-800">
              {wallet.availablePoints.toLocaleString()}
            </span>
            <span className="text-[10px] text-emerald-600 uppercase font-bold">pts</span>
          </button>
        </div>
      </header>

      {/* Notifications Drawer / Modal */}
      {isNotificationsOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end animate-fade-in">
          <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col animate-slide-left">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-emerald-700" />
                <h3 className="font-bold text-slate-900 text-sm">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-100 px-1.5 py-0.5 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[11px] text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" />
                    Mark read
                  </button>
                )}
                <button
                  onClick={() => setIsNotificationsOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-3 divide-y divide-slate-100 flex-1 overflow-y-auto">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={`py-3 px-2 rounded-lg transition-colors ${
                    n.unread ? 'bg-emerald-50/50' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-xs text-slate-900">{n.title}</h4>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-slate-100 text-center bg-slate-50">
              <span className="text-[11px] text-slate-500">
                Official announcements from Hayleys Group Loyalty
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
