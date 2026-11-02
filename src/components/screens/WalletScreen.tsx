import React, { useState } from 'react';
import {
  Wallet as WalletIcon,
  Sparkles,
  Coins,
  Ticket,
  Clock,
  TrendingUp,
  Building2,
  Palmtree,
  Compass,
  Car,
  QrCode,
  ChevronRight,
  ArrowLeft,
  ArrowDownLeft,
  CheckCircle2,
  Info,
} from 'lucide-react';
import { useLoyalty } from '../../context/LoyaltyContext';
import { BusinessUnit, Voucher } from '../../types';
import { translations } from '../../translations';

export const WalletScreen: React.FC = () => {
  const {
    wallet,
    vouchers,
    changeMoneyLedger,
    language,
    startCrossBusinessRedemption,
    markVoucherUsed,
    setActiveTab,
    setIsChangeMoneyModalOpen,
  } = useLoyalty();

  const t = translations[language];
  const [walletTab, setWalletTab] = useState<'POINTS' | 'CHANGE_MONEY'>('POINTS');
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

  const buEarnList: { id: BusinessUnit; label: string; icon: React.FC<{ className?: string }>; color: string }[] = [
    { id: 'RETAIL', label: t.bu.RETAIL, icon: Building2, color: 'text-emerald-800 bg-emerald-50 border-emerald-200' },
    { id: 'LEISURE', label: t.bu.LEISURE, icon: Palmtree, color: 'text-amber-800 bg-amber-50 border-amber-200' },
    { id: 'TRAVELS', label: t.bu.TRAVELS, icon: Compass, color: 'text-sky-800 bg-sky-50 border-sky-200' },
    { id: 'MOBILITY', label: t.bu.MOBILITY, icon: Car, color: 'text-indigo-800 bg-indigo-50 border-indigo-200' },
  ];

  const activeVouchers = vouchers.filter((v) => v.status === 'ACTIVE');

  return (
    <div className="space-y-4 px-4 py-3 pb-8">
      {/* Header with Navigation */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => setActiveTab('home')}
          className="p-1.5 -ml-1 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          title="Back to Home"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            {t.wallet.title}
          </h1>
          <p className="text-[11px] text-slate-500 font-medium">
            Segregated points & cash round-up currencies
          </p>
        </div>
      </div>

      {/* Segmented Switcher: Points vs Change Money */}
      <div className="grid grid-cols-2 p-1 bg-slate-200/80 rounded-2xl text-xs font-bold text-center">
        <button
          onClick={() => setWalletTab('POINTS')}
          className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            walletTab === 'POINTS'
              ? 'bg-white text-emerald-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-emerald-700" />
          <span>Loyalty Points ({wallet.availablePoints.toLocaleString()})</span>
        </button>
        <button
          onClick={() => setWalletTab('CHANGE_MONEY')}
          className={`py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            walletTab === 'CHANGE_MONEY'
              ? 'bg-white text-amber-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Coins className="w-4 h-4 text-amber-600" />
          <span>Change Money (LKR {wallet.changeMoneyLKR.toFixed(2)})</span>
        </button>
      </div>

      {/* TAB 1: LOYALTY POINTS VIEW */}
      {walletTab === 'POINTS' && (
        <div className="space-y-4 animate-fade-in">
          {/* Main Points Card */}
          <div className="p-5 bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-950 text-white rounded-3xl shadow-xl space-y-4 border border-slate-700/60">
            <div>
              <span className="text-[11px] text-slate-300 font-medium uppercase tracking-wider block">
                {t.wallet.pointsSummary}
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight tabular-nums">
                  {wallet.availablePoints.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-emerald-400 uppercase">
                  {t.common.pts}
                </span>
                <span className="text-xs text-slate-400 ml-1 font-mono">
                  ≈ LKR {wallet.availablePoints.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Pending & Expiring Info */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs">
              <div className="space-y-0.5">
                <span className="text-[11px] text-slate-300 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Pending Points</span>
                </span>
                <span className="font-bold tabular-nums text-sm text-white">
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
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Redeem Points for Rewards</span>
            </button>
          </div>

          {/* Group Points Earned by Sector Breakdown */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-xs text-slate-900">
                  Points Breakdown by Sector
                </h3>
                <p className="text-[10px] text-slate-500">
                  One wallet pooled across all participating Hayleys companies
                </p>
              </div>
              <span className="text-[11px] font-bold text-emerald-800 font-mono">
                {Object.values(wallet.earnedByBU).reduce((a, b) => a + b, 0).toLocaleString()} pts total
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
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center border ${bu.color}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-800 text-[11px] block">
                          {bu.label}
                        </span>
                        <span className="text-[9px] text-slate-400 uppercase font-mono">
                          {bu.id}
                        </span>
                      </div>
                    </div>
                    <span className="font-extrabold text-slate-900 tabular-nums text-xs">
                      {pts.toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Vouchers List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs text-slate-900">
                Active Vouchers ({activeVouchers.length})
              </h3>
              <span className="text-[11px] text-slate-400">Tap to present QR</span>
            </div>

            <div className="space-y-2">
              {activeVouchers.map((v) => (
                <div
                  key={v.id}
                  onClick={() => setSelectedVoucher(v)}
                  className="p-3 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 transition-all cursor-pointer shadow-xs flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={v.image || '/src/assets/images/hotel_fb_dining_1793353346542.jpg'}
                      alt={v.rewardName}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200 group-hover:scale-105 transition-transform"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] uppercase font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                          {v.businessUnit}
                        </span>
                        <span className="text-[10px] text-slate-400">·</span>
                        <span className="text-[10px] text-slate-500 font-mono">{v.code}</span>
                      </div>
                      <h4 className="font-bold text-xs text-slate-900 truncate mt-0.5">
                        {v.rewardName}
                      </h4>
                      <span className="text-[10px] text-emerald-700 font-medium block">
                        Active · Expires {v.expiryDate}
                      </span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 shrink-0 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                    <QrCode className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CHANGE MONEY WALLET (LKR) */}
      {walletTab === 'CHANGE_MONEY' && (
        <div className="space-y-4 animate-fade-in">
          {/* Change Money Balance Card */}
          <div className="p-5 bg-gradient-to-br from-amber-900/90 via-amber-800/80 to-slate-900 text-white rounded-3xl shadow-xl space-y-3 border border-amber-700/50">
            <div>
              <span className="text-[11px] text-amber-200 font-semibold uppercase tracking-wider block">
                Change Money Balance (LKR Cash Round-ups)
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight tabular-nums">
                  LKR {wallet.changeMoneyLKR.toFixed(2)}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-amber-100/90 leading-relaxed bg-black/20 p-2.5 rounded-xl border border-white/10">
              Customer currency accumulated when cash change at Retail Supermarket POS is rounded up. Usable 1:1 against future grocery bills.
            </p>

            <button
              onClick={() => setIsChangeMoneyModalOpen(true)}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Coins className="w-4 h-4" />
              <span>Change Money Outlets & Policy</span>
            </button>
          </div>

          {/* Change Money Transaction Ledger */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs text-slate-900">
                Recent Change Money Credits
              </h3>
              <span className="text-[10px] text-slate-400">POS Receipts</span>
            </div>

            <div className="space-y-2">
              {changeMoneyLedger.map((tx) => (
                <div
                  key={tx.id}
                  className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5 min-w-0">
                    <span className="font-bold text-slate-800 text-[11px] block truncate">
                      {tx.store}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono block">
                      Ref: {tx.receiptRef} · {tx.date}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-bold text-emerald-700 text-xs tabular-nums block">
                      +LKR {tx.amountLKR.toFixed(2)}
                    </span>
                    <span className="text-[9px] text-slate-400 block">
                      {tx.type === 'CREDIT_ROUNDUP' ? 'Round-up Credit' : 'Redeemed'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Voucher Detail Modal */}
      {selectedVoucher && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
          <div className="w-full max-w-[370px] bg-white rounded-3xl p-5 shadow-2xl space-y-3.5 text-center overflow-hidden border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <span className="text-xs uppercase font-bold text-emerald-800">
                {selectedVoucher.businessUnit} VOUCHER
              </span>
              <button
                onClick={() => setSelectedVoucher(null)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold p-1 cursor-pointer"
              >
                Close
              </button>
            </div>

            {/* Photo in Voucher Detail Modal */}
            <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
              <img
                src={selectedVoucher.image || '/src/assets/images/hotel_fb_dining_1793353346542.jpg'}
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
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl inline-block mx-auto">
              <div className="w-32 h-32 bg-white border border-slate-300 rounded-xl flex items-center justify-center mx-auto shadow-inner">
                <QrCode className="w-24 h-24 text-slate-800" />
              </div>
              <span className="font-mono text-xs font-bold text-emerald-800 block mt-1.5">
                {selectedVoucher.code}
              </span>
            </div>

            <div className="text-[11px] text-slate-400">
              Valid until {selectedVoucher.expiryDate}
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => {
                  markVoucherUsed(selectedVoucher.id);
                  setSelectedVoucher(null);
                }}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Mark as Used
              </button>
              <button
                onClick={() => setSelectedVoucher(null)}
                className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
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
