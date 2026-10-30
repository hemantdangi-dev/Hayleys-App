import React from 'react';
import {
  QrCode,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  Ticket,
  Coins,
  Building2,
  Palmtree,
  Compass,
  Car,
  ChevronRight,
  ShieldCheck,
  Scan,
  ScanLine,
  Flame,
  Trophy,
  FileQuestion,
  MessageSquare,
} from 'lucide-react';
import { useLoyalty } from '../../context/LoyaltyContext';
import { BusinessUnit } from '../../types';
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
    setIsDigitalCardOpen,
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

  const businessUnits: {
    id: BusinessUnit;
    title: string;
    desc: string;
    image: string;
    icon: React.FC<{ className?: string }>;
    accentColor: string;
    sampleReward: string;
  }[] = [
    {
      id: 'RETAIL',
      title: t.bu.RETAIL,
      desc: t.buDesc.RETAIL,
      image: '/src/assets/images/hayleys_retail_supermarket_1792998392386.jpg',
      icon: Building2,
      accentColor: 'emerald',
      sampleReward: 'Supermarket Groceries · Ceylon Teas',
    },
    {
      id: 'LEISURE',
      title: t.bu.LEISURE,
      desc: t.buDesc.LEISURE,
      image: '/src/assets/images/hayleys_leisure_resort_1792998393316.jpg',
      icon: Palmtree,
      accentColor: 'amber',
      sampleReward: 'The Kingsbury & Amaya Resort Dining',
    },
    {
      id: 'TRAVELS',
      title: t.bu.TRAVELS,
      desc: t.buDesc.TRAVELS,
      image: '/src/assets/images/hayleys_travels_destination_1792998394880.jpg',
      icon: Compass,
      accentColor: 'sky',
      sampleReward: 'Scenic Hill Country Rail & Tours',
    },
    {
      id: 'MOBILITY',
      title: t.bu.MOBILITY,
      desc: t.buDesc.MOBILITY,
      image: '/src/assets/images/hayleys_mobility_services_1792998393483.jpg',
      icon: Car,
      accentColor: 'indigo',
      sampleReward: 'Airport VIP Chauffeurs · EV Charging',
    },
  ];

  const activeMission = missions.find((m) => m.status === 'IN_PROGRESS') || missions[0];

  return (
    <div className="space-y-4 pb-6">
      <div className="px-4 space-y-4 pt-2">
        {/* User Greeting */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <h1 className="text-lg font-extrabold text-slate-900 tracking-tight">
              {t.home.greeting}
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Hayleys {customer.tier} Member · ID: {customer.membershipId}
            </p>
          </div>
        </div>

        {/* Digital Loyalty Card (Silver Pass) */}
        <div
          onClick={() => setIsDigitalCardOpen(true)}
          className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-zinc-950 text-white rounded-3xl p-5 shadow-xl shadow-slate-950/20 cursor-pointer overflow-hidden border border-slate-700/60 group hover:border-slate-500 transition-all"
        >
          {/* Subtle decorative glow */}
          <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-slate-400/10 pointer-events-none blur-2xl" />
          <div className="absolute right-4 top-4 text-slate-400/30 group-hover:text-slate-200/60 transition-colors">
            <QrCode className="w-14 h-14" />
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-start justify-between gap-2">
              <HayleysLogo variant="white" size="sm" showSubtitle={true} />
              <div className="text-right pr-14">
                <span className="text-[10px] tracking-widest uppercase font-extrabold text-slate-200 bg-slate-800/90 px-2 py-0.5 rounded-full border border-slate-600 block">
                  {customer.tier} Pass
                </span>
                <span className="text-xs font-semibold text-slate-200 block mt-0.5">{customer.name}</span>
              </div>
            </div>

            {/* Main Unified Reward Points Display */}
            <div>
              <span className="text-[11px] text-slate-300 font-medium block">
                {t.home.availablePoints} (Shared Wallet)
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-extrabold text-white tracking-tight tabular-nums">
                  {wallet.availablePoints.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-slate-300 uppercase">
                  {t.common.pts}
                </span>
              </div>
            </div>

            {/* Pending & Expiring Points Row */}
            <div className="pt-2 border-t border-slate-700/60 grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>Pending: <strong>{wallet.pendingPoints} pts</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-300">
                <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                <span>Expiring: <strong>{wallet.expiringPoints} pts</strong></span>
              </div>
            </div>

            {/* Tap Action Helper */}
            <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span>{t.home.tapToScan}</span>
              <span className="font-mono text-xs text-slate-300">{customer.membershipId}</span>
            </div>
          </div>
        </div>

        {/* Dual Core Engine Actions: EARN (Scan QR) vs REDEEM (Across Hayleys) */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* EARN ANYWHERE: SCAN STORE QR */}
          <button
            onClick={() => setIsScanQROpen(true)}
            className="p-3.5 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white rounded-2xl font-bold text-xs shadow-md border border-slate-800 transition-all flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <ScanLine className="w-4.5 h-4.5" />
              </div>
              <div className="text-left min-w-0">
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                  Earn Points
                </span>
                <span className="text-xs font-extrabold text-white truncate block">
                  Scan Store QR
                </span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors shrink-0" />
          </button>

          {/* REDEEM ANYWHERE: REDEEM ACROSS HAYLEYS */}
          <button
            onClick={() => startCrossBusinessRedemption('LEISURE')}
            className="p-3.5 bg-emerald-700 hover:bg-emerald-600 active:scale-[0.99] text-white rounded-2xl font-bold text-xs shadow-md shadow-emerald-800/25 transition-all flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Sparkles className="w-4.5 h-4.5" />
              </div>
              <div className="text-left min-w-0">
                <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider block">
                  Redeem Group
                </span>
                <span className="text-xs font-extrabold text-white truncate block">
                  Browse Rewards
                </span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-200 group-hover:text-white transition-colors shrink-0" />
          </button>
        </div>

        {/* FRONT-FACING FEATURE: Member Support & Cases Desk */}
        {/* FRONT-FACING FEATURE: Member Support & Cases Desk */}
        {(() => {
          const activeTicketsCount = supportTickets.filter((t) => t.status !== 'RESOLVED').length;
          return (
            <div className="p-4 bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all space-y-3">
              {/* Header with Title and Single-Line 1 Active Badge */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-slate-900 text-emerald-400 flex items-center justify-center shrink-0 shadow-xs">
                    <FileQuestion className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 truncate">
                      Member Support & Cases
                    </h3>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      Instant ticket creation, claims & case tracker
                    </p>
                  </div>
                </div>

                {/* Status Badge - guaranteed one line */}
                {activeTicketsCount > 0 ? (
                  <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-200 shrink-0 whitespace-nowrap shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <span>{activeTicketsCount} Active</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 shrink-0 whitespace-nowrap">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>All Resolved</span>
                  </span>
                )}
              </div>

              {/* Quick Active Case Snapshot for live demo */}
              {supportTickets[0] && (
                <div
                  onClick={() => openSupportModal('TRACK')}
                  className="p-3.5 bg-slate-50/80 hover:bg-slate-100 rounded-2xl border border-slate-200/90 flex items-center justify-between gap-3 cursor-pointer transition-colors group"
                >
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-mono text-[11px] font-extrabold text-slate-800">
                          {supportTickets[0].id}
                        </span>
                        <span className="text-[9px] font-extrabold text-slate-600 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                          {supportTickets[0].category.replace('_', ' ')}
                        </span>
                        {supportTickets[0].priority === 'URGENT' && (
                          <span className="text-[8px] font-extrabold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                            URGENT
                          </span>
                        )}
                      </div>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border shrink-0 ${
                          supportTickets[0].status === 'RESOLVED'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : supportTickets[0].status === 'IN_REVIEW'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        {supportTickets[0].status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-900 font-bold truncate group-hover:text-emerald-800 transition-colors">
                      {supportTickets[0].subject}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                      <span>Logged on {supportTickets[0].date}</span>
                      <span className="text-emerald-700 font-semibold group-hover:underline">
                        View details →
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* 1-Tap Action Buttons for Instant Demo */}
              <div className="grid grid-cols-2 gap-2.5 pt-0.5">
                <button
                  onClick={() => openSupportModal('CREATE')}
                  className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
                >
                  <FileQuestion className="w-3.5 h-3.5 text-emerald-400" />
                  <span>+ Open New Case</span>
                </button>
                <button
                  onClick={() => openSupportModal('TRACK')}
                  className="py-2.5 px-3 bg-white hover:bg-slate-50 active:scale-[0.99] text-slate-800 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 border border-slate-200/90 shadow-2xs cursor-pointer whitespace-nowrap"
                >
                  <span>Track Cases ({supportTickets.length})</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </button>
              </div>
            </div>
          );
        })()}

        {/* Quick Link to Unified Wallet */}
        <div className="flex items-center justify-between px-1 text-xs">
          <span className="text-[11px] text-slate-500">
            One shared wallet across Retail, Leisure, Travels, Mobility
          </span>
          <button
            onClick={() => setActiveTab('wallet')}
            className="text-[11px] text-emerald-700 font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>View Wallet Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Gamification Hub Banner: Daily Spin & Active Streak */}
        <div
          onClick={() => setIsGamificationOpen(true)}
          className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-amber-500/15 border border-amber-300/80 hover:border-amber-400 shadow-xs cursor-pointer transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-slate-950 flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-amber-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-extrabold text-xs text-slate-900">
                  {dailySpinClaimed ? 'Daily Spin Claimed' : 'Daily Spin & Win Ready'}
                </span>
                <span className="inline-flex items-center gap-0.5 bg-orange-100 text-orange-700 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border border-orange-200">
                  <Flame className="w-2.5 h-2.5 fill-orange-500 text-orange-500" />
                  {streakWeeks}W Streak · 1.2x Boost
                </span>
                {badges.some((b) => b.status === 'CLAIMABLE') && (
                  <span className="bg-emerald-100 text-emerald-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border border-emerald-200">
                    Badge Ready
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                {dailySpinClaimed
                  ? 'Completed today · Check badges, missions & tier quest'
                  : 'Spin the lucky wheel for up to +150 bonus loyalty points!'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-0.5 text-emerald-800 font-bold text-xs shrink-0 pl-1">
            <span className="hidden sm:inline">Play</span>
            <ChevronRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Separate Vouchers & Change Money Cards */}
        <div className="grid grid-cols-2 gap-3">
          {/* Vouchers Summary Card - Now opens 3 Vouchers Modal directly, no activity redirect */}
          <div
            onClick={() => setIsVouchersModalOpen(true)}
            className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Ticket className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                View 3
              </span>
            </div>
            <div className="mt-2">
              <span className="text-[11px] text-slate-500 font-medium block">
                {t.home.vouchers}
              </span>
              <span className="text-xl font-extrabold text-slate-900 tabular-nums">
                {vouchers.filter((v) => v.status === 'ACTIVE').length} Active
              </span>
              <span className="text-[9px] text-emerald-700 font-semibold block mt-0.5 truncate">
                Hotel F&B LKR 1000 & more
              </span>
            </div>
          </div>

          {/* Change Money Card */}
          <div
            onClick={() => setIsChangeMoneyModalOpen(true)}
            className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Coins className="w-4 h-4" />
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
            <div className="mt-2">
              <div className="flex items-center gap-1">
                <span className="text-[11px] text-slate-500 font-medium block">
                  {t.home.changeMoney}
                </span>
              </div>
              <span className="text-lg font-extrabold text-slate-900 tabular-nums">
                LKR {wallet.changeMoneyLKR.toFixed(2)}
              </span>
              <span className="text-[9px] text-emerald-700 block font-semibold mt-0.5">
                Customer Currency · Retail POS
              </span>
            </div>
          </div>
        </div>

        {/* Featured Promotion Banner with Picture: Buy 2, get 100 - Promotion */}
        {(() => {
          const promoOffer = offers.find((o) => o.id === 'OFF-BUY2-GET100') || offers[0];
          return (
            <div
              onClick={() => setSelectedPromotion(promoOffer)}
              className="relative overflow-hidden rounded-3xl bg-slate-900 border border-amber-400/40 shadow-lg cursor-pointer group hover:shadow-xl hover:border-amber-300 transition-all"
            >
              {/* Picture of the promotion */}
              <div className="relative aspect-16/9 w-full overflow-hidden bg-slate-950">
                <img
                  src={promoOffer.image}
                  alt={promoOffer.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-black/30" />

                {/* Badges on top */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-extrabold uppercase bg-amber-400 text-amber-950 px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-md">
                    <Sparkles className="w-3 h-3 text-amber-900" />
                    Active Promotion
                  </span>
                  <span className="text-[10px] font-extrabold bg-white text-slate-900 px-2 py-1 rounded-lg shadow-md">
                    RETAIL
                  </span>
                </div>

                {/* Bonus Points Tag */}
                <div className="absolute top-3 right-3">
                  <span className="text-xs font-black bg-emerald-600 text-white px-2.5 py-1 rounded-lg shadow-md">
                    +100 pts
                  </span>
                </div>

                {/* Details on Bottom of picture */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-base font-extrabold tracking-tight text-white group-hover:text-amber-200 transition-colors">
                    {promoOffer.title}
                  </h3>
                  <p className="text-xs text-slate-200 mt-1 line-clamp-2 leading-snug">
                    {promoOffer.description}
                  </p>
                  <div className="mt-2.5 flex items-center justify-between text-xs pt-2 border-t border-white/20">
                    <span className="text-[11px] text-amber-200 font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Expires {promoOffer.validUntil}
                    </span>
                    <span className="font-extrabold text-amber-300 text-xs flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>View Promotion Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Quick Voucher Card with Photo: Hotel F&B LKR 1000 Off */}
        {vouchers.find((v) => v.id === 'VCH-FB1000' || v.rewardName.includes('Hotel F&B')) && (() => {
          const hotelVoucher = vouchers.find((v) => v.id === 'VCH-FB1000' || v.rewardName.includes('Hotel F&B'))!;
          return (
            <div
              onClick={() => setIsVouchersModalOpen(true)}
              className="p-3 rounded-2xl bg-gradient-to-r from-emerald-50 via-white to-amber-50/40 border border-emerald-200 shadow-xs cursor-pointer hover:border-emerald-400 transition-all flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Photo of the voucher */}
                <img
                  src={hotelVoucher.image || '/src/assets/images/hotel_fb_dining_1793353346542.jpg'}
                  alt={hotelVoucher.rewardName}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-xl object-cover shrink-0 shadow-xs border border-amber-200 group-hover:scale-105 transition-transform"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[9px] font-extrabold uppercase bg-amber-200/80 text-amber-900 px-1.5 py-0.5 rounded">
                      LEISURE VOUCHER
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold">LKR 1,000 Off</span>
                  </div>
                  <h4 className="text-xs font-extrabold text-slate-900 truncate mt-0.5">
                    {hotelVoucher.rewardName}
                  </h4>
                  <p className="text-[10px] text-slate-500 truncate">
                    The Kingsbury & Amaya · Code: <strong className="font-mono text-slate-700">{hotelVoucher.code}</strong>
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVouchersModalOpen(true);
                }}
                className="px-2.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[11px] rounded-xl shrink-0 transition-colors flex items-center gap-1 shadow-xs"
              >
                <span>View</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          );
        })()}

        {/* Participating 4 Business Units Grid */}
        <div className="space-y-2.5 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                {t.home.businessUnitsTitle}
              </h2>
              <p className="text-[11px] text-slate-500">
                {t.home.businessUnitsSubtitle}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {businessUnits.map((bu) => {
              const Icon = bu.icon;
              return (
                <div
                  key={bu.id}
                  onClick={() => startCrossBusinessRedemption(bu.id)}
                  className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-white hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer flex flex-col"
                >
                  {/* Photo Banner */}
                  <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                    <img
                      src={bu.image}
                      alt={bu.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-xs font-bold">
                      <Icon className="w-3.5 h-3.5 text-emerald-300" />
                      <span>{bu.title}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-2.5 flex-1 flex flex-col justify-between text-xs">
                    <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">
                      {bu.desc}
                    </p>
                    <div className="mt-2 pt-1 border-t border-slate-100 flex items-center justify-between text-emerald-700 font-bold text-[11px]">
                      <span>Explore</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Mission Progress Card */}
        {activeMission && (
          <div
            onClick={() => setActiveTab('rewards')}
            className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 via-white to-emerald-50/50 border border-emerald-200/80 cursor-pointer hover:shadow-xs transition-all space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <h3 className="font-bold text-xs text-slate-900">
                  Mission: {activeMission.title}
                </h3>
              </div>
              <span className="text-[11px] font-bold text-emerald-700">
                +{activeMission.rewardPoints} pts
              </span>
            </div>

            <p className="text-[11px] text-slate-600 leading-snug">
              {activeMission.description}
            </p>

            <div className="space-y-1">
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, (activeMission.progress / activeMission.total) * 100)}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                <span>
                  Progress: {activeMission.progress} of {activeMission.total} {activeMission.unit}
                </span>
                <span>{activeMission.expiresInDays} days left</span>
              </div>
            </div>
          </div>
        )}

        {/* Personalized Offers Section */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">
              {t.home.personalizedOffers}
            </h2>
            <button
              onClick={() => setActiveTab('offers')}
              className="text-xs text-emerald-700 font-bold hover:underline flex items-center gap-1"
            >
              <span>{t.common.viewAll}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {offers.slice(0, 3).map((offer) => (
              <div
                key={offer.id}
                onClick={() => setSelectedPromotion(offer)}
                className="p-3 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 transition-all cursor-pointer flex gap-3 items-center"
              >
                <img
                  src={offer.image}
                  alt={offer.title}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-100"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
                    <span className="uppercase text-emerald-700 font-bold">{offer.businessUnit}</span>
                    <span>·</span>
                    <span>Expires {offer.validUntil}</span>
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 line-clamp-1 mt-0.5">
                    {offer.title}
                  </h4>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-[11px] font-extrabold text-emerald-700">
                      {offer.discountOrBonus}
                    </span>
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                      Claim Offer
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
