import React, { useState } from 'react';
import {
  Wallet as WalletIcon,
  Sparkles,
  Coins,
  Ticket,
  Clock,
  TrendingUp,
  AlertCircle,
  Building2,
  Palmtree,
  Compass,
  Car,
  QrCode,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  ArrowLeft,
} from 'lucide-react';
import { useLoyalty } from '../../context/LoyaltyContext';
import { BusinessUnit, Voucher } from '../../types';
import { translations } from '../../translations';

export const WalletScreen: React.FC = () => {
  const {
    wallet,
    vouchers,
    language,
    setIsChangeMoneyModalOpen,
    startCrossBusinessRedemption,
    markVoucherUsed,
    setActiveTab,
  } = useLoyalty();

  const t = translations[language];
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

  const buEarnList: { id: BusinessUnit; label: string; icon: React.FC<{ className?: string }>; color: string }[] = [
    { id: 'RETAIL', label: t.bu.RETAIL, icon: Building2, color: 'text-emerald-700 bg-emerald-50' },
    { id: 'LEISURE', label: t.bu.LEISURE, icon: Palmtree, color: 'text-amber-700 bg-amber-50' },
    { id: 'TRAVELS', label: t.bu.TRAVELS, icon: Compass, color: 'text-sky-700 bg-sky-50' },
    { id: 'MOBILITY', label: t.bu.MOBILITY, icon: Car, color: 'text-indigo-700 bg-indigo-50' },
  ];

  return (
    <div className="space-y-4 px-4 py-3 pb-8">
      {/* Back to Home & Screen Title */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab('home')}
          className="p-1 -ml-1 text-slate-500 hover:text-slate-900 rounded-full cursor-pointer"
          title="Back to Home Dashboard"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-extrabold text-slate-900 tracking-tight">
            {t.wallet.title}
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            {t.wallet.sharedWalletSubtitle}
          </p>
        </div>
      </div>

      {/* Main Reward Points Wallet Card */}
      <div className="p-5 bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-950 text-white rounded-3xl shadow-xl space-y-4 border border-emerald-700/50">
        <div>
          <span className="text-xs text-emerald-300 font-semibold uppercase tracking-wider block">
            {t.wallet.pointsSummary}
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl font-extrabold tracking-tight tabular-nums">
              {wallet.availablePoints.toLocaleString()}
            </span>
            <span className="text-sm font-bold text-emerald-300 uppercase">
              {t.common.pts}
            </span>
          </div>
        </div>

        {/* Pending & Expiring Info */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-emerald-700/40 text-xs">
          <div className="space-y-0.5">
            <span className="text-[11px] text-emerald-300 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Pending Points</span>
            </span>
            <span className="font-bold tabular-nums text-sm">
              +{wallet.pendingPoints} pts
            </span>
          </div>

          <div className="space-y-0.5">
            <span className="text-[11px] text-amber-300 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Expiring ({wallet.expiringDate})</span>
            </span>
            <span className="font-bold tabular-nums text-sm text-amber-200">
              {wallet.expiringPoints} pts
            </span>
          </div>
        </div>

        <button
          onClick={() => startCrossBusinessRedemption('LEISURE')}
          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{t.wallet.redeemAction}</span>
        </button>
      </div>

      {/* Strict Segregation: Change Money Wallet Box */}
      <div
        onClick={() => setIsChangeMoneyModalOpen(true)}
        className="p-4 bg-gradient-to-r from-amber-50 via-white to-amber-50/50 rounded-2xl border border-amber-200 shadow-xs cursor-pointer hover:border-amber-400 transition-all space-y-2.5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Coins className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-xs text-slate-900">Change Money Wallet (LKR)</h3>
              <span className="text-[10px] text-slate-500 font-medium">
                Customer Monetary Cash Round-ups
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </div>

        <div className="flex items-baseline justify-between pt-1 border-t border-amber-100">
          <span className="text-xl font-extrabold text-amber-950 tabular-nums">
            LKR {wallet.changeMoneyLKR.toFixed(2)}
          </span>
          <span className="text-[11px] text-emerald-700 font-bold hover:underline">
            View Ledger Details →
          </span>
        </div>

        <p className="text-[10px] text-slate-500 leading-relaxed bg-white/60 p-2 rounded-lg border border-amber-100">
          {t.wallet.changeMoneyNotice}
        </p>
      </div>

      {/* Group Points Earned by Participating Business Unit */}
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-xs text-slate-900">
              {t.wallet.buEarnBreakdown}
            </h3>
            <p className="text-[10px] text-slate-500">
              One wallet fed by multiple Hayleys operating companies
            </p>
          </div>
          <span className="text-[11px] font-bold text-emerald-800 font-mono">
            Total: {Object.values(wallet.earnedByBU).reduce((a, b) => a + b, 0).toLocaleString()} pts
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {buEarnList.map((bu) => {
            const Icon = bu.icon;
            const pts = wallet.earnedByBU[bu.id] || 0;
            return (
              <div
                key={bu.id}
                className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${bu.color}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-800 text-[11px] block">
                      {bu.label}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-mono">
                      {bu.id}
                    </span>
                  </div>
                </div>
                <span className="font-extrabold text-slate-900 tabular-nums text-xs">
                  {pts.toLocaleString()} pts
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Digital Vouchers List */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xs text-slate-900">
            {t.wallet.vouchersTitle} ({vouchers.filter((v) => v.status === 'ACTIVE').length})
          </h3>
          <span className="text-[11px] text-slate-400">Tap to present QR</span>
        </div>

        <div className="space-y-2.5">
          {vouchers.map((v) => (
            <div
              key={v.id}
              onClick={() => setSelectedVoucher(v)}
              className="p-3 rounded-2xl border border-slate-200 bg-white hover:border-emerald-400 transition-all cursor-pointer shadow-xs flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={v.image || '/src/assets/images/hayleys_retail_supermarket_1792998392386.jpg'}
                  alt={v.rewardName}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200 group-hover:scale-105 transition-transform"
                />
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">
                    {v.businessUnit} REWARD
                  </span>
                  <h4 className="font-bold text-xs text-slate-900 truncate mt-0.5">
                    {v.rewardName}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono mt-1">
                    <strong className="text-slate-800">{v.code}</strong>
                    <span>·</span>
                    <span className="text-emerald-700 font-semibold">Exp: {v.expiryDate}</span>
                  </div>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 shrink-0 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                <QrCode className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Voucher Detail Modal */}
      {selectedVoucher && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl space-y-4 text-center overflow-hidden">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-xs uppercase font-bold text-emerald-800">
                {selectedVoucher.businessUnit} VOUCHER
              </span>
              <button
                onClick={() => setSelectedVoucher(null)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold"
              >
                Close
              </button>
            </div>

            {/* Photo in Voucher Detail Modal */}
            <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
              <img
                src={selectedVoucher.image || '/src/assets/images/hayleys_retail_supermarket_1792998392386.jpg'}
                alt={selectedVoucher.rewardName}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-3 right-3 text-white text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-black/50 backdrop-blur-xs px-2 py-0.5 rounded">
                  {selectedVoucher.businessUnit}
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-extrabold text-sm text-slate-900">{selectedVoucher.rewardName}</h3>
              <p className="text-xs text-slate-500 mt-1">{selectedVoucher.outletInstructions}</p>
            </div>

            {/* QR box */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl inline-block mx-auto">
              <div className="w-36 h-36 bg-white border border-slate-300 rounded-xl flex items-center justify-center mx-auto shadow-inner">
                <QrCode className="w-28 h-28 text-slate-800" />
              </div>
              <span className="font-mono text-xs font-bold text-emerald-800 block mt-2">
                {selectedVoucher.code}
              </span>
            </div>

            <div className="text-[11px] text-slate-400">
              Valid until {selectedVoucher.expiryDate}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  markVoucherUsed(selectedVoucher.id);
                  setSelectedVoucher(null);
                }}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
              >
                Mark as Used
              </button>
              <button
                onClick={() => setSelectedVoucher(null)}
                className="flex-1 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
