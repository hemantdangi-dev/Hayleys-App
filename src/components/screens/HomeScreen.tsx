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
    language,
    setIsDigitalCardOpen,
    setIsChangeMoneyModalOpen,
    setIsScanQROpen,
    setIsGamificationOpen,
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

        {/* Digital Loyalty Card */}
        <div
          onClick={() => setIsDigitalCardOpen(true)}
          className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-950 text-white rounded-3xl p-5 shadow-xl shadow-emerald-950/20 cursor-pointer overflow-hidden border border-emerald-700/40 group hover:border-emerald-500/80 transition-all"
        >
          {/* Subtle decorative circles */}
          <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-emerald-600/10 pointer-events-none blur-2xl" />
          <div className="absolute right-4 top-4 text-emerald-400/30 group-hover:text-emerald-400/60 transition-colors">
            <QrCode className="w-14 h-14" />
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-start justify-between gap-2">
              <HayleysLogo variant="white" size="sm" showSubtitle={true} />
              <div className="text-right pr-14">
                <span className="text-[10px] tracking-widest uppercase font-bold text-emerald-300 block">
                  Emerald Pass
                </span>
                <span className="text-xs font-semibold text-slate-200">{customer.name}</span>
              </div>
            </div>

            {/* Main Unified Reward Points Display */}
            <div>
              <span className="text-[11px] text-emerald-200 font-medium block">
                {t.home.availablePoints} (Shared Wallet)
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-extrabold text-white tracking-tight tabular-nums">
                  {wallet.availablePoints.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-emerald-300 uppercase">
                  {t.common.pts}
                </span>
              </div>
            </div>

            {/* Pending & Expiring Points Row */}
            <div className="pt-2 border-t border-emerald-700/40 grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-200">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Pending: <strong>{wallet.pendingPoints} pts</strong></span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-300">
                <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                <span>Expiring: <strong>{wallet.expiringPoints} pts</strong></span>
              </div>
            </div>

            {/* Tap Action Helper */}
            <div className="pt-1 flex items-center justify-between text-[11px] text-emerald-300/90 font-medium">
              <span>{t.home.tapToScan}</span>
              <span className="font-mono text-xs">{customer.membershipId}</span>
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
          {/* Vouchers Summary Card */}
          <div
            onClick={() => setActiveTab('activity')}
            className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Ticket className="w-4 h-4" />
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </div>
            <div className="mt-2">
              <span className="text-[11px] text-slate-500 font-medium block">
                {t.home.vouchers}
              </span>
              <span className="text-xl font-extrabold text-slate-900 tabular-nums">
                {vouchers.filter((v) => v.status === 'ACTIVE').length} Active
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
            {offers.slice(0, 2).map((offer) => (
              <div
                key={offer.id}
                onClick={() => setActiveTab('offers')}
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
