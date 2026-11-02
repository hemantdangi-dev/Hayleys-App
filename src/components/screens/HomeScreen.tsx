import React, { useState } from 'react';
import {
  Sparkles,
  Clock,
  Ticket,
  Coins,
  Building2,
  Palmtree,
  Compass,
  Car,
  ChevronRight,
  ScanLine,
  Flame,
  FileQuestion,
  ChevronDown,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useLoyalty } from '../../context/LoyaltyContext';
import { BusinessUnit, Offer } from '../../types';
import { translations } from '../../translations';
import { HayleysLogo } from '../common/HayleysLogo';

export const HomeScreen: React.FC = () => {
  const {
    customer,
    wallet,
    vouchers,
    offers,
    missions,
    supportTickets,
    language,
    setIsChangeMoneyModalOpen,
    setIsScanQROpen,
    setIsGamificationOpen,
    openSupportModal,
    setIsVouchersModalOpen,
    setSelectedPromotion,
    dailySpinClaimed,
    streakWeeks,
    badges,
    startCrossBusinessRedemption,
    setActiveTab,
  } = useLoyalty();

  const t = translations[language];
  const [isPerksExpanded, setIsPerksExpanded] = useState(false);

  // Business Units configuration with real high-res photography
  const businessUnits: {
    id: BusinessUnit;
    title: string;
    image: string;
    icon: React.FC<{ className?: string }>;
  }[] = [
    {
      id: 'RETAIL',
      title: 'Retail',
      image: '/src/assets/images/hayleys_retail_supermarket_1792998392386.jpg',
      icon: Building2,
    },
    {
      id: 'LEISURE',
      title: 'Leisure',
      image: '/src/assets/images/hayleys_leisure_resort_1792998393316.jpg',
      icon: Palmtree,
    },
    {
      id: 'TRAVELS',
      title: 'Travels',
      image: '/src/assets/images/hayleys_travels_destination_1792998394880.jpg',
      icon: Compass,
    },
    {
      id: 'MOBILITY',
      title: 'Mobility',
      image: '/src/assets/images/hayleys_mobility_services_1792998393483.jpg',
      icon: Car,
    },
  ];

  const activeVouchers = vouchers.filter((v) => v.status === 'ACTIVE');
  const activeTickets = supportTickets.filter((t) => t.status !== 'RESOLVED');
  const featuredOffer =
    offers.find((o) => o.id === 'OFF-BUY2-GET100') || offers[0];
  const featuredVoucher =
    vouchers.find((v) => v.id === 'VCH-FB1000' || v.rewardName.includes('Hotel F&B')) ||
    activeVouchers[0];
  const activeMission = missions.find((m) => m.status === 'IN_PROGRESS') || missions[0];

  return (
    <div className="space-y-4 pb-8 px-4 pt-2">
      {/* 1. Header Greeting & Member Status */}
      <div className="flex items-center justify-between pt-1">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              {t.home.greeting}
            </h1>
            <span className="text-[10px] font-extrabold text-amber-950 bg-amber-300/90 px-2 py-0.5 rounded-full border border-amber-400">
              {customer.tier} Tier
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-mono">
            Member ID: {customer.membershipId}
          </p>
        </div>
      </div>

      {/* 2. Primary Executive Loyalty Card (Single Unified Hero) */}
      <div
        className="relative bg-gradient-to-br from-slate-950 via-[#1d1b14] to-slate-900 text-white rounded-3xl p-5 shadow-xl shadow-slate-950/20 overflow-hidden border border-amber-400/35"
      >
        {/* Subtle background glow */}
        <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-amber-500/10 pointer-events-none blur-2xl" />

        <div className="relative z-10 space-y-4">
          {/* Card Top: Logo & Tier */}
          <div className="flex items-center justify-between">
            <HayleysLogo variant="white" size="sm" showSubtitle={true} />
            <div className="text-right">
              <span className="text-[10px] tracking-wider uppercase font-extrabold text-amber-300 bg-amber-400/15 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-amber-400/30">
                {customer.tier} Member
              </span>
            </div>
          </div>

          {/* Point Balance */}
          <div>
            <span className="text-[11px] text-slate-300 font-medium block">
              Unified Point Balance (Shared across 4 Sectors)
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight tabular-nums">
                {wallet.availablePoints.toLocaleString()}
              </span>
              <span className="text-xs font-bold text-emerald-400 uppercase">
                {t.common.pts}
              </span>
              <span className="text-xs text-slate-400 ml-1 font-mono">
                ≈ LKR {(wallet.availablePoints * 10).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Pending / Expiring / Change Money Quick Strip */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3 text-[11px] text-slate-300">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>+{wallet.pendingPoints} pending</span>
              </span>
              <span>·</span>
              <span className="text-amber-300">
                {wallet.expiringPoints} exp ({wallet.expiringDate})
              </span>
            </div>

            {/* Change Money Indicator */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setIsChangeMoneyModalOpen(true);
              }}
              className="flex items-center gap-1.5 bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 px-2.5 py-1 rounded-xl font-bold text-[11px] transition-colors"
              title="Open Change Money Wallet"
            >
              <Coins className="w-3 h-3 text-amber-300" />
              <span>LKR {wallet.changeMoneyLKR.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Streamlined 4-Icon Action Bar */}
      <div className="grid grid-cols-4 gap-2 text-center">
        {/* Action 1: Scan Store QR */}
        <button
          onClick={() => setIsScanQROpen(true)}
          className="p-3 bg-white hover:bg-slate-50 active:scale-98 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-center justify-center gap-1.5 transition-all group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:scale-105 transition-transform">
            <ScanLine className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-800">Scan & Earn</span>
        </button>

        {/* Action 2: Redeem Group Rewards */}
        <button
          onClick={() => startCrossBusinessRedemption('LEISURE')}
          className="p-3 bg-white hover:bg-slate-50 active:scale-98 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-center justify-center gap-1.5 transition-all group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-bold text-slate-800">Redeem</span>
        </button>

        {/* Action 3: Vouchers (Opens 3 Vouchers Modal) */}
        <button
          onClick={() => setIsVouchersModalOpen(true)}
          className="relative p-3 bg-white hover:bg-slate-50 active:scale-98 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-center justify-center gap-1.5 transition-all group cursor-pointer"
        >
          {activeVouchers.length > 0 && (
            <span className="absolute top-1.5 right-1.5 bg-emerald-600 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
              {activeVouchers.length}
            </span>
          )}
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Ticket className="w-5 h-5 text-emerald-800" />
          </div>
          <span className="text-[11px] font-bold text-slate-800">Vouchers</span>
        </button>

        {/* Action 4: Support & Cases */}
        <button
          onClick={() => openSupportModal('CREATE')}
          className="relative p-3 bg-white hover:bg-slate-50 active:scale-98 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col items-center justify-center gap-1.5 transition-all group cursor-pointer"
        >
          {activeTickets.length > 0 && (
            <span className="absolute top-1.5 right-1.5 bg-amber-500 text-slate-950 text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
              {activeTickets.length}
            </span>
          )}
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
            <FileQuestion className="w-5 h-5 text-slate-700" />
          </div>
          <span className="text-[11px] font-bold text-slate-800">Support</span>
        </button>
      </div>

      {/* 4. Participating Sectors (Horizontal Scroll with Real Photos) */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
              Participating Sectors
            </h2>
            <p className="text-[11px] text-slate-500">
              One unified wallet across 4 Hayleys sectors
            </p>
          </div>
          <button
            onClick={() => setActiveTab('wallet')}
            className="text-xs text-emerald-800 font-bold hover:underline flex items-center gap-0.5"
          >
            <span>Wallet</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Scrollable Photo Tiles - Clean, high-impact imagery without squished single letters */}
        <div className="flex gap-2.5 overflow-x-auto pb-1.5 -mx-4 px-4 no-scrollbar">
          {businessUnits.map((bu) => {
            const Icon = bu.icon;
            return (
              <div
                key={bu.id}
                onClick={() => startCrossBusinessRedemption(bu.id)}
                className="w-28 sm:w-32 shrink-0 aspect-[4/3] rounded-2xl overflow-hidden relative cursor-pointer group shadow-2xs border border-slate-200/90 active:scale-98 transition-all bg-slate-900"
              >
                <img
                  src={bu.image}
                  alt={bu.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-black/20" />

                {/* Top Icon Pill */}
                <div className="absolute top-2 left-2 w-6 h-6 rounded-lg bg-black/40 backdrop-blur-xs text-white flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5" />
                </div>

                {/* Bottom Title */}
                <div className="absolute bottom-2 left-2.5 right-2 text-white">
                  <span className="text-xs font-extrabold tracking-tight block drop-shadow-sm">
                    {bu.title}
                  </span>
                  <span className="text-[9px] text-emerald-300 font-semibold uppercase tracking-wider block">
                    Earn & Redeem
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Featured Promotion: Buy 2, get 100 - Promotion */}
      {featuredOffer && (
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
              Featured Promotion
            </h3>
            <button
              onClick={() => setActiveTab('offers')}
              className="text-xs text-emerald-800 font-bold hover:underline flex items-center gap-0.5"
            >
              <span>All Offers</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div
            onClick={() => setSelectedPromotion(featuredOffer)}
            className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 shadow-md cursor-pointer group hover:shadow-lg transition-all"
          >
            <div className="relative aspect-16/9 sm:aspect-21/9 w-full overflow-hidden bg-slate-950">
              <img
                src={featuredOffer.image}
                alt={featuredOffer.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              {/* Badges */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                <span className="text-[9px] font-extrabold uppercase bg-amber-400 text-amber-950 px-2 py-0.5 rounded-md shadow-xs">
                  {featuredOffer.businessUnit} PROMO
                </span>
                <span className="text-[9px] font-extrabold bg-emerald-700 text-white px-2 py-0.5 rounded-md shadow-xs">
                  {featuredOffer.discountOrBonus}
                </span>
              </div>

              {/* Info on bottom */}
              <div className="absolute bottom-2.5 left-3 right-3 text-white">
                <h4 className="text-sm font-extrabold tracking-tight group-hover:text-amber-200 transition-colors">
                  {featuredOffer.title}
                </h4>
                <div className="flex items-center justify-between text-[11px] mt-1 pt-1 border-t border-white/20 text-slate-300">
                  <span>Expires {featuredOffer.validUntil}</span>
                  <span className="text-amber-300 font-bold flex items-center gap-0.5">
                    <span>View Details</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Active Voucher Snippet (Quick Access) */}
      {featuredVoucher && (
        <div
          onClick={() => setIsVouchersModalOpen(true)}
          className="p-3 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200 shadow-xs cursor-pointer transition-all flex items-center justify-between gap-3 group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={featuredVoucher.image || '/src/assets/images/hotel_fb_dining_1793353346542.jpg'}
              alt={featuredVoucher.rewardName}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200 group-hover:scale-105 transition-transform"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-extrabold uppercase bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded border border-amber-200">
                  {featuredVoucher.businessUnit}
                </span>
                <span className="text-[10px] text-emerald-800 font-bold">
                  {activeVouchers.length} Active Vouchers
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 truncate mt-0.5">
                {featuredVoucher.rewardName}
              </h4>
              <span className="text-[10px] text-slate-500 font-mono">
                Code: {featuredVoucher.code}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-emerald-800 shrink-0">
            <span>Show</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      )}

      {/* 7. Quick Highlights: Lucky Wheel & Active Support Case */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        {/* Lucky Spin Card */}
        <div
          onClick={() => setIsGamificationOpen(true)}
          className="p-3 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:border-amber-300 transition-all cursor-pointer flex flex-col justify-between active:scale-98"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4 text-amber-600" />
            </div>
            <span className="text-[9px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/80">
              {streakWeeks}W Streak
            </span>
          </div>
          <div className="mt-2.5">
            <span className="font-bold text-xs text-slate-900 block leading-tight">
              {dailySpinClaimed ? 'Daily Spin Claimed' : 'Daily Spin & Win'}
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              {dailySpinClaimed ? 'Check achievements' : 'Up to +150 bonus pts'}
            </span>
          </div>
        </div>

        {/* Active Support Card */}
        <div
          onClick={() => openSupportModal(activeTickets.length > 0 ? 'TRACK' : 'CREATE')}
          className="p-3 bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between active:scale-98"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              <FileQuestion className="w-4 h-4 text-emerald-700" />
            </div>
            <span className="text-[9px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/80">
              {activeTickets.length > 0 ? `${activeTickets.length} Active` : 'Concierge'}
            </span>
          </div>
          <div className="mt-2.5">
            <span className="font-bold text-xs text-slate-900 block leading-tight truncate">
              {activeTickets.length > 0 ? 'Case Desk' : 'Member Services'}
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5 truncate">
              {supportTickets[0] ? supportTickets[0].subject : 'Missing points claims'}
            </span>
          </div>
        </div>
      </div>

      {/* 8. Personalized Offers (Scannable Cards) */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900">
            {t.home.personalizedOffers}
          </h3>
          <button
            onClick={() => setActiveTab('offers')}
            className="text-xs text-emerald-800 font-bold hover:underline flex items-center gap-0.5"
          >
            <span>{t.common.viewAll}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2">
          {offers.slice(0, 3).map((offer) => (
            <div
              key={offer.id}
              onClick={() => setSelectedPromotion(offer)}
              className="p-2.5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 transition-all cursor-pointer flex gap-3 items-center group"
            >
              <img
                src={offer.image}
                alt={offer.title}
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-xl object-cover shrink-0 bg-slate-100 group-hover:scale-105 transition-transform"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-medium">
                  <span className="uppercase text-emerald-800 font-bold">
                    {offer.businessUnit}
                  </span>
                  <span>·</span>
                  <span>Expires {offer.validUntil}</span>
                </div>
                <h4 className="font-bold text-xs text-slate-900 truncate mt-0.5">
                  {offer.title}
                </h4>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-[11px] font-extrabold text-emerald-800">
                    {offer.discountOrBonus}
                  </span>
                  <span className="text-[10px] text-emerald-800 font-bold group-hover:underline flex items-center gap-0.5">
                    <span>View</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
