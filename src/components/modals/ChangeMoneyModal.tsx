import React from 'react';
import { X, Coins, ArrowDownLeft, Building2, ShieldCheck } from 'lucide-react';
import { useLoyalty } from '../../context/LoyaltyContext';

export const ChangeMoneyModal: React.FC = () => {
  const { wallet, changeMoneyLedger, isChangeMoneyModalOpen, setIsChangeMoneyModalOpen } = useLoyalty();

  if (!isChangeMoneyModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fade-in">
      <div className="w-full max-w-[390px] bg-white rounded-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200/90 animate-slide-up">
        {/* Top Header - Light & Subtle */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-white text-slate-900">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold border border-amber-200/80">
              <Coins className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h3 className="font-bold text-xs text-slate-900 leading-tight">Change Money</h3>
              <span className="text-[10px] text-slate-500 font-medium">Checkout cash round-up balance</span>
            </div>
          </div>
          <button
            onClick={() => setIsChangeMoneyModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Balance Card */}
        <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl mx-5 mt-4 space-y-1.5 text-center">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
            Available Balance
          </span>
          <div className="text-3xl font-extrabold text-slate-900 tabular-nums tracking-tight">
            LKR {wallet.changeMoneyLKR.toFixed(2)}
          </div>
          <div className="pt-1 flex items-center justify-center gap-2 text-[10px] font-medium text-slate-600">
            <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200 text-emerald-800 font-bold">
              1:1 Legal Tender
            </span>
            <span>·</span>
            <span>Never Expires</span>
            <span>·</span>
            <span>Hayleys Supermarkets</span>
          </div>
        </div>

        {/* Subtle Feature Highlight */}
        <div className="mx-5 mt-2.5 mb-1.5 p-2.5 bg-emerald-50/60 border border-emerald-200/60 rounded-xl flex items-center gap-2 text-[11px] text-emerald-950">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>Real cash change rounded up at checkout, ready to spend against future grocery bills.</span>
        </div>

        {/* Ledger Transactions */}
        <div className="flex-1 overflow-y-auto pt-2 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-900 px-5 pt-1">
            <span>Recent Round-Ups</span>
            <span className="text-[11px] text-slate-400 font-normal">Supermarket Ledger</span>
          </div>

          <div className="space-y-2 px-5 pb-3">
            {changeMoneyLedger.map((tx) => (
              <div
                key={tx.id}
                className="p-3 bg-white hover:bg-slate-50/80 border border-slate-200/80 rounded-2xl flex items-center justify-between gap-3 text-xs transition-colors shadow-2xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-100">
                    <ArrowDownLeft className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-slate-900 truncate text-xs">
                      {tx.store.replace('Hayleys Retail Supermarket - ', '')}
                    </h4>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono mt-0.5">
                      <span>{tx.date}</span>
                      <span>·</span>
                      <span>{tx.receiptRef}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-bold text-emerald-800 text-xs tabular-nums block">
                    +LKR {tx.amountLKR.toFixed(2)}
                  </span>
                  <span className="text-[9px] text-slate-400 uppercase font-semibold">
                    Round-Up
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <span>Usable at all Hayleys Supermarket checkouts</span>
          </div>
          <button
            onClick={() => setIsChangeMoneyModalOpen(false)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
